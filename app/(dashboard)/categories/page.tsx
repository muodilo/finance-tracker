"use client";

import { useState } from "react";
import CategoryHeader from "@/components/categories/category-header";
import ExpenseCategories from "@/components/categories/expense-categories";
import IncomeCategories from "@/components/categories/income-categories";
import { Navbar } from "@/components/navbar";

export default function Page() {
  const [refreshKey, setRefreshKey] = useState(0)
  const handleCategoryAdded = () => {
    console.log("Category added, refreshing lists...")
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-6">
        <CategoryHeader onCategoryAdded={handleCategoryAdded} />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <IncomeCategories refreshTrigger={refreshKey} />
          <ExpenseCategories refreshTrigger={refreshKey} />
        </div>
      </div>
    </div>
  )
}