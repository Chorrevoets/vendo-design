"use client"

import DoubleLayeredMenu from "@/components/double-layered-menu"
import HeaderFilter from "@/components/header-filter"
import SingleLayerMenu from "@/components/single-layer-menu"
import { useEffect, useMemo, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

export default function ContextPage() {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false)

    // Context table state
    const [contextSearchOpen, setContextSearchOpen] = useState(false)
    const [contextSearchDraft, setContextSearchDraft] = useState("")
    const [contextSearchQuery, setContextSearchQuery] = useState("")
    const [contextCategoryFilterOpen, setContextCategoryFilterOpen] = useState(false)
    const [selectedContextCategoriesDraft, setSelectedContextCategoriesDraft] = useState<Set<string>>(new Set())
    const [appliedContextCategories, setAppliedContextCategories] = useState<string[]>([])

    // Drawer state
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedContextItem, setSelectedContextItem] = useState<{ id: number, title: string, category: string, lastUpdated: string, content: string } | null>(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [formData, setFormData] = useState({ title: "", category: "", content: "" })

    const [contextItems, setContextItems] = useState([
        { id: 1, title: "Australia National Public Holidays (2025-2027)", category: "General", lastUpdated: "Jun 6, 2025", content: "🗓️ 2025 Date Holiday\n- Wed, 1 Jan New Year's Day\n- Mon, 27 Jan Australia Day (observed)\n- Fri, 18 Apr Good Friday\n- Mon, 21 Apr Easter Monday\n- Fri, 25 Apr Anzac Day\n- Mon, 9 Jun King's Birthday (except QLD & WA)\n- Thu, 25 Dec Christmas Day\n- Fri, 26 Dec Boxing Day\n\n🗓️ 2026 - Date Holiday\n- Thu, 1 Jan New Year's Day\n- Mon, 26 Jan Australia Day\n- Fri, 3 Apr Good Friday\n- Mon, 6 Apr Easter Monday\n- Sat, 25 Apr Anzac Day\n- Mon, 8 Jun King's Birthday (except QLD & WA)\n- Fri, 25 Dec Christmas Day\n- Sat, 26 Dec Boxing Day" },
        { id: 2, title: "Sales targets for 2026", category: "Sales", lastUpdated: "Jul 7, 2025", content: "Looking to get $15M in sales in 2026." },
        { id: 3, title: "Company Mission Statement", category: "General", lastUpdated: "Aug 15, 2025", content: "Our mission is to empower businesses with data-driven insights that drive growth and innovation. We believe in making complex analytics accessible and actionable for teams of all sizes." },
        { id: 4, title: "Q4 Marketing Campaign Goals", category: "Marketing", lastUpdated: "Sep 1, 2025", content: "Q4 Marketing Goals:\n- Increase brand awareness by 25%\n- Generate 500 qualified leads\n- Launch holiday campaign\n- Optimize conversion funnel\n- Expand social media presence" },
    ])

    // Force narrow layout on this page
    useEffect(() => {
        setIsMainSidebarOpen(false)
    }, [])

    const uniqueContextCategories = useMemo(() => Array.from(new Set(contextItems.map(r => r.category))), [contextItems])

    const filteredContextRows = useMemo(() => {
        return contextItems.filter(r => {
            const matchesSearch = contextSearchQuery.trim() === "" || r.title.toLowerCase().includes(contextSearchQuery.trim().toLowerCase())
            const matchesCategory = appliedContextCategories.length === 0 || appliedContextCategories.includes(r.category)
            return matchesSearch && matchesCategory
        })
    }, [contextItems, contextSearchQuery, appliedContextCategories])

    // Drawer functions
    const openNewContextDrawer = () => {
        setIsEditMode(false)
        setFormData({ title: "", category: "", content: "" })
        setSelectedContextItem(null)
        setDrawerOpen(true)
    }

    const openEditContextDrawer = (item: typeof contextItems[0]) => {
        setIsEditMode(true)
        setFormData({ title: item.title, category: item.category, content: item.content })
        setSelectedContextItem(item)
        setDrawerOpen(true)
    }

    const handleSave = () => {
        if (isEditMode && selectedContextItem) {
            // Update existing item
            setContextItems(prev => prev.map(item =>
                item.id === selectedContextItem.id
                    ? { ...item, title: formData.title, category: formData.category, content: formData.content, lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
                    : item
            ))
        } else {
            // Create new item
            const newId = Math.max(...contextItems.map(item => item.id)) + 1
            const newItem = {
                id: newId,
                title: formData.title,
                category: formData.category,
                content: formData.content,
                lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }
            setContextItems(prev => [...prev, newItem])
        }
        setDrawerOpen(false)
    }

    const secondaryPanelItems = [
        {
            name: "Quality",
            href: "/data_management/quality",
        },
        {
            name: "Sources",
            href: "/data_management/sources",
        },
        {
            name: "Context",
            href: "/data_management/context",
        },
        {
            name: "Metrics",
            href: "/data_management/metrics",
        },
        {
            name: "Events",
            href: "/data_management/event",
        },
        {
            name: "Customer Properties",
            href: "/data_management/customer",
        },
        {
            name: "Channel Grouping",
            href: "/data_management/channel-grouping",
        },
        {
            name: "Reporting Settings",
            href: "/data_management/settings",
        },

    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <SingleLayerMenu forceState="narrow" />
            <DoubleLayeredMenu
                isMainSidebarOpen={isMainSidebarOpen}
                secondaryPanelItems={secondaryPanelItems}
                panelTitle="Data"
                activeItem="Context"
            />

            <HeaderFilter showFilters={false} title="Context" forceNarrowLayout showActionButton={false} showMenu={false} leftOffset={isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)"} />

            <div
                className="px-6 pt-24 pb-6 mx-auto"
                style={{
                    marginLeft: isMainSidebarOpen ? "calc(340px + 220px)" : "calc(64px + 220px)",
                    maxWidth: isMainSidebarOpen ? "calc(100vw - 340px - 220px)" : "calc(100vw - 64px - 220px)"
                }}
            >
                {/* Page Content */}
                <div className="space-y-6">
                    {/* Context Table */}
                    <div className="mt-6">
                        <div className="flow-root">
                            <div className="overflow-x-auto">
                                <div className="inline-block min-w-full py-2 align-middle">
                                    <div className="overflow-hidden rounded-lg bg-white shadow outline outline-1 outline-black/5">
                                        <table className="relative min-w-full divide-y divide-gray-300 table-fixed">
                                            <colgroup>
                                                <col className="w-[50%]" />
                                                <col className="w-[25%]" />
                                                <col className="w-[25%]" />
                                            </colgroup>
                                            <thead className="bg-white">
                                                <tr>
                                                    <th colSpan={3} className="h-[70px] py-3 pl-4 pr-3 text-left sm:pl-6 border-b border-gray-200">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <div className="text-gray-900 text-lg font-semibold">Context</div>
                                                                <div className="text-gray-500 text-sm/6 mt-1 flex items-center gap-2">
                                                                    <img src="/Definition.svg" alt="" className="h-4 w-4" />
                                                                    <span className="font-normal">Richer context means better, more accurate insights from AI.</span>
                                                                </div>
                                                            </div>
                                                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors" onClick={openNewContextDrawer}>
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                </svg>
                                                                Add Context
                                                            </button>
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr className="bg-white">
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        <Popover open={contextSearchOpen} onOpenChange={setContextSearchOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                    <span>Title</span>
                                                                    <img src={contextSearchQuery.trim() !== "" ? "/Sort.svg" : "/Magnifer.svg"} alt="Search" className="h-4 w-4" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="start" className="w-72 p-3">
                                                                <div className="space-y-2">
                                                                    <div className="relative">
                                                                        <img src="/Magnifer.svg" alt="" className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                                                                        <Input
                                                                            value={contextSearchDraft}
                                                                            onChange={(e) => setContextSearchDraft(e.target.value)}
                                                                            placeholder="Search titles..."
                                                                            className="h-9 pl-8"
                                                                        />
                                                                    </div>
                                                                    <div className="pt-1 flex items-center gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            className="h-9 flex-1"
                                                                            onClick={() => { setContextSearchQuery(""); setContextSearchDraft(""); setContextSearchOpen(false) }}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                        <Button
                                                                            className="h-9 flex-1"
                                                                            onClick={() => { setContextSearchQuery(contextSearchDraft); setContextSearchOpen(false) }}
                                                                        >
                                                                            Search
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        <Popover open={contextCategoryFilterOpen} onOpenChange={setContextCategoryFilterOpen}>
                                                            <PopoverTrigger asChild>
                                                                <button type="button" className="inline-flex items-center gap-1.5 hover:text-gray-700">
                                                                    <span>Category</span>
                                                                    <img src={appliedContextCategories.length > 0 ? "/Sort.svg" : "/List.svg"} alt="" className="h-4 w-4" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent align="start" className="w-64 p-3">
                                                                <div className="space-y-2">
                                                                    {uniqueContextCategories.map((label) => {
                                                                        const checked = selectedContextCategoriesDraft.has(label)
                                                                        return (
                                                                            <label key={label} className="flex items-center gap-2 text-sm text-gray-900">
                                                                                <Checkbox
                                                                                    checked={checked}
                                                                                    onCheckedChange={(v) => {
                                                                                        setSelectedContextCategoriesDraft(prev => {
                                                                                            const next = new Set(prev)
                                                                                            if (v) next.add(label); else next.delete(label)
                                                                                            return next
                                                                                        })
                                                                                    }}
                                                                                />
                                                                                <span>{label}</span>
                                                                            </label>
                                                                        )
                                                                    })}
                                                                    <div className="pt-2 flex items-center gap-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            className="h-9 flex-1"
                                                                            onClick={() => {
                                                                                setAppliedContextCategories([])
                                                                                setSelectedContextCategoriesDraft(new Set())
                                                                                setContextCategoryFilterOpen(false)
                                                                            }}
                                                                        >
                                                                            Clear filters
                                                                        </Button>
                                                                        <Button
                                                                            className="h-9 flex-1"
                                                                            onClick={() => {
                                                                                setAppliedContextCategories(Array.from(selectedContextCategoriesDraft))
                                                                                setContextCategoryFilterOpen(false)
                                                                            }}
                                                                        >
                                                                            Filter
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Last Updated
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {filteredContextRows.map((row) => {
                                                    return (
                                                        <tr key={row.id} className="cursor-pointer hover:bg-gray-50" onClick={() => openEditContextDrawer(row)}>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{row.title}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.category}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.lastUpdated}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right-side Drawer with backdrop */}
            {drawerOpen && (
                <div className="relative z-[10000001]">
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-[10000000] bg-gray-500/75 cursor-pointer" onClick={() => setDrawerOpen(false)} />

                    <div className="fixed inset-0 z-[10000002] overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <div className="pointer-events-auto relative w-screen max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl transform transition duration-500 ease-in-out translate-x-0">
                                    {/* Outside close button */}
                                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                        <button
                                            type="button"
                                            onClick={() => setDrawerOpen(false)}
                                            className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            <span className="absolute -inset-2.5" />
                                            <span className="sr-only">Close panel</span>
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <div className="relative flex h-full flex-col bg-white shadow-xl">
                                        <div className="sticky top-0 z-10 bg-white px-4 sm:px-6 h-[61px] border-b flex items-center">
                                            <h2 className="text-lg font-semibold text-gray-900">{isEditMode ? "Edit Context" : "New Context"}</h2>
                                        </div>
                                        <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Title
                                                    </label>
                                                    <Input
                                                        id="title"
                                                        value={formData.title}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                                        className="w-full"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Category
                                                    </label>
                                                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Company">Company</SelectItem>
                                                            <SelectItem value="Product">Product</SelectItem>
                                                            <SelectItem value="Marketing">Marketing</SelectItem>
                                                            <SelectItem value="Sales">Sales</SelectItem>
                                                            <SelectItem value="Operations">Operations</SelectItem>
                                                            <SelectItem value="Culture">Culture</SelectItem>
                                                            <SelectItem value="Strategy">Strategy</SelectItem>
                                                            <SelectItem value="General">General</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Content
                                                    </label>
                                                    <Textarea
                                                        id="content"
                                                        value={formData.content}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                                        className="w-full min-h-[200px]"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-end space-x-3 pt-6">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setDrawerOpen(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button className="bg-black text-white hover:bg-gray-800" onClick={handleSave}>
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 