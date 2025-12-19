"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { toast } from "sonner"

// Auth & Store
import { useAuth } from "@/contexts/AuthContext"
import { useCategoryStore } from "@/store/useCategoryStore"
import { useTransactionStore } from "@/store/useTransactionStore"

export function AddTransactionDialog() {
  const { user } = useAuth()
  const { fetchCategories, expenseCategories, incomeCategories } = useCategoryStore()
  const { addTransaction } = useTransactionStore()

  const [open, setOpen] = useState(false)
  const [type, setType] = useState<"Expense" | "Income">("Expense")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [receipt, setReceipt] = useState<File | null>(null)

  // Fetch categories for the logged-in user
  useEffect(() => {
    if (user) fetchCategories(user.uid)
  }, [user, fetchCategories])

  // Set default category whenever type changes or categories change
  const categories = type === "Income" ? incomeCategories() : expenseCategories()
  useEffect(() => {
    if (categories.length > 0) setCategory(categories[0].name)
  }, [type, categories])

  const resetForm = () => {
    setType("Expense")
    setAmount("")
    setDate("")
    setDescription("")
    setReceipt(null)
    setCategory(categories.length > 0 ? categories[0].name : "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return toast.error("You must be logged in")

    if (!amount || !category || !description || !date) {
      return toast.error("All required fields must be filled")
    }

    const data = {
      type,
      category,
      amount: parseFloat(amount),
      date,
      description,
      receipt,
    }

    const success = await addTransaction(user.uid, data)
    if (success) {
      toast.success("Transaction added!")
      setOpen(false)
      resetForm()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Plus className="w-4 h-4" /> Add Transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Record a new income or expense transaction
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Type Tabs */}
          <Tabs value={type} onValueChange={(v) => setType(v as "Income" | "Expense")}>
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <TabsTrigger value="Expense" className="w-1/2">Expense</TabsTrigger>
              <TabsTrigger value="Income" className="w-1/2">Income</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Amount */}
          <div>
            <Label htmlFor="amount">Amount *</Label>
            <Input
              id="amount"
              placeholder="$ 0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              className="mt-1"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm mt-1"
            >
              {categories.length === 0 && <option>No categories</option>}
              {categories.map((cat) => (
                <option key={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="e.g., Grocery, Salary..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Receipt */}
          <div className="hidden">
            <Label htmlFor="receipt">Receipt (Optional)</Label>
            <label className="mt-2 flex items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-700 px-3 py-6 cursor-pointer">
              <input
                id="receipt"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setReceipt(e.target.files ? e.target.files[0] : null)}
              />
              <span className="text-sm text-gray-500">
                {receipt ? receipt.name : "Click to upload receipt"}
              </span>
            </label>
          </div>

          <DialogFooter>
            <div className="flex w-full justify-between items-center gap-2">
              <Button
                variant="ghost"
                type="button"
                onClick={() => { setOpen(false); resetForm() }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Add Transaction
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
