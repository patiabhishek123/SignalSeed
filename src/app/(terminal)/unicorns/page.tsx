import { getStartups } from "@/actions/startups";
import UnicornsList from "./unicorns-list";

export const revalidate = 0; // Dynamic server page

export default async function UnicornsPage() {
  const { startups } = await getStartups();

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-white uppercase">
          Potential Unicorn Cohort
        </h1>
        <p className="font-mono text-xs text-[#bbcabf]/60 uppercase tracking-wider mt-1">
          Tracking scaling entities with high enterprise valuation indexes and breakthrough stars momentum
        </p>
      </div>

      {/* Cohort list statistics dashboard */}
      <UnicornsList initialStartups={startups} />
    </div>
  );
}
