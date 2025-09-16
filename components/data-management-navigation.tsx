"use client"

import { useState } from "react"
import { Activity, BarChart3, Users, FileText, Zap, Target, FileQuestion, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

const dataManagementItems = [
  { name: "Event", icon: Zap, href: "/data_management/events" },
  { name: "Customer", icon: Users, href: "/data_management/customers" },
  { name: "Advertising", icon: Target, href: "/data_management/ads" },
  { name: "Channel Grouping", icon: BarChart3, href: "/data_management/channel-grouping" },
  { name: "Context", icon: FileText, href: "/data_management/documents" },
  { name: "Funnel Analysis", icon: Activity, href: "/data_management/funnel-analysis" },
  { name: "Quality Control", icon: Zap, href: "/data_management/testing" },
]

const dataSourcesItems = [
  { name: "Sources", icon: Activity, href: "/data_management/sources" },
  { name: "Destinations", icon: Target, href: "/data_management/destinations" },
]

export default function DataManagementNavigation() {
  const [activeItem, setActiveItem] = useState(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname
      // Find matching item based on current path
      const allItems = [...dataSourcesItems, ...dataManagementItems]
      const matchedItem = allItems.find((item) => path.includes(item.href))
      return matchedItem?.name || "Overview"
    }
    return "Overview"
  })

  const handleProfileClick = () => {
    console.log("Navigate to profile edit")
  }

  return (
    <div className="w-64 h-screen border-r border-gray-200 flex flex-col bg-gray-50">
      {/* Top right buttons */}
      <div className="fixed top-4 right-4 z-[10000] flex gap-2">
        <Button
          variant="outline"
          className="bg-white text-black border-gray-200 hover:bg-gray-50 h-9 px-3 gap-2"
          onClick={() => (window.location.href = "/docs")}
        >
          <FileQuestion className="h-4 w-4" />
          <span className="font-medium">Docs</span>
        </Button>
        <Button
          variant="outline"
          className="bg-white text-black border-gray-200 hover:bg-gray-50 h-9 px-3 gap-2"
          onClick={() => (window.location.href = "/support")}
        >
          <HelpCircle className="h-4 w-4" />
          <span className="font-medium">Support</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-purple-200 transition-all">
              <AvatarFallback className="bg-gray-600 text-white text-sm font-medium">YK</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 z-[10000]">
            <div className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100" onClick={handleProfileClick}>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gray-600 text-white font-medium">YK</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">Yalcin Kaya</div>
                  <div className="text-xs text-gray-500 truncate">yalcin@growthanalyticsmarketing.com</div>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <DropdownMenuItem className="p-3 cursor-pointer text-red-600 focus:text-red-600">
                <span className="font-medium">Sign out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="p-2 hover:bg-gray-100 rounded"
            onClick={() => (window.location.href = "/copilot")}
          >
            <Image src="/arrow-left-icon.png" alt="Back" width={16} height={16} className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Data Management</h1>
            <p className="text-sm text-gray-500">Configure your data structure and connections</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Overview */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 h-12 px-3 ${
              activeItem === "Overview"
                ? "bg-purple-50 text-purple-700 hover:bg-purple-50"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => {
              setActiveItem("Overview")
              window.location.href = "/data_management"
            }}
          >
            <Image src="/data-management-icon.svg" alt="Overview" width={16} height={16} className="h-4 w-4" />
            <span className="font-medium">Overview</span>
          </Button>
        </div>

        {/* Connections Section */}
        <div className="mb-6">
          <div className="px-3 py-2 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Connections</h3>
          </div>
          <div className="space-y-1">
            {dataSourcesItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.name
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-12 px-3 ${
                    isActive ? "bg-purple-50 text-purple-700 hover:bg-purple-50" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setActiveItem(item.name)
                    window.location.href = item.href
                  }}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-purple-700" : "text-gray-500"}`} />
                  <span className="font-medium">{item.name}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Properties Section */}
        <div className="mb-6">
          <div className="px-3 py-2 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Properties</h3>
          </div>
          <div className="space-y-1">
            {dataManagementItems.slice(0, 3).map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.name
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-12 px-3 ${
                    isActive ? "bg-purple-50 text-purple-700 hover:bg-purple-50" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setActiveItem(item.name)
                    window.location.href = item.href
                  }}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-purple-700" : "text-gray-500"}`} />
                  <span className="font-medium">{item.name}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Customizations Section */}
        <div>
          <div className="px-3 py-2 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Customizations</h3>
          </div>
          <div className="space-y-1">
            {dataManagementItems.slice(3).map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.name
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-12 px-3 ${
                    isActive ? "bg-purple-50 text-purple-700 hover:bg-purple-50" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setActiveItem(item.name)
                    window.location.href = item.href
                  }}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-purple-700" : "text-gray-500"}`} />
                  <span className="font-medium">{item.name}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
