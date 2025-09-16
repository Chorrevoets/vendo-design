"use client"

import { SideMenu } from "@/components/side-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DestinationsPage() {
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
                        <span className="text-gray-900 font-medium">Destinations</span>
                    </nav>
                </div>

                {/* Page Content */}
                <div className="space-y-6">
                    {showInfoPanel && (
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">Connect Your Destinations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Text Content - Takes up 2/3 of the space */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <p className="text-gray-600">
                                            Your insights don't stop at Vendo — they power action. With Destinations, you can push your segments and custom events directly into the tools where you run campaigns or track performance. Smarter targeting, leaner budgets, better results. All with no code.
                                        </p>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">What are Destinations?</h3>
                                            <p className="text-gray-600">
                                                Destinations are the platforms where Vendo sends your enriched data. These can include:
                                            </p>
                                            <ul className="mt-2 space-y-1 text-gray-600">
                                                <li>• Ad platforms like Google Ads, Facebook, or TikTok — so you can activate precise segments and improve campaign efficiency.</li>
                                                <li>• Analytics tools like Mixpanel — for deeper exploration of behaviors, funnels, and outcomes.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Connect?</h3>
                                            <ul className="space-y-4 text-gray-600">
                                                <li>
                                                    <div className="font-semibold text-gray-900 mb-1">Sharper targeting</div>
                                                    <div>Share custom segments built in Vendo AI with your ad platforms for more relevant campaigns.</div>
                                                </li>
                                                <li>
                                                    <div className="font-semibold text-gray-900 mb-1">Efficient spend</div>
                                                    <div>Make every dollar work harder by eliminating wasted impressions and focusing on high-value audiences.</div>
                                                </li>
                                                <li>
                                                    <div className="font-semibold text-gray-900 mb-1">Deeper analysis</div>
                                                    <div>Push events to analytics platforms and unlock new insights without duplicating effort.</div>
                                                </li>
                                                <li>
                                                    <div className="font-semibold text-gray-900 mb-1">No-code setup</div>
                                                    <div>Connect destinations in just a few clicks — and start sending data where it matters most.</div>
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
                                        Add your first destination
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

                    {/* Data Sources Table */}
                    <Card className="bg-white">
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Destination</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Synced</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">X</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Mixpanel</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">vendoai</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">2 months ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">X</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Mixpanel</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">vendoai</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">2 months ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-blue-500 to-yellow-400 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">A</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Google Ads</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">ads_google_ads</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">about 6 hours ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-400 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">?</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Unknown</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">ads_google_ads</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    ⚠ FAILED
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">6 days ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">∞</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Meta Ads</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">ads_meta_ads</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">3 months ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">∞</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Meta Ads</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">ads_meta_ads</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">6 days ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">A</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Microsoft Ads</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">ads_microsoft_ads</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">about 6 hours ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">X</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Mixpanel</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">conversion_google_ads</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">about 6 hours ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">X</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Mixpanel</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">vendoai</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">8 days ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">X</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Mixpanel</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">conversion_meta_ads</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">about 6 hours ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">X</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900 hidden sm:inline">Mixpanel</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">source_mixpanel</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ SUCCESS
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">1 day ago</td>
                                            <td className="py-3 px-4">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <span className="text-gray-400">⋯</span>
                                                </button>
                                            </td>
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