import { z } from "zod";

// 1. Category validation schema
export const categorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "Category name must be at least 2 characters").max(50),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and dashes"),
  created_at: z.string().datetime().optional(),
});

export const categoryInsertSchema = categorySchema.omit({ id: true, created_at: true });
export const categoryUpdateSchema = categorySchema.partial().omit({ id: true, created_at: true });

// 2. Startup validation schema
export const startupSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(1000).nullable().optional(),
  website: z.string().url("Must be a valid URL").nullable().optional().or(z.literal("")),
  category_id: z.string().uuid("Invalid category ID").nullable().optional(),
  logo_url: z.string().url("Must be a valid URL").nullable().optional().or(z.literal("")),
  stage: z.enum(["PRE-SEED", "SEED", "SERIES A", "SERIES B", "GROWTH", "LATE"]).default("SEED"),
  valuation: z.number().nonnegative("Valuation must be a positive number").default(0),
  funding: z.number().nonnegative("Funding must be a positive number").default(0),
  location: z.string().max(100).nullable().optional(),
  github_stars: z.number().int().nonnegative().default(0),
  github_stars_wk: z.number().int().nonnegative().default(0),
  hn_mentions_wk: z.number().int().nonnegative().default(0),
  product_hunt_rank: z.number().int().positive().nullable().optional(),
  trends_score: z.number().min(0).max(100).default(0),
  momentum_score: z.number().min(0).max(100).default(0),
  momentum_status: z.enum(["STRONG", "STABLE", "DECAY", "NEUTRAL"]).default("NEUTRAL"),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const startupInsertSchema = startupSchema.omit({ id: true, created_at: true, updated_at: true });
export const startupUpdateSchema = startupSchema.partial().omit({ id: true, created_at: true, updated_at: true });

// 3. Signal validation schema
export const signalSchema = z.object({
  id: z.string().uuid().optional(),
  startup_id: z.string().uuid("Invalid startup ID reference"),
  source: z.enum(["github", "hackernews", "reddit", "google_trends", "techcrunch"]),
  title: z.string().min(5, "Title should be descriptive").max(150),
  description: z.string().max(500).nullable().optional(),
  score: z.number().min(0).max(100).default(0),
  timestamp: z.string().datetime().default(() => new Date().toISOString()),
  created_at: z.string().datetime().optional(),
});

export const signalInsertSchema = signalSchema.omit({ id: true, created_at: true });
export const signalUpdateSchema = signalSchema.partial().omit({ id: true, created_at: true });

// 4. Momentum Snapshot validation schema
export const momentumSnapshotSchema = z.object({
  id: z.string().uuid().optional(),
  startup_id: z.string().uuid("Invalid startup ID reference"),
  score: z.number().min(0).max(100),
  stars: z.number().int().nonnegative().default(0),
  mentions: z.number().int().nonnegative().default(0),
  recorded_at: z.string().datetime().default(() => new Date().toISOString()),
});

export const momentumSnapshotInsertSchema = momentumSnapshotSchema.omit({ id: true });
export const momentumSnapshotUpdateSchema = momentumSnapshotSchema.partial().omit({ id: true });
