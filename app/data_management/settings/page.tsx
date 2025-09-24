"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import SingleLayerMenu from "@/components/single-layer-menu"
import { useEffect, useMemo, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

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

    // Selected touchpoints state
    const [selectedTouchpoints, setSelectedTouchpoints] = useState<Set<string>>(new Set())


    // Time period settings state
    const [timePeriodSettings, setTimePeriodSettings] = useState({
        startOfWeek: "Monday",
        startOfQuarter: "January",
        startOfFinancialYear: "January"
    })

    // General settings state
    const [timezone, setTimezone] = useState("Australia/Sydney")
    const [reportingCurrency, setReportingCurrency] = useState("AUD")
    const [originalGeneralValues, setOriginalGeneralValues] = useState({
        timezone: "Australia/Sydney",
        reportingCurrency: "AUD"
    })
    const [hasGeneralChanges, setHasGeneralChanges] = useState(false)

    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    // Check for general settings changes
    useEffect(() => {
        const changed = timezone !== originalGeneralValues.timezone || reportingCurrency !== originalGeneralValues.reportingCurrency
        setHasGeneralChanges(changed)
    }, [timezone, reportingCurrency, originalGeneralValues])

    // Save general settings handler
    const handleGeneralSave = () => {
        // Update original values to reflect saved state
        setOriginalGeneralValues({
            timezone,
            reportingCurrency
        })
        setHasGeneralChanges(false)
        // Here you would typically make an API call to save the settings
        console.log("Saving general settings:", { timezone, reportingCurrency })
    }

    const lookbackPercent = (lookbackDays / 90) * 100

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

    // Touchpoint helpers
    const availableTouchpoints = useMemo(() => {
        return excludedTouchpoints.filter(tp => !selectedTouchpoints.has(tp.event))
    }, [excludedTouchpoints, selectedTouchpoints])

    const handleSelectTouchpoint = (event: string) => {
        setSelectedTouchpoints(prev => new Set([...prev, event]))
    }

    const handleRemoveTouchpoint = (event: string) => {
        setSelectedTouchpoints(prev => {
            const newSet = new Set(prev)
            newSet.delete(event)
            return newSet
        })
    }

    const secondaryPanelItems = [
        { name: "Quality", href: "/data_management/quality" },
        { name: "Sources", href: "/data_management/sources" },
        { name: "Context", href: "/data_management/context" },
        { name: "Metrics", href: "/data_management/metrics" },
        { name: "Events", href: "/data_management/event" },
        { name: "Customer Properties", href: "/data_management/customer" },
        { name: "Channel Grouping", href: "/data_management/channel-grouping" },
        { name: "Reporting Settings", href: "/data_management/settings" },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <SingleLayerMenu forceState="narrow" />
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Reporting Settings"
            />

            <HeaderFilter
                title="Reporting Settings"
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
                {/* Time Period Settings */}
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="text-gray-900 text-lg font-semibold">Time Period Settings</div>
                        <div className="text-gray-500 text-sm/6 mt-1 flex items-center gap-2">
                            <img src="/Definition.svg" alt="" className="h-4 w-4" />
                            <span className="font-normal">Align week, quarter, and year settings so AI follows your company's reporting cadence</span>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="space-y-6">
                            {/* Start of Week */}
                            <div className="flex items-center gap-3">
                                <label htmlFor="start-of-week" className="text-sm font-medium text-gray-700 w-40">
                                    Start of Week
                                </label>
                                <Select
                                    value={timePeriodSettings.startOfWeek}
                                    onValueChange={(value) => setTimePeriodSettings(prev => ({ ...prev, startOfWeek: value }))}
                                >
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Monday">Monday</SelectItem>
                                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                                        <SelectItem value="Thursday">Thursday</SelectItem>
                                        <SelectItem value="Friday">Friday</SelectItem>
                                        <SelectItem value="Saturday">Saturday</SelectItem>
                                        <SelectItem value="Sunday">Sunday</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Start of Quarter */}
                            <div className="flex items-center gap-3">
                                <label htmlFor="start-of-quarter" className="text-sm font-medium text-gray-700 w-40">
                                    Start of Quarter
                                </label>
                                <Select
                                    value={timePeriodSettings.startOfQuarter}
                                    onValueChange={(value) => setTimePeriodSettings(prev => ({ ...prev, startOfQuarter: value }))}
                                >
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="January">January</SelectItem>
                                        <SelectItem value="February">February</SelectItem>
                                        <SelectItem value="March">March</SelectItem>
                                        <SelectItem value="April">April</SelectItem>
                                        <SelectItem value="May">May</SelectItem>
                                        <SelectItem value="June">June</SelectItem>
                                        <SelectItem value="July">July</SelectItem>
                                        <SelectItem value="August">August</SelectItem>
                                        <SelectItem value="September">September</SelectItem>
                                        <SelectItem value="October">October</SelectItem>
                                        <SelectItem value="November">November</SelectItem>
                                        <SelectItem value="December">December</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Start of Financial Year */}
                            <div className="flex items-center gap-3">
                                <label htmlFor="start-of-financial-year" className="text-sm font-medium text-gray-700 w-40">
                                    Start of Financial Year
                                </label>
                                <Select
                                    value={timePeriodSettings.startOfFinancialYear}
                                    onValueChange={(value) => setTimePeriodSettings(prev => ({ ...prev, startOfFinancialYear: value }))}
                                >
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="January">January</SelectItem>
                                        <SelectItem value="February">February</SelectItem>
                                        <SelectItem value="March">March</SelectItem>
                                        <SelectItem value="April">April</SelectItem>
                                        <SelectItem value="May">May</SelectItem>
                                        <SelectItem value="June">June</SelectItem>
                                        <SelectItem value="July">July</SelectItem>
                                        <SelectItem value="August">August</SelectItem>
                                        <SelectItem value="September">September</SelectItem>
                                        <SelectItem value="October">October</SelectItem>
                                        <SelectItem value="November">November</SelectItem>
                                        <SelectItem value="December">December</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* General Settings */}
                <div className="mt-6">
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="text-gray-900 text-lg font-semibold">Time and Currency</div>
                            <div className="text-gray-500 text-sm/6 mt-1 flex items-center gap-2">
                                <img src="/Definition.svg" alt="" className="h-4 w-4" />
                                <span className="font-normal">Align reporting with your local timezone and currency for accurate insights.</span>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-6">
                                {/* Timezone Field */}
                                <div>
                                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Timezone
                                    </label>
                                    <Select value={timezone} onValueChange={setTimezone}>
                                        <SelectTrigger className="w-full max-w-md">
                                            <SelectValue placeholder="Select timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                                            <SelectItem value="America/New_York">America/New_York</SelectItem>
                                            <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
                                            <SelectItem value="Europe/London">Europe/London</SelectItem>
                                            <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                                            <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                                            <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                                            <SelectItem value="UTC">UTC</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Reporting Currency Field */}
                                <div>
                                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                                        Reporting Currency
                                    </label>
                                    <Select value={reportingCurrency} onValueChange={setReportingCurrency}>
                                        <SelectTrigger className="w-full max-w-md">
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AUD">AUD (Australian Dollar)</SelectItem>
                                            <SelectItem value="USD">USD (US Dollar)</SelectItem>
                                            <SelectItem value="EUR">EUR (Euro)</SelectItem>
                                            <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                                            <SelectItem value="JPY">JPY (Japanese Yen)</SelectItem>
                                            <SelectItem value="CAD">CAD (Canadian Dollar)</SelectItem>
                                            <SelectItem value="CHF">CHF (Swiss Franc)</SelectItem>
                                            <SelectItem value="CNY">CNY (Chinese Yuan)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Attribution Model */}
                <div className="mt-6 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
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
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-black checked:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
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
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-black checked:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
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
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-black checked:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
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
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-black checked:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
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
                        <div className="text-gray-900 text-lg font-semibold">Lookback Window</div>
                        <div className="text-gray-500 text-sm/6 mt-1 flex items-center gap-2">
                            <img src="/Definition.svg" alt="" className="h-4 w-4" />
                            <span className="font-normal">Use shorter windows for everyday purchases, longer ones when decisions take more time.</span>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <fieldset aria-label="Lookback window">
                            <div className="space-y-4 max-w-md">
                                <label htmlFor="lookback_days" className="block text-sm/6 font-medium text-gray-900 whitespace-nowrap">Days to attribute conversions post-interaction</label>
                                <div className="relative pt-6">
                                    <div
                                        className="absolute -top-1 -translate-x-1/2 select-none"
                                        style={{ left: `${lookbackPercent}%` }}
                                    >
                                        <div className="px-1 text-sm font-semibold text-gray-800 whitespace-nowrap">
                                            {lookbackDays} {lookbackDays === 1 ? "Day" : "Days"}
                                        </div>
                                    </div>
                                    <input
                                        id="lookback_days"
                                        type="range"
                                        min={0}
                                        max={90}
                                        value={lookbackDays}
                                        onChange={(e) => setLookbackDays(parseInt((e.target as HTMLInputElement).value, 10))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>0</span>
                                    <span>90</span>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="text-gray-900 text-lg font-semibold">Excluded Touch Points</div>
                            <div className="text-gray-500 text-sm/6 mt-1 flex items-center gap-2">
                                <img src="/Definition.svg" alt="" className="h-4 w-4" />
                                <span className="font-normal">Improve accuracy by focusing only on meaningful user interactions.</span>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-6">
                                {/* Select Dropdown */}
                                <div>
                                    <Select value="" onValueChange={(value) => handleSelectTouchpoint(value)}>
                                        <SelectTrigger className="w-80">
                                            <SelectValue placeholder="Select Touchpoints to Exclude" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableTouchpoints.map((tp) => (
                                                <SelectItem key={tp.id} value={tp.event}>
                                                    <div className="flex flex-col items-start">
                                                        <span className="font-medium">{tp.event}</span>
                                                        <span className="text-xs text-gray-500">{tp.source}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Selected touchpoints chips */}
                                {selectedTouchpoints.size > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from(selectedTouchpoints).map((event) => {
                                            const touchpoint = excludedTouchpoints.find(tp => tp.event === event)
                                            return (
                                                <Badge key={event} className="flex items-center gap-2 px-3 py-1 bg-black text-white hover:bg-gray-800">
                                                    <span>{touchpoint?.event} - {touchpoint?.source}</span>
                                                    <button
                                                        onClick={() => handleRemoveTouchpoint(event)}
                                                        className="hover:bg-gray-600 rounded-full p-0.5"
                                                    >
                                                        <X className="h-3 w-3 text-white" />
                                                    </button>
                                                </Badge>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}


