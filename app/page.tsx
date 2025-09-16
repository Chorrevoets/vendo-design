import ShortCutMenu from "@/components/short-cut-menu"
import CopilotChat from "@/components/copilot-chat"

export default function Home() {
  return (
    <div className="h-screen">
      <ShortCutMenu />
      <main className="h-screen flex flex-col relative" style={{ marginLeft: "64px" }}>
        <CopilotChat />
      </main>
    </div>
  )
}
