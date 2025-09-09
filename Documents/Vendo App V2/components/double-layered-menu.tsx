"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { ChevronRight, Settings, BarChart3, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { SearchChatsModal } from "@/components/search-chats-modal"

interface DoubleLayeredMenuProps {
  isMainSidebarOpen: boolean
  secondaryPanelItems: Array<{
    name: string
    href: string
  }>
  panelTitle?: string
  activeItem?: string
  panelActions?: ReactNode
}

export default function DoubleLayeredMenu({
  isMainSidebarOpen,
  secondaryPanelItems,
  panelTitle = "Data Management",
  activeItem,
  panelActions
}: DoubleLayeredMenuProps) {
  const router = useRouter()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isSecondaryCollapsed, setIsSecondaryCollapsed] = useState(false)

  useEffect(() => {
    const width = isSecondaryCollapsed ? 100 : 230
    document.documentElement.style.setProperty("--secondary-panel-width", `${width}px`)
  }, [isSecondaryCollapsed])

  const narrowMenuItems = [
    {
      name: "Petzyo",
      icon: "/petzyo-logo.png",
      href: "/account_settings",
      isAvatar: true,
    },
    {
      name: "New Chat",
      icon: "/New-chat.svg",
      href: "/",
      hasNotification: true,
      notificationColor: "green",
    },
    {
      name: "Reports",
      icon: "/Key-result.svg",
      href: "/reports",
    },
    {
      name: "Pulse",
      icon: "/Pulse.svg",
      href: "/pulse",
      hasNotification: true,
      notificationColor: "orange",
    },
    {
      name: "Search Chats",
      icon: "/Magnifer.svg",
      href: "/search-chats",
    },
    {
      name: "Docs",
      icon: "/Question-Square.svg",
      href: "/docs",
    },
  ]

  return (
    <>
      {/* Narrow Sidebar - only show when main sidebar is closed */}
      {!isMainSidebarOpen && (
        <div
          className="fixed left-0 top-0 h-full w-16 bg-white border-r border-gray-200 flex flex-col items-start pt-4 pb-[2px] z-[10010]"
        >
          {/* Logo row */}
          <div className="px-3 w-full">
            <div className="relative group">
              <button
                onClick={() => router.push("/")}
                className="flex items-center rounded-lg hover:bg-gray-100 transition-colors mb-2 h-10 w-10 justify-center"
                aria-label="Vendo Home"
              >
                <Image src="/vendo-logo-mark.png" alt="Vendo" width={24} height={24} className="h-6 w-6 relative top-[-4px]" />
              </button>
            </div>
          </div>

          {/* Menu items */}
          {!isSecondaryCollapsed && (
            <div className="flex-1 w-full space-y-2 mt-1">
              {narrowMenuItems.map((item) => (
                item.name === "Petzyo" ? (
                  <div key={item.name} className="relative group">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="flex items-center rounded-lg hover:bg-gray-100 transition-colors h-10 w-10 justify-center mx-3 relative"
                          aria-label={item.name}
                        >
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                          {item.hasNotification && (
                            <div className={`pointer-events-none absolute top-0 right-0 w-2 h-2 rounded-full ${item.notificationColor === "green" ? "bg-green-500" : "bg-orange-500"}`} />
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-80">
                        <div className="space-y-3">
                          <DropdownMenuItem onClick={() => router.push("/workspace_settings/profile")} className="p-0">
                            <div className="relative flex items-center gap-1 hover:bg-gray-50 rounded-md h-[36px] px-2 transition-colors bg-transparent border-none cursor-pointer text-left w-full ml-[-10px]">
                              <div className="relative">
                                <div className="bg-transparent text-black h-9 w-9 gap-2 justify-center rounded-md flex items-center ml-0">
                                  <Settings className="h-[18px] w-[18px]" />
                                </div>
                              </div>
                              <span className="text-sm font-medium text-gray-900 ml-[3px]">Workspace Settings</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push("/data_management/sources")} className="p-0">
                            <div className="relative flex items-center gap-1 hover:bg-gray-50 rounded-md h-[36px] px-2 transition-colors bg-transparent border-none cursor-pointer text-left w-full ml-[-10px]">
                              <div className="relative">
                                <div className="bg-transparent text-black h-9 w-9 gap-2 justify-center rounded-md flex items-center ml-0">
                                  <BarChart3 className="h-[18px] w-[18px]" />
                                </div>
                              </div>
                              <span className="text-sm font-medium text-gray-900 ml-[3px]">Data Management</span>
                            </div>
                          </DropdownMenuItem>
                        </div>
                        <DropdownMenuItem className="p-0 hover:bg-transparent focus:bg-transparent mt-[14px]">
                          <div className="w-full">
                            <div className="px-2 py-1.5 text-sm font-medium text-gray-700 flex items-center">Switch Workspace</div>
                            <div className="px-2 py-1">
                              <div className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => console.log("Switch to TechCorp")}>
                                <div className="flex items-center justify-center w-8 h-8 border border-gray-200 rounded-full bg-gray-600">
                                  <div className="text-white text-xs font-bold">TE</div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900">TechCorp</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => console.log("Switch to StartupXYZ")}>
                                <div className="flex items-center justify-center w-8 h-8 border border-gray-200 rounded-full bg-gray-600">
                                  <div className="text-white text-xs font-bold">ST</div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900">StartupXYZ</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
                      {item.name}
                    </div>
                  </div>
                ) : (
                  <div key={item.name} className="relative group">
                    <button
                      onClick={() => {
                        if (item.name === "Search Chats") {
                          setIsSearchModalOpen(true)
                        } else {
                          router.push(item.href)
                        }
                      }}
                      className="flex items-center rounded-lg hover:bg-gray-100 transition-colors h-10 w-10 justify-center mx-3 relative"
                      aria-label={item.name}
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={item.isAvatar ? 30 : 20}
                        height={item.isAvatar ? 30 : 20}
                        className={item.isAvatar ? "rounded-full" : ""}
                      />
                      {item.hasNotification && (
                        <div className={`pointer-events-none absolute top-0 right-0 w-2 h-2 rounded-full ${item.notificationColor === "green" ? "bg-green-500" : "bg-orange-500"}`} />
                      )}
                    </button>
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
                      {item.name}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Bottom element */}
          <div className="w-full mt-auto pb-[2px]">
            <div className="relative group">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center rounded-lg hover:bg-gray-100 transition-colors h-10 w-10 justify-center mx-3 relative"
                    aria-label="Yalcin Kaya"
                  >
                    <div className="h-[30px] w-[30px] rounded-full bg-black text-white flex items-center justify-center text-[12px] font-medium">YK</div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80">
                  <div className="space-y-3">
                    <DropdownMenuItem onClick={() => router.push("/profile_settings")} className="p-0">
                      <div className="relative flex items-center gap-1 hover:bg-gray-50 rounded-md h-[36px] px-2 transition-colors bg-transparent border-none cursor-pointer text-left w-full ml-[-10px]">
                        <div className="relative">
                          <div className="bg-transparent text-black h-9 w-9 gap-2 justify-center rounded-md flex items-center ml-0">
                            <Settings className="h-[18px] w-[18px]" />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 ml-[3px]">Profile Settings</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Sign out clicked')} className="p-0">
                      <div className="relative flex items-center gap-1 hover:bg-gray-50 rounded-md h-[36px] px-2 transition-colors bg-transparent border-none cursor-pointer text-left w-full ml-[-10px]">
                        <div className="relative">
                          <div className="bg-transparent text-black h-9 w-9 gap-2 justify-center rounded-md flex items-center ml-0">
                            <LogOut className="h-[18px] w-[18px]" />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 ml-[3px]">Sign Out</span>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
                Yalcin Kaya
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Panel - always visible, adjust position based on sidebar state */}
      <div
        className={`${isSecondaryCollapsed ? "w-[100px] h-[61px] border-b" : "w-[230px] h-full"} fixed top-0 bg-white border-r border-gray-200 flex flex-col z-[10002]`}
        style={{
          left: isMainSidebarOpen ? "340px" : "64px"
        }}
      >
        <div className="pl-6 pr-2 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className={`text-lg font-semibold text-gray-900 ${isSecondaryCollapsed ? "sr-only" : ""}`}>{panelTitle}</h2>
          <div className="ml-auto flex items-center gap-2">
            {panelActions && !isSecondaryCollapsed ? <div>{panelActions}</div> : null}
            <button
              className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100"
              aria-label={isSecondaryCollapsed ? "Open side menu" : "Close side menu"}
              onClick={() => setIsSecondaryCollapsed(v => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`h-[18px] w-[18px] transition-transform scale-x-[-1]`}
              >
                <path d="M20 7 4 7" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                <path d="M15 12 4 12" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                <path d="M9 17H4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 px-4 py-4">
          {!isSecondaryCollapsed ? (
            <nav className="space-y-2">
              {secondaryPanelItems.map((item) => {
                const isActive = activeItem === item.name
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors ${isActive
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && <ChevronRight className="h-4 w-4 text-blue-400" />}
                  </button>
                )
              })}
            </nav>
          ) : null}
        </div>
      </div>

      <SearchChatsModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </>
  )
}
