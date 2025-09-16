"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import Header from "@/components/header"
import HeaderFilter from "@/components/header-filter"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

export default function WorkspaceProfilePage() {
    const [isMainSidebarOpen] = useState(false)
    const secondaryPanelItems = [
        { name: "Profile & Identifiers", href: "/workspace_settings/profile" },
        { name: "Access Management", href: "/workspace_settings/access" },
        { name: "Billing & Usage", href: "/workspace_settings/billing" },
    ]

    const [formData, setFormData] = useState({
        name: "Petzyo",
        originCountry: "AU",
        countriesServed: "Global",
        timezone: "Australia/Sydney",
        reportingCurrency: "AUD"
    })

    const initialFormData = {
        name: "Petzyo",
        originCountry: "AU",
        countriesServed: "Global",
        timezone: "Australia/Sydney",
        reportingCurrency: "AUD"
    }

    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData)

    const [expandedPanel, setExpandedPanel] = useState<string | null>("all")

    const togglePanel = (panelName: string) => {
        if (expandedPanel !== 'all') {
            if (expandedPanel === panelName) {
                setExpandedPanel(null)
            } else {
                setExpandedPanel(panelName)
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Workspace"
                activeItem="Profile & Identifiers"
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
                    {/* Desktop Grid Layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
                        {/* Workspace Information Card */}
                        <Card>
                            <CardHeader className="bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Workspace Profile</h2>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    {/* Workspace Logo and Name Row */}
                                    <div className="flex items-center gap-6">
                                        {/* Workspace Logo */}
                                        <div className="flex-shrink-0">
                                            <div className="relative group cursor-pointer">
                                                <div className="flex items-center justify-center w-[70px] h-[70px] border-2 border-blue-200 rounded-full bg-white shadow-sm overflow-hidden">
                                                    <img
                                                        src="/petzyo-logo.png"
                                                        alt="Petzyo Logo"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Workspace Name */}
                                        <div className="flex-1 min-w-0">
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Name</Label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Remaining Workspace Details */}
                                    <div className="space-y-4">
                                        {/* Origin Country */}
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Origin Country</Label>
                                            <Input
                                                value={formData.originCountry}
                                                onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Countries Served */}
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Countries Served</Label>
                                            <Input
                                                value={formData.countriesServed}
                                                onChange={(e) => setFormData({ ...formData, countriesServed: e.target.value })}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Timezone */}
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Timezone</Label>
                                            <Input
                                                value={formData.timezone}
                                                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Reporting Currency */}
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Reporting Currency</Label>
                                            <Input
                                                value={formData.reportingCurrency}
                                                onChange={(e) => setFormData({ ...formData, reportingCurrency: e.target.value })}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="flex justify-end mt-6">
                                    <Button
                                        disabled={!hasChanges}
                                        className="bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Identifiers Card */}
                        <Card>
                            <CardHeader className="bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Identifiers</h2>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Account ID */}
                                <div className="flex items-center py-4 border-b border-gray-100">
                                    <div className="w-32">
                                        <Label className="text-sm font-medium text-gray-700">Account ID</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-semibold text-gray-900">001</span>
                                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                            <Image
                                                src="/Copy.svg"
                                                alt="Copy"
                                                width={16}
                                                height={16}
                                                className="w-4 h-4"
                                            />
                                        </Button>
                                    </div>
                                </div>

                                {/* Dataset ID */}
                                <div className="flex items-center py-4 border-b border-gray-100">
                                    <div className="w-32 min-w-0">
                                        <Label className="text-sm font-medium text-gray-700 whitespace-nowrap">Dataset ID</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-semibold text-gray-900 truncate max-w-[300px]" title="vendoai_data_s00IGNsLa6zdswBy1A7X">vendoai_data_s00IGNsLa6zdswBy1A7X</span>
                                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 flex-shrink-0">
                                            <Image
                                                src="/Copy.svg"
                                                alt="Copy"
                                                width={16}
                                                height={16}
                                                className="w-4 h-4"
                                            />
                                        </Button>
                                    </div>
                                </div>

                                {/* Created At */}
                                <div className="flex items-center py-4">
                                    <div className="w-32">
                                        <Label className="text-sm font-medium text-gray-700">Created At</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-semibold text-gray-900">2025-05-29</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Mobile Layout - Single Column */}
                    <div className="lg:hidden space-y-6">
                        {/* Workspace Information Card */}
                        <Card>
                            <CardHeader
                                className="cursor-pointer hover:bg-gray-50 transition-colors py-3 sm:py-4"
                                onClick={() => togglePanel('company')}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Workspace Profile</h2>
                                </div>
                            </CardHeader>
                            {(expandedPanel === 'company' || expandedPanel === 'all') && (
                                <CardContent className="pt-6">
                                    <div className="space-y-6">
                                        {/* Workspace Logo and Name Row - Mobile Optimized */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                            {/* Workspace Logo */}
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center w-[70px] h-[70px] border-2 border-blue-200 rounded-full bg-white shadow-sm overflow-hidden">
                                                    <img
                                                        src="/petzyo-logo.png"
                                                        alt="Petzyo Logo"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>

                                            {/* Workspace Name */}
                                            <div className="flex-1 min-w-0 w-full sm:w-auto">
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Name</Label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Remaining Workspace Details */}
                                        <div className="space-y-4">
                                            {/* Origin Country */}
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Origin Country</Label>
                                                <Input
                                                    value={formData.originCountry}
                                                    onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                                                    className="w-full"
                                                />
                                            </div>

                                            {/* Countries Served */}
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Countries Served</Label>
                                                <Input
                                                    value={formData.countriesServed}
                                                    onChange={(e) => setFormData({ ...formData, countriesServed: e.target.value })}
                                                    className="w-full"
                                                />
                                            </div>

                                            {/* Timezone */}
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Timezone</Label>
                                                <Input
                                                    value={formData.timezone}
                                                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                                    className="w-full"
                                                />
                                            </div>

                                            {/* Reporting Currency */}
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Reporting Currency</Label>
                                                <Input
                                                    value={formData.reportingCurrency}
                                                    onChange={(e) => setFormData({ ...formData, reportingCurrency: e.target.value })}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="flex justify-end mt-6">
                                        <Button
                                            disabled={!hasChanges}
                                            className="bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-full sm:w-auto"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Identifiers Card */}
                        <Card>
                            <CardHeader
                                className="cursor-pointer hover:bg-gray-50 transition-colors py-3 sm:py-4"
                                onClick={() => togglePanel('account')}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Identifiers</h2>
                                </div>
                            </CardHeader>
                            {(expandedPanel === 'account' || expandedPanel === 'all') && (
                                <CardContent className="space-y-6">
                                    {/* Account ID */}
                                    <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-100 gap-2 sm:gap-3">
                                        <div className="w-full sm:w-32">
                                            <Label className="text-sm font-medium text-gray-700">Account ID</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-semibold text-gray-900">001</span>
                                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                                <Image
                                                    src="/Copy.svg"
                                                    alt="Copy"
                                                    width={16}
                                                    height={16}
                                                    className="w-4 h-4"
                                                />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Dataset ID */}
                                    <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-100 gap-2 sm:gap-3">
                                        <div className="w-full sm:w-32 min-w-0">
                                            <Label className="text-sm font-medium text-gray-700 whitespace-nowrap">Dataset ID</Label>
                                        </div>
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="text-lg font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-[300px]" title="vendoai_data_s00IGNsLa6zdswBy1A7X">vendoai_data_s00IGNsLa6zdswBy1A7X</span>
                                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 flex-shrink-0">
                                                <Image
                                                    src="/Copy.svg"
                                                    alt="Copy"
                                                    width={16}
                                                    height={16}
                                                    className="w-4 h-4"
                                                />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Created At */}
                                    <div className="flex flex-col sm:flex-row sm:items-center py-4 gap-2 sm:gap-3">
                                        <div className="w-full sm:w-32">
                                            <Label className="text-sm font-medium text-gray-700">Created At</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-semibold text-gray-900">2025-05-29</span>
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
} 