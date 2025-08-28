import SideMenu from "@/components/side-menu"
import MetricsManager from "@/components/metrics-manager"

export default function MetricsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu />
      <main className="w-full">
        <MetricsManager />
      </main>
    </div>
  )
}
