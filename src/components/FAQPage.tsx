
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search, MessageSquare, ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { AIFAQAssistant } from "@/components/AIFAQAssistant"

const faqData = [
  {
    id: 1,
    question: "How do I create my first invoice?",
    answer: "To create your first invoice, navigate to the 'Invoices' section from your dashboard. Click 'Create New Invoice', fill in your client details, add line items for your products or services, and click 'Generate Invoice'. You can then send it directly to your client or download it as a PDF."
  },
  {
    id: 2,
    question: "Can I customize my invoice templates?",
    answer: "Yes! FeatherBiz offers customizable invoice templates. You can add your company logo, change colors, modify layouts, and include custom fields to match your brand identity."
  },
  {
    id: 3,
    question: "How does the estimate approval process work?",
    answer: "When you create an estimate, you can send it to your client for review. Clients can view the estimate online and either approve or request changes. Once approved, you can easily convert the estimate into an invoice or work order."
  },
  {
    id: 4,
    question: "What payment methods do you support?",
    answer: "FeatherBiz integrates with popular payment processors including Stripe, PayPal, and Square. Clients can pay invoices online using credit cards, bank transfers, or digital wallets."
  },
  {
    id: 5,
    question: "How do I track my business expenses?",
    answer: "You can track expenses by uploading receipts, categorizing transactions, and connecting your bank accounts. The system automatically organizes your expenses and provides detailed reports for tax preparation."
  },
  {
    id: 6,
    question: "Can I manage multiple businesses?",
    answer: "Yes, FeatherBiz supports multiple business profiles. You can switch between different businesses from your dashboard and keep all data completely separate."
  },
  {
    id: 7,
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption, regular security audits, and comply with industry standards. Your data is backed up regularly and stored in secure, geographically distributed data centers."
  },
  {
    id: 8,
    question: "How do I set up recurring invoices?",
    answer: "In the invoice creation screen, select 'Recurring Invoice' and choose your billing frequency (weekly, monthly, quarterly, or yearly). The system will automatically generate and send invoices according to your schedule."
  },
  {
    id: 9,
    question: "Can I integrate with my existing tools?",
    answer: "FeatherBiz offers integrations with popular accounting software like QuickBooks, Xero, and FreshBooks, as well as CRM systems and project management tools."
  },
  {
    id: 10,
    question: "What support options are available?",
    answer: "We offer 24/7 email support, live chat during business hours, comprehensive documentation, video tutorials, and webinar training sessions for all users."
  }
]

export const FAQPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const filteredFAQs = faqData.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Button>
            <div className="h-6 w-px bg-gray-300 hidden sm:block" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">FAQ</h1>
          </div>
          
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Help Center
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Find answers to common questions about FeatherBiz. Can't find what you're looking for? Try our AI assistant below!
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQ List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredFAQs.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No FAQs found matching your search.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredFAQs.map((faq) => (
                  <Card key={faq.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader
                      className="cursor-pointer"
                      onClick={() => toggleExpanded(faq.id)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium text-left">
                          {faq.question}
                        </CardTitle>
                        {expandedItems.includes(faq.id) ? (
                          <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedItems.includes(faq.id) && (
                      <CardContent className="pt-0">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    )}
                  </Card>
                ))
              )}
            </div>

            {/* AI Assistant Sidebar */}
            <div className="space-y-6">
              <AIFAQAssistant />
              
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Need More Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/contact')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/feedback')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Feedback
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard')}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
