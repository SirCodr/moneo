import { HttpAdapter } from "@/lib/http";

export async function getAllTransactionTypes() {
  return await new HttpAdapter().get(`transaction-types`)
}