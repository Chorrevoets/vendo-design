"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import SingleLayerMenu from "@/components/single-layer-menu"
import { useState, useEffect } from "react"
import { Trash2, ChevronDown } from "lucide-react"

export default function ChannelGroupingPage() {
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
            name: "Reporting Settings",
            href: "/data_management/settings",
        },
        {
            name: "Context",
            href: "/data_management/context",
        },
    ]

    const groups: Array<{ name: string; conditions: number }> = [
        { name: "Google Ads", conditions: 2 },
        { name: "Facebook Ads", conditions: 2 },
        { name: "LinkedIn Ads", conditions: 2 },
        { name: "Twitter Ads", conditions: 2 },
        { name: "Microsoft Ads", conditions: 2 },
        { name: "Other Paid Ads", conditions: 1 },
        { name: "Organic Search", conditions: 1 },
        { name: "Organic Social (Facebook)", conditions: 1 },
        { name: "Organic Social (LinkedIn)", conditions: 1 },
        { name: "Organic Social (Twitter)", conditions: 1 },
        { name: "Organic Social (Other)", conditions: 1 },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <SingleLayerMenu forceState="narrow" />
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Channel Grouping"
            />

            <HeaderFilter
                showFilters={false}
                title="Channel Grouping"
                forceNarrowLayout
                actionLabel="Add Channel Grouping"
                secondaryActionLabel="Settings"
                secondaryIconSrc="/settings.svg"
                onSecondaryActionClick={() => { }}
                useActionDialog={false}
                showMenu={false}
                leftOffset={isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)"}
            />

            <div
                className="px-6 pt-24 pb-6 mx-auto"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="space-y-3">
                        {groups.map((g) => (
                            <div key={g.name} className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
                                <div className="text-gray-900 font-medium">{g.name}</div>
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200">
                                        {g.conditions} conditions
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600" aria-label={`Delete ${g.name}`}>
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600" aria-label={`Expand ${g.name}`}>
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 