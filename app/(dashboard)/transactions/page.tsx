"use client"

import { useEffect, useState } from "react"
import { TransactionsHeader } from "@/components/transactions/header"
import { TransactionsStats } from "@/components/transactions/stats"
import { TransactionsFilters } from "@/components/transactions/filters"
import { RecentTransactions } from "@/components/recent-transactions"
import { Navbar } from "@/components/navbar"

import { useAuth } from "@/contexts/AuthContext"
import { getUserTransactions, createTransaction } from "@/services/transactionService"

export default function Page() {
  const { user } = useAuth()

  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch transactions for logged-in user
  useEffect(() => {
    async function load() {
      if (!user) return

      setLoading(true)
      const result = await getUserTransactions(user.uid)

      if (result.success && result.data) {
        setTransactions(result.data)
      }

      setLoading(false)
    }

    load()
  }, [user])

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const net = totalIncome - totalExpense

  function formatMoney(n: number) {
    return n.toLocaleString(undefined, { style: "currency", currency: "USD" })
  }

  // Add new transaction
  async function handleAdd(data: any) {
    if (!user) return

    const txData = {
      title: data.description || "Untitled",
      category: data.category || "Uncategorized",
      amount: Number(data.amount),
      date: data.date || new Date().toLocaleDateString(),
      icon: data.type === "income" ? "salary" : "food",
      type: data.type,
    }

    // Save to Firestore
    const result = await createTransaction(user.uid, txData)

    if (result.success) {
      // Reload transactions
      const reload = await getUserTransactions(user.uid)
      if (reload.success && reload.data) {
        setTransactions(reload.data)
      }
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="p-6 space-y-6">
        <TransactionsHeader onAdd={handleAdd} />

        <TransactionsStats
          totalIncome={formatMoney(totalIncome)}
          totalExpense={formatMoney(totalExpense)}
          netBalance={formatMoney(net)}
        />

        <TransactionsFilters />

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <RecentTransactions />
        )}
      </main>
    </div>
  )
}
