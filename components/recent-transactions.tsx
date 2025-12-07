"use client"

import { Card } from "@/components/ui/card"
import { DollarSign, Coffee, ShoppingCart, Film, Briefcase, Edit, Trash2 } from "lucide-react"

export type Transaction = {
  id: number
  title: string
  category: string
  amount: string
  date: string
  icon: any
  positive: boolean
}

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Salary",
    amount: "+$5,000.00",
    date: "12/3/2025",
    icon: DollarSign,
    positive: true,
  },
  {
    id: 2,
    title: "Coffee Shop",
    category: "Food",
    amount: "-$4.50",
    date: "12/4/2025",
    icon: Coffee,
    positive: false,
  },
  {
    id: 3,
    title: "Grocery Store",
    category: "Food",
    amount: "-$89.32",
    date: "12/5/2025",
    icon: ShoppingCart,
    positive: false,
  },
  {
    id: 4,
    title: "Netflix Subscription",
    category: "Entertainment",
    amount: "-$15.99",
    date: "12/5/2025",
    icon: Film,
    positive: false,
  },
  {
    id: 5,
    title: "Freelance Project",
    category: "Freelance",
    amount: "+$1,200.00",
    date: "11/30/2025",
    icon: Briefcase,
    positive: true,
  },
]

export function RecentTransactions({ transactions = DEFAULT_TRANSACTIONS }: { transactions?: Transaction[] }) {
  return (
    <section className="mt-6">
      <div className="grid gap-4">
        {transactions.map((tx) => {
          const Icon = tx.icon
          return (
            <Card key={tx.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${tx.positive ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{tx.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">{tx.category}</span>
                      <span className="text-xs text-gray-400">{tx.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-medium ${tx.positive ? "text-green-600" : "text-red-600"}`}>{tx.amount}</p>
                    <p className="text-xs text-gray-400 mt-1"><span className={`inline-block text-xs ${tx.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-2 py-1 rounded-full`}>{tx.positive ? 'income' : 'expense'}</span></p>
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
