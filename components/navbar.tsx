"use client"

import { User } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background border-gray-200 dark:border-gray-700 ">
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <SidebarTrigger className=" rounded-md bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden md:flex">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="md:flex flex-col items-end hidden ">
            <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">
            <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>

          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
