import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#e2e2e6] relative overflow-hidden flex flex-col justify-between font-sans">
      {/* Decorative Blur Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none"></div>

      {/* Header */}
      <header className="w-full px-8 py-6 max-w-7xl mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            search_insights
          </span>
          <span className="text-xl font-bold tracking-tight text-white">SignalSeed</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-mono text-xs uppercase tracking-wider text-[#bbcabf] hover:text-white transition-colors">
            Access Terminal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto relative z-10 my-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1C1F] rounded-full border border-[#3c4a42]/30 mb-8 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
            Venture Telemetry V2.0 Live
          </span>
        </div>

        <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl">
          Discover High-Alpha Startups <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#10b981]">
            Before They Go Mainstream
          </span>
        </h1>

        <p className="font-sans text-base md:text-lg text-[#bbcabf] max-w-2xl mb-10 leading-relaxed">
          SignalSeed aggregates real-time growth telemetry across GitHub star velocity, Hacker News mentions, Product Hunt rankings, and Google search trends to surface institutional-grade deal flow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-primary-container text-black font-semibold rounded-lg hover:bg-primary-dim transition-all font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:scale-[1.02]"
          >
            <span>Enter Terminal</span>
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </Link>
          <a
            href="#signals"
            className="px-8 py-4 border border-[#3c4a42]/60 rounded-lg text-white font-semibold hover:bg-[#1E2023]/40 transition-all font-mono text-xs uppercase tracking-wider"
          >
            Explore Sources
          </a>
        </div>

        {/* High density tech source preview cards */}
        <div id="signals" className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left mt-8">
          {[
            { title: "GitHub Stars", desc: "Star velocity & developer fork telemetry", color: "border-white/20" },
            { title: "Hacker News", desc: "Top page duration & comment sentiment", color: "border-secondary/20" },
            { title: "Product Hunt", desc: "Trending daily launches & product upvotes", color: "border-tertiary/20" },
            { title: "Google Trends", desc: "Geographic search spikes & term velocity", color: "border-primary/20" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`glass-card p-5 rounded-xl border-l-4 ${item.color} flex flex-col justify-between`}
            >
              <h3 className="font-mono text-xs uppercase font-bold text-white mb-2">{item.title}</h3>
              <p className="font-sans text-xs text-[#bbcabf]/70 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-8 border-t border-[#3c4a42]/20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] text-[#bbcabf]/40 uppercase">
            © 2026 SignalSeed. All Rights Reserved. Institutional grade data.
          </span>
          <div className="flex gap-6 font-mono text-[10px] text-[#bbcabf]/40 uppercase">
            <span className="hover:text-primary cursor-pointer transition-colors">Term of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Security Audit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
