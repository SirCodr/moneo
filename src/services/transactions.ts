import { HttpAdapter } from "@/lib/http/http";
import { Tables, TablesInsert } from "@/lib/supabase/types";

export async function getAllTransactionByUser(userId: string) {
  return await new HttpAdapter().get<Tables<'transactions'>[]>(`transactions/user/${userId}`)
}

export async function createTransaction(data: TablesInsert<'transactions'>) {
  return await new HttpAdapter().post<Tables<'transactions'>[]>(`transactions`, data)
}