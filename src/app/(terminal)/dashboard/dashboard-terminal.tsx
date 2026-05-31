"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toggleSaveStartup } from "@/actions/startups";
import AccelerationChart from "@/components/acceleration-chart";

interface Founder {
  name: string;
  title: string;
  avatar: string;
}

interface RiskAssessment {
  id: string;
  startupId: string;
  protocolRobustness: number;
  liquidityCrunch: string | null;
  regulatoryPivot: string | null;
  ipOverlapAlert: string | null;
  auditedBy: string | null;
  auditDate: string | null;
}

interface Signal {
  id: string;
  startupId: string;
  source: "GITHUB" | "HN" | "GOOGLE_TRENDS" | "PRODUCT_HUNT" | "YC";
  title: string;
  description: string;
  score: number;
  timestamp: Date;
}

interface Startup {
  id: string;
  name: string;
  description: string;
  logoUrl: string | null;
  sector: string;
  stage: string;
  valuation: number;
  funding: number;
  website: string;
  location: string;
  founders: Founder[];
  githubStars: number;
  githubStarsWk: number;
  hnMentionsWk: number;
  productHuntRank: number;
  trendsScore: number;
  momentumScore: number;
  momentumStatus: "STRONG" | "STABLE" | "DECAY" | "NEUTRAL";
  createdAt: Date;
  updatedAt: Date;
  signals: Signal[];
  saved: boolean;
  riskAssessment: RiskAssessment | null;
}

interface DashboardTerminalProps {
  initialStartups: Startup[];
  initialSignals: (Signal & { startupName: string })[];
}

