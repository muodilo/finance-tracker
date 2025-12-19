"use client";

import { Card } from "@/components/ui/card";

interface SummaryData {
  savingsRate: string;
  averageMonthlyExpense: string;
  averageMonthlyIncome: string;
}

interface AnalyticsSummaryProps {
  data?: SummaryData;
}

export function AnalyticsSummary({ data }: AnalyticsSummaryProps) {
  const defaultData: SummaryData = {
    savingsRate: "52%",
    averageMonthlyExpense: "$1,767.67",
    averageMonthlyIncome: "$3,490.00",
  };

  const summary = data || defaultData;

  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white ">
        Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Savings Rate
          </p>
          <p className="text-3xl font-bold text-green-600">
            {summary.savingsRate}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Average Monthly Expense
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {summary.averageMonthlyExpense}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Average Monthly Income
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {summary.averageMonthlyIncome}
          </p>
        </div>
      </div>
    </Card>
  );
}