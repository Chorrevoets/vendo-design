import SideMenu from "@/components/side-menu"
import CopilotChat from "@/components/copilot-chat"

export default function Home() {
  return (
    <div className="h-screen">
      <SideMenu />
      <main className="h-screen flex flex-col relative" style={{ marginLeft: "var(--sidebar-width, 256px)" }}>
        <CopilotChat />
      </main>
    </div>
  )
}
