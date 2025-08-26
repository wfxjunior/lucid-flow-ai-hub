
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";
import { toast } from "sonner";
import { PricingComparison } from "./PricingComparison";

const PRICING_COPY = {
  free: {
    price: "$0",
    blurb: "Best for individuals and very small teams getting started.",
    features: [
      "Real-time contact syncing",
      "SmartSchedule basic (single calendar)",
      "EasyCalc (quick estimates)", 
      "Invoices (limited per month)",
      "E-sign (limited docs per month)",
      "Basic CRM (contacts, notes)",
      "Limited users/seats"
    ]
  },
  pro: {
    monthlyPrice: "$19",
    annualPrice: "$190",
    blurb: "Best for small teams that need automation and collaboration.",
    features: [
      "Everything in Free, plus:",
      "Unlimited invoices & estimates",
      "SmartSchedule team (up to 5 calendars)",
      "EasyCalc Pro (templates & cost libraries)",
      "AI Voice (quotes only)",
      "E-sign up to 50 docs/month",
      "Receipts & basic reports"
    ]
  },
  plus: {
    monthlyPrice: "$26",
    annualPrice: "$260",
    blurb: "For growing teams that need scale and advanced tooling.",
    features: [
      "Everything in Pro, plus:",
      "Unlimited E-sign",
      "AI Voice (quotes & follow-ups)",
      "Shared pipelines",
      "Advanced reports",
      "Priority support (business hours)"
    ]
  },
  enterprise: {
    price: "Custom",
    blurb: "For large organizations and regulated teams.",
    features: [
      "Unlimited objects",
      "SAML/SSO and SCIM",
      "Dedicated environments & audit logs",
      "Custom workflows & approvals",
      "Flexible invoicing",
      "Dedicated CSM & onboarding"
    ]
  }
};

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M13.5 4.5L6 12L2.5 8.5" 
      stroke="#1E293B" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      strokeOpacity="0.7"
    />
  </svg>
);

// Helper function to calculate discount percentage
const calculateDiscount = (monthlyPrice: string, annualPrice: string) => {
  const monthly = parseFloat(monthlyPrice.replace('$', ''));
  const annual = parseFloat(annualPrice.replace('$', ''));
  const monthlyTotal = monthly * 12;
  const savings = monthlyTotal - annual;
  const discountPercentage = Math.round((savings / monthlyTotal) * 100);
  return discountPercentage;
};

export function AttioPricingSection() {
  const { redirectToCheckout, loading } = useCheckout();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const handlePlanSelect = async (planId: string) => {
    console.log('Plan selected:', planId);
    
    if (planId === 'free') {
      console.log('Redirecting to auth for free plan');
      window.location.assign('/auth');
      return;
    }

    if (planId === 'enterprise') {
      console.log('Redirecting to contact for enterprise plan');
      window.location.assign('/contact');
      return;
    }

    if (planId === 'pro' || planId === 'plus') {
      setLoadingPlan(planId);
      
      try {
        console.log(`Starting checkout for ${planId} plan`);
        await redirectToCheckout({
          plan: billingPeriod === 'annual' ? 'yearly' : 'monthly'
        });
      } catch (error) {
        console.error('Checkout error:', error);
        toast.error('Failed to start checkout process. Please try again.');
      } finally {
        setLoadingPlan(null);
      }
    }
  };

  const getPrice = (plan: keyof typeof PRICING_COPY) => {
    if (plan === 'free' || plan === 'enterprise') {
      return PRICING_COPY[plan].price;
    }
    
    const planData = PRICING_COPY[plan];
    return billingPeriod === 'monthly' 
      ? planData.monthlyPrice 
      : planData.annualPrice;
  };

  const getPeriodLabel = (plan: keyof typeof PRICING_COPY) => {
    if (plan === 'free' || plan === 'enterprise') {
      return '';
    }
    return billingPeriod === 'monthly' ? '/mo' : '/yr';
  };

  const plans = [
    { id: 'free', name: 'Free', popular: false },
    { id: 'pro', name: 'Pro', popular: false },
    { id: 'plus', name: 'Plus', popular: true },
    { id: 'enterprise', name: 'Enterprise', popular: false }
  ] as const;

  const getCTA = (planId: string) => {
    switch (planId) {
      case 'free': return 'Start for free';
      case 'pro': return 'Continue with Pro';
      case 'plus': return 'Continue with Plus';
      case 'enterprise': return 'Talk to sales';
      default: return 'Get started';
    }
  };

  return (
    <>
      <section id="pricing" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pricing built for every team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent, simple, and flexible pricing. No hidden fees.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-pressed={billingPeriod === 'monthly'}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  billingPeriod === 'annual'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-pressed={billingPeriod === 'annual'}
              >
                Annual
                {billingPeriod === 'annual' && (
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 text-xs">
                    Save up to 17%
                  </Badge>
                )}
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative bg-white transition-all duration-200 hover:border-blue-600 hover:shadow-sm ${
                  plan.popular 
                    ? 'border-blue-200 shadow-sm' 
                    : 'border-gray-200'
                }`}
                style={{ 
                  borderRadius: '12px', 
                  padding: '32px',
                  minHeight: '600px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex-1 space-y-6">
                  {/* Plan Header */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="mb-4">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-black text-gray-900 tracking-tight">
                          {getPrice(plan.id)}
                        </span>
                        <span className="text-gray-500 ml-1 text-lg">
                          {getPeriodLabel(plan.id)}
                        </span>
                      </div>
                      {/* Show discount percentage for paid plans when annual is selected */}
                      {billingPeriod === 'annual' && (plan.id === 'pro' || plan.id === 'plus') && (
                        <div className="mt-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            Save {calculateDiscount(PRICING_COPY[plan.id].monthlyPrice, PRICING_COPY[plan.id].annualPrice)}%
                          </Badge>
                        </div>
                      )}
                    </div>
                    <p className="plan-blurb text-gray-600 text-sm leading-relaxed opacity-100">
                      {PRICING_COPY[plan.id].blurb}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <ul className="plan-list space-y-3 opacity-100">
                      {PRICING_COPY[plan.id].features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                          <CheckIcon />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={loading || loadingPlan === plan.id}
                    variant={plan.popular ? 'default' : 'outline'}
                    className={`w-full font-semibold text-base ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-0' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                    style={{ 
                      borderRadius: '8px', 
                      height: '48px'
                    }}
                    role="button"
                    aria-label={`${getCTA(plan.id)} for ${plan.name} plan`}
                  >
                    {loadingPlan === plan.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      getCTA(plan.id)
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500">
              All plans include unlimited integrations and 99.9% uptime SLA
            </p>
          </div>
        </div>
      </section>

      {/* Plan Comparison Section */}
      <PricingComparison />
    </>
  );
}
