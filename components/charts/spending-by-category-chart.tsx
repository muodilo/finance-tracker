"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CategoryData {
  name: string;
  value: number;
  color: string;
  [key: string]: any;
}

interface SpendingByCategoryChartProps {
  data?: CategoryData[];
}

export function SpendingByCategoryChart({ data }: SpendingByCategoryChartProps) {
  const defaultData: CategoryData[] = [
    { name: "Food", value: 450, color: "#10b981" },
    { name: "Transportation", value: 320, color: "#06b6d4" },
    { name: "Entertainment", value: 280, color: "#f59e0b" },
    { name: "Utilities", value: 200, color: "#ef4444" },
    { name: "Other", value: 150, color: "#8b5cf6" },
  ];

  const chartData = data || defaultData;

  const renderCustomLabel = (entry: any) => {
    return `${entry.name}: $${entry.value.toFixed(2)}`;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm" style={{ color: entry.color }}>
              {entry.value}: ${entry.payload.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Spending by Category
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}