import { handleTransactionCreation } from "@/app/(main)/transactions/create/actions";
import { TransactionFormModal } from "@/components/transactions/transactions-form";
import { getAllTransactionCategories } from "@/services/transaction_categories";
import { getAllTransactionTypes } from "@/services/transaction_types";

export default async function TransactionFormModalPage() {
  const types = await getAllTransactionTypes()
  const categories = await getAllTransactionCategories()

  return (
    <TransactionFormModal
     types={types.data} categories={categories.data} onSubmit={handleTransactionCreation}/>
  )
}