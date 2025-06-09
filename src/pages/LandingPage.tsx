import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Zap, Shield, Users, Briefcase, BarChart3, Clock, CheckSquare, 
  Star, ArrowRight, Monitor, Smartphone, Headphones, Mail
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

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [dashboardImages.length])

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Automation",
      description: "Streamline your workflow with intelligent automation that learns from your business patterns."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption to protect your sensitive business data."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Connect your team with real-time collaboration tools and shared workspaces."
    },
    {
      icon: Briefcase,
      title: "Project Management",
      description: "Organize projects, track progress, and meet deadlines with powerful project tools."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get deep insights into your business performance with comprehensive analytics."
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor productivity and billable hours with precise time tracking capabilities."
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
    { number: "10,000+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
    { number: "150+", label: "Integrations" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FB</span>
                </div>
                <span className="text-xl font-bold text-blue-600">FeatherBiz</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
              <UserGreeting />
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simplified without image */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Streamline Your Business
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
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
        </div>
      </section>

      {/* Dashboard Showcase Carousel */}
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Dashboard Views
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our comprehensive business management tools through intuitive dashboards
            </p>
          </div>
          
          <div className="relative">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {dashboardImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-0 shadow-2xl">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 drop-shadow-lg">
                              {image.title}
                            </h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
            
            {/* Carousel indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {dashboardImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Powerful Features for Modern Business
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run your business efficiently, from client management to financial tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of businesses that have transformed their operations with FeatherBiz
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm sm:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what real businesses say about FeatherBiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of businesses already using FeatherBiz to streamline their operations and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-blue-100 text-sm mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FB</span>
                </div>
                <span className="text-xl font-bold">FeatherBiz</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The complete business management platform designed for modern entrepreneurs and growing companies.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              © 2024 FeatherBiz. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Monitor className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Smartphone className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Headphones className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
