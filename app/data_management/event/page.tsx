"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import TopDashboard from "@/components/top-dashboard"
import type { Metric } from "@/types/metric"
import HeaderFilter from "@/components/header-filter"
import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, AlertTriangle, Sparkles } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type SecondaryItem = { name: string; href: string; badgeCount?: number; badgeColor?: "red" | "green" | "orange" | "gray" | "blue"; badgeLabel?: string }

export default function EventsPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null)
    const [showInfoPanel, setShowInfoPanel] = useState(true)
    const [enabledByName, setEnabledByName] = useState<Record<string, boolean>>({})
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [expandedByProp, setExpandedByProp] = useState<Record<string, boolean>>({})
    const [requiredByProp, setRequiredByProp] = useState<Record<string, boolean>>({})

    // Force narrow layout on this page
    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    useEffect(() => {
        const defaults: Record<string, boolean> = {}
        metrics.forEach((m) => { defaults[m.name] = m.status !== "inactive" })
        setEnabledByName(defaults)
    }, [])

    const secondaryPanelItems: SecondaryItem[] = [
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
            badgeCount: 11,
            badgeColor: "red",
            badgeLabel: "11 Errors",
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
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [propertyFilter, setPropertyFilter] = useState<string>("all")
    const [sourceFilter, setSourceFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<"all" | "green" | "orange" | "red" | "inactive">("all")
    // removed sort controls

    const sourceOptions = useMemo(() => {
        const set = new Set<string>()
        metrics.forEach(m => m.sources.forEach(s => set.add(s)))
        return Array.from(set).sort()
    }, [metrics])

    const filtered = useMemo(() => {
        const filteredRows = metrics.filter(m => {
            const typeOk =
                typeFilter === "all" ||
                (typeFilter === "event" && m.type === "Event") ||
                (typeFilter === "custom" && m.type === "Custom") ||
                (typeFilter === "funnel" && m.type === "Funnel")

            const sourceOk = sourceFilter === "all" || m.sources.includes(sourceFilter)
            const nameOk = searchQuery.trim() === "" || m.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
            const statusOk = statusFilter === "all" || m.status === statusFilter
            return typeOk && sourceOk && statusOk && nameOk
        })
        // Order by status priority: Error (red) -> Warning (orange) -> Healthy (green) -> Inactive (inactive)
        const statusWeight: Record<string, number> = { red: 0, orange: 1, green: 2, inactive: 3 }
        return [...filteredRows].sort((a, b) => {
            const wa = statusWeight[a.status] ?? 99
            const wb = statusWeight[b.status] ?? 99
            return wa - wb
        })
    }, [metrics, typeFilter, sourceFilter, statusFilter, searchQuery])

    const eventProperties = useMemo(() => ([
        {
            name: "$browser",
            description:
                "The `$browser` property within the `$mp_session_record` event identifies the web browser used during a recorded user session. This information helps understand user behavior across different browsers (e.g., Chrome, Safari, Firefox). Analyzing browser-specific session recordings can reveal compatibility issues, performance bottlenecks, or UI rendering problems impacting user experience and conversion rates.",
            type: "unknown",
            first: "Jun 14",
            last: "Sep 10",
            sample: "Chrome",
            status: "live",
        },
        {
            name: "$browser_version",
            description:
                "The `$browser_version` property captures the specific version of the user's web browser during a session recording. This is useful for identifying browser-specific issues impacting user experience, segmenting users based on browser versions, and understanding how different browser versions perform during session replays. This helps optimize the application for different browsers.",
            type: "unknown",
            first: "Jun 14",
            last: "Sep 10",
            sample: "125.0.6422.142",
            status: "live",
        },
        {
            name: "$current_url",
            description:
                "The `$current_url` property captures the URL of the page the user is currently viewing during a recorded session. This is useful for understanding the user's navigation path, identifying where users spend the most time, and pinpointing areas of friction or drop-off within a session replay. Analyzing this data helps optimize user flows and improve website usability.",
            type: "unknown",
            first: "Jun 14",
            last: "Sep 10",
            sample: "https://example.com/checkout",
            status: "live",
        },
        {
            name: "$device",
            description:
                "The `$device` property identifies the type of device used during the user's session recording (e.g., mobile, tablet, desktop). This is valuable for understanding how users interact with your product on different devices, enabling you to optimize the user experience for each platform and identify device-specific issues impacting session behavior.",
            type: "unknown",
            first: "Jun 14",
            last: "Sep 10",
            sample: "desktop",
            status: "live",
        },
        {
            name: "$distinct_id_before_identity",
            description:
                "The `$distinct_id_before_identity` property captures the user's unique identifier before they were formally identified (e.g., logged in). This is crucial for stitching together user behavior pre- and post-login, providing a complete view of their journey. Analyzing this allows marketers and analysts to understand anonymous user behavior and attribute it to known users after identification.",
            type: "unknown",
            first: "Jun 15",
            last: "Sep 9",
            sample: "anon_7f2a9",
            status: "live",
        },
        {
            name: "$insert_id",
            description:
                "`$insert_id` is a unique identifier automatically generated by Mixpanel for each `$mp_session_record` event. It ensures that each session recording event is processed only once, preventing duplicates. This is crucial for accurate session analysis and reporting, guaranteeing data integrity when analyzing user behavior and session replay data.",
            type: "unknown",
            first: "Jun 14",
            last: "Sep 10",
            sample: "k5Zc-a1b2c3",
            status: "live",
        },
    ]), [])

    useEffect(() => {
        const defaults: Record<string, boolean> = {}
        eventProperties.forEach(p => {
            defaults[p.name] = true
        })
        setRequiredByProp(defaults)
    }, [eventProperties])

    return (
        <div className="min-h-screen bg-gray-50">
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Events"
            />

            <HeaderFilter
                forceNarrowLayout
                showTypeAsSearch
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                sourceValue={sourceFilter}
                onSourceChange={setSourceFilter}
                sourceOptions={sourceOptions}
                statusValue={statusFilter}
                onStatusChange={setStatusFilter}
                showActionButton={false}
                showMenu={false}
            />

            <div
                className="px-6 pt-24 pb-6"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 230px)" : "calc(64px + 230px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 230px)" : "calc(100vw - 64px - 230px)"
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
                                        {/* Text Content */}
                                        <div className="lg:col-span-2 space-y-6">
                                            <p className="text-gray-600">
                                                Info copy comes here
                                            </p>
                                        </div>

                                        {/* Image Placeholder */}
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
                        <TopDashboard
                            stats={[
                                { name: "Total Events", stat: "71,897", previousStat: "Jun 13, 2025", previousLabel: "Since", change: "12%", changeType: "increase" },
                                { name: "Avg. Open Rate", stat: "58.16%", previousStat: "56.14%", change: "2.02%", changeType: "increase" },
                                { name: "Avg. Click Rate", stat: "24.57%", previousStat: "28.62%", change: "4.05%", changeType: "decrease" },
                            ]}
                        />
                    </div>

                    {/* Events Table - Simple in card */}
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg">
                                        <table className="relative min-w-full divide-y divide-gray-300 table-fixed">
                                            <colgroup>
                                                <col className="w-[30%]" />
                                                <col className="w-[25%]" />
                                                <col className="w-[15%]" />
                                                <col className="w-[15%]" />
                                                <col className="w-[10%]" />
                                                <col className="w-[5%]" />
                                            </colgroup>
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Event</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sources</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Seen</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Enabled</th>
                                                    <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Open</span></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {filtered.map((m, idx) => (
                                                    <tr key={idx} className="cursor-pointer" onClick={() => { setSelectedMetric(m); setDrawerOpen(true) }}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{m.name}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{m.sources.join(", ")}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{m.lastSeen}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                            {m.status === "green" ? (
                                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-200">Healthy</span>
                                                            ) : m.status === "orange" ? (
                                                                <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-200">Warning</span>
                                                            ) : m.status === "red" ? (
                                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-200">Error</span>
                                                            ) : null}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" onClick={(e) => e.stopPropagation()}>
                                                            <Switch
                                                                checked={enabledByName[m.name] ?? true}
                                                                onCheckedChange={(checked) => setEnabledByName((prev) => ({ ...prev, [m.name]: checked }))}
                                                                aria-label={`Toggle ${m.name}`}
                                                                className="!h-5 !w-10 data-[state=checked]:!bg-green-500"
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <button type="button" onClick={(e) => { e.preventDefault(); setSelectedMetric(m); setDrawerOpen(true) }} className="inline-flex items-center text-gray-500 hover:text-gray-700">
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

            {/* Right-side Drawer with backdrop */}
            {drawerOpen && (
                <div className="relative z-[10000001]">
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-[10000000] bg-gray-500/75 cursor-pointer" onClick={() => setDrawerOpen(false)} />

                    <div className="fixed inset-0 z-[10000002] overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <div className="pointer-events-auto relative w-screen max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl transform transition duration-500 ease-in-out translate-x-0">
                                    {/* Outside close button */}
                                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                        <button
                                            type="button"
                                            onClick={() => setDrawerOpen(false)}
                                            className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            <span className="absolute -inset-2.5" />
                                            <span className="sr-only">Close panel</span>
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <div className="relative flex h-full flex-col bg-white shadow-xl">
                                        <div className="sticky top-0 z-10 bg-white px-4 sm:px-6 h-[61px] border-b flex items-center">
                                            <h2 className="text-base font-semibold text-gray-900">{selectedMetric?.name ?? "Event"}</h2>
                                        </div>
                                        <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
                                            <Tabs defaultValue="properties" className="space-y-3">
                                                <TabsList>
                                                    <TabsTrigger value="properties" className="text-lg data-[state=active]:bg-white data-[state=active]:text-black">
                                                        <span className="flex items-center gap-2">
                                                            Event Details
                                                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-200">5 Errors</span>
                                                        </span>
                                                    </TabsTrigger>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <TabsTrigger value="dataQuality" className="text-lg data-[state=active]:bg-white data-[state=active]:text-black">
                                                                    <span className="flex items-center gap-2">
                                                                        Data Quality
                                                                        <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-200">6 Issues</span>
                                                                    </span>
                                                                </TabsTrigger>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-black text-white border-none">
                                                                6 issues detected (Possible volume spike/drop detected, 5 properties with low schema coverage)
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </TabsList>

                                                <TabsContent value="dataQuality">
                                                    <div className="space-y-3">
                                                        <TopDashboard
                                                            stats={[
                                                                { name: "Total Events", stat: "71,897", previousStat: "Jun 13, 2025", previousLabel: "Since", change: "12%", changeType: "increase" },
                                                                { name: "Avg. Open Rate", stat: "58.16%", previousStat: "56.14%", change: "2.02%", changeType: "increase" },
                                                                { name: "Avg. Click Rate", stat: "24.57%", previousStat: "28.62%", change: "4.05%", changeType: "decrease" },
                                                            ]}
                                                        />
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="properties">
                                                    <div className="space-y-3">
                                                        {/* Description card with header */}
                                                        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                                                            <div className="bg-gray-50 px-4 py-3.5 sm:px-6">
                                                                <h3 className="text-sm font-semibold text-gray-900">Event Description</h3>
                                                            </div>
                                                            <div className="px-4 py-5 sm:p-6">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <div className="text-sm font-semibold text-gray-900">{selectedMetric?.name ?? "Event"}</div>
                                                                    <button
                                                                        type="button"
                                                                        className="text-gray-400 hover:text-gray-600"
                                                                        aria-label="Edit event name and description"
                                                                    >
                                                                        <img src="/New-chat.svg" alt="" className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                                <p className="text-sm text-gray-700 leading-6">
                                                                    The $mp_session_record (Mixpanel) event captures data related to user session recordings within Mixpanel. It tracks the start and duration of a user's session, along with details about their environment (browser, device, region) and the recording itself (start URL, environment). This event provides insights into user behavior during a session, enabling analysis of user flows, identifying friction points, and improving the overall user experience through session replay analysis.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div />
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-48">
                                                                    <Select value={propertyFilter} onValueChange={(v) => setPropertyFilter(v)}>
                                                                        <SelectTrigger className="h-9">
                                                                            <SelectValue placeholder="All Properties" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="all">All Properties</SelectItem>
                                                                            <SelectItem value="issues">Has Issues</SelectItem>
                                                                            <SelectItem value="low-coverage">Low Coverage</SelectItem>
                                                                            <SelectItem value="new">New Properties</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <button type="button" className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100">
                                                                    <AlertTriangle className="h-4 w-4" />
                                                                    View Property Anomalies
                                                                </button>
                                                                <button type="button" className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                                                                    <Sparkles className="h-4 w-4" />
                                                                    Generate All
                                                                </button>
                                                                <button type="button" className="inline-flex items-center gap-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800">
                                                                    <Sparkles className="h-4 w-4 text-white" />
                                                                    Generate Missing (0)
                                                                </button>
                                                                {/* Removed Add Property button as requested */}
                                                            </div>
                                                        </div>

                                                        <div className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg">
                                                            <table className="relative min-w-full divide-y divide-gray-300">
                                                                <thead className="bg-gray-50">
                                                                    <tr>
                                                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Event Properties</th>
                                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Seen</th>
                                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sample Values</th>
                                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Required</th>
                                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Coverage</th>
                                                                        <th scope="col" className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                                    {eventProperties.map((p, idx) => (
                                                                        <tr key={p.name}>
                                                                            <td className="align-top py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="font-medium text-gray-900">{p.name}</span>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="text-gray-400 hover:text-gray-600"
                                                                                        aria-label={`Edit ${p.name} name and description`}
                                                                                    >
                                                                                        <img src="/New-chat.svg" alt="" className="h-4 w-4" />
                                                                                    </button>
                                                                                </div>
                                                                                <div className="mt-1 text-gray-600">
                                                                                    {expandedByProp[p.name]
                                                                                        ? p.description
                                                                                        : (p.description.length > 240 ? p.description.slice(0, 240) + "…" : p.description)
                                                                                    }
                                                                                    {p.description.length > 240 && (
                                                                                        <button
                                                                                            type="button"
                                                                                            className="ml-2 text-gray-500 hover:text-gray-700"
                                                                                            onClick={() => setExpandedByProp(prev => ({ ...prev, [p.name]: !prev[p.name] }))}
                                                                                        >
                                                                                            {expandedByProp[p.name] ? "Less" : "More"}
                                                                                        </button>
                                                                                    )}
                                                                                </div>
                                                                            </td>
                                                                            <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                                                                                {p.type === "unknown" ? (idx % 2 === 0 ? "String" : "Integer") : p.type}
                                                                            </td>
                                                                            {
                                                                                /* Coverage column with color coding */
                                                                            }
                                                                            <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.last}</td>
                                                                            <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.sample}</td>
                                                                            <td className="align-top whitespace-nowrap px-3 py-4 text-sm" onClick={(e) => e.stopPropagation()}>
                                                                                <Switch
                                                                                    checked={requiredByProp[p.name] ?? false}
                                                                                    onCheckedChange={(checked) => setRequiredByProp(prev => ({ ...prev, [p.name]: checked }))}
                                                                                    aria-label={`Toggle required for ${p.name}`}
                                                                                    className="!h-5 !w-10 data-[state=checked]:!bg-green-500"
                                                                                />
                                                                            </td>
                                                                            {(() => {
                                                                                const coveragePool = [100, 95, 90, 85, 80, 70, 60, 50]
                                                                                const cov = coveragePool[idx % coveragePool.length]
                                                                                const colorClass = cov >= 90
                                                                                    ? "text-green-700 bg-green-50 ring-green-200"
                                                                                    : cov >= 60
                                                                                        ? "text-orange-700 bg-orange-50 ring-orange-200"
                                                                                        : "text-red-700 bg-red-50 ring-red-200"
                                                                                return (
                                                                                    <td className="align-top whitespace-nowrap px-3 py-4 text-sm">
                                                                                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${colorClass}`}>{cov}%</span>
                                                                                    </td>
                                                                                )
                                                                            })()}
                                                                            <td className="align-top whitespace-nowrap py-4 pl-3 pr-4 text-sm sm:pr-6">
                                                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-200">{p.status}</span>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </TabsContent>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 