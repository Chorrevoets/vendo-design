"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type ReportChangeType = "increase" | "decrease"

export type ReportSnippitProps = {
    id: string
    name: string
    stat: string
    icon: ReactNode
    change: string
    changeType: ReportChangeType
    previousStat?: string
    className?: string
    onOpen?: (id: string) => void
}

export default function ReportSnippit({ id, name, stat, icon, change, changeType, previousStat, className, onOpen }: ReportSnippitProps) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onOpen?.(id)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen?.(id) } }}
            className={cn(
                "relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow outline outline-1 outline-black/5 transition-all duration-200 hover:shadow-md cursor-pointer sm:p-6",
                className
            )}
            aria-label={`Open report ${name}`}
        >
            <dt className="text-base font-normal text-gray-900">{name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-black">
                    {stat}
                    {previousStat && (
                        <span className="ml-2 text-sm font-medium text-gray-500">from {previousStat}</span>
                    )}
                </div>

                <div
                    className={cn(
                        changeType === "increase" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                        "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                    )}
                >
                    {changeType === "increase" ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-green-500">
                            <path fill="currentColor" d="M5 12h2V7h5V5H5v7Zm7 7h7v-7h-2v3.586l-5.293-5.293-1.414 1.414L15.586 17H12v2Z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-red-500">
                            <path fill="currentColor" d="M19 12h-2v5h-5v2h7v-7ZM12 5H5v7h2V8.414l5.293 5.293 1.414-1.414L8.414 7H12V5Z" />
                        </svg>
                    )}
                    <span className="sr-only"> {changeType === "increase" ? "Increased" : "Decreased"} by </span>
                    {change}
                </div>
            </dd>
        </div>
    )
} 