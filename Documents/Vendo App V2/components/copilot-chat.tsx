"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  audioUrl?: string
}

interface CopilotChatProps {
  chatId?: string
  initialPrompt?: string | null
}

const mockChatData: Record<string, Message[]> = {
  "marketing-strategy": [
    {
      id: "1",
      content: "Can you analyze our marketing performance?",
      role: "user",
      timestamp: new Date("2024-01-15T10:30:00"),
    },
    {
      id: "2",
      content:
        "Based on your current MRR trends, I recommend focusing on customer retention strategies. Your churn rate has increased by 3% this month.",
      role: "assistant",
      timestamp: new Date("2024-01-15T10:30:30"),
    },
  ],
  "product-roadmap": [
    {
      id: "1",
      content: "What should we prioritize in our product roadmap?",
      role: "user",
      timestamp: new Date("2024-01-14T14:20:00"),
    },
    {
      id: "2",
      content:
        "Your weekly metrics show strong growth in user engagement. The new feature rollout has increased session duration by 25%. Should I prepare a detailed report?",
      role: "assistant",
      timestamp: new Date("2024-01-14T14:20:45"),
    },
  ],
  "customer-feedback": [
    {
      id: "1",
      content: "How are customers responding to our latest updates?",
      role: "user",
      timestamp: new Date("2024-01-13T09:15:00"),
    },
    {
      id: "2",
      content:
        "I notice some unusual patterns in your conversion funnel. Let me break down the key bottlenecks and suggest improvements for each stage.",
      role: "assistant",
      timestamp: new Date("2024-01-13T09:15:30"),
    },
  ],
}

