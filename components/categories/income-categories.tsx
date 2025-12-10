"use client"

import { useEffect, useState } from "react"
import { TagIcon, PackageOpen, Loader } from "lucide-react"
import { Card, CardContent, CardTitle } from "../ui/card"
import { EditCategoryDialog } from "./edit-category-dialog"
import { DeleteCategoryDialog } from "./delete-category"
import { getUserCategories, deleteCategory, } from "@/services/categoryService"
import { useAuth } from "@/contexts/AuthContext"
import { Category } from "@/types/category"
import { toast } from "sonner"

export default function IncomeCategories({ refreshTrigger }: { refreshTrigger?: number }) {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch categories
  const fetchIncomeCategories = async () => {
    if (!user) return

    setLoading(true)
    const result = await getUserCategories(user.uid)
    setLoading(false)

    if (result.success && result.data) {
      const incomeCategories = result.data.filter(cat => cat.type === "Income")
      setCategories(incomeCategories)
    } else {
      toast.error(result.error || "Failed to fetch categories")
    }
  }

  useEffect(() => {
    fetchIncomeCategories()
  }, [user, refreshTrigger])


  const handleEdit = () => {
    fetchIncomeCategories()
  }

  const handleDelete = async (id: string) => {
    const result = await deleteCategory(id)
    
    if (result.success) {
      toast.success("Category deleted successfully!")
      fetchIncomeCategories() 
    } else {
      toast.error(result.error || "Failed to delete category")
    }
  }

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: "bg-red-500",
      orange: "bg-orange-500",
      yellow: "bg-yellow-500",
      green: "bg-green-500",
      teal: "bg-teal-500",
      blue: "bg-blue-500",
      indigo: "bg-indigo-500",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
    }
    return colorMap[color] || "bg-gray-500"
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">

          <div className="flex flex-col items-center justify-center gap-4">
            <Loader className="w-8 h-8 animate-spin text-green-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading income categories...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (categories.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <PackageOpen className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Income Categories Yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                Create your first income category to start tracking your earnings and revenue streams.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <CardTitle className="flex items-center gap-1 text-green-500 mb-5">
          <TagIcon />
          <h3 className="text-xl">Income Categories ({categories.length})</h3>
        </CardTitle>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3 p-5 rounded-lg dark:bg-green-100/10 bg-green-100/50 w-full justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getColorClass(category.color)}`} />
                  <p className="font-medium text-gray-900 dark:text-white">{category.name}</p>
                  <p className="text-xs bg-green-500/15 px-2 rounded-full text-green-500">Income</p>
                </div>
                <div className="flex items-center gap-2">
                  <EditCategoryDialog category={category} onEdit={handleEdit} />
                  <DeleteCategoryDialog category={category} onDelete={handleDelete} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}