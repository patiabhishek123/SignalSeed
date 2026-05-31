import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface relative overflow-hidden flex flex-col justify-between font-sans">
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
          <span className="text-xl font-bold tracking-tight text-white uppercase font-mono">SignalSeed</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-mono text-xs uppercase tracking-wider text-on-surface-variant hover:text-white transition-colors">
            Access Terminal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto relative z-10 my-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-sm border border-graphite-stroke mb-8 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span className="font-mono text-[9px] text-primary uppercase tracking-widest font-bold">
            Venture Telemetry V2.0 Live
          </span>
        </div>

        <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl uppercase">
          Discover High-Alpha Startups <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#10b981]">
            Before The Market Indexation
          </span>
        </h1>

        <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
          SignalSeed aggregates real-time growth telemetry across GitHub star velocity, Hacker News mentions, Product Hunt rankings, and Google search trends to surface institutional-grade deal flow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-primary-container text-black font-bold rounded-sm hover:brightness-110 transition-all font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-none"
          >
            <span>Enter Terminal</span>
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </Link>
          <a
            href="#signals"
            className="px-8 py-4 border border-graphite-stroke rounded-sm text-white font-bold hover:bg-surface-container-high transition-all font-mono text-xs uppercase tracking-wider"
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
              className={`bg-surface-container-low p-5 rounded-sm border-l-4 ${item.color} border-y border-r border-graphite-stroke flex flex-col justify-between shadow-none`}
            >
              <h3 className="font-mono text-xs uppercase font-bold text-white mb-2">{item.title}</h3>
              <p className="font-sans text-xs text-on-surface-variant/70 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-8 border-t border-graphite-stroke relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] text-on-surface-variant/40 uppercase">
            © 2026 SignalSeed. All Rights Reserved. Institutional grade data.
          </span>
          <div className="flex gap-6 font-mono text-[10px] text-on-surface-variant/40 uppercase">
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Security Audit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
