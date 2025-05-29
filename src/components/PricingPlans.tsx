
import { Check, Zap, Crown, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for testing invoices",
    price: "R$ 0",
    period: "/mês",
    icon: Gift,
    popular: false,
    features: [
      "Até 5 faturas por mês",
      "Gestão básica de clientes",
      "Templates de fatura básicos",
      "Suporte via email",
      "Acesso limitado ao AI Assistant"
    ],
    limitations: [
      "Sem automação de email",
      "Sem relatórios avançados",
      "Sem integração com pagamentos"
    ]
  },
  {
    id: "trial",
    name: "Teste Gratuito",
    description: "Experimente todas as funcionalidades",
    price: "R$ 0",
    period: "/7 dias",
    icon: Zap,
    popular: true,
    features: [
      "Todas as funcionalidades premium",
      "Faturas ilimitadas",
      "Automação completa",
      "Relatórios avançados",
      "AI Assistant completo",
      "Integração com Stripe",
      "E-signatures",
      "Comunicação via SMS/WhatsApp",
      "Suporte prioritário"
    ],
    limitations: []
  },
  {
    id: "monthly",
    name: "Plano Mensal",
    description: "Ideal para pequenas empresas",
    price: "R$ 97",
    period: "/mês",
    icon: Zap,
    popular: false,
    features: [
      "Faturas ilimitadas",
      "Gestão completa de clientes",
      "Automação de email",
      "Relatórios e analytics",
      "AI Assistant completo",
      "Integração com Stripe",
      "E-signatures",
      "Comunicação via SMS/WhatsApp",
      "Document tracking",
      "Suporte prioritário"
    ],
    limitations: []
  },
  {
    id: "annual",
    name: "Plano Anual",
    description: "Melhor valor - 2 meses grátis",
    price: "R$ 970",
    period: "/ano",
    originalPrice: "R$ 1.164",
    icon: Crown,
    popular: false,
    features: [
      "Todas as funcionalidades do plano mensal",
      "2 meses grátis",
      "Onboarding personalizado",
      "Suporte dedicado",
      "Backups prioritários",
      "Acesso antecipado a novas funcionalidades",
      "Consultoria mensal gratuita"
    ],
    limitations: []
  }
]

export function PricingPlans() {
  const handleSelectPlan = (planId: string) => {
    console.log(`Selected plan: ${planId}`)
    // Aqui você implementaria a lógica de seleção do plano
    // Por exemplo, redirecionar para checkout do Stripe
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Escolha seu plano</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comece gratuitamente e evolua conforme sua empresa cresce. 
          Todos os planos incluem suporte e atualizações.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Mais Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <plan.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              
              <div className="space-y-1">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="text-sm text-muted-foreground">
                    <span className="line-through">{plan.originalPrice}</span>
                    <span className="ml-2 text-green-600 font-semibold">Economize R$ 194</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.id === 'free' ? 'Começar Grátis' : 
                 plan.id === 'trial' ? 'Iniciar Teste' : 'Assinar Agora'}
              </Button>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Funcionalidades incluídas:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <div className="pt-3 border-t">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      Limitações:
                    </h4>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="text-xs text-muted-foreground">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
        <h3 className="text-xl font-semibold">Precisa de algo personalizado?</h3>
        <p className="text-muted-foreground">
          Entre em contato conosco para planos empresariais e funcionalidades específicas.
        </p>
        <Button variant="outline">
          Falar com Vendas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Check className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-semibold">Sem compromisso</h4>
          <p className="text-sm text-muted-foreground">
            Cancele a qualquer momento, sem taxas de cancelamento
          </p>
        </div>
        
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Zap className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-semibold">Ativação instantânea</h4>
          <p className="text-sm text-muted-foreground">
            Comece a usar imediatamente após a assinatura
          </p>
        </div>
        
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Crown className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-semibold">Suporte dedicado</h4>
          <p className="text-sm text-muted-foreground">
            Equipe especializada para ajudar seu negócio
          </p>
        </div>
      </div>
    </div>
  )
}
