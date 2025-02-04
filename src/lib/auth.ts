import { SignInWithOAuthCredentials } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";

export async function loginWithProvider({ provider, options }: SignInWithOAuthCredentials) {
  const supabase = await createClient();
  return supabase.auth.signInWithOAuth({ provider, options });
}

export async function getCurrentSession() {
  const supabase = await createClient();
  return (await supabase.auth.getSession()).data.session
}

export async function getCurrentUser() {
  const supabase = await createClient();
  return (await supabase.auth.getUser()).data.user
}