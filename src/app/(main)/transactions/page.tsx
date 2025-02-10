import TransactionsTable from "@/components/transactions/transactions-table"
import { getCurrentUser } from "@/lib/auth";
import { getAllTransactionByUser } from "@/services/transactions";

export default async function TransactionsPage() {
  const user = await getCurrentUser()
  const { data } = await getAllTransactionByUser(user!.id)

  return (
    <>
      <TransactionsTable data={data} />
    </>
  )
}

