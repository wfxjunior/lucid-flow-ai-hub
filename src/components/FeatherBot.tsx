import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Send, X, Bot, User, Smile, Mail, Languages, ExternalLink } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuthState } from "@/hooks/useAuthState"
import { useLanguage } from "@/contexts/LanguageContext"
import { toast } from "sonner"
import { useFeatherBotAccess } from "@/hooks/useFeatherBotAccess"

interface Message {
  id: string
  type: 'user' | 'bot' | 'system'
  content: string
  timestamp: Date
}

interface LeadCapture {
  name: string
  email: string
}

interface FeatherBotProps {
  isVisible: boolean
  theme?: 'brand' | 'gray'
}

export function FeatherBot({ isVisible, theme = 'brand' }: FeatherBotProps) {
  const isGray = theme === 'gray'
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [showLeadCapture, setShowLeadCapture] = useState(false)
  const [leadData, setLeadData] = useState<LeadCapture>({ name: "", email: "" })
  const [chatLanguage, setChatLanguage] = useState("en")
  const [isBlinking, setIsBlinking] = useState(false)
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null)
  const { user } = useAuthState()
  const { currentLanguage } = useLanguage()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const { userPlan } = useFeatherBotAccess()

  // Sync chat language with app language
  useEffect(() => {
    if (currentLanguage) setChatLanguage(currentLanguage)
  }, [currentLanguage])

  // Context helpers
  const getCurrentPage = () => {
    const route = window.location.pathname + window.location.search
    const title = document.title || 'FeatherBiz'
    const locale = chatLanguage
    return {
      id: route.includes('invo') ? 'invoices' : route === '/' ? 'dashboard' : route.replace(/[/?=&]/g, '_'),
      title,
      route,
      plan: userPlan,
      locale
    }
  }

  const buildSelector = (el: HTMLElement | null): string | null => {
    if (!el) return null
    if (el.id) return `#${el.id}`
    if (el.dataset && (el as any).dataset.kbId) return `[data-kb-id="${(el as any).dataset.kbId}"]`
    const tag = el.tagName.toLowerCase()
    const parent = el.parentElement
    if (!parent) return tag
    const index = Array.from(parent.children).indexOf(el) + 1
    return `${buildSelector(parent)} > ${tag}:nth-child(${index})`
  }

  const getSelectionCtx = () => {
    const active = (document.activeElement as HTMLElement) || null
    const target = active?.closest('[data-kb-id]') as HTMLElement | null
    const kbId = target?.getAttribute('data-kb-id') || undefined
    const selector = buildSelector(target || active)
    return { selector: selector || undefined, kbId, featureTag: kbId?.split('.')[0] }
  }

  // Listen to external explain requests
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail || {}
      const prompt = detail.prompt || 'Explain this page'
      setIsOpen(true)
      setTimeout(() => {
        setInputMessage(prompt)
        sendMessage(prompt)
      }, 50)
    }
    window.addEventListener('featherbot:explain', handler as EventListener)
    return () => window.removeEventListener('featherbot:explain', handler as EventListener)
  }, [])

  // Languages support
  const languages = {
    en: "English",
    es: "Español", 
    pt: "Português",
    fr: "Français",
    de: "Deutsch",
    zh: "中文"
  }

  // Suggested starter prompts by language
  const starterPrompts = {
    en: [
      "What are the available plans?",
      "How much does it cost monthly?", 
      "Is there a free trial?",
      "Can I cancel anytime?",
      "Do you offer yearly billing?",
      "What's the difference between each plan?"
    ],
    es: [
      "¿Cuáles son los planes disponibles?",
      "¿Cuánto cuesta mensualmente?",
      "¿Hay una prueba gratuita?", 
      "¿Puedo cancelar en cualquier momento?",
      "¿Ofrecen facturación anual?",
      "¿Cuál es la diferencia entre cada plan?"
    ],
    pt: [
      "Quais são os planos disponíveis?",
      "Quanto custa mensalmente?",
      "Existe um teste gratuito?",
      "Posso cancelar a qualquer momento?",
      "Vocês oferecem cobrança anual?",
      "Qual é a diferença entre cada plano?"
    ],
    fr: [
      "Quels sont les plans disponibles?",
      "Combien ça coûte par mois?",
      "Y a-t-il un essai gratuit?",
      "Puis-je annuler à tout moment?",
      "Proposez-vous une facturation annuelle?",
      "Quelle est la différence entre chaque plan?"
    ],
    de: [
      "Welche Pläne sind verfügbar?",
      "Wie viel kostet es monatlich?",
      "Gibt es eine kostenlose Testversion?",
      "Kann ich jederzeit kündigen?",
      "Bieten Sie jährliche Abrechnung an?",
      "Was ist der Unterschied zwischen den Plänen?"
    ],
    zh: [
      "有哪些可用的计划？",
      "每月费用是多少？",
      "有免费试用吗？",
      "我可以随时取消吗？",
      "你们提供年度计费吗？",
      "每个计划之间有什么区别？"
    ]
  }

  // Comprehensive FeatherBiz Knowledge Base
  const featherBizKnowledge = `
PLANS & PRICING
- Starter: $9.99/month - Basic client management, invoicing
- Growth: $24.99/month - More automations, email tracking, integrations  
- Premium: $49.99/month - Team collaboration, advanced reporting, priority support
- Free trial: 7 days with full Growth plan features, no credit card required
- Yearly billing: 20% discount available
- Cancellation: Anytime without penalty

USAGE & BENEFITS
- Manage clients, send invoices, automate tasks, collect payments, track activity
- Perfect for freelancers, solopreneurs, and service-based businesses
- Custom invoice branding and layouts
- Payment integrations: Stripe and Square included
- Mobile-friendly for iOS and Android
- SSL encryption and secure cloud infrastructure
- Team collaboration (Premium plan only)

BILLING & POLICIES  
- Refunds: Case-by-case within 14 days
- Payment methods: All major credit cards, Stripe, Square
- Plan switching: Upgrade/downgrade anytime
- Data retention: 60 days after cancellation
- Multiple businesses: Growth and Premium plans
- Tax settings: Customizable per country
- Updates: Every two weeks

SUPPORT & FEATURES
- Live chat: Premium and FeatherGold tiers
- Onboarding: Growth and Premium users
- Multi-language: English, Spanish, Portuguese, French, German, Chinese
- E-signatures: SignNow integration (Premium)
- Calendar sync: Coming soon
- Data export: CSV and PDF available
- FeatherGold: VIP early-access program for exclusive features

CONTACT & DEMOS
- Sales team: Book discovery call
- Demo requests: Available via chatbot
- Non-profit/student discounts: hello@featherbiz.io
- Support: hello@featherbiz.io
- Reviews: featherbiz.io/testimonials
`

  // Greeting messages by language
  const greetingMessages = {
    en: "👋 Hi! Have questions about FeatherBiz plans or pricing? I can help!",
    es: "👋 ¡Hola! ¿Tienes preguntas sobre los planes o precios de FeatherBiz? ¡Puedo ayudarte!",
    pt: "👋 Olá! Tem dúvidas sobre os planos ou preços do FeatherBiz? Posso ajudar!",
    fr: "👋 Salut! Des questions sur les plans ou tarifs de FeatherBiz? Je peux vous aider!",
    de: "👋 Hallo! Fragen zu FeatherBiz-Plänen oder Preisen? Ich kann helfen!",
    zh: "👋 你好！对FeatherBiz计划或定价有疑问？我可以帮助您！"
  }

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
      if (idleTimer) {
        clearTimeout(idleTimer)
      }
    }
  }, [])

  // Optimized blinking animation effect - reduce frequency
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 8000) // Reduced from 3000ms to 8000ms

    return () => clearInterval(blinkInterval)
  }, [])

  // Load conversation history and show greeting
  useEffect(() => {
    if (isOpen) {
      if (user) {
        loadConversationHistory()
      }
      showGreetingMessage()
      resetIdleTimer()
    }
  }, [isOpen, chatLanguage])

  // Reset idle timer on user activity
  const resetIdleTimer = () => {
    if (idleTimer) {
      clearTimeout(idleTimer)
    }
    
    const timer = setTimeout(() => {
      if (isOpen && !showLeadCapture) {
        const idleMessage: Message = {
          id: `idle-${Date.now()}`,
          type: 'bot',
          content: getIdleMessage(),
          timestamp: new Date()
        }
        setMessages(prev => [...prev, idleMessage])
        setShowLeadCapture(true)
      }
    }, 20000) // 20 seconds
    
    setIdleTimer(timer)
  }

  const getIdleMessage = () => {
    const messages = {
      en: "Would you like to leave your email so we can follow up with you?",
      es: "¿Te gustaría dejar tu email para que podamos contactarte?",
      pt: "Gostaria de deixar seu email para que possamos entrar em contato?",
      fr: "Aimeriez-vous laisser votre email pour qu'on puisse vous recontacter?",
      de: "Möchten Sie Ihre E-Mail hinterlassen, damit wir Sie kontaktieren können?",
      zh: "您愿意留下您的邮箱以便我们跟进吗？"
    }
    return messages[chatLanguage as keyof typeof messages] || messages.en
  }

  const showGreetingMessage = () => {
    if (messages.length === 0) {
      const greeting = greetingMessages[chatLanguage as keyof typeof greetingMessages] || greetingMessages.en
      setTimeout(() => {
        typeMessage(greeting, () => {
          const greetingMessage: Message = {
            id: `greeting-${Date.now()}`,
            type: 'bot',
            content: greeting,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, greetingMessage])
          
          // Show starter prompts after greeting
          setTimeout(() => {
            showStarterPrompts()
          }, 1000)
        })
      }, 500)
    }
  }

  const showStarterPrompts = () => {
    const prompts = starterPrompts[chatLanguage as keyof typeof starterPrompts] || starterPrompts.en
    const promptsMessage: Message = {
      id: `prompts-${Date.now()}`,
      type: 'system',
      content: JSON.stringify(prompts.slice(0, 3)), // Show first 3 prompts
      timestamp: new Date()
    }
    setMessages(prev => [...prev, promptsMessage])
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

  // Handle starter prompt click
  const handleStarterPrompt = (prompt: string) => {
    setInputMessage(prompt)
    sendMessage(prompt)
  }

  // Handle lead capture
  const handleLeadCapture = async () => {
    if (!leadData.name || !leadData.email) {
      toast.error("Please fill in both name and email")
      return
    }

    try {
      // Store lead in database and send email
      const { error } = await supabase.functions.invoke('featherbot-lead-capture', {
        body: {
          name: leadData.name,
          email: leadData.email,
          language: chatLanguage,
          timestamp: new Date().toISOString()
        }
      })

      if (error) throw error

      const thankYouMessage: Message = {
        id: `thanks-${Date.now()}`,
        type: 'bot',
        content: getThankYouMessage(),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, thankYouMessage])
      setShowLeadCapture(false)
      setLeadData({ name: "", email: "" })
      
      toast.success("Thank you! We'll be in touch soon.")
    } catch (error) {
      console.error('Error capturing lead:', error)
      toast.error("Failed to submit. Please try again.")
    }
  }

  const getThankYouMessage = () => {
    const messages = {
      en: "Thank you! We'll send you a summary and follow up soon. Feel free to ask more questions!",
      es: "¡Gracias! Te enviaremos un resumen y te contactaremos pronto. ¡Siéntete libre de hacer más preguntas!",
      pt: "Obrigado! Enviaremos um resumo e entraremos em contato em breve. Fique à vontade para fazer mais perguntas!",
      fr: "Merci! Nous vous enverrons un résumé et vous recontacterons bientôt. N'hésitez pas à poser plus de questions!",
      de: "Danke! Wir senden Ihnen eine Zusammenfassung und melden uns bald. Stellen Sie gerne weitere Fragen!",
      zh: "谢谢！我们会发送摘要并很快跟进。请随时提出更多问题！"
    }
    return messages[chatLanguage as keyof typeof messages] || messages.en
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

  const sendMessage = async (message?: string) => {
    const messageText = message || inputMessage.trim()
    if (!messageText || isLoading || isTyping) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)
    resetIdleTimer()

    try {
      const page = getCurrentPage()
      const selection = getSelectionCtx()
      const { data, error } = await supabase.functions.invoke('featherbot-assistant', {
        body: { 
          message: userMessage.content,
          language: chatLanguage || 'en',
          page,
          selection,
          knowledge: featherBizKnowledge
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

  // ✅ ACTIVE CHATBOT: Blue FeatherBiz Pricing Bot - Modern AI Assistant
  return (
    <div className="fixed bottom-4 right-4 z-50 featherbiz-chatbot" id="pricingChatbot" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)', paddingRight: 'env(safe-area-inset-right, 0)' }}>
      {/* Floating Animated Icon */}
      {!isOpen && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setIsOpen(true)}
                className="group relative h-14 w-14 rounded-full bg-muted hover:bg-muted/90 text-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                aria-label="FeatherBot – Pricing Assistant"
                tabIndex={0}
              >
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-foreground/10 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
                
                {/* Smiling face icon */}
                <div className="relative flex items-center justify-center h-full w-full">
                  <MessageCircle className={`w-7 h-7 text-foreground transition-transform duration-200 ${isBlinking ? 'scale-110' : 'scale-100'}`} />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Questions about plans & pricing? Ask me!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="animate-fade-in animate-scale-in">
          <Card className="w-80 sm:w-96 h-96 sm:h-[500px] shadow-xl border border-border bg-background">
            <CardHeader className={`${isGray ? 'bg-muted text-foreground' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'} pb-3 rounded-t-lg`}>
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className={`w-5 h-5 ${isGray ? "bg-muted-foreground" : "bg-blue-500"} rounded-full border border-white flex items-center justify-center`}>
                      <Smile className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                     <span className={`text-xs ${isGray ? 'text-muted-foreground' : 'text-blue-100'}`}>Assistant</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={chatLanguage} onValueChange={setChatLanguage}>
                    <SelectTrigger className={`w-12 h-8 p-0 border-0 bg-transparent ${isGray ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-blue-600'}`}>
                      <Languages className="h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(languages).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className={`${isGray ? 'text-foreground hover:bg-muted/60' : 'text-white hover:bg-blue-600/50'} h-8 w-8 p-0 rounded-full transition-colors`}
                    aria-label="Close FeatherBot"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex flex-col h-[calc(100%-60px)]">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4 max-h-[300px]">
                {messages.length === 0 && !isTyping && (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-8 animate-fade-in">
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className={`w-16 h-16 ${isGray ? 'bg-muted' : 'bg-gradient-to-br from-blue-500 to-blue-600'} rounded-full border-3 border-white flex items-center justify-center shadow-lg`}>
                          <Smile className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs">💰</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">FeatherBiz Pricing Assistant</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Ask me about plans, pricing, and features!</p>
                      <div className={`${isGray ? 'bg-muted' : 'bg-blue-50 dark:bg-blue-900/20'} rounded-lg p-4 mx-4`}>
                        <p className={`text-xs font-medium mb-2 ${isGray ? 'text-foreground' : 'text-blue-600 dark:text-blue-400'}`}>I can help you with:</p>
                        <div className={`grid grid-cols-2 gap-2 text-xs ${isGray ? 'text-foreground' : 'text-blue-700 dark:text-blue-300'}`}>
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${isGray ? 'bg-muted-foreground' : 'bg-blue-500'}`}></span>
                            Plan comparisons
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${isGray ? 'bg-muted-foreground' : 'bg-blue-500'}`}></span>
                            Pricing details
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${isGray ? 'bg-muted-foreground' : 'bg-blue-500'}`}></span>
                            Free trials
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${isGray ? 'bg-muted-foreground' : 'bg-blue-500'}`}></span>
                            Feature benefits
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div key={message.id}>
                    {message.type === 'system' ? (
                      // Starter prompts
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {JSON.parse(message.content).map((prompt: string, index: number) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleStarterPrompt(prompt)}
                              className={`text-xs ${isGray ? 'bg-muted hover:bg-muted/80 border-muted text-foreground' : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700'} rounded-full`}
                            >
                              {prompt}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Regular messages
                      <div
                        className={`mb-4 flex animate-fade-in ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                            message.type === 'user'
                              ? (isGray ? 'bg-muted-foreground text-background shadow' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200 dark:shadow-blue-900/50')
                              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 shadow-gray-100 dark:shadow-gray-800/50'
                          } transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}
                        >
                          <div className="flex items-start gap-2">
                            {message.type === 'bot' && (
                              <div className="relative mt-0.5 flex-shrink-0">
                                <div className={`w-4 h-4 ${isGray ? 'bg-muted-foreground' : 'bg-blue-500'} rounded-full border border-white flex items-center justify-center`}>
                                  <Smile className="w-2 h-2 text-white" />
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
                                  message.type === 'user' ? (isGray ? 'text-background/70' : 'text-blue-100') : 'text-gray-500 dark:text-gray-400'
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Lead Capture Form */}
                {showLeadCapture && (
                  <div className="mb-4 animate-fade-in">
                    <div className={`${isGray ? 'bg-muted border-border' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'} rounded-lg p-4 border`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className={`h-4 w-4 ${isGray ? 'text-foreground' : 'text-blue-600'}`} />
                        <h4 className={`text-sm font-medium ${isGray ? 'text-foreground' : 'text-blue-900 dark:text-blue-100'}`}>Stay in touch!</h4>
                      </div>
                      <div className="space-y-3">
                        <Input
                          placeholder="Your name"
                          value={leadData.name}
                          onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                          className="text-sm"
                        />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={leadData.email}
                          onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                          className="text-sm"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleLeadCapture}
                            size="sm"
                            className={`${isGray ? 'bg-muted-foreground text-background hover:bg-muted-foreground/90' : 'bg-blue-600 hover:bg-blue-700 text-white'} flex-1`}
                          >
                            Send Summary
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowLeadCapture(false)}
                            className={`${isGray ? 'text-foreground border-border' : 'text-blue-600 border-blue-300'}`}
                          >
                            Skip
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start mb-4 animate-fade-in">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className={`w-4 h-4 ${isGray ? 'bg-muted-foreground' : 'bg-blue-500'} rounded-full border border-white flex items-center justify-center`}>
                            <Smile className="w-2 h-2 text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-gray-500">Thinking</span>
                          <div className="flex gap-1">
                             <div className={`w-2 h-2 ${isGray ? 'bg-muted-foreground' : 'bg-blue-400'} rounded-full animate-bounce`}></div>
                             <div className={`w-2 h-2 ${isGray ? 'bg-muted-foreground' : 'bg-blue-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                             <div className={`w-2 h-2 ${isGray ? 'bg-muted-foreground' : 'bg-blue-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start mb-4 animate-fade-in">
                    <div className="max-w-[80%] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-start gap-2">
                        <div className="relative mt-0.5 flex-shrink-0">
                           <div className={`w-4 h-4 ${isGray ? 'bg-muted-foreground' : 'bg-blue-500'} rounded-full border border-white flex items-center justify-center`}>
                            <Smile className="w-2 h-2 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {typingText}
                            <span className={`inline-block w-2 h-4 ${isGray ? 'bg-muted-foreground' : 'bg-blue-500'} ml-1 animate-pulse`}></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className={`${isGray ? 'bg-muted' : 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700'} p-4 border-t border-gray-200 dark:border-gray-600`}>
                {/* CTA Buttons */}
                <div className="flex gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('/pricing', '_blank')}
                    className={"text-xs flex-1 " + (isGray ? '' : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View All Plans
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('/auth', '_blank')}
                    className={`text-xs flex-1 ${isGray ? 'bg-muted-foreground text-background border-transparent hover:bg-muted-foreground/90' : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'}`}
                  >
                    Start Free Trial
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about plans, pricing, features..."
                      disabled={isLoading || isTyping}
                      className={`pr-12 transition-all duration-200 shadow-sm ${isGray ? 'border-border focus:border-ring focus:ring-2 focus:ring-ring/20' : 'border-blue-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20'}`}
                    />
                    {inputMessage.trim() && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => sendMessage()}
                    disabled={isLoading || isTyping || !inputMessage.trim()}
                    className={`${isGray ? 'bg-muted-foreground text-background hover:bg-muted-foreground/90' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-blue-200 dark:shadow-blue-900/50`}
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