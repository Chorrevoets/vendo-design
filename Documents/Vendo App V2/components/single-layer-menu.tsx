"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SearchChatsModal } from "@/components/search-chats-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Settings, LogOut, BarChart3, Plus } from "lucide-react"
import React from "react"

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
    const [isOpen, setIsOpen] = useState(initialState === "open")
    const effectiveIsOpen = forceState ? forceState === "open" : isOpen
    const isHidden = forceState ? forceState === "hidden" : initialState === "hidden"
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

    // Update CSS variable so main content can center relative to the menu
    React.useEffect(() => {
        const widthPx = effectiveIsOpen ? 285 : (isHidden ? 100 : 64)
        const contentLeftPx = effectiveIsOpen ? 285 : (isHidden ? 0 : 64)
        const headerLeftPx = effectiveIsOpen ? 285 : (isHidden ? 100 : 64)
        document.documentElement.style.setProperty("--sidebar-width", `${widthPx}px`)
        document.documentElement.style.setProperty("--content-left", `${contentLeftPx}px`)
        document.documentElement.style.setProperty("--header-left", `${headerLeftPx}px`)
    }, [effectiveIsOpen, isHidden])

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
            name: "Docs",
            icon: "/Question-Square.svg",
            href: "/docs",
        },
    ]

    return (
        <>
            {/* Toggle button outside the panel */}
            {(() => {
                const toggleLeftPx = effectiveIsOpen ? 257 : (isHidden ? 52 : 72)
                return (
                    <div className={`fixed top-[22px] z-[10011] group`} style={{ left: `${toggleLeftPx}px` }}>
                        {isHidden && (
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
                        )}
                        <button
                            onClick={() => {
                                if (forceState) {
                                    const next = isHidden ? "open" : "hidden"
                                    onToggleState && onToggleState(next)
                                } else {
                                    setIsOpen((v) => !v)
                                }
                            }}
                            className={`flex items-center p-0 bg-transparent text-black`}
                            aria-label={effectiveIsOpen ? "Close Sidebar" : "Open Sidebar"}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-[18px] w-[18px] transition-transform ${effectiveIsOpen ? "scale-x-[-1]" : ""}`}
                            >
                                <path d="M20 7 4 7" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                <path d="M15 12 4 12" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                <path d="M9 17H4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                            </svg>
                        </button>
                        {!effectiveIsOpen && (
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">Open Sidebar</div>
                        )}
                        {effectiveIsOpen && (
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">Close Sidebar</div>
                        )}
                    </div>
                )
            })()}

            {/* Panel with two states: narrow (64px) and open (320px) */}
            <div
                className={`${effectiveIsOpen ? "w-[285px]" : (isHidden ? "w-[100px]" : "w-16")} fixed left-0 top-0 ${isHidden ? "h-[61px]" : "h-full"} ${(effectiveIsOpen || isHidden) ? "bg-white border-gray-200" : "bg-transparent border-transparent"} border-r ${isHidden ? "border-b" : ""} flex flex-col items-start ${isHidden ? "pt-0 pb-0" : "pt-4 pb-[2px]"} z-[10010]`}
            >
                {effectiveIsOpen && (
                    <div id="shortcut-open-container" className="absolute inset-0 pointer-events-none" />
                )}
                {/* Render identical content in both states; only width changes */}
                {/* Logo row */}
                {!isHidden && (
                    <div className="px-3 w-full">
                        <div className="relative group">
                            <button
                                onClick={() => router.push("/")}
                                className={`relative flex items-center rounded-lg transition-colors mb-2 ${effectiveIsOpen ? "h-10 w-[calc(100%-175px)] pl-0 pr-2 justify-start" : "h-10 w-10 justify-center hover:bg-gray-100"}`}
                                aria-label="Vendo Home"
                            >
                                <span className={`${effectiveIsOpen ? "w-10 flex justify-center relative top-[-4px]" : ""}`}>
                                    <Image src="/vendo-logo-mark.png" alt="Vendo" width={24} height={24} className="block h-6 w-6" />
                                </span>
                                {effectiveIsOpen && (
                                    <span className="text-[20px] font-semibold text-gray-900 ml-[-9px] relative top-[1px]">endo</span>
                                )}
                            </button>
                            {!effectiveIsOpen && (
                                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
                                    Vendo Home
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Menu items */}
                {!isHidden && (
                    <div className="flex-1 w-full space-y-2 mt-1 overflow-y-auto">
                        {narrowMenuItems.map((item) => (
                            item.name === "Petzyo" ? (
                                <div key={item.name} className="relative group">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${effectiveIsOpen ? "h-10 w-[calc(100%-24px)] mx-3 pl-[5px] pr-2 justify-start" : "h-10 w-10 justify-center mx-3"} relative`}
                                                aria-label={item.name}
                                            >
                                                <Image
                                                    src={item.icon}
                                                    alt={item.name}
                                                    width={30}
                                                    height={30}
                                                    className="rounded-full"
                                                />
                                                {effectiveIsOpen && (
                                                    <span className="text-sm font-medium text-gray-900 ml-[8px]">{item.name}</span>
                                                )}
                                                {item.hasNotification && (
                                                    <div className={`pointer-events-none absolute ${effectiveIsOpen ? "top-1.5 left-[17px]" : "top-0 right-0"} w-2 h-2 rounded-full ${item.notificationColor === "green" ? "bg-green-500" : "bg-orange-500"}`} />
                                                )}
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className={`${effectiveIsOpen ? "w-80" : "w-[260px]"}`}>
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
                                    {!effectiveIsOpen && (
                                        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
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
                                        className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${effectiveIsOpen ? "h-10 w-[calc(100%-24px)] mx-3 pl-[10px] pr-2 justify-start" : "h-10 w-10 justify-center mx-3 bg-white"} relative`}
                                        aria-label={item.name}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.name}
                                            width={item.isAvatar ? 30 : 20}
                                            height={item.isAvatar ? 30 : 20}
                                            className={item.isAvatar ? "rounded-full" : ""}
                                        />
                                        {effectiveIsOpen && (
                                            <span className="text-sm font-medium text-gray-900 ml-[8px]">{item.name}</span>
                                        )}
                                        {item.hasNotification && (
                                            <div className={`pointer-events-none absolute ${effectiveIsOpen ? "top-1.5 left-[17px]" : "top-0 right-0"} w-2 h-2 rounded-full ${item.notificationColor === "green" ? "bg-green-500" : "bg-orange-500"}`} />
                                        )}
                                    </button>
                                    {!effectiveIsOpen && (
                                        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
                                            {item.name}
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                        {effectiveIsOpen && (
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
                {!isHidden && (
                    <div className="w-full mt-auto pb-[6px]">
                        <div className="relative group">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${effectiveIsOpen ? "h-10 w-[calc(100%-24px)] mx-3 pl-[5px] pr-2 justify-start" : "h-10 w-10 justify-center mx-3"} relative`}
                                        aria-label="Yalcin Kaya"
                                    >
                                        <div className="h-[30px] w-[30px] rounded-full bg-black text-white flex items-center justify-center text-[12px] font-medium">YK</div>
                                        {effectiveIsOpen && (
                                            <span className="text-sm font-medium text-gray-900 ml-[8px]">Yalcin Kaya</span>
                                        )}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className={`${effectiveIsOpen ? "w-80" : "w-[260px]"}`}>
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
                            {!effectiveIsOpen && (
                                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
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