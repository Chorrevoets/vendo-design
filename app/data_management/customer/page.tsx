"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import SingleLayerMenu from "@/components/single-layer-menu"
import { useEffect, useState } from "react"

export default function CustomerPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)

    // Force narrow layout on this page
    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

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
            name: "Attribution Settings",
            href: "/data_management/settings",
        },
        {
            name: "Context",
            href: "/data_management/context",
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <SingleLayerMenu forceState="narrow" />
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Customer Properties"
            />

            <HeaderFilter showFilters={false} title="Customer Properties" forceNarrowLayout leftOffset={isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)"} />

            <div
                className="px-6 pt-24 pb-6 mx-auto"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                <div className="text-gray-600">Customer properties UI will appear here.</div>
            </div>
        </div>
    )
} 