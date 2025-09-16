import SideMenu from "@/components/side-menu"
import CopilotChat from "@/components/copilot-chat"

export default function CopilotPage() {
  return (
    <div className="flex h-screen bg-white">
      <SideMenu />
      <main className="flex-1 flex flex-col">
        <CopilotChat />
      </main>
    </div>
  )
}
