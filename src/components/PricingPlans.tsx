import { Crown, Zap, Gift, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PricingHeader } from "./pricing/PricingHeader"
import { PricingCard } from "./pricing/PricingCard"
import { TrustIndicators } from "./pricing/TrustIndicators"
import { PricingFeaturesDetails } from "./pricing/PricingFeaturesDetails"
import { PricingFAQ } from "./pricing/PricingFAQ"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Check, X } from "lucide-react"
import { useState, useEffect } from "react"
import pricingJson from "../../config/pricing.json"
import entitlementsJson from "../../config/entitlements.json"
import priceMapJson from "../../config/stripe.priceMap.json"
import { useCheckout, CheckoutPlan } from "@/hooks/useCheckout"

// Define pricing plans data
const plans = {
  monthly: [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "Forever free",
      icon: Gift,
      features: [
        "Dashboard overview",
        "Up to 5 customers",
        "Basic notes & to-do lists",
        "File manager (100MB)",
        "Email support"
      ],
      buttonText: "Get Started Free",
      popular: false,
      color: "blue",
      bgGradient: "from-blue-50 to-blue-100",
      stripePrice: null,
      recurring: false
    },
    {
      id: "starter",
      name: "Starter",
      description: "For small businesses",
      price: "$19",
      period: "per month",
      icon: Zap,
      features: [
        "Everything in Free",
        "Unlimited customers",
        "Invoices & estimates",
        "Basic appointments",
        "Payment tracking",
        "File manager (5GB)",
        "Priority support"
      ],
      buttonText: "Start Free Trial",
      popular: false,
      color: "purple",
      bgGradient: "from-purple-50 to-purple-100",
      stripePrice: 1900,
      recurring: true
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing businesses",
      price: "$26",
      period: "per month",
      icon: Crown,
      features: [
        "Work Orders",
        "EasyCalc",
        "MatTrack",
        "CarRental",
        "SmartSchedule",
        "Bids",
        "CrewControl",
        "FeatherBudget",
        "Projects",
        "ESIGN"
      ],
      buttonText: "Start Free Trial",
      popular: true,
      color: "green",
      bgGradient: "from-green-50 to-green-100",
      stripePrice: 2600,
      recurring: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      price: "Custom",
      period: "Contact for pricing",
      icon: Building2,
      features: [
        "Everything in Pro",
        "Unlimited users & storage",
        "Custom integrations",
        "Dedicated support",
        "Advanced security",
        "White-label options",
        "Custom training",
        "SLA guarantees"
      ],
      buttonText: "Contact Sales",
      popular: false,
      color: "orange",
      bgGradient: "from-orange-50 to-orange-100",
      stripePrice: null,
      recurring: false
    }
  ],
  annual: [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "Forever free",
      icon: Gift,
      features: [
        "Dashboard overview",
        "Up to 5 customers",
        "Basic notes & to-do lists",
        "File manager (100MB)",
        "Email support"
      ],
      buttonText: "Get Started Free",
      popular: false,
      color: "blue",
      bgGradient: "from-blue-50 to-blue-100",
      stripePrice: null,
      recurring: false
    },
    {
      id: "starter",
      name: "Starter",
      description: "For small businesses",
      price: "$15",
      period: "per month, billed annually",
      originalPrice: "$19",
      savings: "Save 21%",
      icon: Zap,
      features: [
        "Everything in Free",
        "Unlimited customers",
        "Invoices & estimates",
        "Basic appointments",
        "Payment tracking",
        "File manager (5GB)",
        "Priority support"
      ],
      buttonText: "Start Free Trial",
       popular: false,
      color: "purple",
      bgGradient: "from-purple-50 to-purple-100",
      stripePrice: 1500,
      recurring: true,
      annualBilling: true
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing businesses",
      price: "$21",
      period: "per month, billed annually",
      originalPrice: "$26",
      savings: "Save 19%",
      icon: Crown,
       features: [
         "Work Orders",
         "EasyCalc",
         "MatTrack",
         "CarRental",
         "SmartSchedule",
         "Bids",
         "CrewControl",
         "FeatherBudget",
         "Projects",
         "ESIGN"
       ],
      buttonText: "Start Free Trial",
       popular: true,
      color: "green",
      bgGradient: "from-green-50 to-green-100",
      stripePrice: 2100,
      recurring: true,
      annualBilling: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      price: "Custom",
      period: "Contact for pricing",
      icon: Building2,
      features: [
        "Everything in Pro",
        "Unlimited users & storage",
        "Custom integrations",
        "Dedicated support",
        "Advanced security",
        "White-label options",
        "Custom training",
        "SLA guarantees"
      ],
      buttonText: "Contact Sales",
      popular: false,
      color: "orange",
      bgGradient: "from-orange-50 to-orange-100",
      stripePrice: null,
      recurring: false
    }
  ]
}

