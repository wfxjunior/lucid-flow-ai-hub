
import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { AnimatedNumber } from "@/components/AnimatedNumber"
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Zap, Shield, Users, Briefcase, BarChart3, Clock, CheckSquare, 
  Star, ArrowRight, Play, Check, FileText, UserCheck, Package, 
  Car, Calendar, Video, ClipboardList, Calculator, Instagram,
  Facebook, Twitter, Linkedin, Youtube
} from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

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
    }
  ]

  const stats = [
    { number: 10000, label: "Active Users", suffix: "+" },
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/9c9fc115-bd20-4b1a-91a2-103ecc8ca698.png" 
                    alt="FeatherBiz Logo" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-primary">FeatherBiz</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Reviews</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            </div>

            <div className="flex items-center space-x-4">
              <UserGreeting />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - HubSpot Style */}
      <section className="relative py-12 sm:py-16 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  🚀 New: AI-Powered Business Management
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Grow your business with 
                  <span className="text-primary"> FeatherBiz</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  The all-in-one platform that helps you manage clients, projects, and payments. 
                  Start your free trial and see results in 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2"
                  >
                    <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Watch Demo
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Free 7-day trial • No credit card required • Setup in 2 minutes
                </p>
              </div>

              {/* Benefits List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:max-w-none lg:mx-0">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 justify-center lg:justify-start">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative z-10">
                <Carousel 
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {dashboardImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <Card className="border-0 shadow-2xl bg-background">
                          <CardContent className="p-1 sm:p-2">
                            <div className="relative overflow-hidden rounded-lg">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto object-contain rounded-lg transition-opacity duration-500"
                                style={{
                                  opacity: index === currentSlide ? 1 : 0.7
                                }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              
              {/* Background Elements */}
              <div className="absolute -top-10 -right-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 sm:py-12 border-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-lg sm:text-xl font-bold text-primary uppercase tracking-wide animate-fade-in">
              Trusted by <AnimatedNumber value={10000} suffix="+" delay={200} /> businesses worldwide
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background p-6 sm:p-8 rounded-2xl shadow-sm border"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
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
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="bg-background text-primary hover:bg-background/90 transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            >
              Try it Free
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            >
              Get Free Demo
            </Button>
          </div>
          <p className="text-primary-foreground/60 text-sm mt-4 sm:mt-6">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 sm:mb-12">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/9c9fc115-bd20-4b1a-91a2-103ecc8ca698.png" 
                    alt="FeatherBiz Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-primary">FeatherBiz</span>
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
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
          </div>
        </div>
      </footer>
    </div>
  )
}
