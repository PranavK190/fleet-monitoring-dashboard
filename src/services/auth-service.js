import { supabase } from "../lib/supabase";

export async function loginUser(email, password) {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, phone, role, profile_photo")
    .eq("email", email)
    .eq("password", password)
    .maybeSingle();

  if (error) {
    console.error("Login error:", error.message);
    throw error;
  }

  if (!data) {
    return null;
  }

  return data;
}

export async function signupUser(
  name,
  email,
  password,
  phone
) {
  const { data: existingUser, error: existingUserError } =
    await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

  if (existingUserError) {
    console.error(
      "Error checking existing user:",
      existingUserError.message
    );
    throw existingUserError;
  }

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const { data, error } = await supabase
    .from("users")
    .insert({
      name,
      email,
      password,
      phone,
    })
    .select("id, name, email, phone, role, profile_photo")
    .single();

  if (error) {
    console.error("Signup error:", error.message);
    throw error;
  }

  return {
    success: true,
    user: data,
  };
}