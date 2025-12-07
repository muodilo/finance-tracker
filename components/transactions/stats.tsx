"use client"

import { Card } from "@/components/ui/card"

export function TransactionsStats({ totalIncome = "$0.00", totalExpense = "$0.00", netBalance = "$0.00" }: { totalIncome?: string; totalExpense?: string; netBalance?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="px-6 py-4">
        <p className="text-sm text-gray-500">Total Income</p>
        <p className="text-2xl font-semibold text-green-600 mt-2">{totalIncome}</p>
      </Card>

      <Card className="px-6 py-4">
        <p className="text-sm text-gray-500">Total Expense</p>
        <p className="text-2xl font-semibold text-red-600 mt-2">{totalExpense}</p>
      </Card>

      <Card className="px-6 py-4">
        <p className="text-sm text-gray-500">Net Balance</p>
        <p className="text-2xl font-semibold text-green-600 mt-2">{netBalance}</p>
      </Card>
    </div>
  )
}
