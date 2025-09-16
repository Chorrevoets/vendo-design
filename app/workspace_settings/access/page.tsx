"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import Header from "@/components/header"
import HeaderFilter from "@/components/header-filter"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AccessManagementPage() {
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
                activeItem="Access Management"
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
                    {/* Access Management Card - Full Width on Desktop */}
                    <Card>
                        <CardHeader className="bg-gray-50 lg:bg-gray-50 py-3 sm:py-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Access Management</h2>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {/* Tabs */}
                            <div className="flex space-x-1 mb-4 overflow-x-auto pt-2">
                                <button className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-md whitespace-nowrap">
                                    Active Members (4)
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap">
                                    Invitations (0)
                                </button>
                            </div>

                            {/* Team Members Table - Mobile Responsive */}
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Organization Role</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Team</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {/* Yalcin Kaya */}
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-3">
                                                        <AvatarFallback className="bg-blue-600 text-white text-xs">YK</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-gray-900">Yalcin Kaya</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">yalcin@growthanalyticsmarketing.com</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    Member
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">General</td>
                                            <td className="py-3 px-4">
                                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>

                                        {/* GAM */}
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-3">
                                                        <AvatarFallback className="bg-blue-600 text-white text-xs">GA</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-gray-900">GAM</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">analytics@growthanalyticsmarketing.com</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    Member
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">General</td>
                                            <td className="py-3 px-4">
                                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Adnan Hidayat */}
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-3">
                                                        <AvatarFallback className="bg-blue-600 text-white text-xs">AH</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-gray-900">Adnan hidayat</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">komputok@gmail.com</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    Member
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">General</td>
                                            <td className="py-3 px-4">
                                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Coen Horrevoets */}
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-3">
                                                        <AvatarFallback className="bg-blue-600 text-white text-xs">CH</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-gray-900">Coen Horrevoets</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">c.horrevoets@gmail.com</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    Admin
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">General</td>
                                            <td className="py-3 px-4">
                                                {/* No remove button for admin */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Invite Member Button */}
                            <div className="flex justify-end mt-6 pt-4 border-top border-gray-100">
                                <Button className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto">
                                    Invite Member
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 