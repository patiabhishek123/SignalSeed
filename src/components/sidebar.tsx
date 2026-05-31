"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: "terminal", href: "/dashboard", description: "Venture Leaderboard" },
    { name: "Emerging Startups", icon: "analytics", href: "/emerging", description: "Early Momentum Feed" },
    { name: "Hidden Gems", icon: "diamond", href: "/hidden-gems", description: "Under-the-radar Signals" },
    { name: "Future Unicorns", icon: "hub", href: "/unicorns", description: "Growth Acceleration Cohorts" },
    { name: "Time Machine", icon: "history", href: "/time-machine", description: "Historical Backtesting" },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-[64px] hover:w-[240px] transition-all duration-300 z-50 bg-[#111317] border-r border-[#3c4a42]/30 flex flex-col py-6 group overflow-hidden">
      {/* Brand logo */}
      <div className="px-4 mb-10 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-2xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            search_insights
          </span>
          <span className="font-sans text-lg font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            SignalSeed
          </span>
        </Link>
      </div>

      {/* Main navigation */}
      <div className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 h-12 px-4 border-r-2 transition-all cursor-pointer ${
                isActive
                  ? "text-primary border-primary bg-[#1e2023]/40"
                  : "text-[#bbcabf] border-transparent hover:bg-[#1e2023]/40 hover:text-white"
              }`}
            >
              <span
                className="material-symbols-outlined shrink-0 text-xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
              >
                {item.icon}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Footer items */}
      <div className="flex flex-col gap-1 mt-auto">
        <div className="flex items-center gap-4 h-12 px-4 text-[#bbcabf] hover:bg-[#1e2023]/40 hover:text-white transition-colors cursor-pointer">
          <span className="material-symbols-outlined shrink-0 text-xl">settings</span>
          <span className="font-mono text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Settings
          </span>
        </div>
        <div className="flex items-center gap-4 h-12 px-4 text-[#bbcabf] hover:bg-[#1e2023]/40 hover:text-white transition-colors cursor-pointer">
          <span className="material-symbols-outlined shrink-0 text-xl">help_outline</span>
          <span className="font-mono text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Support
          </span>
        </div>

        {/* Profile Avatar */}
        <div className="mt-4 px-3">
          <div className="w-9 h-9 rounded-full bg-[#333538] flex items-center justify-center border border-[#3c4a42]/40 overflow-hidden">
            <img
              alt="Investor Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjgnffLqCRMm2pAxDspegT7s-kU91LMh2XabpEk0v1kp_knVNlY6jef8XOXvEBAJZS-N3wfhkWTwIzv1oTwAq3472OA-omRTC9SvQ2oAA3O9YevNFY4UBH05a8f0q9XbdmLNx6DGswdbxIJvDnu7LHhnW0W9KkXuA6x_Or3T6J4Nkg5iLfUOJgNrxMUS10a91mTG1-1a4D6ArJ2X0RPR5WdrGbnU08DYIFaFyXRf0a_3F1epgoR04LcDkZYOurJ7rLZCZxrNccpg"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
