import SideMenu from "@/components/side-menu"
import ReportsPage from "@/components/reports-page"

export default function Reports() {
  return (
    <div className="h-screen bg-gray-50">
      <SideMenu />
      <main className="h-screen flex flex-col relative" style={{ marginLeft: "var(--sidebar-width, 256px)" }}>
        <ReportsPage />
      </main>
    </div>
  )
}
