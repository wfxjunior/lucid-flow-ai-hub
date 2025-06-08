
import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { TypingText } from "@/components/TypingText"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Check, ArrowRight, Users, Shield, Zap, TrendingUp, MessageSquare, Award, Feather, Play, ChevronRight, Building2, Globe, Smartphone, BarChart3, Clock, CheckCircle2, Menu, X, Sparkles, Crown, FileText, ClipboardList, UserCheck, Package, Calculator, Calendar, DollarSign, PieChart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { useState } from "react"

const LandingPage = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const featuresData = [
    {
      id: 1,
      icon: Calculator,
      title: "Send Professional Estimates",
      description: "Lead your quotes with clarity and speed",
    },
    {
      id: 2,
      icon: Calendar,
      title: "Schedule Jobs with Ease",
      description: "Assign and organize tasks automatically",
    },
    {
      id: 3,
      icon: DollarSign,
      title: "Track Invoices & Payments",
      description: "Monitor billing in real time",
    },
  ]

  const pricingPlans = [
    {
      id: 1,
      name: "Basic",
      price: "$19",
      period: "/month",
      features: ["Manage clients & projects", "Send Invoices", "Basic reporting", "Email support"],
      recommended: false
    },
    {
      id: 2,
      name: "Pro",
      price: "$49",
      period: "/month",
      features: ["Automated reminders", "Advanced reporting", "Priority support", "Custom branding", "API access"],
      recommended: true
    },
    {
      id: 3,
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Custom solutions", "Dedicated support", "Unlimited everything", "Advanced security", "White-label"],
      recommended: false
    },
  ]

  const workflowSteps = [
    {
      id: 1,
      title: "Add Clients",
      description: "Import or manually add your client information to build your customer database.",
      icon: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "Create Estimates",
      description: "Generate professional estimates with our intelligent pricing and template system.",
      icon: FileText,
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      title: "Manage Projects",
      description: "Track project progress, deadlines, and communicate with your team in real-time.",
      icon: ClipboardList,
      color: "bg-purple-100 text-purple-600"
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "CEO, Design Studio Pro",
      quote: "This platform has transformed how we manage our client relationships and projects. The automation features alone have saved us 20+ hours per week.",
      avatar: "SJ",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Founder, Tech Solutions Inc",
      quote: "The analytics dashboard gives us insights we never had before. We've increased our profit margins by 35% using the data-driven recommendations.",
      avatar: "MC",
      rating: 5
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Feather className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">FeatherBiz</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#features" className="text-sm lg:text-base text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-sm lg:text-base text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/contact" className="text-sm lg:text-base text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600 text-sm lg:text-base"
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base px-3 lg:px-4"
                size="sm"
              >
                Try It Free
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-base">Features</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-base">Pricing</a>
                <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600 text-base">Contact</a>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-600 hover:text-blue-600 text-base"
                  size="sm"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white text-base"
                  size="sm"
                >
                  Try It Free
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Streamline Your Business
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                All-in-one platform to manage clients, projects, and payments.
              </p>
              <div className="mb-6 sm:mb-8">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg w-full sm:w-auto"
                  size="lg"
                >
                  Get Started
                </Button>
                <p className="text-sm text-gray-500 mt-3 sm:mt-4">Free 14-day trial. No credit card required</p>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl max-w-md mx-auto lg:max-w-none">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                  {/* Mock Dashboard */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-400">Dashboard</div>
                  </div>
                  
                  {/* Chart mockup */}
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-end space-x-1 sm:space-x-2 h-12 sm:h-16 lg:h-20">
                      <div className="bg-blue-500 rounded-t w-3 sm:w-4 h-8 sm:h-12"></div>
                      <div className="bg-blue-400 rounded-t w-3 sm:w-4 h-5 sm:h-8"></div>
                      <div className="bg-blue-600 rounded-t w-3 sm:w-4 h-10 sm:h-16"></div>
                      <div className="bg-blue-500 rounded-t w-3 sm:w-4 h-6 sm:h-10"></div>
                      <div className="bg-blue-700 rounded-t w-3 sm:w-4 h-12 sm:h-20"></div>
                      <div className="bg-blue-600 rounded-t w-3 sm:w-4 h-9 sm:h-14"></div>
                    </div>
                  </div>
                  
                  {/* Checklist mockup */}
                  <div className="space-y-1 sm:space-y-2">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                        </div>
                        <div className="h-1.5 sm:h-2 bg-gray-200 rounded flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Character illustration */}
                <div className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-white text-lg sm:text-xl lg:text-2xl">👩‍💼</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Features</h2>
            <p className="text-base sm:text-lg text-gray-600">Everything you need to run your business efficiently</p>
          </div>
          
          {/* 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Feature Cards */}
            <div className="space-y-4 sm:space-y-6">
              {featuresData.map((feature) => (
                <div 
                  key={feature.id} 
                  className="group relative rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Gradient accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl sm:rounded-t-2xl"></div>
                  
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative corner element */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Chart Graphic */}
            <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 max-w-sm sm:max-w-md w-full relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
                
                {/* Chart Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6 relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Performance Overview</h3>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-base sm:text-lg font-bold">👤</span>
                  </div>
                </div>
                
                {/* Chart Area */}
                <div className="relative h-40 sm:h-52 mb-6 sm:mb-8">
                  <svg className="w-full h-full" viewBox="0 0 300 150">
                    {/* Grid Lines */}
                    <defs>
                      <pattern id="grid" width="30" height="15" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 15" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                      </pattern>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6"/>
                        <stop offset="100%" stopColor="#1E40AF"/>
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Main Chart Line */}
                    <path
                      d="M 20 120 Q 60 100 80 75 T 140 55 T 200 35 T 280 15"
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    
                    {/* Chart Area Fill */}
                    <path
                      d="M 20 120 Q 60 100 80 75 T 140 55 T 200 35 T 280 15 L 280 150 L 20 150 Z"
                      fill="url(#areaGradient)"
                    />
                    
                    {/* Data Points */}
                    <circle cx="80" cy="75" r="5" fill="#3B82F6" className="drop-shadow-lg"/>
                    <circle cx="140" cy="55" r="5" fill="#3B82F6" className="drop-shadow-lg"/>
                    <circle cx="200" cy="35" r="5" fill="#3B82F6" className="drop-shadow-lg"/>
                    <circle cx="280" cy="15" r="5" fill="#3B82F6" className="drop-shadow-lg"/>
                  </svg>
                </div>

                {/* Chart Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center relative z-10">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">127%</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Growth</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1">+$45k</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Revenue</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">98%</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
              See Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg text-gray-600">Simple steps to get your business organized</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="text-center relative">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                  <step.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
                
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 sm:top-8 left-full w-full">
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Simple, Transparent Pricing</h2>
            <p className="text-base sm:text-lg text-gray-600">Choose the plan that works best for your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.recommended ? 'border-blue-500 border-2 shadow-xl' : 'shadow-lg'}`}>
                {plan.recommended && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-3 sm:mt-4">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-sm sm:text-base text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm sm:text-base text-gray-700">
                        <Check className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full text-sm sm:text-base ${plan.recommended ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                    onClick={() => navigate('/dashboard')}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">What Our Clients Say</h2>
            <p className="text-base sm:text-lg text-gray-600">Join thousands of satisfied business owners</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-xl border-0">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg mr-3 sm:mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                      <div className="text-gray-600 text-xs sm:text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Ready to Streamline Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Join thousands of successful businesses using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              size="lg"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              size="lg"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-blue-200 mt-3 sm:mt-4 text-xs sm:text-sm">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <Feather className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                <span className="ml-2 text-lg sm:text-xl font-bold">FeatherBiz</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Streamline your business operations with our all-in-one platform for managing clients, projects, and payments.
              </p>
              <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Pricing
                  </a>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-gray-400 hover:text-white transition-colors text-sm p-0 h-auto font-normal"
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </Button>
                </li>
                <li>
                  <a href="/integrations" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info & Language */}
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold">Contact & Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                  <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">support@featherbiz.com</span>
                </div>
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                  <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                  <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">San Francisco, CA</span>
                </div>
                <div className="pt-2 space-y-3">
                  <div className="flex justify-center sm:justify-start">
                    <LanguageSelector />
                  </div>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 w-full sm:w-auto"
                    size="sm"
                  >
                    Get Started Free
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-400 text-center md:text-left">
                &copy; {new Date().getFullYear()} FeatherBiz. All rights reserved.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
