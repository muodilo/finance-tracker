export default function CategoryHeader() {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your transaction categories</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors">
          Add Category
        </button>
      </div>
    </div>
  )
}