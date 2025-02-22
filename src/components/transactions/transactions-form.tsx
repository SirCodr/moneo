'use client'

import { useState } from "react"
import { format, set } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tables, TablesInsert } from "@/lib/supabase/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useRouter } from "next/navigation"

type Props = {
  categories: Tables<'transaction_categories'>[]
  types: Tables<'transaction_types'>[]
  onSubmit: (data: TablesInsert<'transactions'>) => Promise<unknown>
  onSuccess?: () => void
}

const DEFAULT_TRANSACTION: TablesInsert<'transactions'> = {
  description: "",
  type_id: "",
  category_id: "",
  date: new Date().toISOString(),
  amount: "",
  user_id: ''
}

export function TransactionFormModal({ categories, types, onSubmit}: Props) {
  const router = useRouter()

  const closeModal = () => {
      router.back()
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Transaction create form
          </DialogTitle>
        </DialogHeader>
          <TransactionForm types={types} categories={categories} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export default function TransactionForm(props: Props) {
  const { categories = [], types = [], onSubmit = async () => {}, onSuccess = () => {} } = props
  const [data, setData] = useState(DEFAULT_TRANSACTION)
  const [isSubmitting, setSubmitting] = useState(false)

  function clearForm() {
    setData(DEFAULT_TRANSACTION)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setSubmitting(true)
      e.preventDefault()
      const res  = await onSubmit(data)
      
      if (res.success) {
        clearForm()
        onSuccess()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  function handleChange(key: keyof typeof data, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={data.description ?? ''} onChange={(e) => handleChange('description', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select value={data.type_id} onValueChange={(e) => handleChange('type_id', e)} required>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={data.category_id} onValueChange={(e) => handleChange('category_id', e)} required>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !data.date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {data.date ? format(data.date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={data.date} onSelect={(e) => handleChange('date', e?.toISOString())} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={data.amount}
          onChange={(e) => handleChange('amount' ,e.target.value)}
          required
          min={1}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Adding Transaction
          </>
        ) :
          'Add Transaction'
        }
      </Button>
    </form>
  )
}

