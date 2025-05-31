
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

const LandingPage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Brain,
      title: "AI Voice Assistant",
      description: "Intelligent automation that learns from your business patterns and suggests optimizations."
    },
    {
      icon: FileText,
      title: "Smart Invoicing",
      description: "Create professional invoices with AI assistance and track when clients view them."
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Manage relationships and communications with your customers in one place."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get insights into your business performance with detailed analytics and reporting."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee and automatic backups."
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Automate repetitive tasks and focus on growing your business."
    },
    {
      icon: Receipt,
      title: "Receipts",
      description: "Track and manage all your business receipts and expenses in one organized system."
    },
    {
      icon: Calendar,
      title: "Appointments",
      description: "Schedule and manage appointments with clients with automated reminders."
    },
    {
      icon: Wrench,
      title: "Work Orders",
      description: "Create, track, and manage work orders with real-time status updates."
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
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4" variant="secondary">
          🚀 AI-Powered Business Platform
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          The Modern Way to
          <br />
          <span className="text-primary">Run Your Business</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          FeatherBiz combines AI intelligence with powerful automation to help entrepreneurs 
          streamline their workflow, manage customers, and grow their business faster than ever.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/dashboard')}>
            Try It Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={handleWatchDemo}>
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
        
        {/* Hero Image/Video Placeholder */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-lg border border-primary/20 flex items-center justify-center">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Scale
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed for modern entrepreneurs who want to focus on growth, not admin work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105">
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-primary mb-2">
                <AnimatedNumber value={10} suffix="K+" delay={100} />
              </div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-primary mb-2">
                <AnimatedNumber value={1} suffix="M+" delay={200} />
              </div>
              <div className="text-gray-600">Invoices Created</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-primary mb-2">
                <AnimatedNumber value={99.9} decimals={1} suffix="%" delay={300} />
              </div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">AI Assistant</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-1">
                <AnimatedNumber value={4.9} decimals={1} delay={400} />
                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="text-gray-600">User Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Entrepreneurs
          </h2>
          <p className="text-xl text-gray-600">
            See what our users say about FeatherBiz
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of entrepreneurs who trust FeatherBiz to power their success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={() => navigate('/dashboard')}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Feather className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">FeatherBiz</span>
              </div>
              <p className="text-gray-400">
                The AI-powered business platform for modern entrepreneurs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><button onClick={() => navigate('/feedback')} className="hover:text-white transition-colors text-left">Feedback</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors text-left">Feature Requests</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FeatherBiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
