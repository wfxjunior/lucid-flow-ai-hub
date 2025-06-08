
import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ThemeToggle } from "@/components/ThemeToggle"
import { TypingText } from "@/components/TypingText"
import { CharlieAssistant } from "@/components/CharlieAssistant"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Check, ArrowRight, Users, Shield, Zap, TrendingUp, MessageSquare, Award, Feather, Play, ChevronRight, Building2, Globe, Smartphone, BarChart3, Clock, CheckCircle2, Menu, X, Sparkles, Crown, FileText, ClipboardList, UserCheck, Package, Calendar, Mic, Bot, ChartBar, RefreshCw, Video, Instagram, Facebook, Youtube, Twitter, Heart, Smile, ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"

const LandingPage = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isYearly, setIsYearly] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const featuresData = [
    {
      id: 1,
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated scheduling with AI-powered optimization and conflict resolution.",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      icon: FileText,
      title: "Automated Invoicing",
      description: "Generate professional invoices instantly with smart templates and automation.",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      icon: Users,
      title: "CRM with Tags & Groups",
      description: "Organize clients with smart tagging, grouping, and relationship management.",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      icon: Bot,
      title: "AI Voice Assistant (Charlie)",
      description: "Your multilingual AI assistant for voice commands and business automation.",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600"
    },
    {
      id: 5,
      icon: ChartBar,
      title: "Visual Reports & Analytics",
      description: "Beautiful insights and reports to track your business performance.",
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-600"
    },
    {
      id: 6,
      icon: RefreshCw,
      title: "Mobile & Web Sync",
      description: "Seamless synchronization across all your devices and platforms.",
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600"
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
      avatar: "MR"
    },
    {
      id: 2,
      name: "João Silva",
      title: "Electrical Contractor",
      location: "São Paulo, BR 🇧🇷",
      quote: "A FeatherBiz revolucionou meu negócio. O Charlie é incrível!",
      rating: 5,
      avatar: "JS"
    },
    {
      id: 3,
      name: "Hans Mueller",
      title: "HVAC Services",
      location: "Berlin, DE 🇩🇪",
      quote: "Perfekt für mein kleines Unternehmen. Charlie versteht Deutsch perfekt!",
      rating: 5,
      avatar: "HM"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      title: "Cleaning Pro",
      location: "Toronto, CA 🇨🇦",
      quote: "FeatherBiz changed how I run my business. Everything is so much easier now!",
      rating: 5,
      avatar: "SJ"
    },
    {
      id: 5,
      name: "Pierre Dubois",
      title: "Landscaping Services",
      location: "Paris, FR 🇫🇷",
      quote: "Incroyable! Charlie comprend parfaitement le français. Merci FeatherBiz!",
      rating: 5,
      avatar: "PD"
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Feather className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-black text-gray-900 tracking-tight">FeatherBiz</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 text-sm font-semibold transition-all duration-200 hover:scale-105">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 text-sm font-semibold transition-all duration-200 hover:scale-105">Pricing</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 text-sm font-semibold transition-all duration-200 hover:scale-105">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 text-sm font-semibold transition-all duration-200 hover:scale-105">Reviews</a>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600 font-semibold transition-all duration-200"
                size="sm"
              >
                Log In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-xl"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-3 text-gray-600 hover:text-blue-600 text-base font-semibold rounded-xl hover:bg-gray-50 transition-all">Features</a>
                <a href="#pricing" className="block px-3 py-3 text-gray-600 hover:text-blue-600 text-base font-semibold rounded-xl hover:bg-gray-50 transition-all">Pricing</a>
                <a href="#how-it-works" className="block px-3 py-3 text-gray-600 hover:text-blue-600 text-base font-semibold rounded-xl hover:bg-gray-50 transition-all">How It Works</a>
                <a href="#testimonials" className="block px-3 py-3 text-gray-600 hover:text-blue-600 text-base font-semibold rounded-xl hover:bg-gray-50 transition-all">Reviews</a>
                <div className="border-t border-gray-100 pt-4 pb-3">
                  <div className="flex items-center space-x-4 px-3 mb-3">
                    <LanguageSelector />
                    <ThemeToggle />
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-600 hover:text-blue-600 rounded-xl"
                      size="sm"
                    >
                      Log In
                    </Button>
                    <Button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                      size="sm"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 sm:pt-32 sm:pb-40 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Ccircle cx=\"2\" cy=\"2\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 tracking-tight leading-tight mb-8">
                YOUR BUSINESS,
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-pulse">
                  SIMPLIFIED
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl leading-relaxed font-medium mb-12">
                The all-in-one platform for service businesses. Invoicing, scheduling, CRM, and AI assistant — all working together seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-10">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-12 py-6 h-auto font-black rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  Start for free
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button 
                  variant="outline" 
                  className="text-xl px-12 py-6 h-auto font-bold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300 rounded-2xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Watch demo
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Free 14-day trial
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  No credit card required
                </div>
              </div>
            </div>
            
            {/* Dashboard Mockup */}
            <div className="relative lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl"></div>
                        <div>
                          <div className="h-4 bg-blue-600 rounded w-24"></div>
                          <div className="h-3 bg-blue-400 rounded w-20 mt-2"></div>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl"></div>
                      <div className="h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl"></div>
                      <div className="h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-6">
              EVERYTHING YOU NEED TO RUN YOUR BUSINESS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-semibold">
              Powerful features designed specifically for service-based businesses
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature) => (
              <Card key={feature.id} className={`${feature.color} border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-3xl group cursor-pointer backdrop-blur-sm bg-white/80`}>
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed font-semibold">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-6">
              GET STARTED IN MINUTES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-semibold">
              Four simple steps to transform your business operations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-black shadow-xl">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed font-semibold">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-6">
              TRUSTED BY SERVICE PROFESSIONALS WORLDWIDE
            </h2>
            <p className="text-xl text-gray-600 font-semibold">
              Join thousands who transformed their business with FeatherBiz
            </p>
          </div>
          
          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white/60 backdrop-blur-sm p-8 shadow-2xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <Card className="bg-white shadow-2xl border-0 rounded-3xl max-w-2xl mx-auto">
                      <CardContent className="pt-8 pb-8 text-center">
                        <div className="mb-6 flex justify-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-xl text-gray-700 italic mb-8 leading-relaxed font-semibold">"{testimonial.quote}"</p>
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4 text-white font-black text-lg">
                            {testimonial.avatar}
                          </div>
                          <div className="text-left">
                            <div className="font-black text-gray-900 text-lg">{testimonial.name}</div>
                            <div className="text-blue-600 font-semibold">{testimonial.title}</div>
                            <div className="text-gray-500 text-sm">{testimonial.location}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full border-2 border-blue-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-400 shadow-xl"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full border-2 border-blue-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-400 shadow-xl"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-6">
              SIMPLE, TRANSPARENT PRICING
            </h2>
            <p className="text-xl text-gray-600 font-semibold">
              Choose the plan that's right for your business
            </p>
          </div>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 rounded-2xl p-2 flex border-2 border-gray-200 shadow-xl">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-8 py-4 rounded-xl text-sm font-black transition-all duration-200 ${
                  !isYearly ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-8 py-4 rounded-xl text-sm font-black transition-all duration-200 relative ${
                  isYearly ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 text-xs font-black text-white bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0 rounded-3xl ${plan.popular ? 'ring-4 ring-blue-500/50 relative transform scale-105' : 'border-2 border-gray-100'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-black rounded-full shadow-xl">
                      🔥 Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4 pt-8">
                  <CardTitle className="text-2xl font-black text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 font-semibold">/mo</span>
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-500 line-through font-semibold">{plan.originalPrice}/mo</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <div className="bg-green-100 rounded-full p-1 mr-3 flex-shrink-0 mt-1">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full font-black py-4 rounded-2xl transition-all duration-200 hover:scale-105 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl animate-pulse' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"2\" cy=\"2\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8">
            READY TO SIMPLIFY YOUR BUSINESS TODAY?
          </h2>
          <p className="text-xl text-blue-100 font-semibold mb-12">
            Join thousands of service professionals who trust FeatherBiz to run their business
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-6 h-auto font-black rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105"
              size="lg"
            >
              Start for Free
              <Sparkles className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-xl px-12 py-6 h-auto font-black rounded-2xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              Book a Demo
              <Calendar className="ml-3 h-6 w-6" />
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-blue-100 text-sm">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              No setup fees
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Feather className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-black">FeatherBiz</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-semibold">
                Empowering small business heroes with intelligent business management solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-black text-white mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors font-semibold">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-semibold">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-semibold">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-semibold">Help</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-black text-white mb-6">Product</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors font-semibold">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors font-semibold">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-semibold">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-semibold">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-black text-white mb-6">Connect</h3>
              <div className="flex space-x-4 mb-6">
                <div className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <Twitter className="h-6 w-6" />
                </div>
                <div className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <Facebook className="h-6 w-6" />
                </div>
                <div className="w-12 h-12 bg-gray-800 hover:bg-pink-600 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <Instagram className="h-6 w-6" />
                </div>
              </div>
              <div>
                <LanguageSelector />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
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
