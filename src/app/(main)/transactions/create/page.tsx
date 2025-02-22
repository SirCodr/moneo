import TransactionsForm from "@/components/transactions/transactions-form";
import { getAllTransactionCategories } from "@/services/transaction_categories";
import { getAllTransactionTypes } from "@/services/transaction_types";
import { handleTransactionCreation } from "./actions";


export default async function Page() {
  const types = await getAllTransactionTypes()
  const categories = await getAllTransactionCategories()

  return (
    <TransactionsForm types={types.data} categories={categories.data} onSubmit={handleTransactionCreation} />
  )
}