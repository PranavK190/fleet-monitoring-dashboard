import { supabase } from "../lib/supabase";

export async function getUserProfile() {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, phone, role, profile_photo")
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error.message);
    throw error;
  }

  return data;
}

export async function updateUserProfile(userId, updates) {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select("id, name, email, phone, role, profile_photo")
    .single();

  if (error) {
    console.error("Error updating user profile:", error.message);
    throw error;
  }

  return data;
}