"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import { useState, useEffect } from "react"

export default function ChannelGroupingPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)

    // Force narrow layout on this page
    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    const secondaryPanelItems = [
        {
            name: "Data Quality",
            href: "/data_management/quality-control",
        },
        {
            name: "Sources",
            href: "/data_management/sources",
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
            name: "Ad Properties",
            href: "/data_management/properties",
        },
        {
            name: "Grouping",
            href: "/data_management/channel-grouping",
        },
        {
            name: "Context",
            href: "/data_management/context",
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data Management"
                activeItem="Grouping"
            />

            <HeaderFilter showFilters={false} title="Grouping" forceNarrowLayout />

            <div
                className="px-6 pt-24 pb-6 mx-auto"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                <div className="text-gray-600">Channel grouping UI will appear here.</div>
            </div>
        </div>
    )
} 