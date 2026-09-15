import { supabase } from "../lib/supabase";

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, phone, role, profile_photo")
    .eq("id", userId)
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