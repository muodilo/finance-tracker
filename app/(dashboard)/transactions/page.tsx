"use client"

import { useState } from "react"
import { TransactionsHeader } from "@/components/transactions/header"
import { TransactionsStats } from "@/components/transactions/stats"
import { TransactionsFilters } from "@/components/transactions/filters"
import { RecentTransactions, DEFAULT_TRANSACTIONS, Transaction } from "@/components/recent-transactions"
import { DollarSign, ShoppingCart } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS)

  function parseAmount(amountStr: string) {
    const num = Number(amountStr.replace(/[^0-9.-]+/g, ""))
    return Number.isNaN(num) ? 0 : num
  }

  const totalIncome = transactions.reduce((sum, t) => (t.positive ? sum + parseAmount(t.amount) : sum), 0)
  const totalExpense = transactions.reduce((sum, t) => (!t.positive ? sum + Math.abs(parseAmount(t.amount)) : sum), 0)
  const net = totalIncome - totalExpense

  function formatMoney(n: number) {
    return n.toLocaleString(undefined, { style: "currency", currency: "USD" })
  }

  function handleAdd(data: any) {
    const id = Date.now()
    const positive = data.type === "income"
    const amt = data.amount ? data.amount.replace(/[^0-9.]/g, "") : "0.00"
    const amountStr = positive ? `+$${amt}` : `-$${amt}`
    const date = data.date || new Date().toLocaleDateString()
    const icon = positive ? DollarSign : ShoppingCart
    const title = data.description || (positive ? "Income" : "Expense")
    const category = data.category || "Other"

    const newTx: Transaction = {
      id,
      title,
      category,
      amount: amountStr,
      date,
      icon,
      positive,
    }

    setTransactions((prev) => [newTx, ...prev])
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-6 space-y-6">
        <TransactionsHeader onAdd={handleAdd} />

        <TransactionsStats totalIncome={formatMoney(totalIncome)} totalExpense={formatMoney(totalExpense)} netBalance={formatMoney(net)} />

        <TransactionsFilters />

        <RecentTransactions transactions={transactions} />
      </main>
    </div>
  )
}
