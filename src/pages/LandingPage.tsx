import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Star, Users, DollarSign, TrendingUp, FileText, Heart, MessageSquare, Calendar, Receipt, Settings, Lightbulb, UserCog, Calculator, ArrowRight, Feather } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { FreeTrialQuestionnaire } from "@/components/FreeTrialQuestionnaire"
import { useState } from "react"

const LandingPage = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)

  const features = [
    {
      icon: FileText,
      title: "Smart Invoicing",
      description: "Create professional invoices with AI assistance"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Organize and track all your customer relationships"
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Automated booking and reminder system"
    },
    {
      icon: Calculator,
      title: "Estimates & Quotes",
      description: "Generate accurate estimates with smart calculations"
    },
    {
      icon: Receipt,
      title: "Expense Tracking",
      description: "Monitor costs and manage business expenses"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Real-time insights into your business performance"
    }
  ]

  const handleStartFreeTrial = () => {
    setShowQuestionnaire(true)
  }

  const handleQuestionnaireComplete = (data: any) => {
    console.log('Questionnaire completed:', data)
    // Here you would typically save the data and redirect to dashboard
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Feather className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">FeatherBiz</span>
          </div>
          
          <div className="flex items-center">
            <Button 
              onClick={() => navigate('/auth')} 
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-4"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 text-center">
        <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-800 border-blue-200 text-xs sm:text-sm">
          🚀 AI-Powered Business Platform
        </Badge>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Run Your Business
          <span className="text-blue-600 block">Smarter & Faster</span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          FeatherBiz is the all-in-one AI-powered platform that helps small businesses manage customers, 
          create invoices, track expenses, and grow their business with intelligent automation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
          <Button 
            size="lg" 
            onClick={handleStartFreeTrial}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl border-2 hover:bg-gray-50"
          >
            View Demo
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 px-4">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            <span>10,000+ businesses trust us</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Powerful features designed to streamline your business operations and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 group-hover:text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100 max-w-2xl mx-auto px-4">
            Join thousands of successful businesses using FeatherBiz to streamline operations and increase profits.
          </p>
          <Button 
            size="lg"
            onClick={handleStartFreeTrial}
            className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Free Today
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Feather className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FeatherBiz</span>
              </div>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">
                AI-powered business platform for modern entrepreneurs
              </p>
              <div className="w-full sm:w-48">
                <LanguageSelector />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Product</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="/feedback" className="hover:text-white">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2024 FeatherBiz. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Free Trial Questionnaire Modal */}
      <FreeTrialQuestionnaire
        open={showQuestionnaire}
        onOpenChange={setShowQuestionnaire}
        onComplete={handleQuestionnaireComplete}
      />
    </div>
  )
}

export default LandingPage
