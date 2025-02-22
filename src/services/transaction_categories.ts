import { HttpAdapter } from "@/lib/http";

export async function getAllTransactionCategories() {
  return await new HttpAdapter().get(`transaction-categories`)
}