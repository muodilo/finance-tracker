"use client";

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartDataItem {
  month: string;
  income: number;
  expense: number;
}

interface IncomeExpenseChartProps {
  data?: ChartDataItem[];
}

export function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  const defaultData: ChartDataItem[] = [
    { month: "Jan", income: 3800, expense: 2200 },
    { month: "Feb", income: 2900, expense: 1200 },
    { month: "Mar", income: 1800, expense: 9800 },
    { month: "Apr", income: 2700, expense: 3600 },
    { month: "May", income: 1600, expense: 4800 },
    { month: "Jun", income: 2200, expense: 3600 },
  ];

  const chartData = data || defaultData;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Income vs Expense
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Bar 
            dataKey="income" 
            fill="#10b981" 
            radius={[8, 8, 0, 0]}
            name="income"
          />
          <Bar 
            dataKey="expense" 
            fill="#ef4444" 
            radius={[8, 8, 0, 0]}
            name="expense"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}