
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Brain, 
  FileText, 
  Users, 
  BarChart3, 
  Shield, 
  Zap, 
  MessageSquare,
  CheckCircle,
  Star,
  Play,
  Receipt,
  Calendar,
  Wrench,
  Feather
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AnimatedNumber } from "@/components/AnimatedNumber"
import { StatsCard } from "@/components/StatsCard"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useLanguage } from "@/contexts/LanguageContext"

const LandingPage = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const features = [
    {
      icon: Brain,
      title: t("landing.features.aiVoice.title"),
      description: t("landing.features.aiVoice.description")
    },
    {
      icon: FileText,
      title: t("landing.features.smartInvoicing.title"),
      description: t("landing.features.smartInvoicing.description")
    },
    {
      icon: Users,
      title: t("landing.features.customerManagement.title"),
      description: t("landing.features.customerManagement.description")
    },
    {
      icon: BarChart3,
      title: t("landing.features.analytics.title"),
      description: t("landing.features.analytics.description")
    },
    {
      icon: Shield,
      title: t("landing.features.security.title"),
      description: t("landing.features.security.description")
    },
    {
      icon: Zap,
      title: t("landing.features.automation.title"),
      description: t("landing.features.automation.description")
    },
    {
      icon: Receipt,
      title: t("landing.features.receipts.title"),
      description: t("landing.features.receipts.description")
    },
    {
      icon: Calendar,
      title: t("landing.features.appointments.title"),
      description: t("landing.features.appointments.description")
    },
    {
      icon: Wrench,
      title: t("landing.features.workOrders.title"),
      description: t("landing.features.workOrders.description")
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content: "FeatherBiz transformed how I manage my business. The AI assistant saves me hours every week.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Consultant",
      content: "The invoice tracking feature is incredible. I know exactly when clients view my proposals.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Marketing Agency Owner",
      content: "Finally, a business platform that actually understands what entrepreneurs need.",
      rating: 5
    }
  ]

  const statsData = [
    {
      title: "Active Users",
      value: "10K+",
      change: "+25% this month",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Invoices Created",
      value: "1M+",
      change: "+15% this month",
      changeType: "positive" as const,
      icon: FileText
    },
    {
      title: "Uptime",
      value: "99.9%",
      change: "Consistent",
      changeType: "neutral" as const,
      icon: Shield
    },
    {
      title: "AI Assistant",
      value: "24/7",
      change: "Always Available",
      changeType: "positive" as const,
      icon: Brain
    },
    {
      title: "User Reviews",
      value: "4.9⭐",
      change: "+0.2 this month",
      changeType: "positive" as const,
      icon: Star
    }
  ]

  const handleWatchDemo = () => {
    // For now, we'll show an alert. You can replace this with a modal or video player later
    alert("Demo video coming soon! For now, try the free dashboard to explore all features.")
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Feather className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">FeatherBiz</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">Testimonials</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-48">
              <LanguageSelector />
            </div>
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 animate-fade-in" variant="secondary">
          🚀 {t("landing.tagline")}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent animate-slide-up">
          {t("landing.title")}
          <br />
          <span className="text-primary">{t("landing.titleHighlight")}</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {t("landing.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/dashboard')}>
            {t("landing.tryFree")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={handleWatchDemo}>
            <Play className="mr-2 h-5 w-5" />
            {t("landing.watchDemo")}
          </Button>
        </div>
        
        {/* Hero Image/Video Placeholder */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-lg border border-primary/20 flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.7s' }}>
            <div className="text-center">
              <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-gray-600">AI-Powered Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            {t("landing.everythingTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t("landing.everythingSubtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {statsData.map((stat, index) => (
              <StatsCard 
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            {t("landing.lovedTitle")}
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t("landing.lovedSubtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm animate-fade-in hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-scale-in" style={{ animationDelay: `${(index * 0.2) + (i * 0.1)}s` }} />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            {t("landing.ctaTitle")}
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t("landing.ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={() => navigate('/dashboard')}>
              {t("landing.startTrial")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              <MessageSquare className="mr-2 h-5 w-5" />
              {t("landing.contactSales")}
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {t("landing.ctaFooter")}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Feather className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">FeatherBiz</span>
              </div>
              <p className="text-gray-400">
                The AI-powered business platform for modern entrepreneurs.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><button onClick={() => navigate('/feedback')} className="hover:text-white transition-colors text-left">Feedback</button></li>
              </ul>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors text-left">Feature Requests</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p>&copy; 2025 FeatherBiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
