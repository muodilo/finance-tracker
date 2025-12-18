import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore"
import { db } from "@/config/firebase"
import { Transaction } from "@/types/transaction"

export interface ServiceResult<T> {
  success: boolean
  data?: T
  error?: string
}

// Fetch user transactions
export async function getUserTransactions(userId: string): Promise<ServiceResult<Transaction[]>> {
  try {
    const q = query(
  collection(db, "transactions"),
  where("userId", "==", userId)
)


    const snap = await getDocs(q)
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[]

    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// Create
export async function createTransaction(userId: string, data: Partial<Transaction>): Promise<ServiceResult<null>> {
  try {
    await addDoc(collection(db, "transactions"), {
      ...data,
      userId,
      createdAt: serverTimestamp(),
    })
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// Update
export async function updateTransaction(id: string, data: Partial<Transaction>): Promise<ServiceResult<null>> {
  try {
    await updateDoc(doc(db, "transactions", id), data)
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// Delete
export async function deleteTransaction(id: string): Promise<ServiceResult<null>> {
  try {
    await deleteDoc(doc(db, "transactions", id))
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
