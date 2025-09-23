"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
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
  // Form state
  const [timezone, setTimezone] = useState("Australia/Sydney")
  const [reportingCurrency, setReportingCurrency] = useState("AUD")
  const [originalValues, setOriginalValues] = useState({
    timezone: "Australia/Sydney",
    reportingCurrency: "AUD"
  })
  const [hasChanges, setHasChanges] = useState(false)

  // Check for changes
  useEffect(() => {
    const changed = timezone !== originalValues.timezone || reportingCurrency !== originalValues.reportingCurrency
    setHasChanges(changed)
  }, [timezone, reportingCurrency, originalValues])

  // Save handler
  const handleSave = () => {
    // Update original values to reflect saved state
    setOriginalValues({
      timezone,
      reportingCurrency
    })
    setHasChanges(false)
    // Here you would typically make an API call to save the settings
    console.log("Saving settings:", { timezone, reportingCurrency })
  }

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

      {/* General Settings */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">GENERAL SETTINGS</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Timezone Field */}
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                    <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                    <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reporting Currency Field */}
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Reporting Currency
                </label>
                <Select value={reportingCurrency} onValueChange={setReportingCurrency}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUD">AUD (Australian Dollar)</SelectItem>
                    <SelectItem value="USD">USD (US Dollar)</SelectItem>
                    <SelectItem value="EUR">EUR (Euro)</SelectItem>
                    <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                    <SelectItem value="JPY">JPY (Japanese Yen)</SelectItem>
                    <SelectItem value="CAD">CAD (Canadian Dollar)</SelectItem>
                    <SelectItem value="CHF">CHF (Swiss Franc)</SelectItem>
                    <SelectItem value="CNY">CNY (Chinese Yuan)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className={`px-6 ${hasChanges ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
