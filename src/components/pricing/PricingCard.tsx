
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, LucideIcon, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface PricingPlan {
  id: string
  name: string
  description: string
  price: string
  period: string
  originalPrice?: string
  savings?: string
  icon: LucideIcon
  features: string[]
  buttonText: string
  popular: boolean
  color: string
  bgGradient: string
  stripePrice: number | null
  recurring?: boolean
  annualBilling?: boolean
}

interface PricingCardProps {
  plan: PricingPlan
  onPlanSelect: (plan: PricingPlan) => void
}

export function PricingCard({ plan, onPlanSelect }: PricingCardProps) {
  return (
    <div className={`relative w-full h-full ${
      plan.popular ? 'scale-105 z-10' : ''
    }`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-primary/20 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-medium">
            Most Popular
          </div>
        </div>
      )}
      
      <Card className={`
        relative h-full overflow-hidden
        ${plan.popular ? 'border-2 border-primary shadow-lg' : 'border border-border'}
        hover:shadow-lg transition-all duration-300
        bg-background
      `}>
        <CardHeader className="text-left pb-6 pt-6 px-6">
          {/* Plan Name */}
          <CardTitle className="text-xl font-semibold text-foreground mb-2">
            {plan.name}
          </CardTitle>
          
          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-foreground">{plan.price}</span>
              {plan.savings && plan.price !== "Custom" && plan.price !== "$0" && (
                <span className="text-primary text-sm font-medium bg-primary/10 px-2 py-1 rounded">
                  {plan.savings}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {plan.period}
            </p>
          </div>
          
          <CardDescription className="text-sm text-muted-foreground mb-6">
            {plan.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 px-6 pb-6 flex-1 flex flex-col">
          {/* Features List */}
          <div className="space-y-3 flex-1">
            {plan.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-2.5 w-2.5 text-green-600 font-bold" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <Button 
            className={`
              w-full py-3 text-sm font-medium rounded-lg transition-all duration-300
              ${plan.popular 
                ? 'bg-foreground text-background hover:bg-foreground/90' 
                : 'bg-transparent border border-border text-foreground hover:bg-muted'
              }
            `}
            onClick={() => onPlanSelect(plan)}
          >
            {plan.buttonText}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
