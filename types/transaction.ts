export interface Transaction {
  id: string
  userId: string
  title: string
  amount: number
  type: "Income" | "Expense"
  category: string
  date: string
  createdAt: string
}