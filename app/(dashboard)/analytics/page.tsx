import { AnalyticsSummary } from "@/components/analytics/analytic-summary";
import AnalyticsHeader from "@/components/analytics/analytics-header";
import { AnalyticsMetrics } from "@/components/analytics/analytics-metrics";
import { IncomeExpenseChart } from "@/components/charts/income-expense-chart";
import { SpendingByCategoryChart } from "@/components/charts/spending-by-category-chart";
import { Navbar } from "@/components/navbar";

export default function Page(){
    return (
        <div className="min-h-screen">
           <Navbar />
           <div className="p-6">
                <AnalyticsHeader />
                <div  className="mt-12">
                    <AnalyticsMetrics />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                        <IncomeExpenseChart />
                        <SpendingByCategoryChart /> 
                    </div>
                    <AnalyticsSummary />
                </div>
           </div>
        </div>
    )
}