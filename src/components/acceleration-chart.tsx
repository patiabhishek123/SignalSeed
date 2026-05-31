"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface AccelerationData {
  city: string;
  velocity: number;
}

export default function AccelerationChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data: AccelerationData[] = [
    { city: "Silicon Valley", velocity: 84 },
    { city: "London", velocity: 62 },
    { city: "Tel Aviv", velocity: 45 },
    { city: "Beijing", velocity: 78 },
    { city: "Bengaluru", velocity: 52 },
    { city: "NYC Metro", velocity: 94 },
    { city: "Singapore", velocity: 30 },
    { city: "Berlin", velocity: 68 },
  ];

  if (!mounted) {
    return (
      <div className="w-full h-[280px] bg-[#111317]/50 rounded-lg animate-pulse flex items-end gap-2 p-4 border-l border-b border-[#3c4a42]/30 min-h-[280px]">
        <div className="flex-1 h-[85%] bg-primary/20 border-t-2 border-primary rounded-t-sm"></div>
        <div className="flex-1 h-[62%] bg-primary/20 border-t-2 border-primary rounded-t-sm"></div>
        <div className="flex-1 h-[45%] bg-primary/20 border-t-2 border-primary rounded-t-sm"></div>
        <div className="flex-1 h-[78%] bg-primary/20 border-t-2 border-primary rounded-t-sm"></div>
        <div className="flex-1 h-[52%] bg-primary/20 border-t-2 border-primary rounded-t-sm"></div>
        <div className="flex-1 h-[94%] bg-primary/20 border-t-2 border-primary rounded-t-sm"></div>
        <div className="flex-1 h-[30%] bg-primary/20 border-t-2 border-primary rounded-t-sm"></div>
        <div className="flex-1 h-[68%] bg-primary/20 border-t-2 border-primary rounded-t-sm"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[280px] font-mono text-[10px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 15, right: 10, left: -25, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1c1e22" vertical={false} />
          <XAxis 
            dataKey="city" 
            stroke="#bbcabf" 
            opacity={0.5}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#bbcabf" 
            opacity={0.5}
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111317",
              borderColor: "#3c4a42",
              borderRadius: "4px",
              color: "#e2e2e6",
              fontFamily: "JetBrains Mono, monospace"
            }}
            cursor={{ fill: "#1e2023", opacity: 0.3 }}
          />
          <Bar dataKey="velocity" name="Velocity Index" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => {
              // Highlight NYC Metro with bright primary, others with dim variations
              const isTop = entry.city === "NYC Metro";
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={isTop ? "#4edea3" : "#10b981"} 
                  opacity={isTop ? 1.0 : 0.6}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
