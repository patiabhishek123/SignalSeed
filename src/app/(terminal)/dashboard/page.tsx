import { searchStartups, getSignals } from "@/actions/startups";
import DashboardTerminal from "./dashboard-terminal";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";

  const { startups } = await searchStartups(query);
  const { signals } = await getSignals();

  return (
    <div className="flex flex-col gap-6">
      {/* Search Header Info */}
      {query && (
        <div className="bg-surface-container-low border border-graphite-stroke px-4 py-2 rounded-sm flex items-center justify-between">
          <span className="font-mono text-xs text-on-surface-variant">
            FILTERED BY SEARCH QUERY: <span className="text-primary font-bold">"{query}"</span>
          </span>
          <span className="font-mono text-[10px] text-on-surface-variant/50">
            FOUND {startups.length} RESULTS
          </span>
        </div>
      )}

      {/* Main interactive terminal dashboard component */}
      <DashboardTerminal 
        initialStartups={startups} 
        initialSignals={signals} 
      />
    </div>
  );
}
