import SideMenu from "@/components/side-menu"
import CopilotChat from "@/components/copilot-chat"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    <div className="h-screen bg-transparent">
      <SideMenu />
      <main className="h-screen flex flex-col relative pt-6" style={{ marginLeft: "var(--sidebar-width, 256px)" }}>
        <CopilotChat chatId={params.id} />
      </main>
    </div>
  )
}
