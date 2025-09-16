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
    sourceValue?: string
    onSourceChange?: (value: string) => void
    sourceOptions?: string[]
    statusValue?: "all" | "green" | "orange" | "red" | "inactive"
    onStatusChange?: (value: "all" | "green" | "orange" | "red" | "inactive") => void

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
}

export default function HeaderFilter({
    typeValue = "all",
    onTypeChange,
    sourceValue = "all",
    onSourceChange,
    sourceOptions = [],
    statusValue = "all",
    onStatusChange,
    showFilters = true,
    actionLabel = "Add Metric",
    useActionDialog = true,
    onActionClick,
    forceNarrowLayout = false,
    leftOffset,
    title,
    showActionButton = true,
    showMenu = true,
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
                    {showFilters ? (
                        <>
                            <div className="w-44">
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
                {showActionButton && (
                    useActionDialog ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="h-9 absolute right-16">
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
                        <Button className="h-9 absolute right-16" onClick={onActionClick}>
                            <Plus className="h-4 w-4" />
                            {actionLabel}
                        </Button>
                    )
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
                            <DropdownMenuItem>Delete Workspace</DropdownMenuItem>
                            <DropdownMenuItem>Request Workspace Data Export</DropdownMenuItem>
                            <DropdownMenuItem>Contact Support</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    )
} 