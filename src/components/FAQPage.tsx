
import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronUp, Brain, Zap, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is Hubsfy and how does it work?",
    answer: "Hubsfy is an AI-powered business platform designed for modern entrepreneurs. It combines intelligent automation, invoice creation, customer management, and analytics in one unified platform. Our AI assistant learns from your business patterns to suggest next actions and streamline your workflow.",
    category: "General",
    tags: ["platform", "overview", "ai", "automation"]
  },
  {
    id: "2",
    question: "How does the AI Voice Assistant work?",
    answer: "Our AI Voice Assistant uses advanced natural language processing to understand your voice commands and help you manage your business tasks. You can create invoices, check customer information, schedule appointments, and get business insights just by speaking to the assistant.",
    category: "AI Features",
    tags: ["voice", "ai", "assistant", "commands"]
  },
  {
    id: "3",
    question: "Can I create professional invoices with AI assistance?",
    answer: "Yes! Our AI-powered invoice creator automatically fills in customer information, suggests pricing based on previous invoices, and can even generate invoice descriptions based on your project details. The AI learns from your invoicing patterns to make the process faster and more accurate.",
    category: "Invoicing",
    tags: ["invoices", "ai", "automation", "pricing"]
  },
  {
    id: "4",
    question: "What AI features are included in the platform?",
    answer: "Hubsfy includes predictive workflow suggestions, smart interface adaptation, document tracking with AI insights, automated customer communication, intelligent pricing recommendations, business pattern analysis, and voice-powered task management.",
    category: "AI Features",
    tags: ["ai", "features", "automation", "intelligence"]
  },
  {
    id: "5",
    question: "How does document tracking work?",
    answer: "Our AI-powered document tracking shows you when clients open your documents, how long they spend reading them, and which sections they focus on. The AI analyzes engagement patterns to suggest the best times to follow up and optimize your document content.",
    category: "Document Management",
    tags: ["tracking", "documents", "analytics", "engagement"]
  },
  {
    id: "6",
    question: "What's included in the Free Invoice plan?",
    answer: "The Free Invoice plan includes 5 invoices per month, basic templates, email sending capabilities, basic customer management, and standard support. It's perfect for occasional invoicing needs.",
    category: "Pricing",
    tags: ["free", "invoices", "pricing", "plan"]
  },
  {
    id: "7",
    question: "What can I try during the 7-day free trial?",
    answer: "The 7-day free trial gives you access to all premium features including unlimited invoices, AI voice assistant, advanced analytics, priority support, and all integrations. No credit card required to start.",
    category: "Pricing",
    tags: ["trial", "free", "premium", "features"]
  },
  {
    id: "8",
    question: "How does the AI learn my business patterns?",
    answer: "Our AI analyzes your invoicing history, customer interactions, project timelines, and business activities to understand your unique patterns. It then suggests optimizations, predicts next actions, and automates repetitive tasks based on your behavior.",
    category: "AI Features",
    tags: ["learning", "patterns", "automation", "optimization"]
  },
  {
    id: "9",
    question: "Can I integrate Hubsfy with other tools?",
    answer: "Yes! Hubsfy offers integrations with popular tools including email platforms, calendar applications, payment processors, and accounting software. Our AI can automatically sync data and suggest the best integration strategies for your workflow.",
    category: "Integrations",
    tags: ["integrations", "tools", "sync", "workflow"]
  },
  {
    id: "10",
    question: "How secure is my business data?",
    answer: "We use enterprise-grade security with SSL encryption, automatic backups, and 99.9% uptime guarantee. Your data is stored securely and we comply with international data protection standards. Our AI processes data locally when possible for additional security.",
    category: "Security",
    tags: ["security", "data", "encryption", "privacy"]
  },
  {
    id: "11",
    question: "What kind of analytics does the AI provide?",
    answer: "Our AI analytics include revenue predictions, customer behavior insights, invoice performance metrics, payment trend analysis, and business growth recommendations. The AI identifies patterns you might miss and suggests actionable improvements.",
    category: "Analytics",
    tags: ["analytics", "insights", "predictions", "metrics"]
  },
  {
    id: "12",
    question: "How does the smart interface adaptation work?",
    answer: "The AI observes how you use the platform and automatically adjusts the interface to match your preferences. It can rearrange dashboard widgets, suggest shortcuts, and customize the layout based on your most-used features.",
    category: "AI Features",
    tags: ["interface", "adaptation", "customization", "ai"]
  },
  {
    id: "13",
    question: "Can the AI help with customer communication?",
    answer: "Absolutely! The AI can draft professional emails, suggest follow-up messages, analyze customer sentiment, and recommend the best communication timing based on customer behavior patterns. It learns your communication style to maintain consistency.",
    category: "Customer Management",
    tags: ["communication", "ai", "emails", "customers"]
  },
  {
    id: "14",
    question: "What's the difference between monthly and annual plans?",
    answer: "The annual plan includes everything in the monthly plan plus 2 months free (saving you money), advanced AI features, white-label options, custom integrations, dedicated support, early access to new features, and business consultation.",
    category: "Pricing",
    tags: ["monthly", "annual", "pricing", "features"]
  },
  {
    id: "15",
    question: "How does predictive workflow work?",
    answer: "Our AI analyzes your business patterns to predict what you'll likely do next. It can suggest which customers to follow up with, when to send invoices, what projects need attention, and optimal times for different business activities.",
    category: "AI Features",
    tags: ["predictive", "workflow", "suggestions", "automation"]
  },
  {
    id: "16",
    question: "Can I track my family savings through the platform?",
    answer: "Yes! Hubsfy includes a unique family savings tracker that helps you automatically set aside money from your business income for personal goals. The AI can suggest optimal savings amounts based on your revenue patterns.",
    category: "Financial Management",
    tags: ["savings", "family", "financial", "goals"]
  },
  {
    id: "17",
    question: "How does e-signature functionality work?",
    answer: "Our e-signature feature is AI-enhanced to automatically identify signature fields, suggest signing order for multiple parties, and track signature completion. The AI can also predict the likelihood of document signing based on engagement metrics.",
    category: "Document Management",
    tags: ["e-signature", "documents", "ai", "tracking"]
  },
  {
    id: "18",
    question: "What support options are available?",
    answer: "We offer standard support for free users, priority support for paid plans, and dedicated support for annual subscribers. Our AI-powered help system can answer common questions instantly, and you can always reach our human support team.",
    category: "Support",
    tags: ["support", "help", "assistance", "ai"]
  },
  {
    id: "19",
    question: "How does the AI suggest pricing for my services?",
    answer: "The AI analyzes your historical pricing, market trends, project complexity, and customer profiles to suggest optimal pricing. It considers factors like project scope, client budget, and industry standards to help you price competitively.",
    category: "AI Features",
    tags: ["pricing", "suggestions", "ai", "optimization"]
  },
  {
    id: "20",
    question: "Can I customize the AI assistant's behavior?",
    answer: "Yes! You can train the AI assistant to match your business style, set preferences for automation levels, choose which tasks to automate, and customize the types of suggestions you receive. The AI adapts to your feedback over time.",
    category: "AI Features",
    tags: ["customization", "ai", "assistant", "training"]
  }
]

