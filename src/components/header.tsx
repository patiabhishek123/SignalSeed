"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

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

  // Selected filters
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
    <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/80 backdrop-blur-md border-b border-graphite-stroke">
      {/* Fallback mock banner */}
      {isFallback && (
        <div className="bg-error-container/10 border-b border-error/20 px-6 py-1 text-center flex justify-center items-center gap-2">
          <span className="material-symbols-outlined text-error text-xs">warning</span>
          <span className="font-mono text-[10px] text-error uppercase tracking-wider">
            Mock Offline Sandbox — database not configured, terminal running in-memory
          </span>
        </div>
      )}

      {/* Main TopNavBar: Persistent 48px height (h-12) */}
      <div className="flex items-center justify-between h-12 px-6 w-full">
        {/* Left Side: Breadcrumbs & Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center gap-1.5 font-mono text-[10px] text-on-surface-variant/60">
            <span className="hover:text-primary cursor-pointer transition-colors uppercase">SIGNAL</span>
            <span className="text-[8px] text-graphite-stroke">/</span>
            <span className="text-on-surface-variant font-semibold uppercase">TERMINAL</span>
          </div>

          <span className="hidden md:inline text-[12px] text-graphite-stroke font-light">|</span>

          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs group">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/40 text-xs">
              search
            </span>
            <input
              className="w-full bg-surface-container-lowest border border-graphite-stroke hover:border-primary/50 focus:border-primary focus:ring-0 rounded-sm pl-8 pr-4 py-1 font-mono text-[10px] text-on-surface focus:outline-none transition-all placeholder-on-surface-variant/30 uppercase"
              placeholder="SEARCH VENTURES..."
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          {/* Global Filters */}
          <div ref={filterRef} className="hidden lg:flex items-center gap-1.5 ml-2">
            {/* Sector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleFilter("sector")}
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 bg-surface-container-low hover:bg-surface-container-high border border-graphite-stroke text-on-surface-variant rounded-sm flex items-center gap-1 transition-colors"
              >
                <span>SECTOR: {selectedSector}</span>
                <span className="material-symbols-outlined text-[10px]">arrow_drop_down</span>
              </button>
              {activeFilter === "sector" && (
                <div className="absolute left-0 mt-1 w-36 bg-surface-container-low border border-graphite-stroke rounded-sm shadow-xl overflow-hidden z-50 py-0.5 font-mono text-[9px]">
                  {["All Sectors", "AI Infra", "Cloud", "Synthetic Bio", "CleanTech", "DevTools"].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        setSelectedSector(sec);
                        setActiveFilter(null);
                      }}
                      className="w-full text-left px-2 py-1 text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors"
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
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 bg-surface-container-low hover:bg-surface-container-high border border-graphite-stroke text-on-surface-variant rounded-sm flex items-center gap-1 transition-colors"
              >
                <span>STAGE: {selectedStage}</span>
                <span className="material-symbols-outlined text-[10px]">arrow_drop_down</span>
              </button>
              {activeFilter === "stage" && (
                <div className="absolute left-0 mt-1 w-36 bg-surface-container-low border border-graphite-stroke rounded-sm shadow-xl overflow-hidden z-50 py-0.5 font-mono text-[9px]">
                  {["All Stages", "Seed", "Series A", "Series B"].map((stg) => (
                    <button
                      key={stg}
                      type="button"
                      onClick={() => {
                        setSelectedStage(stg);
                        setActiveFilter(null);
                      }}
                      className="w-full text-left px-2 py-1 text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors"
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
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 bg-surface-container-low hover:bg-surface-container-high border border-graphite-stroke text-on-surface-variant rounded-sm flex items-center gap-1 transition-colors"
              >
                <span>VAL: {selectedValuation}</span>
                <span className="material-symbols-outlined text-[10px]">arrow_drop_down</span>
              </button>
              {activeFilter === "val" && (
                <div className="absolute left-0 mt-1 w-36 bg-surface-container-low border border-graphite-stroke rounded-sm shadow-xl overflow-hidden z-50 py-0.5 font-mono text-[9px]">
                  {["All Valuations", "< $10M", "$10M - $50M", "> $50M"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setSelectedValuation(v);
                        setActiveFilter(null);
                      }}
                      className="w-full text-left px-2 py-1 text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors"
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-surface-container-low rounded-sm border border-graphite-stroke">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="font-mono text-[9px] text-primary uppercase tracking-wider">
                Live Terminal
              </span>
            </div>

            <span className="hidden sm:inline font-mono text-[9px] text-on-surface-variant/60">
              {time}
            </span>
          </div>

          {/* User Menu Dropdown */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container-high border border-graphite-stroke p-0.5 pr-2 rounded-full transition-all focus:outline-none"
            >
              <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center border border-graphite-stroke overflow-hidden shrink-0">
                <img
                  alt="Investor Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjgnffLqCRMm2pAxDspegT7s-kU91LMh2XabpEk0v1kp_knVNlY6jef8XOXvEBAJZS-N3wfhkWTwIzv1oTwAq3472OA-omRTC9SvQ2oAA3O9YevNFY4UBH05a8f0q9XbdmLNx6DGswdbxIJvDnu7LHhnW0W9KkXuA6x_Or3T6J4Nkg5iLfUOJgNrxMUS10a91mTG1-1a4D6ArJ2X0RPR5WdrGbnU08DYIFaFyXRf0a_3F1epgoR04LcDkZYOurJ7rLZCZxrNccpg"
                />
              </div>
              <span className="font-mono text-[9px] font-bold text-on-surface hidden md:inline uppercase tracking-wider">
                Abhishek P.
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-[10px]">arrow_drop_down</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-surface-container-low border border-graphite-stroke rounded-sm shadow-2xl overflow-hidden z-50 py-1">
                <div className="px-3 py-1.5 border-b border-graphite-stroke/30">
                  <p className="font-sans text-[11px] font-bold text-white leading-tight">Abhishek Pati</p>
                  <p className="font-mono text-[8px] text-on-surface-variant/50 uppercase tracking-widest mt-0.5">
                    Principal Analyst
                  </p>
                </div>
                <div className="py-0.5 font-mono text-[9px]">
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">person</span>
                    <span>PROFILE SETTINGS</span>
                  </Link>
                  <Link
                    href="/preferences"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">tune</span>
                    <span>PREFERENCES</span>
                  </Link>
                  <Link
                    href="/api-keys"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">key</span>
                    <span>API GATEWAY KEYS</span>
                  </Link>
                </div>
                <div className="border-t border-graphite-stroke/30 mt-0.5 pt-0.5 font-mono text-[9px]">
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full flex items-center gap-1.5 px-3 py-1.5 text-error hover:text-white hover:bg-error-container/20 transition-colors text-left"
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
