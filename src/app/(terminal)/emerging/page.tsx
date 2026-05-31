import { getStartups } from "@/actions/startups";
import EmergingList from "./emerging-list";

export const revalidate = 0; // Dynamic server page

export default async function EmergingStartupsPage() {
  const { startups } = await getStartups();

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-white uppercase">
          Emerging Startups (Seed & Series A)
        </h1>
        <p className="font-mono text-xs text-[#bbcabf]/60 uppercase tracking-wider mt-1">
          Surfacing high-momentum early stage clusters before mainstream indexation
        </p>
      </div>

      {/* Grid List with Filters */}
      <EmergingList initialStartups={startups} />
    </div>
  );
}
