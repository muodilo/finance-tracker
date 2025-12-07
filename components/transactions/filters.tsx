"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "../ui/card"

export function TransactionsFilters() {
  return (
    <Card className="mt-4 p-4  rounded-lg border border-gray-100 dark:border-gray-800">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search transactions..." className="mt-1" />
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <select id="type" className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121] px-3 py-2 text-sm mt-1">
            <option>All Types</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <select id="category" className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121] px-3 py-2 text-sm mt-1">
            <option>All Categories</option>
            <option>Salary</option>
            <option>Food</option>
            <option>Entertainment</option>
            <option>Freelance</option>
          </select>
        </div>

        <div className="flex items-end">
          <button className="w-full rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm">Clear Filters</button>
        </div>
      </div>
    </Card>
  )
}
