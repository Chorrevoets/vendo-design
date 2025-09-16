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
    <div className="flex-1 flex flex-col h-full">
      {/* Feed */}
      <div
        className="flex-1 overflow-y-auto w-full mx-auto px-6 pt-20 pb-6 max-[750px]:px-2"
      >
        <div className="max-w-[1400px] mx-auto space-y-6">
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
