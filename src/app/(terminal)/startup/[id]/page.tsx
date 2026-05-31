import { getStartupById } from "@/actions/startups";
import StartupDetails from "./startup-details";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StartupDetailPage({ params }: PageProps) {
  // Await params in Next.js 15
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { startup } = await getStartupById(id);

  if (!startup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
        <span className="material-symbols-outlined text-[#ffb95f] text-5xl">warning</span>
        <h1 className="font-sans text-xl font-bold text-white uppercase tracking-wider">
          Entity Not Found
        </h1>
        <p className="font-mono text-xs text-[#bbcabf]/70 max-w-sm">
          The requested startup identifier <span className="text-primary font-bold">"{id}"</span> does not correspond to any active database or mock record.
        </p>
        <Link
          href="/dashboard"
          className="mt-4 px-5 py-2 bg-primary text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:brightness-110 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return <StartupDetails initialStartup={startup} />;
}
