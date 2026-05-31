"use client";

import { useState, useEffect, useRef } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";

interface Milestone {
  step: number;
  date: string;
  title: string;
  type: "GITHUB" | "HN" | "FUNDING" | "PRODUCT_HUNT";
  description: string;
  value: string;
}

interface DataPoint {
  step: number;
  date: string;
  score: number;
  stars: number;
  mentions: number;
}

const HISTORICAL_DATA: DataPoint[] = [
  { step: 0, date: "Jan 01", score: 35, stars: 120, mentions: 5 },
  { step: 5, date: "Jan 15", score: 36, stars: 145, mentions: 8 },
  { step: 10, date: "Feb 01", score: 38, stars: 180, mentions: 12 },
  { step: 15, date: "Feb 15", score: 40, stars: 210, mentions: 15 },
  { step: 20, date: "Mar 01", score: 42, stars: 250, mentions: 22 },
  { step: 25, date: "Mar 15", score: 45, stars: 310, mentions: 30 },
  { step: 30, date: "Apr 01", score: 48, stars: 400, mentions: 45 },
  { step: 35, date: "Apr 15", score: 55, stars: 650, mentions: 120 }, // HN Launch
  { step: 40, date: "May 01", score: 62, stars: 980, mentions: 85 },
  { step: 45, date: "May 15", score: 65, stars: 1200, mentions: 70 },
  { step: 50, date: "Jun 01", score: 68, stars: 1450, mentions: 60 },
  { step: 55, date: "Jun 15", score: 70, stars: 1700, mentions: 55 },
  { step: 60, date: "Jul 01", score: 72, stars: 2100, mentions: 90 }, // GitHub Viral
  { step: 65, date: "Jul 15", score: 79, stars: 3800, mentions: 110 },
  { step: 70, date: "Aug 01", score: 82, stars: 4500, mentions: 95 },
  { step: 75, date: "Aug 15", score: 84, stars: 5100, mentions: 80 },
  { step: 80, date: "Sep 01", score: 85, stars: 5800, mentions: 150 }, // Seed Round
  { step: 85, date: "Sep 15", score: 92, stars: 7400, mentions: 210 },
  { step: 90, date: "Oct 01", score: 95, stars: 8900, mentions: 180 },
  { step: 95, date: "Oct 15", score: 97, stars: 9600, mentions: 140 },
  { step: 100, date: "Nov 01", score: 99, stars: 10200, mentions: 125 },
];

const MILESTONES: Milestone[] = [
  {
    step: 35,
    date: "Apr 15",
    title: "Hacker News #1 Show HN",
    type: "HN",
    description: "Featured on Frontpage for 14 hours. Technical breakdown sparked deep debate.",
    value: "120 mentions/wk",
  },
  {
    step: 60,
    date: "Jul 01",
    title: "GitHub Repo Goes Viral",
    type: "GITHUB",
    description: "Star velocity crossed +1,700/wk threshold. Added to trending repositories list.",
    value: "3,800 total stars",
  },
  {
    step: 80,
    date: "Sep 01",
    title: "$2.5M Seed Round Closed",
    type: "FUNDING",
    description: "Led by top-tier developer tooling VC. Oversubscribed allocation desk.",
    value: "$2.5M Stage: Seed",
  },
];

