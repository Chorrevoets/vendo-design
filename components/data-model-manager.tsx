"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Database, Table, Link2 } from "lucide-react"

export default function DataModelManager() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Data
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          <Badge variant="secondary">Data Management</Badge>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Model</h1>
            <p className="text-gray-600 max-w-3xl">
              Define your data structure, relationships, and schema. Configure how your data is organized and connected
              across different entities.
            </p>
          </div>
          <Button className="gap-2">
            <Database className="h-4 w-4" />
            Create Schema
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table className="h-5 w-5" />
              Entities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage your data entities and their properties.</p>
            <Button variant="outline" className="w-full bg-transparent">
              Configure Entities
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Relationships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Define how your data entities relate to each other.</p>
            <Button variant="outline" className="w-full bg-transparent">
              Manage Relationships
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
