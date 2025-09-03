"use client"

import { SideMenu } from "@/components/side-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EventPage() {
    const router = useRouter()
    const [showInfoPanel, setShowInfoPanel] = useState(true)

    return (
        <div className="min-h-screen bg-gray-50">
            <SideMenu />

            <div
                className="px-6 pt-20 pb-6 mx-auto"
                style={{
                    marginLeft: "var(--sidebar-width, 0px)",
                    maxWidth: "calc(100vw - var(--sidebar-width, 0px))"
                }}
            >
                {/* Breadcrumb */}
                <div className="mb-6">
                    <nav className="flex items-center space-x-2 text-sm text-gray-600">
                        <button
                            onClick={() => router.push('/data_management')}
                            className="hover:text-gray-900 transition-colors"
                        >
                            Data Management
                        </button>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">Event</span>
                    </nav>
                </div>

                {/* Page Content */}
                <div className="space-y-6">
                    {showInfoPanel && (
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">Configure Event Tracking</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Text Content - Takes up 2/3 of the space */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <p className="text-gray-600">
                                            Your growth insights are only as strong as the data behind them. With Vendo, you can unify your marketing, sales, and analytics data in one place — securely, seamlessly, and without the headaches of manual setup. No code required.
                                        </p>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">What are Events?</h3>
                                            <p className="text-gray-600">
                                                Events are the integrations that let Vendo sync with your everyday platforms — like Google Ads, Facebook, Shopify, Mixpanel, and Google Analytics. By connecting them, you turn Vendo into your single source of truth.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Configure?</h3>
                                            <ul className="space-y-4 text-gray-600">
                                                <li>
                                                    <div className="font-semibold text-gray-900 mb-1">One place for answers</div>
                                                    <div>No more jumping between dashboards. Vendo brings your data together so you can see the full picture in seconds.</div>
                                                </li>
                                                <li>
                                                    <div className="font-semibold text-gray-900 mb-1">No-code setup</div>
                                                    <div>Connect tools in just a few clicks — no engineers needed.</div>
                                                </li>
                                                <li>
                                                    <div className="font-semibold text-gray-900 mb-1">Always up to date</div>
                                                    <div>Once connected, your data flows in automatically, keeping your insights fresh and reliable.</div>
                                                </li>
                                            </ul>
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
                                        Add your first event
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

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">Total Events</p>
                                        <p className="text-3xl font-bold text-blue-600">23,287</p>
                                        <p className="text-sm text-gray-500">Since Aug 2, 2025</p>
                                    </div>
                                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">Last 30 Days</p>
                                        <p className="text-3xl font-bold text-green-600">22,814</p>
                                        <p className="text-sm text-gray-500">Recent activity</p>
                                    </div>
                                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">Active Events</p>
                                        <p className="text-3xl font-bold text-purple-600">16</p>
                                        <p className="text-sm text-gray-500">Event types currently tracking</p>
                                    </div>
                                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                        </svg>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Show Disabled Events Checkbox */}
                    <div className="mb-6">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                            <span className="text-sm text-gray-700">Show disabled events</span>
                        </label>
                    </div>

                    {/* Event Cards */}
                    <div className="space-y-4">
                        {/* First Event Card */}
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">$mp_session_record</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Mixpanel</span>
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">live</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">13838 events in last 30 days</p>
                                            <p className="text-sm text-gray-600">28 properties</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                                                Generate Descriptions
                                            </Button>
                                            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                                                Generate Missing
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">Enabled</span>
                                            <div className="relative">
                                                <div className="w-10 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                                <svg className="w-4 h-4 text-gray-400 absolute -bottom-1 left-1/2 transform -translate-x-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">First Seen</p>
                                        <p className="text-sm font-medium text-gray-900">Aug 2, 2025</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Last Seen</p>
                                        <p className="text-sm font-medium text-gray-900">Sep 1, 2025</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Recent Count</p>
                                        <p className="text-sm font-medium text-gray-900">13838 events</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <label className="text-sm font-medium text-gray-900">Description</label>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        The `$mp_session_record` event captures the start of a user's session recording, providing a snapshot of the user's environment and initial activity. This event signals the beginning of a recorded user session, enabling analysis of user behavior, identification of potential issues, and optimization of the user experience. It includes details about the user's browser, device, and the recording environment.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Second Event Card */}
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Ad Data</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Mixpanel</span>
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">live</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">373 events in last 30 days</p>
                                            <p className="text-sm text-gray-600">47 properties</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                                                Generate Descriptions
                                            </Button>
                                            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                                                Generate Missing
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">Enabled</span>
                                            <div className="relative">
                                                <div className="w-10 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                                <svg className="w-4 h-4 text-gray-400 absolute -bottom-1 left-1/2 transform -translate-x-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">First Seen</p>
                                        <p className="text-sm font-medium text-gray-900">Aug 3, 2025</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Last Seen</p>
                                        <p className="text-sm font-medium text-gray-900">Aug 30, 2025</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Recent Count</p>
                                        <p className="text-sm font-medium text-gray-900">373 events</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <label className="text-sm font-medium text-gray-900">Description</label>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        The "Ad Data" event captures performance metrics related to advertising campaigns. It tracks key data points such as conversions, conversion value, and cost, broken down by ad group, UTM parameters, and geographic location. This event provides insights into ad campaign effectiveness, allowing for optimization based on performance across different channels and demographics. It helps analyze return on ad spend (ROAS) and identify high-performing ad segments.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
} 