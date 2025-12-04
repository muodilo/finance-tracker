"use client"

import { LayoutDashboard, Send, Tag, BarChart3, Settings, LogOut } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: Send,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tag,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950">
      <SidebarContent>
        <SidebarGroup className="px-4 py-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-green-600">Finance</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Personal Tracker</p>
        </SidebarGroup>
        <SidebarGroup className="px-2 py-6">
          <SidebarMenu className="gap-2">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = item.isActive
              return (
                <SidebarMenuItem key={item.title}>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-green-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 px-2 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}