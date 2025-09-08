"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type Metric = {
    name: string
    type: "Event" | "Funnel" | "Custom"
    firstSeen: string
    lastSeen: string
    count: number
    sources: string[]
    status: "green" | "orange" | "red" | "inactive"
    description: string
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
            return "statusGray"
    }
}

export function MetricCard({ metric }: { metric: Metric }) {
    return (
        <Card className="bg-white">
            <CardContent className="py-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2 min-w-0 flex-wrap">
                                <div className="text-lg font-semibold text-gray-900 truncate">{metric.name}</div>
                                <Badge variant="secondary" className="whitespace-nowrap">{metric.type}</Badge>
                                {metric.sources.map((s, i) => (
                                    <Badge key={i} variant="secondary">{s}</Badge>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="p-1 rounded hover:bg-gray-100">
                                        <MoreHorizontal className="h-5 w-5 text-gray-400" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Pause</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="text-gray-600 leading-relaxed">
                                {metric.description} <a href="#" className="text-gray-400 hover:text-gray-600 hover:underline underline-offset-2 transition-colors">more</a>
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
                                    <div className="mt-1">
                                        <Badge variant={statusToVariant(metric.status)}>
                                            {metric.status === "inactive" ? "black" : metric.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 