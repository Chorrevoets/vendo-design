"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { ExtractedShaderBackground } from "@/components/extracted-shader-background"
import SingleLayerMenu from "@/components/single-layer-menu"
import { CopilotChat } from "@/components/copilot-chat"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get("prompt")
  const [menuState, setMenuState] = useState<"hidden" | "open">("hidden")

  return (
    <div className="relative min-h-screen">
      <ExtractedShaderBackground>
        <SingleLayerMenu
          forceState={menuState}
          onToggleState={(next) => setMenuState(next === "narrow" ? "open" : next)}
        />
        <div className="relative z-10">
          <CopilotChat initialPrompt={initialPrompt} />
        </div>
      </ExtractedShaderBackground>
    </div>
  )
}
