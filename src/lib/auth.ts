import { Provider } from "@supabase/supabase-js";
import supabase from "./supabase";

export function loginWithProvider(provider: Provider) {
    return supabase.auth.signInWithOAuth({
      provider,
    });
  }