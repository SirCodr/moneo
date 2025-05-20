import { Tables } from "@/lib/supabase/types"

export interface Transaction extends Tables<'transactions'> {
  transaction_types: {
    name: string
  }
}