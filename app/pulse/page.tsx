"use client"
import SingleLayerMenu from "@/components/single-layer-menu"
import PulseFeed from "@/components/pulse-feed"
import { useState, useEffect, useRef } from "react"
import HeaderFilter from "@/components/header-filter"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CalendarIcon, PlusIcon } from '@heroicons/react/20/solid'

export default function PulsePage() {
  const [menuState, setMenuState] = useState<"open" | "narrow" | "hidden">("open")
  const [activeTab, setActiveTab] = useState("annotations")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("oldest")
  const [showAnnotationDrawer, setShowAnnotationDrawer] = useState(false)

  // Global filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms')

  // Sample activity data adapted from annotations (oldest first, newest at bottom)
  const activity = [
    {
      id: 9,
      type: 'annotation',
      person: { name: 'Suraj' },
      comment: 'New product added: Therapy Mask 900A',
      date: 'Sep 10, 2024',
      dateTime: '2024-09-10T09:20'
    },
    {
      id: 8,
      type: 'annotation',
      person: { name: 'Vivek' },
      comment: 'Meta Ads: Therapy Mask Campaign Started',
      date: 'Oct 1, 2024',
      dateTime: '2024-10-01T09:12'
    },
    {
      id: 7,
      type: 'commented',
      person: {
        name: 'yalcin kaya',
        imageUrl: '/placeholder-user.jpg',
      },
      comment: 'New product photos are pubished',
      date: 'Oct 14, 2024',
      dateTime: '2024-10-14T15:56',
    },
    {
      id: 6,
      type: 'annotation',
      person: { name: 'Adnan' },
      comment: 'TikTok Ads: Therapy Mask Campaign Started',
      date: 'Oct 14, 2024',
      dateTime: '2024-10-14T09:20'
    },
    {
      id: 5,
      type: 'annotation',
      person: { name: 'Coen' },
      comment: 'Hubspot: Customer Promo Newsletter Sent',
      date: 'Oct 15, 2024',
      dateTime: '2024-10-15T09:12'
    },
    {
      id: 4,
      type: 'annotation',
      person: { name: 'Suraj' },
      comment: 'Google Ads: Daily campaign budget raised by $100 for Therapy Mask product line to increase visibility during peak shopping season and improve competitive positioning against existing market players',
      date: 'Oct 17, 2024',
      dateTime: '2024-10-17T15:56',
    },
    {
      id: 3,
      type: 'annotation',
      person: { name: 'Vivek' },
      comment: '10x budget for Google Ads campaigns',
      date: 'Apr 1, 2025',
      dateTime: '2025-04-01T11:24'
    },
    {
      id: 2,
      type: 'annotation',
      person: { name: 'Adnan' },
      comment: 'Meta campaign stopped',
      date: 'May 2, 2025',
      dateTime: '2025-05-02T11:03'
    },
    {
      id: 1,
      type: 'annotation',
      person: { name: 'Coen' },
      comment: 'new test2',
      date: 'Jun 3, 2025',
      dateTime: '2025-06-03T10:32'
    },
  ]

  // Change History data (automated annotations)
  const changeHistory = [
    {
      id: 1,
      type: 'annotation',
      person: { name: 'Google' },
      campaign: 'Shopping Ads US',
      comment: 'amount_micros: N/A > N/A',
      date: 'Sep 10, 2024',
      dateTime: '2024-09-10T09:20'
    },
    {
      id: 2,
      type: 'annotation',
      person: { name: 'Meta' },
      campaign: 'Shopping Ads AU',
      comment: 'cpc_bid_micros: N/A > N/A',
      date: 'Oct 1, 2024',
      dateTime: '2024-10-01T09:12'
    },
    {
      id: 3,
      type: 'annotation',
      person: { name: 'TikTok' },
      campaign: 'Shopping Ads US',
      comment: 'cpc_bid_micros: N/A > N/A',
      date: 'Oct 14, 2024',
      dateTime: '2024-10-14T09:20'
    },
    {
      id: 4,
      type: 'annotation',
      person: { name: 'Google' },
      campaign: 'Shopping Ads AU',
      comment: 'cpc_bid_micros: N/A > N/A',
      date: 'Oct 15, 2024',
      dateTime: '2024-10-15T09:12'
    },
    {
      id: 5,
      type: 'annotation',
      person: { name: 'Meta' },
      campaign: 'Shopping Ads US',
      comment: 'cpc_bid_micros: N/A > N/A',
      date: 'Oct 17, 2024',
      dateTime: '2024-10-17T15:56'
    },
    {
      id: 6,
      type: 'annotation',
      person: { name: 'TikTok' },
      campaign: 'Shopping Ads AU',
      comment: 'cpc_bid_micros: N/A > N/A',
      date: 'Apr 1, 2025',
      dateTime: '2025-04-01T11:24'
    },
    {
      id: 7,
      type: 'annotation',
      person: { name: 'Meta' },
      campaign: 'Video Campaign EU',
      comment: 'daily_budget_micros: $500 > $750',
      date: 'Jan 15, 2025',
      dateTime: '2025-01-15T14:32'
    },
    {
      id: 8,
      type: 'annotation',
      person: { name: 'Google' },
      campaign: 'Search Campaign UK',
      comment: 'target_cpa_micros: $25 > $30',
      date: 'Jan 20, 2025',
      dateTime: '2025-01-20T09:45'
    },
    {
      id: 9,
      type: 'annotation',
      person: { name: 'TikTok' },
      campaign: 'Brand Campaign CA',
      comment: 'frequency_cap: 2 > 3',
      date: 'Jan 25, 2025',
      dateTime: '2025-01-25T16:18'
    },
    {
      id: 10,
      type: 'annotation',
      person: { name: 'Meta' },
      campaign: 'Retargeting Campaign AU',
      comment: 'conversion_optimization_goal: PURCHASE > LEAD',
      date: 'Jan 28, 2025',
      dateTime: '2025-01-28T11:07'
    },
    {
      id: 11,
      type: 'annotation',
      person: { name: 'Google' },
      campaign: 'Display Campaign US',
      comment: 'bid_strategy_type: CPC > CPA',
      date: 'Feb 2, 2025',
      dateTime: '2025-02-02T13:22'
    },
    {
      id: 12,
      type: 'annotation',
      person: { name: 'TikTok' },
      campaign: 'Conversion Campaign EU',
      comment: 'daily_budget_micros: $300 > $450',
      date: 'Feb 5, 2025',
      dateTime: '2025-02-05T08:55'
    },
    {
      id: 13,
      type: 'annotation',
      person: { name: 'Meta' },
      campaign: 'App Install US',
      comment: 'optimization_goal: INSTALLS > PURCHASES',
      date: 'Feb 8, 2025',
      dateTime: '2025-02-08T15:33'
    },
    {
      id: 14,
      type: 'annotation',
      person: { name: 'Google' },
      campaign: 'Shopping Campaign AU',
      comment: 'enhanced_conversion_enabled: false > true',
      date: 'Feb 12, 2025',
      dateTime: '2025-02-12T10:18'
    },
    {
      id: 15,
      type: 'annotation',
      person: { name: 'TikTok' },
      campaign: 'Traffic Campaign UK',
      comment: 'budget_mode: DAILY > LIFETIME',
      date: 'Feb 15, 2025',
      dateTime: '2025-02-15T12:41'
    },
  ]

  const moods = [
    { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const clearFilters = () => {
    setSearchTerm('')
    setDateFrom('')
    setDateTo('')
    setSelectedPlatform('All Platforms')
  }

  const sortActivity = (items: any[]) => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.dateTime).getTime()
      const dateB = new Date(b.dateTime).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })
  }

  return (
    <div className="h-screen bg-white">
      <SingleLayerMenu forceState={menuState} onToggleState={(next) => setMenuState(next as "open" | "narrow" | "hidden")} />
      <HeaderFilter
        showFilters={false}
        showPulseFilters={false}
        title="Pulse"
        showActionButton={false}
        showMenu={true}
        onMenuAction={(action) => {
          if (action === 'change-sort-order') {
            setSortOrder(sortOrder === 'oldest' ? 'newest' : 'oldest')
          }
        }}
      />
      <main className="h-screen flex flex-col relative" style={{ marginLeft: "var(--content-left, var(--sidebar-width, 0px))" }}>
        {/* Filter Panel with Tab Navigation */}
        <div className="pt-20 px-6 pb-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Tab Navigation - First Element */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-60">
              <TabsList className="grid w-60 grid-cols-2 bg-gray-100">
                <TabsTrigger value="annotations" className="text-sm">Annotations</TabsTrigger>
                <TabsTrigger value="change-history" className="text-sm">Change History</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search Input */}
            <div className="w-80">
              <div className="relative">
                <svg className="h-4 w-4 text-gray-400 pointer-events-none absolute left-2 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={activeTab === "change-history" ? "Search history..." : "Search annotations..."}
                  className="h-9 pl-8 w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Platforms Filter - Only for Change History */}
            {activeTab === "change-history" && (
              <div className="w-40">
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Platforms">All Platforms</SelectItem>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Meta">Meta</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date Range */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-9 w-40 rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-500 text-sm">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-9 w-40 rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {/* Clear link next to dates */}
              {(searchTerm || dateFrom || dateTo || (activeTab === "change-history" && selectedPlatform !== "All Platforms")) && (
                <button
                  onClick={clearFilters}
                  className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-800 underline focus:outline-none"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Add Annotation Button - Only for Annotations tab and when newest is on top */}
            {activeTab === "annotations" && sortOrder === "newest" && (
              <button
                onClick={() => setShowAnnotationDrawer(true)}
                className="h-9 px-4 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Add Annotation
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="annotations" className="h-full m-0">
              <AnnotationsFeed
                activity={sortActivity(activity)}
                moods={moods}
                classNames={classNames}
                searchTerm={searchTerm}
                dateFrom={dateFrom}
                dateTo={dateTo}
                showAnnotationDrawer={showAnnotationDrawer}
                setShowAnnotationDrawer={setShowAnnotationDrawer}
                sortOrder={sortOrder}
                onAddAnnotation={(text, date) => {
                  // This will be handled by the AnnotationsFeed component
                }}
              />
            </TabsContent>
            <TabsContent value="change-history" className="h-full m-0">
              <ChangeHistoryFeed
                activity={sortActivity(changeHistory)}
                classNames={classNames}
                searchTerm={searchTerm}
                dateFrom={dateFrom}
                dateTo={dateTo}
                selectedPlatform={selectedPlatform}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right-side Annotation Drawer */}
        {showAnnotationDrawer && (
          <div className="relative z-[10000001]">
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[10000000] bg-gray-500/75 cursor-pointer"
              onClick={() => setShowAnnotationDrawer(false)}
            />

            <div className="fixed inset-0 z-[10000002] overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                  <div className="pointer-events-auto relative w-screen max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl transform transition duration-500 ease-in-out translate-x-0">
                    {/* Outside close button */}
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        onClick={() => setShowAnnotationDrawer(false)}
                        className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-base font-semibold leading-6 text-gray-900">
                              Add Annotation
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                              Add a new annotation to the pulse feed
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <AnnotationDrawerForm
                          onAddAnnotation={(text, date) => {
                            // This will be handled by the AnnotationsFeed component
                            // We need to pass this function down
                          }}
                          onClose={() => setShowAnnotationDrawer(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Annotations Feed Component
function AnnotationsFeed({
  activity: initialActivity,
  moods,
  classNames,
  searchTerm,
  dateFrom,
  dateTo,
  showAnnotationDrawer,
  setShowAnnotationDrawer,
  sortOrder,
  onAddAnnotation
}: {
  activity: any[],
  moods: any[],
  classNames: (...classes: string[]) => string,
  searchTerm: string,
  dateFrom: string,
  dateTo: string,
  showAnnotationDrawer: boolean,
  setShowAnnotationDrawer: (show: boolean) => void,
  sortOrder: "newest" | "oldest",
  onAddAnnotation: (text: string, date: string) => void
}) {
  const [selected, setSelected] = useState(moods[5])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showCommentForm, setShowCommentForm] = useState<number | null>(null)
  const [commentTexts, setCommentTexts] = useState<Record<number, string>>({})
  const [activity, setActivity] = useState(initialActivity)
  const [annotationText, setAnnotationText] = useState('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      requestAnimationFrame(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth'
        })
      })
    }
  }

  // Auto-scroll when activity changes
  useEffect(() => {
    scrollToBottom()
  }, [activity])

  // Filter activity based on search term and date range
  const filteredActivity = activity.filter(item => {
    const matchesSearch = searchTerm === '' ||
      item.person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchTerm.toLowerCase())

    // Date range filtering
    let matchesDateRange = true
    if (dateFrom || dateTo) {
      const itemDate = new Date(item.dateTime)
      const fromDate = dateFrom ? new Date(dateFrom + 'T00:00:00') : null
      const toDate = dateTo ? new Date(dateTo + 'T23:59:59') : null

      if (fromDate && itemDate < fromDate) matchesDateRange = false
      if (toDate && itemDate > toDate) matchesDateRange = false
    }

    return matchesSearch && matchesDateRange
  })

  const addComment = (annotationId: number, commentText: string) => {
    const newComment = {
      id: Date.now(),
      type: 'commented',
      person: {
        name: 'Yalcin Kaya',
        imageUrl: '/placeholder-user.jpg',
      },
      comment: commentText,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      dateTime: new Date().toISOString(),
    }

    // Find the index of the annotation and insert the comment right after it
    const annotationIndex = activity.findIndex(item => item.id === annotationId)
    if (annotationIndex !== -1) {
      const newActivity = [...activity]
      newActivity.splice(annotationIndex + 1, 0, newComment)
      setActivity(newActivity)
      scrollToBottom()
    }
  }

  const addAnnotation = (text: string, date: string) => {
    const newAnnotation = {
      id: Date.now(),
      type: 'annotation',
      person: { name: 'Yalcin Kaya' },
      comment: text,
      date: new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      dateTime: new Date(date).toISOString(),
    }

    // Add to the end of the activity feed (newest at bottom)
    setActivity([...activity, newAnnotation])
    setAnnotationText('')
    setShowAnnotationDrawer(false)
    onAddAnnotation(text, date)
    scrollToBottom()
  }

  const AnnotationForm = () => (
    <div className="relative flex gap-x-4">
      <div className="flex-none py-0.5 text-xs/5 text-gray-500 w-20 text-right">
        {/* Date placeholder to align with other entries */}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (annotationText.trim()) {
            addAnnotation(annotationText.trim(), selectedDate)
            setAnnotationText('')
            setSelected(moods[5]) // Reset mood
          }
        }}
        className="relative flex-auto"
        style={{ marginLeft: 'calc(2rem + 30px)' }}
      >
        <div className="overflow-hidden rounded-lg pb-16 outline outline-1 -outline-offset-1 outline-black focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <label htmlFor="annotation" className="sr-only">
            Add your annotation
          </label>
          <textarea
            id="annotation"
            name="annotation"
            rows={2}
            placeholder="Add your annotation..."
            value={annotationText}
            onChange={(e) => setAnnotationText(e.target.value)}
            className="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex items-center space-x-3">
            {/* Date selector */}
            <div className="flex items-center">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="py-1 text-xs border-0 focus:ring-0 focus:outline-none"
                style={{ marginRight: '-30px' }}
              />
            </div>
          </div>
          {annotationText.trim() && (
            <button
              type="submit"
              className="rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm flex items-center gap-1.5 bg-black text-white hover:bg-gray-800"
            >
              <PlusIcon className="size-4" />
              Add Annotation
            </button>
          )}
        </div>
      </form>
    </div>
  )

  return (
    <div className="h-full overflow-y-auto p-6" ref={scrollContainerRef}>
      <div ref={contentRef} className="max-w-2xl mx-auto">
        <ul role="list" className="space-y-6">
          {filteredActivity.map((activityItem, activityItemIdx) => (
            <li key={activityItem.id} className="relative flex gap-x-4">
              <div
                className={classNames(
                  activityItemIdx === filteredActivity.length - 1 ? 'h-6' : '-bottom-6',
                  'absolute left-[112px] top-0 flex w-6 justify-center',
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>
              {activityItem.type === 'commented' ? (
                <>
                  <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs/5 text-gray-500 w-20 text-right">
                    {/* Empty space where date was */}
                  </time>
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200" style={{ marginLeft: 'calc(2rem + 30px)' }}>
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs/5 text-gray-500">
                        <span className="font-medium text-gray-900">{activityItem.person.name}</span> commented • {activityItem.date}
                      </div>
                    </div>
                    <p className="text-sm/6 text-gray-500">{activityItem.comment}</p>
                  </div>
                </>
              ) : (
                <>
                  <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs/5 text-gray-500 w-20 text-right">
                    {activityItem.date}
                  </time>
                  <div className="relative flex size-6 flex-none items-center justify-center bg-white ml-4">
                    {activityItem.type === 'annotation' ? (
                      <CheckCircleIcon aria-hidden="true" className="size-6 text-black" />
                    ) : (
                      <div className="size-1.5 rounded-full bg-gray-100 ring ring-gray-300" />
                    )}
                  </div>
                  <div className="flex-auto ml-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="py-0.5 text-xs/5 text-gray-500">
                          <div className="font-medium text-gray-900">{activityItem.person.name}</div>
                          <div className="text-sm text-gray-500 mt-1">{activityItem.comment}</div>
                        </div>
                        <button
                          onClick={() => setShowCommentForm(showCommentForm === activityItem.id ? null : activityItem.id)}
                          className="flex items-center gap-1 text-gray-400 hover:text-gray-600 mt-1 group"
                          title="Add comment"
                        >
                          <img
                            src="/Comment.svg"
                            alt="Comment"
                            className="size-4 opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(10%) saturate(1555%) hue-rotate(198deg) brightness(89%) contrast(88%)' }}
                          />
                          <span className="text-xs group-hover:text-gray-600">Comment</span>
                        </button>
                      </div>
                    </div>

                    {/* Comment form for this annotation */}
                    {showCommentForm === activityItem.id && (
                      <div className="mt-3">
                        <form className="relative flex-auto">
                          <div className="overflow-hidden rounded-lg pb-8 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <textarea
                              rows={1}
                              placeholder="Add a comment..."
                              value={commentTexts[activityItem.id] || ''}
                              onChange={(e) => setCommentTexts(prev => ({ ...prev, [activityItem.id]: e.target.value }))}
                              className="block w-full resize-none bg-transparent px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0"
                            />
                          </div>
                          {(commentTexts[activityItem.id]?.trim()) && (
                            <div className="absolute inset-x-0 bottom-0 flex justify-end py-1 pr-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const commentText = commentTexts[activityItem.id]
                                  if (commentText && commentText.trim()) {
                                    addComment(activityItem.id, commentText.trim())
                                    setCommentTexts(prev => ({ ...prev, [activityItem.id]: '' }))
                                    setShowCommentForm(null)
                                  }
                                }}
                                className="rounded-md bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-800"
                              >
                                Comment
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Add New Annotation form - show inline when newest is at bottom */}
        {sortOrder === "oldest" && (
          <div className="mt-6">
            <AnnotationForm />
          </div>
        )}
      </div>
    </div>
  )
}

// Change History Feed Component (without Add Annotation form)
function ChangeHistoryFeed({
  activity: initialActivity,
  classNames,
  searchTerm,
  dateFrom,
  dateTo,
  selectedPlatform
}: {
  activity: any[],
  classNames: (...classes: string[]) => string,
  searchTerm: string,
  dateFrom: string,
  dateTo: string,
  selectedPlatform: string
}) {
  const [showCommentForm, setShowCommentForm] = useState<number | null>(null)
  const [commentTexts, setCommentTexts] = useState<Record<number, string>>({})
  const [activity, setActivity] = useState(initialActivity)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      requestAnimationFrame(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth'
        })
      })
    }
  }

  // Auto-scroll when activity changes
  useEffect(() => {
    scrollToBottom()
  }, [activity])

  // Filter activity based on search term, date range, and platform
  const filteredActivity = activity.filter(item => {
    const matchesSearch = searchTerm === '' ||
      item.person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchTerm.toLowerCase())

    // Platform filtering
    const matchesPlatform = selectedPlatform === 'All Platforms' ||
      item.person.name.toLowerCase().includes(selectedPlatform.toLowerCase())

    // Date range filtering
    let matchesDateRange = true
    if (dateFrom || dateTo) {
      const itemDate = new Date(item.dateTime)
      const fromDate = dateFrom ? new Date(dateFrom + 'T00:00:00') : null
      const toDate = dateTo ? new Date(dateTo + 'T23:59:59') : null

      if (fromDate && itemDate < fromDate) matchesDateRange = false
      if (toDate && itemDate > toDate) matchesDateRange = false
    }

    return matchesSearch && matchesPlatform && matchesDateRange
  })

  const addComment = (annotationId: number, commentText: string) => {
    const newComment = {
      id: Date.now(),
      type: 'commented',
      person: {
        name: 'Yalcin Kaya',
        imageUrl: '/placeholder-user.jpg',
      },
      comment: commentText,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      dateTime: new Date().toISOString(),
    }

    // Find the index of the annotation and insert the comment right after it
    const annotationIndex = activity.findIndex(item => item.id === annotationId)
    if (annotationIndex !== -1) {
      const newActivity = [...activity]
      newActivity.splice(annotationIndex + 1, 0, newComment)
      setActivity(newActivity)
      scrollToBottom()
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6" ref={scrollContainerRef}>
      <div ref={contentRef} className="max-w-2xl mx-auto">
        <ul role="list" className="space-y-6">
          {filteredActivity.map((activityItem, activityItemIdx) => (
            <li key={activityItem.id} className="relative flex gap-x-4">
              <div
                className={classNames(
                  activityItemIdx === filteredActivity.length - 1 ? 'h-6' : '-bottom-6',
                  'absolute left-[112px] top-0 flex w-6 justify-center',
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>
              {activityItem.type === 'commented' ? (
                <>
                  <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs/5 text-gray-500 w-20 text-right">
                    {/* Empty space where date was */}
                  </time>
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200" style={{ marginLeft: 'calc(2rem + 30px)' }}>
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs/5 text-gray-500">
                        <span className="font-medium text-gray-900">{activityItem.person.name}</span> commented • {activityItem.date}
                      </div>
                    </div>
                    <p className="text-sm/6 text-gray-500">{activityItem.comment}</p>
                  </div>
                </>
              ) : (
                <>
                  <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs/5 text-gray-500 w-20 text-right">
                    {activityItem.date}
                  </time>
                  <div className="relative flex size-6 flex-none items-center justify-center bg-white ml-4">
                    {activityItem.type === 'annotation' ? (
                      <CheckCircleIcon aria-hidden="true" className="size-6 text-black" />
                    ) : (
                      <div className="size-1.5 rounded-full bg-gray-100 ring ring-gray-300" />
                    )}
                  </div>
                  <div className="flex-auto ml-4">
                    <div className="flex items-center justify-between">
                      <div className="py-0.5 text-xs/5 text-gray-500">
                        <div className="font-medium text-gray-900">{activityItem.person.name} <span className="text-xs text-gray-600 font-normal">{activityItem.campaign}</span></div>
                        <div className="text-sm text-gray-500 mt-1">{activityItem.comment}</div>
                        <button
                          onClick={() => setShowCommentForm(showCommentForm === activityItem.id ? null : activityItem.id)}
                          className="flex items-center gap-1 text-gray-400 hover:text-gray-600 mt-1 group"
                          title="Add comment"
                        >
                          <img
                            src="/Comment.svg"
                            alt="Comment"
                            className="size-4 opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(10%) saturate(1555%) hue-rotate(198deg) brightness(89%) contrast(88%)' }}
                          />
                          <span className="text-xs group-hover:text-gray-600">Comment</span>
                        </button>
                      </div>
                    </div>

                    {/* Comment form for this annotation */}
                    {showCommentForm === activityItem.id && (
                      <div className="mt-3">
                        <form className="relative flex-auto">
                          <div className="overflow-hidden rounded-lg pb-8 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <textarea
                              rows={1}
                              placeholder="Add a comment..."
                              value={commentTexts[activityItem.id] || ''}
                              onChange={(e) => setCommentTexts(prev => ({ ...prev, [activityItem.id]: e.target.value }))}
                              className="block w-full resize-none bg-transparent px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0"
                            />
                          </div>
                          {(commentTexts[activityItem.id]?.trim()) && (
                            <div className="absolute inset-x-0 bottom-0 flex justify-end py-1 pr-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const commentText = commentTexts[activityItem.id]
                                  if (commentText && commentText.trim()) {
                                    addComment(activityItem.id, commentText.trim())
                                    setCommentTexts(prev => ({ ...prev, [activityItem.id]: '' }))
                                    setShowCommentForm(null)
                                  }
                                }}
                                className="rounded-md bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-800"
                              >
                                Comment
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Annotation Drawer Form Component
function AnnotationDrawerForm({
  onAddAnnotation,
  onClose
}: {
  onAddAnnotation: (text: string, date: string) => void,
  onClose: () => void
}) {
  const [annotationText, setAnnotationText] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (annotationText.trim()) {
      onAddAnnotation(annotationText.trim(), selectedDate)
      setAnnotationText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="annotation" className="block text-sm font-medium text-gray-700 mb-2">
          Annotation
        </label>
        <textarea
          id="annotation"
          name="annotation"
          rows={4}
          placeholder="Add your annotation..."
          value={annotationText}
          onChange={(e) => setAnnotationText(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!annotationText.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Add Annotation
        </button>
      </div>
    </form>
  )
}