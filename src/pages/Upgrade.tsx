import { PricingPlans } from "@/components/PricingPlans"
import { SubscriptionStatus } from "@/components/pricing/SubscriptionStatus"
import { useSubscription } from "@/hooks/useSubscription"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Star, Zap } from "lucide-react"

interface UpgradeProps {
  onNavigate?: (view: string) => void
}

export default function Upgrade({ onNavigate }: UpgradeProps) {
  const { isSubscribed, planName } = useSubscription()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {isSubscribed ? "Manage Subscription" : "Upgrade Plan"}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isSubscribed 
              ? "Manage your subscription and enjoy all premium FeatherBiz features"
              : "Unlock the full potential of FeatherBiz with our premium plans"
            }
          </p>
        </div>

        {/* Current Subscription Status */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          <SubscriptionStatus onNavigate={onNavigate} />
        </div>

        {/* Features Overview */}
        {!isSubscribed && (
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-2">
            <Card>
              <CardHeader className="text-center sm:text-left">
                <CardTitle className="flex items-center justify-center sm:justify-start gap-2 text-lg sm:text-xl">
                  <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                  Why upgrade to Professional?
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  See everything you get with the Professional plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Unlimited Resources</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Invoices, estimates, contracts and projects without limits
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Star className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">AI Assistant</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Voice AI assistant to automate tasks
                    </p>
                  </div>
                  <div className="text-center sm:col-span-2 lg:col-span-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Premium Support</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Priority support and all integrations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pricing Plans */}
        <PricingPlans />
      </div>
    </div>
  )
}