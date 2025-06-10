
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Star, Sparkles, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

const plans = [
  {
    id: "free-invoice",
    name: "Free Starter",
    description: "Perfect for new contractors",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      "5 invoices per month",
      "Basic templates",
      "Email sending",
      "Basic customer management",
      "Standard support"
    ],
    buttonText: "Start Free",
    popular: false,
    color: "from-gray-400 to-gray-600",
    bgGradient: "from-gray-50 to-gray-100",
    stripePrice: null
  },
  {
    id: "trial",
    name: "Free Trial",
    description: "Try everything for 7 days",
    price: "$0",
    period: "7 days",
    icon: Star,
    features: [
      "All premium features",
      "Unlimited invoices",
      "AI voice assistant",
      "Advanced analytics",
      "Priority support",
      "All integrations"
    ],
    buttonText: "Start Free Trial",
    popular: true,
    color: "from-blue-500 to-purple-600",
    bgGradient: "from-blue-50 to-purple-50",
    stripePrice: null
  },
  {
    id: "monthly",
    name: "Professional",
    description: "Everything you need to grow",
    price: "$29",
    period: "month",
    icon: Crown,
    features: [
      "Unlimited invoices",
      "AI voice assistant",
      "Advanced customer management",
      "Analytics dashboard",
      "E-signatures",
      "Priority support",
      "All integrations",
      "Document tracking"
    ],
    buttonText: "Get Started",
    popular: false,
    color: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    stripePrice: 2900,
    recurring: true
  },
  {
    id: "annual",
    name: "Business Pro",
    description: "Best value - Save 17%!",
    price: "$290",
    period: "year",
    originalPrice: "$348",
    icon: Sparkles,
    features: [
      "Everything in Professional",
      "2 months FREE",
      "Advanced AI features",
      "White-label options",
      "Custom integrations",
      "Dedicated support",
      "Early access to new features",
      "Business consultation"
    ],
    buttonText: "Go Annual",
    popular: false,
    color: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    stripePrice: 29000,
    recurring: true
  }
]

export function PricingPlans() {
  const { toast } = useToast()

  const handlePlanSelection = async (plan: typeof plans[0]) => {
    if (plan.stripePrice === null) {
      // Handle free plans
      toast({
        title: "Free Plan Selected",
        description: `You've selected the ${plan.name}. No payment required!`,
      })
      return
    }

    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to subscribe to a paid plan.",
          variant: "destructive"
        })
        return
      }

      // Create checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceAmount: plan.stripePrice,
          planName: plan.name,
          planId: plan.id,
          recurring: plan.recurring || false
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
      console.error('Error creating checkout session:', error)
      toast({
        title: "Payment Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Choose Your Perfect Plan
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            Pricing Plans for Every Contractor
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Start free and scale as you grow. All plans include our powerful AI tools to streamline your business operations.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 max-w-8xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`relative group transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'sm:scale-105 xl:scale-110 xl:z-10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-semibold shadow-lg">
                    ⭐ Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`
                relative h-full overflow-hidden border-0 shadow-xl
                bg-gradient-to-br ${plan.bgGradient}
                ${plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
                group-hover:shadow-2xl transition-all duration-300
              `}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-10">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${plan.color}`}></div>
                </div>
                
                <div className="relative z-10">
                  <CardHeader className="text-center pb-2 pt-6 sm:pt-8 px-4 sm:px-6">
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl 
                      bg-gradient-to-br ${plan.color} 
                      flex items-center justify-center 
                      shadow-lg group-hover:scale-110 transition-transform duration-300
                    `}>
                      <plan.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    
                    {/* Plan Name */}
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                      {plan.description}
                    </CardDescription>
                    
                    {/* Pricing */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{plan.price}</span>
                        <div className="text-left">
                          <span className="text-gray-500 text-sm sm:text-lg">/{plan.period}</span>
                          {plan.originalPrice && (
                            <div className="text-xs sm:text-sm text-red-500 line-through font-medium">
                              {plan.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>
                      {plan.originalPrice && (
                        <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm font-medium">
                          💰 Save $58/year
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
                    {/* CTA Button */}
                    <Button 
                      className={`
                        w-full py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 h-10 sm:h-auto
                        ${plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                          : plan.stripePrice 
                            ? 'bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white'
                            : 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400'
                        }
                      `}
                      onClick={() => handlePlanSelection(plan)}
                    >
                      {plan.buttonText}
                    </Button>
                    
                    {/* Features List */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="text-center">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          What's Included
                        </span>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600 font-bold" />
                            </div>
                            <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">{feature}</span>
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

        {/* Bottom Section */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-lg border border-gray-200 mx-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              <span className="text-base sm:text-lg font-semibold text-gray-900">30-Day Money-Back Guarantee</span>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              All plans include SSL security, automatic backups, 99.9% uptime guarantee, and dedicated contractor support.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span>24/7 support</span>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span>Free migration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
