import SideMenu from "@/components/side-menu"
import SettingsDashboard from "@/components/settings-dashboard"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-white">
      <SideMenu />
      <main className="flex-1">
        <SettingsDashboard />
      </main>
    </div>
  )
}
