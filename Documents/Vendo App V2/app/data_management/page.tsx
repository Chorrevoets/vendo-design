import DataManagementNavigation from "@/components/data-management-navigation"
import DataManagementDashboard from "@/components/data-management-dashboard"

export default function DataManagementPage() {
  return (
    <div className="flex h-screen bg-white">
      <DataManagementNavigation />
      <main className="flex-1">
        <DataManagementDashboard />
      </main>
    </div>
  )
}
