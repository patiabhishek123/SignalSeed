import { supabase } from "../supabase";
import { Signal, SignalInsert, SignalUpdate } from "@/types/supabase";

export class SignalsRepository {
  async getAll(): Promise<Signal[]> {
    const { data, error } = await supabase
      .from("signals")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(id: string): Promise<Signal | null> {
    const { data, error } = await supabase
      .from("signals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  }

  async getByStartupId(startupId: string): Promise<Signal[]> {
    const { data, error } = await supabase
      .from("signals")
      .select("*")
      .eq("startup_id", startupId)
      .order("timestamp", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getRecent(limit: number = 10): Promise<any[]> {
    const { data, error } = await supabase
      .from("signals")
      .select("*, startup:startups(name)")
      .order("timestamp", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async create(signal: SignalInsert): Promise<Signal> {
    const { data, error } = await supabase
      .from("signals")
      .insert(signal)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, signal: SignalUpdate): Promise<Signal> {
    const { data, error } = await supabase
      .from("signals")
      .update(signal)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("signals")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}

export const signalsRepository = new SignalsRepository();
