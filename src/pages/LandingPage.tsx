import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { AnimatedNumber } from "@/components/AnimatedNumber"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Check, ArrowRight, Users, Shield, Zap, TrendingUp, MessageSquare, Award, Feather, Play, ChevronRight, Building2, Globe, Smartphone, BarChart3, Clock, CheckCircle2, Menu, X, Sparkles, Crown } from "lucide-react"
import { useState } from "react"

const LandingPage = () => {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Users,
      title: "Customer Management",
      description: "Efficiently manage your clients with our comprehensive CRM system",
      highlight: "Complete CRM"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
      highlight: "99.9% Uptime"
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Leverage artificial intelligence to automate and optimize your workflow",
      highlight: "Integrated AI"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Gain insights with powerful analytics and reporting tools",
      highlight: "Advanced Analytics"
    },
    {
      icon: MessageSquare,
      title: "Voice Assistant",
      description: "Control your business with voice commands and AI assistance",
      highlight: "Voice Command"
    },
    {
      icon: Award,
      title: "Professional Tools",
      description: "Create invoices, contracts and documents with ease",
      highlight: "Pro Documents"
    }
  ]

  const useCases = [
    {
      icon: Building2,
      title: "Enterprises",
      description: "Manage complex operations with enterprise tools",
      metrics: "500+ companies"
    },
    {
      icon: Users,
      title: "Startups",
      description: "Scale quickly with intelligent automation",
      metrics: "1000+ startups"
    },
    {
      icon: Globe,
      title: "Freelancers",
      description: "Organize projects and clients in one place",
      metrics: "5000+ freelancers"
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "CEO, TechStart",
      content: "FeatherBiz transformed our business operations. The AI features have saved us countless hours every week.",
      rating: 5,
      company: "TechStart",
      avatar: "MS"
    },
    {
      name: "John Santos",
      role: "Freelancer",
      content: "Finally, a platform that understands small business needs. The invoice system is amazing!",
      rating: 5,
      company: "Independent",
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Business Owner",
      content: "The voice assistant feature is revolutionary. I can manage everything hands-free while working.",
      rating: 5,
      company: "Costa & Co",
      avatar: "AC"
    }
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      originalPrice: null,
      period: "",
      description: "Perfect to get started",
      features: ["Up to 10 clients", "Basic invoicing", "Email support", "Mobile app access", "Basic templates"],
      cta: "Start Free",
      popular: false,
      icon: Zap,
      gradient: "from-slate-500 to-slate-700",
      bgGradient: "from-slate-50/50 to-slate-100/50",
      badge: null,
      savings: null
    },
    {
      name: "Professional",
      price: "$29",
      originalPrice: null,
      period: "/month",
      description: "For growing businesses",
      features: ["Unlimited clients", "AI voice assistant", "Advanced analytics", "Priority support", "Custom branding", "E-signatures", "Document tracking", "All integrations"],
      cta: "Start Free Trial",
      popular: true,
      icon: Crown,
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-50/50 to-purple-50/50",
      badge: "Most Popular",
      savings: null
    },
    {
      name: "Business Pro",
      price: "$290",
      originalPrice: "$348",
      period: "/year",
      description: "Best value - Save 17%!",
      features: ["Everything in Professional", "2 months FREE", "Advanced AI features", "White-label options", "Custom integrations", "Dedicated support", "Early access to features", "Business consultation"],
      cta: "Go Annual",
      popular: false,
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50/50 to-pink-50/50",
      badge: "Best Value",
      savings: "Save $58/year"
    }
  ]

  const integrations = [
    { name: "Stripe", logo: "💳" },
    { name: "WhatsApp", logo: "💬" },
    { name: "Gmail", logo: "📧" },
    { name: "Slack", logo: "💼" },
    { name: "Zoom", logo: "📹" },
    { name: "Dropbox", logo: "📁" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Feather className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2" />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FeatherBiz</h1>
              </div>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-500 hidden md:block">AI-Powered Business Platform</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Customers</a>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3">
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="ghost"
                className="text-gray-600 hover:text-blue-600 text-sm"
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                size="sm"
              >
                Try It Free
              </Button>
              <div className="hidden lg:block">
                <UserGreeting />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 py-4 space-y-4">
              <nav className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1">Customers</a>
              </nav>
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="ghost"
                  className="text-gray-600 hover:text-blue-600 justify-start"
                  size="sm"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
                  size="sm"
                >
                  Try It Free
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              New: AI Assistant with Voice Commands
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Make Your Business
              <span className="text-blue-600 block">Smarter. Faster. Stronger.</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              The only platform you need to manage customers, create documents,
              automate processes, and grow your business with the power of AI.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-14 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Try Free for 14 Days
              </Button>
              <Button 
                onClick={() => navigate('/admin')}
                variant="outline" 
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-14 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Watch Live Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 px-4 sm:px-0">
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                2-minute setup
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20 max-w-4xl mx-auto px-4 sm:px-0">
            <div className="text-center animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                <AnimatedNumber value={10000} suffix="+" delay={200} />
              </div>
              <div className="text-sm sm:text-base text-gray-600">Active Businesses</div>
            </div>
            <div className="text-center animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                <AnimatedNumber value={99.9} decimals={1} suffix="%" delay={400} />
              </div>
              <div className="text-sm sm:text-base text-gray-600">Uptime Guaranteed</div>
            </div>
            <div className="text-center animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                <AnimatedNumber value={4.9} decimals={1} suffix="★" delay={600} />
              </div>
              <div className="text-sm sm:text-base text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Trusted by thousands of companies</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-center lg:items-center gap-6 sm:gap-8 lg:gap-12 opacity-60">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-center lg:justify-start space-x-2">
                <span className="text-xl sm:text-2xl">{integration.logo}</span>
                <span className="font-medium text-gray-700 text-sm sm:text-base">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Everything You Need in One Platform
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              From customer management to AI automation, have all the tools
              necessary to make your business thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-200 cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  <CardTitle className="text-lg sm:text-xl group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </CardDescription>
                  <div className="flex items-center mt-4 text-blue-600 group-hover:text-blue-700">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              For Any Type of Business
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 sm:px-0">
              Whether you're a startup, enterprise, or freelancer, we have the ideal solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-gray-200">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <useCase.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl">{useCase.title}</CardTitle>
                  <div className="text-sm text-blue-600 font-medium">{useCase.metrics}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base sm:text-lg">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Loved by Thousands of Businesses
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 sm:px-0">
              See what our customers are saying about FeatherBiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-base sm:text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <span className="text-blue-600 font-bold text-sm sm:text-base">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-xs text-blue-600">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6">
              <Crown className="w-4 h-4 mr-2" />
              Simple and Transparent Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6">
              Choose Your Perfect Plan
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0 max-w-3xl mx-auto">
              Start free and scale as you grow. All plans include our powerful AI tools.
            </p>
            <div className="inline-flex bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-gray-200 shadow-lg">
              <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md transition-all">
                Monthly
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Annual (Save 17%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative group transition-all duration-500 hover:scale-105 ${
                  plan.popular ? 'lg:scale-110 lg:z-10' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`
                      px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white shadow-xl
                      ${plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600'
                      }
                    `}>
                      ⭐ {plan.badge}
                    </div>
                  </div>
                )}
                
                <Card className={`
                  relative h-full overflow-hidden border-0 shadow-xl backdrop-blur-sm
                  bg-gradient-to-br ${plan.bgGradient} bg-white/80
                  ${plan.popular ? 'ring-2 ring-blue-400 ring-opacity-60 shadow-blue-200/50' : 'shadow-gray-200/50'}
                  group-hover:shadow-2xl transition-all duration-500
                  before:absolute before:inset-0 before:bg-gradient-to-br before:${plan.gradient} before:opacity-0 before:transition-opacity before:duration-500
                  hover:before:opacity-5
                `}>
                  <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-10">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${plan.gradient} transform rotate-45`}></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-16 sm:h-20 opacity-5">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${plan.gradient}`}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <CardHeader className="text-center pb-4 sm:pb-6 pt-8 sm:pt-10">
                      <div className={`
                        w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl 
                        bg-gradient-to-br ${plan.gradient} 
                        flex items-center justify-center 
                        shadow-lg group-hover:scale-110 transition-transform duration-300
                        ring-4 ring-white/20
                      `}>
                        <plan.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      
                      <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                        {plan.description}
                      </CardDescription>
                      
                      <div className="mb-6 sm:mb-8">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <span className="text-4xl sm:text-5xl font-bold text-gray-900">{plan.price}</span>
                          <div className="text-left">
                            <span className="text-gray-500 text-base sm:text-lg">{plan.period}</span>
                            {plan.originalPrice && (
                              <div className="text-sm text-red-500 line-through font-medium">
                                {plan.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>
                        {plan.savings && (
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs sm:text-sm font-medium">
                            💰 {plan.savings}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
                      <Button 
                        className={`
                          w-full py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg
                          ${plan.popular 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-xl hover:scale-105' 
                            : plan.price !== 'Free'
                              ? 'bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white hover:shadow-xl'
                              : 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md'
                          }
                        `}
                        onClick={() => navigate('/dashboard')}
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      
                      <div className="space-y-4 sm:space-y-5">
                        <div className="text-center">
                          <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            What's Included
                          </span>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-white font-bold" />
                              </div>
                              <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl border border-white/50">
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  30-Day Money-Back Guarantee
                </span>
              </div>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                All plans include SSL security, automatic backups, 99.9% uptime guarantee, and dedicated contractor support.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>24/7 support</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Free migration</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-12">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">Need something custom?</p>
              <Button 
                variant="outline"
                onClick={() => navigate('/contact')}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-2 sm:py-3"
              >
                Talk to Sales
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Revolutionize Your Business?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 sm:mb-10 leading-relaxed">
            Join thousands of companies already using FeatherBiz to grow.
            Start for free today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-14 w-full sm:w-auto"
              onClick={() => navigate('/dashboard')}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Start Free Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-14 w-full sm:w-auto"
              onClick={() => navigate('/contact')}
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-blue-200 text-xs sm:text-sm mt-4 sm:mt-6">
            ✓ Free 14-day trial ✓ No credit card required ✓ 24/7 support
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4 sm:mb-6">
                <Feather className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mr-2 sm:mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">FeatherBiz</h3>
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
                The most advanced business management platform,
                powered by artificial intelligence to help your business grow.
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 justify-start sm:justify-center">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 justify-start sm:justify-center">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 justify-start sm:justify-center">
                  Facebook
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-white">Product</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-white">Support</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto text-sm sm:text-base justify-start" onClick={() => navigate('/faq')}>FAQ</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto text-sm sm:text-base justify-start" onClick={() => navigate('/contact')}>Contact</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto text-sm sm:text-base justify-start" onClick={() => navigate('/feedback')}>Feedback</Button></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Documentation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center lg:text-left">
              © 2024 FeatherBiz. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-full sm:w-48">
                <LanguageSelector />
              </div>
              <div className="flex items-center space-x-4 sm:space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
