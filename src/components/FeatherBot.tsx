import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuthState } from "@/hooks/useAuthState"
import { useLanguage } from "@/contexts/LanguageContext"
import { toast } from "sonner"

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface FeatherBotProps {
  isVisible: boolean
}

export function FeatherBot({ isVisible }: FeatherBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingText, setTypingText] = useState("")
  const { user } = useAuthState()
  const { currentLanguage } = useLanguage()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typingText])

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [])

  // Common greeting messages
  const greetingMessages = [
    "Hi there! 👋 I'm FeatherBot, your business assistant. How can I help you today?",
    "Welcome back! 🌟 I'm here to help with your business management needs.",
    "Hello! 💼 Need help with invoices, clients, or business insights? I'm here for you!",
    "Hi! ✨ I can assist with everything from document tracking to financial insights.",
    "Greetings! 🚀 Ready to streamline your business? Let's get started!"
  ]

  // Load conversation history and show greeting
  useEffect(() => {
    if (isOpen && user) {
      loadConversationHistory()
      showGreetingMessage()
    }
  }, [isOpen, user])

  const showGreetingMessage = () => {
    if (messages.length === 0) {
      const randomGreeting = greetingMessages[Math.floor(Math.random() * greetingMessages.length)]
      setTimeout(() => {
        typeMessage(randomGreeting, () => {
          const greetingMessage: Message = {
            id: `greeting-${Date.now()}`,
            type: 'bot',
            content: randomGreeting,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, greetingMessage])
        })
      }, 500)
    }
  }

  const loadConversationHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('featherbot_conversations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true })
        .limit(20)

      if (error) throw error

      const historyMessages: Message[] = []
      data?.forEach((conv) => {
        historyMessages.push({
          id: `${conv.id}-user`,
          type: 'user',
          content: conv.message,
          timestamp: new Date(conv.created_at)
        })
        historyMessages.push({
          id: `${conv.id}-bot`,
          type: 'bot',
          content: conv.response,
          timestamp: new Date(conv.created_at)
        })
      })

      setMessages(historyMessages)
    } catch (error) {
      console.error('Error loading conversation history:', error)
    }
  }

  // Typing effect function
  const typeMessage = (text: string, callback: () => void) => {
    setIsTyping(true)
    setTypingText("")
    let currentIndex = 0
    
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < text.length) {
        setTypingText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingIntervalRef.current!)
        setIsTyping(false)
        setTypingText("")
        callback()
      }
    }, 30) // Adjust speed here (lower = faster)
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isTyping || !user) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke('featherbot-assistant', {
        body: { 
          message: userMessage.content,
          language: currentLanguage 
        }
      })

      if (error) throw error

      setIsLoading(false)

      // Start typing effect for bot response
      typeMessage(data.response, () => {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: data.response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      })

    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again.')
      
      setIsLoading(false)
      
      const errorResponseText = "I'm sorry, I encountered an error. Please try again."
      typeMessage(errorResponseText, () => {
        const errorMessage: Message = {
          id: `bot-error-${Date.now()}`,
          type: 'bot',
          content: errorResponseText,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)', paddingRight: 'env(safe-area-inset-right, 0)' }}>
      {/* Floating Animated Icon */}
      {!isOpen && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setIsOpen(true)}
                className="group relative h-14 w-14 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
                aria-label="FeatherBot – Virtual Assistant"
                tabIndex={0}
              >
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-gray-600 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
                
                {/* Chat bubble icon */}
                <div className="relative flex items-center justify-center h-full w-full">
                  <div className="w-6 h-6 bg-white rounded-lg relative flex items-center justify-center">
                    {/* Chat bubble shape */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                      <path 
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-gray-900 text-white">
              <p>Need help? Talk to FeatherBot</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="animate-fade-in animate-scale-in">
          <Card className="w-80 sm:w-96 h-96 sm:h-[500px] shadow-xl border-0 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3 bg-gray-800 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-5 h-5 bg-gray-600 rounded-full border border-white flex items-center justify-center">
                      <div className="absolute top-1 left-1 flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                      </div>
                      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2">
                        <div className="w-2 h-1 border-b border-white rounded-b-full"></div>
                      </div>
                    </div>
                  </div>
                  FeatherBot
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-gray-700/50 h-8 w-8 p-0 rounded-full transition-colors"
                  aria-label="Close FeatherBot"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-[calc(100%-60px)]">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4 max-h-[300px]">
                {messages.length === 0 && !isTyping && (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-8 animate-fade-in">
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gray-700 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                          <div className="absolute top-4 left-4 flex gap-2">
                            <div className="w-2.5 h-2.5 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                            <div className="w-2.5 h-2.5 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                          </div>
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                            <div className="w-5 h-2.5 border-b-2 border-white rounded-b-full"></div>
                          </div>
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs">✨</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">FeatherBot Assistant</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your intelligent business companion</p>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mx-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-2">I can help you with:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 dark:text-gray-300">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                            Invoice tracking
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                            Client management
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                            Financial insights
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                            Business analytics
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex animate-fade-in ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.type === 'user'
                          ? 'bg-gray-700 text-white shadow-gray-300 dark:shadow-gray-600/50'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 shadow-gray-100 dark:shadow-gray-800/50'
                      } transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === 'bot' && (
                          <div className="relative mt-0.5 flex-shrink-0">
                            <div className="w-4 h-4 bg-gray-600 rounded-full border border-white flex items-center justify-center">
                              <div className="absolute top-0.5 left-0.5 flex gap-0.5">
                                <div className="w-0.5 h-0.5 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                                <div className="w-0.5 h-0.5 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                              </div>
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                                <div className="w-1.5 h-0.5 border-b border-white rounded-b-full"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        {message.type === 'user' && (
                          <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          <p
                            className={`text-xs mt-2 ${
                              message.type === 'user' ? 'text-gray-200' : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start mb-4 animate-fade-in">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-4 h-4 bg-gray-600 rounded-full border border-white flex items-center justify-center">
                            <div className="absolute top-0.5 left-0.5 flex gap-0.5">
                              <div className="w-0.5 h-0.5 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                              <div className="w-0.5 h-0.5 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                            </div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                              <div className="w-1.5 h-0.5 border-b border-white rounded-b-full"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-gray-500">Thinking</span>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start mb-4 animate-fade-in">
                    <div className="max-w-[80%] bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-start gap-2">
                        <div className="relative mt-0.5 flex-shrink-0">
                          <div className="w-4 h-4 bg-gray-600 rounded-full border border-white flex items-center justify-center">
                            <div className="absolute top-0.5 left-0.5 flex gap-0.5">
                              <div className="w-0.5 h-0.5 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                              <div className="w-0.5 h-0.5 bg-white rounded-full animate-[blink_3s_infinite]"></div>
                            </div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                              <div className="w-1.5 h-0.5 border-b border-white rounded-b-full"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {typingText}
                            <span className="inline-block w-2 h-4 bg-gray-500 ml-1 animate-pulse"></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your business..."
                      disabled={isLoading || isTyping}
                      className="pr-12 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 transition-all duration-200 focus:ring-2 focus:ring-gray-500/20 shadow-sm"
                    />
                    {inputMessage.trim() && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || isTyping || !inputMessage.trim()}
                    className="bg-gray-700 hover:bg-gray-600 transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-gray-300 dark:shadow-gray-600/50"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  )
}