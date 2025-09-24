"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import SingleLayerMenu from "@/components/single-layer-menu"
import { useEffect, useState, useMemo, useRef, Fragment } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function CustomerPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [statusTheme, setStatusTheme] = useState<"green" | "orange" | "red">("green")
    const [showTrendsCard, setShowTrendsCard] = useState(false)
    const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null)
    const [editingDescription, setEditingDescription] = useState("")
    // Inline edit state (match Events > Properties behaviour)
    const [isEditingPropDescription, setIsEditingPropDescription] = useState<Record<number, boolean>>({})
    const [propDescriptionDraftById, setPropDescriptionDraftById] = useState<Record<number, string>>({})
    const [propDescriptionOverrideById, setPropDescriptionOverrideById] = useState<Record<number, string>>({})
    const [autoTypingByProp, setAutoTypingByProp] = useState<Record<number, boolean>>({})
    const [expandedById, setExpandedById] = useState<Record<number, boolean>>({})
    const propDescriptionTextareaRefs = useRef<Record<number, HTMLTextAreaElement | null>>({})
    const autosizeTextarea = (el: HTMLTextAreaElement | null) => {
        if (!el) return
        el.style.height = "0px"
        el.style.height = `${el.scrollHeight}px`
    }

    // Properties table state
    const [propSearchOpen, setPropSearchOpen] = useState(false)
    const [propSearchDraft, setPropSearchDraft] = useState("")
    const [propSearchQuery, setPropSearchQuery] = useState("")
    const [propSampleSearchOpen, setPropSampleSearchOpen] = useState(false)
    const [propTypeFilterOpen, setPropTypeFilterOpen] = useState(false)
    const [selectedPropTypesDraft, setSelectedPropTypesDraft] = useState<Set<string>>(new Set())
    const [appliedPropTypes, setAppliedPropTypes] = useState<string[]>([])
    const [propLastSeenSort, setPropLastSeenSort] = useState<"asc" | "desc" | null>(null)
    const [propRequiredFilterOpen, setPropRequiredFilterOpen] = useState(false)
    const [selectedRequiredDraft, setSelectedRequiredDraft] = useState<Set<"Required" | "Optional">>(new Set())
    const [appliedRequired, setAppliedRequired] = useState<Array<"Required" | "Optional">>([])
    const [propCoverageSort, setPropCoverageSort] = useState<"asc" | "desc" | null>(null)
    const [propStatusFilterOpen, setPropStatusFilterOpen] = useState(false)
    const [propSelectedStatusesDraft, setPropSelectedStatusesDraft] = useState<Set<string>>(new Set())
    const [propAppliedStatuses, setPropAppliedStatuses] = useState<string[]>([])
    const [requiredById, setRequiredById] = useState<Record<number, boolean>>({})

    // Customer properties data from screenshot (memoized to avoid re-creating each render)
    const customerProperties = useMemo(() => ([
        { id: 1, name: "$ignore_time", type: "boolean", description: "No description", sampleValue: "No sample value", coverage: "-", required: false, issues: "Missing Description" },
        { id: 2, name: "$initial_utm_campaign", type: "string", description: "No description", sampleValue: "No sample value", coverage: "-", required: false, issues: "Missing Description" },
        { id: 3, name: "$initial_utm_content", type: "string", description: "No description", sampleValue: "No sample value", coverage: "-", required: false, issues: "Missing Description" },
        { id: 4, name: "$initial_utm_medium", type: "string", description: "No description", sampleValue: "No sample value", coverage: "-", required: false, issues: "Missing Description" },
        { id: 5, name: "$initial_utm_source", type: "string", description: "No description", sampleValue: "No sample value", coverage: "-", required: false, issues: "Missing Description" },
        { id: 6, name: "$initial_utm_term", type: "string", description: "No description", sampleValue: "No sample value", coverage: "-", required: false, issues: "Missing Description" },
        { id: 7, name: "gclid", type: "string", description: "No description", sampleValue: "No sample value", coverage: "-", required: false, issues: "Missing Description" },
        { id: 8, name: "msclkid", type: "string", description: "No description", sampleValue: "No sample value", coverage: "-", required: false, issues: "Missing Description" },
        { id: 9, name: "state", type: "string", description: "No description", sampleValue: "No sample value", coverage: "-", required: false, issues: "Missing Description" },
        { id: 10, name: "utm_campaign", type: "string", description: "Last-touch UTM campaign identifying the promotion. Synonyms: campaign tag, campaign code.", sampleValue: "No sample value", coverage: "-", required: false, issues: "None" },
        { id: 11, name: "utm_content", type: "string", description: "Last-touch UTM content indicating the clicked creative/element. Synonyms: creative tag, content variant.", sampleValue: "No sample value", coverage: "-", required: false, issues: "None" },
        { id: 12, name: "utm_medium", type: "string", description: "Last-touch UTM medium indicating link type. Synonyms: marketing medium.", sampleValue: "No sample value", coverage: "-", required: false, issues: "None" }
    ]), [])

    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    useEffect(() => {
        const defaults: Record<number, boolean> = {}
        customerProperties.forEach(p => { defaults[p.id] = true })
        setRequiredById(defaults)
    }, [customerProperties])

    const statusThemeClasses = useMemo(() => {
        switch (statusTheme) {
            case "orange":
                return {
                    title: "text-orange-700",
                    value: "text-orange-700",
                    sub: "text-orange-600"
                }
            case "red":
                return {
                    title: "text-red-700",
                    value: "text-red-700",
                    sub: "text-red-600"
                }
            default:
                return {
                    title: "text-green-700",
                    value: "text-green-700",
                    sub: "text-green-600"
                }
        }
    }, [statusTheme])

    // Properties filtering logic
    const filteredProperties = useMemo(() => {
        let rows = customerProperties.map(p => ({ p }))

        // Search filter
        if (propSearchQuery.trim()) {
            const query = propSearchQuery.toLowerCase()
            rows = rows.filter(({ p }) => p.name.toLowerCase().includes(query))
        }

        // Type filter
        if (appliedPropTypes.length > 0) {
            const need = new Set(appliedPropTypes)
            rows = rows.filter(({ p }) => need.has(p.type))
        }

        // Required filter
        if (appliedRequired.length > 0) {
            const allowed = new Set(appliedRequired.map(v => v === "Required"))
            rows = rows.filter(({ p }) => allowed.has(requiredById[p.id] ?? p.required))
        }

        // Status filter
        if (propAppliedStatuses.length > 0) {
            const allowedStatuses = new Set(propAppliedStatuses)
            rows = rows.filter(({ p }) => allowedStatuses.has(p.issues))
        }

        // Last seen sort
        if (propLastSeenSort) {
            rows.sort((a, b) => {
                const ca = new Date(a.p.lastSeen || new Date()).getTime()
                const cb = new Date(b.p.lastSeen || new Date()).getTime()
                return propLastSeenSort === "asc" ? ca - cb : cb - ca
            })
        }

        // Coverage sort
        if (propCoverageSort) {
            rows.sort((a, b) => {
                const ca = a.p.coverage
                const cb = b.p.coverage
                return propCoverageSort === "asc" ? ca - cb : cb - ca
            })
        }

        return rows
    }, [customerProperties, propSearchQuery, appliedPropTypes, appliedRequired, propAppliedStatuses, propLastSeenSort, propCoverageSort])

    const availablePropTypes = useMemo(() => {
        const set = new Set<string>()
        customerProperties.forEach(p => set.add(p.type))
        return Array.from(set)
    }, [customerProperties])

    const propsHasActiveSearch = propSearchQuery.trim() !== ""
    const propsHasTypes = appliedPropTypes.length > 0
    const propsHasRequired = appliedRequired.length > 0
    const propsHasAnyActive = propsHasActiveSearch || propsHasTypes || propsHasRequired || propLastSeenSort !== null || propCoverageSort !== null || propAppliedStatuses.length > 0

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
            name: "Context",
            href: "/data_management/context",
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

            <HeaderFilter
                showFilters={false}
                title="Customer Properties"
                forceNarrowLayout
                showMenu={false}
                useActionDialog={false}
                showActionButton={false}
                leftOffset={isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)"}
            />

            <div
                className="px-6 pt-24 pb-6 mx-auto"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                {/* Test buttons - hidden in production */}
                <div className="fixed left-2 top-2 z-[10000005] flex flex-col gap-2 opacity-30 hover:opacity-100 transition-opacity">
                    <button className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-black shadow-sm hover:bg-gray-50" onClick={() => setStatusTheme("green")}>Green</button>
                    <button className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-black shadow-sm hover:bg-gray-50" onClick={() => setStatusTheme("orange")}>Orange</button>
                    <button className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-black shadow-sm hover:bg-gray-50" onClick={() => setStatusTheme("red")}>Red</button>
                </div>

                <div className="space-y-6">
                    {/* Red Alert Banner for Missing Descriptions */}
                    {statusTheme === "red" && (
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="border-l-4 p-4 border-red-400 bg-red-50">
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <img src="/Red.svg" alt="" className="h-5 w-5" />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <p className="text-sm text-red-700">
                                            5 properties miss descriptions, reducing AI accuracy and recommendations.
                                        </p>
                                    </div>
                                    <div className="ml-3">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-gray-50"
                                            onClick={() => {/* Generate missing descriptions functionality */ }}
                                        >
                                            <img src="/AI.svg" alt="" className="h-3.5 w-3.5" />
                                            Generate missing descriptions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Grid */}
                    <div className="px-4 sm:px-6 lg:px-8">
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

                                {/* Row 2 - Status Cards */}
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className={`text-base font-semibold relative pr-16 ${statusThemeClasses.title}`}>
                                        <span>{statusTheme === "red" ? "Data Incomplete" : statusTheme === "orange" ? "Some Data Missing" : "All data is complete"}</span>
                                        <img
                                            src={statusTheme === "red" ? "/Red.svg" : statusTheme === "orange" ? "/Orange.svg" : "/Green.svg"}
                                            alt=""
                                            className="absolute top-0 right-0 h-[55px] w-[55px]"
                                        />
                                    </dt>
                                    <dd className="mt-1">
                                        <div className="flex items-baseline gap-2">
                                            <div className={`text-2xl font-semibold ${statusThemeClasses.value}`}>{statusTheme === "red" ? 11 : statusTheme === "orange" ? 1 : 0}</div>
                                            <span className={`text-sm font-medium ${statusThemeClasses.sub}`}>missing days</span>
                                        </div>
                                    </dd>
                                </div>
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className={`text-base font-semibold relative pr-16 ${statusThemeClasses.title}`}>
                                        <span>{statusTheme === "red" ? "Data outside normal range" : statusTheme === "orange" ? "Above normal range" : "Data within normal range"}</span>
                                        <img
                                            src={statusTheme === "red" ? "/Red.svg" : statusTheme === "orange" ? "/Orange.svg" : "/Green.svg"}
                                            alt=""
                                            className="absolute top-0 right-0 h-[55px] w-[55px]"
                                        />
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
                                            onClick={() => setShowTrendsCard(true)}
                                        >
                                            <img src="/Key-result.svg" alt="" className="h-3.5 w-3.5" />
                                            Show Volume Trends
                                        </button>
                                    </dd>
                                </div>
                                <div className="px-4 py-5 sm:p-6">
                                    <dt className={`text-base font-semibold relative pr-16 ${statusThemeClasses.title}`}>
                                        <span>{statusTheme === "red" ? "Insufficient Coverage" : statusTheme === "orange" ? "Moderate Coverage" : "Healthy Coverage"}</span>
                                        <img
                                            src={statusTheme === "red" ? "/Red.svg" : statusTheme === "orange" ? "/Orange.svg" : "/Green.svg"}
                                            alt=""
                                            className="absolute top-0 right-0 h-[55px] w-[55px]"
                                        />
                                    </dt>
                                    <dd className="mt-1">
                                        <div className="flex items-baseline gap-2">
                                            <div className={`text-2xl font-semibold ${statusThemeClasses.value}`}>{statusTheme === "red" ? 66 : statusTheme === "orange" ? 2 : 0}</div>
                                            <span className={`text-sm font-medium ${statusThemeClasses.sub}`}>low coverage properties</span>
                                        </div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {showTrendsCard && (
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                                <div className="bg-gray-50 px-4 py-3.5 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-gray-900">Customer Properties Volume Trend</h3>
                                        <button
                                            type="button"
                                            aria-label="Close"
                                            className="text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowTrendsCard(false)}
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="px-4 py-6 sm:px-6 space-y-4">
                                    {statusTheme !== "green" && (
                                        <div className={`border-l-4 p-4 ${statusTheme === "red" ? "border-red-400 bg-red-50" : "border-yellow-400 bg-yellow-50"}`}>
                                            <div className="flex items-center">
                                                <div className="shrink-0">
                                                    <img src={statusTheme === "red" ? "/Red.svg" : "/Orange.svg"} alt="" className="h-5 w-5" />
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <p className={`text-sm ${statusTheme === "red" ? "text-red-700" : "text-yellow-700"}`}>
                                                        {statusTheme === "red"
                                                            ? "3 anomalies detected in the last 30 days (2 high severity and 1 medium severity)"
                                                            : "1 anomalies detected in the last 30 days (0 high severity and 1 medium severity)"}
                                                    </p>
                                                </div>
                                                <div className="ml-3">
                                                    <button
                                                        type="button"
                                                        className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-gray-50 ${statusTheme === "red"
                                                            ? "border-red-300 bg-white text-red-700 hover:bg-red-50"
                                                            : "border-yellow-300 bg-white text-yellow-700 hover:bg-yellow-50"
                                                            }`}
                                                        onClick={() => {/* Navigate to chat */ }}
                                                    >
                                                        <img src="/New-chat.svg" alt="" className="h-3.5 w-3.5" />
                                                        Troubleshoot in Chat
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-500 mb-4">
                                        Gray band indicates the normal range (±2.5 SD)
                                    </div>

                                    {/* Chart placeholder - in a real implementation, you'd use a charting library like Chart.js or Recharts */}
                                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-900 mb-2">Volume Trend Chart</div>
                                            <div className="text-xs text-gray-500">
                                                Event Volume: 0 - 1.2K<br />
                                                Date Range: Aug 19 - Sep 15<br />
                                                <div className="mt-2 flex items-center justify-center gap-4 text-xs">
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-3 h-0.5 bg-blue-500"></div>
                                                        <span>Actual Volume</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-3 h-0.5 bg-gray-400 border-dashed border-t"></div>
                                                        <span>Expected Volume</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-3 h-2 bg-gray-200 rounded"></div>
                                                        <span>±2.5 Standard Deviations</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                        <span>High Anomaly</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                        <span>Medium Anomaly</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Customer Properties Table */}
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg">
                                        <table className="relative min-w-full divide-y divide-gray-300 table-fixed">
                                            <colgroup>
                                                <col className="w-[30%]" />
                                                <col className="w-[15%]" />
                                                <col className="w-[20%]" />
                                                <col className="w-[15%]" />
                                                <col className="w-[10%]" />
                                                <col className="w-[10%]" />
                                            </colgroup>
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        <Popover open={propSearchOpen} onOpenChange={setPropSearchOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                    <span>Customer Properties</span>
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
                                                                            placeholder="Search properties..."
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
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
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
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
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
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
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
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
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
                                                    <th scope="col" className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                        <span>Issues</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {filteredProperties.map(({ p }) => (
                                                    <tr key={p.id} className="hover:bg-gray-50">
                                                        <td className="align-top py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium text-gray-900">{p.name}</span>
                                                                    <button
                                                                        type="button"
                                                                        className="text-gray-400 hover:text-gray-600"
                                                                        aria-label={`Edit ${p.name} description`}
                                                                        onClick={() => {
                                                                            setIsEditingPropDescription(prev => ({ ...prev, [p.id]: true }))
                                                                            setPropDescriptionDraftById(prev => ({ ...prev, [p.id]: (propDescriptionOverrideById[p.id] ?? (p.description === "No description" ? "" : p.description)) }))
                                                                        }}
                                                                    >
                                                                        <img src="/New-chat.svg" alt="Edit" className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    {isEditingPropDescription[p.id] ? (
                                                                        <div className="space-y-2">
                                                                            <Textarea
                                                                                ref={(node) => { propDescriptionTextareaRefs.current[p.id] = node; autosizeTextarea(node) }}
                                                                                value={propDescriptionDraftById[p.id] ?? ""}
                                                                                onChange={(e) => {
                                                                                    setPropDescriptionDraftById(prev => ({ ...prev, [p.id]: e.target.value }))
                                                                                    autosizeTextarea(propDescriptionTextareaRefs.current[p.id] || null)
                                                                                }}
                                                                                onInput={(e) => autosizeTextarea(e.currentTarget)}
                                                                                className="w-full resize-none overflow-hidden"
                                                                            />
                                                                            {!autoTypingByProp[p.id] && (
                                                                                <div className="flex items-center gap-3">
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        className="h-8 pl-2 pr-4"
                                                                                        onClick={() => {
                                                                                            console.log("Generate with AI clicked for", p.name)
                                                                                        }}
                                                                                    >
                                                                                        <span className="inline-flex items-center gap-1">
                                                                                            <img src="/AI.svg" alt="AI" className="h-4 w-4" />
                                                                                            <span>AI Generate</span>
                                                                                        </span>
                                                                                    </Button>
                                                                                    <Button
                                                                                        className="h-8 px-3"
                                                                                        onClick={() => {
                                                                                            const next = propDescriptionDraftById[p.id] ?? ""
                                                                                            setPropDescriptionOverrideById(prev => ({ ...prev, [p.id]: next }))
                                                                                            setIsEditingPropDescription(prev => ({ ...prev, [p.id]: false }))
                                                                                        }}
                                                                                    >
                                                                                        Save
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="link"
                                                                                        className="h-8 px-0"
                                                                                        onClick={() => {
                                                                                            setIsEditingPropDescription(prev => ({ ...prev, [p.id]: false }))
                                                                                            setPropDescriptionDraftById(prev => ({ ...prev, [p.id]: (propDescriptionOverrideById[p.id] ?? (p.description === "No description" ? "" : p.description)) }))
                                                                                        }}
                                                                                    >
                                                                                        Cancel
                                                                                    </Button>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div
                                                                            role="button"
                                                                            className="cursor-text text-gray-600 text-xs"
                                                                            onClick={() => {
                                                                                setIsEditingPropDescription(prev => ({ ...prev, [p.id]: true }))
                                                                                setPropDescriptionDraftById(prev => ({ ...prev, [p.id]: (propDescriptionOverrideById[p.id] ?? (p.description === "No description" ? "" : p.description)) }))
                                                                            }}
                                                                        >
                                                                            {(p.description !== "No description") && (
                                                                                <>
                                                                                    {(expandedById[p.id])
                                                                                        ? (propDescriptionOverrideById[p.id] ?? p.description)
                                                                                        : (((propDescriptionOverrideById[p.id] ?? p.description).length > 120)
                                                                                            ? (propDescriptionOverrideById[p.id] ?? p.description).slice(0, 120) + "…"
                                                                                            : (propDescriptionOverrideById[p.id] ?? p.description))}
                                                                                    {((propDescriptionOverrideById[p.id] ?? p.description).length > 120) && (
                                                                                        <button
                                                                                            type="button"
                                                                                            className="ml-2 text-gray-500 hover:text-gray-700"
                                                                                            onClick={(e) => { e.stopPropagation(); setExpandedById(prev => ({ ...prev, [p.id]: !prev[p.id] })) }}
                                                                                        >
                                                                                            {expandedById[p.id] ? "Less" : "More"}
                                                                                        </button>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.sampleValue}</td>
                                                        <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.type}</td>
                                                        {(() => {
                                                            const coveragePool = [100, 95, 90, 85, 80, 70, 60, 50]
                                                            const cov = coveragePool[p.id % coveragePool.length]
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
                                                        <td className="align-top whitespace-nowrap px-3 py-4 text-sm" onClick={(e) => e.stopPropagation()}>
                                                            <Switch
                                                                checked={requiredById[p.id] ?? p.required}
                                                                onCheckedChange={(checked) => setRequiredById(prev => ({ ...prev, [p.id]: checked }))}
                                                                aria-label={`Toggle required for ${p.name}`}
                                                                className="!h-5 !w-10 data-[state=checked]:!bg-green-500"
                                                            />
                                                        </td>
                                                        <td className="align-top whitespace-nowrap py-4 pl-3 pr-4 text-sm sm:pr-6">
                                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${p.issues === "None" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                                {p.issues === "None" ? "Live" : p.issues}
                                                            </span>
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
