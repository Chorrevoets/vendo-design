"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type HeaderFilterProps = {
    // Filters (optional)
    typeValue?: "all" | "event" | "custom" | "funnel"
    onTypeChange?: (value: "all" | "event" | "custom" | "funnel") => void
    // When true, render a search input instead of the type dropdown
    showTypeAsSearch?: boolean
    searchValue?: string
    onSearchChange?: (value: string) => void
    searchPlaceholder?: string
    sourceValue?: string
    onSourceChange?: (value: string) => void
    sourceOptions?: string[]
    statusValue?: "all" | "green" | "orange" | "red" | "inactive"
    onStatusChange?: (value: "all" | "green" | "orange" | "red" | "inactive") => void

    // Pulse-specific filters
    showPulseFilters?: boolean
    pulseSearchValue?: string
    onPulseSearchChange?: (value: string) => void
    dateFromValue?: string
    onDateFromChange?: (value: string) => void
    dateToValue?: string
    onDateToChange?: (value: string) => void
    onClearFilters?: () => void

    // Presentation
    showFilters?: boolean
    actionLabel?: string
    useActionDialog?: boolean
    onActionClick?: () => void
    forceNarrowLayout?: boolean
    leftOffset?: string
    title?: string
    showActionButton?: boolean
    showMenu?: boolean
    onMenuAction?: (action: string) => void
    secondaryActionLabel?: string
    onSecondaryActionClick?: () => void
    secondaryIconSrc?: string
}

