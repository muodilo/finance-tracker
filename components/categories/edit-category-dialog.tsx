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
import { Edit, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { updateCategory } from "@/services/categoryService"
import { toast } from "sonner"
import { Category } from "@/types/category"

const colors = [
  { name: "red", value: "bg-red-500" },
  { name: "orange", value: "bg-orange-500" },
  { name: "yellow", value: "bg-yellow-500" },
  { name: "green", value: "bg-green-500" },
  { name: "teal", value: "bg-teal-500" },
  { name: "blue", value: "bg-blue-500" },
  { name: "indigo", value: "bg-indigo-500" },
  { name: "purple", value: "bg-purple-500" },
  { name: "pink", value: "bg-pink-500" },
]

interface EditCategoryDialogProps {
  category: Category
  onEdit?: () => void
}

export function EditCategoryDialog({ category, onEdit }: EditCategoryDialogProps) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(category.name)
  const [type, setType] = useState<"Expense" | "Income">(category.type)
  const [color, setColor] = useState(category.color)

  function resetForm() {
    setName(category.name)
    setType(category.type)
    setColor(category.color)
  }

  async function handleSubmit() {
    if (!user) {
      toast.error("You must be logged in to edit a category")
      return
    }

    if (!name.trim()) {
      toast.error("Please enter a category name")
      return
    }

    setLoading(true)

    const result = await updateCategory(category.id, user.uid, {
      name: name.trim(),
      type,
      color,
    })

    setLoading(false)

    if (result.success) {
      toast.success("Category updated successfully!")
      setOpen(false)
      onEdit?.() // Trigger refresh
    } else {
      toast.error(result.error || "Failed to update category")
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) resetForm()
    }}>
      <DialogTrigger asChild>
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1">
          <Edit className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to your category
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <Label htmlFor="edit-name">Name</Label>
            <div className="mt-2">
              <Input
                id="edit-name"
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white dark:bg-gray-900"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-type">Type</Label>
            <div className="mt-2">
              <select
                id="edit-type"
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={type}
                onChange={(e) => setType(e.target.value as "Expense" | "Income")}
                disabled={loading}
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="edit-color">Color</Label>
            <div className="mt-2">
              <select
                id="edit-color"
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                disabled={loading}
              >
                {colors.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="mt-3 flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${colors.find(c => c.name === color)?.value}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {color}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full items-center justify-between gap-3">
              <Button 
                variant="outline" 
                onClick={() => { setOpen(false); resetForm(); }}
                className="px-6"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}