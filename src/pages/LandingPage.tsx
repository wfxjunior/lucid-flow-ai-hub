
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                <Feather className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <span className="ml-3 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FeatherBiz</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm xl:text-base font-medium hover:scale-105">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm xl:text-base font-medium hover:scale-105">Pricing</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm xl:text-base font-medium hover:scale-105">How It Works</a>
              <a href="#support" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm xl:text-base font-medium hover:scale-105">Support</a>
              <div className="flex items-center gap-3">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-sm rounded-xl transition-all duration-300 hover:scale-105"
                size="sm"
              >
                Log In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
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
                className="rounded-xl hover:bg-blue-50 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-2xl shadow-lg">
                <a href="#features" className="block px-4 py-3 text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300">Features</a>
                <a href="#pricing" className="block px-4 py-3 text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300">Pricing</a>
                <a href="#how-it-works" className="block px-4 py-3 text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300">How It Works</a>
                <a href="#support" className="block px-4 py-3 text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300">Support</a>
                <div className="flex items-center gap-2 px-4 py-3">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-600 hover:text-blue-600 text-sm rounded-xl hover:bg-blue-50 transition-all duration-300"
                  size="sm"
                >
                  Log In
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm rounded-xl shadow-lg transition-all duration-300"
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
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                SIMPLIFY YOUR ENTIRE BUSINESS IN ONE{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  POWERFUL PLATFORM
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Invoicing, Scheduling, CRM & Voice Assistant — multilingual & AI-ready
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto"
                  size="lg"
                >
                  Start for Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-base sm:text-lg px-8 py-4 border-2 border-gray-200 hover:border-blue-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto bg-white/80 backdrop-blur-sm"
                  size="lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Content - Dashboard Mockup */}
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
                <div className="h-48 sm:h-64 lg:h-72 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center z-10">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                      <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600 text-sm sm:text-base font-medium">Dynamic Dashboard Preview</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                </div>
              </div>
              {/* Charlie floating in corner */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-2xl animate-bounce">
                <Bot className="h-8 w-8 text-white" />
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap hidden sm:block shadow-lg">
                  Hi! I'm Charlie. Ask me anything.
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-center mb-4 max-w-4xl mx-auto">
            Everything your service business needs in one place
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuresData.map((feature) => (
              <Card key={feature.id} className="shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group bg-white/80 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-start text-lg sm:text-xl font-semibold">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg mr-4 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="leading-tight pt-1">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-center mb-12">
            How FeatherBiz Works in 4 Simple Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-6 w-24 h-24 mx-auto flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 shadow-lg">
                    <step.icon className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-center mb-8">
            Choose the right plan for your business
          </h2>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 flex w-full max-w-xs shadow-lg border border-gray-100">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex-1 ${
                  !isYearly ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex-1 ${
                  isYearly ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-green-500 text-xs font-bold block sm:inline">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border-0 ${plan.popular ? 'ring-2 ring-blue-500 relative transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 text-sm font-medium rounded-2xl shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4 pt-8">
                  <CardTitle className="text-xl sm:text-2xl font-semibold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-gray-600 text-sm sm:text-base">/mo</span>
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">{plan.originalPrice}/mo</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700 text-sm sm:text-base">
                        <div className="bg-green-100 rounded-full p-1 mr-3 flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 py-3">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-8">See FeatherBiz in Action</h2>
          <div className="relative bg-gradient-to-br from-gray-100 to-blue-100 rounded-3xl aspect-video flex items-center justify-center shadow-2xl overflow-hidden">
            <div className="text-center z-10">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <Video className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 text-base font-medium">Interactive Demo Video</p>
                <p className="text-sm text-gray-500 mt-2">Subtitle options in 6+ languages</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          </div>
          <Button className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto" size="lg">
            Create My Free Account
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-center mb-12">
            Loved by Service Pros Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 text-base leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.title}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-8">Integrates with Your Favorite Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-xl border border-gray-100 hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl flex items-center justify-center mb-3">
                  <span className="text-gray-600 font-medium text-sm lg:text-base">{integration}</span>
                </div>
                {index > 5 && (
                  <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">Coming Soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Start simplifying your business today
          </h2>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 text-lg px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto font-semibold"
            size="lg"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                  <Feather className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <span className="ml-3 text-lg sm:text-xl font-bold">FeatherBiz</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                By FX American Group with <Heart className="inline h-4 w-4 text-blue-500 animate-pulse" /> to empower small business heroes.
              </p>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">Social</h3>
              <div className="flex space-x-4">
                <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded-xl transition-all duration-300 hover:scale-110">
                  <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>
                <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded-xl transition-all duration-300 hover:scale-110">
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>
                <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded-xl transition-all duration-300 hover:scale-110">
                  <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>
                <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded-xl transition-all duration-300 hover:scale-110">
                  <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">Language</h3>
              <LanguageSelector />
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
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
