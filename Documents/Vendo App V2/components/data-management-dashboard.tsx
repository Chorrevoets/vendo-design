"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Activity, BarChart3, Users, FileText, Zap, Target, ArrowRight, Database, Settings } from "lucide-react"

interface QuickActionCard {
  icon: any
  title: string
  description: string
  href: string
  status?: "active" | "warning" | "error"
}

const connectionCards: QuickActionCard[] = [
  {
    icon: Activity,
    title: "Sources",
    description: "Manage data sources and integrations",
    href: "/data_management/sources",
    status: "active",
  },
  {
    icon: Target,
    title: "Destinations",
    description: "Configure data destinations",
    href: "/data_management/destinations",
    status: "warning",
  },
]

const propertyCards: QuickActionCard[] = [
  {
    icon: Zap,
    title: "Event",
    description: "Configure event tracking and properties",
    href: "/data_management/events",
  },
  {
    icon: Users,
    title: "Customer",
    description: "Manage customer data and attributes",
    href: "/data_management/customers",
  },
  {
    icon: Target,
    title: "Advertising",
    description: "Set up advertising data tracking",
    href: "/data_management/ads",
  },
]

const customizationCards: QuickActionCard[] = [
  {
    icon: BarChart3,
    title: "Channel Grouping",
    description: "Organize marketing channels",
    href: "/data_management/channel-grouping",
  },
  {
    icon: FileText,
    title: "Context",
    description: "Manage contextual data and documents",
    href: "/data_management/documents",
  },
  {
    icon: Activity,
    title: "Funnel Analysis",
    description: "Configure conversion funnels",
    href: "/data_management/funnel-analysis",
  },
  {
    icon: Zap,
    title: "Quality Control",
    description: "Set up data quality checks",
    href: "/data_management/testing",
  },
]

function QuickActionCard({ icon: Icon, title, description, href, status }: QuickActionCard) {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "border-green-200 bg-green-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "error":
        return "border-red-200 bg-red-50"
      default:
        return "border-gray-200 bg-white"
    }
  }

  const getStatusDot = () => {
    switch (status) {
      case "active":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />
      case "warning":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />
      case "error":
        return <div className="w-2 h-2 bg-red-500 rounded-full" />
      default:
        return null
    }
  }

  return (
    <Card
      className={`cursor-pointer hover:shadow-md transition-shadow ${getStatusColor()}`}
      onClick={() => (window.location.href = href)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Icon className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                {getStatusDot()}
              </div>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function DataManagementDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Management</h1>
        <p className="text-gray-600">Configure your data structure, connections, and customizations</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Database className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Connections</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tracked Events</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Configurations</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connections */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Connections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectionCards.map((card, index) => (
            <QuickActionCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Properties */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {propertyCards.map((card, index) => (
            <QuickActionCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Customizations */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Customizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {customizationCards.map((card, index) => (
            <QuickActionCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}
