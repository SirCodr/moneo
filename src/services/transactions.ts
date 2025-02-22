import { HttpAdapter } from "@/lib/http";
import { TablesInsert } from "@/lib/supabase/types";

export async function getAllTransactionByUser(userId: string) {
  return await new HttpAdapter().get(`transactions/user/${userId}`)
}

export async function createTransaction(data: TablesInsert<'transactions'>) {
  return await new HttpAdapter().post(`transactions`, data)
}