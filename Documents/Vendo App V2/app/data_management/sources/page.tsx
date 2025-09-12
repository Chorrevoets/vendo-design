"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function SourcesPage() {
    const router = useRouter()
    const [showInfoPanel, setShowInfoPanel] = useState(true)
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)

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

    const sources = [
        { name: "Google Ads", description: "Piri Red (611-695-6497)", status: "ACTIVE", lastRun: "6 days" },
        { name: "Microsoft Ads", description: "Growth Analytics and Marketing (139090368)", status: "INCOMPLETE", lastRun: "-" },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Double Layered Menu Component */}
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data Management"
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
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">Connect Your Data Sources</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Text Content - Takes up 2/3 of the space */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <p className="text-gray-600">
                                            Your growth insights are only as strong as the data behind them. With Vendo, you can unify your marketing, sales, and analytics data in one place — securely, seamlessly, and without the headaches of manual setup. No code required.
                                        </p>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">What are Data Sources?</h3>
                                            <p className="text-gray-600">
                                                Data Sources (sometimes called connections) are the integrations that let Vendo sync with your everyday platforms — like Google Ads, Facebook, Shopify, Mixpanel, and Google Analytics. By connecting them, you turn Vendo into your single source of truth.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Platform Icons - Takes up 1/3 of the space */}
                                    <div className="space-y-4">
                                        {/* Placeholder */}
                                        <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                                    <span className="text-gray-500 text-2xl">📊</span>
                                                </div>
                                                <p className="text-gray-500 text-sm">Platform icons will appear here</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-between items-center">
                                    <Button className="bg-black text-white hover:bg-gray-800">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add your first source
                                    </Button>
                                    <button
                                        onClick={() => setShowInfoPanel(false)}
                                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                                    >
                                        click to hide
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Data Sources Table - Simple in card */}
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold text-gray-900">Data Sources</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all data sources, including description, status, and last run.
                                </p>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <button
                                    type="button"
                                    onClick={() => router.push("/data_management/sources/settings")}
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add source
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
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
                                                    <tr key={source.name} className="cursor-pointer" onClick={() => router.push("/data_management/sources/settings")}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {source.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{source.description}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{source.status}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{source.lastRun}</td>
                                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <a
                                                                href="#"
                                                                onClick={(e) => { e.preventDefault(); router.push("/data_management/sources/settings") }}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Edit<span className="sr-only">, {source.name}</span>
                                                            </a>
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
