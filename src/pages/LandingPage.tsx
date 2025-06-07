import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ThemeToggle } from "@/components/ThemeToggle"
import { TypingText } from "@/components/TypingText"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Check, ArrowRight, Users, Shield, Zap, TrendingUp, MessageSquare, Award, Feather, Play, ChevronRight, Building2, Globe, Smartphone, BarChart3, Clock, CheckCircle2, Menu, X, Sparkles, Crown, FileText, ClipboardList, UserCheck, Package } from "lucide-react"
import { useState } from "react"

const LandingPage = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const featuresData = [
    {
      id: 1,
      icon: Zap,
      title: "Boost Productivity",
      description: "Automate tasks and streamline workflows for maximum efficiency.",
    },
    {
      id: 2,
      icon: Users,
      title: "Team Collaboration",
      description: "Seamlessly collaborate with team members on projects and tasks.",
    },
    {
      id: 3,
      icon: BarChart3,
      title: "Data Analytics",
      description: "Gain insights with comprehensive data analytics and reporting.",
    },
    {
      id: 4,
      icon: Shield,
      title: "Secure Platform",
      description: "Ensure data security with advanced encryption and access controls.",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      title: "CEO, ABC Corp",
      quote: "FeatherBiz has transformed our business operations. Highly recommended!",
    },
    {
      id: 2,
      name: "Bob Williams",
      title: "Manager, XYZ Ltd",
      quote: "The platform is intuitive and has significantly improved our team's productivity.",
    },
  ]

  const pricingPlans = [
    {
      id: 1,
      name: "Basic",
      price: "Free",
      features: ["Up to 5 users", "Basic analytics", "Limited storage"],
    },
    {
      id: 2,
      name: "Pro",
      price: "$19/month",
      features: ["Unlimited users", "Advanced analytics", "100GB storage", "Priority support"],
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$99/month",
      features: ["Custom solutions", "Dedicated support", "Unlimited storage", "Advanced security"],
    },
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
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
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
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
                <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Contact</a>
                <div className="flex items-center gap-2 px-3 py-2">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-600 hover:text-blue-600"
                  size="sm"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
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
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TypingText title="Empower Your Business with AI-Driven Solutions" className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-8" />
          <p className="text-lg text-gray-700 mb-12">
            Unlock the full potential of your business with our AI-powered platform. Streamline operations, boost productivity, and drive growth.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresData.map((feature) => (
              <Card key={feature.id} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold">
                    <feature.icon className="mr-2 h-6 w-6 text-blue-600" />
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

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What Our Clients Say</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Star className="h-5 w-5 text-yellow-500 inline-block mr-1" />
                    <Star className="h-5 w-5 text-yellow-500 inline-block mr-1" />
                    <Star className="h-5 w-5 text-yellow-500 inline-block mr-1" />
                    <Star className="h-5 w-5 text-yellow-500 inline-block mr-1" />
                    <Star className="h-5 w-5 text-yellow-500 inline-block mr-1" />
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="ml-3">
                      <div className="text-sm font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className="shadow-md">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <Check className="mr-2 h-4 w-4 text-blue-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FeatherBiz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
