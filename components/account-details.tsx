"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Clock,
  DollarSign,
  Hash,
  Database,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  AlertTriangle,
} from "lucide-react"

export default function AccountDetails() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [companyInfo, setCompanyInfo] = useState({
    name: "Piri Red",
    originCountry: "Australia",
    countriesServed: "Global",
    timezone: "Australia/Sydney",
    currency: "AUD",
  })

  const handleDeleteAccount = () => {
    if (deleteConfirmation === "DELETE") {
      // Handle account deletion
      console.log("Account deletion confirmed")
      setIsDeleteDialogOpen(false)
      setDeleteConfirmation("")
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Settings
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          <Badge variant="secondary">Account Settings</Badge>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Details</h1>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Logo */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700">Company Logo</Label>
              <p className="text-xs text-gray-500 mt-1">Upload your company logo</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-red-600 text-white font-semibold">PR</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Company Name */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700">Company Name</Label>
              <p className="text-xs text-gray-500 mt-1">Your registered company name</p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                className="w-48 text-right"
              />
            </div>
          </div>

          {/* Origin Country */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700">Origin Country</Label>
              <p className="text-xs text-gray-500 mt-1">Country where your company is registered</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <Input
                value={companyInfo.originCountry}
                onChange={(e) => setCompanyInfo({ ...companyInfo, originCountry: e.target.value })}
                className="w-32 text-right"
              />
            </div>
          </div>

          {/* Countries Served */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700">Countries Served</Label>
              <p className="text-xs text-gray-500 mt-1">Markets where you operate</p>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <Input
                value={companyInfo.countriesServed}
                onChange={(e) => setCompanyInfo({ ...companyInfo, countriesServed: e.target.value })}
                className="w-32 text-right"
              />
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700">Timezone</Label>
              <p className="text-xs text-gray-500 mt-1">Default timezone for reports and data</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <Input
                value={companyInfo.timezone}
                onChange={(e) => setCompanyInfo({ ...companyInfo, timezone: e.target.value })}
                className="w-40 text-right"
              />
            </div>
          </div>

          {/* Reporting Currency */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700">Reporting Currency</Label>
              <p className="text-xs text-gray-500 mt-1">Default currency for financial reports</p>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <Input
                value={companyInfo.currency}
                onChange={(e) => setCompanyInfo({ ...companyInfo, currency: e.target.value })}
                className="w-20 text-right"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Details */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Account ID */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700">Account ID</Label>
              <p className="text-xs text-gray-500 mt-1">Unique identifier for your account</p>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded">sLa6zdswBy1A7X</span>
              <Button variant="ghost" size="sm" className="text-xs">
                Copy
              </Button>
            </div>
          </div>

          {/* Dataset ID */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700">Dataset ID</Label>
              <p className="text-xs text-gray-500 mt-1">Unique identifier for your data collection</p>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded">
                vendoai_data_s00IGNsLa6zdswBy1A7X
              </span>
              <Button variant="ghost" size="sm" className="text-xs">
                Copy
              </Button>
            </div>
          </div>

          {/* Created At */}
          <div className="flex items-center justify-between py-4">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700">Created At</Label>
              <p className="text-xs text-gray-500 mt-1">When this account was first created</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">March 15, 2024 at 2:30 PM AEDT</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-8 flex justify-between">
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Delete Account
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all associated data
                from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="delete-confirmation" className="text-sm font-medium">
                Type <strong>DELETE</strong> to confirm:
              </Label>
              <Input
                id="delete-confirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="DELETE"
                className="mt-2"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount} disabled={deleteConfirmation !== "DELETE"}>
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex gap-3">
          <Button variant="outline">Request Account Data Export</Button>
          <Button variant="outline">Contact Support</Button>
        </div>
      </div>
    </div>
  )
}
