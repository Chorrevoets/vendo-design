"use client"

import { ReactNode } from "react"
import Image from "next/image"

interface HeaderProps {
    title: string
    variant?: "default" | "centered" | "left-aligned"
    className?: string
    children?: ReactNode
    showBackground?: boolean
}

export function Header({
    title,
    variant = "default",
    className = "",
    children,
    showBackground = true
}: HeaderProps) {
    const baseClasses = "fixed top-6 left-0 right-0 h-16 z-[9999]"
    const backgroundClasses = showBackground ? "bg-gray-50" : ""

    const getVariantClasses = () => {
        switch (variant) {
            case "centered":
                return "flex items-center justify-between h-full px-6"
            case "left-aligned":
                return "flex items-center justify-between h-full px-6"
            default:
                return "flex items-center justify-between h-full px-6"
        }
    }

    return (
        <div
            className={`${baseClasses} ${backgroundClasses} ${className}`}
            style={{
                marginLeft: "var(--sidebar-width, 0px)",
                top: "9px" // Moved up by 15px from 24px (top-6)
            }}
        >
            <div className={getVariantClasses()}>
                {/* Left side - empty space for balance */}
                <div className="w-20"></div>

                {/* Center - title and children */}
                <div className="flex items-center justify-center flex-1">
                    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                    {children}
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-4">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => console.log('Magnifer clicked')}
                    >
                        <Image
                            src="/Magnifer.svg"
                            alt="Search"
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px]"
                        />
                    </button>

                    <button
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => console.log('Filter clicked')}
                    >
                        <Image
                            src="/Filter.svg"
                            alt="Filter"
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px]"
                        />
                    </button>

                    <button
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => console.log('Dots clicked')}
                    >
                        <Image
                            src="/Dots.svg"
                            alt="More options"
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px]"
                            style={{
                                filter: 'brightness(0) saturate(100%)',
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header 