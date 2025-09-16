"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  Users,
  DollarSign,
  Target,
  Heart,
  Package,
  TrendingUp,
  MousePointer,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import Image from "next/image"

interface Metric {
  id: string
  name: string
  type: string
  description: string
  isVisible: boolean
  benchmarks?: string
  reference?: string
  currentValue: number
  previousValue: number
  unit: string
  format: "currency" | "percentage" | "number"
}

const defaultMetrics: Metric[] = [
  // Acquisition Metrics
  {
    id: "1",
    name: "Customer Acquisition Cost (CAC)",
    type: "Acquisition Metrics",
    description:
      "The total overall cost to acquire a customer, including the cost of producing, storing, and shipping items.",
    isVisible: true,
    benchmarks: "Varies by industry, typically $7-$200 depending on business model",
    currentValue: 127.5,
    previousValue: 142.3,
    unit: "$",
    format: "currency",
  },
  {
    id: "2",
    name: "Click Through Rate (CTR)",
    type: "Acquisition Metrics",
    description:
      "Rate at which someone clicks on an email campaign, ad, social media post, etc., and lands on your website",
    isVisible: true,
    benchmarks: "Google ads: 1.66% for search ads, 0.45% for display ads. Email: 2.01%",
    currentValue: 2.34,
    previousValue: 1.98,
    unit: "%",
    format: "percentage",
  },
  {
    id: "3",
    name: "Cost Per Click (CPC)",
    type: "Acquisition Metrics",
    description: "The amount you pay for each person who clicks on a link within a pay-per-click ad",
    isVisible: true,
    currentValue: 3.45,
    previousValue: 3.12,
    unit: "$",
    format: "currency",
  },
  {
    id: "4",
    name: "Return on Ad Spend (ROAS)",
    type: "Acquisition Metrics",
    description: "Total revenue generated from paid ad campaign ÷ total campaign ad spend",
    isVisible: true,
    currentValue: 4.2,
    previousValue: 3.8,
    unit: "x",
    format: "number",
  },
  // Revenue Metrics
  {
    id: "5",
    name: "Monthly Recurring Revenue (MRR)",
    type: "Revenue",
    description: "The monthly revenue generated from recurring subscriptions or purchases",
    isVisible: true,
    currentValue: 24500,
    previousValue: 22100,
    unit: "$",
    format: "currency",
  },
  {
    id: "6",
    name: "Average Order Value (AOV)",
    type: "Revenue",
    description: "Average dollar amount spent each time a customer places an order on a website",
    isVisible: true,
    currentValue: 89.5,
    previousValue: 85.2,
    unit: "$",
    format: "currency",
  },
  {
    id: "7",
    name: "Customer Lifetime Value (CLV)",
    type: "Revenue",
    description: "Total revenue business could expect from a single customer throughout their lifetime",
    isVisible: true,
    currentValue: 450.0,
    previousValue: 425.0,
    unit: "$",
    format: "currency",
  },
  {
    id: "8",
    name: "Gross Profit Margin",
    type: "Revenue",
    description:
      "The profit a business makes after subtracting all the costs related to manufacturing and selling products",
    isVisible: true,
    currentValue: 68.5,
    previousValue: 65.2,
    unit: "%",
    format: "percentage",
  },
  // Engagement Metrics
  {
    id: "9",
    name: "Bounce Rate",
    type: "Engagement Metrics",
    description: "Number of people who landed on your website and left without taking any action",
    isVisible: true,
    currentValue: 42.3,
    previousValue: 45.8,
    unit: "%",
    format: "percentage",
  },
  {
    id: "10",
    name: "Session Duration",
    type: "Engagement Metrics",
    description: "The amount of time user spends on the platform",
    isVisible: true,
    benchmarks: "About 60% of desktop sessions are up to 3.5 minutes",
    currentValue: 3.2,
    previousValue: 2.8,
    unit: "min",
    format: "number",
  },
  {
    id: "11",
    name: "Sessions per User",
    type: "Engagement Metrics",
    description: "The number of sessions user is starting",
    isVisible: true,
    currentValue: 2.4,
    previousValue: 2.1,
    unit: "",
    format: "number",
  },
  // Conversion Metrics
  {
    id: "12",
    name: "Cart Abandonment Rate",
    type: "Conversions",
    description: "% of visitors that added at least one product to cart but didn't check out",
    isVisible: true,
    benchmarks: "Falls between 69.75% and 85.65% depending on device type",
    currentValue: 72.1,
    previousValue: 75.3,
    unit: "%",
    format: "percentage",
  },
  {
    id: "13",
    name: "Store Conversion Rate",
    type: "Conversions",
    description: "Number of purchased products out of the total number of views on the product",
    isVisible: true,
    currentValue: 3.8,
    previousValue: 3.2,
    unit: "%",
    format: "percentage",
  },
  // Retention Metrics
  {
    id: "14",
    name: "Retention Rate",
    type: "Retention / Repeat Purchase Metrics",
    description: "% of customers that come back to order again",
    isVisible: true,
    benchmarks: "Average retention rate is around 20-30%",
    currentValue: 28.5,
    previousValue: 26.2,
    unit: "%",
    format: "percentage",
  },
  // Customer Happiness
  {
    id: "15",
    name: "Net Promoter Score (NPS)",
    type: "Customer Happiness",
    description: "Measures overall customer loyalty and satisfaction on a scale of 1-10",
    isVisible: true,
    currentValue: 42,
    previousValue: 38,
    unit: "",
    format: "number",
  },
  {
    id: "16",
    name: "Customer Satisfaction Score (CSAT)",
    type: "Customer Happiness",
    description: "Direct measure of customer satisfaction with your product or service",
    isVisible: true,
    currentValue: 4.2,
    previousValue: 4.0,
    unit: "/5",
    format: "number",
  },
  // Inventory
  {
    id: "17",
    name: "Inventory Turnover",
    type: "Inventory",
    description: "Shows how quickly the company sells its inventory over a specific period",
    isVisible: true,
    currentValue: 6.2,
    previousValue: 5.8,
    unit: "x",
    format: "number",
  },
]

