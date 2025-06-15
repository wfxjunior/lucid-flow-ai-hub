import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { AnimatedNumber } from "@/components/AnimatedNumber"
import { PricingPlans } from "@/components/PricingPlans"
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import {
  Zap, Shield, Users, Briefcase, BarChart3, Clock, CheckSquare,
  Star, ArrowRight, Play, Check, FileText, UserCheck, Package,
  Car, Calendar, Video, ClipboardList, Calculator, Instagram,
  Facebook, Twitter, Linkedin, Youtube, Crown, Feather, HelpCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useLanguage } from "@/contexts/LanguageContext"
import { SidebarProvider, useSidebar, SidebarTrigger } from "@/components/ui/sidebar"
import { LandingSidebar } from "@/components/LandingSidebar"
import { HelpCenter } from "@/components/HelpCenter"

export default function LandingPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  const dashboardImages = [
    {
      src: "/lovable-uploads/0e5059d6-0019-4810-aa5e-28488bd3ebfe.png",
      alt: "Invoice Management Dashboard",
      title: "Invoice Management"
    },
    {
      src: "/lovable-uploads/94a8f69c-f543-4b11-9bf7-8a3bb6f92f0f.png", 
      alt: "Task Management Dashboard",
      title: "Task Management"
    },
    {
      src: "/lovable-uploads/d0136229-21fd-4d10-bf06-8b0bcd905d73.png",
      alt: "Quick Actions Dashboard", 
      title: "Quick Actions"
    },
    {
      src: "/lovable-uploads/8ce55bd9-24d8-4ad9-9f66-9dee70c7954c.png",
      alt: "Analytics Dashboard",
      title: "Analytics Dashboard"
    }
  ]

  // Auto-advance carousel every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardImages.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [dashboardImages.length])

  // Control carousel API when currentSlide changes
  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(currentSlide)
    }
  }, [carouselApi, currentSlide])

  // Auto-advance testimonials every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: FileText,
      title: "AI Invoice",
      description: "Generate professional invoices automatically with AI-powered smart templates and automated calculations."
    },
    {
      icon: UserCheck,
      title: "Crew Control",
      description: "Manage your team effectively with advanced crew scheduling, payroll, and performance tracking tools."
    },
    {
      icon: Package,
      title: "MatTrack",
      description: "Track materials and inventory in real-time with intelligent stock management and automated alerts."
    },
    {
      icon: Car,
      title: "Car Rental",
      description: "Complete car rental management system with booking, tracking, and maintenance scheduling."
    },
    {
      icon: Calendar,
      title: "Smart Schedule",
      description: "AI-powered scheduling that optimizes your time and resources for maximum productivity."
    },
    {
      icon: Video,
      title: "Meetings",
      description: "Schedule, manage, and track meetings with integrated video conferencing and note-taking."
    },
    {
      icon: ClipboardList,
      title: "Appointments",
      description: "Streamline appointment booking with automated reminders and calendar synchronization."
    },
    {
      icon: Calculator,
      title: "Estimates",
      description: "Create accurate project estimates with AI assistance and automated pricing calculations."
    },
    {
      icon: Zap,
      title: "And More...",
      description: "Discover additional powerful features designed to streamline every aspect of your business operations."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "FeatherBiz transformed our operations. We've increased efficiency by 40% and our team loves the intuitive interface.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Freelance Designer",
      content: "As a solo entrepreneur, FeatherBiz gives me enterprise-level tools without the complexity. Perfect for growing businesses.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Manager",
      content: "The automation features save us hours every week. It's like having an extra team member that never sleeps.",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Small Business Owner",
      content: "I was skeptical about switching platforms, but FeatherBiz made the transition seamless. Our productivity has never been higher.",
      rating: 5
    }
  ]

  const stats = [
    { number: 12900, label: "Active Users", suffix: "+" },
    { number: 99.9, label: "Uptime", suffix: "%", decimals: 1 },
    { number: 24, label: "Support", suffix: "/7" },
    { number: 150, label: "Integrations", suffix: "+" }
  ]

  const benefits = [
    "Increase productivity by up to 40%",
    "Reduce manual tasks by 60%",
    "Improve team collaboration",
    "Scale your business efficiently",
    "24/7 customer support",
    "Enterprise-grade security"
  ]

  const handleStartFreeTrial = async () => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        // If not authenticated, redirect to auth page
        navigate('/auth')
        return
      }

      // If authenticated, start the professional plan trial
      const professionalPlan = {
        id: "professional",
        name: "Professional",
        description: "Everything you need to grow - 7 days free!",
        price: "$29",
        period: "month",
        icon: Crown,
        features: [
          "7-day free trial",
          "Unlimited invoices",
          "AI voice assistant",
          "Advanced customer management",
          "Analytics dashboard",
          "E-signatures",
          "Priority support",
          "All integrations",
          "Document tracking",
          "Work orders",
          "Appointments",
          "Contracts",
          "File management"
        ],
        buttonText: "Start Free Trial",
        popular: true,
        color: "from-green-500 to-emerald-600",
        bgGradient: "from-green-50 to-emerald-50",
        stripePrice: 2900,
        recurring: true
      }

      // Create checkout session with trial
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceAmount: professionalPlan.stripePrice,
          planName: professionalPlan.name,
          planId: professionalPlan.id,
          recurring: professionalPlan.recurring,
          trialPeriodDays: 7,
          annualBilling: false
        }
      })

      if (error) {
        throw error
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank')
      } else {
        throw new Error('No checkout URL received')
      }

    } catch (error) {
      console.error('Error starting free trial:', error)
      toast({
        title: "Error",
        description: "There was an error starting your free trial. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleTryItFree = () => {
    // Scroll to pricing section to show all plan options
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Conteúdo principal da página (hero + main content) extraído para facilitar grid responsivo
  const MainContent = (
    <>
      {/* Hero no centro, caixa branca */}
      <section className="flex justify-center items-center py-10 px-3 bg-muted/60 min-h-[45vh]">
        <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl px-6 py-8 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-foreground" style={{lineHeight:"1.14"}}>
            Grow your business<br />
            with <span className="text-blue-700 font-extrabold">FeatherBiz</span>
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-6">
            The all-in-one platform that helps you manage clients, projects, and payments. Start your free trial and see results in 24 hours.
          </p>
          <div className="flex gap-4 w-full justify-center">
            <Button
              size="lg"
              className="rounded-full bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 shadow"
              onClick={() => navigate('/auth')}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-blue-300 text-blue-800 font-medium px-8"
              onClick={() => {
                toast({
                  title: "Demo",
                  description: "Demo video coming soon.",
                })
              }}
            >
              <Play className="w-4 h-4 mr-1" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
      {/* Trust Indicators */}
      <section className="py-8 sm:py-12 border-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-lg sm:text-xl font-bold text-primary uppercase tracking-wide animate-fade-in">
              Trusted by <AnimatedNumber value={12900} suffix="+" delay={200} /> businesses worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  <AnimatedNumber 
                    value={stat.number} 
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    delay={index * 200}
                    duration={2000}
                  />
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - HubSpot Style */}
      <section id="features" className="py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Features
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Everything you need to grow
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools that work together to help you manage your business more efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-card rounded-2xl border hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-16 sm:py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Customer Stories
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Loved by businesses everywhere
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              See how companies like yours use FeatherBiz to grow faster and work smarter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-background p-6 sm:p-8 rounded-2xl shadow-sm border transition-all duration-1000 ${
                  index === currentTestimonial ? 'opacity-100 animate-fade-in' : 
                  index === (currentTestimonial + 1) % testimonials.length ? 'opacity-70' :
                  index === (currentTestimonial + 2) % testimonials.length ? 'opacity-70' :
                  'opacity-40'
                }`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-32">
        <PricingPlans />
      </section>

      {/* CTA Section - HubSpot Style */}
      <section className="py-16 sm:py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to grow your business?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of businesses already using FeatherBiz to streamline operations and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleStartFreeTrial}
              size="lg"
              className="bg-background text-primary hover:bg-background/90 transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            >
              Try it Free
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={handleTryItFree}
              className="border-2 border-primary-foreground/20 text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            >
              Get Free Demo
            </Button>
          </div>
          <p className="text-primary-foreground/60 text-sm mt-4 sm:mt-6">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </>
  )

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex flex-row bg-background">
        {/* Sidebar desktop/Large */}
        <div className="hidden md:block">
          <LandingSidebar />
        </div>
        {/* Sidebar trigger on mobile */}
        <div className="md:hidden fixed top-3 left-3 z-40">
          <SidebarTrigger />
        </div>
        {/* Página central, ocupa o espaço sem sidebar ou ajusta margem lateral */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Header (logo, sign in, helpcenter removido) */}
          <header className="w-full border-b shadow-sm bg-white/90 sticky top-0 z-30">
            <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <Feather size={28} className="text-blue-700" strokeWidth={2.1} />
                <span className="ml-1 text-xl font-bold text-blue-800 tracking-tight">FeatherBiz</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-blue-100 text-blue-800 font-medium px-5"
                  onClick={() => navigate('/auth')}
                >
                  Sign in
                </Button>
                {/* Removido o botão Help Center */}
              </div>
            </div>
          </header>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {MainContent}
          </div>

          {/* Footer */}
          <footer className="bg-background border-t py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 sm:mb-12">
                <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-900">FeatherBiz</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    The complete business management platform designed for modern entrepreneurs and growing companies.
                  </p>
                  <div className="flex items-center space-x-4">
                    <LanguageSelector />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                    <li>
                      <Link 
                        to="/features-overview" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {useLanguage().t("featuresOverview.link")}
                      </Link>
                    </li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Integrations</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Support</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                    <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Community</a></li>
                    <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                    <li><Link to="/feedback" className="text-muted-foreground hover:text-primary transition-colors">Feedback</Link></li>
                    <li><Link to="/referrals" className="text-muted-foreground hover:text-primary transition-colors">Referrals</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Guides</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Webinars</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Company</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Press</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <p className="text-muted-foreground text-sm text-center sm:text-left">
                  © 2025 FeatherBiz. By FX American Group.
                </p>
                <div className="flex items-center space-x-6">
                  <a href="https://www.instagram.com/featherbiz/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
                {/* HelpCenter movido para o footer */}
                <div className="mt-4 sm:mt-0">
                  <HelpCenter variant="outline" />
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  )
}
