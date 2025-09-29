"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { SearchChatsModal } from "@/components/search-chats-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Settings, LogOut, BarChart3, Plus } from "lucide-react"
import React from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface SingleLayerMenuProps {
    forceState?: "open" | "narrow" | "hidden"
    initialState?: "open" | "narrow" | "hidden"
    onToggleState?: (next: "open" | "narrow" | "hidden") => void
}

interface NarrowMenuItem {
    name: string
    icon: string
    href: string
    isAvatar?: boolean
    hasNotification?: boolean
    notificationColor?: "green" | "orange"
}

export default function SingleLayerMenu({ forceState, initialState, onToggleState }: SingleLayerMenuProps = {}) {
    const router = useRouter()
    const pathname = usePathname()
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen] = useState(initialState === "open")
    const effectiveIsOpen = forceState ? forceState === "open" : isOpen
    const isHidden = forceState ? forceState === "hidden" : initialState === "hidden"
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

    // On desktop, when closed, show narrow instead of hidden
    const shouldShowNarrow = !isMobile && !effectiveIsOpen && !isHidden
    const effectiveState = effectiveIsOpen ? "open" : (isHidden ? "hidden" : (shouldShowNarrow ? "narrow" : "hidden"))

    // Update CSS variable so main content can center relative to the menu
    React.useEffect(() => {
        const narrowWidth = 80 // Increased from 64px to 80px
        const widthPx = effectiveState === "open" ? 285 : (effectiveState === "hidden" ? (isMobile ? 0 : 100) : narrowWidth)
        const contentLeftPx = effectiveState === "open" ? 285 : (effectiveState === "hidden" ? (isMobile ? 0 : 0) : narrowWidth)
        const headerLeftPx = effectiveState === "open" ? 285 : (effectiveState === "hidden" ? (isMobile ? 0 : 100) : narrowWidth)
        document.documentElement.style.setProperty("--sidebar-width", `${widthPx}px`)
        document.documentElement.style.setProperty("--content-left", `${contentLeftPx}px`)
        document.documentElement.style.setProperty("--header-left", `${headerLeftPx}px`)
    }, [effectiveState, isMobile])

    const openChats = [
        { name: "Marketing Strategy", href: "/chats/marketing-strategy" },
        { name: "Product Roadmap", href: "/chats/product-roadmap" },
        { name: "Customer Feedback", href: "/chats/customer-feedback" },
        { name: "Q4 Planning", href: "/chats/q4-planning" },
        { name: "User Research", href: "/chats/user-research" },
        { name: "Sales Analytics", href: "/chats/sales-analytics" },
        { name: "Competitor Analysis", href: "/chats/competitor-analysis" },
        { name: "Feature Requests", href: "/chats/feature-requests" },
        { name: "Team Retrospective", href: "/chats/team-retrospective" },
        { name: "Budget Planning", href: "/chats/budget-planning" },
        { name: "Performance Review", href: "/chats/performance-review" },
        { name: "Market Research", href: "/chats/market-research" },
        { name: "Technical Debt", href: "/chats/technical-debt" },
    ]

    const narrowMenuItems: NarrowMenuItem[] = [
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
            name: "Data",
            icon: "/data-management-icon.svg",
            href: "/data_management/sources",
        },
        {
            name: "Docs",
            icon: "/Question-Square.svg",
            href: "/docs",
        },
    ]

    return (
        <>
            {/* Toggle button outside the panel only for hidden state (hidden on Data Management pages to avoid duplicate icons) */}
            {!pathname?.startsWith("/data_management") && effectiveState === "hidden" && (
                <div className={`fixed top-[22px] z-[10011] group`} style={{ left: `52px` }}>
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 flex-shrink-0">
                        <button
                            onClick={(e) => { e.stopPropagation(); router.push("/") }}
                            className="w-6 h-6 flex items-center justify-center"
                            aria-label="Vendo Home"
                        >
                            <Image
                                src="/vendo-logo-mark.png"
                                alt="Vendo"
                                width={24}
                                height={24}
                                className="block w-6 h-6"
                            />
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            if (forceState) {
                                onToggleState && onToggleState("open")
                            } else {
                                setIsOpen(true)
                            }
                        }}
                        className={`flex items-center p-0 bg-transparent text-black`}
                        aria-label="Open Sidebar"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-[18px] w-[18px] transition-transform`}
                        >
                            <path d="M20 7 4 7" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                            <path d="M15 12 4 12" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                            <path d="M9 17H4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                        </svg>
                    </button>
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">Open Sidebar</div>
                </div>
            )}

            {/* Panel with three states: open (285px), narrow (80px), hidden (100px on desktop, 0px on mobile) */}
            <div
                className={`${effectiveState === "open" ? "w-[285px]" : (effectiveState === "hidden" ? (isMobile ? "w-0" : "w-[100px]") : "w-20")} fixed left-0 top-0 ${effectiveState === "hidden" ? (isMobile ? "h-0" : "h-[61px]") : "h-full"} bg-white border-gray-200 border-r ${effectiveState === "hidden" ? "border-b" : ""} flex flex-col items-start ${effectiveState === "hidden" ? "pt-0 pb-0" : "pt-4 pb-[2px]"} z-[10010] ${isMobile && effectiveState === "hidden" ? "hidden" : ""}`}
            >
                {effectiveState === "open" && (
                    <div id="shortcut-open-container" className="absolute inset-0 pointer-events-none" />
                )}
                {/* Render identical content in both states; only width changes */}
                {/* Logo row */}
                {effectiveState !== "hidden" && (
                    <div className="pl-[22px] pr-3 w-full">
                        <div className="relative group">
                            <button
                                onClick={() => {
                                    if (effectiveState === "narrow") {
                                        // In narrow state, this opens the sidebar
                                        if (forceState) {
                                            onToggleState && onToggleState("open")
                                        } else {
                                            setIsOpen(true)
                                        }
                                    } else {
                                        // In open state, this goes to home
                                        router.push("/")
                                    }
                                }}
                                className={`relative flex items-center rounded-lg transition-colors mb-2 ${effectiveState === "open" ? "h-10 w-[calc(100%-175px)] pl-0 pr-2 justify-start" : "h-10 w-10 justify-center hover:bg-gray-100"}`}
                                aria-label={effectiveState === "narrow" ? "Open Sidebar" : "Vendo Home"}
                            >
                                <span className={`${effectiveState === "open" ? "w-10 flex justify-center relative top-[-4px]" : ""}`}>
                                    <Image src="/vendo-logo-mark.png" alt="Vendo" width={24} height={24} className="block h-6 w-6" />
                                </span>
                                {effectiveState === "open" && (
                                    <span className="text-[20px] font-semibold text-gray-900 ml-[-9px] relative top-[1px]">endo</span>
                                )}
                                {/* Toggle icon in narrow state - positioned close to logo, top-aligned */}
                                {effectiveState === "narrow" && !pathname?.startsWith("/data_management") && (
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-[16px] w-[16px] ml-1 relative top-[-6px]"
                                    >
                                        <path d="M20 7 4 7" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                        <path d="M15 12 4 12" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                        <path d="M9 17H4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                    </svg>
                                )}
                            </button>
                            {/* Close button in open state */}
                            {effectiveState === "open" && !pathname?.startsWith("/data_management") && (
                                <button
                                    onClick={() => {
                                        if (forceState) {
                                            onToggleState && onToggleState(isMobile ? "hidden" : "narrow")
                                        } else {
                                            setIsOpen(false)
                                        }
                                    }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                                    aria-label="Close Sidebar"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-[16px] w-[16px] transition-transform scale-x-[-1]"
                                    >
                                        <path d="M20 7 4 7" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                        <path d="M15 12 4 12" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                        <path d="M9 17H4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                    </svg>
                                </button>
                            )}
                            {effectiveState === "narrow" && (
                                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                                    Open Sidebar
                                </div>
                            )}
                            {effectiveState === "open" && (
                                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                                    Vendo Home
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Menu items */}
                {effectiveState !== "hidden" && (
                    <div className="flex-1 w-full space-y-2 mt-1 overflow-y-auto">
                        {narrowMenuItems.map((item) => (
                            item.name === "Petzyo" ? (
                                <div key={item.name} className="relative group">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${effectiveState === "open" ? "h-10 w-[calc(100%-24px)] mx-3 pl-[5px] pr-2 justify-start" : "h-10 w-10 justify-center mx-3"} relative`}
                                                aria-label={item.name}
                                            >
                                                <Image
                                                    src={item.icon}
                                                    alt={item.name}
                                                    width={30}
                                                    height={30}
                                                    className="rounded-full"
                                                />
                                                {effectiveState === "open" && (
                                                    <span className="text-sm font-medium text-gray-900 ml-[8px]">{item.name}</span>
                                                )}
                                                {item.hasNotification && (
                                                    <div className={`pointer-events-none absolute ${effectiveState === "open" ? "top-1.5 left-[17px]" : "top-0 right-0"} w-2 h-2 rounded-full ${item.notificationColor === "green" ? "bg-green-500" : "bg-orange-500"}`} />
                                                )}
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className={`${effectiveState === "open" ? "w-80" : "w-[260px]"}`}>
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
                                                {/* Data Management moved to main menu */}
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
                                    {effectiveState === "narrow" && (
                                        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                                            {item.name}
                                        </div>
                                    )}
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
                                        className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${effectiveState === "open" ? "h-10 w-[calc(100%-24px)] mx-3 pl-[10px] pr-2 justify-start" : "h-10 w-10 justify-center mx-3 bg-white"} relative`}
                                        aria-label={item.name}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.name}
                                            width={item.isAvatar ? 30 : 20}
                                            height={item.isAvatar ? 30 : 20}
                                            className={item.isAvatar ? "rounded-full" : ""}
                                        />
                                        {effectiveState === "open" && (
                                            <span className="text-sm font-medium text-gray-900 ml-[8px]">{item.name}</span>
                                        )}
                                        {item.hasNotification && (
                                            <div className={`pointer-events-none absolute ${effectiveState === "open" ? "top-1.5 left-[17px]" : "top-0 right-0"} w-2 h-2 rounded-full ${item.notificationColor === "green" ? "bg-green-500" : "bg-orange-500"}`} />
                                        )}
                                    </button>
                                    {effectiveState === "narrow" && (
                                        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                                            {item.name}
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                        {effectiveState === "open" && (
                            <div className="w-full mt-2">
                                <div className="mx-3 pl-[10px]"><span className="text-sm font-medium text-gray-900">Chat History</span></div>
                                <div className="mt-1 pr-1">
                                    {openChats.map((chat) => (
                                        <div key={chat.name} className="relative">
                                            <button
                                                onClick={() => router.push(chat.href)}
                                                className="flex items-center rounded-lg hover:bg-gray-100 transition-colors h-10 w-[calc(100%-24px)] mx-3 pl-[10px] pr-2 justify-start text-left"
                                                aria-label={chat.name}
                                            >
                                                <span className="text-sm text-gray-900">{chat.name}</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}


                {/* Bottom Petzyo copy */}
                {effectiveState !== "hidden" && (
                    <div className="w-full mt-auto pb-[6px]">
                        <div className="relative group">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${effectiveState === "open" ? "h-10 w-[calc(100%-24px)] mx-3 pl-[5px] pr-2 justify-start" : "h-10 w-10 justify-center mx-3"} relative`}
                                        aria-label="Yalcin Kaya"
                                    >
                                        <div className="h-[30px] w-[30px] rounded-full bg-black text-white flex items-center justify-center text-[12px] font-medium">YK</div>
                                        {effectiveState === "open" && (
                                            <span className="text-sm font-medium text-gray-900 ml-[8px]">Yalcin Kaya</span>
                                        )}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className={`${effectiveState === "open" ? "w-80" : "w-[260px]"}`}>
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
                            {effectiveState === "narrow" && (
                                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                                    Yalcin Kaya
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Search Chats Modal */}
                <SearchChatsModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
            </div>
        </>
    )
}