const metricTypes = [
  "Acquisition Metrics",
  "Revenue",
  "Engagement Metrics",
  "Conversions",
  "Retention / Repeat Purchase Metrics",
  "Customer Happiness",
  "Inventory",
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Acquisition Metrics":
      return Target
    case "Revenue":
      return DollarSign
    case "Engagement Metrics":
      return BarChart3
    case "Conversions":
      return MousePointer
    case "Retention / Repeat Purchase Metrics":
      return Users
    case "Customer Happiness":
      return Heart
    case "Inventory":
      return Package
    default:
      return TrendingUp
  }
}

const getTypeColor = (type: string) => {
  return "bg-gray-100 text-gray-800"
}

const formatValue = (value: number, format: string, unit: string) => {
  switch (format) {
    case "currency":
      return `$${value.toLocaleString()}`
    case "percentage":
      return `${value.toFixed(1)}%`
    case "number":
      return `${value.toFixed(1)}${unit}`
    default:
      return `${value}${unit}`
  }
}

const calculateChange = (current: number, previous: number) => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

const getTrendIcon = (change: number) => {
  if (change > 0) return ArrowUp
  if (change < 0) return ArrowDown
  return Minus
}

const getTrendColor = (change: number, isGoodWhenUp = true) => {
  if (change === 0) return "text-gray-500"
  if (isGoodWhenUp) {
    return change > 0 ? "text-green-600" : "text-red-600"
  } else {
    return change > 0 ? "text-red-600" : "text-green-600"
  }
}

// Metrics where decrease is good (like bounce rate, CAC, etc.)
const reverseMetrics = [
  "Cart Abandonment Rate",
  "Bounce Rate",
  "Customer Acquisition Cost (CAC)",
  "Cost Per Click (CPC)",
]

const SortVerticalIcon = ({ className }: { className?: string }) => (
  <Image src="/sort-vertical-icon.svg" alt="Sort Vertical" width={16} height={16} className={className} />
)

