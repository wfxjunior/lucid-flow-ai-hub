
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
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  const featuresLimit = 8
  const shouldShowViewMore = plan.features.length > featuresLimit
  const displayedFeatures = showAllFeatures ? plan.features : plan.features.slice(0, featuresLimit)
  const remainingCount = plan.features.length - featuresLimit

  return (
    <div 
      className={`relative group transition-all duration-300 hover:scale-105 ${
        plan.popular ? 'sm:scale-105 xl:scale-110 xl:z-10' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 z-20">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-semibold shadow-lg">
            Most Popular
          </Badge>
        </div>
      )}
      
      <Card className={`
        relative h-full overflow-hidden border-0 shadow-xl
        bg-gradient-to-br ${plan.bgGradient}
        ${plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        group-hover:shadow-2xl transition-all duration-300
      `}>
        {/* Background Pattern - Removed circles */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <CardHeader className="text-center pb-2 pt-6 sm:pt-8 px-4 sm:px-6">
            {/* Icon */}
            <div className={`
              w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl 
              bg-gradient-to-br ${plan.color} 
              flex items-center justify-center 
              shadow-lg group-hover:scale-110 transition-transform duration-300
            `}>
              <plan.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            
            {/* Plan Name */}
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              {plan.name}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              {plan.description}
            </CardDescription>
            
            {/* Pricing */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{plan.price}</span>
                <div className="text-left">
                  <span className="text-gray-500 text-sm sm:text-lg">/{plan.period}</span>
                  {plan.originalPrice && (
                    <div className="text-xs sm:text-sm text-red-500 line-through font-medium">
                      {plan.originalPrice}
                    </div>
                  )}
                </div>
              </div>
              {plan.originalPrice && (
                <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm font-medium">
                  Save $38/year
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
            {/* CTA Button */}
            <Button 
              className={`
                w-full py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 h-10 sm:h-auto
                ${plan.popular 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                  : plan.stripePrice 
                    ? 'bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400'
                }
              `}
              onClick={() => onPlanSelect(plan)}
            >
              {plan.buttonText}
            </Button>
            
            {/* Features List */}
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  What's Included
                </span>
              </div>
              <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto">
                {displayedFeatures.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600 font-bold" />
                    </div>
                    <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* View More/Less Button */}
              {shouldShowViewMore && (
                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm p-1"
                  >
                    {showAllFeatures ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-1" />
                        View Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1" />
                        View {remainingCount} More Features
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
