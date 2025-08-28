import SideMenu from "@/components/side-menu"
import PulseFeed from "@/components/pulse-feed"

export default function PulsePage() {
  return (
    <div className="flex h-screen bg-white">
      <SideMenu />
      <main className="flex-1">
        <PulseFeed />
      </main>
    </div>
  )
}
