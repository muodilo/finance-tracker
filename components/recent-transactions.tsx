"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { getUserTransactions } from "@/services/transactionService"

import { DollarSign, ShoppingCart } from "lucide-react"
import { Edit, Trash2 } from "lucide-react"

type FirestoreTransaction = {
  id: string
  description: string
  category: string
  amount: number
  date: string
  type: "Income" | "Expense"
  createdAt: any
}

export function RecentTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<FirestoreTransaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!user) return

      setLoading(true)
      const result = await getUserTransactions(user.uid)

      if (result.success && result.data) {
        setTransactions(result.data as unknown as FirestoreTransaction[])
      }

      setLoading(false)
    }

    load()
  }, [user])

  if (loading) {
    return <p className="text-center text-gray-400">Loading transactions...</p>
  }

  if (transactions.length === 0) {
    return <p className="text-center text-gray-400">No transactions found.</p>
  }

  return (
    <section className="mt-6">
      <div className="grid gap-4">
        {transactions.map((tx) => {
          const isIncome = tx.type === "Income"
          const Icon = isIncome ? DollarSign : ShoppingCart

          return (
            <Card key={tx.id} className="px-6 py-4">
              <div className="flex items-center justify-between">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <Icon
                      className={`w-5 h-5 ${
                        isIncome ? "text-green-600" : "text-red-600"
                      }`}
                    />
                  </div>

                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tx.description}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {tx.category}
                      </span>
                      <span className="text-xs text-gray-400">{tx.date}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        isIncome ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {tx.amount.toLocaleString()}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      <span
                        className={`inline-block text-xs ${
                          isIncome
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        } px-2 py-1 rounded-full`}
                      >
                        {isIncome ? "Income" : "Expense"}
                      </span>
                    </p>
                  </div>

                  <button className="text-gray-500 hover:text-gray-700 p-1">
                    <Edit className="w-4 h-4" />
                  </button>

                  <button className="text-gray-500 hover:text-gray-700 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
