"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import { useEffect, useState } from "react"

export default function PropertiesPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)

    // Force narrow layout on this page
    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    const secondaryPanelItems = [
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
            name: "Properties",
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
        {
            name: "Quality Control",
            href: "/data_management/quality-control",
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data Management"
                activeItem="Properties"
            />

            <HeaderFilter showFilters={false} actionLabel="Add Property" forceNarrowLayout title="Properties" />

            <div
                className="px-6 pt-24 pb-6"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                <div className="text-gray-600">Property management UI goes here.</div>
            </div>
        </div>
    )
} 