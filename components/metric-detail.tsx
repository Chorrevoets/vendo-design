"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Bookmark, BookmarkCheck, CalendarIcon, TrendingUp, TrendingDown, Filter } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { format, subDays } from "date-fns"

interface MetricDetailProps {
  metricId: string
}

// Sample metric data
const metricData = {
  "1": {
    name: "Customer Acquisition Cost (CAC)",
    type: "Acquisition Metrics",
    description:
      "The total overall cost to acquire a customer, including the cost of producing, storing, and shipping items.",
    unit: "$",
    format: "currency" as const,
  },
  "2": {
    name: "Click Through Rate (CTR)",
    type: "Acquisition Metrics",
    description:
      "Rate at which someone clicks on an email campaign, ad, social media post, etc., and lands on your website",
    unit: "%",
    format: "percentage" as const,
  },
  "5": {
    name: "Monthly Recurring Revenue (MRR)",
    type: "Revenue",
    description: "The monthly revenue generated from recurring subscriptions or purchases",
    unit: "$",
    format: "currency" as const,
  },
}

// Generate sample chart data
const generateChartData = (days: number, baseValue: number, volatility = 0.1) => {
  const data = []
  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i)
    const randomChange = (Math.random() - 0.5) * volatility * baseValue
    const value = Math.max(0, baseValue + randomChange + (Math.random() - 0.5) * baseValue * 0.05)
    data.push({
      date: format(date, "MMM dd"),
      value: Number(value.toFixed(2)),
      fullDate: format(date, "yyyy-MM-dd"),
    })
  }
  return data
}

// Generate sample table data
const generateTableData = (segmentType: string) => {
  const segments = {
    Device: ["Desktop", "Mobile", "Tablet"],
    City: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"],
    Channel: ["Organic Search", "Paid Search", "Social Media", "Email", "Direct"],
    Source: ["Google", "Facebook", "Instagram", "LinkedIn", "Twitter", "Direct"],
  }

  return (
    segments[segmentType as keyof typeof segments]?.map((segment, index) => ({
      segment,
      value: Math.random() * 1000 + 100,
      change: (Math.random() - 0.5) * 40,
      sessions: Math.floor(Math.random() * 10000) + 1000,
      conversions: Math.floor(Math.random() * 500) + 50,
    })) || []
  )
}

const formatValue = (value: number, format: string, unit: string) => {
  switch (format) {
    case "currency":
      return `$${value.toLocaleString()}`
    case "percentage":
      return `${value.toFixed(1)}%`
    default:
      return `${value.toFixed(1)}${unit}`
  }
}

export default function MetricDetail({ metricId }: MetricDetailProps) {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [segmentType, setSegmentType] = useState("Device")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const chartData = useMemo(() => {
    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    const baseValue = metricId === "1" ? 127 : metricId === "2" ? 2.3 : 24500
    return generateChartData(days, baseValue)
  }, [dateRange, metricId])

  const tableData = useMemo(() => generateTableData(segmentType), [segmentType])

  const metric = metricData[metricId as keyof typeof metricData]
  const currentValue = chartData[chartData.length - 1]?.value || 0
  const previousValue = chartData[chartData.length - 8]?.value || 0
  const change = previousValue ? ((currentValue - previousValue) / previousValue) * 100 : 0

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // Here you would typically update the bookmarks in your global state or API
    console.log(`${isBookmarked ? "Removed" : "Added"} bookmark for ${metric.name}`)
  }

  if (!metric) {
    return (
      <div className="min-h-screen bg-white overflow-x-hidden" style={{ paddingLeft: "var(--sidebar-width, 256px)" }}>
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Result not found</h1>
            <Button onClick={() => window.history.back()} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ paddingLeft: "var(--sidebar-width, 256px)" }}>
      <div className="p-4 sm:p-8 pr-4 sm:pr-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Key Results
            </Button>
            <div className="h-4 w-px bg-gray-300" />
            <Badge variant="secondary">{metric.type}</Badge>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">{metric.name}</h1>
              <p className="text-gray-600 break-words">{metric.description}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`gap-2 ${isBookmarked ? "text-purple-600" : "text-gray-500"}`}
            >
              {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <CalendarIcon className="h-4 w-4" />
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                  : "Select date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to })
                    setIsDatePickerOpen(false)
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select value={segmentType} onValueChange={setSegmentType}>
            <SelectTrigger className="w-full sm:w-48 min-w-0">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Device">Device</SelectItem>
              <SelectItem value="City">City</SelectItem>
              <SelectItem value="Channel">Channel</SelectItem>
              <SelectItem value="Source">Source</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Current Value Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Value</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatValue(currentValue, metric.format, metric.unit)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">7-day Change</p>
                <div className={`flex items-center gap-1 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="font-semibold">{Math.abs(change).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Trend Over Time</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ChartContainer
              config={{
                value: {
                  label: metric.name,
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px] sm:h-[400px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: any) => [formatValue(value, metric.format, metric.unit), metric.name]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-value)", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Breakdown Table */}
        <Card>
          <CardHeader>
            <CardTitle>Breakdown by {segmentType}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">{segmentType}</TableHead>
                    <TableHead className="text-right min-w-[80px]">Value</TableHead>
                    <TableHead className="text-right min-w-[80px]">Change</TableHead>
                    <TableHead className="text-right min-w-[100px]">Sessions</TableHead>
                    <TableHead className="text-right min-w-[120px]">Conversions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium whitespace-nowrap">{row.segment}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {formatValue(row.value, metric.format, metric.unit)}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <span className={row.change >= 0 ? "text-green-600" : "text-red-600"}>
                          {row.change >= 0 ? "+" : ""}
                          {row.change.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">{row.sessions.toLocaleString()}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">{row.conversions.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
