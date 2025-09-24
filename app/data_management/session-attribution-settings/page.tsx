"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import SingleLayerMenu from "@/components/single-layer-menu"
import { useEffect, useState } from "react"

export default function SessionAttributionSettingsPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)

    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    const secondaryPanelItems = [
        { name: "Quality", href: "/data_management/quality" },
        { name: "Sources", href: "/data_management/sources" },
        { name: "Context", href: "/data_management/context" },
        { name: "Metrics", href: "/data_management/metrics" },
        { name: "Events", href: "/data_management/event" },
        { name: "Customer Properties", href: "/data_management/customer" },
        { name: "Channel Grouping", href: "/data_management/channel-grouping" },
        { name: "Reporting Settings", href: "/data_management/settings" },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <SingleLayerMenu forceState="narrow" />
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Reporting Settings"
            />

            <HeaderFilter
                title="Reporting Settings"
                showFilters={false}
                forceNarrowLayout
                showMenu={false}
                useActionDialog={false}
                showActionButton={false}
                leftOffset={isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)"}
            />

            <div
                className="px-6 pt-24 pb-6"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)",
                }}
            >
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="text-gray-900 text-lg font-semibold">Default Attribution Model</div>
                        <div className="text-gray-500 mt-1 flex items-center gap-2">
                            <img src="/Definition.svg" alt="" className="h-4 w-4" />
                            <span>You can override the default by asking the co-pilot to use another attribution model.</span>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <fieldset aria-label="Lookback window">
                            <div className="space-y-4 max-w-md">
                                <div className="text-gray-900 text-md font-semibold">Lookback window</div>
                                <label htmlFor="lookback_days_settings" className="block text-sm font-medium text-gray-700">Days</label>
                                <input id="lookback_days_settings" type="number" min={1} defaultValue={7} className="w-32 rounded-md border border-gray-300 px-3 py-2 text-sm" />
                                <div className="text-sm text-gray-500">Number of days to attribute conversions after an interaction.</div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <fieldset aria-label="Attribution Model">
                            <div className="space-y-5">
                                <div className="relative flex items-start">
                                    <div className="flex h-6 items-center">
                                        <input
                                            defaultChecked={true}
                                            id="last_click"
                                            name="attribution"
                                            type="radio"
                                            aria-describedby={`last_click-description`}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm/6">
                                        <label htmlFor="last_click" className="font-medium text-gray-900">
                                            Last Click Attribution
                                        </label>
                                        <p id={`last_click-description`} className="text-gray-500">
                                            The <span className="font-semibold">most recent marketing interaction</span> before a conversion.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative flex items-start">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="first_click"
                                            name="attribution"
                                            type="radio"
                                            aria-describedby={`first_click-description`}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm/6">
                                        <label htmlFor="first_click" className="font-medium text-gray-900">
                                            First Click Attribution
                                        </label>
                                        <p id={`first_click-description`} className="text-gray-500">
                                            The <span className="font-semibold">first marketing interaction</span> recorded for a user before a conversion.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative flex items-start">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="linear"
                                            name="attribution"
                                            type="radio"
                                            aria-describedby={`linear-description`}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm/6">
                                        <label htmlFor="linear" className="font-medium text-gray-900">
                                            Linear Attribution
                                        </label>
                                        <p id={`linear-description`} className="text-gray-500">
                                            <span className="font-semibold">Equal credit</span> is assigned to <span className="font-semibold">all marketing interactions</span> in the user journey before a conversion.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative flex items-start">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="participation"
                                            name="attribution"
                                            type="radio"
                                            aria-describedby={`participation-description`}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm/6">
                                        <label htmlFor="participation" className="font-medium text-gray-900">
                                            Participation Attribution
                                        </label>
                                        <p id={`participation-description`} className="text-gray-500">
                                            <span className="font-semibold">Full credit</span> is given to <span className="font-semibold">every marketing interaction</span> that participated in the conversion journey. (All touchpoints get 100% of the conversion.)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="mt-6 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="text-gray-900 text-lg font-semibold">Excluded touch points</div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                    </div>
                </div>
            </div>
        </div>
    )
}


