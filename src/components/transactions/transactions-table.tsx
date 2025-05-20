"use client"

import { format } from "date-fns"
import { CalendarIcon, ChevronDown, ChevronUp, Filter, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Transaction } from "@/app/(main)/transactions/types"

type Props = {
  data: Transaction[]
}

export default function TransactionsTable({ data }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [date, setDate] = useState<Date>()
  const [transactionType, setTransactionType] = useState<string>("all")
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  const isExpense = (type: string) => type === "Expense"

  const filteredData = data.filter((transaction) => {
    if (date && new Date(transaction.date).toDateString() !== date.toDateString()) {
      return false
    }
    if (transactionType === "expense" && !isExpense(transaction.transaction_types.name)) {
      return false
    }
    if (transactionType === "income" && isExpense(transaction.transaction_types.name)) {
      return false
    }

    return true
  })

  function openModal() {
    router.push(`${pathname}/create`)
  }

  return (
    <div className="space-y-5">
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'>
        <div className="flex space-x-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className="w-full sm:w-auto justify-between"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {isFiltersVisible ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
            <Button className="w-full sm:w-auto" onClick={openModal}>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>

        {isFiltersVisible && (
          <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full sm:w-[200px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select
              onValueChange={setTransactionType}
              defaultValue={transactionType}
            >
              <SelectTrigger className='w-full sm:w-[200px]'>
                <SelectValue placeholder='Select transaction type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Transactions</SelectItem>
                <SelectItem value='expense'>Expenses</SelectItem>
                <SelectItem value='income'>Income</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='px-4 py-2 text-left'>Date</th>
              <th className='px-4 py-2 text-left'>Description</th>
              <th className='px-4 py-2 text-left'>Category</th>
              <th className='px-4 py-2 text-right'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((transaction) => (
              <tr key={transaction.id} className='border-b'>
                <td className='px-4 py-2'>{transaction.date}</td>
                <td className='px-4 py-2'>
                  {transaction.description}
                </td>
                <td className='px-4 py-2'>{transaction.transaction_types.name}</td>
                <td
                  className={cn(
                    'px-4 py-2 text-right font-medium',
                    transaction.transaction_types.name === 'Expense' ? 'text-red-500' : 'text-green-500'
                  )}
                >
                  {transaction.transaction_types.name === 'Expense' ? '-' : '+'}$
                  {Math.abs(Number  (transaction.amount)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}