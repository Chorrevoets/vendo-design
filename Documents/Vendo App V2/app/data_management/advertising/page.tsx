"use client"

import { SideMenu } from "@/components/side-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdvertisingPage() {
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
                        <span className="text-gray-900 font-medium">Advertising</span>
                    </nav>
                </div>

                {/* Page Content */}
                <div className="space-y-6">
                    {showInfoPanel && (
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">Set Up Advertising Data Tracking</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Text Content - Takes up 2/3 of the space */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <p className="text-gray-600">
                                            Your growth insights are only as strong as the data behind them. With Vendo, you can unify your marketing, sales, and analytics data in one place — securely, seamlessly, and without the headaches of manual setup. No code required.
                                        </p>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">What is Advertising Data?</h3>
                                            <p className="text-gray-600">
                                                Advertising data are the integrations that let Vendo sync with your everyday platforms — like Google Ads, Facebook, Shopify, Mixpanel, and Google Analytics. By connecting them, you turn Vendo into your single source of truth.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Track?</h3>
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
                                        Add your first advertising data
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

                    {/* Advertising Table */}
                    <Card className="bg-white">
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Advertising</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Run</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => router.push('/data_management/advertising/settings')}>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-blue-500 to-yellow-400 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">A</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Google Ads</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">Piri Red (611-695-6497)</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    INCOMPLETE
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-500">-</td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => router.push('/data_management/advertising/settings')}>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-blue-500 to-yellow-400 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">A</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Google Ads</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">Piri Red (611-695-6497)</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ ACTIVE
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">6 days</td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => router.push('/data_management/advertising/settings')}>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">A</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Microsoft Ads</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">Growth Analytics and Marketing (139090368)</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    INCOMPLETE
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-500">-</td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => router.push('/data_management/advertising/settings')}>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-blue-500 to-yellow-400 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">A</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Google Ads</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">AHR Private Wealth (619-058-5400)</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    INCOMPLETE
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-500">-</td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => router.push('/data_management/advertising/settings')}>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-blue-500 to-yellow-400 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">A</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Google Ads</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">Google Ads Account (426-984-7174)</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    INCOMPLETE
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-500">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 