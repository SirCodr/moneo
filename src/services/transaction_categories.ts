import { HttpAdapter } from "@/lib/http";

export async function getAll() {
  return await new HttpAdapter().get(`transaction-categories`)
}