// Feature comparison data organized by categories
const featureCategories = [
  {
    title: "Core Business Management",
    features: [
      { name: "Dashboard & Business Overview", free: true, starter: true, pro: true, enterprise: true },
      { name: "Customer Management", free: "Up to 5", starter: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Projects Management", free: false, starter: true, pro: true, enterprise: true },
      { name: "Contracts", free: false, starter: false, pro: true, enterprise: true },
      { name: "Estimates & Quotes", free: false, starter: true, pro: true, enterprise: true },
      { name: "Invoices", free: false, starter: true, pro: true, enterprise: true },
      { name: "Work Orders", free: false, starter: false, pro: true, enterprise: true },
      { name: "Service Orders", free: false, starter: false, pro: true, enterprise: true },
      { name: "Sales Orders", free: false, starter: false, pro: true, enterprise: true },
      { name: "Bids & Business Proposals", free: false, starter: false, pro: true, enterprise: true }
    ]
  },
  {
    title: "Financial Tools",
    features: [
      { name: "Payments & Payment Tracking", free: false, starter: true, pro: true, enterprise: true },
      { name: "Receipts Management", free: false, starter: true, pro: true, enterprise: true },
      { name: "Accounting & Financial Records", free: false, starter: false, pro: true, enterprise: true },
      { name: "FeatherTax - Tax Management", free: false, starter: false, pro: true, enterprise: true },
      { name: "FeatherBudget - Budget Planning", free: false, starter: false, pro: true, enterprise: true },
      { name: "EarnSync - Earnings Tracking", free: false, starter: false, pro: true, enterprise: true }
    ]
  },
  {
    title: "Operations & Specialized Tools",
    features: [
      { name: "MatTrack - Material Tracking", free: false, starter: false, pro: true, enterprise: true },
      { name: "CrewControl - Employee Management", free: false, starter: false, pro: true, enterprise: true },
      { name: "Car Rental Management", free: false, starter: false, pro: true, enterprise: true },
      { name: "Smart Schedule", free: false, starter: false, pro: true, enterprise: true },
      { name: "Appointments & Booking", free: false, starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
      { name: "Meetings & Coordination", free: false, starter: false, pro: true, enterprise: true },
      { name: "Pipeline Board", free: false, starter: false, pro: true, enterprise: true },
      { name: "Next Projects Calendar", free: false, starter: false, pro: true, enterprise: true }
    ]
  },
  {
    title: "Documents & Forms",
    features: [
      { name: "E-Signatures", free: false, starter: false, pro: true, enterprise: true },
      { name: "Document Tracker", free: false, starter: false, pro: true, enterprise: true },
      { name: "File Manager", free: "100MB", starter: "5GB", pro: "50GB", enterprise: "Unlimited" },
      { name: "PDF Generator", free: false, starter: true, pro: true, enterprise: true },
      { name: "FeatherForms - Custom Forms", free: false, starter: false, pro: true, enterprise: true },
      { name: "Contract Creator", free: false, starter: false, pro: true, enterprise: true },
      { name: "Invoice Creator", free: false, starter: true, pro: true, enterprise: true }
    ]
  },
  {
    title: "Productivity & Communication",
    features: [
      { name: "Notes & Organization", free: true, starter: true, pro: true, enterprise: true },
      { name: "To-Do List & Task Management", free: true, starter: true, pro: true, enterprise: true },
      { name: "Messages & Internal Communication", free: false, starter: false, pro: true, enterprise: true },
      { name: "Email Center", free: false, starter: false, pro: true, enterprise: true },
      { name: "AI Voice Assistant", free: false, starter: false, pro: true, enterprise: true },
      { name: "FeatherBot - AI Assistant", free: false, starter: false, pro: true, enterprise: true }
    ]
  },
  {
    title: "Analytics & Reporting",
    features: [
      { name: "Basic Analytics", free: false, starter: true, pro: true, enterprise: true },
      { name: "Advanced Business Analytics", free: false, starter: false, pro: true, enterprise: true },
      { name: "Revenue Charts", free: false, starter: false, pro: true, enterprise: true },
      { name: "Key Metrics Tracking", free: false, starter: false, pro: true, enterprise: true },
      { name: "Reports Export", free: false, starter: false, pro: true, enterprise: true },
      { name: "Custom Dashboards", free: false, starter: false, pro: false, enterprise: true }
    ]
  },
  {
    title: "Integration & API",
    features: [
      { name: "Basic Integrations", free: false, starter: false, pro: true, enterprise: true },
      { name: "API Access", free: false, starter: false, pro: "Limited", enterprise: "Full" },
      { name: "Custom Integrations", free: false, starter: false, pro: false, enterprise: true },
      { name: "Webhooks", free: false, starter: false, pro: false, enterprise: true }
    ]
  },
  {
    title: "Support & Security",
    features: [
      { name: "Support", free: "Email", starter: "Priority", pro: "24/7", enterprise: "Dedicated" },
      { name: "User Management", free: "1 user", starter: "Up to 5", pro: "Up to 25", enterprise: "Unlimited" },
      { name: "Advanced Security", free: false, starter: false, pro: false, enterprise: true },
      { name: "SLA Guarantees", free: false, starter: false, pro: false, enterprise: true },
      { name: "Custom Training", free: false, starter: false, pro: false, enterprise: true },
      { name: "White-label Options", free: false, starter: false, pro: false, enterprise: true }
    ]
  }
]

export function PricingPlans() {
  const { toast } = useToast()
  const { loading, redirectToCheckout } = useCheckout()
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
  const [remotePlans, setRemotePlans] = useState<typeof plans | null>(null)
  const [pricingConfig, setPricingConfig] = useState<any | null>(null)
  const [entitlements, setEntitlements] = useState<any | null>(null)
  const [priceMap, setPriceMap] = useState<any | null>(null)

  useEffect(() => {
    const loadFromStripe = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('list-stripe-prices')
        if (error) throw error
        if (!data?.products) return

        const formatPrice = (amount?: number, currency?: string) => {
          if (amount == null || currency == null) return null
          try {
            return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency.toUpperCase() }).format((amount || 0) / 100)
          } catch {
            return `$${((amount || 0) / 100).toFixed(0)}`
          }
        }

        const byName: Record<string, any> = {}
        for (const p of data.products) {
          byName[(p.name || '').toLowerCase()] = p
        }

        const buildPlan = (base: any, interval: 'month' | 'year') => {
          const p = byName[base.name.toLowerCase()]
          if (!p) return base
          const price = p.prices.find((pr: any) => pr.recurring && pr.recurring.interval === interval)
          if (!price) return base
          return {
            ...base,
            price: formatPrice(price.unit_amount, price.currency) || base.price,
            period: interval === 'year' ? (base.originalPrice ? 'per month, billed annually' : 'per month, billed annually') : base.period,
            stripePrice: null,
            recurring: interval !== undefined,
            annualBilling: interval === 'year',
            stripePriceId: price.id,
            currency: price.currency
          }
        }

        const updated = {
          monthly: plans.monthly.map(p => buildPlan(p, 'month')),
          annual: plans.annual.map(p => buildPlan(p, 'year')),
        } as typeof plans

        setRemotePlans(updated)
      } catch (e) {
        console.error('Stripe pricing load failed', e)
      }
    }
    loadFromStripe()
  }, [])

  useEffect(() => {
    const loadConfigsAndSync = async () => {
      try {
        // Load configs from public folder, fall back to local JSON imports
        const [pricingRes, entRes, mapRes] = await Promise.all([
          fetch('/config/pricing.json').then(r => r.ok ? r.json() : null).catch(() => null),
          fetch('/config/entitlements.json').then(r => r.ok ? r.json() : null).catch(() => null),
          fetch('/config/stripe.priceMap.json').then(r => r.ok ? r.json() : null).catch(() => null),
        ])

        const pricingData = pricingRes ?? pricingJson
        const entData = entRes ?? entitlementsJson
        const mapData = mapRes ?? priceMapJson

        if (pricingData) setPricingConfig(pricingData)
        if (entData) setEntitlements(entData)
        if (mapData) setPriceMap(mapData)

        // Sync and validate Stripe for PRO using pricing.json
        if (pricingData?.currency && pricingData?.plans?.pro?.monthly) {
          const includes = [
            'ESIGN','EasyCalc','MatTrack','CarRental','SmartSchedule','Bids','CrewControl','FeatherBudget','CoreBusinessAll'
          ]
          const { data, error } = await supabase.functions.invoke('sync-stripe-pricing', {
            body: {
              plan: 'pro',
              currency: pricingData.currency,
              amount: pricingData.plans.pro.monthly,
              includes,
            }
          })
          if (error) {
            console.error('Stripe sync/validation failed', error)
          } else {
            if (data?.status === 'ok') {
              console.log('OK: Stripe is in sync with pricing.json for PRO ($25/month).')
            }
            if (data?.priceMap?.pro) setPriceMap(data.priceMap)
          }
        }
      } catch (e) {
        console.error('Failed to load pricing configs or sync Stripe', e)
      }
    }
    loadConfigsAndSync()
  }, [])

  const handlePlanSelection = async (plan: typeof plans.monthly[0]) => {
    console.log('=== NEW CHECKOUT SYSTEM ===')
    console.log('Selected plan:', plan.name, plan.id)

    // Handle free plan
    if (plan.id === 'free') {
      toast({
        title: "Free Plan Selected",
        description: "Start creating your invoices with our free plan!",
      })
      // Navigate to signup or dashboard
      window.location.href = '/auth'
      return
    }

    // Handle Enterprise plan - redirect to contact
    if (plan.id === 'enterprise') {
      window.location.href = '/contact'
      return
    }

    // Map plan IDs to checkout plans
    let checkoutPlan: CheckoutPlan
    if (plan.id === 'pro' && billingPeriod === 'monthly') {
      checkoutPlan = 'monthly'
    } else if (plan.id === 'pro' && billingPeriod === 'annual') {
      checkoutPlan = 'yearly'
    } else {
      checkoutPlan = 'monthly' // fallback
    }

    try {
      console.log('Redirecting to checkout for plan:', checkoutPlan)
      await redirectToCheckout({ plan: checkoutPlan })
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Checkout Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive"
      })
    }
  }

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="h-4 w-4 text-green-600" />
    }
    if (value === false) {
      return <X className="h-4 w-4 text-muted-foreground" />
    }
    return <span className="text-sm text-foreground font-medium">{value}</span>
  }

