
import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronUp, Brain, Zap, MessageSquare, Send, Filter, Star, Users, HelpCircle, Lightbulb } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  popularity: number
}

const faqData: FAQItem[] = [
  // Platform Overview
  {
    id: "1",
    question: "What is Hubsfy and how does it revolutionize business management?",
    answer: "Hubsfy is the most advanced AI-powered business platform designed for modern entrepreneurs and service professionals. Unlike traditional tools, we combine intelligent automation, predictive analytics, seamless invoicing, customer relationship management, and real-time business insights in one unified ecosystem. Our AI learns your business patterns and proactively suggests optimizations, making you more profitable and efficient than ever before.",
    category: "Platform Overview",
    tags: ["platform", "overview", "ai", "automation", "business management"],
    popularity: 95
  },
  {
    id: "2",
    question: "How does Hubsfy compare to ServiceTitan, Square, or other platforms?",
    answer: "While ServiceTitan focuses mainly on field service and Square on payments, Hubsfy is the only platform that truly integrates AI throughout every business process. We offer superior invoice customization, predictive customer insights, voice-powered task management, advanced document tracking, and intelligent pricing suggestions. Our users report 40% faster task completion and 25% increase in revenue within the first 3 months.",
    category: "Platform Overview",
    tags: ["comparison", "servicetitan", "square", "competitive advantage"],
    popularity: 88
  },

  // AI Features
  {
    id: "3",
    question: "How powerful is the AI Voice Assistant and what can it do?",
    answer: "Our AI Voice Assistant is industry-leading, powered by advanced natural language processing. You can create invoices, schedule appointments, update customer records, generate reports, and manage projects entirely through voice commands. It understands context, learns your preferences, and can handle complex multi-step tasks. For example, say 'Create an invoice for John's plumbing repair, $250, due in 30 days' and it's done instantly.",
    category: "AI Features",
    tags: ["voice", "ai", "assistant", "automation", "commands"],
    popularity: 92
  },
  {
    id: "4",
    question: "What makes Hubsfy's AI different from basic automation tools?",
    answer: "Our AI doesn't just automate—it thinks ahead. It analyzes your business patterns to predict cash flow, suggests optimal pricing based on market data and your history, identifies customers likely to need follow-up services, and automatically adapts your workflow for maximum efficiency. The AI also provides strategic business insights that help you make data-driven decisions to grow your business.",
    category: "AI Features",
    tags: ["ai", "intelligence", "predictions", "insights", "strategy"],
    popularity: 85
  },
  {
    id: "5",
    question: "Can the AI help me price my services competitively?",
    answer: "Absolutely! Our AI pricing engine analyzes your historical data, local market rates, project complexity, and customer profiles to suggest optimal pricing. It considers factors like your profit margins, competitor pricing, seasonal trends, and customer payment history. This ensures you're always pricing competitively while maximizing profitability.",
    category: "AI Features",
    tags: ["pricing", "ai", "competition", "optimization", "profit"],
    popularity: 90
  },

  // Invoicing & Payments
  {
    id: "6",
    question: "How advanced is the invoicing system compared to QuickBooks or FreshBooks?",
    answer: "Our invoicing system surpasses traditional tools with AI-powered features like automatic customer data population, intelligent line item suggestions based on project type, smart payment term recommendations, and real-time payment tracking. We offer unlimited customization, automated follow-ups, integrated e-signatures, and advanced analytics that show which invoice designs convert best.",
    category: "Invoicing",
    tags: ["invoices", "payments", "quickbooks", "advanced", "automation"],
    popularity: 93
  },
  {
    id: "7",
    question: "Can I track invoice performance and payment patterns?",
    answer: "Yes! Our advanced analytics show you detailed invoice performance metrics including open rates, time to payment, customer payment patterns, and conversion rates by invoice design. The AI identifies trends and suggests optimizations like the best times to send invoices, which payment terms work best for different customers, and how to reduce late payments.",
    category: "Invoicing",
    tags: ["tracking", "analytics", "payments", "performance", "insights"],
    popularity: 87
  },
  {
    id: "8",
    question: "What payment methods and integrations are supported?",
    answer: "We support all major payment methods including credit cards, ACH transfers, digital wallets (Apple Pay, Google Pay), and bank transfers. Our platform integrates seamlessly with Stripe, PayPal, Square, QuickBooks, Xero, and over 50+ other business tools. Payments are processed securely with bank-level encryption and instant notifications.",
    category: "Invoicing",
    tags: ["payments", "integrations", "stripe", "paypal", "security"],
    popularity: 89
  },

  // Customer Management
  {
    id: "9",
    question: "How does the customer management system enhance relationships?",
    answer: "Our CRM goes beyond basic contact management. It tracks customer communication history, predicts service needs, automates follow-up sequences, and provides insights into customer satisfaction and lifetime value. The AI suggests personalized communication strategies and identifies upselling opportunities, helping you build stronger, more profitable customer relationships.",
    category: "Customer Management",
    tags: ["crm", "customers", "relationships", "communication", "insights"],
    popularity: 91
  },
  {
    id: "10",
    question: "Can I automate customer communication and follow-ups?",
    answer: "Absolutely! Create intelligent automation sequences for appointment reminders, invoice follow-ups, service check-ins, and marketing campaigns. The AI personalizes messages based on customer history and preferences, optimizes send times for maximum engagement, and automatically adjusts messaging based on customer responses and behavior patterns.",
    category: "Customer Management",
    tags: ["automation", "communication", "follow-ups", "personalization"],
    popularity: 86
  },

  // Work Orders & Projects
  {
    id: "11",
    question: "How does work order management streamline operations?",
    answer: "Our work order system provides end-to-end project visibility with real-time updates, automatic scheduling optimization, resource allocation suggestions, and progress tracking. Team members can update status via mobile app, customers receive automatic notifications, and the AI predicts potential delays or issues before they impact your schedule.",
    category: "Work Orders",
    tags: ["work orders", "projects", "scheduling", "tracking", "optimization"],
    popularity: 88
  },
  {
    id: "12",
    question: "Can I track profitability by project and optimize resource allocation?",
    answer: "Yes! Get detailed profitability analysis for every project including labor costs, material expenses, overhead allocation, and profit margins. The AI suggests resource optimization strategies, identifies your most profitable service types, and recommends pricing adjustments to maximize profitability across your entire business.",
    category: "Work Orders",
    tags: ["profitability", "projects", "resources", "optimization", "margins"],
    popularity: 84
  },

  // Estimates & Quotes
  {
    id: "13",
    question: "How intelligent is the estimation and quoting process?",
    answer: "Our AI-powered estimation tool analyzes project requirements and automatically suggests line items, quantities, and pricing based on your historical data and industry standards. It factors in material costs, labor time, overhead, and desired profit margins to create accurate, competitive quotes in minutes instead of hours.",
    category: "Estimates",
    tags: ["estimates", "quotes", "ai", "pricing", "accuracy"],
    popularity: 90
  },
  {
    id: "14",
    question: "Can I track quote conversion rates and optimize my proposals?",
    answer: "Absolutely! Monitor which quotes convert to jobs, analyze win/loss reasons, and get AI insights on how to improve your proposals. The system tracks customer engagement with quotes, suggests follow-up timing, and identifies pricing strategies that lead to higher conversion rates.",
    category: "Estimates",
    tags: ["conversion", "quotes", "optimization", "analytics", "proposals"],
    popularity: 82
  },

  // Analytics & Reporting
  {
    id: "15",
    question: "What kind of business intelligence and analytics are available?",
    answer: "Get comprehensive business intelligence with real-time dashboards, predictive analytics, cash flow forecasting, customer lifetime value analysis, and profitability reporting. Our AI identifies trends, predicts future performance, and provides actionable recommendations to grow your business. All data is presented in easy-to-understand visualizations.",
    category: "Analytics",
    tags: ["analytics", "business intelligence", "reporting", "insights", "predictions"],
    popularity: 89
  },
  {
    id: "16",
    question: "Can I create custom reports and export data?",
    answer: "Yes! Create unlimited custom reports with our drag-and-drop report builder. Export data in various formats (PDF, Excel, CSV) and schedule automatic report delivery. The AI can also generate narrative insights and recommendations based on your data, making it easy to understand what the numbers mean for your business.",
    category: "Analytics",
    tags: ["custom reports", "export", "data", "scheduling", "insights"],
    popularity: 78
  },

  // Pricing & Plans
  {
    id: "17",
    question: "What's included in the free plan and how does it compare?",
    answer: "Our free plan includes 5 invoices per month, basic customer management, standard templates, and core features. However, to unlock the full power of our AI features, unlimited invoicing, advanced analytics, and premium integrations, we recommend our paid plans starting at just $29/month—significantly more affordable than ServiceTitan or similar enterprise solutions.",
    category: "Pricing",
    tags: ["free plan", "pricing", "features", "comparison", "value"],
    popularity: 94
  },
  {
    id: "18",
    question: "How does the 7-day free trial work and what can I test?",
    answer: "Get full access to all premium features for 7 days—no credit card required! Test the AI voice assistant, create unlimited invoices, try advanced analytics, use all integrations, and experience the complete platform. Our onboarding team will help you set up and optimize the system for your specific business needs during the trial.",
    category: "Pricing",
    tags: ["free trial", "premium features", "testing", "onboarding"],
    popularity: 91
  },
  {
    id: "19",
    question: "What's the ROI and how quickly will I see results?",
    answer: "Our customers typically see immediate time savings and increased efficiency within the first week. The average ROI is 300-500% within the first year through increased productivity, reduced manual work, improved cash flow, and better customer retention. Many users report the platform pays for itself within the first month through time savings alone.",
    category: "Pricing",
    tags: ["roi", "results", "productivity", "savings", "value"],
    popularity: 87
  },

  // Security & Compliance
  {
    id: "20",
    question: "How secure is my business data and what compliance standards do you meet?",
    answer: "We maintain enterprise-grade security with SOC 2 Type II compliance, 256-bit SSL encryption, automatic daily backups, and 99.9% uptime SLA. Your data is stored in secure, geographically distributed data centers with multi-factor authentication, role-based access controls, and continuous security monitoring. We also comply with GDPR, CCPA, and other privacy regulations.",
    category: "Security",
    tags: ["security", "compliance", "encryption", "backup", "privacy"],
    popularity: 85
  },

  // Integrations
  {
    id: "21",
    question: "What integrations are available and how easy is setup?",
    answer: "We integrate with 100+ popular business tools including QuickBooks, Xero, Stripe, Mailchimp, Google Workspace, Microsoft 365, Zapier, and many more. Most integrations set up in under 5 minutes with simple OAuth connections. Our AI can automatically map data fields and suggest optimal integration workflows for your specific business needs.",
    category: "Integrations",
    tags: ["integrations", "setup", "quickbooks", "automation", "workflows"],
    popularity: 83
  },

  // Mobile & Accessibility
  {
    id: "22",
    question: "Is there a mobile app and can my team work remotely?",
    answer: "Yes! Our fully-featured mobile apps (iOS and Android) allow your team to create invoices, update work orders, communicate with customers, and access all platform features on the go. Everything syncs in real-time, and the AI voice assistant works perfectly on mobile devices. Perfect for field teams and remote work scenarios.",
    category: "Mobile",
    tags: ["mobile app", "remote work", "field team", "sync", "voice"],
    popularity: 86
  },

  // Support & Training
  {
    id: "23",
    question: "What support and training options are available?",
    answer: "We provide comprehensive support including 24/7 chat support, video tutorials, live training sessions, and dedicated success managers for premium accounts. Our AI-powered help system provides instant answers, and our knowledge base contains detailed guides for every feature. We also offer free migration assistance from other platforms.",
    category: "Support",
    tags: ["support", "training", "help", "migration", "success"],
    popularity: 80
  },

  // Advanced Features
  {
    id: "24",
    question: "What advanced features set Hubsfy apart from the competition?",
    answer: "Unique features include predictive cash flow modeling, AI-powered customer sentiment analysis, automated business performance optimization, intelligent inventory management suggestions, dynamic pricing optimization, advanced document engagement tracking, and machine learning-based business growth recommendations that adapt to your specific industry and business model.",
    category: "Advanced Features",
    tags: ["advanced", "predictive", "sentiment", "optimization", "machine learning"],
    popularity: 81
  },

  // Industry Specific
  {
    id: "25",
    question: "Does Hubsfy work for my specific industry and business type?",
    answer: "Absolutely! Hubsfy is designed to work for any service-based business including contractors, consultants, agencies, field services, professional services, and more. The AI adapts to your industry's specific workflows, terminology, and best practices. We have pre-built templates and configurations for 20+ industries with industry-specific features and compliance requirements.",
    category: "Industry Solutions",
    tags: ["industry", "contractors", "consultants", "field service", "customization"],
    popularity: 88
  }
]

