
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Search, MessageSquare, HelpCircle, Users, DollarSign, FileText, Settings, Star, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const FAQPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      icon: HelpCircle,
      color: "bg-blue-100 text-blue-600",
      faqs: [
        {
          question: "What is FeatherBiz?",
          answer: "FeatherBiz is an AI-powered business platform that helps small businesses manage customers, create invoices, track expenses, schedule appointments, and grow their business with intelligent automation."
        },
        {
          question: "How much does FeatherBiz cost?",
          answer: "We offer a 14-day free trial with no credit card required. After the trial, our plans start at $29/month for basic features, with professional and enterprise tiers available."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we take security seriously. All data is encrypted in transit and at rest, we use secure cloud infrastructure, and we comply with industry-standard security practices."
        },
        {
          question: "Can I cancel anytime?",
          answer: "Absolutely! You can cancel your subscription at any time with no cancellation fees. Your data will remain accessible for 30 days after cancellation."
        }
      ]
    },
    {
      id: "features",
      title: "Features & Functionality",
      icon: Star,
      color: "bg-green-100 text-green-600",
      faqs: [
        {
          question: "What features are included?",
          answer: "FeatherBiz includes smart invoicing, customer management, appointment scheduling, expense tracking, estimates & quotes, analytics dashboard, AI voice assistant, and much more."
        },
        {
          question: "Does it work on mobile devices?",
          answer: "Yes! FeatherBiz is fully responsive and works perfectly on smartphones, tablets, and desktop computers. We also have native mobile apps coming soon."
        },
        {
          question: "Can I customize invoices?",
          answer: "Yes, you can fully customize your invoices with your logo, colors, payment terms, and custom fields. Our AI can also help generate professional invoice content."
        },
        {
          question: "How does the AI assistant work?",
          answer: "Our AI assistant can help you create invoices, generate estimates, draft emails to customers, analyze your business data, and provide insights to grow your business."
        }
      ]
    },
    {
      id: "billing",
      title: "Billing & Payments",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans."
        },
        {
          question: "Can I change my plan?",
          answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied, contact our support team for a full refund."
        },
        {
          question: "Are there any setup fees?",
          answer: "No, there are no setup fees, hidden costs, or long-term contracts. You only pay for your monthly or annual subscription."
        }
      ]
    },
    {
      id: "support",
      title: "Support & Help",
      icon: MessageSquare,
      color: "bg-orange-100 text-orange-600",
      faqs: [
        {
          question: "How can I get support?",
          answer: "You can reach our support team via email, live chat, or our help center. We typically respond within 2-4 hours during business hours."
        },
        {
          question: "Do you offer training?",
          answer: "Yes! We provide comprehensive onboarding, video tutorials, webinars, and one-on-one training sessions to help you get the most out of FeatherBiz."
        },
        {
          question: "Is there a knowledge base?",
          answer: "Yes, we have an extensive knowledge base with articles, tutorials, and guides covering all aspects of using FeatherBiz effectively."
        },
        {
          question: "What are your support hours?",
          answer: "Our support team is available Monday through Friday, 9 AM to 6 PM EST. We also offer limited weekend support for urgent issues."
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Questions",
      icon: Settings,
      color: "bg-red-100 text-red-600",
      faqs: [
        {
          question: "What browsers are supported?",
          answer: "FeatherBiz works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
        },
        {
          question: "Do you have an API?",
          answer: "Yes, we offer a RESTful API for integrating FeatherBiz with other business tools. API documentation is available for developers."
        },
        {
          question: "Can I import my existing data?",
          answer: "Yes, we support importing data from popular accounting software, CRM systems, and CSV files. Our team can help with the migration process."
        },
        {
          question: "How often do you update the platform?",
          answer: "We release new features and improvements regularly, typically every 2-3 weeks. All updates are automatic and don't require any action from you."
        }
      ]
    }
  ]

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

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
            Find answers to common questions about FeatherBiz features, billing, and support
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-center sm:text-left rounded-xl border-2 focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="container mx-auto px-4 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          {searchTerm && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {filteredFAQs.reduce((total, category) => total + category.faqs.length, 0)} results found
              </p>
            </div>
          )}

          <div className="space-y-6 sm:space-y-8">
            {filteredFAQs.map((category) => (
              <Card key={category.id} className="shadow-lg border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl text-gray-900">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {category.faqs.length} questions
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="text-sm sm:text-base font-medium text-gray-900">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchTerm && (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    Try searching with different keywords or browse our categories above.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm("")}
                    className="mx-auto"
                  >
                    Clear Search
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8">
              Our support team is here to help. Get in touch and we'll respond within 2-4 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 rounded-xl"
              >
                <MessageSquare className="mr-2 w-4 h-4" />
                Send Message
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/feedback')}
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 rounded-xl"
              >
                <Mail className="mr-2 w-4 h-4" />
                Send Feedback
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
