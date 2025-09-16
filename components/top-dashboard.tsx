"use client"

import React from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

type Stat = {
    name: string
    stat: string
    previousStat: string
    previousLabel?: string
    change: string
    changeType: "increase" | "decrease"
}

const defaultStats: Stat[] = [
    { name: "Total Subscribers", stat: "71,897", previousStat: "70,946", change: "12%", changeType: "increase" },
    { name: "Avg. Open Rate", stat: "58.16%", previousStat: "56.14%", change: "2.02%", changeType: "increase" },
    { name: "Avg. Click Rate", stat: "24.57%", previousStat: "28.62%", change: "4.05%", changeType: "decrease" },
]

function classNames(...classes: (string | false | undefined)[]) {
    return classes.filter(Boolean).join(" ")
}

export type TopDashboardProps = {
    title?: string
    stats?: Stat[]
}

export default function TopDashboard({ title, stats = defaultStats }: TopDashboardProps) {
    return (
        <div>
            {title ? <h3 className="text-base font-semibold text-gray-900">{title}</h3> : null}
            <dl className="mt-5 grid grid-cols-1 divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
                {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 sm:p-6">
                        <dt className="text-base font-normal text-gray-900">{item.name}</dt>
                        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                                {item.stat}
                                <span className="ml-2 text-sm font-medium text-gray-500">{item.previousLabel ?? "from"} {item.previousStat}</span>
                            </div>

                            <div
                                className={classNames(
                                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                                )}
                            >
                                {item.changeType === 'increase' ? (
                                    <ArrowUpRight aria-hidden="true" className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-green-500" />
                                ) : (
                                    <ArrowDownRight aria-hidden="true" className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-red-500" />
                                )}

                                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                {item.change}
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
} 