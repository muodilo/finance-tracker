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
import { Trash2, AlertTriangle } from "lucide-react"

interface Category {
  id: string
  name: string
  type: string
  color: string
}

interface DeleteCategoryDialogProps {
  category: Category
  onDelete?: (id: string) => void
}

export function DeleteCategoryDialog({ category, onDelete }: DeleteCategoryDialogProps) {
  const [open, setOpen] = useState(false)

  function handleDelete() {
    console.log("Delete category:", category.id)
    onDelete?.(category.id)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 p-1">
          <Trash2 className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle>Delete Category</DialogTitle>
              <DialogDescription className="mt-1">
                This action cannot be undone
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to delete the category{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              "{category.name}"
            </span>
            ? This will permanently remove the category and may affect associated transactions.
          </p>
        </div>

        <DialogFooter>
          <div className="flex w-full items-center justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-6"
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}