"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import TopDashboard from "@/components/top-dashboard"

export default function SourcesPage() {
    const router = useRouter()
    const [showInfoPanel, setShowInfoPanel] = useState(true)
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedSource, setSelectedSource] = useState<{ name: string; description: string } | null>(null)

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

    const sources = [
        { name: "Mixpanel", description: "Piri EU", status: "ACTIVE", lastRun: "about 7 hours", logo: "/placeholder-logo.svg" },
        { name: "Google Ads", description: "Piri Red (611-695-6497)", status: "ACTIVE", lastRun: "6 days", logo: "/placeholder-logo.svg" },
        { name: "Microsoft Ads", description: "Growth Analytics and Marketing (139090368)", status: "INCOMPLETE", lastRun: "-", logo: "/placeholder-logo.svg" },
    ]

    const handleRowClick = (source: { name: string; description: string }) => {
        setSelectedSource(source)
        setDrawerOpen(true)
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

            <HeaderFilter showFilters={false} actionLabel="Add Source" forceNarrowLayout />

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
                </div>
            </div>
        </div>
    )
}
