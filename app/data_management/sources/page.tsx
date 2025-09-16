"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import TopDashboard from "@/components/top-dashboard"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Transition } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/20/solid"


export default function SourcesPage() {
    const router = useRouter()
    const [showInfoPanel, setShowInfoPanel] = useState(true)
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedSource, setSelectedSource] = useState<{ name: string; description: string } | null>(null)
    const [addDrawerOpen, setAddDrawerOpen] = useState(false)
    const [selectedNewSource, setSelectedNewSource] = useState<string | null>(null)
    const [addStep, setAddStep] = useState<1 | 2 | 3>(1)

    // Step 3 selections
    const [selectedAccount, setSelectedAccount] = useState("Default Account")
    const [selectedTimezone, setSelectedTimezone] = useState("Australia/Sydney")
    const [selectedCurrency, setSelectedCurrency] = useState("AUD")

    // Custom connections
    const [selectedCustomSource, setSelectedCustomSource] = useState<string | null>(null)
    const [requestDialogOpen, setRequestDialogOpen] = useState(false)
    const [requestText, setRequestText] = useState("")
    const [customOpen, setCustomOpen] = useState(false)
    const [availableOpen, setAvailableOpen] = useState(true)

    // Drawer mode: default add flow or request custom connection
    const [drawerMode, setDrawerMode] = useState<'add' | 'requestCustom'>('add')

    // Save toast visibility
    const [showSaveToast, setShowSaveToast] = useState(false)

    // Force narrow layout on this page
    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    // Read query params to open add drawer on step 3
    useEffect(() => {
        if (typeof window === "undefined") return
        const params = new URLSearchParams(window.location.search)
        const add = params.get("add")
        const step = params.get("step")
        const s = params.get("s")
        if (add === "1") {
            setAddDrawerOpen(true)
            setAddStep(step === "3" ? 3 : step === "2" ? 2 : 1)
            if (s) setSelectedNewSource(s)
        }
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
            name: "Context",
            href: "/data_management/context",
        },

    ]

    const sources = [
        { name: "Mixpanel", description: "Piri EU", status: "ACTIVE", lastRun: "about 7 hours", logo: "/placeholder-logo.svg" },
        { name: "Google Ads", description: "Piri Red (611-695-6497)", status: "ACTIVE", lastRun: "6 days", logo: "/placeholder-logo.svg" },
        { name: "Microsoft Ads", description: "Growth Analytics and Marketing (139090368)", status: "INCOMPLETE", lastRun: "-", logo: "/placeholder-logo.svg" },
    ]

    const selectableSources = [
        { name: "Google Ads", logo: "/placeholder-logo.svg" },
        { name: "Meta Ads", logo: "/placeholder-logo.svg" },
        { name: "Microsoft Ads", logo: "/placeholder-logo.svg" },
        { name: "TikTok Ads", logo: "/placeholder-logo.svg" },
        { name: "Google Analytics", logo: "/placeholder-logo.svg" },
        { name: "Mixpanel", logo: "/placeholder-logo.svg" },
        { name: "Stripe", logo: "/placeholder-logo.svg" },
        { name: "Shopify", logo: "/placeholder-logo.svg" },
    ]

    const customSources = [
        "AdRoll",
        "Apple Search Ads",
        "Reddit Ads",
        "Amplitude",
        "Google Search Console",
        "YouTube Analytics",
        "Google Flights",
        "Google Hotels",
        "Active Campaign",
        "Customer.io",
        "Hubspot",
        "Klavio",
        "SalesForce",
        "Other",
    ]

    const handleRowClick = (source: { name: string; description: string }) => {
        setSelectedSource(source)
        setDrawerOpen(true)
    }

    const goAuthorize = () => {
        const query = new URLSearchParams()
        if (selectedNewSource) query.set("s", selectedNewSource)
        router.push(`/authorize-connection?${query.toString()}`)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Double Layered Menu Component */}
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Sources"
            />

            <HeaderFilter showFilters={false} actionLabel="Add Source" forceNarrowLayout showMenu={false} useActionDialog={false} onActionClick={() => { setSelectedNewSource(null); setAddStep(1); setDrawerMode('add'); setAddDrawerOpen(true) }} />

            <div
                className="px-6 pt-24 pb-6"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >

                {/* Page Content */}
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

                    {/* Dashboard */}
                    <div className="px-4 sm:px-6 lg:px-8">
                        <TopDashboard />
                    </div>

                    {/* Data Sources Table - Simple in card */}
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg">
                                        <table className="relative min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Description
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Last Run
                                                    </th>
                                                    <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6">
                                                        <span className="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {sources.map((source) => (
                                                    <tr key={source.name} className="cursor-pointer" onClick={() => handleRowClick(source)}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            <div className="flex items-center gap-2">
                                                                <img src={source.logo} alt="logo" className="h-5 w-5 rounded-sm" />
                                                                <span>{source.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{source.description}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                            {source.status === "ACTIVE" ? (
                                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-200">
                                                                    <svg viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4"><path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0L3.296 9.48a1 1 0 111.414-1.414l3.03 3.03 6.536-6.536a1 1 0 011.428 0z" clipRule="evenodd" /></svg>
                                                                    ACTIVE
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-200">
                                                                    INCOMPLETE
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{source.lastRun}</td>
                                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <button
                                                                type="button"
                                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRowClick(source) }}
                                                                className="inline-flex items-center text-gray-500 hover:text-gray-700"
                                                                aria-label={`Open ${source.name}`}
                                                            >
                                                                <img src="/New-chat.svg" alt="" className="h-4 w-4" />
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

                    {/* Right-side Drawer with backdrop */}
                    {drawerOpen && (
                        <div className="relative z-[10000001]">
                            {/* Backdrop */}
                            <div className="fixed inset-0 z-[10000000] bg-gray-500/75" onClick={() => setDrawerOpen(false)} />

                            <div className="fixed inset-0 z-[10000002] overflow-hidden">
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                        <div className="pointer-events-auto relative w-screen max-w-4xl transform transition duration-500 ease-in-out translate-x-0">
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
                                                <div className="sticky top-0 z-10 bg-white px-4 py-6 sm:px-6 border-b">
                                                    <h2 className="text-base font-semibold text-gray-900">{selectedSource?.name ?? "Source"}</h2>
                                                    <p className="text-sm text-gray-600">{selectedSource?.description}</p>
                                                </div>
                                                <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
                                                    {selectedSource?.name === "Mixpanel" ? (
                                                        <>
                                                            {/* Project Details header */}
                                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                                <img src="/placeholder-logo.svg" className="h-5 w-5" alt="Mixpanel" />
                                                                <span>Last Updated: February 20, 2025 at 10:31:22 PM GMT+11</span>
                                                                <span className="ml-auto inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200">Disabled</span>
                                                            </div>

                                                            <div className="grid gap-6 md:grid-cols-2">
                                                                <div className="space-y-2 md:col-span-2">
                                                                    <div className="text-sm font-semibold text-gray-900">Project Details</div>
                                                                    <p className="text-sm text-gray-600">Enter your project details.</p>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <label className="text-sm text-gray-700">Project Name</label>
                                                                    <input className="border rounded px-3 py-2" defaultValue="Piri EU" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="text-sm text-gray-700">Project ID</label>
                                                                    <input className="border rounded px-3 py-2" defaultValue="3266709" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="text-sm text-gray-700">Data Residency</label>
                                                                    <select className="border rounded px-3 py-2"><option>EU</option><option>US</option></select>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="text-sm text-gray-700">Project Timezone</label>
                                                                    <select className="border rounded px-3 py-2"><option>Australia/Sydney</option></select>
                                                                </div>
                                                                <div className="space-y-2 md:col-span-2">
                                                                    <label className="text-sm text-gray-700">Project Token</label>
                                                                    <input className="border rounded px-3 py-2 w-full" defaultValue="0809ada874d7c9b18413f2511d3e2527" />
                                                                </div>

                                                                <div className="space-y-2 md:col-span-2 pt-4">
                                                                    <div className="text-sm font-semibold text-gray-900">Service Account</div>
                                                                    <p className="text-sm text-gray-600">Create a service account with admin privileges for Vendo.</p>
                                                                </div>
                                                                <div className="space-y-2 md:col-span-2">
                                                                    <label className="text-sm text-gray-700">Service Account User Name</label>
                                                                    <input className="border rounded px-3 py-2 w-full" defaultValue="gam_account_global.88e164.mp-service-account" />
                                                                </div>
                                                                <div className="space-y-2 md:col-span-2">
                                                                    <label className="text-sm text-gray-700">Service Account Secret</label>
                                                                    <input className="border rounded px-3 py-2 w-full" defaultValue="••••••••••••••••••••••••••••" />
                                                                </div>

                                                                <div className="space-y-2 pt-4">
                                                                    <div className="text-sm font-semibold text-gray-900">Project Currency</div>
                                                                    <select className="border rounded px-3 py-2"><option>AUD - Australian Dollar</option></select>
                                                                </div>
                                                                <div className="space-y-2 pt-4 md:col-span-2">
                                                                    <div className="text-sm font-semibold text-gray-900">Data Quality Monitoring</div>
                                                                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                                                        <input type="checkbox" className="h-4 w-4" />
                                                                        This Mixpanel project was created before 2023-01-11
                                                                    </label>
                                                                </div>

                                                                <div className="md:col-span-2 flex items-center gap-3 pt-4">
                                                                    <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setDrawerOpen(false)}>Cancel</button>
                                                                    <button className="rounded-md bg-black px-3 py-2 text-sm text-white" onClick={() => setDrawerOpen(false)}>Save</button>
                                                                </div>

                                                                <div className="md:col-span-2 text-xs text-gray-500 pt-2">
                                                                    Created at: February 20, 2025 at 10:31:22 PM GMT+11 · App ID: mixpanel_6c88ab89d
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="grid gap-2">
                                                                <label className="text-sm text-gray-700">Account Name</label>
                                                                <input className="border rounded px-3 py-2" defaultValue={selectedSource?.description} />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <label className="text-sm text-gray-700">Timezone</label>
                                                                <input className="border rounded px-3 py-2" defaultValue="Australia/Sydney" />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <label className="text-sm text-gray-700">Currency</label>
                                                                <input className="border rounded px-3 py-2" defaultValue="AUD" />
                                                            </div>
                                                            <div className="pt-2 flex items-center gap-3">
                                                                <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setDrawerOpen(false)}>Cancel</button>
                                                                <button className="rounded-md bg-black px-3 py-2 text-sm text-white" onClick={() => setDrawerOpen(false)}>Save</button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add Source Drawer */}
                    {addDrawerOpen && (
                        <div className="relative z-[10000001]">
                            {/* Backdrop */}
                            <div className="fixed inset-0 z-[10000000] bg-gray-500/75" onClick={() => setAddDrawerOpen(false)} />

                            <div className="fixed inset-0 z-[10000002] overflow-hidden">
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                        <div className="pointer-events-auto relative w-screen max-w-4xl transform transition duration-500 ease-in-out translate-x-0">
                                            {/* Outside close button */}
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setAddDrawerOpen(false)}
                                                    className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <X className="h-6 w-6" />
                                                </button>
                                            </div>
                                            <div className="relative flex h-full flex-col bg-white shadow-xl">
                                                <div className="sticky top-0 z-10 bg-white border-b h-[61px]">
                                                    <div className="px-4 h-[61px] flex items-center sm:px-6">
                                                        <h2 className="text-base font-semibold text-gray-900">{drawerMode === 'requestCustom' ? 'Request Custom Connection' : 'Add Source'}</h2>
                                                    </div>
                                                </div>

                                                <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
                                                    {drawerMode !== 'requestCustom' && (<ol className="flex items-center gap-4 text-sm">
                                                        <li className={`flex items-center gap-2 ${addStep >= 1 ? "text-gray-900" : "text-gray-400"}`}>
                                                            <span className={`flex h-6 w-6 items-center justify-center rounded-full ${addStep >= 1 ? "bg-black text-white" : "border"}`}>1</span>
                                                            <span className="font-medium">Select Source</span>
                                                        </li>
                                                        <li className={`flex items-center gap-2 ${addStep >= 2 ? "text-gray-900" : "text-gray-400"}`}>
                                                            <span className={`flex h-6 w-6 items-center justify-center rounded-full ${addStep >= 2 ? "bg-black text-white" : "border"}`}>2</span>
                                                            <span>Authorize Connection</span>
                                                        </li>
                                                        <li className={`flex items-center gap-2 ${addStep >= 3 ? "text-gray-900" : "text-gray-400"}`}>
                                                            <span className={`flex h-6 w-6 items-center justify-center rounded-full ${addStep >= 3 ? "bg-black text-white" : "border"}`}>3</span>
                                                            <span>Configure</span>
                                                        </li>
                                                    </ol>)}

                                                    {addStep === 1 && (
                                                        <div className="space-y-6">
                                                            {drawerMode === 'requestCustom' ? (
                                                                <>
                                                                    {/* Dropdown of requested custom connections */}
                                                                    <div>

                                                                        <Menu as="div" className="relative inline-block">
                                                                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                                {selectedCustomSource || 'Select a connection'}
                                                                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                                                            </MenuButton>
                                                                            <MenuItems
                                                                                transition
                                                                                className="absolute left-0 z-[10000003] mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg outline outline-1 outline-black/5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                                            >
                                                                                <div className="py-1 max-h-64 overflow-auto">
                                                                                    {customSources.map(opt => (
                                                                                        <MenuItem key={opt}>
                                                                                            <button
                                                                                                onClick={() => setSelectedCustomSource(opt)}
                                                                                                className="group flex w-full items-center h-[60px] px-4 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                                                            >
                                                                                                <img src="/placeholder-logo.svg" alt="logo" className="mr-3 size-5 rounded group-data-[focus]:opacity-80" />
                                                                                                {opt}
                                                                                            </button>
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </div>
                                                                            </MenuItems>
                                                                        </Menu>
                                                                    </div>

                                                                    {/* Request form content */}
                                                                    <div className="space-y-3">
                                                                        <div className="text-base font-semibold text-gray-900">{selectedCustomSource ? `${selectedCustomSource} Connection` : `Custom Connection`}</div>
                                                                        <p className="text-sm text-gray-600">This integration is only available on request. Please let us know your use cases or data requirements below.</p>
                                                                        <div>
                                                                            <label className="sr-only">Describe your use cases</label>
                                                                            <textarea
                                                                                className="w-full min-h-[160px] rounded-md border px-3 py-2 text-sm"
                                                                                placeholder="I would like to..."
                                                                                value={requestText}
                                                                                onChange={(e) => setRequestText(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <p className="text-sm text-gray-600">Estimated go-live duration for this integration is <span className="font-semibold">5–10 business days</span>.</p>
                                                                        <div className="flex items-center justify-end gap-3 pt-2">
                                                                            <a href="#" className="text-sm text-gray-600 hover:underline" onClick={(e) => { e.preventDefault(); setDrawerMode('add'); setCustomOpen(false); }}>Cancel</a>
                                                                            <button className={`rounded-md px-3 py-2 text-sm text-white ${(selectedCustomSource && requestText.trim().length > 0) ? 'bg-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'}`} disabled={!(selectedCustomSource && requestText.trim().length > 0)} onClick={() => { setRequestDialogOpen(true) }}>Send Request</button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                        {selectableSources.map((s) => {
                                                                            const selected = selectedNewSource === s.name
                                                                            return (
                                                                                <button
                                                                                    key={s.name}
                                                                                    type="button"
                                                                                    onClick={() => setSelectedNewSource(s.name)}
                                                                                    className={`relative flex h-[60px] items-center gap-3 rounded-md border px-3 text-left hover:bg-gray-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-gray-300 ${selected ? "ring-2 ring-black border-black" : "border-gray-200"}`}
                                                                                    aria-pressed={selected}
                                                                                >
                                                                                    <img src={s.logo} alt="logo" className="h-6 w-6 rounded" />
                                                                                    <span className="text-sm font-medium text-gray-900">{s.name}</span>
                                                                                </button>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                    <div className="flex items-center justify-end gap-3">
                                                                        <a
                                                                            href="#"
                                                                            className="text-sm text-black hover:underline"
                                                                            onClick={(e) => { e.preventDefault(); setDrawerMode('requestCustom'); setCustomOpen(true); }}
                                                                        >
                                                                            Request Custom Connection
                                                                        </a>
                                                                        <button
                                                                            className={`rounded-md px-3 py-2 text-sm text-white ${selectedNewSource ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"}`}
                                                                            disabled={!selectedNewSource}
                                                                            onClick={goAuthorize}
                                                                        >
                                                                            Authorize Connection
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}

                                                            <div className="hidden divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow outline outline-1 outline-black/5">
                                                                <button type="button" onClick={() => { setCustomOpen(o => !o); if (!customOpen) setAvailableOpen(false) }} className="w-full text-left px-4 py-5 sm:px-6 flex items-center justify-between">
                                                                    <div className="text-sm font-semibold text-gray-900">Request Custom Connection</div>
                                                                    <span className="text-gray-400 text-xs">{customOpen ? "Hide" : "Show"}</span>
                                                                </button>
                                                                {customOpen && (
                                                                    <>
                                                                        <div className="px-4 py-5 sm:p-6">
                                                                            {requestDialogOpen ? (
                                                                                <div className="space-y-3">
                                                                                    <div className="text-base font-semibold text-gray-900">{selectedCustomSource} Connection</div>
                                                                                    <p className="text-sm text-gray-600">This integration is only available on request. Please let us know your use cases or data requirements below.</p>
                                                                                    <div>
                                                                                        <label className="sr-only">Describe your use cases</label>
                                                                                        <textarea
                                                                                            className="w-full min-h-[160px] rounded-md border px-3 py-2 text-sm"
                                                                                            placeholder="I would like to..."
                                                                                            value={requestText}
                                                                                            onChange={(e) => setRequestText(e.target.value)}
                                                                                        />
                                                                                    </div>
                                                                                    <p className="text-sm text-gray-600">Estimated go-live duration for this integration is <span className="font-semibold">5–10 business days</span>.</p>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                                    {customSources.map((name) => {
                                                                                        const selected = selectedCustomSource === name
                                                                                        return (
                                                                                            <button
                                                                                                key={name}
                                                                                                type="button"
                                                                                                onClick={() => setSelectedCustomSource(name)}
                                                                                                className={`relative flex items-center gap-3 rounded-md border px-3 py-3 text-left hover:bg-gray-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-gray-300 ${selected ? "ring-2 ring-black border-black" : "border-gray-200"}`}
                                                                                                aria-pressed={selected}
                                                                                            >
                                                                                                <img src="/placeholder-logo.svg" alt="logo" className="h-6 w-6 rounded" />
                                                                                                <span className="text-sm font-medium text-gray-900">{name}</span>
                                                                                            </button>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="px-4 py-4 sm:px-6 flex items-center justify-end gap-3">
                                                                            {requestDialogOpen ? (
                                                                                <>
                                                                                    <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setRequestDialogOpen(false)}>Cancel</button>
                                                                                    <button className="rounded-md bg-black px-3 py-2 text-sm text-white" onClick={() => setRequestDialogOpen(false)}>Send Request</button>
                                                                                </>
                                                                            ) : (
                                                                                <button
                                                                                    className={`rounded-md px-3 py-2 text-sm text-white ${selectedCustomSource ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"}`}
                                                                                    disabled={!selectedCustomSource}
                                                                                    onClick={() => { setCustomOpen(true); setAvailableOpen(false); setRequestDialogOpen(true) }}
                                                                                >
                                                                                    Request Integration
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Step 3: Configuration */}
                                                    {addStep === 3 && (
                                                        <div className="space-y-4">
                                                            <div className="text-base font-semibold text-gray-900">{selectedNewSource ? `${selectedNewSource} Settings` : `Source Settings`}</div>
                                                            <div className="grid gap-4 grid-cols-1 max-w-md">
                                                                <div className="space-y-1">
                                                                    <label className="text-sm text-gray-700">Account</label>
                                                                    <Menu as="div" className="relative inline-block w-full">
                                                                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                            {selectedAccount}
                                                                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                                                        </MenuButton>
                                                                        <MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline outline-1 outline-black/5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-in">
                                                                            <div className="py-1">
                                                                                {['Default Account', 'Account A', 'Account B'].map(opt => (
                                                                                    <MenuItem key={opt}>
                                                                                        <button onClick={() => setSelectedAccount(opt)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                                                                                            {opt}
                                                                                        </button>
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </div>
                                                                        </MenuItems>
                                                                    </Menu>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <label className="text-sm text-gray-700">Timezone</label>
                                                                    <Menu as="div" className="relative inline-block w-full">
                                                                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                            {selectedTimezone}
                                                                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                                                        </MenuButton>
                                                                        <MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline outline-1 outline-black/5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-in">
                                                                            <div className="py-1">
                                                                                {['Australia/Sydney', 'America/Los_Angeles', 'Europe/Amsterdam'].map(opt => (
                                                                                    <MenuItem key={opt}>
                                                                                        <button onClick={() => setSelectedTimezone(opt)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                                                                                            {opt}
                                                                                        </button>
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </div>
                                                                        </MenuItems>
                                                                    </Menu>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <label className="text-sm text-gray-700">Currency</label>
                                                                    <Menu as="div" className="relative inline-block w-full">
                                                                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                            {selectedCurrency}
                                                                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                                                        </MenuButton>
                                                                        <MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline outline-1 outline-black/5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-in">
                                                                            <div className="py-1">
                                                                                {['AUD', 'USD', 'EUR'].map(opt => (
                                                                                    <MenuItem key={opt}>
                                                                                        <button onClick={() => setSelectedCurrency(opt)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                                                                                            {opt}
                                                                                        </button>
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </div>
                                                                        </MenuItems>
                                                                    </Menu>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Footer */}
                                                <div className="sticky bottom-0 z-10 bg-white border-t px-4 py-4 sm:px-6 flex items-center justify-end gap-3">
                                                    {addStep === 1 ? null : addStep === 3 ? (
                                                        <>
                                                            <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setAddDrawerOpen(false)}>Cancel</button>
                                                            <button className="rounded-md bg-black px-3 py-2 text-sm text-white" onClick={() => { setShowSaveToast(true); setAddDrawerOpen(false) }}>Save</button>
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Global notification live region, anchored here */}
                    <div
                        aria-live="assertive"
                        className="pointer-events-none fixed inset-0 z-[10000050] flex items-end px-4 py-6 sm:items-start sm:p-6"
                    >
                        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <Transition show={showSaveToast}>
                                <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg outline outline-1 outline-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
                                    <div className="p-4">
                                        <div className="flex items-start">
                                            <div className="shrink-0">
                                                <CheckCircleIcon aria-hidden="true" className="size-6 text-green-400" />
                                            </div>
                                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                                <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                                                <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p>
                                            </div>
                                            <div className="ml-4 flex shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() => { setShowSaveToast(false) }}
                                                    className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <XMarkIcon aria-hidden="true" className="size-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
