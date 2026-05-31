"use client";

import { useState, useEffect } from "react";

export default function HiddenGemsPage() {
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-8 bg-surface-container-low rounded-sm w-64"></div>
        <div className="h-4 bg-surface-container-low rounded-sm w-96"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface-container-low border border-graphite-stroke h-48 rounded-sm p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-4 bg-surface-container-high rounded-sm w-20"></div>
                <div className="h-6 bg-surface-container-high rounded-sm w-40"></div>
                <div className="h-3 bg-surface-container-high rounded-sm w-full"></div>
                <div className="h-3 bg-surface-container-high rounded-sm w-5/6"></div>
              </div>
              <div className="h-8 bg-surface-container-high rounded-sm w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-white uppercase">
            Hidden Gems Portfolio
          </h1>
          <p className="font-mono text-xs text-on-surface-variant/60 uppercase tracking-wider mt-1">
            Surfacing low-funding, high-momentum technological breakthroughs
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEmpty((prev) => !prev)}
            className="font-mono text-[9px] uppercase tracking-wider px-3 py-1 bg-surface-container-low border border-graphite-stroke text-primary hover:bg-surface-container-high rounded-sm"
          >
            {isEmpty ? "Simulate Data" : "Simulate Empty State"}
          </button>
        </div>
      </div>

      {isEmpty ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center min-h-[350px] border border-dashed border-graphite-stroke/60 rounded-sm p-8 text-center bg-surface-container-lowest/20">
          <span className="material-symbols-outlined text-on-surface-variant/30 text-5xl mb-4">
            diamond
          </span>
          <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-2">
            No Hidden Gems Flagged
          </h3>
          <p className="font-mono text-xs text-on-surface-variant/50 max-w-sm leading-relaxed mb-4">
            Currently, no early-stage startups match the dual telemetry criteria of low capitalization combined with high GitHub star velocity.
          </p>
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "ZeroPoint Compute",
              sector: "Hardware / Quantum",
              description: "Room-temperature superconducting micro-controllers designed for edge-computing optimization.",
              stars: "1.4k",
              valuation: "$4.5M",
            },
            {
              name: "LocalLLM.org",
              sector: "Generative AI Infra",
              description: "WebAssembly model execution library enabling offline inference directly in web applications.",
              stars: "9.2k",
              valuation: "$1.8M",
            },
            {
              name: "HydroGen",
              sector: "CleanTech",
              description: "Distributed local water purification and hydrogen generation systems utilizing solar waste heat.",
              stars: "480",
              valuation: "$3.2M",
            },
          ].map((gem, index) => (
            <div
              key={index}
              className="bg-surface-container-low rounded-sm p-5 flex flex-col justify-between gap-4 border border-graphite-stroke hover:border-primary/50 transition-all shadow-none"
            >
              <div>
                <span className="font-mono text-[9px] text-primary uppercase tracking-widest block mb-1">
                  {gem.sector}
                </span>
                <h3 className="font-sans font-extrabold text-base text-white">
                  {gem.name}
                </h3>
                <p className="font-sans text-xs text-on-surface-variant/70 leading-relaxed mt-2">
                  {gem.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-graphite-stroke/40 pt-3 mt-1 font-mono text-[10px]">
                <div>
                  <span className="text-on-surface-variant/40 block text-[8px] uppercase">Est. Valuation</span>
                  <span className="text-white font-bold">{gem.valuation}</span>
                </div>
                <div className="text-right">
                  <span className="text-on-surface-variant/40 block text-[8px] uppercase">Stars Velocity</span>
                  <span className="text-primary font-bold">{gem.stars}/Wk</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
