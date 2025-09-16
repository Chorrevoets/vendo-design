"use client"

import { SideMenu } from "@/components/side-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Calendar, MoreVertical, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SourceSettingsPage() {
    const router = useRouter()

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
                        <button
                            onClick={() => router.push('/data_management/sources')}
                            className="hover:text-gray-900 transition-colors"
                        >
                            Sources
                        </button>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">Settings</span>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl">
                    {/* Account Details Panel */}
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Piri Red (611-695-6497)</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                <div className="w-4 h-4 bg-gradient-to-br from-green-400 via-blue-500 to-yellow-400 rounded flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">A</span>
                                </div>
                                <span>Google_Ads</span>
                                <Calendar className="h-4 w-4" />
                                <span>Last Updated: August 26, 2025 at 3:34:37 PM GMT+10</span>
                            </div>
                            <div className="border-t pt-4">
                                <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
                                <p className="text-sm text-gray-600">Update your Google Ads account settings.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Account Name */}
                            <div className="space-y-2">
                                <Label htmlFor="account-name" className="text-sm font-medium text-gray-900">Account Name</Label>
                                <div className="relative">
                                    <Input
                                        id="account-name"
                                        value="Piri Red (611-695-6497)"
                                        className="pr-10"
                                    />
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Timezone */}
                            <div className="space-y-2">
                                <Label htmlFor="timezone" className="text-sm font-medium text-gray-900">Timezone</Label>
                                <Input
                                    id="timezone"
                                    value="Australia/Sydney"
                                    readOnly
                                />
                            </div>

                            {/* Currency */}
                            <div className="space-y-2">
                                <Label htmlFor="currency" className="text-sm font-medium text-gray-900">Currency</Label>
                                <Input
                                    id="currency"
                                    value="AUD"
                                    readOnly
                                />
                            </div>

                            {/* Reauthenticate Button */}
                            <div className="pt-4">
                                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                                    <div className="w-4 h-4 bg-gradient-to-br from-green-400 via-blue-500 to-yellow-400 rounded mr-2 flex items-center justify-center">
                                        <span className="text-white font-bold text-xs">A</span>
                                    </div>
                                    Reauthenticate
                                </Button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 pt-6">
                                <Button variant="ghost" onClick={() => router.push('/data_management/sources')}>
                                    Cancel
                                </Button>
                                <Button className="bg-black text-white hover:bg-gray-800">
                                    Save
                                </Button>
                            </div>

                            {/* Footer */}
                            <div className="border-t pt-6 mt-6 text-sm text-gray-500 space-y-1">
                                <p>Created at: August 26, 2025 at 3:34:37 PM GMT+10</p>
                                <p>App ID: google_ads_236032679</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 