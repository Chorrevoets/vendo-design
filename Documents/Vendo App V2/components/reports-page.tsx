"use client"

import { useState } from "react"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const reportCards = [
    {
      id: "revenue-analysis",
      bgColor: "bg-[#dedcfe]",
    },
    {
      id: "customer-acquisition",
      bgColor: "bg-[#d6e9f9]",
    },
    {
      id: "performance-metrics",
      bgColor: "bg-[#d8f0f6]",
    },
    {
      id: "growth-analysis",
      bgColor: "bg-[#dedcfe]",
    },
    {
      id: "monthly-summary",
      bgColor: "bg-[#d6e9f9]",
    },
    {
      id: "custom-reports",
      bgColor: "bg-[#d8f0f6]",
    },
    {
      id: "conversion-funnel",
      bgColor: "bg-[#dedcfe]",
    },
    {
      id: "security-audit",
      bgColor: "bg-[#d6e9f9]",
    },
    {
      id: "engagement-metrics",
      bgColor: "bg-[#d8f0f6]",
    },
    {
      id: "market-analysis",
      bgColor: "bg-[#dedcfe]",
    },
    {
      id: "financial-overview",
      bgColor: "bg-[#d6e9f9]",
    },
    {
      id: "operational-health",
      bgColor: "bg-[#d8f0f6]",
    },
  ]

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Reports Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-20 max-[750px]:px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCards.map((report) => {
            return (
              <div
                key={report.id}
                className={`${report.bgColor} border border-gray-200 p-6 hover:opacity-80 transition-all duration-200 cursor-pointer shadow-sm min-h-[120px] ${selectedReport === report.id ? "ring-2 ring-blue-500" : ""
                  }`}
                onClick={() => setSelectedReport(report.id)}
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
