"use client"

import { useState } from "react"
import { X, Edit3, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface SearchChatsModalProps {
    isOpen: boolean
    onClose: () => void
}

interface ChatItem {
    id: string
    title: string
    date: string
    type: "new" | "chat"
}

const mockChats: ChatItem[] = [
    { id: "new", title: "New chat", date: "new", type: "new" },
    { id: "1", title: "Marketing Strategy", date: "today", type: "chat" },
    { id: "2", title: "Product Roadmap", date: "yesterday", type: "chat" },
    { id: "3", title: "Customer Feedback", date: "previous7", type: "chat" },
    { id: "4", title: "Q4 Planning", date: "previous7", type: "chat" },
    { id: "5", title: "User Research", date: "previous7", type: "chat" },
    { id: "6", title: "Sales Analytics", date: "previous7", type: "chat" },
    { id: "7", title: "Competitor Analysis", date: "previous7", type: "chat" },
    { id: "8", title: "Feature Requests", date: "previous7", type: "chat" },
    { id: "9", title: "Team Retrospective", date: "previous7", type: "chat" },
    { id: "10", title: "Budget Planning", date: "previous7", type: "chat" },
    { id: "11", title: "Performance Review", date: "previous7", type: "chat" },
    { id: "12", title: "Market Research", date: "previous7", type: "chat" },
    { id: "13", title: "Technical Debt", date: "previous7", type: "chat" },
]

export function SearchChatsModal({ isOpen, onClose }: SearchChatsModalProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredChats = mockChats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const groupChatsByDate = (chats: ChatItem[]) => {
        const groups: { [key: string]: ChatItem[] } = {
            new: [],
            today: [],
            yesterday: [],
            previous7: []
        }

        chats.forEach(chat => {
            if (chat.type === "new") {
                groups.new.push(chat)
            } else {
                groups[chat.date].push(chat)
            }
        })

        return groups
    }

    const chatGroups = groupChatsByDate(filteredChats)

    const getSectionTitle = (key: string) => {
        switch (key) {
            case "today": return "Today"
            case "yesterday": return "Yesterday"
            case "previous7": return "Previous 7 Days"
            default: return ""
        }
    }

    const handleChatClick = (chat: ChatItem) => {
        if (chat.type === "new") {
            // Handle new chat creation
            console.log("Creating new chat")
        } else {
            // Handle existing chat navigation
            console.log("Navigating to chat:", chat.title)
        }
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-0 bg-white rounded-lg shadow-lg">
                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <Input
                            placeholder="Search chats..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                            autoFocus
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Chat List */}
                <div className="max-h-96 overflow-y-auto">
                    {/* New Chat */}
                    {chatGroups.new.length > 0 && (
                        <div className="px-4 py-2">
                            <button
                                onClick={() => handleChatClick(chatGroups.new[0])}
                                className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                            >
                                <Edit3 className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-900">New chat</span>
                            </button>
                        </div>
                    )}

                    {/* Today */}
                    {chatGroups.today.length > 0 && (
                        <div className="px-4 py-2">
                            <div className="text-sm font-medium text-gray-900 mb-2">Today</div>
                            {chatGroups.today.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => handleChatClick(chat)}
                                    className="w-full p-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                                >
                                    <span className="text-sm text-gray-900">{chat.title}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Yesterday */}
                    {chatGroups.yesterday.length > 0 && (
                        <div className="px-4 py-2">
                            <div className="text-sm font-medium text-gray-900 mb-2">Yesterday</div>
                            {chatGroups.yesterday.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => handleChatClick(chat)}
                                    className="w-full p-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                                >
                                    <span className="text-sm text-gray-900">{chat.title}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Previous 7 Days */}
                    {chatGroups.previous7.length > 0 && (
                        <div className="px-4 py-2">
                            <div className="text-sm font-medium text-gray-900 mb-2">Previous 7 Days</div>
                            {chatGroups.previous7.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => handleChatClick(chat)}
                                    className="w-full p-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                                >
                                    <span className="text-sm text-gray-900">{chat.title}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* No results */}
                    {filteredChats.length === 0 && (
                        <div className="px-4 py-8 text-center">
                            <p className="text-sm text-gray-500">No chats found</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
} 