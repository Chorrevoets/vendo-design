import SideMenu from "@/components/side-menu"
import DataModelManager from "@/components/data-model-manager"

export default function DataModelPage() {
  return (
    <div className="flex h-screen bg-white">
      <SideMenu />
      <main className="flex-1">
        <DataModelManager />
      </main>
    </div>
  )
}
