import SideMenu from "@/components/side-menu"
import DataDashboard from "@/components/data-dashboard"

export default function DataPage() {
  return (
    <div className="flex h-screen bg-white">
      <SideMenu />
      <main className="flex-1">
        <DataDashboard />
      </main>
    </div>
  )
}
