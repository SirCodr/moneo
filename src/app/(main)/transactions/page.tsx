"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown, ChevronUp, Filter, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TransactionForm } from "@/components/transaction-form"

// Mock data for transactions
const transactions = [
  {
    id: "1",
    amount: -89.99,
    description: "Grocery Shopping",
    category: "Food",
    date: "2023-07-01",
    icon: "🛒",
  },
  {
    id: "2",
    amount: -45.0,
    description: "Netflix Subscription",
    category: "Entertainment",
    date: "2023-07-02",
    icon: "🎬",
  },
  {
    id: "3",
    amount: -32.5,
    description: "Gas Station",
    category: "Transportation",
    date: "2023-07-03",
    icon: "⛽",
  },
  {
    id: "4",
    amount: -120.0,
    description: "Electric Bill",
    category: "Utilities",
    date: "2023-07-04",
    icon: "💡",
  },
  {
    id: "5",
    amount: 1500.0,
    description: "Salary",
    category: "Income",
    date: "2023-07-05",
    icon: "💼",
  },
]

export default function TransactionsPage() {
  const [date, setDate] = useState<Date>()
  const [transactionType, setTransactionType] = useState<string>("all")
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  const filteredTransactions = transactions.filter((transaction) => {
    if (date && new Date(transaction.date).toDateString() !== date.toDateString()) {
      return false
    }
    if (transactionType === "expense" && transaction.amount > 0) {
      return false
    }
    if (transactionType === "income" && transaction.amount < 0) {
      return false
    }
    return true
  })

  return (
    <div className='space-y-4'>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Transaction</DialogTitle>
                </DialogHeader>
                <TransactionForm />
              </DialogContent>
            </Dialog>
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
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className='border-b'>
                <td className='px-4 py-2'>{transaction.date}</td>
                <td className='px-4 py-2'>
                  <span className='mr-2'>{transaction.icon}</span>
                  {transaction.description}
                </td>
                <td className='px-4 py-2'>{transaction.category}</td>
                <td
                  className={cn(
                    'px-4 py-2 text-right font-medium',
                    transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                  )}
                >
                  {transaction.amount < 0 ? '-' : '+'}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