export function NarrowShortcutColumn({ onNavigate }: { onNavigate?: (href: string) => void }) {
    const router = useRouter()
    const narrowMenuItems: NarrowMenuItem[] = [
        { name: "Petzyo", icon: "/petzyo-logo.png", href: "/account_settings", isAvatar: true },
        { name: "New Chat", icon: "/New-chat.svg", href: "/" },
        { name: "Reports", icon: "/Key-result.svg", href: "/reports" },
        { name: "Pulse", icon: "/Pulse.svg", href: "/pulse" },
        { name: "Search Chats", icon: "/Magnifer.svg", href: "/search-chats" },
        { name: "Data", icon: "/data-management-icon.svg", href: "/data_management/sources" },
        { name: "Docs", icon: "/Question-Square.svg", href: "/docs" },
    ]

    return (
        <div className="h-full w-16 flex flex-col items-center py-4 gap-3">
            {/* Vendo logo on top */}
            <button
                onClick={() => (onNavigate ? onNavigate("/") : router.push("/"))}
                className="h-10 w-10 rounded-md hover:bg-gray-100 flex items-center justify-center"
                aria-label="Vendo Home"
            >
                <Image src="/vendo-logo-mark.png" alt="Vendo" width={24} height={24} className="h-6 w-6" />
            </button>
            {/* Shortcuts */}
            {narrowMenuItems.map((item) => (
                <button
                    key={item.name}
                    onClick={() => (onNavigate ? onNavigate(item.href) : router.push(item.href))}
                    className="h-10 w-10 rounded-md bg-white hover:bg-gray-50 flex items-center justify-center"
                    aria-label={item.name}
                >
                    <Image
                        src={item.icon}
                        alt={item.name}
                        width={item.isAvatar ? 30 : 20}
                        height={item.isAvatar ? 30 : 20}
                        className={item.isAvatar ? "rounded-full" : ""}
                    />
                </button>
            ))}
        </div>
    )
}
export type { NarrowMenuItem } 