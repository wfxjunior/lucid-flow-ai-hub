
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Feather className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">FeatherBiz</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Pricing</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">How It Works</a>
              <a href="#support" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Support</a>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-gray-900 font-medium"
                size="sm"
              >
                Log In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2"
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
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-base font-medium">Features</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-base font-medium">Pricing</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-base font-medium">How It Works</a>
                <a href="#support" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-base font-medium">Support</a>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center space-x-4 px-3">
                    <LanguageSelector />
                    <ThemeToggle />
                  </div>
                  <div className="mt-3 space-y-1">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-600 hover:text-gray-900"
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
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight">
              Your business,
              <br />
              <span className="text-blue-600">simplified</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The all-in-one platform for service businesses. Invoicing, scheduling, CRM, and AI assistant — all working together seamlessly.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 h-auto font-medium"
                size="lg"
              >
                Start for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-4 h-auto font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
                size="lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch demo
              </Button>
            </div>
            <div className="mt-8 text-sm text-gray-500">
              Free 14-day trial • No credit card required • Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Everything you need to run your business
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed specifically for service-based businesses
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature) => (
              <Card key={feature.id} className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Get started in minutes
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to transform your business operations
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that's right for your business
            </p>
          </div>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mt-8">
            <div className="bg-white rounded-lg p-1 flex border border-gray-200">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  !isYearly ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  isYearly ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-green-600 text-xs font-bold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 border-0 ${plan.popular ? 'ring-2 ring-blue-600 relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4 pt-8">
                  <CardTitle className="text-2xl font-semibold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/mo</span>
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">{plan.originalPrice}/mo</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <div className="bg-green-100 rounded-full p-1 mr-3 flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Trusted by service professionals worldwide
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 border-0">
                <CardContent className="pt-6">
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
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

      {/* Final CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Ready to transform your business?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of service professionals who trust FeatherBiz
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="mt-8 bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto font-medium"
            size="lg"
          >
            Start your free trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Feather className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">FeatherBiz</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Empowering small business heroes with intelligent business management solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li><a href="#features" className="hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <Twitter className="h-4 w-4 text-gray-600" />
                </div>
                <div className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <Facebook className="h-4 w-4 text-gray-600" />
                </div>
                <div className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <Instagram className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              <div className="mt-4">
                <LanguageSelector />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
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
