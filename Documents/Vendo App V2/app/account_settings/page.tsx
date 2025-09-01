"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Upload, Save, Settings, MoreHorizontal, ChevronDown, Plus, Building2 } from "lucide-react"
import { SideMenu } from "@/components/side-menu"
import { Header } from "@/components/header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ExtractedShaderBackground } from "@/components/extracted-shader-background"

export default function ManageOrganizationPage() {
    const [companyInfo, setCompanyInfo] = useState({
        name: "Petzyo",
        logo: "/petzyo-logo.png",
        country: "Netherlands",
        industry: "E-commerce",
        size: "50-100 employees",
        website: "https://petzyo.com"
    })

    const [isEditing, setIsEditing] = useState(false)
    const [expandedPanel, setExpandedPanel] = useState<string | null>(null)
    const [currentOrg, setCurrentOrg] = useState("Petzyo")
    const [organizations] = useState([
        { id: 1, name: "Petzyo", logo: "/petzyo-logo.png", role: "Admin" },
        { id: 2, name: "TechCorp", logo: null, role: "Member" },
        { id: 3, name: "StartupXYZ", logo: null, role: "Admin" }
    ])

    // Set initial expanded panel based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                setExpandedPanel('all') // Open all panels by default on desktop
            } else {
                setExpandedPanel(null) // Keep closed on mobile
            }
        }

        handleResize() // Set initial state
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isPanelExpanded = (panelName: string) => {
        return expandedPanel === panelName || expandedPanel === 'all'
    }

    const togglePanel = (panelName: string) => {
        // Only allow toggling on mobile (when expandedPanel is not 'all')
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
            <SideMenu />
            <Header title="Account Settings" showIcons={false}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            Delete Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Request Account Data Export
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Contact Support
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Header>

            <div
                className="px-6 pt-20 pb-6 mx-auto"
                style={{
                    marginLeft: "var(--sidebar-width, 0px)",
                    maxWidth: "calc(100vw - var(--sidebar-width, 0px))"
                }}
            >


                <div className="space-y-6">
                    {/* Desktop Grid Layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
                        {/* Company Information Card */}
                        <Card>
                            <CardHeader className="bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Company Logo and Name Row */}
                                    <div className="flex items-center gap-6">
                                        {/* Company Logo */}
                                        <div>
                                            <div className="flex items-center justify-center w-[70px] h-[70px] border-2 border-blue-200 rounded-full bg-white shadow-sm overflow-hidden">
                                                <img
                                                    src="/petzyo-logo.png"
                                                    alt="Petzyo Logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Company Name */}
                                        <div className="flex-1">
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Company Name</Label>
                                            <Input
                                                value="Petzyo"
                                                readOnly={!isEditing}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Remaining Company Details */}
                                    <div className="space-y-4">
                                        {/* Origin Country */}
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Origin Country</Label>
                                            <Input
                                                value="AU"
                                                readOnly={!isEditing}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Countries Served */}
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Countries Served</Label>
                                            <Input
                                                value="Global"
                                                readOnly={!isEditing}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Timezone */}
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Timezone</Label>
                                            <Input
                                                value="Australia/Sydney"
                                                readOnly={!isEditing}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Reporting Currency */}
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 block mb-1">Reporting Currency</Label>
                                            <Input
                                                value="AUD"
                                                readOnly={!isEditing}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="flex justify-end mt-6">
                                    <Button className="bg-gray-900 text-white hover:bg-gray-800">
                                        Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Details Card */}
                        <Card>
                            <CardHeader className="bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
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
                        {/* Company Information Card */}
                        <Card>
                            <CardHeader
                                className="cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => togglePanel('company')}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
                                    <ChevronDown
                                        className={`h-5 w-5 transition-transform ${expandedPanel === 'company' ? 'rotate-180' : ''}`}
                                    />
                                </div>
                            </CardHeader>
                            {expandedPanel === 'company' && (
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Company Logo and Name Row */}
                                        <div className="flex items-center gap-6">
                                            {/* Company Logo */}
                                            <div>
                                                <div className="flex items-center justify-center w-[70px] h-[70px] border-2 border-blue-200 rounded-full bg-white shadow-sm overflow-hidden">
                                                    <img
                                                        src="/petzyo-logo.png"
                                                        alt="Petzyo Logo"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>

                                            {/* Company Name */}
                                            <div className="flex-1">
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Company Name</Label>
                                                <Input
                                                    value="Petzyo"
                                                    readOnly={!isEditing}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Remaining Company Details */}
                                        <div className="space-y-4">
                                            {/* Origin Country */}
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Origin Country</Label>
                                                <Input
                                                    value="AU"
                                                    readOnly={!isEditing}
                                                    className="w-full"
                                                />
                                            </div>

                                            {/* Countries Served */}
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Countries Served</Label>
                                                <Input
                                                    value="Global"
                                                    readOnly={!isEditing}
                                                    className="w-full"
                                                />
                                            </div>

                                            {/* Timezone */}
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Timezone</Label>
                                                <Input
                                                    value="Australia/Sydney"
                                                    readOnly={!isEditing}
                                                    className="w-full"
                                                />
                                            </div>

                                            {/* Reporting Currency */}
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 block mb-1">Reporting Currency</Label>
                                                <Input
                                                    value="AUD"
                                                    readOnly={!isEditing}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="flex justify-end mt-6">
                                        <Button className="bg-gray-900 text-white hover:bg-gray-800">
                                            Save
                                        </Button>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Account Details Card */}
                        <Card>
                            <CardHeader
                                className="cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => togglePanel('account')}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
                                    <ChevronDown
                                        className={`h-5 w-5 transition-transform ${expandedPanel === 'account' ? 'rotate-180' : ''}`}
                                    />
                                </div>
                            </CardHeader>
                            {expandedPanel === 'account' && (
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
                            )}
                        </Card>
                    </div>

                    {/* Access Management Card - Full Width on Desktop */}
                    <Card>
                        <CardHeader className="bg-gray-50">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Access Management</h2>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Tabs */}
                            <div className="flex space-x-1 mb-6">
                                <button className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-md">
                                    Active Members (4)
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                                    Invitations (0)
                                </button>
                            </div>

                            {/* Team Members Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
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
                            <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                                    Invite Member
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Billing & Subscription Card - Full Width on Desktop */}
                    <Card>
                        <CardHeader className="bg-gray-50">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Billing & Subscription</h2>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Plus Plan</h3>
                                    <div className="space-y-3">
                                        <Button className="bg-gray-900 text-white hover:bg-gray-800">
                                            Update Subscription
                                        </Button>
                                        <div>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                Cancel Subscription
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 w-64">
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