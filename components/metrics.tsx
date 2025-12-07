"use client";

import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface MetricItem {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBgColor: string;
}

interface MetricsProps {
  data?: MetricItem[];
}

export function Metrics({ data }: MetricsProps) {
  const defaultData: MetricItem[] = [
    {
      title: "Total Balance",
      value: "$8,234.56",
      icon: DollarSign,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "This Month Income",
      value: "$6,200.00",
      icon: TrendingUp,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "This Month Expense",
      value: "$1,250.50",
      icon: TrendingDown,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  const metrics = data || defaultData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {metric.title}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </h3>
              </div>
              <div className={`${metric.iconBgColor} p-3 rounded-lg shrink-0`}>
                <Icon className={`${metric.iconColor} w-6 h-6`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
