"use client"

import { SideMenu } from "@/components/side-menu"
import DoubleLayeredMenu from "@/components/double-layered-menu"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DataManagementPage() {
  const router = useRouter()
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(true)

  // Listen for sidebar state changes
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebarWidth = document.documentElement.style.getPropertyValue("--sidebar-width")
      const isOpen = sidebarWidth !== "0px" && sidebarWidth !== ""
      setIsMainSidebarOpen(isOpen)
    }

    checkSidebarState()

    // Check periodically for changes
    const interval = setInterval(checkSidebarState, 100)

    return () => clearInterval(interval)
  }, [])

  // Redirect root Data Management to Sources by default
  useEffect(() => {
    router.replace("/data_management/sources")
  }, [router])

  const secondaryPanelItems = [
    {
      name: "Quality",
      href: "/data_management/quality",
    },
    {
      name: "Sources",
      href: "/data_management/sources",
    },
    {
      name: "Context",
      href: "/data_management/context",
    },
    {
      name: "Metrics",
      href: "/data_management/metrics",
    },
    {
      name: "Events",
      href: "/data_management/event",
    },
    {
      name: "Customer Properties",
      href: "/data_management/customer",
    },
    {
      name: "Channel Grouping",
      href: "/data_management/channel-grouping",
    },
    {
      name: "Settings",
      href: "/data_management/settings",
    },

  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Sidebar - only show when open */}
      {isMainSidebarOpen && <SideMenu />}

      {/* Double Layered Menu Component */}
      <DoubleLayeredMenu
        isMainSidebarOpen={isMainSidebarOpen}
        secondaryPanelItems={secondaryPanelItems}
        panelTitle="Data"
      />

      {/* Main Content Area - adjust margin based on sidebar state */}
      <div
        className="px-6 pt-20 pb-6"
        style={{
          marginLeft: isMainSidebarOpen ? "calc(340px + 256px)" : "calc(64px + 256px)",
          maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 256px)" : "calc(100vw - 64px - 256px)"
        }}
      >
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Data Management</h1>
            <p className="text-gray-600">Content area is ready for new components</p>
          </div>
        </div>
      </div>
    </div>
  )
}
