"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import EventCard from "@/components/event-card"
import TopDashboard from "@/components/top-dashboard"
import type { Metric } from "@/types/metric"
import HeaderFilter from "@/components/header-filter"
import { useState, useEffect, useMemo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function EventsPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null)
    const router = useRouter()

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

    const metrics: Metric[] = [
        {
            name: "Check out completion",
            type: "Event",
            firstSeen: "Dec 5, 2024",
            lastSeen: "Sep 5, 2025",
            count: 13838,
            sources: ["Shopify"],
            status: "green",
            description:
                "The `$mp_session_record` event captures the start of a user's session recording, providing a snapshot of the user's environment and initial activity. This event signals the beginning of a recorded user session, enabling analysis of user",
        },
        {
            name: "Winback campaign conversion",
            type: "Funnel",
            firstSeen: "March 5, 2025",
            lastSeen: "Sep 5, 2025",
            count: 160,
            sources: ["Meta", "Google", "Meta"],
            status: "orange",
            description:
                "The `$mp_session_record` event captures the start of a user's session recording, providing a snapshot of the user's environment and initial activity. This event signals the beginning of a recorded user session, enabling analysis of user",
        },
        {
            name: "Check Out Conversion",
            type: "Custom",
            firstSeen: "April 5, 2025",
            lastSeen: "Sep 5, 2025",
            count: 13838,
            sources: ["Shopify"],
            status: "red",
            description:
                "The `$mp_session_record` event captures the start of a user's session recording, providing a snapshot of the user's environment and initial activity. This event signals the beginning of a recorded user session, enabling analysis of user",
        },
        {
            name: "Time to first order",
            type: "Custom",
            firstSeen: "April 5, 2025",
            lastSeen: "Sep 5, 2025",
            count: 13838,
            sources: ["Shopify"],
            status: "inactive",
            description:
                "The `$mp_session_record` event captures the start of a user's session recording, providing a snapshot of the user's environment and initial activity. This event signals the beginning of a recorded user session, enabling analysis of user",
        },
    ]

    const [typeFilter, setTypeFilter] = useState<"all" | "event" | "custom" | "funnel">("all")
    const [sourceFilter, setSourceFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<"all" | "green" | "orange" | "red" | "inactive">("all")

    const sourceOptions = useMemo(() => {
        const set = new Set<string>()
        metrics.forEach(m => m.sources.forEach(s => set.add(s)))
        return Array.from(set).sort()
    }, [metrics])

    const filtered = useMemo(() => {
        return metrics.filter(m => {
            const typeOk =
                typeFilter === "all" ||
                (typeFilter === "event" && m.type === "Event") ||
                (typeFilter === "custom" && m.type === "Custom") ||
                (typeFilter === "funnel" && m.type === "Funnel")

            const sourceOk = sourceFilter === "all" || m.sources.includes(sourceFilter)
            const statusOk = statusFilter === "all" || m.status === statusFilter
            return typeOk && sourceOk && statusOk
        })
    }, [metrics, typeFilter, sourceFilter, statusFilter])

    return (
        <div className="min-h-screen bg-gray-50">
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data Management"
                activeItem="Events"
            />

            <HeaderFilter
                forceNarrowLayout
                typeValue={typeFilter}
                onTypeChange={setTypeFilter}
                sourceValue={sourceFilter}
                onSourceChange={setSourceFilter}
                sourceOptions={sourceOptions}
                statusValue={statusFilter}
                onStatusChange={setStatusFilter}
            />

            <div
                className="px-6 pt-24 pb-6"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 230px)" : "calc(64px + 230px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 230px)" : "calc(100vw - 64px - 230px)"
                }}
            >
                <div className="space-y-6">
                    {/* Info panel: Connect your data sources */}
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">Connect your data sources</h3>
                                    <p className="mt-1 text-sm text-gray-600">Link Google Ads, Meta, Shopify and more to enrich your event insights.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => router.push("/data_management/sources")}
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Go to Sources
                                </button>
                            </div>
                        </div>
                    </div>

                    <TopDashboard />

                    {/* Events List */}
                    <div className="space-y-4">
                        {filtered.map((m, idx) => (
                            <EventCard
                                key={idx}
                                metric={m}
                                onClick={() => {
                                    setSelectedMetric(m)
                                    setIsDialogOpen(true)
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedMetric?.name ?? "Event"}</DialogTitle>
                        <DialogDescription>
                            This is a placeholder modal for event details and actions.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="text-gray-600">
                        More content about "{selectedMetric?.name ?? "Selected Event"}" will go here.
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
} 