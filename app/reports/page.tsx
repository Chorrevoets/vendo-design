"use client"
import SingleLayerMenu from "@/components/single-layer-menu"
import ReportsPage from "@/components/reports-page"
import { useState } from "react"
import HeaderFilter from "@/components/header-filter"

export default function Reports() {
  const [menuState, setMenuState] = useState<"open" | "hidden">("open")
  return (
    <div className="h-screen bg-gray-50">
      <SingleLayerMenu forceState={menuState} onToggleState={(next) => setMenuState(next === "narrow" ? "open" : (next as "open" | "hidden"))} />
      <HeaderFilter showFilters={false} title="Reports" showActionButton={false} showMenu={false} />
      <main className="h-screen flex flex-col relative" style={{ marginLeft: "var(--content-left, var(--sidebar-width, 0px))" }}>
        <ReportsPage />
      </main>
    </div>
  )
}
