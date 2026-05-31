import { supabase } from "../supabase";
import { Startup, StartupInsert, StartupUpdate } from "@/types/supabase";

export class StartupsRepository {
  async getAll(options?: { includeCategory?: boolean }): Promise<any[]> {
    let query = supabase.from("startups").select(
      options?.includeCategory 
        ? "*, category:categories(*)" 
        : "*"
    );

    const { data, error } = await query.order("momentum_score", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(id: string, options?: { includeRelations?: boolean }): Promise<any | null> {
    let selectQuery = "*";
    if (options?.includeRelations) {
      selectQuery = "*, category:categories(*), signals(*), momentum_snapshots(*)";
    }

    const { data, error } = await supabase
      .from("startups")
      .select(selectQuery)
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  }

  async getByCategory(categoryId: string): Promise<Startup[]> {
    const { data, error } = await supabase
      .from("startups")
      .select("*")
      .eq("category_id", categoryId)
      .order("momentum_score", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async search(searchQuery: string): Promise<Startup[]> {
    const { data, error } = await supabase
      .from("startups")
      .select("*, category:categories(*)")
      .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`)
      .order("momentum_score", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getEmerging(): Promise<Startup[]> {
    const { data, error } = await supabase
      .from("startups")
      .select("*")
      .in("stage", ["SEED", "SERIES A"])
      .order("momentum_score", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getUnicorns(): Promise<Startup[]> {
    const { data, error } = await supabase
      .from("startups")
      .select("*")
      .or("valuation.gte.50,momentum_score.gte.85")
      .order("valuation", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async create(startup: StartupInsert): Promise<Startup> {
    const { data, error } = await supabase
      .from("startups")
      .insert(startup)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, startup: StartupUpdate): Promise<Startup> {
    const { data, error } = await supabase
      .from("startups")
      .update(startup)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("startups")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}

export const startupsRepository = new StartupsRepository();
