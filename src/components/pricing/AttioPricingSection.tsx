
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";
import { toast } from "sonner";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "",
    description: "For individuals and very small teams getting started",
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
    popular: false,
  },
  {
    id: "plus",
    name: "Plus",
    price: 26,
    period: "mo",
    description: "Growing teams that need automation and collaboration",
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
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    period: "",
    description: "Large organizations and regulated teams",
    features: [
      "Unlimited objects",
      "SAML/SSO and SCIM",
      "Dedicated environments & audit logs",
      "Custom workflows & approvals",
      "Flexible invoicing",
      "Dedicated CSM & onboarding"
    ],
    cta: "Talk to sales",
    popular: false,
  },
];

export function AttioPricingSection() {
  const { redirectToCheckout, loading } = useCheckout();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePlanSelect = async (planId: string) => {
    if (planId === 'free') {
      window.location.assign('/auth');
      return;
    }

    if (planId === 'enterprise') {
      window.location.assign('/contact');
      return;
    }

    if (planId === 'plus') {
      setLoadingPlan(planId);
      
      try {
        await redirectToCheckout({
          plan: 'monthly'
        });
      } catch (error) {
        console.error('Checkout error:', error);
        toast.error('Failed to start checkout process. Please try again.');
      } finally {
        setLoadingPlan(null);
      }
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-white">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-white transition-all duration-200 hover:border-gray-300 ${
                plan.popular 
                  ? 'border-blue-200 shadow-lg ring-1 ring-blue-100' 
                  : 'border-gray-200 shadow-sm'
              }`}
              style={{ 
                borderRadius: '12px', 
                padding: '32px',
                minHeight: '520px',
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-black text-gray-900 tracking-tight">
                        {plan.price === null ? "Custom" : `$${plan.price}`}
                      </span>
                      {plan.period && (
                        <span className="text-gray-500 ml-1 text-lg">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    {plan.price && plan.price > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Per user/month
                      </p>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="text-sm text-gray-600 leading-relaxed">
                      {feature}
                    </div>
                  ))}
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
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  style={{ 
                    borderRadius: '12px', 
                    height: '48px'
                  }}
                >
                  {loadingPlan === plan.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    plan.cta
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
  );
}
