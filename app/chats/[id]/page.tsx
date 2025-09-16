import SideMenu from "@/components/side-menu"
import CopilotChat from "@/components/copilot-chat"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params
  return (
    <div className="h-screen bg-transparent">
      <SideMenu />
      <main className="h-screen flex flex-col relative pt-6" style={{ marginLeft: "var(--sidebar-width, 256px)" }}>
        <CopilotChat chatId={id} />
      </main>
    </div>
  )
}
