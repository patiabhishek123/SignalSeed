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
      {/* Sticky Bottom Trigger - Modern Terminal Style */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-40">
        <div
          onClick={() => setIsOpen(true)}
          className="bg-surface-container-low border border-graphite-stroke rounded-sm px-5 py-2.5 flex items-center justify-between shadow-2xl cursor-pointer hover:border-primary/45 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">bolt</span>
            <span className="font-mono text-[10px] text-on-surface-variant/60 tracking-wider">
              PRESS <span className="text-primary font-bold">⌘K</span> FOR COMMAND TERMINAL...
            </span>
          </div>
          <div className="flex gap-1">
            <kbd className="px-1.5 py-0.5 bg-surface-container-high border border-graphite-stroke rounded-sm text-[8px] font-mono text-on-surface-variant/80">
              ⌘
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-surface-container-high border border-graphite-stroke rounded-sm text-[8px] font-mono text-on-surface-variant/80">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="w-full max-w-xl bg-surface-container-low border border-primary/50 rounded-sm overflow-hidden shadow-2xl flex flex-col h-[360px]"
          >
            {/* Input bar */}
            <div className="flex items-center gap-2.5 p-3.5 border-b border-graphite-stroke bg-surface-container-lowest">
              <span className="material-symbols-outlined text-primary text-base animate-pulse">terminal</span>
              <input
                ref={inputRef}
                className="w-full bg-transparent border-none text-on-surface font-mono text-[11px] focus:ring-0 outline-none placeholder-on-surface-variant/30 uppercase tracking-wider"
                placeholder="TYPE /COMMAND OR STARTUP NAME..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ caretColor: "#4edea3" }} // Custom blinking emerald cursor
              />
              <span
                onClick={() => setIsOpen(false)}
                className="material-symbols-outlined text-on-surface-variant/60 hover:text-error cursor-pointer text-sm"
              >
                close
              </span>
            </div>

            {/* Results body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {/* Commands Section */}
              {(!query || query.startsWith("/")) && (
                <div>
                  <h4 className="font-mono text-[8px] tracking-widest text-on-surface-variant/40 uppercase mb-1.5 px-2">
                    Terminal Navigation
                  </h4>
                  <div className="space-y-0.5">
                    {[
                      { cmd: "/dashboard", desc: "Open main momentum leaderboard terminal" },
                      { cmd: "/emerging", desc: "View real-time emerging signals aggregator" },
                      { cmd: "/unicorns", desc: "Analyze high-probability unicorn ventures" },
                    ].map((item) => (
                      <div
                        key={item.cmd}
                        onClick={() => handleCommand(item.cmd)}
                        className="flex items-center justify-between p-2 rounded-sm hover:bg-surface-container-high cursor-pointer group transition-colors"
                      >
                        <span className="font-mono text-[10px] text-primary">{item.cmd}</span>
                        <span className="font-mono text-[9px] text-on-surface-variant/50 group-hover:text-on-surface-variant">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Startups Section */}
              <div>
                <h4 className="font-mono text-[8px] tracking-widest text-on-surface-variant/40 uppercase mb-1.5 px-2">
                  Startup Entities ({filteredStartups.length})
                </h4>
                <div className="space-y-0.5">
                  {filteredStartups.map((startup) => (
                    <div
                      key={startup.id}
                      onClick={() => handleCommand(startup.id)}
                      className="flex items-center justify-between p-2 rounded-sm hover:bg-surface-container-high cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[11px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                          {startup.name}
                        </span>
                        <span className="font-mono text-[8px] bg-surface-container-highest text-on-surface-variant px-1 py-0.2 rounded-sm border border-graphite-stroke uppercase">
                          {startup.stage}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-primary">
                        Score: {startup.momentumScore.toFixed(1)}
                      </span>
                    </div>
                  ))}
                  {filteredStartups.length === 0 && (
                    <div className="text-center py-4">
                      <span className="font-mono text-[9px] text-on-surface-variant/30 uppercase">
                        No entities found matching search criteria
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer help */}
            <div className="bg-surface-container-lowest p-2.5 border-t border-graphite-stroke flex justify-between items-center text-[8px] font-mono text-on-surface-variant/40">
              <span>↑↓ navigation | enter select</span>
              <span>esc close terminal terminal_v0.2</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
