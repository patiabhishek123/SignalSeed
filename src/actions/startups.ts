"use server";

import { prisma } from "@/lib/prisma";
import { getMockStartups, getMockStartupById, searchMockStartups, toggleSaveMockStartup } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";

// Type definitions matching Prisma/Mock shapes
export interface Founder {
  name: string;
  title: string;
  avatar: string;
}

export interface RiskAssessment {
  id: string;
  startupId: string;
  protocolRobustness: number;
  liquidityCrunch: string | null;
  regulatoryPivot: string | null;
  ipOverlapAlert: string | null;
  auditedBy: string | null;
  auditDate: string | null;
}

export interface Signal {
  id: string;
  startupId: string;
  source: "GITHUB" | "HN" | "GOOGLE_TRENDS" | "PRODUCT_HUNT" | "YC";
  title: string;
  description: string;
  score: number;
  timestamp: Date;
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  logoUrl: string | null;
  sector: string;
  stage: string;
  valuation: number;
  funding: number;
  website: string;
  location: string;
  founders: Founder[];
  githubStars: number;
  githubStarsWk: number;
  hnMentionsWk: number;
  productHuntRank: number;
  trendsScore: number;
  momentumScore: number;
  momentumStatus: "STRONG" | "STABLE" | "DECAY" | "NEUTRAL";
  createdAt: Date;
  updatedAt: Date;
  signals: Signal[];
  saved: boolean;
  riskAssessment: RiskAssessment | null;
}

// Check database connection state
async function checkDatabase(): Promise<boolean> {
  if (!process.env.DATABASE_URL) {
    return false;
  }
  try {
    // Simple query to verify DB connectivity
    await prisma.$executeRawUnsafe("SELECT 1;");
    return true;
  } catch (err) {
    console.warn("Neon Database URL set, but connection failed. Falling back to mock data.", err);
    return false;
  }
}

// Convert DB Startup model to UI Startup model
function mapDbStartup(dbStartup: any): Startup {
  let parsedFounders: Founder[] = [];
  try {
    parsedFounders = typeof dbStartup.founders === "string" 
      ? JSON.parse(dbStartup.founders) 
      : (dbStartup.founders as any[] || []);
  } catch (e) {
    console.error("Error parsing founders JSON", e);
  }

  return {
    ...dbStartup,
    founders: parsedFounders,
    saved: dbStartup.savedBy && dbStartup.savedBy.length > 0,
    signals: dbStartup.signals || [],
    riskAssessment: dbStartup.riskAssessment || null
  };
}

export async function getStartups(): Promise<{ startups: Startup[]; isFallback: boolean }> {
  const isDbActive = await checkDatabase();

  if (!isDbActive) {
    return { startups: getMockStartups() as Startup[], isFallback: true };
  }

  try {
    const dbStartups = await prisma.startup.findMany({
      include: {
        signals: { orderBy: { timestamp: "desc" } },
        savedBy: true,
        riskAssessment: true
      },
      orderBy: { momentumScore: "desc" }
    });

    return { 
      startups: dbStartups.map(mapDbStartup), 
      isFallback: false 
    };
  } catch (error) {
    console.error("Failed to fetch startups from DB, using fallback:", error);
    return { startups: getMockStartups() as Startup[], isFallback: true };
  }
}

export async function getStartupById(id: string): Promise<{ startup: Startup | null; isFallback: boolean }> {
  const isDbActive = await checkDatabase();

  if (!isDbActive) {
    return { startup: getMockStartupById(id) as Startup | null, isFallback: true };
  }

  try {
    const dbStartup = await prisma.startup.findUnique({
      where: { id },
      include: {
        signals: { orderBy: { timestamp: "desc" } },
        savedBy: true,
        riskAssessment: true
      }
    });

    if (!dbStartup) {
      // Fallback check in mock just in case id corresponds to a mock entity
      const mockObj = getMockStartupById(id);
      return { startup: mockObj as Startup | null, isFallback: true };
    }

    return { 
      startup: mapDbStartup(dbStartup), 
      isFallback: false 
    };
  } catch (error) {
    console.error(`Failed to fetch startup ${id} from DB, using fallback:`, error);
    return { startup: getMockStartupById(id) as Startup | null, isFallback: true };
  }
}

export async function searchStartups(query: string): Promise<{ startups: Startup[]; isFallback: boolean }> {
  if (!query || query.trim() === "") {
    return getStartups();
  }

  const isDbActive = await checkDatabase();

  if (!isDbActive) {
    return { startups: searchMockStartups(query) as Startup[], isFallback: true };
  }

  try {
    const dbStartups = await prisma.startup.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { sector: { contains: query, mode: "insensitive" } },
          { location: { contains: query, mode: "insensitive" } }
        ]
      },
      include: {
        signals: { orderBy: { timestamp: "desc" } },
        savedBy: true,
        riskAssessment: true
      },
      orderBy: { momentumScore: "desc" }
    });

    return { 
      startups: dbStartups.map(mapDbStartup), 
      isFallback: false 
    };
  } catch (error) {
    console.error(`Failed to search startups for "${query}" from DB, using fallback:`, error);
    return { startups: searchMockStartups(query) as Startup[], isFallback: true };
  }
}

export async function toggleSaveStartup(id: string): Promise<{ success: boolean; saved: boolean; isFallback: boolean }> {
  const isDbActive = await checkDatabase();

  if (!isDbActive) {
    const res = toggleSaveMockStartup(id);
    revalidatePath("/dashboard");
    revalidatePath(`/startup/${id}`);
    revalidatePath("/emerging");
    revalidatePath("/unicorns");
    return { success: !!res, saved: res ? res.saved : false, isFallback: true };
  }

  try {
    // Check if currently saved
    const existing = await prisma.savedStartup.findUnique({
      where: { startupId: id }
    });

    let saved = false;
    if (existing) {
      await prisma.savedStartup.delete({
        where: { startupId: id }
      });
      saved = false;
    } else {
      await prisma.savedStartup.create({
        data: { startupId: id }
      });
      saved = true;
    }

    revalidatePath("/dashboard");
    revalidatePath(`/startup/${id}`);
    revalidatePath("/emerging");
    revalidatePath("/unicorns");

    return { success: true, saved, isFallback: false };
  } catch (error) {
    console.error(`Failed to toggle save for ${id} in DB, using mock fallback:`, error);
    const res = toggleSaveMockStartup(id);
    return { success: !!res, saved: res ? res.saved : false, isFallback: true };
  }
}

export async function getSignals(): Promise<{ signals: (Signal & { startupName: string })[]; isFallback: boolean }> {
  const { startups, isFallback } = await getStartups();
  const allSignals: (Signal & { startupName: string })[] = [];

  for (const startup of startups) {
    for (const signal of startup.signals) {
      allSignals.push({
        ...signal,
        startupName: startup.name
      });
    }
  }

  // Sort by timestamp desc
  allSignals.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return { signals: allSignals, isFallback };
}
