import { AddCategoryDialog } from "./add-category-dialog";

export default function CategoryHeader({ onCategoryAdded }: { onCategoryAdded?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your transaction categories</p>
      </div>
      <div className="flex items-center gap-3">
        <AddCategoryDialog onAdd={onCategoryAdded} />
      </div>
    </div>
  )
}