export function CopilotChat({ chatId, initialPrompt }: CopilotChatProps) {
  // Add CSS for mobile placeholder text
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 750px) {
        .copilot-input::placeholder {
          content: "Ask about your data" !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>(() => {
    if (chatId && mockChatData[chatId]) {
      return mockChatData[chatId]
    }
    return []
  })
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [hasProcessedInitialPrompt, setHasProcessedInitialPrompt] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (chatId && mockChatData[chatId]) {
      setMessages(mockChatData[chatId])
    } else {
      setMessages([])
    }
  }, [chatId])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 750);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        setIsRecording(false)
      }

      recognitionInstance.onerror = () => {
        setIsRecording(false)
      }

      recognitionInstance.onend = () => {
        setIsRecording(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (initialPrompt && !hasProcessedInitialPrompt && messages.length === 0) {
      setHasProcessedInitialPrompt(true)

      const userMessage: Message = {
        id: Date.now().toString(),
        content: initialPrompt,
        role: "user",
        timestamp: new Date(),
      }

      setMessages([userMessage])
      setIsLoading(true)

      // Generate AI response
      setTimeout(
        () => {
          const responses = [
            "I've analyzed your CAC data. Consider optimizing your marketing spend on channels with higher conversion rates. Your organic acquisition is performing 40% better than paid channels.",
            "Your revenue forecasting looks promising. Based on current trends, you're on track to exceed your quarterly targets by 15%. Would you like me to update your projections?",
            "Your weekly metrics show strong growth in user engagement. The new feature rollout has increased session duration by 25%. Should I prepare a detailed report?",
            "I notice some unusual patterns in your conversion funnel. Let me break down the key bottlenecks and suggest improvements for each stage.",
            "Based on your current MRR trends, I recommend focusing on customer retention strategies. Your churn rate has increased by 3% this month.",
          ]

          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: responses[Math.floor(Math.random() * responses.length)],
            role: "assistant",
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, assistantMessage])
          setIsLoading(false)
          speakMessage(assistantMessage.content)
        },
        1000 + Math.random() * 2000,
      )
    }
  }, [initialPrompt, hasProcessedInitialPrompt, messages.length])

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return

    if (messages.length === 0) {
      router.push(`/chat?prompt=${encodeURIComponent(inputValue)}`)
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(
      () => {
        const responses = [
          "Based on your current MRR trends, I recommend focusing on customer retention strategies. Your churn rate has increased by 3% this month.",
          "I've analyzed your CAC data. Consider optimizing your marketing spend on channels with higher conversion rates. Your organic acquisition is performing 40% better than paid channels.",
          "Your revenue forecasting looks promising. Based on current trends, you're on track to exceed your quarterly targets by 15%. Would you like me to update your projections?",
          "Your weekly metrics show strong growth in user engagement. The new feature rollout has increased session duration by 25%. Should I prepare a detailed report?",
          "I notice some unusual patterns in your conversion funnel. Let me break down the key bottlenecks and suggest improvements for each stage.",
        ]

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          role: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)

        speakMessage(assistantMessage.content)

        timeoutRef.current = null
      },
      1000 + Math.random() * 2000,
    )
  }, [inputValue, messages.length, router])

  const handleVoiceRecord = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser.")
      return
    }

    if (isRecording) {
      recognition.stop()
      setIsRecording(false)
    } else {
      recognition.start()
      setIsRecording(true)
    }
  }

  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen w-full chat-gradient-bg">
      {messages.length > 0 ? (
        <>
          <div className="absolute top-16 bottom-20 left-0 right-0 overflow-y-auto p-3">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <Card
                    className={`p-4 max-w-[70%] ${message.role === "user" ? "bg-purple-600 text-white" : "bg-white border border-white/20"
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.role === "user" ? "text-purple-100" : "text-gray-400"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </Card>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Card className="p-4 bg-white border border-white/20">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      <p className="text-sm text-gray-500">Analyzing your data...</p>
                    </div>
                  </Card>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 to-transparent pt-0 pb-3 px-3">
            <div
              className="mx-auto"
              style={{
                ...(typeof window !== "undefined" && window.location.pathname === "/chat"
                  ? {
                    marginLeft: "var(--sidebar-width, 0px)",
                    maxWidth: "calc(100vw - var(--sidebar-width, 0px) - 2rem)",
                  }
                  : {}),
              }}
            >
              <div className="relative shadow-lg rounded-full w-full">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your key results, customers, or business insights..."
                  className="pl-6 pr-14 h-14 rounded-full w-full bg-white placeholder:text-gray-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleVoiceRecord}
                  variant="ghost"
                  size="sm"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 ${isRecording ? "bg-red-50 text-red-600 hover:bg-red-100" : "text-gray-500"
                    }`}
                  disabled={isLoading}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>

              <div className="text-center mt-2">
                <p className="text-gray-400 text-sm">
                  Vendo is a copilot, not an autopilot. think critically.
                </p>
              </div>

              {isRecording && (
                <div className="mt-3 flex items-center justify-center gap-2 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Recording... Speak now</span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full max-[750px]:items-end max-[750px]:justify-end max-[750px]:pb-6 pt-[105px]">
          <div className="w-full max-w-2xl mx-auto px-6">
            <div className="text-center mb-6 min-[750px]:mb-8 mt-3">
              <h1 className="text-xl min-[750px]:text-2xl font-medium text-black">
                Hi! I'm your Analytics Copilot
                <br />— turning data into clarity.
                <br />
                What would you like to understand?
              </h1>
            </div>

            <div className="mb-6 min-[750px]:mb-8 overflow-x-auto min-[750px]:overflow-visible min-[750px]:w-full max-[750px]:-mr-6">
              <div className="flex gap-4 pb-2 min-[750px]:grid min-[750px]:grid-cols-2 min-[750px]:gap-4 min-[750px]:pb-0 min-[750px]:w-full">
                <Card
                  className="p-3 bg-white border border-white/20 hover:bg-white/90 transition-colors cursor-pointer flex-shrink-0 w-64 min-[750px]:w-full"
                  onClick={() => {
                    const prompt = "Analyze my customer acquisition cost trends"
                    router.push(`/chat?prompt=${encodeURIComponent(prompt)}`)
                  }}
                >
                  <div>
                    <p className="text-sm text-gray-600">
                      <strong>Analyze</strong> CAC trends and channel performance
                    </p>
                  </div>
                </Card>

                <Card
                  className="p-3 bg-white border border-white/20 hover:bg-white/90 transition-colors cursor-pointer flex-shrink-0 w-64 min-[750px]:w-full"
                  onClick={() => {
                    const prompt = "Show me revenue forecasting for next quarter"
                    router.push(`/chat?prompt=${encodeURIComponent(prompt)}`)
                  }}
                >
                  <div>
                    <p className="text-sm text-gray-600">
                      <strong>Get quarterly</strong> projections and growth insights
                    </p>
                  </div>
                </Card>

                <Card
                  className="p-3 bg-white border border-white/20 hover:bg-white/90 transition-colors cursor-pointer flex-shrink-0 w-64 min-[750px]:w-full"
                  onClick={() => {
                    const prompt = "Analyze user engagement and retention metrics"
                    router.push(`/chat?prompt=${encodeURIComponent(prompt)}`)
                  }}
                >
                  <div>
                    <p className="text-sm text-gray-600">
                      <strong>Deep dive into</strong> user behavior and churn patterns
                    </p>
                  </div>
                </Card>

                <Card
                  className="p-3 bg-white border border-white/20 hover:bg-white/90 transition-colors cursor-pointer flex-shrink-0 w-64 min-[750px]:w-full"
                  onClick={() => {
                    const prompt = "Compare marketing channel performance"
                    router.push(`/chat?prompt=${encodeURIComponent(prompt)}`)
                  }}
                >
                  <div>
                    <p className="text-sm text-gray-600">
                      <strong>ROI analysis</strong> across all marketing channels
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="relative shadow-lg rounded-full">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isMobile ? "Ask about your data" : "Ask me about your key results, customers, or business insights..."}
                className="pl-6 pr-14 h-14 rounded-full w-full bg-white placeholder:text-gray-500"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="relative group">
                  <Button
                    onClick={handleVoiceRecord}
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 hover:bg-gray-100 ${isRecording ? "bg-red-50 text-red-600 hover:bg-red-100" : "text-gray-500"}`}
                    disabled={isLoading}
                  >
                    <Image
                      src="/Microphone.svg"
                      alt="Microphone"
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px]"
                    />
                  </Button>
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                      Dictate
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="bg-gray-200 rounded-full p-1">
                    <Image
                      src="/Soundwave.svg"
                      alt="Soundwave"
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px]"
                    />
                  </div>
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                      Use Voice Mode
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isRecording && (
              <div className="mt-3 flex items-center justify-center gap-2 text-red-600">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording... Speak now</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CopilotChat
