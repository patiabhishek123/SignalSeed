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

interface UnicornsListProps {
  initialStartups: Startup[];
}

export default function UnicornsList({ initialStartups }: UnicornsListProps) {
  const [startups, setStartups] = useState<Startup[]>(initialStartups);
  const [, startTransition] = useTransition();

  const handleToggleSave = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setStartups((prev) =>
      prev.map((s) => (s.id === id ? { ...s, saved: !s.saved } : s))
    );

    startTransition(async () => {
      await toggleSaveStartup(id);
    });
  };

  // Filter for potential unicorns: Valuation >= 50M or Momentum Score >= 85
  const unicornStartups = startups.filter(
    (s) => s.valuation >= 50.0 || s.momentumScore >= 85.0
  );

  // Global aggregate stats
  const totalValuation = unicornStartups.reduce((sum, s) => sum + s.valuation, 0);
  const averageValuation = unicornStartups.length > 0 ? totalValuation / unicornStartups.length : 0;
  const totalFunding = unicornStartups.reduce((sum, s) => sum + s.funding, 0);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Aggregate Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface-container-low border border-graphite-stroke p-4 rounded-sm shadow-none">
          <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-widest block mb-1">
            Total Unicorn Cohort Capitalization
          </span>
          <span className="font-mono text-2xl font-extrabold text-white">
            ${totalValuation.toFixed(1)}M
          </span>
        </div>
        <div className="bg-surface-container-low border border-graphite-stroke p-4 rounded-sm shadow-none">
          <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-widest block mb-1">
            Average Cohort Valuation
          </span>
          <span className="font-mono text-2xl font-extrabold text-primary">
            ${averageValuation.toFixed(1)}M
          </span>
        </div>
        <div className="bg-surface-container-low border border-graphite-stroke p-4 rounded-sm shadow-none">
          <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase tracking-widest block mb-1">
            Cumulative Funding Raised
          </span>
          <span className="font-mono text-2xl font-extrabold text-white">
            ${totalFunding.toFixed(1)}M
          </span>
        </div>
      </div>

      {/* Cohort Grid List */}
      <div className="flex flex-col gap-4">
        <h2 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
          High-Alpha Unicorn Candidates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {unicornStartups.map((startup) => {
            const likelihood = Math.round(75 + (startup.momentumScore * 0.2));
            return (
              <div
                key={startup.id}
                className="bg-surface-container-low rounded-sm p-5 border border-graphite-stroke hover:border-primary/50 transition-all flex flex-col justify-between gap-4 shadow-none"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/startup/${startup.id}`}
                        className="font-sans font-extrabold text-base text-white hover:text-primary transition-colors block"
                      >
                        {startup.name}
                      </Link>
                      <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm text-[8px] font-mono border border-primary/20 uppercase tracking-widest font-bold">
                        {startup.stage}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-on-surface-variant/50 uppercase mt-0.5 block">
                      {startup.sector} // {startup.location}
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

                <p className="font-sans text-xs text-on-surface-variant/70 leading-relaxed line-clamp-2">
                  {startup.description}
                </p>

                {/* Unicorn Likelihood Slider representation */}
                <div>
                  <div className="flex justify-between items-baseline mb-1 text-[9px] font-mono">
                    <span className="text-on-surface-variant/50 uppercase">Unicorn Likelihood Index</span>
                    <span className="text-primary font-bold">{likelihood}%</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-1.5 rounded-sm overflow-hidden border border-graphite-stroke/20">
                    <div
                      className="bg-primary h-full rounded-sm"
                      style={{ width: `${likelihood}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats block */}
                <div className="grid grid-cols-3 gap-4 border-t border-graphite-stroke/40 pt-3 mt-1 font-mono text-[10px]">
                  <div>
                    <span className="text-on-surface-variant/40 block text-[8px] uppercase">Valuation</span>
                    <span className="text-white font-bold">${startup.valuation}M</span>
                  </div>
                  <div className="border-x border-graphite-stroke/45 px-3">
                    <span className="text-on-surface-variant/40 block text-[8px] uppercase">Funding</span>
                    <span className="text-white font-bold">${startup.funding}M</span>
                  </div>
                  <div className="text-right">
                    <span className="text-on-surface-variant/40 block text-[8px] uppercase">Stars Velocity</span>
                    <span className="text-primary font-bold">+{startup.githubStarsWk}/Wk</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
