"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import Header from "@/components/header"
import HeaderFilter from "@/components/header-filter"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BillingSubscriptionPage() {
    const [isMainSidebarOpen] = useState(false)
    const secondaryPanelItems = [
        { name: "Profile & Identifiers", href: "/workspace_settings/profile" },
        { name: "Access Management", href: "/workspace_settings/access" },
        { name: "Billing & Usage", href: "/workspace_settings/billing" },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Workspace"
                activeItem="Billing & Usage"
            />
            <HeaderFilter showFilters={false} forceNarrowLayout actionLabel="Add Workspace" />
            <Header title="" mobileTitle="" showBackground={false} />

            <div
                className="px-4 sm:px-6 pt-20 pb-6 mx-auto"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                <div className="space-y-6">
                    {/* Billing & Usage Card - Full Width on Desktop */}
                    <Card>
                        <CardHeader className="bg-gray-50 lg:bg-gray-50 py-3 sm:py-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Billing & Usage</h2>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Plus Plan</h3>
                                    <div className="space-y-3">
                                        <Button className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto">
                                            Update Subscription
                                        </Button>
                                        <div>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                Cancel Subscription
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 w-full lg:w-64">
                                    <div className="text-xs text-gray-500 mb-2">20,000 CREDIT LIMIT</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: '5%' }}
                                        ></div>
                                    </div>
                                    <div className="flex items-baseline justify-between mb-2">
                                        <span className="text-2xl font-bold text-gray-900">477 credits</span>
                                        <span className="text-lg font-semibold text-gray-900">5%</span>
                                    </div>
                                    <div className="text-xs text-gray-500">Period ends July 27, 2025</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 