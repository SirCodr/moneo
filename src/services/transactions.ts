import { Transaction } from "@/app/(main)/transactions/types";
import { HttpAdapter } from "@/lib/http/http";
import { Tables, TablesInsert } from "@/lib/supabase/types";

export async function getAllTransactionByUser(userId: string) {
  return await new HttpAdapter().get<Transaction[]>(`transactions/user/${userId}`)
}

export async function createTransaction(data: TablesInsert<'transactions'>) {
  return await new HttpAdapter().post<Tables<'transactions'>[]>(`transactions`, data)
}