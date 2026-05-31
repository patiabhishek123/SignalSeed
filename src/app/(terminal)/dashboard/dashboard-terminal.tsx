"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock Data for Momentum Trend Chart
const TREND_DATA = [
  { date: "May 01", "ZeroPoint": 45, "LocalLLM": 62, "HydroGen": 55 },
  { date: "May 05", "ZeroPoint": 48, "LocalLLM": 68, "HydroGen": 58 },
  { date: "May 10", "ZeroPoint": 58, "LocalLLM": 74, "HydroGen": 60 },
  { date: "May 15", "ZeroPoint": 65, "LocalLLM": 79, "HydroGen": 63 },
  { date: "May 20", "ZeroPoint": 74, "LocalLLM": 82, "HydroGen": 70 },
  { date: "May 25", "ZeroPoint": 81, "LocalLLM": 88, "HydroGen": 73 },
  { date: "May 30", "ZeroPoint": 84.5, "LocalLLM": 92.1, "HydroGen": 76.8 },
];

// Mock Data for Tables and Unicorns
const EMERGING_STARTUPS = [
  { id: "zeropoint", name: "ZeroPoint Compute", category: "Hardware", momentum: 84.5, status: "STRONG", change: "+12.4%" },
  { id: "localllm", name: "LocalLLM.org", category: "AI Infra", momentum: 92.1, status: "STRONG", change: "+8.2%" },
  { id: "hydrogen", name: "HydroGen", category: "CleanTech", momentum: 76.8, status: "STABLE", change: "+2.1%" },
  { id: "cloudweave", name: "CloudWeave", category: "DevOps", momentum: 81.3, status: "STRONG", change: "+5.9%" },
];

const HIDDEN_GEMS = [
  { id: "neuromesh", name: "NeuroMesh", momentum: 79.2, attention: "LOW", score: 94 },
  { id: "biosynth", name: "BioSynth", momentum: 72.5, attention: "MEDIUM", score: 89 },
  { id: "deeptrace", name: "DeepTrace", momentum: 81.0, attention: "LOW", score: 92 },
  { id: "optima", name: "Optima", momentum: 68.4, attention: "LOW", score: 86 },
];

const FUTURE_UNICORNS = [
  { id: "hyperscale", name: "HyperScale AI", stage: "SERIES B", valuation: 145, probability: 94, funding: 32 },
  { id: "quantflow", name: "QuantFlow", stage: "SERIES A", valuation: 85, probability: 88, funding: 18 },
  { id: "ethernet", name: "EtherNet", stage: "SERIES B", valuation: 120, probability: 91, funding: 24 },
];

