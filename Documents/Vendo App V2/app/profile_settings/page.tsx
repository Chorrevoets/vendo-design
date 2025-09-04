"use client"

import { useState } from "react"
import { SideMenu } from "@/components/side-menu"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfileSettingsPage() {
    const [profileData, setProfileData] = useState({
        name: "Yannick Kiekens",
        email: "c.horrevoets@gmail.com",
        avatar: "/placeholder-user.jpg"
    })

    const initialName = "Yannick Kiekens"
    const hasNameChanged = profileData.name !== initialName

    const handleUpdateProfile = () => {
        console.log("Profile updated:", profileData)
        // Here you would typically make an API call to update the profile
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <SideMenu />
            <Header title="Profile Settings" mobileTitle="Settings" />

            <div
                className="px-6 pt-20 pb-6 mx-auto"
                style={{
                    marginLeft: "var(--sidebar-width, 0px)",
                    maxWidth: "calc(100vw - var(--sidebar-width, 0px))"
                }}
            >
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-white">
                        <CardContent className="space-y-6">
                            {/* Profile Picture Section */}
                            <div className="flex items-center gap-4 pt-6">
                                <div className="relative group cursor-pointer">
                                    <div className="w-[70px] h-[70px] bg-black rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:bg-gray-800 transition-colors">
                                        YK
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="text-sm text-gray-500 hover:text-gray-700 underline">
                                        Clear
                                    </button>
                                </div>
                            </div>

                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                    Your Name
                                </Label>
                                <Input
                                    id="name"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profileData.email}
                                    disabled
                                    className="w-full bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Update Button */}
                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={handleUpdateProfile}
                                    disabled={!hasNameChanged}
                                    className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                >
                                    Save
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 