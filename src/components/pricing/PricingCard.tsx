import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, LucideIcon } from "lucide-react"

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
  stripePriceId?: string | null
  currency?: string
}

interface PricingCardProps {
  plan: PricingPlan
  onPlanSelect: (plan: PricingPlan) => void
}

export function PricingCard({ plan, onPlanSelect }: PricingCardProps) {
  return (
    <div className={`relative w-full ${plan.popular ? 'scale-105 z-10' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
          <Badge className="bg-blue-600 text-white border-0 px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      
      <Card className={`
        h-full border rounded-lg transition-all duration-300 hover:shadow-lg
        ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-border'}
        bg-background
      `}>
        <CardHeader className="text-left pb-6 pt-8 px-6">
          {/* Plan Name */}
          <CardTitle className="text-xl font-semibold text-foreground mb-2">
            {plan.name}
          </CardTitle>
          
          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-foreground">{plan.price}</span>
              {plan.savings && plan.price !== "Custom" && plan.price !== "$0" && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                  {plan.savings}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {plan.period}
            </p>
          </div>
          
          {/* Description */}
          <CardDescription className="text-sm text-muted-foreground mb-6">
            {plan.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 pb-8 flex flex-col h-full">
          {/* Features List */}
          <div className="flex-1 mb-6">
            <div className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <Check className="h-2.5 w-2.5 text-green-600" />
                  </div>
                  <span className="text-muted-foreground text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
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