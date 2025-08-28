"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Users,
  Database,
  UserCheck,
  BarChart3,
  Zap,
  Upload,
  Link,
  HelpCircle,
  FileText,
  Download,
  Target,
} from "lucide-react"

interface SettingItem {
  icon: any
  title: string
  description?: string
  href?: string
}

const accountSettings: SettingItem[] = [
  { icon: Building2, title: "Account details", href: "/settings/account-details" },
  { icon: UserCheck, title: "Access management" },
  { icon: Database, title: "Billing / Usage" },
]

const dataManagementSettings: SettingItem[] = [
  { icon: Zap, title: "Events" },
  { icon: Users, title: "Customers" },
  { icon: Target, title: "Ads" },
  { icon: BarChart3, title: "Channel Grouping" },
  { icon: FileText, title: "Documents" },
]

const dataConnectionsSettings: SettingItem[] = [
  { icon: Database, title: "Sources" },
  { icon: Zap, title: "Destinations" },
]

interface SettingsCardProps {
  title: string
  description: string
  items: SettingItem[]
  helpLink?: string
}

function SettingsCard({ title, description, items, helpLink }: SettingsCardProps) {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {description}
              {helpLink && (
                <Button variant="link" className="p-0 h-auto text-blue-600 ml-1">
                  {helpLink}
                </Button>
              )}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
                onClick={() => {
                  if (item.href) {
                    window.location.href = item.href
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">{item.title}</span>
                </div>
                <HelpCircle className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function SettingsDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        
      </div>

      {/* Account Settings */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">ACCOUNT SETTINGS</h2>
        <div className="grid grid-cols-1 gap-6">
          <SettingsCard
            title="Account"
            description=""
            items={accountSettings}
          />
        </div>
      </div>

      {/* Data Management */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">DATA MANAGEMENT</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SettingsCard
            title="Data Management"
            description="Configure your data structure, events, and customer information"
            items={dataManagementSettings}
          />
          <SettingsCard
            title="Data Connections"
            description="Manage data sources and destinations"
            items={dataConnectionsSettings}
          />
        </div>
      </div>
    </div>
  )
}
