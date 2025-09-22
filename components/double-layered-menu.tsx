"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type SecondaryPanelItem = {
    name: string
    href: string
}

type DoubleLayeredMenuProps = {
    isMainSidebarOpen: boolean
    secondaryPanelItems: SecondaryPanelItem[]
    panelTitle: string
    activeItem?: string
    panelActions?: React.ReactNode
}

export default function DoubleLayeredMenu({
    isMainSidebarOpen,
    secondaryPanelItems,
    panelTitle,
    activeItem,
    panelActions,
}: DoubleLayeredMenuProps) {
    const pathname = usePathname()
    const [isHidden, setIsHidden] = React.useState(false)

    const panelWidthPx = 220
    const leftOffsetPx = isMainSidebarOpen ? 340 : 64

    const computedActive = React.useMemo(() => {
        if (activeItem) return activeItem
        const current = secondaryPanelItems.find((item) => pathname?.startsWith(item.href))
        return current?.name
    }, [activeItem, pathname, secondaryPanelItems])

    const itemsToShow = React.useMemo(() => {
        if (pathname?.startsWith("/data_management")) {
            return secondaryPanelItems.filter((item) => item.name !== "Quality")
        }
        return secondaryPanelItems
    }, [pathname, secondaryPanelItems])

    return (
        <aside
            className="fixed top-0 h-screen bg-white border-r border-gray-200 z-[10005] flex flex-col"
            style={{ left: leftOffsetPx, width: panelWidthPx, transform: isHidden ? "translateX(100%)" : "translateX(0)", transition: "transform 200ms ease" }}
        >
            <div className="h-[61px] flex items-center justify-between px-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="text-base sm:text-lg font-semibold text-gray-900">{panelTitle}</div>
                </div>
                <div className="flex items-center gap-2">
                    {panelActions ? <div className="flex items-center gap-2">{panelActions}</div> : null}
                    {/* Single close icon on the right */}
                    <button
                        type="button"
                        aria-label="Close"
                        className="p-1 rounded hover:bg-gray-100"
                        onClick={() => setIsHidden(true)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[18px] w-[18px]"
                        >
                            <path d="M20 7 4 7" stroke="#000000" strokeLinecap="round" strokeWidth="2.5"></path>
                            <path d="M15 12 4 12" stroke="#000000" strokeLinecap="round" strokeWidth="2.5"></path>
                            <path d="M9 17H4" stroke="#000000" strokeLinecap="round" strokeWidth="2.5"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {itemsToShow.map((item) => {
                    const isActive = computedActive === item.name
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={
                                `flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ` +
                                (isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900")
                            }
                        >
                            <span>{item.name}</span>
                            {item.name === "Events" && (
                                <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                                    11 Errors
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

