"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

const data = [
  { date: "Jan 1", value: 2300 },
  { date: "Jan 5", value: 2240 },
  { date: "Jan 10", value: 2980 },
  { date: "Jan 15", value: 2180 },
  { date: "Jan 20", value: 2250 },
  { date: "Jan 25", value: 2650 },
  { date: "Today", value: 2200 },
]

export function BalanceTrend() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Balance Trend</h2>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6e6e6" />
            <XAxis dataKey="date" tick={{ fill: "#94a3b8" }} axisLine={{ stroke: "#cbd5e1" }} />
            <YAxis tick={{ fill: "#94a3b8" }} axisLine={{ stroke: "#cbd5e1" }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "none" }}
              itemStyle={{ color: "#059669" }}
            />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
