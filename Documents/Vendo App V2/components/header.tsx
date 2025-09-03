"use client"

import { ReactNode } from "react"
import Image from "next/image"

interface HeaderProps {
    title: string
    variant?: "default" | "centered" | "left-aligned"
    className?: string
    children?: ReactNode
    showBackground?: boolean
    showIcons?: boolean
}

export function Header({
    title,
    variant = "default",
    className = "",
    children,
    showBackground = true,
    showIcons = true
}: HeaderProps) {
    const baseClasses = "fixed top-6 left-0 right-0 h-16 z-[9999]"
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
                top: "9px" // Moved up by 15px from 24px (top-6)
            }}
        >
            <div className={getVariantClasses()}>
                {/* Left side - empty space for balance */}
                <div className="w-20"></div>

                {/* Center - title */}
                <div className="flex items-center justify-center flex-1">
                    <h1 className="text-2xl max-[750px]:text-xl font-semibold text-gray-900 text-center">{title}</h1>
                </div>

                {/* Right side - icons or children */}
                {showIcons ? (
                    <div className="flex items-center gap-2 max-[750px]:gap-1 w-20 justify-end">
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
                ) : (
                    <div className="flex items-center gap-2 max-[750px]:gap-1 w-20 justify-end">
                        {children}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header 