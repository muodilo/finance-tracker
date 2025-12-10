"use client"

import { useState } from "react"
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
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Plus } from "lucide-react"

export function AddTransactionDialog({ onAdd }: { onAdd?: (data: any) => void }) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<"expense" | "income">("expense")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Salary")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [receipt, setReceipt] = useState<File | null>(null)

  function resetForm() {
    setType("expense")
    setAmount("")
    setCategory("Salary")
    setDate("")
    setDescription("")
    setReceipt(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      type,
      amount,
      category,
      date,
      description,
      receipt,
    }
    // For now we just log; parent can handle via onAdd prop
    console.log("Add transaction:", payload)
    onAdd?.(payload)
    setOpen(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Plus className="w-4 h-4" /> Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Record a new income or expense transaction</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Tabs defaultValue={type} onValueChange={(v) => setType(v as any)}>
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                <TabsTrigger value="expense" className="w-1/2">Expense</TabsTrigger>
                <TabsTrigger value="income" className="w-1/2">Income</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <Label htmlFor="amount">Amount *</Label>
            <div className="mt-1">
              <Input
                id="amount"
                placeholder="$ 0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="decimal"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <div className="mt-1">
              <select
                id="category"
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Salary</option>
                <option>Food</option>
                <option>Entertainment</option>
                <option>Freelance</option>
                <option>Shopping</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="date">Date *</Label>
            <div className="mt-1">
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <div className="mt-1">
              <Input
                id="description"
                placeholder="e.g., Grocery shopping, Monthly rent..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="receipt">Receipt (Optional)</Label>
            <div className="mt-2">
              <label className="flex items-center justify-center rounded-md border border-dashed border-gray-200 dark:border-gray-800 px-3 py-6 cursor-pointer">
                <input
                  id="receipt"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setReceipt(e.target.files ? e.target.files[0] : null)}
                />
                <div className="text-center text-sm text-gray-500">Click to upload receipt image</div>
              </label>
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full items-center justify-between gap-2">
              <Button variant="ghost" type="button" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Add Transaction</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
