import { Timestamp } from "firebase/firestore"

export interface Category {
  id: string
  name: string
  type: "Expense" | "Income"
  color: string
  createdBy: string 
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CategoryInput {
  name: string
  type: "Expense" | "Income"
  color: string
}