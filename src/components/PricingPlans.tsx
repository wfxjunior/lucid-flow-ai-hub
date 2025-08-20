import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { useCheckout } from "@/hooks/useCheckout"
import { toast } from "sonner"

const pricing = {
  plans: [
    {
      id: "free",
      name: "Free",
      price: 0,
      description: "Get started with the basics.",
      features: ["Basic reporting", "Up to 5 users", "Basic support"],
      cta: "Get started",
      featured: false,
    },
    {
      id: "professional-monthly",
      name: "Professional",
      price: 26,
      description: "Level up your business.",
      features: ["Advanced reporting", "Up to 50 users", "Priority support"],
      cta: "Choose monthly",
      featured: true,
    },
    {
      id: "professional-annual",
      name: "Professional",
      price: 252,
      description: "Save 19% with annual billing.",
      features: ["Advanced reporting", "Up to 50 users", "Priority support"],
      cta: "Choose annual",
      featured: false,
    },
  ],
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

export function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
  const { redirectToCheckout, loading } = useCheckout()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const monthlyPlans = pricing.plans.filter((plan) => plan.id !== "professional-annual")
  const annualPlans = pricing.plans.filter((plan) => plan.id !== "free" && plan.id !== "professional-monthly")

  const currentPlans = billingPeriod === "monthly" ? monthlyPlans : annualPlans

  const handlePlanSelect = async (planId: string) => {
    if (planId === 'free') {
      window.location.assign('/auth')
      return
    }

    setLoadingPlan(planId)
    
    try {
      // Map plan IDs to checkout plans
      let checkoutPlan: 'monthly' | 'yearly' = 'monthly'
      if (planId.includes('annual') || billingPeriod === 'annual') {
        checkoutPlan = 'yearly'
      }

      await redirectToCheckout({
        plan: checkoutPlan
      })
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Failed to start checkout process. Please try again.')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center space-x-4 pb-8">
        <span className="text-gray-700">Monthly</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={billingPeriod === "annual"}
            onChange={() =>
              setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")
            }
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <span className="text-gray-700">Annually</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {currentPlans.map((plan) => (
          <Card
            key={plan.id} 
            className={`relative bg-white border rounded-[10px] p-7 transition-all duration-200 hover:border-[#D1D5DB] ${
              plan.featured 
                ? 'border-[#C7D2FE] shadow-[inset_0_0_0_1px_#C7D2FE,0_0_0_1px_#E0E7FF]' 
                : 'border-[#E5E7EB]'
            }`}
          >
            <div className="space-y-3">
              {plan.featured && (
                <Badge className="w-fit rounded-full px-2 py-1.5 text-xs font-medium uppercase bg-secondary text-secondary-foreground shadow-md">
                  Featured
                </Badge>
              )}
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-muted-foreground">{plan.description}</p>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {formatPrice(plan.price)}
                  {plan.id !== "free" && (
                    <span className="text-base font-medium text-gray-500">
                      /
                      {billingPeriod === "monthly" ? "mo" : "yr"}
                    </span>
                  )}
                </div>
                <ul className="space-y-1.5 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <Button
              onClick={() => handlePlanSelect(plan.id)}
              disabled={loading || loadingPlan === plan.id}
              variant={plan.id === 'free' ? 'outline' : 'default'}
              className="w-full h-11 rounded-lg px-4 font-medium transition-all duration-180"
            >
              {loadingPlan === plan.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                plan.cta
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