export default function MetricsManager() {
  const [metrics, setMetrics] = useState<Metric[]>(defaultMetrics)
  const [isReorderMode, setIsReorderMode] = useState(false)
  const [draggedMetric, setDraggedMetric] = useState<string | null>(null)
  const [dragOverSection, setDragOverSection] = useState<string | null>(null)

  const filteredMetrics = useMemo(() => {
    return metrics
  }, [metrics])

  const groupedMetrics = useMemo(() => {
    const groups: Record<string, Metric[]> = {}
    filteredMetrics.forEach((metric) => {
      if (!groups[metric.type]) {
        groups[metric.type] = []
      }
      groups[metric.type].push(metric)
    })
    return groups
  }, [filteredMetrics])

  const wireframeColors = ["#dedcfeff", "#d6e9f9ff", "#d8f0f6ff"]
  const getWireframeColor = (index: number) => {
    return wireframeColors[index % wireframeColors.length]
  }

  const toggleVisibility = (id: string) => {
    setMetrics((prev) =>
      prev.map((metric) => (metric.id === id ? { ...metric, isVisible: !metric.isVisible } : metric)),
    )
  }

  const deleteMetric = (id: string) => {
    setMetrics((prev) => prev.filter((metric) => metric.id !== id))
  }

  const handleDragStart = (e: React.DragEvent, metricId: string) => {
    setDraggedMetric(metricId)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", metricId)
  }

  const handleDragEnd = () => {
    setDraggedMetric(null)
    setDragOverSection(null)
  }

  const handleDragOver = (e: React.DragEvent, sectionType: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverSection(sectionType)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if we're leaving the section entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverSection(null)
    }
  }

  const handleDrop = (e: React.DragEvent, newType: string) => {
    e.preventDefault()
    const metricId = e.dataTransfer.getData("text/plain")

    if (metricId && draggedMetric) {
      setMetrics((prev) => prev.map((metric) => (metric.id === metricId ? { ...metric, type: newType } : metric)))
    }

    setDraggedMetric(null)
    setDragOverSection(null)
  }

  const handleMetricClick = (metricId: string) => {
    window.location.href = `/metrics/${metricId}`
  }

  const handleReaction = (metricId: string, reaction: "up" | "down") => {
    // This would typically update the metric's reaction state
    console.log(`${reaction} reaction for metric:`, metricId)
  }

  return (
    <div
      className="p-8 pt-20 max-w-7xl mx-auto bg-gray-50 min-h-screen"
      style={{ paddingLeft: "max(2rem, calc(var(--sidebar-width, 256px) + 2rem))" }}
    >
      {/* Metrics List */}
      <div className="space-y-8">
        {Object.entries(groupedMetrics).map(([type, typeMetrics]) => {
          const Icon = getTypeIcon(type)
          return (
            <div
              key={type}
              onDragOver={(e) => handleDragOver(e, type)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, type)}
              className={`${dragOverSection === type && draggedMetric ? "bg-blue-50 border-2 border-blue-200 border-dashed rounded-lg p-4" : ""} transition-all duration-200`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="h-5 w-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">{type}</h2>
              </div>
              <div className="space-y-6">
                {typeMetrics.map((metric, index) => {
                  return (
                    <Card
                      key={metric.id}
                      draggable={isReorderMode}
                      onDragStart={(e) => handleDragStart(e, metric.id)}
                      onDragEnd={handleDragEnd}
                      className={`${!metric.isVisible ? "opacity-60 border-dashed" : ""} ${draggedMetric === metric.id ? "opacity-50 transform rotate-2" : ""} cursor-pointer hover:opacity-80 transition-all duration-200 ${isReorderMode ? "cursor-move" : ""} relative border-0 shadow-sm min-h-[120px] rounded-none`}
                      style={{ backgroundColor: getWireframeColor(index) }}
                      onClick={() => !isReorderMode && handleMetricClick(metric.id)}
                    >
                      <CardContent className="p-6">{/* Empty content for wireframe style */}</CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
