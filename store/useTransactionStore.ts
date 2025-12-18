import { create } from "zustand"
import { Transaction } from "@/types/transaction"
import {
  getUserTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "@/services/transactionService"
import { toast } from "sonner"

interface TransactionStore {
  transactions: Transaction[]
  loading: boolean
  error: string | null

  // Computed
  incomeTotal: () => number
  expenseTotal: () => number
  netBalance: () => number

  // Actions
  fetchTransactions: (userId: string) => Promise<void>
  addTransaction: (userId: string, data: Partial<Transaction>) => Promise<boolean>
  editTransaction: (id: string, data: Partial<Transaction>, userId: string) => Promise<boolean>
  removeTransaction: (id: string) => Promise<boolean>
  reset: () => void
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  loading: false,
  error: null,

  // totals
  incomeTotal: () => {
    return get().transactions
      .filter(t => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0)
  },

  expenseTotal: () => {
    return get().transactions
      .filter(t => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0)
  },

  netBalance: () => {
    const g = get()
    return g.incomeTotal() - g.expenseTotal()
  },

  // Fetch
  fetchTransactions: async (userId) => {
    set({ loading: true, error: null })

    const result = await getUserTransactions(userId)
    if (result.success && result.data) {
      set({ transactions: result.data, loading: false })
    } else {
      set({ loading: false, error: result.error })
      toast.error(result.error || "Failed to fetch transactions")
    }
  },

  // Create
  addTransaction: async (userId, data) => {
    const result = await createTransaction(userId, data)

    if (result.success) {
      toast.success("Transaction added!")
      await get().fetchTransactions(userId)
      return true
    } else {
      toast.error(result.error || "Failed to add transaction")
      return false
    }
  },

  // Update
  editTransaction: async (id, data, userId) => {
    const result = await updateTransaction(id, data)

    if (result.success) {
      toast.success("Transaction updated!")
      await get().fetchTransactions(userId)
      return true
    } else {
      toast.error(result.error || "Failed to update")
      return false
    }
  },

  // Delete
  removeTransaction: async (id) => {
    const result = await deleteTransaction(id)

    if (result.success) {
      toast.success("Transaction deleted")
      set(state => ({
        transactions: state.transactions.filter(t => t.id !== id)
      }))
      return true
    } else {
      toast.error(result.error || "Failed to delete")
      return false
    }
  },

  reset: () => {
    set({ transactions: [], loading: false, error: null })
  },
}))
