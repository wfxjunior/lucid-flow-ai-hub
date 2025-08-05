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
  const { user } = useAuthState()
  const { currentLanguage } = useLanguage()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load conversation history
  useEffect(() => {
    if (isOpen && user) {
      loadConversationHistory()
    }
  }, [isOpen, user])

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

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return

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

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again.')
      
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        type: 'bot',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
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
                className="group relative h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white hover:from-blue-500 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="FeatherBot – Virtual Assistant"
                tabIndex={0}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                
                {/* Blue and white blinking face */}
                <div className="relative flex items-center justify-center h-full w-full">
                  <div className="text-white text-2xl font-bold" style={{ animation: 'blink 7s infinite' }}>
                    😊
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
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <div className="text-lg">🤖</div>
                  FeatherBot
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-700/50 h-8 w-8 p-0 rounded-full transition-colors"
                  aria-label="Close FeatherBot"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-full">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-8 animate-fade-in">
                    <div className="text-4xl mb-4">🤖</div>
                    <p className="text-sm">Hello, I'm FeatherBot. How can I help you?</p>
                    <p className="text-xs mt-2 text-gray-400">Ask me about invoices, clients, earnings, or any platform features!</p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex animate-fade-in ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600'
                      } transition-all duration-200 hover:shadow-md`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === 'bot' && (
                          <div className="text-sm mt-0.5 flex-shrink-0">🤖</div>
                        )}
                        {message.type === 'user' && (
                          <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          <p
                            className={`text-xs mt-2 ${
                              message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start mb-4 animate-fade-in">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="text-sm">🤖</div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className="flex-1 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105"
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