const categories = [
  "All",
  "Platform Overview", 
  "AI Features", 
  "Invoicing", 
  "Customer Management",
  "Work Orders",
  "Estimates", 
  "Analytics", 
  "Pricing", 
  "Security",
  "Integrations",
  "Mobile",
  "Support",
  "Advanced Features",
  "Industry Solutions"
]

export function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [userQuestion, setUserQuestion] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [showQuestionForm, setShowQuestionForm] = useState(false)

  const filteredFAQs = useMemo(() => {
    let filtered = faqData.filter(faq => {
      const matchesSearch = searchTerm === "" || 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort by popularity and relevance
    return filtered.sort((a, b) => {
      if (searchTerm) {
        // If searching, prioritize exact matches
        const aExactMatch = a.question.toLowerCase().includes(searchTerm.toLowerCase())
        const bExactMatch = b.question.toLowerCase().includes(searchTerm.toLowerCase())
        if (aExactMatch && !bExactMatch) return -1
        if (!aExactMatch && bExactMatch) return 1
      }
      return b.popularity - a.popularity
    })
  }, [searchTerm, selectedCategory])

  const popularFAQs = faqData
    .filter(faq => faq.popularity >= 90)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5)

  const handleSubmitQuestion = () => {
    if (userQuestion.trim()) {
      console.log('Submitting question:', { question: userQuestion, email: userEmail })
      // Here you would typically send this to your support system
      setUserQuestion("")
      setUserEmail("")
      setShowQuestionForm(false)
      // Show success message
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      "Platform Overview": <Lightbulb className="h-4 w-4" />,
      "AI Features": <Brain className="h-4 w-4" />,
      "Invoicing": <MessageSquare className="h-4 w-4" />,
      "Analytics": <Zap className="h-4 w-4" />,
      "Support": <HelpCircle className="h-4 w-4" />,
    }
    return icons[category] || <Star className="h-4 w-4" />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Brain className="h-10 w-10 text-primary" />
          AI-Powered Help Center
        </h1>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Get instant answers powered by AI. Our intelligent search understands your questions and provides the most relevant solutions. 
          Join thousands of businesses that trust Hubsfy to revolutionize their operations.
        </p>
      </div>

      {/* AI Search Bar */}
      <Card className="bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 border-primary/20">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Ask anything about Hubsfy's AI features, pricing, integrations, or how we compare to other platforms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg border-primary/30 focus:border-primary"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </div>
          {searchTerm && (
            <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Found {filteredFAQs.length} intelligent results for "{searchTerm}"
            </p>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Questions</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="ask">Ask Question</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center gap-2"
              >
                {getCategoryIcon(category)}
                {category}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category === "All" ? faqData.length : faqData.filter(faq => faq.category === category).length}
                </Badge>
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
                  <p className="text-muted-foreground mb-4">
                    Try different search terms or browse categories
                  </p>
                  <Button onClick={() => setShowQuestionForm(true)}>
                    Ask Our Support Team
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start gap-3 w-full">
                        {getCategoryIcon(faq.category)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-base">{faq.question}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{faq.category}</Badge>
                            {faq.popularity >= 90 && (
                              <Badge variant="default" className="text-xs bg-yellow-500">
                                <Star className="h-3 w-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {faq.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Most Popular Questions
              </CardTitle>
              <CardDescription>
                The questions our customers ask most often
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {popularFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.filter(cat => cat !== "All").map((category) => {
              const categoryFAQs = faqData.filter(faq => faq.category === category)
              return (
                <Card key={category} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {getCategoryIcon(category)}
                      {category}
                    </CardTitle>
                    <CardDescription>
                      {categoryFAQs.length} questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCategory(category)
                        document.querySelector('[value="all"]')?.click()
                      }}
                    >
                      View Questions
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="ask" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Can't Find Your Answer?
              </CardTitle>
              <CardDescription>
                Ask our AI-powered support team. We typically respond within 1 hour during business hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Question</label>
                <Textarea
                  placeholder="Describe your question or issue in detail. The more specific you are, the better we can help..."
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address (Optional)</label>
                <Input
                  type="email"
                  placeholder="your-email@company.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleSubmitQuestion}
                disabled={!userQuestion.trim()}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Question to Support
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Support CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Still Need Help?
          </CardTitle>
          <CardDescription>
            Our expert support team is ready to help you succeed with Hubsfy
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Start Live Chat
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Schedule Demo Call
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
