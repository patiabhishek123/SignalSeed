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
    if (status === "DECAY") return "text-tertiary";
    return "text-[#bbcabf]";
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
      <section className="col-span-12 lg:col-span-4 flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
            Momentum Leaderboard
          </h2>
          <button
            onClick={() => setFilterSavedOnly((prev) => !prev)}
            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${
              filterSavedOnly
                ? "bg-primary/10 text-primary border-primary/30"
                : "border-[#3c4a42]/30 text-[#bbcabf]/70 hover:text-white"
            }`}
          >
            {filterSavedOnly ? "SHOWING SAVED" : "SHOW ALL"}
          </button>
        </div>

        <div className="bg-[#111317] rounded-lg border border-[#3c4a42]/30 overflow-hidden shadow-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1A1C1F] border-b border-[#3c4a42]/30">
              <tr>
                <th className="p-3 font-mono text-[9px] text-[#bbcabf]/50 uppercase">Entity</th>
                <th className="p-3 font-mono text-[9px] text-[#bbcabf]/50 uppercase text-right">Score</th>
                <th className="p-3 font-mono text-[9px] text-[#bbcabf]/50 uppercase text-right">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3c4a42]/20">
              {displayedStartups.map((startup) => {
                const isSelected = startup.id === selectedStartupId;
                return (
                  <tr
                    key={startup.id}
                    onClick={() => setSelectedStartupId(startup.id)}
                    className={`transition-colors cursor-pointer group hover:bg-[#1E2023]/60 ${
                      isSelected ? "bg-[#1E2023]" : ""
                    }`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleToggleSave(startup.id, e)}
                          className="text-[#bbcabf]/40 hover:text-primary transition-colors flex items-center"
                        >
                          <span
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: startup.saved ? "'FILL' 1" : undefined }}
                          >
                            star
                          </span>
                        </button>
                        <div className="min-w-0">
                          <Link
                            href={`/startup/${startup.id}`}
                            className="font-sans font-bold text-xs text-[#e2e2e6] hover:text-primary transition-colors block truncate"
                          >
                            {startup.name}
                          </Link>
                          <span className="text-[9px] text-[#bbcabf]/50 font-mono uppercase tracking-wider block">
                            {startup.sector}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-sm font-bold text-primary">
                        {startup.momentumScore.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className={`flex items-center justify-end gap-1 font-mono text-[9px] uppercase ${getStatusColor(startup.momentumStatus)}`}>
                        <span className="material-symbols-outlined text-xs">
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
                    <span className="font-mono text-[10px] text-[#bbcabf]/30 uppercase">
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
          <div className="bg-[#111317] border border-[#3c4a42]/30 p-4 rounded-lg flex flex-col gap-3 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-sans font-bold text-sm text-white">
                  {selectedStartup.name}
                </h3>
                <span className="font-mono text-[9px] text-primary uppercase tracking-widest block">
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
            <p className="font-sans text-xs text-[#bbcabf]/70 leading-relaxed line-clamp-3">
              {selectedStartup.description}
            </p>
            <div className="pt-3 border-t border-[#3c4a42]/20 flex justify-between font-mono text-[10px] text-[#bbcabf]/60">
              <span>VALUATION: ${selectedStartup.valuation}M</span>
              <span>FUNDING: ${selectedStartup.funding}M</span>
            </div>
          </div>
        )}
      </section>

      {/* Middle Column: Emerging Signals Feed */}
      <section className="col-span-12 lg:col-span-4 flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
            Emerging Signals
          </h2>
          <span className="font-mono text-[9px] text-[#bbcabf]/50 uppercase tracking-widest">
            REAL-TIME STREAM
          </span>
        </div>

        <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1">
          {initialSignals.map((signal) => (
            <div
              key={signal.id}
              className="glass-card p-4 rounded-lg flex flex-col gap-2 relative overflow-hidden group hover:border-[#3c4a42]/60 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${getSourceIconColor(signal.source)}`}>
                    {getSourceIcon(signal.source)}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#bbcabf]/70">
                    {signal.source} Intelligence
                  </span>
                </div>
                <span className="text-[9px] text-[#bbcabf]/40 font-mono">
                  {new Date(signal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="font-sans text-xs text-white leading-relaxed">
                <Link href={`/startup/${signal.startupId}`} className="text-primary font-bold hover:underline mr-1">
                  {signal.startupName}
                </Link>
                {signal.title.replace(signal.startupName, "").trim() || signal.description}
              </p>
              <div className="flex justify-between items-center pt-1 border-t border-[#3c4a42]/10 mt-1 text-[9px] font-mono text-[#bbcabf]/40">
                <span>SIGNAL SCORE: {signal.score}</span>
                <span className="uppercase">VALIDATED</span>
              </div>
            </div>
          ))}

          {initialSignals.length === 0 && (
            <div className="glass-card p-8 rounded-lg text-center">
              <span className="font-mono text-[10px] text-[#bbcabf]/30 uppercase block">
                No signal streams detected
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Right Column: Acceleration Map & Metrics */}
      <section className="col-span-12 lg:col-span-4 flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
            Acceleration Map
          </h2>
          <span className="font-mono text-[9px] text-[#bbcabf]/50 uppercase tracking-widest">
            MARKET ACCELERATION
          </span>
        </div>

        {/* Recharts Bar Chart */}
        <div className="bg-[#111317] border border-[#3c4a42]/30 p-4 rounded-lg flex flex-col gap-4 shadow-md">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-mono text-[10px] uppercase text-[#bbcabf]/60 tracking-wider">
              Weekly Geographic Corridor Velocity
            </h3>
          </div>
          <AccelerationChart />
        </div>

        {/* Global Key Performance Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#111317] border border-[#3c4a42]/30 p-3 rounded-lg shadow-sm">
            <div className="font-mono text-[9px] text-[#bbcabf]/50 uppercase tracking-wider mb-1">
              Global Velocity
            </div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-lg font-bold text-white">4.82x</span>
              <span className="material-symbols-outlined text-primary text-sm">north_east</span>
            </div>
          </div>
          <div className="bg-[#111317] border border-[#3c4a42]/30 p-3 rounded-lg shadow-sm">
            <div className="font-mono text-[9px] text-[#bbcabf]/50 uppercase tracking-wider mb-1">
              Entropy Index
            </div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-lg font-bold text-white">0.12</span>
              <span className="material-symbols-outlined text-tertiary text-sm">south_east</span>
            </div>
          </div>
        </div>

        {/* Console status log terminal output */}
        <div className="bg-[#0C0E11] border border-[#3c4a42]/30 rounded-lg p-4 font-mono text-[10px] text-[#bbcabf]/50 flex flex-col gap-2 shadow-inner">
          <div className="flex justify-between items-center border-b border-[#3c4a42]/20 pb-2">
            <span className="text-primary font-bold">SYSTEM_STATUS: NOMINAL</span>
            <span>SYS_SYS_SYS</span>
          </div>
          <div className="space-y-1 text-[9px] leading-relaxed">
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
