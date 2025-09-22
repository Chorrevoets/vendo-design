"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import SingleLayerMenu from "@/components/single-layer-menu"
import { useEffect, useMemo, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function DataManagementSettingsPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [lookbackDays, setLookbackDays] = useState(30)
    const [tpSearchOpen, setTpSearchOpen] = useState(false)
    const [tpSearchDraft, setTpSearchDraft] = useState("")
    const [tpSearchQuery, setTpSearchQuery] = useState("")
    const [sourceFilterOpen, setSourceFilterOpen] = useState(false)
    const [selectedSourcesDraft, setSelectedSourcesDraft] = useState<Set<string>>(new Set())
    const [appliedSources, setAppliedSources] = useState<string[]>([])
    const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set())

    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    const lookbackPercent = ((lookbackDays - 1) / 29) * 100

    const excludedTouchpoints = useMemo(() => ([
        { id: 1, event: "Check Out Conversion", source: "Shopify" },
        { id: 2, event: "Winback campaign conversion", source: "Meta" },
        { id: 3, event: "Product detail engagement", source: "Meta" },
        { id: 4, event: "Check out completion", source: "Shopify" },
        { id: 5, event: "Cart page views", source: "Google" },
        { id: 6, event: "Time to first order", source: "Shopify" },
    ]), [])

    const uniqueSources = useMemo(() => Array.from(new Set(excludedTouchpoints.map(r => r.source))), [excludedTouchpoints])

    const filteredRows = useMemo(() => {
        return excludedTouchpoints.filter(r => {
            const matchesSearch = tpSearchQuery.trim() === "" || r.event.toLowerCase().includes(tpSearchQuery.trim().toLowerCase())
            const matchesSource = appliedSources.length === 0 || appliedSources.includes(r.source)
            return matchesSearch && matchesSource
        })
    }, [excludedTouchpoints, tpSearchQuery, appliedSources])

    const secondaryPanelItems = [
        { name: "Quality", href: "/data_management/quality" },
        { name: "Sources", href: "/data_management/sources" },
        { name: "Metrics", href: "/data_management/metrics" },
        { name: "Events", href: "/data_management/event" },
        { name: "Customer Properties", href: "/data_management/customer" },
        { name: "Channel Grouping", href: "/data_management/channel-grouping" },
        { name: "Attribution Settings", href: "/data_management/settings" },
        { name: "Context", href: "/data_management/context" },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <SingleLayerMenu forceState="narrow" />
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Attribution Settings"
            />

            <HeaderFilter
                title="Attribution Settings"
                showFilters={false}
                forceNarrowLayout
                showMenu={false}
                useActionDialog={false}
                showActionButton={false}
                leftOffset={isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)"}
            />

            <div
                className="px-6 pt-24 pb-6"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)",
                }}
            >
                {/* Attribution Model */}
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="text-gray-900 text-lg font-semibold">Attribution Model</div>
                        <div className="text-gray-500 text-sm/6 mt-1 flex items-center gap-2">
                            <img src="/Definition.svg" alt="" className="h-4 w-4" />
                            <span>You can override the default by asking the co-pilot to use another attribution model.</span>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <fieldset aria-label="Attribution Model">
                            <div className="space-y-5">
                                <label htmlFor="last_click" className="relative flex items-start cursor-pointer select-none">
                                    <div className="flex h-6 items-center">
                                        <input
                                            defaultChecked={true}
                                            id="last_click"
                                            name="attribution"
                                            type="radio"
                                            aria-describedby={`last_click-description`}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm/6">
                                        <span className="font-medium text-gray-900">
                                            Last Click Attribution
                                        </span>
                                        <p id={`last_click-description`} className="text-gray-500">
                                            The <span className="font-semibold">most recent marketing interaction</span> before a conversion.
                                        </p>
                                    </div>
                                </label>

                                <label htmlFor="first_click" className="relative flex items-start cursor-pointer select-none">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="first_click"
                                            name="attribution"
                                            type="radio"
                                            aria-describedby={`first_click-description`}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm/6">
                                        <span className="font-medium text-gray-900">
                                            First Click Attribution
                                        </span>
                                        <p id={`first_click-description`} className="text-gray-500">
                                            The <span className="font-semibold">first marketing interaction</span> recorded for a user before a conversion.
                                        </p>
                                    </div>
                                </label>

                                <label htmlFor="linear" className="relative flex items-start cursor-pointer select-none">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="linear"
                                            name="attribution"
                                            type="radio"
                                            aria-describedby={`linear-description`}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm/6">
                                        <span className="font-medium text-gray-900">
                                            Linear Attribution
                                        </span>
                                        <p id={`linear-description`} className="text-gray-500">
                                            <span className="font-semibold">Equal credit</span> is assigned to <span className="font-semibold">all marketing interactions</span> in the user journey before a conversion.
                                        </p>
                                    </div>
                                </label>

                                <label htmlFor="participation" className="relative flex items-start cursor-pointer select-none">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="participation"
                                            name="attribution"
                                            type="radio"
                                            aria-describedby={`participation-description`}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm/6">
                                        <span className="font-medium text-gray-900">
                                            Participation Attribution
                                        </span>
                                        <p id={`participation-description`} className="text-gray-500">
                                            <span className="font-semibold">Full credit</span> is given to <span className="font-semibold">every marketing interaction</span> that participated in the conversion journey. (All touchpoints get 100% of the conversion.)
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </fieldset>
                    </div>
                </div>

                {/* Lookback window */}
                <div className="mt-6 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="text-gray-900 text-lg font-semibold">Lookback window</div>
                        <div className="text-gray-500 text-sm/6 mt-1 flex items-center gap-2">
                            <img src="/Definition.svg" alt="" className="h-4 w-4" />
                            <span className="font-normal">Set longer windows when decisions take time, shorter ones for quick buys.</span>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <fieldset aria-label="Lookback window">
                            <div className="space-y-4 max-w-md">
                                <label htmlFor="lookback_days" className="block text-sm/6 font-medium text-gray-900 whitespace-nowrap">Days to attribute conversions post-interaction</label>
                                <div className="relative pt-6">
                                    <div
                                        className="absolute -top-3 -translate-x-1/2 select-none"
                                        style={{ left: `${lookbackPercent}%` }}
                                    >
                                        <div className="px-1 text-sm font-semibold text-gray-800 whitespace-nowrap">
                                            {lookbackDays} {lookbackDays === 1 ? "Day" : "Days"}
                                        </div>
                                    </div>
                                    <input
                                        id="lookback_days"
                                        type="range"
                                        min={1}
                                        max={30}
                                        value={lookbackDays}
                                        onChange={(e) => setLookbackDays(parseInt((e.target as HTMLInputElement).value, 10))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>1</span>
                                    <span>30</span>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flow-root">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full py-2 align-middle">
                                <div className="overflow-hidden rounded-lg bg-white shadow outline outline-1 outline-black/5">
                                    <table className="relative min-w-full divide-y divide-gray-300 table-fixed">
                                        <colgroup>
                                            <col className="w-[5%]" />
                                            <col className="w-[65%]" />
                                            <col className="w-[30%]" />
                                        </colgroup>
                                        <thead className="bg-white">
                                            <tr>
                                                <th colSpan={3} className="h-[70px] py-3 pl-4 pr-3 text-left sm:pl-6 border-b border-gray-200">
                                                    <div className="text-gray-900 text-lg font-semibold">Excluded touch points</div>
                                                    <div className="text-gray-500 text-sm/6 mt-1 flex items-center gap-2">
                                                        <img src="/Definition.svg" alt="" className="h-4 w-4" />
                                                        <span className="font-normal">Improve accuracy by focusing only on meaningful user interactions.</span>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr className="bg-white">
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"></th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    <Popover open={tpSearchOpen} onOpenChange={setTpSearchOpen}>
                                                        <PopoverTrigger asChild>
                                                            <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                <span>Event</span>
                                                                <img src={tpSearchQuery.trim() !== "" ? "/Sort.svg" : "/Magnifer.svg"} alt="Search" className="h-4 w-4" />
                                                            </button>
                                                        </PopoverTrigger>
                                                        <PopoverContent align="start" className="w-72 p-3">
                                                            <div className="space-y-2">
                                                                <div className="relative">
                                                                    <img src="/Magnifer.svg" alt="" className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                                                                    <Input
                                                                        value={tpSearchDraft}
                                                                        onChange={(e) => setTpSearchDraft(e.target.value)}
                                                                        placeholder="Search events..."
                                                                        className="h-9 pl-8"
                                                                    />
                                                                </div>
                                                                <div className="pt-1 flex items-center gap-2">
                                                                    <Button
                                                                        variant="outline"
                                                                        className="h-9 flex-1"
                                                                        onClick={() => { setTpSearchQuery(""); setTpSearchDraft(""); setTpSearchOpen(false) }}
                                                                    >
                                                                        Clear
                                                                    </Button>
                                                                    <Button
                                                                        className="h-9 flex-1"
                                                                        onClick={() => { setTpSearchQuery(tpSearchDraft); setTpSearchOpen(false) }}
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
                                                                {uniqueSources.map((label) => {
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
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {filteredRows.map((row) => {
                                                const isSelected = selectedRowIds.has(row.id)
                                                return (
                                                    <tr key={row.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                                            <Checkbox
                                                                checked={isSelected}
                                                                onCheckedChange={(v) => {
                                                                    setSelectedRowIds(prev => {
                                                                        const next = new Set(prev)
                                                                        if (v) next.add(row.id); else next.delete(row.id)
                                                                        return next
                                                                    })
                                                                }}
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{row.event}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.source}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