const categories = ["All", "General", "AI Features", "Invoicing", "Pricing", "Analytics", "Security", "Support", "Document Management", "Customer Management", "Integrations", "Financial Management"]

export function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = searchTerm === "" || 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Brain className="h-10 w-10 text-primary" />
          AI-Powered FAQ
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Get instant answers to your questions with our intelligent search. Our AI understands context and helps you find exactly what you're looking for.
        </p>
      </div>

      {/* Search Bar */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Ask anything about Hubsfy's AI features, pricing, or functionality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-muted-foreground mt-2">
              <Zap className="inline h-4 w-4 mr-1" />
              AI Search found {filteredFAQs.length} relevant results
            </p>
          )}
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category)}
            className="flex items-center gap-2"
          >
            {category === "AI Features" && <Brain className="h-4 w-4" />}
            {category}
            {selectedCategory === category && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {category === "All" ? faqData.length : faqData.filter(faq => faq.category === category).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* FAQ Results */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse different categories
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((faq) => (
            <Card key={faq.id} className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {faq.category === "AI Features" && <Brain className="h-5 w-5 text-primary" />}
                      {faq.question}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{faq.category}</Badge>
                      {faq.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(faq.id)}
                    className="ml-4"
                  >
                    {expandedItems.includes(faq.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedItems.includes(faq.id) && (
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      {/* AI Features Highlight */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Need More Help?
          </CardTitle>
          <CardDescription>
            Our AI assistant can provide personalized answers based on your specific use case
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat with AI Assistant
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
