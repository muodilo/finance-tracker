"use client"

import { User } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-950">
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-4">
          {/* Sidebar toggle */}
          <SidebarTrigger className="" />
          {/* Left side - Page title */}
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>

        {/* Right side - User info and theme toggle */}
        <div className="flex items-center gap-4">
          {/* User Profile */}
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
          </div>

          {/* User Avatar */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">
            <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
