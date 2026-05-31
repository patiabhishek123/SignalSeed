"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toggleSaveStartup } from "@/actions/startups";

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

interface EmergingListProps {
  initialStartups: Startup[];
}

export default function EmergingList({ initialStartups }: EmergingListProps) {
  const [startups, setStartups] = useState<Startup[]>(initialStartups);
  const [selectedSector, setSelectedSector] = useState<string>("ALL");
  const [, startTransition] = useTransition();

  const handleToggleSave = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistically update
    setStartups((prev) =>
      prev.map((s) => (s.id === id ? { ...s, saved: !s.saved } : s))
    );

    startTransition(async () => {
      await toggleSaveStartup(id);
    });
  };

  // Filter for emerging entities: SEED or SERIES A stages
  const emergingStartups = startups.filter(
    (s) => s.stage === "SEED" || s.stage === "SERIES A"
  );

  // Extract all sectors for tabs
  const sectors = ["ALL", ...Array.from(new Set(emergingStartups.map((s) => s.sector)))];

  const displayedStartups = selectedSector === "ALL"
    ? emergingStartups
    : emergingStartups.filter((s) => s.sector === selectedSector);

  const getSourceIcon = (source: string) => {
    if (source === "GITHUB") return "code";
    if (source === "HN") return "forum";
    if (source === "PRODUCT_HUNT") return "rocket_launch";
    if (source === "GOOGLE_TRENDS") return "query_stats";
    return "auto_awesome";
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sector Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-graphite-stroke/40">
        {sectors.map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSector(sec)}
            className={`font-mono text-[9px] uppercase tracking-wider px-3 py-1 rounded-sm transition-colors ${
              selectedSector === sec
                ? "bg-primary text-black font-bold"
                : "bg-surface-container-low border border-graphite-stroke text-on-surface-variant hover:text-white"
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Grid of emerging items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedStartups.map((startup) => (
          <div
            key={startup.id}
            className="bg-surface-container-low rounded-sm p-5 flex flex-col justify-between gap-4 border border-graphite-stroke hover:border-primary/50 transition-all shadow-none group relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[9px] text-primary uppercase tracking-widest block mb-1">
                  {startup.sector}
                </span>
                <Link
                  href={`/startup/${startup.id}`}
                  className="font-sans font-extrabold text-base text-white hover:text-primary transition-colors block"
                >
                  {startup.name}
                </Link>
                <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase mt-0.5 block">
                  {startup.stage} | {startup.location}
                </span>
              </div>

              <button
                onClick={(e) => handleToggleSave(startup.id, e)}
                className={`w-7 h-7 rounded-sm border flex items-center justify-center transition-colors ${
                  startup.saved
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-graphite-stroke/60 text-on-surface-variant/40 hover:text-white"
                }`}
              >
                <span
                  className="material-symbols-outlined text-xs"
                  style={{ fontVariationSettings: startup.saved ? "'FILL' 1" : undefined }}
                >
                  star
                </span>
              </button>
            </div>

            <p className="font-sans text-xs text-on-surface-variant/70 leading-relaxed line-clamp-3">
              {startup.description}
            </p>

            {/* Signal metrics summary */}
            <div className="grid grid-cols-3 gap-2 bg-surface-container-lowest p-3 rounded-sm border border-graphite-stroke/40 font-mono text-[10px]">
              <div className="text-center">
                <span className="text-on-surface-variant/40 block text-[8px] uppercase">Stars</span>
                <span className="text-white font-bold">{startup.githubStars}</span>
              </div>
              <div className="text-center border-x border-graphite-stroke/40">
                <span className="text-on-surface-variant/40 block text-[8px] uppercase">HN Mentions</span>
                <span className="text-white font-bold">{startup.hnMentionsWk}/Wk</span>
              </div>
              <div className="text-center">
                <span className="text-on-surface-variant/40 block text-[8px] uppercase">Score</span>
                <span className="text-primary font-bold">{startup.momentumScore.toFixed(1)}</span>
              </div>
            </div>

            {/* Recent top signal tag */}
            {startup.signals.length > 0 && (
              <div className="flex items-center gap-2 text-[9px] font-mono text-primary bg-primary/5 px-2 py-1 rounded-sm border border-primary/25">
                <span className="material-symbols-outlined text-xs">
                  {getSourceIcon(startup.signals[0].source)}
                </span>
                <span className="truncate uppercase font-bold text-[8px]">{startup.signals[0].title}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-graphite-stroke/40 mt-1 font-mono text-[9px] text-on-surface-variant/40">
              <span>VALUATION: ${startup.valuation}M</span>
              <Link href={`/startup/${startup.id}`} className="text-primary hover:underline uppercase">
                Analyze →
              </Link>
            </div>
          </div>
        ))}

        {displayedStartups.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <span className="font-mono text-xs text-on-surface-variant/30 uppercase">
              No emerging entities found for sector: {selectedSector}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
