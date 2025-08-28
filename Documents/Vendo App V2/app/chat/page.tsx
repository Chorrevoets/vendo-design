"use client"

import { useSearchParams } from "next/navigation"
import { ExtractedShaderBackground } from "@/components/extracted-shader-background"
import { SideMenu } from "@/components/side-menu"
import { CopilotChat } from "@/components/copilot-chat"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get("prompt")

  return (
    <div className="relative min-h-screen">
      <ExtractedShaderBackground>
        <SideMenu forceMinimalHeader={true} />
        <div className="relative z-10" style={{ marginLeft: "var(--sidebar-width, 0px)" }}>
          <CopilotChat initialPrompt={initialPrompt} />
        </div>
      </ExtractedShaderBackground>
    </div>
  )
}
