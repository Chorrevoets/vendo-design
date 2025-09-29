"use client"
import SingleLayerMenu from "@/components/single-layer-menu"
import PulseFeed from "@/components/pulse-feed"
import { useState, useEffect, useRef } from "react"
import HeaderFilter from "@/components/header-filter"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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

  // Global filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

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
      comment: 'Google Ads: Daily campaign budget raised by $1...',
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
  }

  return (
    <div className="h-screen bg-white">
      <SingleLayerMenu forceState={menuState} onToggleState={(next) => setMenuState(next as "open" | "narrow" | "hidden")} />
      <HeaderFilter
        showFilters={false}
        showPulseFilters={true}
        title="Pulse"
        showActionButton={false}
        showMenu={false}
        pulseSearchValue={searchTerm}
        onPulseSearchChange={setSearchTerm}
        dateFromValue={dateFrom}
        onDateFromChange={setDateFrom}
        dateToValue={dateTo}
        onDateToChange={setDateTo}
        onClearFilters={clearFilters}
      />
      <main className="h-screen flex flex-col relative" style={{ marginLeft: "var(--content-left, var(--sidebar-width, 0px))" }}>
        {/* Tab Navigation */}
        <div className="pt-20 px-6 bg-white">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-60 grid-cols-2 bg-gray-100">
              <TabsTrigger value="annotations" className="text-sm">Annotations</TabsTrigger>
              <TabsTrigger value="change-history" className="text-sm">Change History</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="annotations" className="h-full m-0">
              <AnnotationsFeed
                activity={activity}
                moods={moods}
                classNames={classNames}
                searchTerm={searchTerm}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            </TabsContent>
            <TabsContent value="change-history" className="h-full m-0">
              <ChangeHistoryFeed
                activity={changeHistory}
                classNames={classNames}
                searchTerm={searchTerm}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            </TabsContent>
          </Tabs>
        </div>
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
  dateTo
}: {
  activity: any[],
  moods: any[],
  classNames: (...classes: string[]) => string,
  searchTerm: string,
  dateFrom: string,
  dateTo: string
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
        <div className="overflow-hidden rounded-lg pb-16 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
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
          <button
            type="submit"
            disabled={!annotationText.trim()}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm flex items-center gap-1.5 ${annotationText.trim()
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            <PlusIcon className="size-4" />
            Add Annotation
          </button>
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
                    {activityItem.date}
                  </time>
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200" style={{ marginLeft: 'calc(2rem + 30px)' }}>
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs/5 text-gray-500">
                        <span className="font-medium text-gray-900">{activityItem.person.name}</span> commented
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
                        <p className="py-0.5 text-xs/5 text-gray-500">
                          <span className="font-medium text-gray-900">{activityItem.person.name}</span> {activityItem.comment}
                        </p>
                        <button
                          onClick={() => setShowCommentForm(showCommentForm === activityItem.id ? null : activityItem.id)}
                          className="flex items-center gap-1 text-gray-400 hover:text-gray-600 mt-1"
                          title="Add comment"
                        >
                          <img src="/Comment.svg" alt="Comment" className="size-4 stroke-gray-400" />
                          <span className="text-xs">Comment</span>
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
                        </form>
                      </div>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Add New Annotation form - scrollable with content */}
        <div className="mt-6">
          <AnnotationForm />
        </div>
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
  dateTo
}: {
  activity: any[],
  classNames: (...classes: string[]) => string,
  searchTerm: string,
  dateFrom: string,
  dateTo: string
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

  // Filter activity based on search term and date range
  const filteredActivity = activity.filter(item => {
    const matchesSearch = searchTerm === '' ||
      item.person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                    {activityItem.date}
                  </time>
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200" style={{ marginLeft: 'calc(2rem + 30px)' }}>
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs/5 text-gray-500">
                        <span className="font-medium text-gray-900">{activityItem.person.name}</span> commented
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
                        <div className="text-xs text-gray-500 mt-1">{activityItem.comment}</div>
                        <button
                          onClick={() => setShowCommentForm(showCommentForm === activityItem.id ? null : activityItem.id)}
                          className="flex items-center gap-1 text-gray-400 hover:text-gray-600 mt-1"
                          title="Add comment"
                        >
                          <img src="/Comment.svg" alt="Comment" className="size-4 stroke-gray-400" />
                          <span className="text-xs">Comment</span>
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