const getCategoryDescription = (title: string) => {
  switch (title) {
    case "Core Business Management":
      return "Core tools to run your business day-to-day: customers, projects, quotes, invoices, and more.";
    case "Financial Tools":
      return "Track money in and out with payments, receipts, accounting, taxes, and budgeting.";
    case "Operations & Specialized Tools":
      return "Operational systems for materials, teams, scheduling, appointments, and pipeline.";
    case "Documents & Forms":
      return "Create, sign, track, and store all your documents with powerful generation tools.";
    case "Productivity & Communication":
      return "Stay organized and in sync with notes, tasks, messaging, email, and AI assistants.";
    case "Analytics & Reporting":
      return "Understand performance with dashboards, revenue charts, KPIs, and exportable reports.";
    case "Integration & API":
      return "Connect your stack with integrations, API access, webhooks, and custom workflows.";
    case "Support & Security":
      return "Access levels, support, and enterprise-grade security & compliance options.";
    default:
      return "";
  }
};

const basePlans = (remotePlans ?? plans)

const proPopular = pricingConfig?.plans?.pro?.mostPopular ?? true

const formatAmount = (amount?: number, currency?: string) => {
  if (!amount || !currency) return undefined
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency.toUpperCase() }).format((amount || 0) / 100)
  } catch {
    return `$${((amount || 0) / 100).toFixed(0)}`
  }
}

