import { Crown, Zap, Star, Sparkles } from "lucide-react"
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
      description: "Perfect for getting started",
      price: "$0",
      period: "forever",
      icon: Zap,
      features: [
        "5 invoices per month",
        "Basic templates",
        "Standard support",
        "Basic customer management"
      ],
      buttonText: "Start Free",
      popular: false,
      color: "from-gray-400 to-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      stripePrice: null
    },
    {
      id: "professional",
      name: "Professional",
      description: "Everything you need to grow - 7 days free!",
      price: "$19",
      period: "month",
      icon: Crown,
      features: [
        "7-day free trial",
        "Unlimited invoices",
        
        // Main Features
        "Dashboard with analytics",
        "AI Voice Assistant",
        "Invoice Creator",
        "Estimates & Quotes",
        "Payment Processing",
        "E-Signatures",
        
        // Core Business
        "Customer Management",
        "Project Management",
        "Project Timeline View",
        "Sales Pipeline",
        "Smart Schedule",
        
        // Financial Tools
        "FeatherBudget AI",
        "FeatherTax",
        "EasyCalc",
        "Accounting Suite",
        "Quote Generator",
        
        // Operations
        "Car Rental System",
        "Work Orders",
        "MatTrack (Material Tracking)",
        "CrewControl (Team Management)",
        "EarnSync",
        "AfterCare",
        
        // Documents & Forms
        "FeatherForms",
        "Sales Orders",
        "Business Proposals",
        "Bids",
        "Contracts",
        
        // Productivity
        "Meetings",
        "Todo List",
        "Notes",
        "Appointments",
        
        // Communication
        "Messages",
        "Email Settings",
        
        // Analytics
        "Analytics Dashboard",
        "Admin Panel",
        
        // General & Support
        "Careers Portal",
        "Referrals",
        "Features Request",
        "FAQ & Help",
        "Feedback System",
        "Settings",
        
        "Priority support",
        "All integrations",
        "Document tracking",
        "File management"
      ],
      buttonText: "Start Free Trial",
      popular: true,
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      stripePrice: 1900,
      recurring: true
    }
  ],
  annual: [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "forever",
      icon: Zap,
      features: [
        "5 invoices per month",
        "Basic templates",
        "Standard support",
        "Basic customer management"
      ],
      buttonText: "Start Free",
      popular: false,
      color: "from-gray-400 to-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      stripePrice: null
    },
    {
      id: "professional-annual",
      name: "Professional",
      description: "Everything you need to grow - 7 days free!",
      price: "$190",
      originalPrice: "$228",
      period: "year",
      icon: Crown,
      features: [
        "7-day free trial",
        "Unlimited invoices",
        
        // Main Features
        "Dashboard with analytics",
        "AI Voice Assistant",
        "Invoice Creator",
        "Estimates & Quotes",
        "Payment Processing",
        "E-Signatures",
        
        // Core Business
        "Customer Management",
        "Project Management",
        "Project Timeline View",
        "Sales Pipeline",
        "Smart Schedule",
        
        // Financial Tools
        "FeatherBudget AI",
        "FeatherTax",
        "EasyCalc",
        "Accounting Suite",
        "Quote Generator",
        
        // Operations
        "Car Rental System",
        "Work Orders",
        "MatTrack (Material Tracking)",
        "CrewControl (Team Management)",
        "EarnSync",
        "AfterCare",
        
        // Documents & Forms
        "FeatherForms",
        "Sales Orders",
        "Business Proposals",
        "Bids",
        "Contracts",
        
        // Productivity
        "Meetings",
        "Todo List",
        "Notes",
        "Appointments",
        
        // Communication
        "Messages",
        "Email Settings",
        
        // Analytics
        "Analytics Dashboard",
        "Admin Panel",
        
        // General & Support
        "Careers Portal",
        "Referrals",
        "Features Request",
        "FAQ & Help",
        "Feedback System",
        "Settings",
        
        "Priority support",
        "All integrations",
        "Document tracking",
        "File management"
      ],
      buttonText: "Start Free Trial",
      popular: true,
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      stripePrice: 19000,
      recurring: true,
      annualBilling: true
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
      const { data: { session } } = await supabase.auth.getSession()
      
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

      // Create checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: checkoutData,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        }
      })

      console.log('Checkout response received')
      console.log('Data:', data)
      console.log('Error:', error)

      if (error) {
        console.error('Checkout error details:', error)
        throw error
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
        throw new Error('No checkout URL received from server')
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
    <div className="py-8 sm:py-12 lg:py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <PricingHeader />
        
        {/* Billing Period Toggle */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-white rounded-xl p-1 shadow-sm border">
            <ToggleGroup
              type="single"
              value={billingPeriod}
              onValueChange={(value) => value && setBillingPeriod(value as "monthly" | "annual")}
              className="grid grid-cols-2 gap-1"
            >
              <ToggleGroupItem
                value="monthly"
                className="px-6 py-3 text-sm font-medium rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                Monthly
              </ToggleGroupItem>
              <ToggleGroupItem
                value="annual"
                className="px-6 py-3 text-sm font-medium rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground relative"
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Save 17%
                </span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {currentPlans.map((plan) => (
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
