"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartDataPoint {
  date: string;
  score: number;
  benchmark: number;
}

interface MomentumChartProps {
  scoreHistory?: { date: string; score: number }[];
}

export default function MomentumChart({ scoreHistory }: MomentumChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate realistic historical curve leading to the current scores
  const chartData: ChartDataPoint[] = scoreHistory && scoreHistory.length > 0
    ? scoreHistory.map((item) => ({
        date: item.date,
        score: item.score,
        benchmark: 60 + Math.random() * 10
      }))
    : [
        { date: "Q1 2025", score: 62.4, benchmark: 60.0 },
        { date: "Q2 2025", score: 68.1, benchmark: 61.5 },
        { date: "Q3 2025", score: 75.6, benchmark: 62.1 },
        { date: "Q4 2025", score: 84.8, benchmark: 63.4 },
        { date: "Q1 2026", score: 94.2, benchmark: 64.2 },
      ];

  if (!mounted) {
    // SVG placeholder to prevent hydration error / layout shift
    return (
      <div className="w-full h-full flex items-center justify-center bg-surface-container-low rounded-sm animate-pulse min-h-[320px]">
        <svg className="w-full h-full p-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
          <path d="M0,280 Q100,260 200,240 T400,180 T600,140 T800,80 T1000,40" fill="none" stroke="#4edea3" strokeWidth="3" opacity="0.3"></path>
          <line stroke="#2a2a2a" strokeDasharray="4" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50"></line>
          <line stroke="#2a2a2a" strokeDasharray="4" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150"></line>
          <line stroke="#2a2a2a" strokeDasharray="4" strokeWidth="1" x1="0" x2="1000" y1="250" y2="250"></line>
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-[320px] font-mono text-[10px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4edea3" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4edea3" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#bbcabf" 
            opacity={0.5}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#bbcabf" 
            opacity={0.5}
            domain={[30, 100]}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1b1b",
              borderColor: "#2a2a2a",
              borderRadius: "2px",
              color: "#e5e2e1",
              fontFamily: "JetBrains Mono, monospace"
            }}
          />
          <Area
            type="monotone"
            dataKey="score"
            name="Momentum Score"
            stroke="#4edea3"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorScore)"
          />
          <Area
            type="monotone"
            dataKey="benchmark"
            name="S&P Venture Index"
            stroke="#3c4a42"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
