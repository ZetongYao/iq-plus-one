import type { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
};

export async function getOrCreateProfile(user: User) {
  const supabase = await createClient();

  const { data: existingProfile, error: fetchError } = await supabase
    .from("profiles")
    .select("id, email, display_name, created_at")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (existingProfile) {
    return existingProfile;
  }

  const { data: newProfile, error: insertError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email: user.email ?? null,
      display_name: null,
    })
    .select("id, email, display_name, created_at")
    .single<Profile>();

  if (insertError) {
    throw new Error(insertError.message);
  }

  return newProfile;
}

export async function updateProfileDisplayName(userId: string, displayName: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName || null,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