export default function DashboardTerminal() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration layout shift
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Page Header */}
      <div>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-white uppercase">
          Venture Intelligence Terminal
        </h1>
        <p className="font-mono text-xs text-on-surface-variant/60 uppercase tracking-wider mt-1">
          Real-time momentum indicators & institutional signal dashboards
        </p>
      </div>

      {/* 1. KPI Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Startups Tracked", val: "84", change: "+12 this week", icon: "monitoring", color: "text-primary" },
          { label: "Momentum Leaders", val: "18", change: "Active alerts", icon: "bolt", color: "text-secondary" },
          { label: "Hidden Gems", val: "7", change: "Flagged low-attention", icon: "diamond", color: "text-tertiary" },
          { label: "Categories Covered", val: "12", change: "Sectors indexed", icon: "category", color: "text-primary" },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className="bg-surface-container-low border border-graphite-stroke p-5 rounded-sm flex flex-col justify-between shadow-none hover:border-primary/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/60">
                {kpi.label}
              </span>
              <span className={`material-symbols-outlined text-sm ${kpi.color}`}>
                {kpi.icon}
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl font-extrabold text-white block">
                {kpi.val}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-on-surface-variant/40 mt-1 block">
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* 2. Momentum Trend Chart */}
      <section className="bg-surface-container-low border border-graphite-stroke p-5 rounded-sm flex flex-col gap-4">
        <div>
          <h2 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Momentum Growth Trends
          </h2>
          <p className="text-[9px] font-mono text-on-surface-variant/40 uppercase tracking-widest mt-0.5">
            Cross-platform signal velocity aggregation historical timelines
          </p>
        </div>

        <div className="w-full h-[280px]">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="date" stroke="#bbcabf" opacity={0.5} tickLine={false} axisLine={false} />
                <YAxis stroke="#bbcabf" opacity={0.5} domain={[30, 100]} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1c1b1b",
                    borderColor: "#2a2a2a",
                    borderRadius: "2px",
                    color: "#e5e2e1",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "10px"
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "9px",
                    paddingTop: "15px"
                  }}
                  iconSize={8}
                />
                <Line type="monotone" dataKey="ZeroPoint" name="ZeroPoint Compute" stroke="#4edea3" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="LocalLLM" name="LocalLLM.org" stroke="#adc6ff" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="HydroGen" name="HydroGen" stroke="#c6c7c0" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full bg-surface-container-lowest rounded-sm animate-pulse flex items-center justify-center font-mono text-[10px] text-on-surface-variant/30 uppercase">
              Rendering Chart Canvas...
            </div>
          )}
        </div>
      </section>

      {/* Tables Row: Emerging & Hidden Gems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3. Emerging Startups Table */}
        <section className="flex flex-col gap-3">
          <h2 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Emerging Startups Telemetry
          </h2>
          <div className="bg-surface-container-low border border-graphite-stroke rounded-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container border-b border-graphite-stroke">
                <tr>
                  <th className="p-3 font-mono text-[9px] text-on-surface-variant/50 uppercase">Startup</th>
                  <th className="p-3 font-mono text-[9px] text-on-surface-variant/50 uppercase">Category</th>
                  <th className="p-3 font-mono text-[9px] text-on-surface-variant/50 uppercase text-right">Momentum</th>
                  <th className="p-3 font-mono text-[9px] text-on-surface-variant/50 uppercase text-right">Weekly Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-stroke/40">
                {EMERGING_STARTUPS.map((startup) => (
                  <tr key={startup.id} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="p-3">
                      <Link href={`/startup/${startup.id}`} className="font-sans font-bold text-xs text-white hover:text-primary transition-colors">
                        {startup.name}
                      </Link>
                    </td>
                    <td className="p-3 font-mono text-[10px] text-on-surface-variant">{startup.category}</td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-xs font-bold text-primary">{startup.momentum.toFixed(1)}</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-xs font-bold text-primary">{startup.change}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Hidden Gems Table */}
        <section className="flex flex-col gap-3">
          <h2 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Hidden Gems Flagged
          </h2>
          <div className="bg-surface-container-low border border-graphite-stroke rounded-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container border-b border-graphite-stroke">
                <tr>
                  <th className="p-3 font-mono text-[9px] text-on-surface-variant/50 uppercase">Startup</th>
                  <th className="p-3 font-mono text-[9px] text-on-surface-variant/50 uppercase text-right">Momentum</th>
                  <th className="p-3 font-mono text-[9px] text-on-surface-variant/50 uppercase text-right">Investor Attention</th>
                  <th className="p-3 font-mono text-[9px] text-on-surface-variant/50 uppercase text-right">Gem Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-stroke/40">
                {HIDDEN_GEMS.map((gem) => (
                  <tr key={gem.id} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="p-3">
                      <Link href={`/startup/${gem.id}`} className="font-sans font-bold text-xs text-white hover:text-primary transition-colors">
                        {gem.name}
                      </Link>
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-xs font-bold text-on-surface-variant">{gem.momentum.toFixed(1)}</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-[10px] text-error uppercase font-bold">{gem.attention}</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-xs font-bold text-primary">{gem.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* 5. Future Unicorns Section */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Future Unicorn Candidates
          </h2>
          <p className="text-[9px] font-mono text-on-surface-variant/40 uppercase tracking-widest mt-0.5">
            Top ranked startups showing maximum enterprise valuation growth signals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FUTURE_UNICORNS.map((unicorn) => (
            <div
              key={unicorn.id}
              className="bg-surface-container-low border border-graphite-stroke p-5 rounded-sm flex flex-col justify-between gap-4 hover:border-primary/50 transition-all shadow-none"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-sans font-bold text-sm text-white">
                    {unicorn.name}
                  </h3>
                  <span className="font-mono text-[8px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-sm uppercase tracking-widest font-bold mt-1 inline-block">
                    {unicorn.stage}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-on-surface-variant/40 block text-[8px] font-mono uppercase">Unicorn Prob</span>
                  <span className="text-primary font-mono text-base font-bold">{unicorn.probability}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-graphite-stroke/40 pt-3 mt-1 font-mono text-[10px]">
                <div>
                  <span className="text-on-surface-variant/40 block text-[8px] uppercase">Valuation</span>
                  <span className="text-white font-bold">${unicorn.valuation}M</span>
                </div>
                <div className="text-right">
                  <span className="text-on-surface-variant/40 block text-[8px] uppercase">Total Funding</span>
                  <span className="text-white font-bold">${unicorn.funding}M</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
