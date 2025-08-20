
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
      description: "Individuals and very small teams getting started.",
      features: [
        "Real-time contact syncing",
        "SmartSchedule basic (single calendar)",
        "EasyCalc (quick estimates)",
        "Invoices (limited per month)",
        "E-sign (limited docs per month)",
        "Basic CRM (contacts, notes)",
        "Limited users/seats"
      ],
      cta: "Start for free",
      featured: false,
    },
    {
      id: "professional-monthly",
      name: "Plus",
      price: 26,
      description: "Growing teams that need automation and collaboration.",
      features: [
        "Everything in Free, plus:",
        "Unlimited invoices & estimates",
        "SmartSchedule team",
        "EasyCalc Pro (templates & cost libraries)",
        "AI Voice (quotes & follow-ups)",
        "Unlimited E-sign",
        "Receipts & basic reports",
        "Shared pipelines",
        "Priority support (business hours)"
      ],
      cta: "Continue with Plus",
      featured: false,
    },
    {
      id: "professional-annual",
      name: "Pro",
      price: 252,
      description: "Scaling businesses that want intelligence and speed.",
      features: [
        "Everything in Plus, plus:",
        "Call Intelligence (summaries, action items)",
        "Advanced data enrichment",
        "Workflow automations",
        "Custom fields & imports",
        "Team roles & SSO",
        "Advanced reports & dashboards",
        "API access & webhooks",
        "Priority support (fast lane)"
      ],
      cta: "Continue with Pro",
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: null,
      description: "Large organizations and regulated teams.",
      features: [
        "Unlimited objects",
        "SAML/SSO and SCIM",
        "Dedicated environments & audit logs",
        "Custom workflows & approvals",
        "Flexible invoicing",
        "Dedicated CSM & onboarding"
      ],
      cta: "Talk to sales",
      featured: false,
    },
  ],
}

function formatPrice(price: number | null) {
  if (price === null) return "Custom";
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
  return formatted.replace('.00', '');
}

export function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
  const { redirectToCheckout, loading } = useCheckout()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handlePlanSelect = async (planId: string) => {
    if (planId === 'free') {
      window.location.assign('/auth')
      return
    }

    if (planId === 'enterprise') {
      // Handle enterprise contact
      window.location.assign('/contact')
      return
    }

    setLoadingPlan(planId)
    
    try {
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
      {/* Billing Toggle */}
      <div className="flex items-center justify-center mb-12">
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              billingPeriod === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("annual")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              billingPeriod === "annual"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Annual
          </button>
        </div>
      </div>
      
      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricing.plans.map((plan) => {
          const isAnnual = billingPeriod === "annual" && plan.id === "professional-annual";
          const isMonthly = billingPeriod === "monthly" && plan.id === "professional-monthly";
          const shouldShow = plan.id === "free" || plan.id === "enterprise" || isAnnual || isMonthly;
          
          if (!shouldShow) return null;

          return (
            <Card
              key={plan.id} 
              className={`relative bg-white transition-all duration-200 hover:border-gray-300 ${
                plan.featured 
                  ? 'border-blue-200 shadow-[inset_0_0_0_1px_#C7D2FE]' 
                  : 'border-gray-200'
              }`}
              style={{ borderRadius: '10px', padding: '32px' }}
            >
              <div className="space-y-6">
                {/* Plan Header */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900 tracking-tight">
                        {formatPrice(plan.price)}
                      </span>
                      {plan.price !== null && plan.price > 0 && (
                        <span className="text-gray-500 ml-1">
                          /{billingPeriod === "monthly" ? "mo" : "yr"}
                        </span>
                      )}
                    </div>
                    {billingPeriod === "annual" && plan.price && (
                      <div className="mt-2">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-xs">
                          Save 20%
                        </Badge>
                      </div>
                    )}
                    {plan.price && plan.price > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Per user/{billingPeriod === "monthly" ? "month" : "year"}{billingPeriod === "annual" ? ", billed annually" : ""}
                      </p>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    Best for: {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={loading || loadingPlan === plan.id}
                  variant={plan.id === 'free' || plan.id === 'enterprise' ? 'outline' : 'default'}
                  className="w-full font-semibold"
                  style={{ borderRadius: '8px', height: '44px' }}
                >
                  {loadingPlan === plan.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    plan.cta
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
