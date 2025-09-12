"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import EventCard from "@/components/event-card"
import type { Metric } from "@/types/metric"
import HeaderFilter from "@/components/header-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useMemo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function EventsPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null)

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
                    {/* Placeholder Dashboards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[0, 1, 2].map(i => (
                            <Card key={i} className="bg-white">
                                <CardHeader>
                                    <CardTitle className="text-base font-semibold text-gray-900">Placeholder Dashboard</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-gray-600 text-sm">
                                        This is a placeholder for a small dashboard widget.
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

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