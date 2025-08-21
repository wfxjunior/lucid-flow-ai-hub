
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  CreditCard, 
  Signature,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: LayoutDashboard,
      title: "Dashboard Intuitivo",
      description: "Gerencie todos os aspectos do seu negócio em um só lugar"
    },
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Organize informações de clientes e histórico de relacionamento"
    },
    {
      icon: FileText,
      title: "Faturas Automáticas",
      description: "Crie e envie faturas profissionais em minutos"
    },
    {
      icon: Calendar,
      title: "Agendamentos",
      description: "Sistema completo de agendamento e lembretes automáticos"
    },
    {
      icon: CreditCard,
      title: "Controle Financeiro",
      description: "Monitore pagamentos, receitas e despesas em tempo real"
    },
    {
      icon: Signature,
      title: "Assinaturas Digitais",
      description: "Assine contratos e documentos digitalmente"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">FeatherBiz</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/signin')}>
              Entrar
            </Button>
            <Button onClick={() => navigate('/signup')}>
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Gerencie seu negócio
            <span className="text-primary block">de forma simples</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A plataforma completa para pequenas e médias empresas gerenciarem 
            clientes, faturas, agendamentos e muito mais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/app')}>
              Acessar Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/pricing')}>
              Ver Preços
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tudo que você precisa</h2>
            <p className="text-muted-foreground">
              Ferramentas poderosas para fazer seu negócio crescer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8">
            Junte-se a milhares de empresas que já usam FeatherBiz
          </p>
          <Button size="lg" onClick={() => navigate('/app')}>
            Começar Agora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 FeatherBiz. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
