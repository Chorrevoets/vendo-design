import SideMenu from "@/components/side-menu"
import MetricDetail from "@/components/metric-detail"

interface MetricDetailPageProps {
  params: {
    id: string
  }
}

export default function MetricDetailPage({ params }: MetricDetailPageProps) {
  return (
    <div className="flex h-screen bg-white">
      <SideMenu />
      <main className="flex-1">
        <MetricDetail metricId={params.id} />
      </main>
    </div>
  )
}
