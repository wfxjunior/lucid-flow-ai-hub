import { Crown, Zap, Star, Sparkles, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { PricingHeader } from "./pricing/PricingHeader"
import { PricingCard } from "./pricing/PricingCard"
import { TrustIndicators } from "./pricing/TrustIndicators"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"

const plans = {
  monthly: [
    {
      id: "free",
      name: "Free",
      description: "For very small teams",
      price: "$0",
      period: "Per user/month, billed annually",
      icon: Zap,
      features: [
        "Real-time contact syncing",
        "Automatic data enrichment",
        "Up to 3 seats"
      ],
      buttonText: "Start for free",
      popular: false,
      color: "from-gray-400 to-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      stripePrice: null
    },
    {
      id: "plus",
      name: "Plus",
      description: "For growing teams",
      price: "$29",
      period: "Per user/month, billed annually",
      savings: "Save 20%",
      icon: Crown,
      features: [
        "Private lists",
        "Enhanced email sending",
        "No seat limits"
      ],
      buttonText: "Continue with Plus",
      popular: false,
      color: "from-blue-400 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      stripePrice: 2900,
      recurring: true
    },
    {
      id: "pro",
      name: "Pro",
      description: "For scaling businesses",
      price: "$69",
      period: "Per user/month, billed annually",
      savings: "Save 20%",
      icon: Star,
      features: [
        "Call Intelligence",
        "Advanced data enrichment",
        "Priority support"
      ],
      buttonText: "Continue with Pro",
      popular: true,
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      stripePrice: 6900,
      recurring: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      price: "Custom",
      period: "Billed annually",
      icon: Building2,
      features: [
        "Unlimited objects",
        "SAML and SSO",
        "Flexible invoicing"
      ],
      buttonText: "Talk to sales",
      popular: false,
      color: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      stripePrice: null
    }
  ],
  annual: [
    {
      id: "free",
      name: "Free",
      description: "For very small teams",
      price: "$0",
      period: "Per user/month, billed annually",
      icon: Zap,
      features: [
        "Real-time contact syncing",
        "Automatic data enrichment",
        "Up to 3 seats"
      ],
      buttonText: "Start for free",
      popular: false,
      color: "from-gray-400 to-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      stripePrice: null
    },
    {
      id: "plus-annual",
      name: "Plus",
      description: "For growing teams",
      price: "$23",
      originalPrice: "$29",
      period: "Per user/month, billed annually",
      savings: "Save 20%",
      icon: Crown,
      features: [
        "Private lists",
        "Enhanced email sending",
        "No seat limits"
      ],
      buttonText: "Continue with Plus",
      popular: false,
      color: "from-blue-400 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      stripePrice: 2300,
      recurring: true,
      annualBilling: true
    },
    {
      id: "pro-annual",
      name: "Pro",
      description: "For scaling businesses",
      price: "$55",
      originalPrice: "$69",
      period: "Per user/month, billed annually",
      savings: "Save 20%",
      icon: Star,
      features: [
        "Call Intelligence",
        "Advanced data enrichment",
        "Priority support"
      ],
      buttonText: "Continue with Pro",
      popular: true,
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      stripePrice: 5500,
      recurring: true,
      annualBilling: true
    },
    {
      id: "enterprise-annual",
      name: "Enterprise",
      description: "For large organizations",
      price: "Custom",
      period: "Billed annually",
      icon: Building2,
      features: [
        "Unlimited objects",
        "SAML and SSO",
        "Flexible invoicing"
      ],
      buttonText: "Talk to sales",
      popular: false,
      color: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      stripePrice: null
    }
  ]
}

export function PricingPlans() {
  const { toast } = useToast()
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  const handlePlanSelection = async (plan: typeof plans.monthly[0]) => {
    console.log('=== STRIPE CHECKOUT STARTED ===')
    console.log('Selected plan:', plan.name, plan.id)
    console.log('Plan details:', { 
      price: plan.stripePrice, 
      recurring: plan.recurring,
      annualBilling: (plan as any).annualBilling 
    })

    // Handle Enterprise plan
    if (plan.id === 'enterprise' || plan.id === 'enterprise-annual') {
      toast({
        title: "Contact Sales",
        description: "Our sales team will contact you shortly to discuss your enterprise needs.",
      })
      return
    }

    if (plan.stripePrice === null) {
      console.log('Free plan selected - no payment needed')
      toast({
        title: "Free Plan Selected",
        description: `You've selected the ${plan.name} plan. Start creating your invoices!`,
      })
      return
    }

    try {
      console.log('Checking user authentication...')
      
      // Get current user session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('Session error:', sessionError)
        toast({
          title: "Authentication Error", 
          description: "There was an issue with your session. Please log in again.",
          variant: "destructive"
        })
        return
      }
      
      if (!session) {
        console.log('No user session found')
        toast({
          title: "Authentication Required",
          description: "Please log in to subscribe to a paid plan.",
          variant: "destructive"
        })
        return
      }

      console.log('User authenticated:', session.user.email)
      console.log('Creating checkout session...')

      // Prepare checkout data
      const checkoutData = {
        priceAmount: plan.stripePrice,
        planName: plan.name,
        planId: plan.id,
        recurring: plan.recurring || false,
        trialPeriodDays: 7,
        annualBilling: (plan as any).annualBilling || false
      }

      console.log('Checkout data:', checkoutData)

      // Create checkout session with timeout
      const checkoutPromise = supabase.functions.invoke('create-checkout', {
        body: checkoutData,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        }
      })

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Checkout request timed out')), 30000)
      })

      const { data, error } = await Promise.race([checkoutPromise, timeoutPromise]) as any

      console.log('Checkout response received')
      console.log('Data:', data)
      console.log('Error:', error)

      if (error) {
        console.error('Checkout error details:', error)
        
        // Provide user-friendly error messages
        let errorMessage = "There was an error processing your request. Please try again."
        if (error.message) {
          if (error.message.includes('STRIPE_SECRET_KEY')) {
            errorMessage = "Payment system configuration error. Please contact support."
          } else if (error.message.includes('timeout')) {
            errorMessage = "Request timed out. Please check your connection and try again."
          } else if (error.message.includes('Customer not found')) {
            errorMessage = "Account verification required. Please contact support."
          } else {
            errorMessage = `Payment error: ${error.message}`
          }
        }
        
        toast({
          title: "Checkout Error",
          description: errorMessage,
          variant: "destructive"
        })
        return
      }

      if (data?.url) {
        console.log('Redirecting to checkout URL:', data.url)
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank')
        
        toast({
          title: "Redirecting to Payment",
          description: "Opening Stripe checkout in a new tab...",
        })
      } else {
        console.error('No checkout URL received')
        toast({
          title: "Checkout Error",
          description: "No checkout URL received from server. Please try again.",
          variant: "destructive"
        })
      }

    } catch (error) {
      console.error('=== STRIPE CHECKOUT ERROR ===')
      console.error('Error object:', error)
      console.error('Error message:', error?.message)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      // Provide more specific error messages
      let errorMessage = "There was an error processing your request. Please try again."
      
      if (error && typeof error === 'object' && 'message' in error) {
        const message = error.message as string
        if (message.includes('secret_key_required') || message.includes('publishable API key')) {
          errorMessage = "Payment system configuration error. Please contact support."
        } else if (message.includes('Invalid API Key')) {
          errorMessage = "Payment system configuration error. Please contact support."
        } else if (message.includes('No such price')) {
          errorMessage = "Invalid pricing configuration. Please contact support."
        } else if (message.includes('network') || message.includes('fetch')) {
          errorMessage = "Network error. Please check your connection and try again."
        } else {
          errorMessage = `Payment error: ${message}`
        }
      }
      
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      console.log('=== STRIPE CHECKOUT COMPLETED ===')
    }
  }

  const currentPlans = plans[billingPeriod]

  return (
    <div className="py-6 sm:py-8 lg:py-10 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <PricingHeader />
        
        {/* Billing Period Toggle */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-muted/50 rounded-full p-1 shadow-sm border max-w-sm mx-auto">
            <ToggleGroup
              type="single"
              value={billingPeriod}
              onValueChange={(value) => value && setBillingPeriod(value as "monthly" | "annual")}
              className="grid grid-cols-2 gap-1 w-full"
            >
              <ToggleGroupItem
                value="monthly"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-full data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm data-[state=off]:text-muted-foreground data-[state=off]:bg-transparent transition-all"
              >
                Monthly
              </ToggleGroupItem>
              <ToggleGroupItem
                value="annual"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-full data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm data-[state=off]:text-muted-foreground data-[state=off]:bg-transparent transition-all"
              >
                Annual
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {currentPlans.map((plan) => (
            <div key={plan.id} className="flex justify-center">
              <div className="w-full">
                <PricingCard 
                  plan={plan} 
                  onPlanSelect={handlePlanSelection} 
                />
              </div>
            </div>
          ))}
        </div>

        <TrustIndicators />
      </div>
    </div>
  )
}
