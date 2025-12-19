"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface AnalyticsMetricItem {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBgColor: string;
}

interface AnalyticsMetricsProps {
  data?: AnalyticsMetricItem[];
}

export function AnalyticsMetrics({ data }: AnalyticsMetricsProps) {
  const defaultData: AnalyticsMetricItem[] = [
    {
      title: "Top Category",
      value: "$450.00",
      icon: TrendingDown,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Total Income (YTD)",
      value: "$20,940.00",
      icon: TrendingUp,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Total Expense (YTD)",
      value: "$10,606.00",
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
          <Card key={index} className="p-6  border-none">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                  {metric.title}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </h3>
              </div>
              <div className={`${metric.iconBgColor} p-3 rounded-lg shrink-0`}>
                <Icon className={`${metric.iconColor} w-5 h-5`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}