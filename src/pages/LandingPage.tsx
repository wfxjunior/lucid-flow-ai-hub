
import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ThemeToggle } from "@/components/ThemeToggle"
import { TypingText } from "@/components/TypingText"
import { CharlieAssistant } from "@/components/CharlieAssistant"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Check, ArrowRight, Users, Shield, Zap, TrendingUp, MessageSquare, Award, Feather, Play, ChevronRight, Building2, Globe, Smartphone, BarChart3, Clock, CheckCircle2, Menu, X, Sparkles, Crown, FileText, ClipboardList, UserCheck, Package, Calendar, Mic, Bot, ChartBar, RefreshCw, Video, Instagram, Facebook, Youtube, Twitter, Heart } from "lucide-react"
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
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Feather className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FeatherBiz</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#support" className="text-gray-600 hover:text-blue-600 transition-colors">Support</a>
              <div className="flex items-center gap-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600"
                size="sm"
              >
                Log In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Features</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Pricing</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-blue-600">How It Works</a>
                <a href="#support" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Support</a>
                <div className="flex items-center gap-2 px-3 py-2">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-600 hover:text-blue-600"
                  size="sm"
                >
                  Log In
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
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                Simplify your entire business in one powerful platform
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Invoicing, Scheduling, CRM & Voice Assistant — multilingual & AI-ready
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4"
                  size="lg"
                >
                  Start for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-lg px-8 py-4 border border-gray-300"
                  size="lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Content - Dashboard Mockup */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-6 border">
                <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Dynamic Dashboard Preview</p>
                  </div>
                </div>
              </div>
              {/* Charlie floating in corner */}
              <div className="absolute -bottom-4 -right-4 bg-blue-600 rounded-full p-4 shadow-lg animate-pulse">
                <Bot className="h-8 w-8 text-white" />
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                  Hi! I'm Charlie. Ask me anything.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Everything your service business needs in one place
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuresData.map((feature) => (
              <Card key={feature.id} className="shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold">
                    <feature.icon className="mr-3 h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How FeatherBiz Works in 4 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <step.icon className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Choose the right plan for your business
          </h2>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-200 rounded-lg p-1 flex">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  !isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-green-600 text-xs font-bold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'ring-2 ring-blue-600 relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/mo</span>
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">{plan.originalPrice}/mo</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <Check className="mr-3 h-4 w-4 text-blue-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">See FeatherBiz in Action</h2>
          <div className="relative bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center">
              <Video className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Interactive Demo Video</p>
              <p className="text-sm text-gray-500 mt-2">Subtitle options in 6+ languages</p>
            </div>
          </div>
          <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4" size="lg">
            Create My Free Account
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Loved by Service Pros Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 inline-block mr-1 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-semibold">{testimonial.name}</div>
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
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Integrates with Your Favorite Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
                <div className="h-12 bg-gray-200 rounded flex items-center justify-center mb-2">
                  <span className="text-gray-600 font-medium">{integration}</span>
                </div>
                {index > 5 && (
                  <span className="text-xs text-blue-600 font-medium">Coming Soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Start simplifying your business today
          </h2>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            size="lg"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Feather className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">FeatherBiz</span>
              </div>
              <p className="text-gray-400 text-sm">
                Built by FX American Group with <Heart className="inline h-4 w-4 text-red-500 animate-pulse" /> to empower small business heroes.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <div className="flex space-x-4">
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Youtube className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Language</h3>
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
