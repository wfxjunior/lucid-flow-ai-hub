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
      {/* Navigation - Simplified */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Minimalist */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Feather className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">FeatherBiz</span>
              </div>
            </div>

            {/* Desktop Navigation - Clean */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">Pricing</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">Reviews</a>
            </div>

            {/* CTA Buttons - Simplified */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageSelector />
              <ThemeToggle />
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600 font-medium"
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-200"
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
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/90 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-base font-medium rounded-md hover:bg-gray-50">Features</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-base font-medium rounded-md hover:bg-gray-50">Pricing</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-base font-medium rounded-md hover:bg-gray-50">How It Works</a>
                <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-base font-medium rounded-md hover:bg-gray-50">Reviews</a>
                <div className="border-t border-gray-100 pt-4 pb-3">
                  <div className="flex items-center space-x-3 px-3 mb-3">
                    <LanguageSelector />
                    <ThemeToggle />
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-600 hover:text-blue-600"
                      size="sm"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
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

      {/* Hero Section - Minimalist & Modern */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Business Management
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Your Business,
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
                The complete platform for service businesses. Invoicing, scheduling, CRM, and AI assistant working together seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                  size="lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  className="text-lg px-8 py-4 font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300 rounded-xl transition-all duration-200"
                  size="lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  14-day free trial
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  No credit card required
                </div>
              </div>
            </div>
            
            {/* Dashboard Preview - Modern Glass Effect */}
            <div className="relative lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="h-3 bg-blue-600 rounded-full w-24"></div>
                          <div className="h-2 bg-blue-400 rounded-full w-16 mt-2"></div>
                        </div>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-xl border border-green-200"></div>
                      <div className="h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl border border-purple-200"></div>
                      <div className="h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl border border-orange-200"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                      <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed specifically for service-based businesses
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature) => (
              <Card key={feature.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Simplified */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to transform your business operations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Keep existing implementation */}
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

      {/* Pricing Section - Clean Cards */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for your business
            </p>
          </div>
          
          {/* Pricing Toggle - Modern */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 rounded-xl p-1 flex border border-gray-200">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  !isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                  isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-green-500 px-1.5 py-0.5 rounded-full">
                  20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border rounded-2xl ${plan.popular ? 'ring-2 ring-blue-500 relative scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 text-sm font-bold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4 pt-8">
                  <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/mo</span>
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">{plan.originalPrice}/mo</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <div className="bg-green-100 rounded-full p-1 mr-3 flex-shrink-0 mt-1">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of service professionals who trust FeatherBiz
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-4 h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Start Free Trial
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-10 py-4 h-auto font-semibold rounded-xl transition-all duration-300"
              size="lg"
            >
              Book a Demo
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-blue-100 text-sm">
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              No setup fees
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Feather className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">FeatherBiz</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering small business heroes with intelligent business management solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Product</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Connect</h3>
              <div className="flex space-x-3 mb-6">
                <div className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300">
                  <Twitter className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300">
                  <Facebook className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300">
                  <Instagram className="h-5 w-5" />
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
