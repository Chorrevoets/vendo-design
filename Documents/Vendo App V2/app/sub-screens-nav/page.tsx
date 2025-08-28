"use client"

import ExtractedShaderBackground from "@/components/extracted-shader-background"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import SideMenu from "@/components/side-menu"

export default function SubScreensNavPage() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true)
  }

  const handleNewChat = () => {
    router.push("/")
  }

  return (
    <ExtractedShaderBackground className="h-screen">
      {isSidebarOpen && <SideMenu />}

      {/* Left side - Logo and menu */}
      <div className="fixed top-6 left-[20px] md:left-4 z-[10000]">
        <div className="relative group">
          <button
            onClick={handleOpenSidebar}
            className="flex items-center gap-2 p-0 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <div className="h-8 w-8 min-[750px]:w-20 flex items-center justify-center">
                <Image
                  src="/vendo-logo-mark.png"
                  alt="Vendo"
                  width={20}
                  height={20}
                  className="h-5 w-5 block min-[750px]:hidden"
                />
                <Image
                  src="/vendo-logo-wordmark.png"
                  alt="Vendo"
                  width={80}
                  height={20}
                  className="h-5 w-auto hidden min-[750px]:block"
                />
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[20px] w-[20px] ml-1">
              <path d="M20 7 4 7" stroke="#000000" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M15 12 4 12" stroke="#000000" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M9 17H4" stroke="#000000" strokeLinecap="round" strokeWidth="2.5"></path>
            </svg>
          </button>
          <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            Open Sidebar
          </div>
        </div>
      </div>

      {/* Centered page title placeholder */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[10000]">
        <h1 className="text-xl font-semibold text-gray-900">Page Title</h1>
      </div>

      <div className="fixed top-6 right-4 z-[10000]">
        <Button
          variant="outline"
          size="sm"
          className="bg-white text-black border-gray-200 hover:bg-gray-50 h-9 px-3 gap-2"
          onClick={handleNewChat}
        >
          <Edit className="h-4 w-4" />
          <span className="hidden min-[750px]:inline">New Chat</span>
        </Button>
      </div>

      <main className="h-screen flex flex-col relative pt-16">
        {/* Minimal content area - just the background and header */}
      </main>
    </ExtractedShaderBackground>
  )
}
