"use client"

import { useState } from "react"

interface PulseUpdate {
  id: string
  bgColor: string
}

const pulseUpdates: PulseUpdate[] = [
  { id: "1", bgColor: "bg-[#dedcfeff]" },
  { id: "2", bgColor: "bg-[#d6e9f9ff]" },
  { id: "3", bgColor: "bg-[#d8f0f6ff]" },
  { id: "4", bgColor: "bg-[#dedcfeff]" },
  { id: "5", bgColor: "bg-[#d6e9f9ff]" },
  { id: "6", bgColor: "bg-[#d8f0f6ff]" },
  { id: "7", bgColor: "bg-[#dedcfeff]" },
  { id: "8", bgColor: "bg-[#d6e9f9ff]" },
]

export default function PulseFeed() {
  const [updates] = useState<PulseUpdate[]>(pulseUpdates)

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      {/* Feed */}
      <div
        className="flex-1 overflow-y-auto w-full mx-auto px-6 pt-20 pb-6"
        style={{
          marginLeft: "var(--sidebar-width, 0px)",
          maxWidth: "calc(100vw - var(--sidebar-width, 0px))",
        }}
      >
        <div className="space-y-6">
          {updates.map((update) => (
            <div
              key={update.id}
              className={`${update.bgColor} border border-gray-200 shadow-sm min-h-[120px] hover:opacity-80 transition-all duration-200 cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
