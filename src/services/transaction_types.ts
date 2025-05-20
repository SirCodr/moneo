import { HttpAdapter } from "@/lib/http/http";
import { Tables } from "@/lib/supabase/types";

export async function getAllTransactionTypes() {
  return await new HttpAdapter().get<Tables<'transaction_types'>[]>(`transaction-types`)
}