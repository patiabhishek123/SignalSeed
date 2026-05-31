"use client";

import { useEffect, useState, useRef, useTransition } from "react";
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

  // Navigation UI states
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Selected filters (layout structure placeholder)
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedValuation, setSelectedValuation] = useState("All Valuations");

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

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setActiveFilter(null);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const toggleFilter = (filterType: string) => {
    setActiveFilter((prev) => (prev === filterType ? null : filterType));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0D10]/80 backdrop-blur-md border-b border-[#3c4a42]/30">
      {/* Fallback mock banner */}
      {isFallback && (
        <div className="bg-[#ee9800]/10 border-b border-[#ffb95f]/30 px-6 py-1 text-center flex justify-center items-center gap-2">
          <span className="material-symbols-outlined text-[#ffb95f] text-xs">warning</span>
          <span className="font-mono text-[10px] text-[#ffb95f] uppercase tracking-wider">
            Mock Offline Sandbox — database not configured, terminal running in-memory
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 h-auto md:h-16 px-6 py-3 md:py-0 w-full">
        {/* Left Side: Search & Global Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#bbcabf] text-sm">
              search
            </span>
            <input
              className="w-full bg-[#0C0E11] border border-[#3c4a42]/30 hover:border-primary/50 focus:border-primary focus:ring-0 rounded pl-9 pr-4 py-1.5 font-mono text-[11px] text-[#e2e2e6] focus:outline-none transition-all placeholder-[#bbcabf]/30 uppercase"
              placeholder="SEARCH VENTURES..."
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          {/* Global Filters */}
          <div ref={filterRef} className="flex flex-wrap items-center gap-2">
            {/* Sector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleFilter("sector")}
                className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1.5 bg-[#111317] hover:bg-[#1E2023] border border-[#3c4a42]/30 text-[#bbcabf] rounded flex items-center gap-1.5 transition-colors"
              >
                <span>SECTOR: {selectedSector}</span>
                <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
              </button>
              {activeFilter === "sector" && (
                <div className="absolute left-0 mt-1.5 w-40 bg-[#111317] border border-[#3c4a42]/60 rounded shadow-xl overflow-hidden z-50 py-1 font-mono text-[10px]">
                  {["All Sectors", "AI Infra", "Cloud", "Synthetic Bio", "CleanTech", "DevTools"].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        setSelectedSector(sec);
                        setActiveFilter(null);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[#bbcabf] hover:text-white hover:bg-[#1E2023] transition-colors"
                    >
                      {sec.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Stage Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleFilter("stage")}
                className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1.5 bg-[#111317] hover:bg-[#1E2023] border border-[#3c4a42]/30 text-[#bbcabf] rounded flex items-center gap-1.5 transition-colors"
              >
                <span>STAGE: {selectedStage}</span>
                <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
              </button>
              {activeFilter === "stage" && (
                <div className="absolute left-0 mt-1.5 w-40 bg-[#111317] border border-[#3c4a42]/60 rounded shadow-xl overflow-hidden z-50 py-1 font-mono text-[10px]">
                  {["All Stages", "Seed", "Series A", "Series B"].map((stg) => (
                    <button
                      key={stg}
                      type="button"
                      onClick={() => {
                        setSelectedStage(stg);
                        setActiveFilter(null);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[#bbcabf] hover:text-white hover:bg-[#1E2023] transition-colors"
                    >
                      {stg.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Valuation Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleFilter("val")}
                className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1.5 bg-[#111317] hover:bg-[#1E2023] border border-[#3c4a42]/30 text-[#bbcabf] rounded flex items-center gap-1.5 transition-colors"
              >
                <span>VALUATION: {selectedValuation}</span>
                <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
              </button>
              {activeFilter === "val" && (
                <div className="absolute left-0 mt-1.5 w-40 bg-[#111317] border border-[#3c4a42]/60 rounded shadow-xl overflow-hidden z-50 py-1 font-mono text-[10px]">
                  {["All Valuations", "< $10M", "$10M - $50M", "> $50M"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setSelectedValuation(v);
                        setActiveFilter(null);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[#bbcabf] hover:text-white hover:bg-[#1E2023] transition-colors"
                    >
                      {v.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Status Indicators, Clock & User Menu */}
        <div className="flex items-center justify-between sm:justify-end gap-6 border-t md:border-t-0 border-[#3c4a42]/10 pt-3 md:pt-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1A1C1F] rounded border border-[#3c4a42]/30">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
                Live Terminal
              </span>
            </div>

            <span className="hidden sm:inline font-mono text-[10px] text-[#bbcabf]/70">
              {time}
            </span>
          </div>

          {/* User Menu Dropdown */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-[#111317] hover:bg-[#1E2023] border border-[#3c4a42]/30 p-1 pr-3 rounded-full transition-all focus:outline-none"
            >
              <div className="w-7 h-7 rounded-full bg-[#333538] flex items-center justify-center border border-[#3c4a42]/40 overflow-hidden shrink-0">
                <img
                  alt="Investor Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjgnffLqCRMm2pAxDspegT7s-kU91LMh2XabpEk0v1kp_knVNlY6jef8XOXvEBAJZS-N3wfhkWTwIzv1oTwAq3472OA-omRTC9SvQ2oAA3O9YevNFY4UBH05a8f0q9XbdmLNx6DGswdbxIJvDnu7LHhnW0W9KkXuA6x_Or3T6J4Nkg5iLfUOJgNrxMUS10a91mTG1-1a4D6ArJ2X0RPR5WdrGbnU08DYIFaFyXRf0a_3F1epgoR04LcDkZYOurJ7rLZCZxrNccpg"
                />
              </div>
              <span className="font-mono text-[10px] font-bold text-[#e2e2e6] hidden md:inline uppercase tracking-wider">
                Abhishek P.
              </span>
              <span className="material-symbols-outlined text-[#bbcabf] text-xs">arrow_drop_down</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#111317] border border-[#3c4a42]/60 rounded-lg shadow-2xl overflow-hidden z-50 py-2">
                <div className="px-4 py-2 border-b border-[#3c4a42]/20">
                  <p className="font-sans text-xs font-bold text-white leading-tight">Abhishek Pati</p>
                  <p className="font-mono text-[9px] text-[#bbcabf]/50 uppercase tracking-widest mt-0.5">
                    Principal Analyst
                  </p>
                </div>
                <div className="py-1 font-mono text-[10px]">
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[#bbcabf] hover:text-white hover:bg-[#1E2023] transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">person</span>
                    <span>PROFILE SETTINGS</span>
                  </Link>
                  <Link
                    href="/preferences"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[#bbcabf] hover:text-white hover:bg-[#1E2023] transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">tune</span>
                    <span>TERMINAL PREFERENCES</span>
                  </Link>
                  <Link
                    href="/api-keys"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[#bbcabf] hover:text-white hover:bg-[#1E2023] transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">key</span>
                    <span>API GATEWAY KEYS</span>
                  </Link>
                </div>
                <div className="border-t border-[#3c4a42]/20 mt-1 pt-1 font-mono text-[10px]">
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-[#ffb3ad] hover:text-white hover:bg-[#ef4444]/10 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-xs">logout</span>
                    <span>TERMINATE SESSION</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