const monthly = basePlans.monthly.map((p) => {
  if (p.id === 'pro') {
    const cur = pricingConfig?.currency || 'USD'
    const priceStr = pricingConfig?.plans?.pro?.monthly
      ? (formatAmount(pricingConfig.plans.pro.monthly, cur) || p.price)
      : p.price
    return {
      ...p,
      price: priceStr,
      period: 'per month',
      popular: proPopular ? true : p.popular,
      features: (entitlements?.pro?.features ?? entitlementsJson.pro.features) || p.features,
      coreBusiness: (entitlements?.pro?.coreBusiness ?? entitlementsJson.pro.coreBusiness) || [],
      stripePriceId: priceMap?.pro?.priceId || (p as any).stripePriceId || null,
      currency: pricingConfig?.currency ? cur.toLowerCase() : (p as any).currency,
    }
  }
  // Ensure only PRO is marked popular
  if (proPopular && p.id !== 'pro') {
    return { ...p, popular: false }
  }
  return p
})

const annual = basePlans.annual.map((p) => {
  if (p.id === 'pro') {
    return {
      ...p,
      popular: proPopular ? true : p.popular,
      features: (entitlements?.pro?.features ?? entitlementsJson.pro.features) || p.features,
      coreBusiness: (entitlements?.pro?.coreBusiness ?? entitlementsJson.pro.coreBusiness) || (p as any).coreBusiness || [],
      stripePriceId: priceMap?.pro?.priceId || (p as any).stripePriceId || null,
    }
  }
  if (proPopular && p.id !== 'pro') {
    return { ...p, popular: false }
  }
  return p
})

