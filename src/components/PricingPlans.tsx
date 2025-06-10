
import { Crown, Zap, Star, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { PricingHeader } from "./pricing/PricingHeader"
import { PricingCard } from "./pricing/PricingCard"
import { TrustIndicators } from "./pricing/TrustIndicators"

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
        <PricingHeader />
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 max-w-8xl mx-auto">
          {plans.map((plan) => (
            <PricingCard 
              key={plan.id} 
              plan={plan} 
              onPlanSelect={handlePlanSelection} 
            />
          ))}
        </div>

        <TrustIndicators />
      </div>
    </div>
  )
}