export default function DashboardTerminal({
  initialStartups,
  initialSignals,
}: DashboardTerminalProps) {
  const [startups, setStartups] = useState<Startup[]>(initialStartups);
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);
  const [selectedStartupId, setSelectedStartupId] = useState<string>(
    initialStartups[0]?.id || ""
  );
  const [, startTransition] = useTransition();

  const selectedStartup = startups.find((s) => s.id === selectedStartupId) || startups[0];

  const handleToggleSave = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistically update client state
    setStartups((prev) =>
      prev.map((s) => (s.id === id ? { ...s, saved: !s.saved } : s))
    );

    // Call server action to toggle save in DB
    startTransition(async () => {
      await toggleSaveStartup(id);
    });
  };

  const displayedStartups = filterSavedOnly
    ? startups.filter((s) => s.saved)
    : startups;

  const getStatusColor = (status: string) => {
    if (status === "STRONG") return "text-primary";
    if (status === "STABLE") return "text-secondary";
    if (status === "DECAY") return "text-error";
    return "text-on-surface-variant";
  };

  const getStatusIcon = (status: string) => {
    if (status === "STRONG") return "trending_up";
    if (status === "STABLE") return "trending_flat";
    if (status === "DECAY") return "trending_down";
    return "fiber_manual_record";
  };

  const getSourceIconColor = (source: string) => {
    if (source === "GITHUB") return "text-white";
    if (source === "HN") return "text-secondary";
    if (source === "PRODUCT_HUNT") return "text-[#da552f]";
    if (source === "GOOGLE_TRENDS") return "text-[#4285f4]";
    return "text-primary";
  };

  const getSourceIcon = (source: string) => {
    if (source === "GITHUB") return "code";
    if (source === "HN") return "forum";
    if (source === "PRODUCT_HUNT") return "rocket_launch";
    if (source === "GOOGLE_TRENDS") return "query_stats";
    return "auto_awesome";
  };

  // 24H Deltas
  const topDeltaStartup = startups.reduce((max, s) =>
    s.momentumScore > max.momentumScore ? s : max,
    startups[0]
  );

  return (
    <div className="grid grid-cols-12 gap-6 w-full">
      {/* Left Column: Momentum Leaderboard */}
      <section className="col-span-12 lg:col-span-4 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Momentum Leaderboard
          </h2>
          <button
            onClick={() => setFilterSavedOnly((prev) => !prev)}
            className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm border transition-colors ${
              filterSavedOnly
                ? "bg-primary/10 text-primary border-primary/30"
                : "border-graphite-stroke text-on-surface-variant hover:text-white"
            }`}
          >
            {filterSavedOnly ? "SHOWING SAVED" : "SHOW ALL"}
          </button>
        </div>

        <div className="bg-surface-container-low rounded-sm border border-graphite-stroke overflow-hidden shadow-none">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container border-b border-graphite-stroke">
              <tr>
                <th className="p-2.5 font-mono text-[9px] text-on-surface-variant/50 uppercase">Entity</th>
                <th className="p-2.5 font-mono text-[9px] text-on-surface-variant/50 uppercase text-right">Score</th>
                <th className="p-2.5 font-mono text-[9px] text-on-surface-variant/50 uppercase text-right">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-stroke/40">
              {displayedStartups.map((startup) => {
                const isSelected = startup.id === selectedStartupId;
                return (
                  <tr
                    key={startup.id}
                    onClick={() => setSelectedStartupId(startup.id)}
                    className={`transition-colors cursor-pointer group hover:bg-surface-container-high/40 ${
                      isSelected ? "bg-surface-container-high" : ""
                    }`}
                  >
                    <td className="p-2.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleToggleSave(startup.id, e)}
                          className="text-on-surface-variant/30 hover:text-primary transition-colors flex items-center"
                        >
                          <span
                            className="material-symbols-outlined text-[13px]"
                            style={{ fontVariationSettings: startup.saved ? "'FILL' 1" : undefined }}
                          >
                            star
                          </span>
                        </button>
                        <div className="min-w-0">
                          <Link
                            href={`/startup/${startup.id}`}
                            className="font-sans font-bold text-[12px] text-on-surface hover:text-primary transition-colors block truncate"
                          >
                            {startup.name}
                          </Link>
                          <span className="text-[8px] text-on-surface-variant/50 font-mono uppercase tracking-wider block mt-0.5">
                            {startup.sector}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-2.5 text-right">
                      <span className="font-mono text-[12px] font-bold text-primary">
                        {startup.momentumScore.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <div className={`flex items-center justify-end gap-1 font-mono text-[9px] uppercase ${getStatusColor(startup.momentumStatus)}`}>
                        <span className="material-symbols-outlined text-[10px]">
                          {getStatusIcon(startup.momentumStatus)}
                        </span>
                        <span>{startup.momentumStatus}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {displayedStartups.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center">
                    <span className="font-mono text-[10px] text-on-surface-variant/30 uppercase">
                      No startup entities match this filter
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Selected Startup Detail Card Preview */}
        {selectedStartup && (
          <div className="bg-surface-container-low border border-graphite-stroke p-4 rounded-sm flex flex-col gap-2.5 shadow-none">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-sans font-bold text-[13px] text-white">
                  {selectedStartup.name}
                </h3>
                <span className="font-mono text-[9px] text-primary uppercase tracking-widest block mt-0.5">
                  {selectedStartup.stage} // {selectedStartup.location}
                </span>
              </div>
              <Link
                href={`/startup/${selectedStartup.id}`}
                className="font-mono text-[9px] text-primary hover:underline uppercase tracking-wider"
              >
                Full Analytics →
              </Link>
            </div>
            <p className="font-sans text-[11px] text-on-surface-variant/75 leading-relaxed line-clamp-3">
              {selectedStartup.description}
            </p>
            <div className="pt-2.5 border-t border-graphite-stroke/40 flex justify-between font-mono text-[9px] text-on-surface-variant/60">
              <span>VALUATION: ${selectedStartup.valuation}M</span>
              <span>FUNDING: ${selectedStartup.funding}M</span>
            </div>
          </div>
        )}
      </section>

      {/* Middle Column: Emerging Signals Feed */}
      <section className="col-span-12 lg:col-span-4 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Emerging Signals
          </h2>
          <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-widest">
            REAL-TIME STREAM
          </span>
        </div>

        <div className="flex flex-col gap-2.5 max-h-[640px] overflow-y-auto pr-1">
          {initialSignals.map((signal) => (
            <div
              key={signal.id}
              className="bg-surface-container-low border border-graphite-stroke p-3.5 rounded-sm flex flex-col gap-2 relative overflow-hidden group hover:border-outline-variant transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className={`material-symbols-outlined text-[13px] ${getSourceIconColor(signal.source)}`}>
                    {getSourceIcon(signal.source)}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/70">
                    {signal.source} Intelligence
                  </span>
                </div>
                <span className="text-[8px] text-on-surface-variant/40 font-mono">
                  {new Date(signal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="font-sans text-[11px] text-white leading-relaxed">
                <Link href={`/startup/${signal.startupId}`} className="text-primary font-bold hover:underline mr-1">
                  {signal.startupName}
                </Link>
                {signal.title.replace(signal.startupName, "").trim() || signal.description}
              </p>
              <div className="flex justify-between items-center pt-1.5 border-t border-graphite-stroke/20 mt-1 text-[9px] font-mono text-on-surface-variant/40">
                <span>SIGNAL SCORE: {signal.score}</span>
                <span className="uppercase text-[8px] text-primary/70">VALIDATED</span>
              </div>
            </div>
          ))}

          {initialSignals.length === 0 && (
            <div className="bg-surface-container-low border border-graphite-stroke p-8 rounded-sm text-center">
              <span className="font-mono text-[10px] text-on-surface-variant/30 uppercase block">
                No signal streams detected
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Right Column: Acceleration Map & Metrics */}
      <section className="col-span-12 lg:col-span-4 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Acceleration Map
          </h2>
          <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-widest">
            MARKET ACCELERATION
          </span>
        </div>

        {/* Recharts Bar Chart */}
        <div className="bg-surface-container-low border border-graphite-stroke p-3.5 rounded-sm flex flex-col gap-3.5 shadow-none">
          <div className="flex justify-between items-baseline mb-0.5">
            <h3 className="font-mono text-[9px] uppercase text-on-surface-variant/60 tracking-wider">
              Weekly Geographic Corridor Velocity
            </h3>
          </div>
          <AccelerationChart />
        </div>

        {/* Global Key Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container-low border border-graphite-stroke p-3 rounded-sm shadow-none">
            <div className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-wider mb-1">
              Global Velocity
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[16px] font-bold text-white">4.82x</span>
              <span className="material-symbols-outlined text-primary text-sm">north_east</span>
            </div>
          </div>
          <div className="bg-surface-container-low border border-graphite-stroke p-3 rounded-sm shadow-none">
            <div className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-wider mb-1">
              Entropy Index
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[16px] font-bold text-white">0.12</span>
              <span className="material-symbols-outlined text-tertiary text-sm">south_east</span>
            </div>
          </div>
        </div>

        {/* Console status log terminal output */}
        <div className="bg-surface-container-lowest border border-graphite-stroke rounded-sm p-3.5 font-mono text-[9px] text-on-surface-variant/50 flex flex-col gap-2 shadow-none">
          <div className="flex justify-between items-center border-b border-graphite-stroke/40 pb-1.5">
            <span className="text-primary font-bold">SYSTEM_STATUS: NOMINAL</span>
            <span>SYS_SYS_SYS</span>
          </div>
          <div className="space-y-1 text-[8px] leading-relaxed">
            <p>&gt; INDEXING GITHUB GROWTH activity... [100% OK]</p>
            <p>&gt; CORRELATING HACKERNEWS STORIES... [OK]</p>
            <p>&gt; MAPPING GOOGLE TRENDS ACCELERATION... [OK]</p>
            <p>&gt; MOMENTUM PEAK DETECTED: {topDeltaStartup?.name || "NONE"}</p>
            <p className="text-primary animate-pulse">&gt; MONITORING FOR NEW SIGNS [15 ACTIVE]...</p>
          </div>
        </div>
      </section>
    </div>
  );
}
