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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isSubscribed ? "Gerenciar Assinatura" : "Fazer Upgrade"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isSubscribed 
              ? "Gerencie sua assinatura e aproveite todos os recursos premium do FeatherBiz"
              : "Desbloqueie todo o potencial do FeatherBiz com nossos planos premium"
            }
          </p>
        </div>

        {/* Current Subscription Status */}
        <div className="max-w-2xl mx-auto mb-12">
          <SubscriptionStatus onNavigate={onNavigate} />
        </div>

        {/* Features Overview */}
        {!isSubscribed && (
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  Por que fazer upgrade para Professional?
                </CardTitle>
                <CardDescription>
                  Veja tudo que você ganha com o plano Professional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Recursos Ilimitados</h3>
                    <p className="text-sm text-muted-foreground">
                      Faturas, orçamentos, contratos e projetos sem limite
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">IA Assistente</h3>
                    <p className="text-sm text-muted-foreground">
                      Assistente de voz com IA para automatizar tarefas
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Crown className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Suporte Premium</h3>
                    <p className="text-sm text-muted-foreground">
                      Suporte prioritário e todas as integrações
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