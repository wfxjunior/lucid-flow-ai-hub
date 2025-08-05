
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
      className={`relative group transition-all duration-300 hover:scale-105 w-full h-full ${
        plan.popular ? 'sm:scale-105 xl:scale-110 xl:z-10' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-2 sm:-top-4 lg:-top-6 left-1/2 transform -translate-x-1/2 z-20">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 sm:px-3 lg:px-6 py-1 sm:py-2 text-xs font-semibold shadow-lg">
            Most Popular
          </Badge>
        </div>
      )}
      
      <Card className={`
        relative h-full overflow-hidden border-0 shadow-xl
        bg-gradient-to-br ${plan.bgGradient}
        ${plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        group-hover:shadow-2xl transition-all duration-300
        flex flex-col
      `}>
        {/* Background Pattern - Removed circles */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <CardHeader className="text-center pb-2 pt-4 sm:pt-6 lg:pt-8 px-3 sm:px-4 lg:px-6">
            {/* Icon */}
            <div className={`
              w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-lg sm:rounded-xl lg:rounded-2xl 
              bg-gradient-to-br ${plan.color} 
              flex items-center justify-center 
              shadow-lg group-hover:scale-110 transition-transform duration-300
            `}>
              <plan.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
            </div>
            
            {/* Plan Name */}
            <CardTitle className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              {plan.name}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 lg:mb-6 leading-relaxed px-2">
              {plan.description}
            </CardDescription>
            
            {/* Pricing */}
            <div className="mb-3 sm:mb-4 lg:mb-6">
              <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">{plan.price}</span>
                <div className="text-left">
                  <span className="text-gray-500 text-xs sm:text-sm lg:text-lg">/{plan.period}</span>
                  {plan.originalPrice && (
                    <div className="text-xs sm:text-sm text-red-500 line-through font-medium">
                      {plan.originalPrice}
                    </div>
                  )}
                </div>
              </div>
              {plan.originalPrice && (
                <div className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                  Save $38/year
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3 sm:space-y-4 lg:space-y-6 px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6 lg:pb-8 flex-1 flex flex-col">
            {/* CTA Button */}
            <Button 
              className={`
                w-full py-2 sm:py-3 text-xs sm:text-sm lg:text-lg font-semibold rounded-lg transition-all duration-300 h-9 sm:h-10 lg:h-auto
                ${plan.popular 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                  : plan.stripePrice 
                    ? 'bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400'
                }
              `}
              onClick={() => onPlanSelect(plan)}
              disabled={false}
            >
              {plan.buttonText}
            </Button>
            
            {/* Features List */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <div className="text-center">
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  What's Included
                </span>
              </div>
              <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 max-h-48 sm:max-h-56 lg:max-h-64 overflow-y-auto">
                {displayedFeatures.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 text-green-600 font-bold" />
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
                    className="text-blue-600 hover:text-blue-800 text-xs p-1 h-auto"
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
