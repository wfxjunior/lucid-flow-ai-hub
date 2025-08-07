
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
    <div className={`relative w-full ${
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
        relative aspect-square overflow-hidden
        ${plan.popular ? 'border-2 border-primary shadow-lg' : 'border border-border'}
        hover:shadow-lg transition-all duration-300
        bg-background
      `}>
        <CardHeader className="text-center pb-4 pt-6 px-4">
          {/* Plan Icon */}
          <div className="flex justify-center mb-3">
            <plan.icon className="h-8 w-8 text-primary" />
          </div>
          
          {/* Plan Name */}
          <CardTitle className="text-lg font-semibold text-foreground mb-2">
            {plan.name}
          </CardTitle>
          
          {/* Pricing */}
          <div className="mb-3">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-2xl font-bold text-foreground">{plan.price}</span>
              {plan.savings && plan.price !== "Custom" && plan.price !== "$0" && (
                <span className="text-primary text-xs font-medium bg-primary/10 px-1 py-0.5 rounded">
                  {plan.savings}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {plan.period}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="px-4 pb-4 flex flex-col h-full">
          {/* Description */}
          <CardDescription className="text-xs text-muted-foreground mb-4 text-center">
            {plan.description}
          </CardDescription>
          
          {/* Features List - Scrollable */}
          <div className="flex-1 overflow-y-auto mb-4">
            <div className="space-y-2">
              {plan.features.slice(0, 6).map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <Check className="h-1.5 w-1.5 text-green-600 font-bold" />
                  </div>
                  <span className="text-muted-foreground text-xs leading-relaxed">{feature}</span>
                </div>
              ))}
              {plan.features.length > 6 && (
                <div className="text-center text-xs text-muted-foreground">
                  +{plan.features.length - 6} more features
                </div>
              )}
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            className={`
              w-full py-2 text-xs font-medium rounded-lg transition-all duration-300
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
