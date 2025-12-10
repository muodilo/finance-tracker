"use client"

import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function TransactionsHeader({ onAdd }: { onAdd?: (data: any) => void }) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage all your financial transactions</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="inline-flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
        <AddTransactionDialog onAdd={onAdd} />
      </div>
    </div>
  )
}