export default function TimeMachinePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 5 | 10>(5);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSector, setSelectedSector] = useState("DECENTRALIZED COMPUTE");
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Playback Loop Effect
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 300 / playbackSpeed;
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 5;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Check for milestones when currentStep changes
  useEffect(() => {
    const milestone = MILESTONES.find((m) => m.step === currentStep);
    if (milestone) {
      setActiveMilestone(milestone);
      // Auto close/fade milestone display after a delay if playing fast
      const timer = setTimeout(() => {
        setActiveMilestone(null);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setActiveMilestone(null);
    }
  }, [currentStep]);

  // Slice historical data up to current step
  const activeChartData = HISTORICAL_DATA.filter((d) => d.step <= currentStep);
  const latestData = activeChartData[activeChartData.length - 1] || HISTORICAL_DATA[0];

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setActiveMilestone(null);
  };

  const getMilestoneIcon = (type: string) => {
    if (type === "GITHUB") return "code";
    if (type === "HN") return "forum";
    if (type === "FUNDING") return "payments";
    return "workspace_premium";
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-white uppercase">
          Venture Time Machine
        </h1>
        <p className="font-mono text-xs text-on-surface-variant/60 uppercase tracking-wider mt-1">
          Historical growth simulation & trigger vector backtesting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Parameters & Configuration */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-low border border-graphite-stroke p-5 rounded-sm shadow-none">
            <h3 className="font-sans text-xs font-bold text-white uppercase tracking-wider border-b border-graphite-stroke/40 pb-2 mb-4">
              Simulation Controller
            </h3>

            <div className="flex flex-col gap-4">
              {/* Target Entity/Sector */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase text-on-surface-variant/50">Target Sector</label>
                <select 
                  value={selectedSector}
                  onChange={(e) => {
                    setSelectedSector(e.target.value);
                    handleReset();
                  }}
                  className="bg-surface-container-lowest border border-graphite-stroke rounded-sm p-2 text-xs font-mono text-on-surface focus:outline-none"
                >
                  <option>DECENTRALIZED COMPUTE</option>
                  <option>ZERO-KNOWLEDGE INFRA</option>
                  <option>SYNTHETIC BIOLOGY</option>
                </select>
              </div>

              {/* Playback speed */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase text-on-surface-variant/50">Playback Speed</label>
                <div className="grid grid-cols-3 gap-2">
                  {([1, 5, 10] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`font-mono text-xs py-1.5 rounded-sm border transition-colors ${
                        playbackSpeed === speed
                          ? "bg-primary text-black font-bold border-primary"
                          : "bg-surface-container-lowest border-graphite-stroke text-on-surface-variant hover:text-white"
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Slider scrubber */}
              <div className="flex flex-col gap-1.5 pt-2">
                <div className="flex justify-between items-center text-[9px] font-mono text-on-surface-variant/60">
                  <span>TIMELINE PROGRESS</span>
                  <span className="text-primary font-bold">{currentStep}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={currentStep}
                  onChange={(e) => setCurrentStep(Number(e.target.value))}
                  className="w-full h-1 bg-surface-container-lowest rounded-sm appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Play / Pause / Reset controls */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`py-2 px-4 rounded-sm font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isPlaying 
                      ? "bg-surface-container-high border border-primary text-primary"
                      : "bg-primary text-black hover:brightness-110"
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">
                    {isPlaying ? "pause" : "play_arrow"}
                  </span>
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="bg-surface-container-lowest border border-graphite-stroke hover:bg-surface-container-high text-on-surface-variant hover:text-white py-2 px-4 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-xs">replay</span>
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Stats */}
          <div className="bg-surface-container-low border border-graphite-stroke p-5 rounded-sm shadow-none flex flex-col gap-4">
            <h3 className="font-sans text-xs font-bold text-white uppercase tracking-wider border-b border-graphite-stroke/40 pb-2">
              Epoch Telemetry
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-surface-container-lowest border border-graphite-stroke/40 rounded-sm">
                <span className="font-mono text-[8px] text-on-surface-variant/50 uppercase block mb-1">Momentum Score</span>
                <span className="font-mono text-lg font-bold text-primary">{latestData.score.toFixed(1)}</span>
              </div>
              <div className="p-3 bg-surface-container-lowest border border-graphite-stroke/40 rounded-sm">
                <span className="font-mono text-[8px] text-on-surface-variant/50 uppercase block mb-1">GitHub Stars</span>
                <span className="font-mono text-lg font-bold text-white">{latestData.stars}</span>
              </div>
              <div className="p-3 bg-surface-container-lowest border border-graphite-stroke/40 rounded-sm col-span-2">
                <span className="font-mono text-[8px] text-on-surface-variant/50 uppercase block mb-1">Hacker News Mentions</span>
                <span className="font-mono text-base font-bold text-secondary">{latestData.mentions}/Wk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: GrowthReplayCanvas & Milestone Markers */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* GrowthReplayCanvas Chart Panel */}
          <div className="bg-surface-container-low border border-graphite-stroke p-5 rounded-sm shadow-none flex flex-col gap-4 relative min-h-[380px]">
            <div className="flex justify-between items-center border-b border-graphite-stroke/40 pb-2">
              <h3 className="font-sans text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-sm">auto_graph</span>
                <span>Growth Replay Canvas</span>
              </h3>
              <span className="font-mono text-[9px] text-on-surface-variant/40">
                ACTIVE EPOCH: JAN 2024 - DEC 2025
              </span>
            </div>

            {/* Recharts Canvas */}
            <div className="w-full h-[260px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReplayScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4edea3" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#4edea3" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                  <XAxis dataKey="date" stroke="#bbcabf" opacity={0.5} tickLine={false} axisLine={false} />
                  <YAxis stroke="#bbcabf" opacity={0.5} domain={[20, 110]} tickLine={false} axisLine={false} />
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
                  <Area
                    type="monotone"
                    dataKey="score"
                    name="Momentum Score"
                    stroke="#4edea3"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorReplayScore)"
                  />
                  {/* Render dot references for milestones that have occurred */}
                  {MILESTONES.filter((m) => m.step <= currentStep).map((m, idx) => {
                    const matchedPoint = HISTORICAL_DATA.find((pt) => pt.step === m.step);
                    if (!matchedPoint) return null;
                    return (
                      <ReferenceDot
                        key={idx}
                        x={m.date}
                        y={matchedPoint.score}
                        r={4}
                        fill="#4edea3"
                        stroke="#131313"
                        strokeWidth={1.5}
                      />
                    );
                  })}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Floating Pop-over MilestoneMarker */}
            {activeMilestone && (
              <div className="absolute top-16 right-6 left-6 md:left-auto md:w-80 bg-surface-container-low border border-primary/50 p-4 rounded-sm shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 z-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-primary text-base">
                    {getMilestoneIcon(activeMilestone.type)}
                  </span>
                  <span className="font-mono text-[9px] text-primary uppercase font-bold tracking-widest">
                    Milestone Trigger Reached
                  </span>
                </div>
                <h4 className="font-sans text-xs font-bold text-white uppercase mb-1">
                  {activeMilestone.title} ({activeMilestone.date})
                </h4>
                <p className="text-[10px] text-on-surface-variant/80 leading-relaxed mb-2">
                  {activeMilestone.description}
                </p>
                <div className="bg-surface-container-lowest p-2 rounded-sm border border-graphite-stroke/60 font-mono text-[9px] flex justify-between text-on-surface-variant">
                  <span>METRIC DELTA:</span>
                  <span className="text-white font-bold">{activeMilestone.value}</span>
                </div>
              </div>
            )}
          </div>

          {/* Simulation Event Logs Terminal */}
          <div className="bg-surface-container-low border border-graphite-stroke p-5 rounded-sm shadow-none flex flex-col gap-3">
            <h3 className="font-sans text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-sm font-bold">terminal</span>
              <span>Simulation Event Logs</span>
            </h3>
            
            <div className="bg-surface-container-lowest p-3 border border-graphite-stroke/40 rounded-sm font-mono text-[10px] text-on-surface-variant/70 leading-relaxed min-h-[120px] max-h-[160px] overflow-y-auto space-y-1">
              <p>&gt; Initializing backtester for target sector: <span className="text-white">"{selectedSector}"</span></p>
              <p>&gt; Epoch database loaded: 24 months, starting Jan 2024</p>
              
              {currentStep >= 10 && <p>&gt; [T+10] Querying star repositories... baseline stars verified.</p>}
              {currentStep >= 35 && (
                <p className="text-primary font-bold">
                  &gt; [T+35] MILESTONE: Hacker News thread reached #1 Show HN. Trigger delta +15x.
                </p>
              )}
              {currentStep >= 50 && <p>&gt; [T+50] Scaling developer community indexes... stable growth pattern observed.</p>}
              {currentStep >= 60 && (
                <p className="text-primary font-bold">
                  &gt; [T+60] MILESTONE: GitHub repository goes viral. Velocity +1,700 stars/wk.
                </p>
              )}
              {currentStep >= 75 && <p>&gt; [T+75] Venture signals triggering corporate radar alerts.</p>}
              {currentStep >= 80 && (
                <p className="text-secondary font-bold">
                  &gt; [T+80] MILESTONE: Seed allocation closed. $2.5M capital deployed.
                </p>
              )}
              {currentStep >= 100 && (
                <p className="text-white font-bold">
                  &gt; [T+100] SIMULATION CONCLUDED. Alpha metrics fully recorded.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