const displayPlans = { monthly, annual }

const currentPlans = displayPlans[billingPeriod]

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 mb-16">
          {currentPlans.map((plan) => (
            <div key={plan.id} className="flex justify-center">
              <div className="w-full">
                <PricingCard 
                  plan={plan} 
                  onPlanSelect={handlePlanSelection}
                  loading={loading}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Compare all features
            </h3>
            <p className="text-muted-foreground text-lg">
              Everything you need to manage and grow your business
            </p>
          </div>

          <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-10">
              <div className="font-semibold text-foreground">Features</div>
              <div className="text-center font-semibold text-foreground">Free</div>
              <div className="text-center font-semibold text-foreground">Starter</div>
              <div className="text-center font-semibold text-foreground">Pro</div>
              <div className="text-center font-semibold text-foreground">Enterprise</div>
            </div>

            {/* Feature Categories */}
            {featureCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {/* Category Header */}
                <div className="p-4 bg-muted/20 border-b">
                  <h4 className="font-semibold text-foreground">{category.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{getCategoryDescription(category.title)}</p>
                </div>
                
                {/* Category Features */}
                {category.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="grid grid-cols-5 gap-4 p-4 border-b last:border-b-0 hover:bg-muted/20 transition-colors odd:bg-background even:bg-muted/10">
                    <div className="text-sm text-foreground">{feature.name}</div>
                    <div className="flex justify-center">{renderFeatureValue(feature.free)}</div>
                    <div className="flex justify-center">{renderFeatureValue(feature.starter)}</div>
                    <div className="flex justify-center">{renderFeatureValue(feature.pro)}</div>
                    <div className="flex justify-center">{renderFeatureValue(feature.enterprise)}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <PricingFeaturesDetails />

        <TrustIndicators />

        <PricingFAQ />
      </div>
    </div>
  )
}
