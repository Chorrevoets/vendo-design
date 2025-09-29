"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SearchChatsModal } from "@/components/search-chats-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Settings, LogOut, BarChart3, Plus } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface NarrowMenuItem {
    name: string
    icon: string
    href: string
    isAvatar?: boolean
    hasNotification?: boolean
    notificationColor?: "green" | "orange"
}

export default function ShortCutMenu() {
    const router = useRouter()
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen] = useState(false)
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

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
        <div>
            {/* Toggle button outside the panel */} {/* Only show when sidebar is hidden on mobile */}
            {isMobile && (
                <div className={`fixed top-[22px] ${isOpen ? "left-[257px]" : "left-[72px]"} z-[10011] group`}>
                    <button
                        onClick={() => setIsOpen((v) => !v)}
                        className={`flex items-center p-0 bg-transparent text-black`}
                        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-[18px] w-[18px] transition-transform ${isOpen ? "scale-x-[-1]" : ""}`}
                        >
                            <path d="M20 7 4 7" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                            <path d="M15 12 4 12" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                            <path d="M9 17H4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                        </svg>
                    </button>
                    {!isOpen && (
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">Open Sidebar</div>
                    )}
                    {isOpen && (
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">Close Sidebar</div>
                    )}
                </div>
            )}

            {/* Panel with two states: narrow (64px) and open (320px) */}
            <div
                className={`${isOpen ? "w-[285px]" : "w-16"} fixed left-0 top-0 h-full ${isOpen ? "bg-white border-gray-200" : "bg-transparent border-transparent"} border-r flex flex-col items-start pt-4 pb-[2px] z-[10010]`}
            >
                {isOpen && (
                    <div id="shortcut-open-container" className="absolute inset-0 pointer-events-none" />
                )}
                {/* Render identical content in both states; only width changes */}
                {/* Logo row */}
                <div className="px-3 w-full">
                    <div className="relative group">
                        <button
                            onClick={() => router.push("/")}
                            className={`relative flex items-center rounded-lg transition-all mb-2 ${isOpen ? "h-10 w-[calc(100%-175px)] pl-0 pr-2 justify-start" : "h-10 w-10 justify-center group"} ${!isOpen ? "cursor-e-resize" : ""}`}
                            aria-label="Vendo Home"
                        >
                            {/* Vendo logo - hidden on hover in narrow state */}
                            <span className={`${isOpen ? "w-10 flex justify-center relative top-[-4px] ml-[-3px]" : "relative top-[-4px] group-hover:opacity-0 transition-opacity duration-200"}`}>
                                <Image src="/vendo-logo-mark.png" alt="Vendo" width={24} height={24} className="h-6 w-6" />
                            </span>
                            {/* Menu icon - shown on hover in narrow state */}
                            {!isOpen && (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-[20px] w-[20px] absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <path d="M20 7 4 7" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                    <path d="M15 12 4 12" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                    <path d="M9 17H4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                                </svg>
                            )}
                        </button>
                        {!isOpen && (
                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
                                Open Sidebar
                            </div>
                        )}
                        {isOpen && (
                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[999999] shadow-lg" style={{ transform: 'translateX(-220px) translateY(-50%)' }}>
                                Vendo Home
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu items */}
                <div className="flex-1 w-full space-y-2 mt-1 overflow-y-auto">
                    {(isOpen ? narrowMenuItems : narrowMenuItems.filter((i) => i.name !== "Docs")).map((item) => (
                        item.name === "Petzyo" ? (
                            <div key={item.name} className="relative group">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${isOpen ? "h-10 w-[calc(100%-24px)] mx-3 pl-[5px] pr-2 justify-start" : "h-10 w-10 justify-center mx-3"} relative`}
                                            aria-label={item.name}
                                        >
                                            <Image
                                                src={item.icon}
                                                alt={item.name}
                                                width={30}
                                                height={30}
                                                className="rounded-full"
                                            />
                                            {isOpen && (
                                                <span className="text-sm font-medium text-gray-900 ml-[8px]">{item.name}</span>
                                            )}
                                            {item.hasNotification && (
                                                <div className={`pointer-events-none absolute ${isOpen ? "top-1.5 left-[17px]" : "top-0 right-0"} w-2 h-2 rounded-full ${item.notificationColor === "green" ? "bg-green-500" : "bg-orange-500"}`} />
                                            )}
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className={`${isOpen ? "w-80" : "w-[260px]"}`}>
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
                                {!isOpen && (
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
                                    className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${isOpen ? "h-10 w-[calc(100%-24px)] mx-3 pl-[10px] pr-2 justify-start" : "h-10 w-10 justify-center mx-3 bg-white"} relative`}
                                    aria-label={item.name}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.name}
                                        width={item.isAvatar ? 30 : 20}
                                        height={item.isAvatar ? 30 : 20}
                                        className={item.isAvatar ? "rounded-full" : ""}
                                    />
                                    {isOpen && (
                                        <span className="text-sm font-medium text-gray-900 ml-[8px]">{item.name}</span>
                                    )}
                                    {item.hasNotification && (
                                        <div className={`pointer-events-none absolute ${isOpen ? "top-1.5 left-[17px]" : "top-0 right-0"} w-2 h-2 rounded-full ${item.notificationColor === "green" ? "bg-green-500" : "bg-orange-500"}`} />
                                    )}
                                </button>
                                {!isOpen && (
                                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
                                        {item.name}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                    {isOpen && (
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

                {/* Bottom Petzyo copy */}
                <div className="w-full mt-auto pb-[6px]">
                    <div className="relative group">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className={`flex items-center rounded-lg hover:bg-gray-100 transition-colors ${isOpen ? "h-10 w-[calc(100%-24px)] mx-3 pl-[5px] pr-2 justify-start" : "h-10 w-10 justify-center mx-3"} relative`}
                                    aria-label="Yalcin Kaya"
                                >
                                    <div className="h-[30px] w-[30px] rounded-full bg-black text-white flex items-center justify-center text-[12px] font-medium">YK</div>
                                    {isOpen && (
                                        <span className="text-sm font-medium text-gray-900 ml-[8px]">Yalcin Kaya</span>
                                    )}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className={`${isOpen ? "w-80" : "w-[260px]"}`}>
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
                        {!isOpen && (
                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999]">
                                Yalcin Kaya
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Chats Modal */}
                <SearchChatsModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
            </div>
        </div>
    )
} 