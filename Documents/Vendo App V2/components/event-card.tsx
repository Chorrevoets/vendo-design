"use client"

import React from "react"
import type { Metric } from "@/types/metric"
import { Badge, type BadgeProps } from "@/components/ui/badge"

type EventCardProps = {
    metric: Metric
    onClick?: () => void
}

const statusToVariant = (status: Metric["status"]): BadgeProps["variant"] => {
    switch (status) {
        case "green":
            return "statusGreen"
        case "orange":
            return "statusOrange"
        case "red":
            return "statusRed"
        case "inactive":
            return "statusBlack"
        default:
            return "secondary"
    }
}

export default function EventCard({ metric, onClick }: EventCardProps) {
    return (
        <div
            role="button"
            onClick={onClick}
            className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 min-w-0 flex-wrap">
                        <div className="text-lg font-semibold text-gray-900 truncate">{metric.name}</div>
                        <Badge variant="secondary" className="whitespace-nowrap">{metric.type}</Badge>
                        {metric.sources.map((s, i) => (
                            <Badge key={i} variant="secondary">{s}</Badge>
                        ))}
                    </div>
                    <div className="mt-1">
                        <Badge variant={statusToVariant(metric.status)}>
                            {metric.status === "inactive" ? "black" : metric.status}
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-gray-600 leading-relaxed">
                        {metric.description} <span className="text-gray-400">more</span>
                    </div>
                    <div className="grid grid-cols-4 gap-y-4 gap-x-8 text-sm">
                        <div>
                            <div className="text-gray-500">First Seen</div>
                            <div className="text-gray-900">{metric.firstSeen}</div>
                        </div>
                        <div>
                            <div className="text-gray-500">Last Seen</div>
                            <div className="text-gray-900">{metric.lastSeen}</div>
                        </div>
                        <div>
                            <div className="text-gray-500">Count</div>
                            <div className="text-gray-900">{metric.count.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-gray-500">Status</div>
                            <div className="text-gray-900 capitalize">{metric.status}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 