import { HttpAdapter } from "@/lib/http/http";
import { Tables } from "@/lib/supabase/types";

export async function getAllTransactionCategories() {
  return await new HttpAdapter().get<Tables<'transaction_categories'>[]>(`transaction-categories`)
}