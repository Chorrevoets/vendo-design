"use client"

import { useMemo, useState } from "react"
import ReportSnippit from "@/components/report-snippit"
import { Users, MailOpen, MousePointerClick, X } from "lucide-react"
import { CopilotChat } from "@/components/copilot-chat"
import { ExtractedShaderBackground } from "@/components/extracted-shader-background"
import { NarrowShortcutColumn } from "@/components/single-layer-menu"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [showEditorChat, setShowEditorChat] = useState(false)

  const reports = useMemo(
    () => [
      { id: "total-subscribers", name: "Total Subscribers", stat: "71,897", icon: <Users className="h-6 w-6 text-white" aria-hidden="true" />, change: "12%", previousStat: "70,946", changeType: "increase" as const },
      { id: "avg-open-rate", name: "Avg. Open Rate", stat: "58.16%", icon: <MailOpen className="h-6 w-6 text-white" aria-hidden="true" />, change: "2.02%", previousStat: "56.14%", changeType: "increase" as const },
      { id: "avg-click-rate", name: "Avg. Click Rate", stat: "24.57%", icon: <MousePointerClick className="h-6 w-6 text-white" aria-hidden="true" />, change: "4.05%", previousStat: "28.62%", changeType: "decrease" as const },
    ],
    []
  )

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-20 max-[750px]:px-2">
        <h3 className="text-base font-semibold text-gray-900">Last 30 days</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => (
            <ReportSnippit
              key={r.id}
              id={r.id}
              name={r.name}
              stat={r.stat}
              icon={r.icon}
              change={r.change}
              changeType={r.changeType}
              previousStat={(r as any).previousStat}
              onOpen={setSelectedReport}
            />
          ))}
        </div>
      </div>

      {selectedReport && (
        <div className="relative z-[10000001]">
          {!showEditorChat && (
            <div
              className="fixed inset-0 z-[10000000] bg-gray-500/75 cursor-pointer"
              onClick={() => {
                setSelectedReport(null)
                setShowEditorChat(false)
              }}
            />
          )}
          <div className="fixed inset-0 z-[10000002] overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                {/* Left Chat Pane (docks left, does not affect drawer width) */}
                {showEditorChat && (
                  <div className="pointer-events-auto hidden md:block w-[420px] lg:w-[520px] xl:w-[600px] h-full bg-white shadow-xl border-r">
                    <div className="h-full flex">
                      {/* Narrow shortcuts column */}
                      <div className="w-16 border-r bg-transparent">
                        <NarrowShortcutColumn />
                      </div>
                      {/* Copilot area */}
                      <div className="flex-1 flex flex-col min-h-0">
                        <div className="px-4 sm:px-6 border-b h-[61px] flex items-center">
                          <h3 className="text-sm font-medium text-gray-900">Report Editor</h3>
                        </div>
                        <div className="flex-1 min-h-0">
                          <ExtractedShaderBackground className="h-full">
                            <div className="h-full">
                              <CopilotChat
                                mode="embedded"
                                chatId={selectedReport ?? undefined}
                                initialPrompt={`Help me refine the report: ${reports.find(r => r.id === selectedReport)?.name || "Report"}. Suggest key insights and edits.`}
                                inputPlaceholder="Ask me about this report"
                              />
                            </div>
                          </ExtractedShaderBackground>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Right Report Drawer (unchanged width/position) */}
                <div className="pointer-events-auto relative w-screen max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl transform transition duration-500 ease-in-out translate-x-0">
                  <div className="relative flex h-full flex-col bg-white shadow-xl">
                    <div className="sticky top-0 z-10 bg-white px-4 sm:px-6 border-b h-[61px] flex items-center relative">
                      {/* Left: Title + Edit */}
                      <div className="flex items-center gap-3">
                        <h2 className="text-base font-semibold text-gray-900">{reports.find(r => r.id === selectedReport)?.name ?? "Report"}</h2>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                          onClick={() => setShowEditorChat(true)}
                        >
                          <img src="/New-chat.svg" alt="" className="h-4 w-4" />
                          Edit report
                        </button>
                      </div>
                      {/* Right: Close */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedReport(null)
                          setShowEditorChat(false)
                        }}
                        aria-label="Close"
                        className="text-gray-400 hover:text-gray-600 absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
                      <div className="text-sm text-gray-700">Report content coming soon.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
