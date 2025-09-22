"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import type { Metric } from "@/types/metric"
import HeaderFilter from "@/components/header-filter"
import SingleLayerMenu from "@/components/single-layer-menu"
import { useState, useEffect, useMemo } from "react"
import { X, ArrowUp, ArrowDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"



export default function MetricsPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedMetricRow, setSelectedMetricRow] = useState<null | {
        name: string
        description: string
        category: string
        createdAt: string
        lastModified: string
        formula: string
        synonyms: string
    }>(null)

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

    // Header interactions modeled after Events page
    const [metricSearchOpen, setMetricSearchOpen] = useState(false)
    const [metricSearchDraft, setMetricSearchDraft] = useState("")
    const [metricSearchQuery, setMetricSearchQuery] = useState("")

    const [categoryFilterOpen, setCategoryFilterOpen] = useState(false)
    const [selectedCategoriesDraft, setSelectedCategoriesDraft] = useState<Set<string>>(new Set())
    const [appliedCategories, setAppliedCategories] = useState<string[]>([])

    const [lastModifiedSort, setLastModifiedSort] = useState<"asc" | "desc" | null>(null)
    const [lastModifiedFilterOpen, setLastModifiedFilterOpen] = useState(false)

    const sourceOptions = useMemo(() => {
        const set = new Set<string>()
        metrics.forEach(m => m.sources.forEach(s => set.add(s)))
        return Array.from(set).sort()
    }, [metrics])

    // Metrics catalog rows shown in the table
    const metricCatalogRows = useMemo(() => ([
        {
            name: "CR – Conversion Rate",
            description: "Share of sessions that result in a purchase.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "SUM(orders) / SUM(sessions)",
            category: "Conversion",
            synonyms: "Purchase Rate, Win Rate, Checkout Rate",
        }, {
            name: "AOV – Average Order Value",
            description: "Average revenue per order.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "SUM(revenue) / COUNT(orders)",
            category: "Conversion",
            synonyms: "Avg. Basket Size, Avg. Spend, Cart Value",
        }, {
            name: "CRR – Customer Retention Rate",
            description: "Percent of customers who purchased again.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "RETURNING_CUSTOMERS / TOTAL_CUSTOMERS",
            category: "Retention",
            synonyms: "Repeat Rate, Loyalty %, Stickiness",
        }, {
            name: "Churn – Customer Attrition",
            description: "Percent of customers lost over a period.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "1 - Retention_Rate",
            category: "Retention",
            synonyms: "Drop-off %, Lost Users, Attrition Rate",
        }, {
            name: "NPS – Net Promoter Score",
            description: "Promoters minus detractors as a percentage.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "%Promoters - %Detractors",
            category: "Retention",
            synonyms: "Loyalty Score, Advocacy Index, Satisfaction Index",
        }, {
            name: "LTV / CLV – Lifetime Value",
            description: "Estimated value of a customer over lifespan.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "AOV * Purchase_Frequency * Avg_Lifespan",
            category: "Retention",
            synonyms: "Customer Value, Lifetime Spend, Long-Term Value",
        }, {
            name: "GMV – Gross Merchandise Value",
            description: "Total sales value before discounts/returns.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "SUM(order_value)",
            category: "Retention",
            synonyms: "Sales Volume, Transaction Value, Total Sales",
        }, {
            name: "ROI – Return on Investment",
            description: "Profit relative to investment cost.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "(Revenue - Cost) / Cost",
            category: "Retention",
            synonyms: "Return %, Campaign Return, Profit Ratio",
        }, {
            name: "ROAS – Return on Ad Spend",
            description: "Revenue per unit of ad spend.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "Ad_Revenue / Ad_Spend",
            category: "Retention",
            synonyms: "Ad ROI, Marketing Return",
        }, {
            name: "ATC – Add to Cart Rate",
            description: "Rate of sessions that add an item to cart.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "ADD_TO_CART_EVENTS / SESSIONS",
            category: "Engagement",
            synonyms: "Cart Adds, Basket Adds, Shop-Adds",
        }, {
            name: "Checkout Abandonment Rate",
            description: "Share of initiated checkouts that don't complete.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "1 - (Completed_Checkouts / Checkout_Initiations)",
            category: "Engagement",
            synonyms: "Drop-Off %, Cart Loss, Abandon %",
        }, {
            name: "Sessions / Users",
            description: "Session or user count over the period.",
            createdAt: "Sep 01, 2025",
            lastModified: "Sep 16, 2025",
            lastSeen: "Sep 5, 2025",
            sample: "SUM(sessions)",
            category: "Engagement",
            synonyms: "Visits, Shoppers, Traffic",
        },
    ]), [])

    const categoryOptions = useMemo(() => {
        const set = new Set<string>()
        metricCatalogRows.forEach(m => set.add(m.category))
        return Array.from(set).sort()
    }, [metricCatalogRows])



    const visibleRows = useMemo(() => {
        let rows = metricCatalogRows
        // Search by metric name
        if (metricSearchQuery.trim() !== "") {
            const q = metricSearchQuery.trim().toLowerCase()
            rows = rows.filter(m =>
                m.name.toLowerCase().includes(q) ||
                m.description.toLowerCase().includes(q) ||
                m.synonyms.toLowerCase().includes(q)
            )
        }
        // Filter by category (using metric.type as available field)
        if (appliedCategories.length > 0) {
            rows = rows.filter(m => appliedCategories.includes(m.category))
        }
        // Sort by last modified
        if (lastModifiedSort) {
            rows = [...rows].sort((a, b) => {
                const ta = new Date(a.lastModified).getTime()
                const tb = new Date(b.lastModified).getTime()
                return lastModifiedSort === "asc" ? ta - tb : tb - ta
            })
        }
        return rows
    }, [metricCatalogRows, metricSearchQuery, appliedCategories, lastModifiedSort])

    return (
        <div className="min-h-screen bg-gray-50">
            <SingleLayerMenu forceState="narrow" />
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Metrics"
            />

            <HeaderFilter
                forceNarrowLayout
                title="Metrics"
                showFilters={false}
                showMenu={false}
                actionLabel="Add Metric"
                useActionDialog={false}
                onActionClick={() => {
                    setSelectedMetricRow({
                        name: "",
                        description: "",
                        category: "",
                        createdAt: "",
                        lastModified: "",
                        formula: "",
                        synonyms: "",
                    })
                    setDrawerOpen(true)
                }}
                leftOffset={isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)"}
            />

            <div
                className="px-6 pt-24 pb-6"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                <div className="space-y-6">


                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg">
                                        <table className="table-fixed relative min-w-full divide-y divide-gray-300">
                                            <colgroup>
                                                <col className="w-[44%]" />
                                                <col className="w-[28%]" />
                                                <col className="w-[12%]" />
                                                <col className="w-[12%]" />
                                                <col className="w-[5%]" />
                                            </colgroup>
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-1/3">
                                                        <Popover open={metricSearchOpen} onOpenChange={setMetricSearchOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                    <span>Metric</span>
                                                                    <img src={metricSearchQuery.trim() !== "" ? "/Sort.svg" : "/Magnifer.svg"} alt="Search" className="h-4 w-4" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="start" className="w-72 p-3">
                                                                <div className="space-y-2">
                                                                    <div className="relative">
                                                                        <img src="/Magnifer.svg" alt="" className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                                                                        <Input
                                                                            value={metricSearchDraft}
                                                                            onChange={(e) => setMetricSearchDraft(e.target.value)}
                                                                            placeholder="Search metrics..."
                                                                            className="h-9 pl-8"
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center gap-2 pt-1">
                                                                        <Button
                                                                            variant="outline"
                                                                            className="h-9 flex-1"
                                                                            onClick={() => { setMetricSearchQuery(""); setMetricSearchDraft(""); setMetricSearchOpen(false) }}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                        <Button
                                                                            className="h-9 flex-1"
                                                                            onClick={() => { setMetricSearchQuery(metricSearchDraft); setMetricSearchOpen(false) }}
                                                                        >
                                                                            Search
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Formula</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        <Popover open={categoryFilterOpen} onOpenChange={setCategoryFilterOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                    <span>Category</span>
                                                                    <img src={appliedCategories.length > 0 ? "/Sort.svg" : "/List.svg"} alt="" className="h-4 w-4" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="start" className="w-64 p-3">
                                                                <div className="space-y-2">
                                                                    {categoryOptions.map((c) => {
                                                                        const checked = selectedCategoriesDraft.has(c)
                                                                        return (
                                                                            <label key={c} className="flex items-center gap-2 text-sm text-gray-900">
                                                                                <Checkbox
                                                                                    checked={checked}
                                                                                    onCheckedChange={(v) => {
                                                                                        const next = new Set(selectedCategoriesDraft)
                                                                                        if (v) next.add(c); else next.delete(c)
                                                                                        setSelectedCategoriesDraft(next)
                                                                                    }}
                                                                                />
                                                                                {c}
                                                                            </label>
                                                                        )
                                                                    })}
                                                                    <div className="flex items-center gap-2 pt-1">
                                                                        <Button
                                                                            variant="outline"
                                                                            className="h-9 flex-1"
                                                                            onClick={() => { setAppliedCategories([]); setSelectedCategoriesDraft(new Set()); setCategoryFilterOpen(false) }}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                        <Button
                                                                            className="h-9 flex-1"
                                                                            onClick={() => { setAppliedCategories(Array.from(selectedCategoriesDraft)); setCategoryFilterOpen(false) }}
                                                                        >
                                                                            Filter
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        <Popover open={lastModifiedFilterOpen} onOpenChange={setLastModifiedFilterOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700 whitespace-nowrap">
                                                                    <span>Last modified</span>
                                                                    {lastModifiedSort === "asc" ? (
                                                                        <ArrowUp className="h-4 w-4" />
                                                                    ) : lastModifiedSort === "desc" ? (
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
                                                                        onClick={() => { setLastModifiedSort("asc"); setLastModifiedFilterOpen(false) }}
                                                                    >
                                                                        <ArrowUp className="h-4 w-4" />
                                                                        Sort Ascending
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 text-sm text-left"
                                                                        onClick={() => { setLastModifiedSort("desc"); setLastModifiedFilterOpen(false) }}
                                                                    >
                                                                        <ArrowDown className="h-4 w-4" />
                                                                        Sort Descending
                                                                    </button>
                                                                    {lastModifiedSort && (
                                                                        <div className="pt-2">
                                                                            <Button
                                                                                variant="outline"
                                                                                className="h-9 w-full"
                                                                                onClick={() => { setLastModifiedSort(null); setLastModifiedFilterOpen(false) }}
                                                                            >
                                                                                Clear
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6"><span className="sr-only">Open</span></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {visibleRows.map((p, i) => (
                                                    <tr
                                                        key={p.name}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedMetricRow({
                                                                name: p.name,
                                                                description: p.description,
                                                                category: p.category,
                                                                createdAt: p.createdAt,
                                                                lastModified: p.lastModified,
                                                                formula: p.sample,
                                                                synonyms: p.synonyms,
                                                            })
                                                            setDrawerOpen(true)
                                                        }}
                                                    >
                                                        <td className="align-top py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                            <div className="flex flex-col gap-1">
                                                                <span className="font-semibold text-gray-900">{p.name}</span>
                                                                <div className="text-gray-600">{p.description}</div>
                                                                <div className="text-gray-500">{p.synonyms}</div>
                                                            </div>
                                                        </td>
                                                        <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-medium">{p.sample}</td>
                                                        <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-700">{p.category}</td>
                                                        <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.lastModified}</td>
                                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <div className="inline-flex items-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center text-gray-500 hover:text-gray-700"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setSelectedMetricRow({
                                                                            name: p.name,
                                                                            description: p.description,
                                                                            category: p.category,
                                                                            createdAt: p.createdAt,
                                                                            lastModified: p.lastModified,
                                                                            formula: p.sample,
                                                                            synonyms: p.synonyms,
                                                                        })
                                                                        setDrawerOpen(true)
                                                                    }}
                                                                >
                                                                    <img src="/New-chat.svg" alt="Open in chat" className="shrink-0 h-4 w-4" />
                                                                    <span className="sr-only">Open {p.name}</span>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center text-gray-500 hover:text-red-600"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        // hook up delete action here
                                                                    }}
                                                                    aria-label={`Delete ${p.name}`}
                                                                >
                                                                    <img src="/Delete.svg" alt="Delete" className="shrink-0 h-4 w-4" />
                                                                </button>
                                                            </div>
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
                    {/* Right-side Drawer with backdrop */}
                    {drawerOpen && selectedMetricRow && (
                        <div className="relative z-[10000001]">
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 z-[10000000] bg-gray-500/75 cursor-pointer"
                                onClick={() => setDrawerOpen(false)}
                            />

                            <div className="fixed inset-0 z-[10000002] overflow-hidden">
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                        <div className="pointer-events-auto relative w-screen max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl transform transition duration-500 ease-in-out translate-x-0">
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
                                                    <h2 className="text-lg font-semibold text-gray-900 truncate">{selectedMetricRow.name ? selectedMetricRow.name : "New Metric"}</h2>
                                                </div>
                                                <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-2">
                                                            <Label>Metric Name</Label>
                                                            <Input defaultValue={selectedMetricRow.name} />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Description</Label>
                                                            <Input defaultValue={selectedMetricRow.description} />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Synonyms</Label>
                                                            <Input placeholder="e.g., revenue, income, sales (comma separated)" defaultValue={selectedMetricRow.synonyms} />
                                                            <div className="text-xs text-gray-500">Enter synonyms separated by commas to help users find this formula</div>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Category</Label>
                                                            <Select defaultValue={selectedMetricRow.category.toLowerCase()}>
                                                                <SelectTrigger className="h-9">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="marketing">Marketing</SelectItem>
                                                                    <SelectItem value="conversion">Conversion</SelectItem>
                                                                    <SelectItem value="retention">Retention</SelectItem>
                                                                    <SelectItem value="engagement">Engagement</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Formula</Label>
                                                            <Textarea defaultValue={selectedMetricRow.formula} className="min-h-[140px]" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sticky bottom-0 z-10 bg-white border-t px-4 py-4 sm:px-6 flex items-center justify-end gap-3">
                                                    <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setDrawerOpen(false)}>Cancel</button>
                                                    <Button className="h-9 bg-black text-white hover:bg-gray-800">Save</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 