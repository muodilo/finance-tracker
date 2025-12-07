import CategoryHeader from "@/components/categories/category-header";
import ExpenseCategories from "@/components/categories/expense-categories";
import IncomeCategories from "@/components/categories/income-categories";
import { Navbar } from "@/components/navbar";

export default function Page() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="p-6">
                <CategoryHeader />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <IncomeCategories />
                    <ExpenseCategories />
                </div>
            </div>
        </div>
    )
}