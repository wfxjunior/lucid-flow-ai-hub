
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Star } from "lucide-react"

const plans = [
  {
    id: "free-invoice",
    name: "Free Invoice",
    description: "Perfect for occasional invoicing",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      "5 invoices per month",
      "Basic templates",
      "Email sending",
      "Basic customer management",
      "Standard support"
    ],
    buttonText: "Start Free",
    popular: false,
    color: "bg-gray-500"
  },
  {
    id: "trial",
    name: "7-Day Free Trial",
    description: "Try all features for free",
    price: "$0",
    period: "7 days",
    icon: Star,
    features: [
      "All premium features",
      "Unlimited invoices",
      "AI voice assistant",
      "Advanced analytics",
      "Priority support",
      "All integrations"
    ],
    buttonText: "Start Trial",
    popular: true,
    color: "bg-blue-500"
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    description: "Full access, billed monthly",
    price: "$29",
    period: "month",
    icon: Crown,
    features: [
      "Unlimited invoices",
      "AI voice assistant",
      "Advanced customer management",
      "Analytics dashboard",
      "E-signatures",
      "Priority support",
      "All integrations",
      "Document tracking"
    ],
    buttonText: "Choose Monthly",
    popular: false,
    color: "bg-green-500"
  },
  {
    id: "annual",
    name: "Annual Plan",
    description: "Best value - 2 months free!",
    price: "$290",
    period: "year",
    originalPrice: "$348",
    icon: Crown,
    features: [
      "Everything in Monthly",
      "2 months free",
      "Advanced AI features",
      "White-label options",
      "Custom integrations",
      "Dedicated support",
      "Early access to new features",
      "Business consultation"
    ],
    buttonText: "Choose Annual",
    popular: false,
    color: "bg-purple-500"
  }
]

export function PricingPlans() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your business needs. Start with our free options or unlock the full power of AI automation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              plan.popular ? 'border-primary shadow-lg scale-105' : ''
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full ${plan.color} flex items-center justify-center`}>
                <plan.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">{plan.name}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">{plan.description}</CardDescription>
              <div className="mt-3 sm:mt-4">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <span className="text-2xl sm:text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <p className="text-xs sm:text-sm text-muted-foreground line-through">
                    ${plan.originalPrice}/year
                  </p>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Button 
                className={`w-full text-xs sm:text-sm ${plan.popular ? 'bg-primary' : ''}`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
              
              <div className="space-y-2 sm:space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center px-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          All plans include SSL security, automatic backups, and 99.9% uptime guarantee.
        </p>
      </div>
    </div>
  )
}
