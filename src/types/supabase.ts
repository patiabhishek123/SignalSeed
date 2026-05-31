export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
        Relationships: []
      }
      startups: {
        Row: {
          id: string
          name: string
          description: string | null
          website: string | null
          category_id: string | null
          logo_url: string | null
          stage: string
          valuation: number
          funding: number
          location: string | null
          github_stars: number
          github_stars_wk: number
          hn_mentions_wk: number
          product_hunt_rank: number | null
          trends_score: number
          momentum_score: number
          momentum_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          website?: string | null
          category_id?: string | null
          logo_url?: string | null
          stage?: string
          valuation?: number
          funding?: number
          location?: string | null
          github_stars?: number
          github_stars_wk?: number
          hn_mentions_wk?: number
          product_hunt_rank?: number | null
          trends_score?: number
          momentum_score?: number
          momentum_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          website?: string | null
          category_id?: string | null
          logo_url?: string | null
          stage?: string
          valuation?: number
          funding?: number
          location?: string | null
          github_stars?: number
          github_stars_wk?: number
          hn_mentions_wk?: number
          product_hunt_rank?: number | null
          trends_score?: number
          momentum_score?: number
          momentum_status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "startups_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      signals: {
        Row: {
          id: string
          startup_id: string
          source: "github" | "hackernews" | "reddit" | "google_trends" | "techcrunch"
          title: string
          description: string | null
          score: number
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          startup_id: string
          source: "github" | "hackernews" | "reddit" | "google_trends" | "techcrunch"
          title: string
          description?: string | null
          score?: number
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          startup_id?: string
          source?: "github" | "hackernews" | "reddit" | "google_trends" | "techcrunch"
          title?: string
          description?: string | null
          score?: number
          timestamp?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "signals_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          }
        ]
      }
      momentum_snapshots: {
        Row: {
          id: string
          startup_id: string
          score: number
          stars: number
          mentions: number
          recorded_at: string
        }
        Insert: {
          id?: string
          startup_id: string
          score: number
          stars?: number
          mentions?: number
          recorded_at?: string
        }
        Update: {
          id?: string
          startup_id?: string
          score?: number
          stars?: number
          mentions?: number
          recorded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "momentum_snapshots_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenient alias types
export type Category = Database["public"]["Tables"]["categories"]["Row"]
export type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"]
export type CategoryUpdate = Database["public"]["Tables"]["categories"]["Update"]

export type Startup = Database["public"]["Tables"]["startups"]["Row"]
export type StartupInsert = Database["public"]["Tables"]["startups"]["Insert"]
export type StartupUpdate = Database["public"]["Tables"]["startups"]["Update"]

export type Signal = Database["public"]["Tables"]["signals"]["Row"]
export type SignalInsert = Database["public"]["Tables"]["signals"]["Insert"]
export type SignalUpdate = Database["public"]["Tables"]["signals"]["Update"]

export type MomentumSnapshot = Database["public"]["Tables"]["momentum_snapshots"]["Row"]
export type MomentumSnapshotInsert = Database["public"]["Tables"]["momentum_snapshots"]["Insert"]
export type MomentumSnapshotUpdate = Database["public"]["Tables"]["momentum_snapshots"]["Update"]
