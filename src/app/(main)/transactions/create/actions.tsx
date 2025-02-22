'use server'

import { getCurrentUser } from "@/lib/auth"
import { TablesInsert } from "@/lib/supabase/types"
import { createTransaction } from "@/services/transactions"

export async function handleTransactionCreation(data: TablesInsert<'transactions'>): Promise<unknown> {
  const user = await getCurrentUser()
  return await createTransaction({
    ...data,
    user_id: user?.id
  })
}