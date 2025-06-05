import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { AnimatedNumber } from "@/components/AnimatedNumber"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Check, ArrowRight, Users, Shield, Zap, TrendingUp, MessageSquare, Award, Feather, Play, ChevronRight, Building2, Globe, Smartphone, BarChart3, Clock, CheckCircle2, Menu, X, Sparkles, Crown, FileText, ClipboardList, UserCheck, Package } from "lucide-react"
import { useState } from "react"

const LandingPage = () => {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Users,
      title: "Customer Management",
      description: "Efficiently manage your clients with our comprehensive CRM system",
      highlight: "Complete CRM",
      benefits: ["Contact management", "Lead tracking", "Communication history"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
      highlight: "99.9% Uptime",
      benefits: ["Bank-level security", "Auto backups", "24/7 monitoring"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Leverage artificial intelligence to automate and optimize your workflow",
      highlight: "Integrated AI",
      benefits: ["Smart automation", "Predictive insights", "Voice commands"],
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Gain insights with powerful analytics and reporting tools",
      highlight: "Advanced Analytics",
      benefits: ["Real-time reports", "Custom dashboards", "Performance metrics"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: MessageSquare,
      title: "Voice Assistant",
      description: "Control your business with voice commands and AI assistance",
      highlight: "Voice Command",
      benefits: ["Hands-free control", "Natural language", "Smart responses"],
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Award,
      title: "Professional Tools",
      description: "Create invoices, contracts and documents with ease",
      highlight: "Pro Documents",
      benefits: ["Templates library", "E-signatures", "Auto generation"],
      color: "from-indigo-500 to-blue-500"
    }
  ]

  const smartTools = [
    {
      icon: FileText,
      title: "Smart Invoice",
      description: "Create professional invoices instantly with AI-powered templates, automatic calculations, and smart client data integration. Track payments, send reminders, and manage your cash flow effortlessly.",
      features: ["AI-powered templates", "Automatic calculations", "Payment tracking", "Custom branding"],
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50"
    },
    {
      icon: ClipboardList,
      title: "Smart To-Do Lists",
      description: "Organize your business tasks with intelligent prioritization, deadline tracking, and team collaboration. Never miss important deadlines with our AI-assisted task management.",
      features: ["Smart prioritization", "Team collaboration", "Deadline alerts", "Progress tracking"],
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: UserCheck,
      title: "CrewControl",
      description: "Manage your team efficiently with advanced employee tracking, payroll management, time sheets, and performance analytics. Keep your crew organized and productive.",
      features: ["Employee tracking", "Payroll management", "Time sheets", "Performance analytics"],
      gradient: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Package,
      title: "MatTrack",
      description: "Track your materials and inventory with real-time monitoring, low stock alerts, supplier management, and automated ordering. Never run out of essential supplies again.",
      features: ["Real-time tracking", "Low stock alerts", "Supplier management", "Automated ordering"],
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50"
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
            <div className="flex items-center min-w-0 flex-1 sm:flex-none">
              <div className="flex items-center min-w-0">
                <Feather className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 flex-shrink-0" />
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">FeatherBiz</h1>
              </div>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-500 hidden md:block whitespace-nowrap">AI-Powered Business Platform</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">Customers</a>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="ghost"
                className="text-gray-600 hover:text-blue-600 text-sm whitespace-nowrap"
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm whitespace-nowrap"
                size="sm"
              >
                Try It Free
              </Button>
              <div className="hidden lg:block">
                <UserGreeting />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex-shrink-0">
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
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">New: AI Assistant with Voice Commands</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight px-2 sm:px-0">
              Make Your Business
              <span className="text-blue-600 block">Smarter. Faster. Stronger.</span>
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              The only platform you need to manage customers, create documents,
              automate processes, and grow your business with the power of AI.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2 sm:px-0">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg h-11 sm:h-12 lg:h-14 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">Try Free for 14 Days</span>
              </Button>
              <Button 
                onClick={() => navigate('/admin')}
                variant="outline" 
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg h-11 sm:h-12 lg:h-14 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">Watch Live Demo</span>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-500 px-2 sm:px-0">
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">2-minute setup</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20 max-w-4xl mx-auto px-2 sm:px-0">
            <div className="text-center animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-2">
                <AnimatedNumber value={10000} suffix="+" delay={200} />
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">Active Businesses</div>
            </div>
            <div className="text-center animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-2">
                <AnimatedNumber value={99.9} decimals={1} suffix="%" delay={400} />
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">Uptime Guaranteed</div>
            </div>
            <div className="text-center animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-2">
                <AnimatedNumber value={4.9} decimals={1} suffix="★" delay={600} />
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Trusted by thousands of companies</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-center lg:items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12 opacity-60">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-center lg:justify-start space-x-2">
                <span className="text-lg sm:text-xl lg:text-2xl">{integration.logo}</span>
                <span className="font-medium text-gray-700 text-sm sm:text-base">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 xl:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white_50%,transparent_100%)]"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Everything Your Business Needs
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-tight">
              One Platform.
              <br className="hidden sm:block" />
              <span className="text-blue-600">Infinite Possibilities.</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stop juggling multiple tools. Our all-in-one platform gives you everything needed to 
              <span className="font-semibold text-blue-600"> grow, manage, and scale your business</span> like never before.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                onClick={() => navigate('/dashboard')}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg hover:border-blue-300 transition-all"
                onClick={() => navigate('/demo')}
              >
                <Zap className="w-5 h-5 mr-2" />
                See It In Action
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative"
              >
                {/* Feature Card */}
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 cursor-pointer h-full transform hover:-translate-y-2"
                     onClick={() => navigate('/dashboard')}>
                  
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                      {feature.highlight}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 text-base">
                    {feature.description}
                  </p>

                  {/* Benefits List */}
                  <div className="space-y-3 mb-6">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="font-semibold text-sm">Explore Feature</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                      Included
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Floating Number */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                  Join over 10,000+ businesses already using our platform to streamline operations and boost growth.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    onClick={() => navigate('/dashboard')}
                  >
                    Start Your Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg transition-all"
                    onClick={() => navigate('/contact')}
                  >
                    Talk to Sales
                  </Button>
                </div>
                <p className="text-blue-200 text-sm mt-6">
                  ✓ 14-day free trial ✓ No credit card required ✓ Setup in 2 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Tools Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Smart Business Tools
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 px-2 sm:px-0">
              Powerful Tools Built for Your Success
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Discover our specialized tools designed to streamline your business operations and boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {smartTools.map((tool, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-2xl transition-all duration-500 border-0 cursor-pointer overflow-hidden ${tool.bgColor} hover:scale-105`}
                onClick={() => navigate('/dashboard')}
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center mb-6">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <tool.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="ml-4">
                      <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-gray-900 group-hover:text-gray-700 transition-colors mb-2">
                        {tool.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <Zap className="w-4 h-4 mr-1" />
                        <span>AI-Enhanced</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {tool.description}
                  </CardDescription>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {tool.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="font-medium">Try it now</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                      Free Trial
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/dashboard')}
            >
              <Play className="w-5 h-5 mr-2" />
              Explore All Tools
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Start your free 14-day trial • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
              For Any Type of Business
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 px-2 sm:px-0">
              Whether you're a startup, enterprise, or freelancer, we have the ideal solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-gray-200 h-full">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <useCase.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl">{useCase.title}</CardTitle>
                  <div className="text-sm text-blue-600 font-medium">{useCase.metrics}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-sm sm:text-base lg:text-lg">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
              Loved by Thousands of Businesses
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 px-2 sm:px-0">
              See what our customers are saying about FeatherBiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-gray-200 h-full">
                <CardContent className="p-4 sm:p-6 lg:p-8 flex flex-col h-full">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-sm sm:text-base lg:text-lg leading-relaxed flex-grow">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm sm:text-base">{testimonial.avatar}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">{testimonial.role}</div>
                      <div className="text-xs text-blue-600 truncate">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
              Simple, transparent pricing
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto px-2 sm:px-0">
              Choose the plan that's right for your business. No hidden fees, no surprises.
            </p>
            <div className="inline-flex bg-gray-100 p-1 rounded-lg">
              <button className="px-4 sm:px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm transition-all">
                Monthly
              </button>
              <button className="px-4 sm:px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all">
                Annual (Save 17%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`
                  relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-2xl
                  ${plan.popular 
                    ? 'border-blue-500 ring-2 ring-blue-200 shadow-xl lg:scale-105 z-10' 
                    : 'border-gray-200 hover:border-gray-300 shadow-lg hover:scale-105'
                  }
                `}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-8">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}>
                      <plan.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{plan.price}</span>
                        {plan.period && (
                          <span className="text-base sm:text-lg text-gray-500 ml-1">{plan.period}</span>
                        )}
                      </div>
                      {plan.originalPrice && (
                        <div className="mt-2">
                          <span className="text-base sm:text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                          <span className="ml-2 text-xs sm:text-sm text-green-600 font-semibold">{plan.savings}</span>
                        </div>
                      )}
                    </div>

                    <Button 
                      className={`
                        w-full py-3 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105
                        ${plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                          : plan.price !== 'Free'
                            ? 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 border border-gray-300 shadow-md hover:shadow-lg'
                        }
                      `}
                      onClick={() => navigate('/dashboard')}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2">
                      What's included
                    </h4>
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                            <Check className="h-3 w-3 text-green-600 font-bold" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-lg border border-gray-200">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-base sm:text-lg font-semibold text-gray-900">30-day money-back guarantee</span>
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                All plans include SSL security, automatic backups, 99.9% uptime guarantee, and 24/7 support.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="whitespace-nowrap">No setup fees</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="whitespace-nowrap">Cancel anytime</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="whitespace-nowrap">24/7 support</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="whitespace-nowrap">Free migration</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">Need a custom plan for your enterprise?</p>
              <Button 
                variant="outline"
                onClick={() => navigate('/contact')}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-3"
              >
                Contact Sales
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 px-2 sm:px-0">
            Ready to Revolutionize Your Business?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-blue-100 mb-6 sm:mb-8 lg:mb-10 leading-relaxed px-2 sm:px-0">
            Join thousands of companies already using FeatherBiz to grow.
            Start for free today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg h-11 sm:h-12 lg:h-14 w-full sm:w-auto"
              onClick={() => navigate('/dashboard')}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">Start Free Now</span>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg h-11 sm:h-12 lg:h-14 w-full sm:w-auto"
              onClick={() => navigate('/contact')}
            >
              <span className="whitespace-nowrap">Schedule Demo</span>
            </Button>
          </div>
          <p className="text-blue-200 text-xs sm:text-sm mt-4 sm:mt-6 px-2 sm:px-0">
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
                <Feather className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">FeatherBiz</h3>
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
                The most advanced business management platform,
                powered by artificial intelligence to help your business grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 sm:space-y-0">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 justify-start sm:justify-center text-sm sm:text-base">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 justify-start sm:justify-center text-sm sm:text-base">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 justify-start sm:justify-center text-sm sm:text-base">
                  Facebook
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-white">Product</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-white">Support</h4>
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
              © 2025 FeatherBiz. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full lg:w-auto">
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
