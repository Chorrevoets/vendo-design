"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import TopDashboard from "@/components/top-dashboard"
import type { Metric } from "@/types/metric"
import HeaderFilter from "@/components/header-filter"
import { useState, useEffect, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { X, AlertTriangle, Sparkles, CheckCircle, ArrowUp, ArrowDown } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type SecondaryItem = { name: string; href: string; badgeCount?: number; badgeColor?: "red" | "green" | "orange" | "gray" | "blue"; badgeLabel?: string }

export default function EventsPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null)
    const [enabledByName, setEnabledByName] = useState<Record<string, boolean>>({})
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [expandedByProp, setExpandedByProp] = useState<Record<string, boolean>>({})
    const [requiredByProp, setRequiredByProp] = useState<Record<string, boolean>>({})
    const [sourceFilterOpen, setSourceFilterOpen] = useState(false)
    const [selectedSourcesDraft, setSelectedSourcesDraft] = useState<Set<string>>(new Set())
    const [appliedSources, setAppliedSources] = useState<string[]>([])
    const [eventSearchOpen, setEventSearchOpen] = useState(false)
    const [eventSearchDraft, setEventSearchDraft] = useState("")
    const [lastSeenFilterOpen, setLastSeenFilterOpen] = useState(false)
    const [lastSeenSort, setLastSeenSort] = useState<"asc" | "desc" | null>(null)
    const [statusColFilterOpen, setStatusColFilterOpen] = useState(false)
    const [selectedStatusesDraft, setSelectedStatusesDraft] = useState<Set<"Error" | "Warning" | "Healthy">>(new Set())
    const [appliedStatuses, setAppliedStatuses] = useState<Array<"Error" | "Warning" | "Healthy">>([])
    const [enabledFilterOpen, setEnabledFilterOpen] = useState(false)
    const [selectedEnabledDraft, setSelectedEnabledDraft] = useState<Set<"Enabled" | "Disabled">>(new Set())
    const [appliedEnabled, setAppliedEnabled] = useState<Array<"Enabled" | "Disabled">>([])
    const [showTrendsCard, setShowTrendsCard] = useState(false)
    const trendsCardRef = useRef<HTMLDivElement | null>(null)
    const propertiesTableRef = useRef<HTMLDivElement | null>(null)
    const [statusTheme, setStatusTheme] = useState<"green" | "orange" | "red">("green")
    const statusThemeClasses = useMemo(() => {
        switch (statusTheme) {
            case "orange":
                return {
                    title: "text-yellow-700",
                    value: "text-yellow-700",
                    sub: "text-yellow-600",
                    icon: "text-yellow-400",
                }
            case "red":
                return {
                    title: "text-red-700",
                    value: "text-red-700",
                    sub: "text-red-600",
                    icon: "text-red-400",
                }
            default:
                return {
                    title: "text-green-700",
                    value: "text-green-700",
                    sub: "text-green-600",
                    icon: "text-emerald-400",
                }
        }
    }, [statusTheme])

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
            sources: ["Meta"],
            status: "orange",
            description:
                "The `$mp_session_record` event captures the start of a user's session recording, providing a snapshot of the user's environment and initial activity. This event signals the beginning of a recorded user session, enabling analysis of user",
        },
        {
            name: "Cart page views",
            type: "Event",
            firstSeen: "May 2, 2025",
            lastSeen: "Sep 7, 2025",
            count: 4231,
            sources: ["Google"],
            status: "green",
            description:
                "Fires when a user views the cart page.",
        },
        {
            name: "Product detail engagement",
            type: "Custom",
            firstSeen: "Jun 11, 2025",
            lastSeen: "Sep 12, 2025",
            count: 987,
            sources: ["Meta"],
            status: "orange",
            description:
                "Measures engagement on product detail pages.",
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

            const headerSourceOk = sourceFilter === "all" || m.sources.includes(sourceFilter)
            const sourcesAppliedOk = appliedSources.length === 0 || appliedSources.some(s => m.sources.includes(s))
            const sourceOk = headerSourceOk && sourcesAppliedOk
            const nameOk = searchQuery.trim() === "" || m.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
            const statusOk = statusFilter === "all" || m.status === statusFilter

            // Column Status filter (Error/Warning/Healthy)
            const statusMap: Record<"Error" | "Warning" | "Healthy", string> = { Error: "red", Warning: "orange", Healthy: "green" }
            const statusColOk =
                appliedStatuses.length === 0 || appliedStatuses.some(label => m.status === statusMap[label])

            // Column Enabled filter
            const allowedEnabledFlags = new Set(appliedEnabled.map(v => v === "Enabled"))
            const enabledFlag = (enabledByName[m.name] ?? true)
            const enabledOk = allowedEnabledFlags.size === 0 || allowedEnabledFlags.has(enabledFlag)

            return typeOk && sourceOk && statusOk && statusColOk && enabledOk && nameOk
        })
        // Sorting
        if (lastSeenSort) {
            return [...filteredRows].sort((a, b) => {
                const ta = new Date(a.lastSeen).getTime()
                const tb = new Date(b.lastSeen).getTime()
                return lastSeenSort === "asc" ? ta - tb : tb - ta
            })
        }
        // Default: Order by status priority: Error (red) -> Warning (orange) -> Healthy (green) -> Inactive (inactive)
        const statusWeight: Record<string, number> = { red: 0, orange: 1, green: 2, inactive: 3 }
        return [...filteredRows].sort((a, b) => {
            const wa = statusWeight[a.status] ?? 99
            const wb = statusWeight[b.status] ?? 99
            return wa - wb
        })
    }, [metrics, typeFilter, sourceFilter, statusFilter, searchQuery, appliedSources, appliedStatuses, appliedEnabled, lastSeenSort, enabledByName])

    // Active filters/search indicators
    const hasActiveSearch = searchQuery.trim() !== ""
    const hasAppliedSources = appliedSources.length > 0
    const hasAppliedStatuses = appliedStatuses.length > 0
    const hasAppliedEnabled = appliedEnabled.length > 0
    const hasTypeFilter = typeFilter !== "all"
    const hasAnyActiveFilters = hasActiveSearch || hasAppliedSources || hasAppliedStatuses || hasAppliedEnabled || hasTypeFilter

    const clearAllFilters = () => {
        setSearchQuery("")
        setAppliedSources([])
        setAppliedStatuses([])
        setAppliedEnabled([])
        setTypeFilter("all")
    }

    // Removed global clear-all action per request

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

    // Drawer properties filtering helpers
    const availablePropTypes = useMemo(() => {
        const set = new Set<string>()
        eventProperties.forEach((p, i) => {
            const displayType = p.type === "unknown" ? (i % 2 === 0 ? "String" : "Integer") : p.type
            set.add(displayType)
        })
        return Array.from(set)
    }, [eventProperties])

    // Drawer: Properties table filters/search state
    const [propSearchOpen, setPropSearchOpen] = useState(false)
    const [propSearchDraft, setPropSearchDraft] = useState("")
    const [propSearchQuery, setPropSearchQuery] = useState("")

    const [propTypeFilterOpen, setPropTypeFilterOpen] = useState(false)
    const [selectedPropTypesDraft, setSelectedPropTypesDraft] = useState<Set<string>>(new Set())
    const [appliedPropTypes, setAppliedPropTypes] = useState<string[]>([])

    const [propLastSeenSort, setPropLastSeenSort] = useState<"asc" | "desc" | null>(null)
    const [propCoverageSort, setPropCoverageSort] = useState<"asc" | "desc" | null>(null)

    const [propRequiredFilterOpen, setPropRequiredFilterOpen] = useState(false)
    const [selectedRequiredDraft, setSelectedRequiredDraft] = useState<Set<"Required" | "Optional">>(new Set())
    const [appliedRequired, setAppliedRequired] = useState<Array<"Required" | "Optional">>([])

    // Drawer: Additional controls
    const [propSampleSearchOpen, setPropSampleSearchOpen] = useState(false)
    const [propStatusFilterOpen, setPropStatusFilterOpen] = useState(false)
    const [propSelectedStatusesDraft, setPropSelectedStatusesDraft] = useState<Set<string>>(new Set())
    const [propAppliedStatuses, setPropAppliedStatuses] = useState<string[]>([])

    const filteredProps = useMemo(() => {
        // Start with original list paired with index for deterministic type calc
        let rows = eventProperties.map((p, i) => ({ p, i }))

        // Search by property name
        if (propSearchQuery.trim() !== "") {
            const q = propSearchQuery.trim().toLowerCase()
            rows = rows.filter(({ p }) => p.name.toLowerCase().includes(q))
        }

        // Type filter
        if (appliedPropTypes.length > 0) {
            const need = new Set(appliedPropTypes)
            rows = rows.filter(({ p, i }) => {
                const displayType = p.type === "unknown" ? (i % 2 === 0 ? "String" : "Integer") : p.type
                return need.has(displayType)
            })
        }

        // Required filter
        if (appliedRequired.length > 0) {
            const allowed = new Set(appliedRequired.map(v => v === "Required"))
            rows = rows.filter(({ p }) => allowed.has(requiredByProp[p.name] ?? false))
        }

        // Status filter
        if (propAppliedStatuses.length > 0) {
            const allowedStatuses = new Set(propAppliedStatuses)
            rows = rows.filter(({ p }) => allowedStatuses.has(p.status))
        }

        // Sort by last seen
        if (propCoverageSort) {
            const coveragePool = [100, 95, 90, 85, 80, 70, 60, 50]
            rows = [...rows].sort((a, b) => {
                const ca = coveragePool[a.i % coveragePool.length]
                const cb = coveragePool[b.i % coveragePool.length]
                return propCoverageSort === "asc" ? ca - cb : cb - ca
            })
        } else if (propLastSeenSort) {
            rows = [...rows].sort((a, b) => {
                const ya = new Date(`${a.p.last}, 2025`).getTime()
                const yb = new Date(`${b.p.last}, 2025`).getTime()
                return propLastSeenSort === "asc" ? ya - yb : yb - ya
            })
        }

        return rows
    }, [eventProperties, propSearchQuery, appliedPropTypes, appliedRequired, propAppliedStatuses, propLastSeenSort, propCoverageSort, requiredByProp])

    // Sync draft selections with applied sources when opening the popover
    useEffect(() => {
        if (sourceFilterOpen) {
            setSelectedSourcesDraft(new Set(appliedSources))
        }
    }, [sourceFilterOpen, appliedSources])

    useEffect(() => {
        if (eventSearchOpen) {
            setEventSearchDraft(searchQuery)
        }
    }, [eventSearchOpen, searchQuery])

    // Sync drafts for Status/Enabled when opening their popovers
    useEffect(() => {
        if (statusColFilterOpen) {
            setSelectedStatusesDraft(new Set(appliedStatuses))
        }
    }, [statusColFilterOpen, appliedStatuses])

    useEffect(() => {
        if (enabledFilterOpen) {
            setSelectedEnabledDraft(new Set(appliedEnabled))
        }
    }, [enabledFilterOpen, appliedEnabled])

    // Sync drafts when popovers open
    useEffect(() => {
        if (propSearchOpen) setPropSearchDraft(propSearchQuery)
    }, [propSearchOpen, propSearchQuery])
    useEffect(() => {
        if (propSampleSearchOpen) setPropSearchDraft(propSearchQuery)
    }, [propSampleSearchOpen, propSearchQuery])
    useEffect(() => {
        if (propTypeFilterOpen) setSelectedPropTypesDraft(new Set(appliedPropTypes))
    }, [propTypeFilterOpen, appliedPropTypes])
    useEffect(() => {
        if (propRequiredFilterOpen) setSelectedRequiredDraft(new Set(appliedRequired))
    }, [propRequiredFilterOpen, appliedRequired])
    useEffect(() => {
        if (propStatusFilterOpen) setPropSelectedStatusesDraft(new Set(propAppliedStatuses))
    }, [propStatusFilterOpen, propAppliedStatuses])

    const propsHasActiveSearch = propSearchQuery.trim() !== ""
    const propsHasTypes = appliedPropTypes.length > 0
    const propsHasRequired = appliedRequired.length > 0
    const propsHasAnyActive = propsHasActiveSearch || propsHasTypes || propsHasRequired || propLastSeenSort !== null || propCoverageSort !== null || propAppliedStatuses.length > 0

    const clearAllPropFilters = () => {
        setPropSearchQuery("")
        setAppliedPropTypes([])
        setAppliedRequired([])
        setPropLastSeenSort(null)
        setPropCoverageSort(null)
        setPropAppliedStatuses([])
    }

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
                showFilters={false}
                showActionButton={false}
                showMenu={false}
                title="Events"
            />

            <div
                className="px-6 pt-24 pb-6"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 230px)" : "calc(64px + 230px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 230px)" : "calc(100vw - 64px - 230px)"
                }}
            >
                <div className="space-y-6">
                    {/* Removed placeholder info panel */}

                    <div className="px-4 sm:px-6 lg:px-8">
                        <div>
                            <dl className="mt-0 grid grid-cols-1 divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-x md:divide-y-0">
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-base font-normal text-gray-900">Last Synced Volume</dt>
                                    <dd className="mt-1">
                                        <div className="flex items-baseline gap-2">
                                            <div className="text-2xl font-semibold text-gray-900">434</div>
                                            <span className="text-sm font-medium text-gray-500">Sep 16, 2025</span>
                                        </div>
                                    </dd>
                                </div>
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-base font-normal text-gray-900">Total Events</dt>
                                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                        <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                                            0
                                            <span className="ml-2 text-sm font-medium text-gray-500">Since Sep 16, 2025</span>
                                        </div>
                                    </dd>
                                </div>
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-base font-normal text-gray-900">Last 30 Days</dt>
                                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                        <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                                            0
                                            <span className="ml-2 text-sm font-medium text-gray-500">Recent activity</span>
                                        </div>
                                    </dd>
                                </div>
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className="text-base font-normal text-gray-900">Active Events</dt>
                                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                        <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                                            0
                                            <span className="ml-2 text-sm font-medium text-gray-500">Event types currently tracking</span>
                                        </div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
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
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        <Popover open={eventSearchOpen} onOpenChange={setEventSearchOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                    <span>Event</span>
                                                                    <img src={searchQuery.trim() !== "" ? "/Sort.svg" : "/Magnifer.svg"} alt="Search" className="h-4 w-4" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="start" className="w-72 p-3">
                                                                <div className="space-y-2">
                                                                    <div className="relative">
                                                                        <img src="/Magnifer.svg" alt="" className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                                                                        <Input
                                                                            value={eventSearchDraft}
                                                                            onChange={(e) => setEventSearchDraft(e.target.value)}
                                                                            placeholder="Search events..."
                                                                            className="h-9 pl-8"
                                                                        />
                                                                    </div>
                                                                    <div className="pt-1 flex items-center gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            className="h-9 flex-1"
                                                                            onClick={() => { setSearchQuery(""); setEventSearchDraft(""); setEventSearchOpen(false) }}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                        <Button
                                                                            className="h-9 flex-1"
                                                                            onClick={() => { setSearchQuery(eventSearchDraft); setEventSearchOpen(false) }}
                                                                        >
                                                                            Search
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        <Popover open={sourceFilterOpen} onOpenChange={setSourceFilterOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                    <span>Source</span>
                                                                    <img src={appliedSources.length > 0 ? "/Sort.svg" : "/List.svg"} alt="" className="h-4 w-4" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="start" className="w-64 p-3">
                                                                <div className="space-y-2">
                                                                    {[
                                                                        "Shopify",
                                                                        "Meta",
                                                                        "TicTok",
                                                                        "Google Ads",
                                                                        "Mix Panel",
                                                                    ].map((label) => {
                                                                        const checked = selectedSourcesDraft.has(label)
                                                                        return (
                                                                            <label key={label} className="flex items-center gap-2 text-sm text-gray-900">
                                                                                <Checkbox
                                                                                    checked={checked}
                                                                                    onCheckedChange={(v) => {
                                                                                        setSelectedSourcesDraft(prev => {
                                                                                            const next = new Set(prev)
                                                                                            if (v) next.add(label); else next.delete(label)
                                                                                            return next
                                                                                        })
                                                                                    }}
                                                                                />
                                                                                <span>{label}</span>
                                                                            </label>
                                                                        )
                                                                    })}
                                                                    <div className="pt-2 flex items-center gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            className="h-9 flex-1"
                                                                            onClick={() => {
                                                                                setAppliedSources([])
                                                                                setSelectedSourcesDraft(new Set())
                                                                                setSourceFilterOpen(false)
                                                                            }}
                                                                        >
                                                                            Clear filters
                                                                        </Button>
                                                                        <Button
                                                                            className="h-9 flex-1"
                                                                            onClick={() => {
                                                                                setAppliedSources(Array.from(selectedSourcesDraft))
                                                                                setSourceFilterOpen(false)
                                                                            }}
                                                                        >
                                                                            Filter
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        <Popover open={lastSeenFilterOpen} onOpenChange={setLastSeenFilterOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700 whitespace-nowrap">
                                                                    <span>Last Seen</span>
                                                                    {lastSeenSort === "asc" ? (
                                                                        <ArrowUp className="h-4 w-4" />
                                                                    ) : lastSeenSort === "desc" ? (
                                                                        <ArrowDown className="h-4 w-4" />
                                                                    ) : (
                                                                        <img src="/List.svg" alt="" className="h-4 w-4" />
                                                                    )}
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="start" className="w-56 p-2">
                                                                <div className="space-y-1">
                                                                    <button
                                                                        type="button"
                                                                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 text-sm text-left"
                                                                        onClick={() => { setLastSeenSort("asc"); setLastSeenFilterOpen(false) }}
                                                                    >
                                                                        <ArrowUp className="h-4 w-4" />
                                                                        Sort Ascending
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 text-sm text-left"
                                                                        onClick={() => { setLastSeenSort("desc"); setLastSeenFilterOpen(false) }}
                                                                    >
                                                                        <ArrowDown className="h-4 w-4" />
                                                                        Sort Descending
                                                                    </button>
                                                                    {lastSeenSort && (
                                                                        <div className="pt-2">
                                                                            <Button
                                                                                variant="outline"
                                                                                className="h-9 w-full"
                                                                                onClick={() => { setLastSeenSort(null); setLastSeenFilterOpen(false) }}
                                                                            >
                                                                                Clear
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        <Popover open={statusColFilterOpen} onOpenChange={setStatusColFilterOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                    <span>Status</span>
                                                                    <img src={appliedStatuses.length > 0 ? "/Sort.svg" : "/List.svg"} alt="" className="h-4 w-4" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="start" className="w-64 p-3">
                                                                <div className="space-y-2">
                                                                    {(["Error", "Warning", "Healthy"] as const).map((label) => {
                                                                        const checked = selectedStatusesDraft.has(label)
                                                                        return (
                                                                            <label key={label} className="flex items-center gap-2 text-sm text-gray-900">
                                                                                <Checkbox
                                                                                    checked={checked}
                                                                                    onCheckedChange={(v) => {
                                                                                        setSelectedStatusesDraft(prev => {
                                                                                            const next = new Set(prev)
                                                                                            if (v) next.add(label); else next.delete(label)
                                                                                            return next
                                                                                        })
                                                                                    }}
                                                                                />
                                                                                <span>{label}</span>
                                                                            </label>
                                                                        )
                                                                    })}
                                                                    <div className="pt-2 flex items-center gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            className="h-9 flex-1"
                                                                            onClick={() => {
                                                                                setAppliedStatuses([])
                                                                                setSelectedStatusesDraft(new Set())
                                                                                setStatusColFilterOpen(false)
                                                                            }}
                                                                        >
                                                                            Clear filters
                                                                        </Button>
                                                                        <Button
                                                                            className="h-9 flex-1"
                                                                            onClick={() => {
                                                                                setAppliedStatuses(Array.from(selectedStatusesDraft))
                                                                                setStatusColFilterOpen(false)
                                                                            }}
                                                                        >
                                                                            Filter
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        <Popover open={enabledFilterOpen} onOpenChange={setEnabledFilterOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                    <span>Enabled</span>
                                                                    <img src={appliedEnabled.length > 0 ? "/Sort.svg" : "/List.svg"} alt="" className="h-4 w-4" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="start" className="w-64 p-3">
                                                                <div className="space-y-2">
                                                                    {(["Enabled", "Disabled"] as const).map((label) => {
                                                                        const checked = selectedEnabledDraft.has(label)
                                                                        return (
                                                                            <label key={label} className="flex items-center gap-2 text-sm text-gray-900">
                                                                                <Checkbox
                                                                                    checked={checked}
                                                                                    onCheckedChange={(v) => {
                                                                                        setSelectedEnabledDraft(prev => {
                                                                                            const next = new Set(prev)
                                                                                            if (v) next.add(label); else next.delete(label)
                                                                                            return next
                                                                                        })
                                                                                    }}
                                                                                />
                                                                                <span>{label}</span>
                                                                            </label>
                                                                        )
                                                                    })}
                                                                    <div className="pt-2 flex items-center gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            className="h-9 flex-1"
                                                                            onClick={() => {
                                                                                setAppliedEnabled([])
                                                                                setSelectedEnabledDraft(new Set())
                                                                                setEnabledFilterOpen(false)
                                                                            }}
                                                                        >
                                                                            Clear filters
                                                                        </Button>
                                                                        <Button
                                                                            className="h-9 flex-1"
                                                                            onClick={() => {
                                                                                setAppliedEnabled(Array.from(selectedEnabledDraft))
                                                                                setEnabledFilterOpen(false)
                                                                            }}
                                                                        >
                                                                            Filter
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Open</span></th>
                                                </tr>
                                                {hasAnyActiveFilters && (
                                                    <tr>
                                                        <th colSpan={6} className="px-4 pt-0 pb-3 sm:px-6">
                                                            <div className="flex flex-wrap items-center gap-1">
                                                                {hasTypeFilter && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setTypeFilter("all")}
                                                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
                                                                    >
                                                                        <span>Type: {typeFilter === "event" ? "Event" : typeFilter === "custom" ? "Custom" : "Funnel"}</span>
                                                                        <X className="h-3 w-3" />
                                                                    </button>
                                                                )}
                                                                {hasActiveSearch && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setSearchQuery("")}
                                                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
                                                                    >
                                                                        <span>Search: {searchQuery}</span>
                                                                        <X className="h-3 w-3" />
                                                                    </button>
                                                                )}
                                                                {appliedSources.map((s) => (
                                                                    <button
                                                                        key={`source-${s}`}
                                                                        type="button"
                                                                        onClick={() => setAppliedSources(prev => prev.filter(v => v !== s))}
                                                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
                                                                    >
                                                                        <span>Source: {s}</span>
                                                                        <X className="h-3 w-3" />
                                                                    </button>
                                                                ))}
                                                                {appliedStatuses.map((s) => (
                                                                    <button
                                                                        key={`status-${s}`}
                                                                        type="button"
                                                                        onClick={() => setAppliedStatuses(prev => prev.filter(v => v !== s))}
                                                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
                                                                    >
                                                                        <span>Status: {s}</span>
                                                                        <X className="h-3 w-3" />
                                                                    </button>
                                                                ))}
                                                                {appliedEnabled.map((e) => (
                                                                    <button
                                                                        key={`enabled-${e}`}
                                                                        type="button"
                                                                        onClick={() => setAppliedEnabled(prev => prev.filter(v => v !== e))}
                                                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
                                                                    >
                                                                        <span>{e}</span>
                                                                        <X className="h-3 w-3" />
                                                                    </button>
                                                                ))}
                                                                <div className="ml-auto">
                                                                    <button
                                                                        type="button"
                                                                        onClick={clearAllFilters}
                                                                        className="text-xs font-normal text-gray-500 hover:text-gray-700 hover:underline underline-offset-2"
                                                                    >
                                                                        Clear all
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                )}
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
                            {/* Overlay controls to the left */}
                            <div className="fixed left-2 top-2 z-[10000005] flex flex-col gap-2">
                                <button className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-black shadow-sm hover:bg-gray-50" onClick={() => setStatusTheme("green")}>Green</button>
                                <button className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-black shadow-sm hover:bg-gray-50" onClick={() => setStatusTheme("orange")}>Orange</button>
                                <button className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-black shadow-sm hover:bg-gray-50" onClick={() => setStatusTheme("red")}>Red</button>
                            </div>

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
                                            <h2 className="text-lg font-semibold text-gray-900">{selectedMetric?.name ?? "Event"}</h2>
                                        </div>
                                        <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
                                            {(statusTheme === "red" || statusTheme === "orange") && (
                                                <div className={`border-l-4 p-4 ${statusTheme === "orange" ? "border-yellow-400 bg-yellow-50" : "border-red-400 bg-red-50"}`}>
                                                    <div className="flex items-center">
                                                        <div className="shrink-0">
                                                            <img src={statusTheme === "orange" ? "/Orange.svg" : "/Red.svg"} alt="" className="h-5 w-5" />
                                                        </div>
                                                        <div className="ml-3 flex-1">
                                                            <p className={`text-sm ${statusTheme === "orange" ? "text-yellow-700" : "text-red-700"}`}>
                                                                {statusTheme === "orange" ?
                                                                    "2 properties miss descriptions, reducing AI accuracy and recommendations." :
                                                                    "5 properties miss descriptions, reducing AI accuracy and recommendations."}
                                                            </p>
                                                        </div>
                                                        <div className="ml-3">
                                                            <button type="button" className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-gray-50">
                                                                <img src="/AI.svg" alt="" className="h-3.5 w-3.5" />
                                                                Generate missing descriptions
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Drawer stats strip - Tailwind stats pattern */}
                                            <div>
                                                <dl className="mt-0 grid grid-cols-1 divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
                                                    <div className="px-4 py-5 sm:p-6">
                                                        <dt className="text-base font-normal text-gray-900">Last Synced Volume</dt>
                                                        <dd className="mt-1">
                                                            <div className="flex items-baseline gap-2">
                                                                <div className="text-2xl font-semibold text-gray-900">434</div>
                                                                <span className="text-sm font-medium text-gray-500">Sep 16, 2025</span>
                                                            </div>
                                                        </dd>
                                                    </div>
                                                    <div className="px-4 py-5 sm:p-6">
                                                        <dt className="text-base font-normal text-gray-900">Total Events</dt>
                                                        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                                            <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                                                                1,829
                                                                <span className="ml-2 text-sm font-medium text-gray-500">Last 7 days</span>
                                                            </div>
                                                        </dd>
                                                    </div>
                                                    <div className="px-4 py-5 sm:p-6">
                                                        <dt className="text-base font-normal text-gray-900">Source</dt>
                                                        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                                            <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                                                                Mixpanel
                                                            </div>
                                                        </dd>
                                                    </div>

                                                    {/* Horizontal divider between rows */}
                                                    <div className="hidden md:block md:col-span-3 h-px bg-gray-200" />

                                                    {/* Row 2 (previously second strip) */}
                                                    <div className="px-4 py-5 sm:p-6">
                                                        <dt className={`text-base font-semibold relative pr-16 ${statusThemeClasses.title}`}>
                                                            <span>{statusTheme === "red" ? "Data Incomplete" : statusTheme === "orange" ? "Some Data Missing" : "All data is complete"}</span>
                                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute top-0 right-0 h-[55px] w-[55px] ${statusThemeClasses.icon}`}>
                                                                <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0 -20 0" stroke="currentColor" strokeWidth="1.5"></path>
                                                                <path d="m8.5 12.5 2 2 5 -5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                                                            </svg>
                                                        </dt>
                                                        <dd className="mt-1">
                                                            <div className="flex items-baseline gap-2">
                                                                <div className={`text-2xl font-semibold ${statusThemeClasses.value}`}>{statusTheme === "red" ? 11 : statusTheme === "orange" ? 1 : 0}</div>
                                                                <span className={`text-sm font-medium ${statusThemeClasses.sub}`}>missing days</span>
                                                            </div>
                                                        </dd>
                                                        {(statusTheme === "red" || statusTheme === "orange") && (
                                                            <dd className="mt-3 mb-1 flex justify-center">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-gray-50"
                                                                    onClick={() => { setPropCoverageSort("asc"); propertiesTableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }) }}
                                                                >
                                                                    <img src="/Sort.svg" alt="" className="h-3.5 w-3.5" />
                                                                    Show Low Coverage Properties
                                                                </button>
                                                            </dd>
                                                        )}
                                                    </div>
                                                    <div className="px-4 py-5 sm:p-6">
                                                        <dt className={`text-base font-semibold relative pr-16 ${statusThemeClasses.title}`}>
                                                            <span>{statusTheme === "red" ? "Data outside normal range" : statusTheme === "orange" ? "Above normal range" : "Data within normal range"}</span>
                                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute top-0 right-0 h-[55px] w-[55px] ${statusThemeClasses.icon}`}>
                                                                <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0 -20 0" stroke="currentColor" strokeWidth="1.5"></path>
                                                                <path d="m8.5 12.5 2 2 5 -5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                                                            </svg>
                                                        </dt>
                                                        <dd className="mt-1">
                                                            <div className="flex items-baseline gap-2">
                                                                <div className={`text-2xl font-semibold ${statusThemeClasses.value}`}>{statusTheme === "red" ? 13 : statusTheme === "orange" ? 1 : 0}</div>
                                                                <span className={`text-sm font-medium ${statusThemeClasses.sub}`}>{statusTheme === "red" ? "critical spikes detected" : "spikes detected"}</span>
                                                            </div>
                                                        </dd>
                                                        <dd className="mt-3 mb-1 flex justify-center">
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-black hover:bg-gray-50"
                                                                onClick={() => {
                                                                    setShowTrendsCard(true)
                                                                    setTimeout(() => {
                                                                        trendsCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                                                    }, 0)
                                                                }}
                                                            >
                                                                <img src="/Key-result.svg" alt="" className="h-3.5 w-3.5" />
                                                                Show Volume Trends
                                                            </button>
                                                        </dd>
                                                    </div>
                                                    <div className="px-4 py-5 sm:p-6">
                                                        <dt className={`text-base font-semibold relative pr-16 ${statusThemeClasses.title}`}>
                                                            <span>{statusTheme === "red" ? "Insufficient Coverage" : statusTheme === "orange" ? "Moderate Coverage" : "Healthy Coverage"}</span>
                                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute top-0 right-0 h-[55px] w-[55px] ${statusThemeClasses.icon}`}>
                                                                <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0 -20 0" stroke="currentColor" strokeWidth="1.5"></path>
                                                                <path d="m8.5 12.5 2 2 5 -5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                                                            </svg>
                                                        </dt>
                                                        <dd className="mt-1">
                                                            <div className="flex items-baseline gap-2">
                                                                <div className={`text-2xl font-semibold ${statusThemeClasses.value}`}>{statusTheme === "red" ? 66 : statusTheme === "orange" ? 2 : 0}</div>
                                                                <span className={`text-sm font-medium ${statusThemeClasses.sub}`}>properties with low coverage</span>
                                                            </div>
                                                        </dd>
                                                        {(statusTheme === "red" || statusTheme === "orange") && (
                                                            <dd className="mt-3 mb-1 flex justify-center">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-gray-50"
                                                                    onClick={() => { setPropCoverageSort("asc"); propertiesTableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }) }}
                                                                >
                                                                    <img src="/Sort.svg" alt="" className="h-3.5 w-3.5" />
                                                                    Show Low Coverage Properties
                                                                </button>
                                                            </dd>
                                                        )}
                                                    </div>
                                                </dl>
                                            </div>


                                            {showTrendsCard && (
                                                <div ref={trendsCardRef} className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                                                    <div className="bg-gray-50 px-4 py-3.5 sm:px-6">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-sm font-semibold text-gray-900">{selectedMetric?.name ?? "Event"} Volume Trend</h3>
                                                            <button
                                                                type="button"
                                                                aria-label="Close"
                                                                className="text-gray-400 hover:text-gray-600"
                                                                onClick={() => setShowTrendsCard(false)}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 py-5 sm:p-6 space-y-4">
                                                        <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                                                            <div className="flex items-center">
                                                                <div className="shrink-0">
                                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500">
                                                                        <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0 -20 0" stroke="currentColor" strokeWidth="1.5"></path>
                                                                        <path d="M12 7v6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
                                                                        <circle cx="12" cy="16" r="1" fill="currentColor"></circle>
                                                                    </svg>
                                                                </div>
                                                                <div className="ml-3 flex-1">
                                                                    <p className="text-sm text-yellow-700">
                                                                        1 anomalies detected in the last 30 days (0 high severity and 1 medium severity)
                                                                    </p>
                                                                </div>
                                                                <div className="ml-3">
                                                                    <button type="button" className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-gray-50" onClick={() => { setPropCoverageSort("asc"); propertiesTableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }) }}>
                                                                        <img src="/Sort.svg" alt="" className="h-3.5 w-3.5" />
                                                                        Show Low Coverage Properties
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <p className="text-xs text-gray-600">Gray band indicates the normal range (±2.5 SD)</p>

                                                        <div className="relative w-full rounded-md bg-gray-50">
                                                            <img src="/Chart.png" alt="Volume Trends chart" className="w-full h-auto rounded-md" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Main content (formerly tab content) */}
                                            <div>
                                                <div className="space-y-3">
                                                    {/* Description card with header */}
                                                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                                                        <div className="bg-gray-50 px-4 py-3.5 sm:px-6">
                                                            <h3 className="text-sm font-semibold text-gray-900">Event Description</h3>
                                                        </div>
                                                        <div className="px-4 py-5 sm:p-6">
                                                            <div className="flex items-center gap-2 mb-2">
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
                                                    {/* Alert moved above Tabs; removed duplicate here */}

                                                    <div ref={propertiesTableRef} className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg">
                                                        <table className="table-fixed relative min-w-full divide-y divide-gray-300">
                                                            <colgroup>
                                                                <col className="w-[40%]" />
                                                                <col className="w-[12%]" />
                                                                <col className="w-[12%]" />
                                                                <col className="w-[8%]" />
                                                                <col className="w-[8%]" />
                                                                <col className="w-[10%]" />
                                                                <col className="w-[10%]" />
                                                            </colgroup>
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-1/3">
                                                                        <Popover open={propSearchOpen} onOpenChange={setPropSearchOpen}>
                                                                            <PopoverTrigger asChild>
                                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                                    <span>Event Properties ({eventProperties.length})</span>
                                                                                    <img src={propSearchQuery.trim() !== "" ? "/Sort.svg" : "/Magnifer.svg"} alt="Search" className="h-4 w-4" />
                                                                                </button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent align="start" className="w-72 p-3">
                                                                                <div className="space-y-2">
                                                                                    <div className="relative">
                                                                                        <img src="/Magnifer.svg" alt="" className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                                                                                        <Input
                                                                                            value={propSearchDraft}
                                                                                            onChange={(e) => setPropSearchDraft(e.target.value)}
                                                                                            placeholder="Search Values..."
                                                                                            className="h-9 pl-8"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="pt-1 flex items-center gap-2">
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setPropSearchQuery(""); setPropSearchDraft(""); setPropSearchOpen(false) }}
                                                                                        >
                                                                                            Clear
                                                                                        </Button>
                                                                                        <Button
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setPropSearchQuery(propSearchDraft); setPropSearchOpen(false) }}
                                                                                        >
                                                                                            Search
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </th>
                                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/12">
                                                                        <Popover open={propSampleSearchOpen} onOpenChange={setPropSampleSearchOpen}>
                                                                            <PopoverTrigger asChild>
                                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                                    <span>Sample Values</span>
                                                                                    <img src={propSearchQuery.trim() !== "" ? "/Sort.svg" : "/Magnifer.svg"} alt="Search" className="h-4 w-4" />
                                                                                </button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent align="start" className="w-72 p-3">
                                                                                <div className="space-y-2">
                                                                                    <div className="relative">
                                                                                        <img src="/Magnifer.svg" alt="" className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                                                                                        <Input
                                                                                            value={propSearchDraft}
                                                                                            onChange={(e) => setPropSearchDraft(e.target.value)}
                                                                                            placeholder="Search Values..."
                                                                                            className="h-9 pl-8"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="pt-1 flex items-center gap-2">
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setPropSearchQuery(""); setPropSearchDraft(""); setPropSampleSearchOpen(false) }}
                                                                                        >
                                                                                            Clear
                                                                                        </Button>
                                                                                        <Button
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setPropSearchQuery(propSearchDraft); setPropSampleSearchOpen(false) }}
                                                                                        >
                                                                                            Apply
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </th>
                                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/6">
                                                                        <Popover open={propTypeFilterOpen} onOpenChange={setPropTypeFilterOpen}>
                                                                            <PopoverTrigger asChild>
                                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                                    <span>Type</span>
                                                                                    <img src={appliedPropTypes.length > 0 ? "/List.svg" : "/List.svg"} alt="" className="h-4 w-4" />
                                                                                </button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent align="start" className="w-64 p-3">
                                                                                <div className="space-y-2">
                                                                                    {availablePropTypes.map((label) => {
                                                                                        const checked = selectedPropTypesDraft.has(label)
                                                                                        return (
                                                                                            <label key={label} className="flex items-center gap-2 text-sm text-gray-900">
                                                                                                <Checkbox
                                                                                                    checked={checked}
                                                                                                    onCheckedChange={(v) => {
                                                                                                        setSelectedPropTypesDraft(prev => {
                                                                                                            const next = new Set(prev)
                                                                                                            if (v) next.add(label); else next.delete(label)
                                                                                                            return next
                                                                                                        })
                                                                                                    }}
                                                                                                />
                                                                                                <span>{label}</span>
                                                                                            </label>
                                                                                        )
                                                                                    })}
                                                                                    <div className="pt-2 flex items-center gap-2">
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setAppliedPropTypes([]); setSelectedPropTypesDraft(new Set()); setPropTypeFilterOpen(false) }}
                                                                                        >
                                                                                            Clear filters
                                                                                        </Button>
                                                                                        <Button
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setAppliedPropTypes(Array.from(selectedPropTypesDraft)); setPropTypeFilterOpen(false) }}
                                                                                        >
                                                                                            Filter
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </th>
                                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/6">
                                                                        <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700 whitespace-nowrap" onClick={() => setPropLastSeenSort(prev => prev === "asc" ? "desc" : prev === "desc" ? null : "asc")}>
                                                                            <span>Last Seen</span>
                                                                            {propLastSeenSort === "asc" ? (
                                                                                <ArrowUp className="h-4 w-4" />
                                                                            ) : propLastSeenSort === "desc" ? (
                                                                                <ArrowDown className="h-4 w-4" />
                                                                            ) : (
                                                                                <img src="/List.svg" alt="" className="h-4 w-4" />
                                                                            )}
                                                                        </button>
                                                                    </th>

                                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/12">
                                                                        <Popover open={propRequiredFilterOpen} onOpenChange={setPropRequiredFilterOpen}>
                                                                            <PopoverTrigger asChild>
                                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                                    <span>Required</span>
                                                                                    <img src={appliedRequired.length > 0 ? "/Sort.svg" : "/List.svg"} alt="" className="h-4 w-4" />
                                                                                </button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent align="start" className="w-64 p-3">
                                                                                <div className="space-y-2">
                                                                                    {["Required", "Optional"].map((label) => {
                                                                                        const checked = selectedRequiredDraft.has(label as "Required" | "Optional")
                                                                                        return (
                                                                                            <label key={label} className="flex items-center gap-2 text-sm text-gray-900">
                                                                                                <Checkbox
                                                                                                    checked={checked}
                                                                                                    onCheckedChange={(v) => {
                                                                                                        setSelectedRequiredDraft(prev => {
                                                                                                            const next = new Set(prev)
                                                                                                            if (v) next.add(label as "Required" | "Optional"); else next.delete(label as "Required" | "Optional")
                                                                                                            return next
                                                                                                        })
                                                                                                    }}
                                                                                                />
                                                                                                <span>{label}</span>
                                                                                            </label>
                                                                                        )
                                                                                    })}
                                                                                    <div className="pt-2 flex items-center gap-2">
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setAppliedRequired([]); setSelectedRequiredDraft(new Set()); setPropRequiredFilterOpen(false) }}
                                                                                        >
                                                                                            Clear filters
                                                                                        </Button>
                                                                                        <Button
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setAppliedRequired(Array.from(selectedRequiredDraft)); setPropRequiredFilterOpen(false) }}
                                                                                        >
                                                                                            Filter
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </th>
                                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/12">
                                                                        <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700 whitespace-nowrap" onClick={() => setPropCoverageSort(prev => prev === "asc" ? "desc" : prev === "desc" ? null : "asc")}>
                                                                            <span>Coverage</span>
                                                                            {propCoverageSort === "asc" ? (
                                                                                <ArrowUp className="h-4 w-4" />
                                                                            ) : propCoverageSort === "desc" ? (
                                                                                <ArrowDown className="h-4 w-4" />
                                                                            ) : (
                                                                                <img src="/List.svg" alt="" className="h-4 w-4" />
                                                                            )}
                                                                        </button>
                                                                    </th>
                                                                    <th scope="col" className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6 w-1/12">
                                                                        <Popover open={propStatusFilterOpen} onOpenChange={setPropStatusFilterOpen}>
                                                                            <PopoverTrigger asChild>
                                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                                    <span>Status</span>
                                                                                    <img src={propAppliedStatuses.length > 0 ? "/Sort.svg" : "/List.svg"} alt="" className="h-4 w-4" />
                                                                                </button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent align="start" className="w-64 p-3">
                                                                                <div className="space-y-2">
                                                                                    {["live", "inactive"].map((label) => {
                                                                                        const checked = propSelectedStatusesDraft.has(label)
                                                                                        return (
                                                                                            <label key={label} className="flex items-center gap-2 text-sm text-gray-900">
                                                                                                <Checkbox
                                                                                                    checked={checked}
                                                                                                    onCheckedChange={(v) => {
                                                                                                        setPropSelectedStatusesDraft(prev => {
                                                                                                            const next = new Set(prev)
                                                                                                            if (v) next.add(label); else next.delete(label)
                                                                                                            return next
                                                                                                        })
                                                                                                    }}
                                                                                                />
                                                                                                <span>{label}</span>
                                                                                            </label>
                                                                                        )
                                                                                    })}
                                                                                    <div className="pt-2 flex items-center gap-2">
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setPropAppliedStatuses([]); setPropSelectedStatusesDraft(new Set()); setPropStatusFilterOpen(false) }}
                                                                                        >
                                                                                            Clear filters
                                                                                        </Button>
                                                                                        <Button
                                                                                            className="h-9 flex-1"
                                                                                            onClick={() => { setPropAppliedStatuses(Array.from(propSelectedStatusesDraft)); setPropStatusFilterOpen(false) }}
                                                                                        >
                                                                                            Filter
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                                {filteredProps.map(({ p, i }) => (
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
                                                                            {p.type === "unknown" ? (i % 2 === 0 ? "String" : "Integer") : p.type}
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
                                                                            const cov = coveragePool[i % coveragePool.length]
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
                                            </div>
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