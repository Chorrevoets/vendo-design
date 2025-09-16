"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  Zap,
  Users,
  Target,
  GitBranch,
  Link,
  Upload,
  Download,
  Activity,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"

const dataMenuItems = [
  {
    id: "data-model",
    name: "Data Model",
    icon: Database,
    description: "Define your data structure and relationships",
    status: "active",
  },
  {
    id: "events",
    name: "Events",
    icon: Zap,
    description: "Track and manage user events and interactions",
    status: "active",
  },
  {
    id: "customers",
    name: "Customers",
    icon: Users,
    description: "Customer profiles and segmentation",
    status: "active",
  },
  {
    id: "ads",
    name: "Ads",
    icon: Target,
    description: "Advertising campaign data and performance",
    status: "pending",
  },
  {
    id: "channel-grouping",
    name: "Channel Grouping",
    icon: GitBranch,
    description: "Organize and categorize your marketing channels",
    status: "active",
  },
  {
    id: "connections",
    name: "Connections",
    icon: Link,
    description: "Manage integrations and data connections",
    status: "active",
  },
  {
    id: "sources",
    name: "Sources",
    icon: Upload,
    description: "Configure data sources and ingestion",
    status: "active",
  },
  {
    id: "destinations",
    name: "Destinations",
    icon: Download,
    description: "Set up data export destinations",
    status: "inactive",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "inactive":
      return <AlertCircle className="h-4 w-4 text-gray-400" />
    default:
      return <Activity className="h-4 w-4 text-blue-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "statusGreen"
    case "pending":
      return "statusOrange"
    case "inactive":
      return "statusGray"
    default:
      return "statusBlue"
  }
}

export default function DataDashboard() {
  const [activeSection, setActiveSection] = useState("data-model")

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    // Here you would typically navigate to the specific section
    console.log(`Navigating to ${sectionId}`)
  }

  const activeCount = dataMenuItems.filter((item) => item.status === "active").length
  const pendingCount = dataMenuItems.filter((item) => item.status === "pending").length
  const inactiveCount = dataMenuItems.filter((item) => item.status === "inactive").length

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Data Management</h1>
        <p className="text-gray-600 mt-2">
          Configure and manage your data infrastructure. {activeCount} active, {pendingCount} pending, {inactiveCount}{" "}
          inactive.
        </p>
      </div>

      {/* Secondary Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {dataMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                  {getStatusIcon(item.status)}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataMenuItems.map((item) => {
          const Icon = item.icon
          return (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                activeSection === item.id ? "ring-2 ring-purple-500 shadow-md" : ""
              }`}
              onClick={() => handleSectionClick(item.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </div>
                  <Badge variant={getStatusColor(item.status) as any}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(item.status)}
                    <span className="text-xs text-gray-500 capitalize">{item.status}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-3">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                <p className="text-sm text-gray-600">Active Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2.4M</p>
                <p className="text-sm text-gray-600">Events Processed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
                <p className="text-sm text-gray-600">Data Quality Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Data Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Data Model updated",
                description: "Added new customer attributes schema",
                time: "2 minutes ago",
                type: "success",
              },
              {
                action: "Source connected",
                description: "Shopify integration successfully configured",
                time: "15 minutes ago",
                type: "info",
              },
              {
                action: "Event tracking enabled",
                description: "Purchase events now being captured",
                time: "1 hour ago",
                type: "success",
              },
              {
                action: "Channel grouping updated",
                description: "Social media channels reorganized",
                time: "3 hours ago",
                type: "info",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "success" ? "bg-green-500" : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{activity.action}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
