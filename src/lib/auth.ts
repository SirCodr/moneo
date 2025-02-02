import { SignInWithOAuthCredentials } from "@supabase/supabase-js";
import { createClient } from "./supabase";

export async function loginWithProvider({ provider, options }: SignInWithOAuthCredentials) {
  const supabase = createClient();
    return await supabase.auth.signInWithOAuth({
      provider,
      options
    });
  }