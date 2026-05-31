"use client";

import { useState } from "react";

export default function TimeMachinePage() {
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleRunBacktest = () => {
    setRunning(true);
    setCompleted(false);
    setTimeout(() => {
      setRunning(false);
      setCompleted(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-white uppercase">
          Venture Time Machine
        </h1>
        <p className="font-mono text-xs text-[#bbcabf]/60 uppercase tracking-wider mt-1">
          Simulate and backtest momentum trends across historical developer databases
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameters Column */}
        <div className="glass-card rounded-xl p-5 border border-[#3c4a42]/30 flex flex-col gap-4">
          <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider border-b border-[#3c4a42]/20 pb-2">
            Backtest Parameters
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase text-[#bbcabf]/50">Start Epoch</label>
            <select className="bg-[#0C0E11] border border-[#3c4a42]/40 rounded p-2 text-xs font-mono text-[#e2e2e6] focus:outline-none">
              <option>JANUARY 2024</option>
              <option>JULY 2024</option>
              <option>JANUARY 2025</option>
              <option>JULY 2025</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase text-[#bbcabf]/50">Target Sector</label>
            <select className="bg-[#0C0E11] border border-[#3c4a42]/40 rounded p-2 text-xs font-mono text-[#e2e2e6] focus:outline-none">
              <option>ALL SECTORS</option>
              <option>DECENTRALIZED COMPUTE</option>
              <option>SYNTHETIC BIOLOGY</option>
              <option>INFRASTRUCTURE DEVT</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase text-[#bbcabf]/50">Velocity Threshold</label>
            <select className="bg-[#0C0E11] border border-[#3c4a42]/40 rounded p-2 text-xs font-mono text-[#e2e2e6] focus:outline-none">
              <option>&gt; 2.5x growth delta</option>
              <option>&gt; 4.0x growth delta</option>
              <option>&gt; 8.0x growth delta</option>
            </select>
          </div>

          <button
            onClick={handleRunBacktest}
            disabled={running}
            className="w-full bg-primary text-black font-mono font-bold text-xs uppercase tracking-wider py-2.5 rounded hover:brightness-110 transition-colors mt-2 disabled:opacity-50"
          >
            {running ? "Simulating Model..." : "Simulate Backtest"}
          </button>
        </div>

        {/* Results / Screen Column */}
        <div className="lg:col-span-2 bg-[#111317] border border-[#3c4a42]/30 rounded-xl p-5 flex flex-col justify-between min-h-[350px]">
          <div className="flex justify-between items-baseline border-b border-[#3c4a42]/20 pb-2">
            <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
              Simulation Console
            </h3>
            <span className="font-mono text-[9px] text-[#bbcabf]/40 uppercase tracking-widest">
              MONITOR
            </span>
          </div>

          {running && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <p className="font-mono text-xs text-primary uppercase font-bold tracking-widest">
                Aggregating historic datasets...
              </p>
              <p className="text-[10px] text-[#bbcabf]/50 font-mono">
                Matching Github forks & HN comment nodes...
              </p>
            </div>
          )}

          {!running && !completed && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12 text-center">
              <span className="material-symbols-outlined text-[#bbcabf]/30 text-5xl">
                history
              </span>
              <p className="font-mono text-xs text-[#bbcabf]/60 uppercase tracking-wider">
                Simulation idle. Configure parameters and run simulation.
              </p>
            </div>
          )}

          {!running && completed && (
            <div className="flex-1 flex flex-col gap-4 py-4">
              <div className="p-3 bg-primary/10 border border-primary/20 rounded font-mono text-xs text-primary uppercase font-bold tracking-wider flex items-center justify-between">
                <span>Simulation Complete [OK]</span>
                <span>Found 12 correlation vectors</span>
              </div>
              <div className="space-y-2 font-mono text-[10px] text-[#bbcabf]/60 leading-relaxed max-h-[200px] overflow-y-auto pr-1">
                <p>&gt; Loaded epoch database Jan 2024</p>
                <p>&gt; Parsed 1,842 repositories in hardware sector</p>
                <p>&gt; Core momentum intersection check: +42% accuracy score</p>
                <p className="text-white">&gt; 3 entities outperformed index (Nebula, Lumina, Aetheric)</p>
              </div>
            </div>
          )}

          <div className="border-t border-[#3c4a42]/20 pt-3 text-[9px] font-mono text-[#bbcabf]/40 uppercase flex justify-between">
            <span>Terminal Core Model: Backtester_v1.0</span>
            <span>Logs Validated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
