"use client"

import { SideMenu } from "@/components/side-menu"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Database, FileText, Upload, Download, Settings } from "lucide-react"

export default function DataManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu />
      <Header title="Data Management" showIcons={true} />

      <div
        className="px-6 pt-20 pb-6 mx-auto"
        style={{
          marginLeft: "var(--sidebar-width, 0px)",
          maxWidth: "calc(100vw - var(--sidebar-width, 0px))"
        }}
      >
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Datasets</CardTitle>
                  <Database className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">24</div>
                <p className="text-xs text-gray-500 mt-1">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Sources</CardTitle>
                  <BarChart3 className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">18</div>
                <p className="text-xs text-gray-500 mt-1">+1 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Data Volume</CardTitle>
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">2.4TB</div>
                <p className="text-xs text-gray-500 mt-1">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Sync Status</CardTitle>
                  <Settings className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98%</div>
                <p className="text-xs text-gray-500 mt-1">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Data Sources */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <h4 className="font-medium text-gray-900">PostgreSQL Database</h4>
                        <p className="text-sm text-gray-500">Production Analytics</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">Last sync: 2 min ago</div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <h4 className="font-medium text-gray-900">Google Analytics</h4>
                        <p className="text-sm text-gray-500">Website Traffic</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">Last sync: 1 hour ago</div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div>
                        <h4 className="font-medium text-gray-900">Salesforce CRM</h4>
                        <p className="text-sm text-gray-500">Customer Data</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">Last sync: 3 hours ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Upload className="h-4 w-4" />
                  Import Data
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Settings className="h-4 w-4" />
                  Configure Sources
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">New dataset "Q4 Sales Data" imported successfully</span>
                  <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Data source "PostgreSQL" synchronized</span>
                  <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Warning: Salesforce sync delayed</span>
                  <span className="text-xs text-gray-400 ml-auto">6 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