export default function HeaderFilter({
    typeValue = "all",
    onTypeChange,
    showTypeAsSearch = false,
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    sourceValue = "all",
    onSourceChange,
    sourceOptions = [],
    statusValue = "all",
    onStatusChange,
    showPulseFilters = false,
    pulseSearchValue = "",
    onPulseSearchChange,
    dateFromValue = "",
    onDateFromChange,
    dateToValue = "",
    onDateToChange,
    onClearFilters,
    showFilters = true,
    actionLabel = "Add Metric",
    useActionDialog = true,
    onActionClick,
    forceNarrowLayout = false,
    leftOffset,
    title,
    showActionButton = true,
    showMenu = true,
    onMenuAction,
    secondaryActionLabel,
    onSecondaryActionClick,
    secondaryIconSrc,
}: HeaderFilterProps) {
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(true)
    const [sidebarWidthPx, setSidebarWidthPx] = useState(0)

    useEffect(() => {
        const checkSidebarState = () => {
            const sidebarWidth = document.documentElement.style.getPropertyValue("--sidebar-width")
            const numeric = parseInt(sidebarWidth || "0", 10) || 0
            setSidebarWidthPx(numeric)
            const isOpen = numeric > 0
            setIsMainSidebarOpen(isOpen)
        }

        checkSidebarState()
        const interval = setInterval(checkSidebarState, 100)
        return () => clearInterval(interval)
    }, [])

    const fallbackLeft = forceNarrowLayout
        ? "calc(64px + 220px)"
        : isMainSidebarOpen
            ? "calc(340px + 220px)"
            : "calc(64px + 220px)"
    const effectiveLeft = leftOffset ?? `var(--header-left, var(--content-left, ${fallbackLeft}))`

    return (
        <div
            className="fixed top-0 right-0 h-[61px] bg-white border-b border-gray-200 z-[10001]"
            style={{
                left: effectiveLeft,
            }}
        >
            <div className="h-full px-6 flex items-center gap-3 relative">
                {title ? (
                    <div className="text-base sm:text-lg font-semibold text-gray-900 mr-4">
                        {title}
                    </div>
                ) : null}
                {showFilters ? (
                    <div className="text-sm text-gray-500 mr-2">Filters</div>
                ) : null}

                <div className={`flex items-center gap-3 flex-wrap flex-1 pr-28`}>
                    {showPulseFilters ? (
                        <>
                            {/* Pulse Search */}
                            <div className="w-80">
                                <div className="relative">
                                    <svg className="h-4 w-4 text-gray-400 pointer-events-none absolute left-2 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <Input
                                        value={pulseSearchValue}
                                        onChange={(e) => onPulseSearchChange && onPulseSearchChange(e.target.value)}
                                        placeholder="Search annotations..."
                                        className="h-9 pl-8"
                                    />
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="flex items-center gap-2">
                                <Input
                                    type="date"
                                    value={dateFromValue}
                                    onChange={(e) => onDateFromChange && onDateFromChange(e.target.value)}
                                    className="h-9 w-40"
                                />
                                <span className="text-gray-500 text-sm">to</span>
                                <Input
                                    type="date"
                                    value={dateToValue}
                                    onChange={(e) => onDateToChange && onDateToChange(e.target.value)}
                                    className="h-9 w-40"
                                />
                            </div>

                            {/* Clear Filters */}
                            {(pulseSearchValue || dateFromValue || dateToValue) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onClearFilters}
                                    className="h-9"
                                >
                                    Clear
                                </Button>
                            )}
                        </>
                    ) : showFilters ? (
                        <>
                            <div className="w-56">
                                {showTypeAsSearch ? (
                                    <div className="relative">
                                        <img src="/Magnifer.svg" alt="Search" className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                                        <Input
                                            value={searchValue}
                                            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                                            placeholder={searchPlaceholder}
                                            className="h-9 pl-8"
                                        />
                                    </div>
                                ) : (
                                    <Select value={typeValue} onValueChange={(v) => onTypeChange && onTypeChange(v as any)}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="All Metrics" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Metrics</SelectItem>
                                            <SelectItem value="event">Event</SelectItem>
                                            <SelectItem value="custom">Custom Metric</SelectItem>
                                            <SelectItem value="funnel">Funnel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>

                            <div className="w-44">
                                <Select value={sourceValue} onValueChange={(v) => onSourceChange && onSourceChange(v)}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue placeholder="All Sources" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Sources</SelectItem>
                                        {sourceOptions.map((s) => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-44">
                                <Select value={statusValue} onValueChange={(v) => onStatusChange && onStatusChange(v as any)}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="green">Green</SelectItem>
                                        <SelectItem value="orange">Orange</SelectItem>
                                        <SelectItem value="red">Red</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    ) : null}
                </div>

                {/* Right-side controls */}
                {(showActionButton || secondaryActionLabel) && (
                    <div className="absolute right-16 flex items-center gap-2">
                        {secondaryActionLabel && (
                            <Button className="h-9" variant="outline" onClick={onSecondaryActionClick}>
                                {secondaryIconSrc && (
                                    <img src={secondaryIconSrc} alt="" className="h-4 w-4 mr-1.5" />
                                )}
                                {secondaryActionLabel}
                            </Button>
                        )}
                        {showActionButton && (
                            useActionDialog ? (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="h-9">
                                            <Plus className="h-4 w-4" />
                                            {actionLabel}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{actionLabel}</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-2">
                                            <div className="grid gap-2">
                                                <Label htmlFor="metric-name">Name</Label>
                                                <Input id="metric-name" placeholder="Enter a name" />
                                            </div>
                                            <div className="grid gap-2 md:grid-cols-3 md:gap-4">
                                                <div>
                                                    <Label>Type</Label>
                                                    <Select defaultValue="event">
                                                        <SelectTrigger className="h-9 mt-1">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="event">Event</SelectItem>
                                                            <SelectItem value="custom">Custom Metric</SelectItem>
                                                            <SelectItem value="funnel">Funnel</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label>Source</Label>
                                                    <Select defaultValue="shopify">
                                                        <SelectTrigger className="h-9 mt-1">
                                                            <SelectValue placeholder="Select source" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="shopify">Shopify</SelectItem>
                                                            <SelectItem value="meta">Meta</SelectItem>
                                                            <SelectItem value="google">Google</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label>Status</Label>
                                                    <Select defaultValue="green">
                                                        <SelectTrigger className="h-9 mt-1">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="green">Green</SelectItem>
                                                            <SelectItem value="orange">Orange</SelectItem>
                                                            <SelectItem value="red">Red</SelectItem>
                                                            <SelectItem value="inactive">Inactive</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="button">Create</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                <Button className="h-9" onClick={onActionClick}>
                                    <Plus className="h-4 w-4" />
                                    {actionLabel}
                                </Button>
                            )
                        )}
                    </div>
                )}

                {/* Three-dot menu at the far right */}
                {showMenu && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 absolute right-6">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            {onMenuAction ? (
                                <DropdownMenuItem onClick={() => onMenuAction('change-sort-order')}>
                                    Change sort order
                                </DropdownMenuItem>
                            ) : (
                                <>
                                    <DropdownMenuItem>Delete Workspace</DropdownMenuItem>
                                    <DropdownMenuItem>Request Workspace Data Export</DropdownMenuItem>
                                    <DropdownMenuItem>Contact Support</DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    )
} 