"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface HeaderProps {
  isFallback?: boolean;
}

export default function Header({ isFallback = false }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const [time, setTime] = useState("00:00:00 GMT");
  const [, startTransition] = useTransition();

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", { hour12: false, timeZone: "UTC" }) + " GMT";
      setTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      if (searchValue.trim()) {
        router.push(`/dashboard?q=${encodeURIComponent(searchValue.trim())}`);
      } else {
        router.push("/dashboard");
      }
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0D10]/80 backdrop-blur-md border-b border-[#3c4a42]/30">
      {/* Fallback mock banner */}
      {isFallback && (
        <div className="bg-[#ee9800]/10 border-b border-[#ffb95f]/30 px-margin-desktop py-1 text-center flex justify-center items-center gap-2">
          <span className="material-symbols-outlined text-[#ffb95f] text-xs">warning</span>
          <span className="font-mono text-[10px] text-[#ffb95f] uppercase tracking-wider">
            Mock Offline Sandbox — database not configured, terminal running in-memory
          </span>
        </div>
      )}

      <div className="flex justify-between items-center h-16 px-8 max-w-[1440px] mx-auto">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-8 flex-1 max-w-md">
          <div className="relative w-full group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#bbcabf] text-sm">
              search
            </span>
            <input
              className="w-full bg-[#0C0E11] border border-[#3c4a42]/30 hover:border-primary/50 focus:border-primary focus:ring-0 rounded-full pl-9 pr-4 py-1.5 font-mono text-[11px] text-[#e2e2e6] focus:outline-none transition-all placeholder-[#bbcabf]/40 uppercase"
              placeholder="SEARCH VENTURES, CLUSTERS..."
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </form>

        {/* Status Indicators */}
        <div className="flex items-center gap-6 ml-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1C1F] rounded-full border border-[#3c4a42]/30">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
              Live Terminal
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#bbcabf]/70">
            <span className="text-[#bbcabf]" id="header-clock">
              {time}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
