"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getMockStartups } from "@/lib/mock-data";

export default function CommandBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockStartups = getMockStartups();

  // Toggle modal on Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Click outside close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredStartups = mockStartups.filter(
    (startup) =>
      startup.name.toLowerCase().includes(query.toLowerCase()) ||
      startup.sector.toLowerCase().includes(query.toLowerCase())
  );

  const handleCommand = (cmd: string) => {
    setIsOpen(false);
    setQuery("");
    startTransition(() => {
      if (cmd.startsWith("/")) {
        if (cmd === "/dashboard") router.push("/dashboard");
        if (cmd === "/emerging") router.push("/emerging");
        if (cmd === "/unicorns") router.push("/unicorns");
        if (cmd === "/seed") router.push("/api/seed");
      } else {
        router.push(`/startup/${cmd}`);
      }
    });
  };

  return (
    <>
      {/* Sticky Bottom Trigger */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-40">
        <div
          onClick={() => setIsOpen(true)}
          className="glass-card rounded-full px-6 py-3 flex items-center justify-between shadow-2xl cursor-pointer hover:border-primary/40 transition-colors bg-[#111317]/80 hover:bg-[#1E2023]/80"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">bolt</span>
            <span className="font-mono text-[11px] text-[#bbcabf]/60">
              PRESS <span className="text-primary">⌘K</span> TO EXECUTE COMMANDS OR SEARCH...
            </span>
          </div>
          <div className="flex gap-1">
            <kbd className="px-2 py-0.5 bg-[#333538] border border-[#3c4a42]/30 rounded text-[9px] font-mono text-[#bbcabf]">
              ⌘
            </kbd>
            <kbd className="px-2 py-0.5 bg-[#333538] border border-[#3c4a42]/30 rounded text-[9px] font-mono text-[#bbcabf]">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="w-full max-w-2xl bg-[#111317] border border-[#3c4a42]/60 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[400px]"
          >
            {/* Input bar */}
            <div className="flex items-center gap-3 p-4 border-b border-[#3c4a42]/30 bg-[#0C0E11]">
              <span className="material-symbols-outlined text-primary text-xl">bolt</span>
              <input
                ref={inputRef}
                className="w-full bg-transparent border-none text-[#e2e2e6] font-mono text-xs focus:ring-0 outline-none placeholder-[#bbcabf]/30"
                placeholder="TYPE A COMMAND (e.g. /dashboard, /emerging) OR ENTITY NAME..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span
                onClick={() => setIsOpen(false)}
                className="material-symbols-outlined text-[#bbcabf] hover:text-[#ffb3ad] cursor-pointer text-sm"
              >
                close
              </span>
            </div>

            {/* Results body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Commands Section */}
              {(!query || query.startsWith("/")) && (
                <div>
                  <h4 className="font-mono text-[9px] tracking-widest text-[#bbcabf]/40 uppercase mb-2">
                    Terminal Navigation
                  </h4>
                  <div className="space-y-1">
                    {[
                      { cmd: "/dashboard", desc: "Open main momentum leaderboard terminal" },
                      { cmd: "/emerging", desc: "View real-time emerging signals aggregator" },
                      { cmd: "/unicorns", desc: "Analyze high-probability unicorn ventures" },
                    ].map((item) => (
                      <div
                        key={item.cmd}
                        onClick={() => handleCommand(item.cmd)}
                        className="flex items-center justify-between p-2 rounded hover:bg-[#1E2023] cursor-pointer group transition-colors"
                      >
                        <span className="font-mono text-xs text-primary">{item.cmd}</span>
                        <span className="font-mono text-[10px] text-[#bbcabf]/50 group-hover:text-[#bbcabf]">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Startups Section */}
              <div>
                <h4 className="font-mono text-[9px] tracking-widest text-[#bbcabf]/40 uppercase mb-2">
                  Startup Entities ({filteredStartups.length})
                </h4>
                <div className="space-y-1">
                  {filteredStartups.map((startup) => (
                    <div
                      key={startup.id}
                      onClick={() => handleCommand(startup.id)}
                      className="flex items-center justify-between p-2 rounded hover:bg-[#1E2023] cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs text-[#e2e2e6] font-bold group-hover:text-primary transition-colors">
                          {startup.name}
                        </span>
                        <span className="font-mono text-[9px] bg-[#282A2D] text-[#bbcabf] px-1.5 py-0.5 rounded border border-[#3c4a42]/30 uppercase">
                          {startup.stage}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-primary">
                        Score: {startup.momentumScore.toFixed(1)}
                      </span>
                    </div>
                  ))}
                  {filteredStartups.length === 0 && (
                    <div className="text-center py-6">
                      <span className="font-mono text-[10px] text-[#bbcabf]/30 uppercase">
                        No entities found matching search criteria
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer help */}
            <div className="bg-[#0C0E11] p-3 border-t border-[#3c4a42]/30 flex justify-between items-center text-[10px] font-mono text-[#bbcabf]/40">
              <span>↑↓ navigation | enter select</span>
              <span>esc close terminal terminal_v0.1</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
