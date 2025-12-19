// services/categoryService.ts
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  serverTimestamp,
  orderBy 
} from "firebase/firestore"
import { db } from "@/config/firebase"
import { Category, CategoryInput } from "@/types/category"

// Result type for operations
export interface ServiceResult<T = void> {
  success: boolean
  data?: T
  error?: string
}

// Check if category name already exists for user (case-insensitive)
export async function categoryExists(userId: string, name: string, excludeId?: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, "categories"),
      where("createdBy", "==", userId)
    )
    
    const querySnapshot = await getDocs(q)
    const normalizedName = name.toLowerCase().trim()
    
    return querySnapshot.docs.some(doc => {
      const docName = doc.data().name.toLowerCase().trim()
      const isSameName = docName === normalizedName
      const isDifferentCategory = excludeId ? doc.id !== excludeId : true
      return isSameName && isDifferentCategory
    })
  } catch (error) {
    console.error("Error checking category existence:", error)
    return false
  }
}

// Create a new category
export async function createCategory(userId: string, data: CategoryInput): Promise<ServiceResult<string>> {
  try {
    // Check if category already exists (case-insensitive)
    const exists = await categoryExists(userId, data.name)
    
    if (exists) {
      return {
        success: false,
        error: "A category with this name already exists"
      }
    }
    
    const docRef = await addDoc(collection(db, "categories"), {
      name: data.name,
      type: data.type,
      color: data.color,
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    
    return {
      success: true,
      data: docRef.id
    }
  } catch (error: any) {
    console.error("Error creating category:", error)
    return {
      success: false,
      error: error.message || "Failed to create category"
    }
  }
}

// Get all categories for a user
export async function getUserCategories(userId: string): Promise<ServiceResult<Category[]>> {
  try {
    const q = query(
      collection(db, "categories"),
      where("createdBy", "==", userId)
    )
    
    const querySnapshot = await getDocs(q)
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category))
    
    // Sort by createdAt in memory (newest first)
    categories.sort((a, b) => {
      const aTime = a.createdAt?.toMillis() || 0
      const bTime = b.createdAt?.toMillis() || 0
      return bTime - aTime
    })
    
    return {
      success: true,
      data: categories
    }
  } catch (error: any) {
    console.error("Error fetching categories:", error)
    return {
      success: false,
      error: error.message || "Failed to fetch categories"
    }
  }
}

// Update a category
export async function updateCategory(categoryId: string, userId: string, data: Partial<CategoryInput>): Promise<ServiceResult> {
  try {
    // If name is being updated, check for duplicates
    if (data.name) {
      const exists = await categoryExists(userId, data.name, categoryId)
      
      if (exists) {
        return {
          success: false,
          error: "A category with this name already exists"
        }
      }
    }
    
    const categoryRef = doc(db, "categories", categoryId)
    await updateDoc(categoryRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    
    return {
      success: true
    }
  } catch (error: any) {
    console.error("Error updating category:", error)
    return {
      success: false,
      error: error.message || "Failed to update category"
    }
  }
}

// Delete a category
export async function deleteCategory(categoryId: string): Promise<ServiceResult> {
  try {
    await deleteDoc(doc(db, "categories", categoryId))
    return {
      success: true
    }
  } catch (error: any) {
    console.error("Error deleting category:", error)
    return {
      success: false,
      error: error.message || "Failed to delete category"
    }
  }
}