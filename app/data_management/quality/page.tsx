"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import SingleLayerMenu from "@/components/single-layer-menu"
import { useState, useEffect } from "react"

export default function QualityControlPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)

    // Force narrow layout and keep CSS variables in sync via SingleLayerMenu
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
            name: "Context",
            href: "/data_management/context",
        },
        {
            name: "Settings",
            href: "/data_management/settings",
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Always show the narrow sidebar for consistent layout on this page */}
            <SingleLayerMenu forceState="narrow" />
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Quality"
            />

            <HeaderFilter showFilters={false} title="Quality" forceNarrowLayout showActionButton={false} showMenu={false} leftOffset={isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)"} />

            <div
                className="px-6 pt-24 pb-6 mx-auto"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                <div className="text-gray-600">
                    Here comes an dashboard with onboarding guidance and data quality insights
                </div>
            </div>
        </div>
    )
} 