"use client"

import { ReactNode } from "react"
import Image from "next/image"

interface HeaderProps {
    title: string
    mobileTitle?: string
    variant?: "default" | "centered" | "left-aligned"
    className?: string
    children?: ReactNode
    showBackground?: boolean
}

export function Header({
    title,
    mobileTitle,
    variant = "default",
    className = "",
    children,
    showBackground = true
}: HeaderProps) {
    const baseClasses = "fixed top-6 left-0 right-0 h-16"
    const backgroundClasses = showBackground ? "bg-gray-50" : ""

    const getVariantClasses = () => {
        switch (variant) {
            case "centered":
                return "flex items-center justify-between h-full px-6 max-[750px]:px-2"
            case "left-aligned":
                return "flex items-center justify-between h-full px-6 max-[750px]:px-2"
            default:
                return "flex items-center justify-between h-full px-6 max-[750px]:px-2"
        }
    }

    return (
        <div
            className={`${baseClasses} ${backgroundClasses} ${className}`}
            style={{
                marginLeft: "var(--sidebar-width, 0px)",
                top: "9px", // Moved up by 15px from 24px (top-6)
                zIndex: 9998 // Lower than sidebar (9999) so it doesn't block the toggle button
            }}
        >
            <div className={getVariantClasses()}>
                {/* Left side - space for logo when sidebar is closed */}
                <div className="w-20 flex-shrink-0"></div>

                {/* Center - title with proper text wrapping prevention */}
                <div className="flex items-center justify-center flex-1 min-w-0">
                    <h1 className="text-2xl max-[750px]:text-xl font-semibold text-gray-900 text-center truncate px-4">
                        <span className="hidden min-[750px]:inline">{title}</span>
                        <span className="min-[750px]:hidden">{mobileTitle || title}</span>
                    </h1>
                </div>

                {/* Right side - children only */}
                {children && (
                    <div className="flex items-center gap-2 max-[750px]:gap-1 w-20 justify-end flex-shrink-0">
                        {children}
                    </div>
                )}
                {!children && (
                    <div className="w-20 flex-shrink-0"></div>
                )}
            </div>
        </div>
    )
}

export default Header 