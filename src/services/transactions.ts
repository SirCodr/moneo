import { HttpAdapter } from "@/lib/http";

export async function getAllTransactionByUser(userId: string) {
  return await new HttpAdapter().get(`transactions/user/${userId}`)
}