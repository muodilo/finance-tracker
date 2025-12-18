import { create } from 'zustand'
import { Category } from '@/types/category'
import { 
  getUserCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory,
} from '@/services/categoryService'
import { toast } from 'sonner'

interface CategoryStore {
  categories: Category[]
  loading: boolean
  error: string | null

  expenseCategories: () => Category[]
  incomeCategories: () => Category[]

  fetchCategories: (userId: string) => Promise<void>
  addCategory: (userId: string, data: { name: string; type: 'Expense' | 'Income'; color: string }) => Promise<boolean>
  editCategory: (categoryId: string, userId: string, data: Partial<{ name: string; type: 'Expense' | 'Income'; color: string }>) => Promise<boolean>
  removeCategory: (categoryId: string) => Promise<boolean>
  reset: () => void
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({

  categories: [],
  loading: false,
  error: null,


  expenseCategories: () => {
    return get().categories.filter(cat => cat.type === 'Expense')
  },

  incomeCategories: () => {
    return get().categories.filter(cat => cat.type === 'Income')
  },


  fetchCategories: async (userId: string) => {
    set({ loading: true, error: null })
    
    const result = await getUserCategories(userId)
    
    if (result.success && result.data) {
      set({ 
        categories: result.data, 
        loading: false,
        error: null
      })
    } else {
      set({ 
        loading: false, 
        error: result.error || 'Failed to fetch categories' 
      })
      toast.error(result.error || 'Failed to fetch categories')
    }
  },


  addCategory: async (userId: string, data) => {
    const result = await createCategory(userId, data)
    
    if (result.success) {
      toast.success('Category created successfully!')
      await get().fetchCategories(userId)
      return true
    } else {
      toast.error(result.error || 'Failed to create category')
      return false
    }
  },

  editCategory: async (categoryId: string, userId: string, data) => {
    const result = await updateCategory(categoryId, userId, data)
    
    if (result.success) {
      toast.success('Category updated successfully!')
      await get().fetchCategories(userId)
      return true
    } else {
      toast.error(result.error || 'Failed to update category')
      return false
    }
  },

  removeCategory: async (categoryId: string) => {
    const result = await deleteCategory(categoryId)
    
    if (result.success) {
      toast.success('Category deleted successfully!')
      set(state => ({
        categories: state.categories.filter(cat => cat.id !== categoryId)
      }))
      return true
    } else {
      toast.error(result.error || 'Failed to delete category')
      return false
    }
  },

  // Reset store (useful for logout)
  reset: () => {
    set({
      categories: [],
      loading: false,
      error: null
    })
  }
}))