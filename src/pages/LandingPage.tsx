
import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ThemeToggle } from "@/components/ThemeToggle"
import { TypingText } from "@/components/TypingText"
import { CharlieAssistant } from "@/components/CharlieAssistant"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Check, ArrowRight, Users, Shield, Zap, TrendingUp, MessageSquare, Award, Feather, Play, ChevronRight, Building2, Globe, Smartphone, BarChart3, Clock, CheckCircle2, Menu, X, Sparkles, Crown, FileText, ClipboardList, UserCheck, Package, Calendar, Mic, Bot, ChartBar, RefreshCw, Video, Instagram, Facebook, Youtube, Twitter, Heart, Smile } from "lucide-react"
import { useState } from "react"

const LandingPage = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isYearly, setIsYearly] = useState(false)

  const featuresData = [
    {
      id: 1,
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated scheduling with AI-powered optimization and conflict resolution.",
    },
    {
      id: 2,
      icon: FileText,
      title: "Automated Invoicing",
      description: "Generate professional invoices instantly with smart templates and automation.",
    },
    {
      id: 3,
      icon: Users,
      title: "CRM with Tags & Groups",
      description: "Organize clients with smart tagging, grouping, and relationship management.",
    },
    {
      id: 4,
      icon: Bot,
      title: "AI Voice Assistant (Charlie)",
      description: "Your multilingual AI assistant for voice commands and business automation.",
    },
    {
      id: 5,
      icon: ChartBar,
      title: "Visual Reports & Analytics",
      description: "Beautiful insights and reports to track your business performance.",
    },
    {
      id: 6,
      icon: RefreshCw,
      title: "Mobile & Web Sync",
      description: "Seamless synchronization across all your devices and platforms.",
    },
  ]

  const howItWorksSteps = [
    {
      id: 1,
      icon: UserCheck,
      title: "Add Clients",
      description: "Import or add clients with smart contact management",
    },
    {
      id: 2,
      icon: ClipboardList,
      title: "Create Estimates or Invoices",
      description: "Generate professional estimates and invoices in seconds",
    },
    {
      id: 3,
      icon: Calendar,
      title: "Schedule Jobs",
      description: "Smart scheduling with conflict detection and optimization",
    },
    {
      id: 4,
      icon: Bot,
      title: "Let Charlie Handle Everything",
      description: "AI-powered reminders, follow-ups & voice commands",
    },
  ]

  const pricingPlans = [
    {
      id: 1,
      name: "Starter",
      price: isYearly ? "$10.39" : "$12.99",
      originalPrice: isYearly ? "$12.99" : null,
      features: ["1 user", "Basic invoicing", "Charlie Lite", "Mobile app", "Email support"],
      popular: false,
    },
    {
      id: 2,
      name: "Pro",
      price: isYearly ? "$15.99" : "$19.99",
      originalPrice: isYearly ? "$19.99" : null,
      features: ["Up to 5 users", "Full scheduling", "CRM with tags", "Charlie Full", "Visual reports", "Priority support"],
      popular: true,
    },
    {
      id: 3,
      name: "Elite",
      price: isYearly ? "$31.99" : "$39.99",
      originalPrice: isYearly ? "$39.99" : null,
      features: ["Unlimited users", "AI auto-actions", "Multilingual AI", "Advanced integrations", "Custom workflows", "24/7 dedicated support"],
      popular: false,
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Maria Rodriguez",
      title: "Plumbing Services",
      location: "Miami, FL 🇺🇸",
      quote: "Charlie helps me schedule everything in Spanish and English. Game changer!",
      rating: 5,
    },
    {
      id: 2,
      name: "João Silva",
      title: "Electrical Contractor",
      location: "São Paulo, BR 🇧🇷",
      quote: "A FeatherBiz revolucionou meu negócio. O Charlie é incrível!",
      rating: 5,
    },
    {
      id: 3,
      name: "Hans Mueller",
      title: "HVAC Services",
      location: "Berlin, DE 🇩🇪",
      quote: "Perfekt für mein kleines Unternehmen. Charlie versteht Deutsch perfekt!",
      rating: 5,
    },
  ]

  const integrations = [
    "Stripe", "Square", "QuickBooks", "WhatsApp", "Google Calendar", "Outlook", "Zapier", "PayPal"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center min-w-0">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 sm:p-2 rounded-xl shadow-lg">
                <Feather className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
              </div>
              <span className="ml-2 sm:ml-3 text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">FeatherBiz</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm xl:text-base font-medium hover:scale-105">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm xl:text-base font-medium hover:scale-105">Pricing</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm xl:text-base font-medium hover:scale-105">How It Works</a>
              <a href="#support" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm xl:text-base font-medium hover:scale-105">Support</a>
              <div className="flex items-center gap-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-xs sm:text-sm rounded-xl transition-all duration-300 hover:scale-105 px-2 sm:px-3"
                size="sm"
              >
                Log In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 px-2 sm:px-3"
                size="sm"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl hover:bg-blue-50 transition-all duration-300 p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-2xl shadow-lg">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300">Features</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300">Pricing</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300">How It Works</a>
                <a href="#support" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300">Support</a>
                <div className="flex items-center gap-2 px-3 py-2">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300 px-3"
                  size="sm"
                >
                  Log In
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm rounded-xl shadow-lg transition-all duration-300 px-3"
                  size="sm"
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight tracking-tight">
                SIMPLIFY YOUR ENTIRE BUSINESS IN ONE{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  POWERFUL PLATFORM
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0">
                Invoicing, Scheduling, CRM & Voice Assistant — multilingual & AI-ready
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto"
                  size="lg"
                >
                  Start for Free
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-200 hover:border-blue-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto bg-white/80 backdrop-blur-sm"
                  size="lg"
                >
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Content - Dashboard Mockup */}
            <div className="relative order-1 lg:order-2 mt-6 sm:mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-100 backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
                <div className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center z-10">
                    <div className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-lg">
                      <BarChart3 className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-blue-600 mx-auto mb-2 sm:mb-4" />
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base font-medium">Dynamic Dashboard Preview</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                </div>
              </div>
              {/* Charlie floating in corner */}
              <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-2 sm:p-4 shadow-2xl animate-bounce">
                <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                <div className="absolute -top-8 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 sm:px-3 py-1 sm:py-2 rounded-xl whitespace-nowrap hidden sm:block shadow-lg">
                  Hi! I'm Charlie. Ask me anything.
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-center mb-3 sm:mb-4 max-w-4xl mx-auto">
            Everything your service business needs in one place
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
            {featuresData.map((feature) => (
              <Card key={feature.id} className="shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group bg-white/80 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-start text-base sm:text-lg lg:text-xl font-semibold">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 sm:p-3 rounded-2xl shadow-lg mr-3 sm:mr-4 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <span className="leading-tight pt-0.5 sm:pt-1">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <CardDescription className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-center mb-8 sm:mb-12">
            How FeatherBiz Works in 4 Simple Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="text-center group">
                <div className="relative mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-4 sm:p-6 w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 shadow-lg">
                    <step.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-center mb-6 sm:mb-8">
            Choose the right plan for your business
          </h2>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 flex w-full max-w-xs shadow-lg border border-gray-100">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex-1 ${
                  !isYearly ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex-1 ${
                  isYearly ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1 sm:ml-2 text-green-500 text-xs font-bold block sm:inline">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border-0 ${plan.popular ? 'ring-2 ring-blue-500 relative transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-2xl shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-3 sm:pb-4 pt-6 sm:pt-8">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-semibold">{plan.name}</CardTitle>
                  <div className="mt-3 sm:mt-4">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-gray-600 text-xs sm:text-sm lg:text-base">/mo</span>
                    {plan.originalPrice && (
                      <div className="text-xs sm:text-sm text-gray-500 line-through">{plan.originalPrice}/mo</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700 text-xs sm:text-sm lg:text-base">
                        <div className="bg-green-100 rounded-full p-0.5 sm:p-1 mr-2 sm:mr-3 flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 py-2 sm:py-3 text-xs sm:text-sm">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6 sm:mb-8">See FeatherBiz in Action</h2>
          <div className="relative bg-gradient-to-br from-gray-100 to-blue-100 rounded-3xl aspect-video flex items-center justify-center shadow-2xl overflow-hidden">
            <div className="text-center z-10">
              <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg">
                <Video className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-600 text-sm sm:text-base font-medium">Interactive Demo Video</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">Subtitle options in 6+ languages</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          </div>
          <Button className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto" size="lg">
            Create My Free Account
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-center mb-8 sm:mb-12">
            Loved by Service Pros Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current mr-0.5 sm:mr-1" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.title}</div>
                      <div className="text-xs text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6 sm:mb-8">Integrates with Your Favorite Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-3xl shadow-lg hover:shadow-xl border border-gray-100 hover:-translate-y-1 transition-all duration-300">
                <div className="h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl flex items-center justify-center mb-2 sm:mb-3">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm lg:text-base">{integration}</span>
                </div>
                {index > 5 && (
                  <span className="text-xs text-blue-600 font-medium bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">Coming Soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90"></div>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8">
            Start simplifying your business today
          </h2>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto font-semibold"
            size="lg"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 sm:p-2 rounded-xl shadow-lg">
                  <Feather className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <span className="ml-2 sm:ml-3 text-base sm:text-lg lg:text-xl font-bold">FeatherBiz</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                By FX American Group with <Heart className="inline h-3 w-3 sm:h-4 sm:w-4 text-blue-500 animate-pulse" /> to empower small business heroes.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">Company</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">Social</h3>
              <div className="flex space-x-3 sm:space-x-4">
                <div className="bg-gray-800 hover:bg-gray-700 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:scale-110">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>
                <div className="bg-gray-800 hover:bg-gray-700 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:scale-110">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>
                <div className="bg-gray-800 hover:bg-gray-700 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:scale-110">
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>
                <div className="bg-gray-800 hover:bg-gray-700 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:scale-110">
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">Language</h3>
              <LanguageSelector />
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>&copy; {new Date().getFullYear()} FeatherBiz. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Charlie Voice Assistant Widget */}
      <CharlieAssistant />
    </div>
  )
}

export default LandingPage
