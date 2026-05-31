import { supabase } from "../supabase";
import { MomentumSnapshot, MomentumSnapshotInsert, MomentumSnapshotUpdate } from "@/types/supabase";

export class MomentumRepository {
  async getAll(): Promise<MomentumSnapshot[]> {
    const { data, error } = await supabase
      .from("momentum_snapshots")
      .select("*")
      .order("recorded_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(id: string): Promise<MomentumSnapshot | null> {
    const { data, error } = await supabase
      .from("momentum_snapshots")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  }

  async getByStartupId(startupId: string): Promise<MomentumSnapshot[]> {
    const { data, error } = await supabase
      .from("momentum_snapshots")
      .select("*")
      .eq("startup_id", startupId)
      .order("recorded_at", { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async create(snapshot: MomentumSnapshotInsert): Promise<MomentumSnapshot> {
    const { data, error } = await supabase
      .from("momentum_snapshots")
      .insert(snapshot)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, snapshot: MomentumSnapshotUpdate): Promise<MomentumSnapshot> {
    const { data, error } = await supabase
      .from("momentum_snapshots")
      .update(snapshot)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("momentum_snapshots")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}

export const momentumRepository = new MomentumRepository();
