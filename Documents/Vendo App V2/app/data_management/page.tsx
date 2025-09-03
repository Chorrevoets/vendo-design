"use client"

import { SideMenu } from "@/components/side-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Database,
  Zap,
  Settings,
  Activity,
  Target,
  Users,
  BarChart3,
  FileText,
  ChevronRight
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function DataManagementPage() {
  const router = useRouter()

  const summaryCards = [
    {
      icon: Database,
      label: "Active Connections",
      value: "12",
      color: "text-green-600"
    },
    {
      icon: Zap,
      label: "Tracked Events",
      value: "47",
      color: "text-blue-600"
    },
    {
      icon: Settings,
      label: "Configurations",
      value: "8",
      color: "text-purple-600"
    }
  ]

  const connections = [
    {
      icon: Activity,
      label: "Sources",
      description: "Manage data sources and integrations",
      href: "/data_management/sources",
      status: "active",
      bgColor: "bg-green-50"
    },
    {
      icon: Target,
      label: "Destinations",
      description: "Configure data destinations",
      href: "/data_management/destinations",
      status: "inactive",
      bgColor: "bg-yellow-50"
    }
  ]

  const properties = [
    {
      icon: Zap,
      label: "Event",
      description: "Configure event tracking and properties",
      href: "/data_management/event"
    },
    {
      icon: Users,
      label: "Customer",
      description: "Manage customer data and attributes",
      href: "/data_management/customer"
    },
    {
      icon: Target,
      label: "Advertising",
      description: "Set up advertising data tracking",
      href: "/data_management/advertising"
    }
  ]

  const customizations = [
    {
      icon: BarChart3,
      label: "Channel Grouping",
      description: "Organize marketing channels",
      href: "/data_management/channel-grouping"
    },
    {
      icon: FileText,
      label: "Context",
      description: "Manage contextual data and documents",
      href: "/data_management/context"
    },
    {
      icon: Activity,
      label: "Funnel Analysis",
      description: "Configure conversion funnels",
      href: "/data_management/funnel-analysis"
    },
    {
      icon: Zap,
      label: "Quality Control",
      description: "Set up data quality checks",
      href: "/data_management/quality-control"
    }
  ]

  const handleCardClick = (href: string) => {
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu />

      <div
        className="px-6 pt-20 pb-6 mx-auto"
        style={{
          marginLeft: "var(--sidebar-width, 0px)",
          maxWidth: "calc(100vw - var(--sidebar-width, 0px))"
        }}
      >
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{card.label}</p>
                    <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                  </div>
                  <card.icon className={`h-8 w-8 ${card.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connections Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connections.map((item, index) => (
              <Card
                key={index}
                className={`${item.bgColor} hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => handleCardClick(item.href)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-6 w-6 text-gray-600" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{item.label}</h3>
                            <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                              }`} />
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Properties Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {properties.map((item, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCardClick(item.href)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <item.icon className="h-6 w-6 text-gray-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customizations Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Customizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customizations.map((item, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCardClick(item.href)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <item.icon className="h-6 w-6 text-gray-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
