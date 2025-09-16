"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import type { Metric } from "@/types/metric"
import HeaderFilter from "@/components/header-filter"
import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

export default function MetricsPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [showInfoPanel, setShowInfoPanel] = useState(true)

    // Force narrow layout on this page
    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    const secondaryPanelItems = [
        {
            name: "Quality",
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
            name: "Channel Grouping",
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
                panelTitle="Data"
                activeItem="Metrics"
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
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                <div className="space-y-6">
                    {showInfoPanel && (
                        <div className="px-4 sm:px-6 lg:px-8">
                            <Card className="bg-white relative">
                                <button
                                    onClick={() => setShowInfoPanel(false)}
                                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-900">Info copy comes here</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 space-y-6">
                                            <p className="text-gray-600">
                                                Info copy comes here
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-gray-100 rounded-lg p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                                                <img src="/Vendo Data Monkey.png" alt="Vendo Data Monkey" className="w-full h-auto rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg">
                                        <table className="relative min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Metric</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sources</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Seen</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                                    <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Open</span></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {filtered.map((m, idx) => (
                                                    <tr key={idx}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{m.name}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{m.sources.join(", ")}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{m.lastSeen}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                            {m.status === "green" ? (
                                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-200">GREEN</span>
                                                            ) : m.status === "orange" ? (
                                                                <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-200">ORANGE</span>
                                                            ) : m.status === "red" ? (
                                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-200">RED</span>
                                                            ) : (
                                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-200">INACTIVE</span>
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <button type="button" className="inline-flex items-center text-gray-500 hover:text-gray-700">
                                                                <img src="/New-chat.svg" alt="" className="h-4 w-4" />
                                                                <span className="sr-only">Open {m.name}</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 