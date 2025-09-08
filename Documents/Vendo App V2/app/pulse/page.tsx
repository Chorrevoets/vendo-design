"use client"
import SingleLayerMenu from "@/components/single-layer-menu"
import PulseFeed from "@/components/pulse-feed"
import { useState } from "react"
import HeaderFilter from "@/components/header-filter"

export default function PulsePage() {
  const [menuState, setMenuState] = useState<"open" | "hidden">("open")
  return (
    <div className="h-screen bg-white">
      <SingleLayerMenu forceState={menuState} onToggleState={(next) => setMenuState(next === "narrow" ? "open" : (next as "open" | "hidden"))} />
      <HeaderFilter showFilters={false} title="Pulse" showActionButton={false} showMenu={false} />
      <main className="h-screen flex flex-col relative" style={{ marginLeft: "var(--content-left, var(--sidebar-width, 0px))" }}>
        <PulseFeed />
      </main>
    </div>
  )
}
