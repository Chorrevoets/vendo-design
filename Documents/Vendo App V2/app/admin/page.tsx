import SideMenu from "@/components/side-menu"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-white">
      <SideMenu />
      <main className="flex-1">
        <AdminDashboard />
      </main>
    </div>
  )
}
