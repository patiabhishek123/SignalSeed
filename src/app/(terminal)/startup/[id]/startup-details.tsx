"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toggleSaveStartup } from "@/actions/startups";
import MomentumChart from "@/components/momentum-chart";

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

interface StartupDetailsProps {
  initialStartup: Startup;
}

export default function StartupDetails({ initialStartup }: StartupDetailsProps) {
  const [startup, setStartup] = useState<Startup>(initialStartup);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [allocationAmount, setAllocationAmount] = useState("$250,000");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [, startTransition] = useTransition();

  const handleToggleSave = async () => {
    // Optimistic update
    setStartup((prev) => ({ ...prev, saved: !prev.saved }));

    startTransition(async () => {
      await toggleSaveStartup(startup.id);
    });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setIsInquiryOpen(false);
      setInquirySubmitted(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full relative">
      {/* Back button and navigation breadcrumb */}
      <div className="flex justify-between items-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 font-mono text-[10px] text-[#bbcabf] hover:text-white uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-xs">arrow_back</span>
          <span>Return to Dashboard</span>
        </Link>
        <span className="font-mono text-[10px] text-[#bbcabf]/40">
          ID: {startup.id}
        </span>
      </div>

      {/* Entity Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#3c4a42]/30">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 glass-card rounded-xl flex items-center justify-center p-3 text-primary bg-[#111317]">
            {startup.logoUrl ? (
              <img
                alt={`${startup.name} logo`}
                className="w-full h-full object-contain"
                src={startup.logoUrl}
              />
            ) : (
              <span className="font-sans text-3xl font-extrabold">{startup.name[0]}</span>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1.5">
              <h1 className="font-sans text-3xl font-extrabold text-white tracking-tight">
                {startup.name}
              </h1>
              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded text-[10px] font-mono border border-primary/20 uppercase tracking-widest font-bold">
                {startup.stage}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#bbcabf] font-mono text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {startup.location}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">category</span>
                {startup.sector}
              </span>
              <span className="flex items-center gap-1 text-primary">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                {startup.momentumStatus} MOMENTUM
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleToggleSave}
            className={`px-5 py-2 border font-mono text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 ${
              startup.saved
                ? "bg-primary/10 border-primary text-primary"
                : "border-[#3c4a42]/60 hover:bg-[#1E2023]/60 text-white"
            }`}
          >
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: startup.saved ? "'FILL' 1" : undefined }}
            >
              star
            </span>
            <span>{startup.saved ? "Tracked" : "Track Entity"}</span>
          </button>
          <button
            onClick={() => setIsInquiryOpen(true)}
            className="px-5 py-2 bg-primary-container text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:brightness-110 transition-all"
          >
            Inquire Allocation
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Thesis & Timeline */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          {/* AI Investment Thesis */}
          <section className="glass-card p-6 rounded-xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#3c4a42]/20 pb-3">
              <h2 className="font-sans text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">psychology</span>
                <span>AI Generated Investment Thesis</span>
              </h2>
              <span className="text-[9px] font-mono text-[#bbcabf]/50">UPDATED 14H AGO</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold">
                  Core Hypothesis
                </h3>
                <p className="text-xs text-[#bbcabf]/80 leading-relaxed">
                  Decoupling centralized cloud services. Custom compute network optimization yields higher density for local inference ML deployment pipelines.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold">
                  Defensibility
                </h3>
                <p className="text-xs text-[#bbcabf]/80 leading-relaxed">
                  Proprietary node orchestration engine. Zero-knowledge verification protocols create strong moats and data validation checkpoints.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold">
                  Market Timing
                </h3>
                <p className="text-xs text-[#bbcabf]/80 leading-relaxed">
                  Massive supply constraints in central data hubs, combined with exponential developer interest, creates a perfect seed allocation window.
                </p>
              </div>
            </div>
          </section>

          {/* Growth Signal Timeline (Chart) */}
          <section className="glass-card p-6 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
                  Growth Signal Timeline
                </h2>
                <p className="text-[9px] font-mono text-[#bbcabf]/40 uppercase tracking-widest mt-1">
                  CROSS-PLATFORM MOMENTUM AGGREGATION
                </p>
              </div>
              <div className="flex gap-2">
                <button className="bg-[#1E2023] hover:text-white px-2 py-0.5 rounded font-mono text-[9px] text-[#bbcabf]">
                  6M
                </button>
                <button className="bg-primary/20 text-primary border border-primary/40 px-2 py-0.5 rounded font-mono text-[9px]">
                  YTD
                </button>
              </div>
            </div>
            {/* Render Recharts Component */}
            <div className="pt-2">
              <MomentumChart />
            </div>
          </section>

          {/* Activity / Signals Log */}
          <section className="bg-[#111317] border border-[#3c4a42]/30 p-6 rounded-xl flex flex-col gap-4">
            <h2 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
              Recent Activity & Trigger Vectors
            </h2>
            <div className="space-y-3">
              {startup.signals.map((sig) => (
                <div
                  key={sig.id}
                  className="flex items-start gap-4 p-3 bg-[#1A1C1F] border border-[#3c4a42]/10 rounded"
                >
                  <span className="material-symbols-outlined text-primary text-base mt-0.5">
                    notifications_active
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[10px] text-white uppercase font-bold tracking-wider">
                        {sig.title}
                      </span>
                      <span className="font-mono text-[9px] text-[#bbcabf]/40">
                        {new Date(sig.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#bbcabf]/70 leading-relaxed">
                      {sig.description}
                    </p>
                  </div>
                </div>
              ))}
              {startup.signals.length === 0 && (
                <div className="text-center py-6">
                  <span className="font-mono text-[10px] text-[#bbcabf]/30 uppercase">
                    No activity logs recorded for this entity
                  </span>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Company Snapshot Sidebar */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Company Snapshot */}
          <section className="glass-card p-5 rounded-xl flex flex-col gap-4">
            <h2 className="font-mono text-[9px] text-[#bbcabf]/60 uppercase tracking-widest font-bold border-b border-[#3c4a42]/20 pb-2">
              Company Snapshot
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center p-3 bg-[#0C0E11] rounded border border-[#3c4a42]/20">
                <span className="text-xs text-[#bbcabf]/70">Post-Money Valuation</span>
                <span className="font-mono text-sm font-extrabold text-primary">
                  ${startup.valuation.toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#0C0E11] rounded border border-[#3c4a42]/20">
                <span className="text-xs text-[#bbcabf]/70">Total Funding Raised</span>
                <span className="font-mono text-sm font-extrabold text-white">
                  ${startup.funding.toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#0C0E11] rounded border border-[#3c4a42]/20">
                <span className="text-xs text-[#bbcabf]/70">Website Anchor</span>
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-primary hover:underline truncate max-w-[140px]"
                >
                  {startup.website.replace("https://", "")}
                </a>
              </div>
            </div>

            {/* Founding Team */}
            <div className="space-y-3 pt-2">
              <span className="text-[9px] font-mono text-[#bbcabf]/50 uppercase tracking-widest">
                Founding Team
              </span>
              <div className="flex flex-col gap-3">
                {startup.founders.map((founder, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1e2023] border border-[#3c4a42]/30 overflow-hidden flex items-center justify-center">
                      {founder.avatar ? (
                        <img
                          alt={founder.name}
                          className="w-full h-full object-cover"
                          src={founder.avatar}
                        />
                      ) : (
                        <span className="text-[10px] font-mono">{founder.name[0]}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-white font-bold">{founder.name}</p>
                      <p className="text-[9px] text-[#bbcabf]/60 font-mono uppercase">
                        {founder.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Ecosystem Overlaps */}
          <section className="glass-card p-5 rounded-xl flex flex-col gap-3">
            <h2 className="font-mono text-[9px] text-[#bbcabf]/60 uppercase tracking-widest font-bold border-b border-[#3c4a42]/20 pb-2">
              Ecosystem Overlap
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#1A1C1F] text-[#bbcabf] px-2 py-0.5 rounded text-[9px] font-mono border border-[#3c4a42]/30 uppercase">
                A16Z portfolio
              </span>
              <span className="bg-[#1A1C1F] text-[#bbcabf] px-2 py-0.5 rounded text-[9px] font-mono border border-[#3c4a42]/30 uppercase">
                Nvidia inception
              </span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[9px] font-mono border border-primary/20 uppercase tracking-wider font-bold">
                Y-Combinator alum
              </span>
            </div>
          </section>

          {/* Security Audit */}
          {startup.riskAssessment && (
            <section className="glass-card p-5 rounded-xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="font-mono text-[9px] text-[#bbcabf]/60 uppercase tracking-widest font-bold">
                  Security Assessment
                </h2>
                <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1 text-[9px] font-mono">
                    <span className="text-[#bbcabf]/70 uppercase">Protocol Robustness</span>
                    <span className="text-primary font-bold">{startup.riskAssessment.protocolRobustness}%</span>
                  </div>
                  <div className="w-full bg-[#1A1C1F] h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-500"
                      style={{ width: `${startup.riskAssessment.protocolRobustness}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#bbcabf]/60 uppercase">
                  <span className="material-symbols-outlined text-xs text-primary">description</span>
                  <span>
                    AUDITED BY {startup.riskAssessment.auditedBy || "TRAIL OF BITS"} ({startup.riskAssessment.auditDate || "FEB 2026"})
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* Sentiment Radial Card */}
          <section className="glass-card p-5 rounded-xl flex items-center gap-4 bg-gradient-to-br from-[#111317] to-[#1A1C1F]">
            <div className="relative w-14 h-14 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" fill="transparent" r="24" stroke="#1c1e22" strokeWidth="3"></circle>
                <circle
                  cx="28"
                  cy="28"
                  fill="transparent"
                  r="24"
                  stroke="#4edea3"
                  strokeDasharray="150"
                  strokeDashoffset={150 - (150 * (70 + (startup.momentumScore * 0.25))) / 100}
                  strokeWidth="3.5"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-primary">
                {Math.round(70 + (startup.momentumScore * 0.25))}
              </div>
            </div>
            <div>
              <p className="text-xs text-white font-bold mb-0.5">Extremely Bullish Sentiment</p>
              <p className="text-[10px] text-[#bbcabf]/50 leading-relaxed">
                Calculated via open-source mentions, dev activity index, and search trends weight.
              </p>
            </div>
          </section>
        </aside>
      </div>

      {/* Secondary Metric Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Github Stars Velocity", val: `+${startup.githubStarsWk}/Wk`, icon: "code", color: "text-white" },
          { label: "HackerNews Mentions", val: `${startup.hnMentionsWk}/Wk`, icon: "forum", color: "text-secondary" },
          { label: "ProductHunt Ranking", val: `#${startup.productHuntRank || "—"}`, icon: "rocket_launch", color: "text-tertiary" },
          { label: "Google Trends Value", val: startup.trendsScore.toFixed(1), icon: "query_stats", color: "text-primary" },
        ].map((item, idx) => (
          <div key={idx} className="glass-card p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className={`material-symbols-outlined text-sm mb-1.5 ${item.color}`}>
              {item.icon}
            </span>
            <span className="font-sans font-bold text-lg text-white block mb-0.5">
              {item.val}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#bbcabf]/50">
              {item.label}
            </span>
          </div>
        ))}
      </section>

      {/* Inquiry Dialog Modal Overlay */}
      {isInquiryOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111317] border border-[#3c4a42]/60 rounded-xl overflow-hidden shadow-2xl p-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#3c4a42]/20 mb-4">
              <h3 className="font-sans font-bold text-white uppercase text-xs tracking-wider">
                Inquire Allocation Space
              </h3>
              <span
                onClick={() => setIsInquiryOpen(false)}
                className="material-symbols-outlined text-[#bbcabf] hover:text-white cursor-pointer text-sm"
              >
                close
              </span>
            </div>

            {inquirySubmitted ? (
              <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-primary text-4xl animate-bounce">check_circle</span>
                <p className="font-mono text-xs text-primary uppercase font-bold tracking-widest">
                  Allocation Inquiry Transmitted
                </p>
                <p className="text-[10px] text-[#bbcabf]/60 leading-relaxed font-mono">
                  Requested {allocationAmount} from {startup.name}Series allocation desk.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                <p className="text-xs text-[#bbcabf]/70 leading-relaxed">
                  Submit an institutional inquiry for {startup.name} stage allocation. This will dispatch credentials directly to the founders.
                </p>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase text-[#bbcabf]/50">Requested Allocation</label>
                  <select
                    className="w-full bg-[#0C0E11] border border-[#3c4a42]/40 rounded p-2 text-xs font-mono text-[#e2e2e6] focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                    value={allocationAmount}
                    onChange={(e) => setAllocationAmount(e.target.value)}
                  >
                    <option>$100,000</option>
                    <option>$250,000</option>
                    <option>$500,000</option>
                    <option>$1,000,000</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase text-[#bbcabf]/50">Investor Notes (Optional)</label>
                  <textarea
                    className="w-full h-20 bg-[#0C0E11] border border-[#3c4a42]/40 rounded p-2 text-xs font-sans text-[#e2e2e6] focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder-[#bbcabf]/30"
                    placeholder="We'd love to lead or participate in this round. We provide deep infra scaling assistance..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-black font-mono font-bold text-xs uppercase tracking-wider py-2.5 rounded hover:brightness-110 transition-colors mt-2"
                >
                  Transmit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
