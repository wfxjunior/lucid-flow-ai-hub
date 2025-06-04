
import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Check, ArrowRight, Users, Shield, Zap, TrendingUp, MessageSquare, Award, Feather, Play, ChevronRight, Building2, Globe, Smartphone, BarChart3, Clock, CheckCircle2 } from "lucide-react"

const LandingPage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Gerencie seus clientes de forma eficiente com nosso sistema CRM abrangente",
      highlight: "CRM Completo"
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Segurança de nível empresarial com garantia de 99,9% de tempo de atividade",
      highlight: "99.9% Uptime"
    },
    {
      icon: Zap,
      title: "Potencializado por IA",
      description: "Aproveite a inteligência artificial para automatizar e otimizar seu fluxo de trabalho",
      highlight: "IA Integrada"
    },
    {
      icon: TrendingUp,
      title: "Dashboard de Analytics",
      description: "Obtenha insights com ferramentas poderosas de análise e relatórios",
      highlight: "Analytics Avançado"
    },
    {
      icon: MessageSquare,
      title: "Assistente de Voz",
      description: "Controle seu negócio com comandos de voz e assistência de IA",
      highlight: "Comando de Voz"
    },
    {
      icon: Award,
      title: "Ferramentas Profissionais",
      description: "Crie faturas, contratos e documentos com facilidade",
      highlight: "Documentos Pro"
    }
  ]

  const useCases = [
    {
      icon: Building2,
      title: "Empresas",
      description: "Gerencie operações complexas com ferramentas empresariais",
      metrics: "500+ empresas"
    },
    {
      icon: Users,
      title: "Startups",
      description: "Escale rapidamente com automação inteligente",
      metrics: "1000+ startups"
    },
    {
      icon: Globe,
      title: "Freelancers",
      description: "Organize projetos e clientes em um só lugar",
      metrics: "5000+ freelancers"
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "CEO, TechStart",
      content: "FeatherBiz transformou nossas operações comerciais. Os recursos de IA nos pouparam incontáveis horas todas as semanas.",
      rating: 5,
      company: "TechStart",
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Freelancer",
      content: "Finalmente, uma plataforma que entende as necessidades de pequenas empresas. O sistema de faturas é incrível!",
      rating: 5,
      company: "Independente",
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Proprietária de Negócio",
      content: "O recurso de assistente de voz é revolucionário. Posso gerenciar tudo sem usar as mãos enquanto trabalho.",
      rating: 5,
      company: "Costa & Cia",
      avatar: "AC"
    }
  ]

  const pricingPlans = [
    {
      name: "Iniciante",
      price: "Grátis",
      period: "",
      description: "Perfeito para começar",
      features: ["Até 10 clientes", "Faturamento básico", "Suporte por email", "Acesso ao app móvel"],
      cta: "Começar Grátis",
      popular: false
    },
    {
      name: "Profissional",
      price: "R$ 89",
      period: "/mês",
      description: "Para negócios em crescimento",
      features: ["Clientes ilimitados", "Assistente de voz IA", "Analytics avançado", "Suporte prioritário", "Marca personalizada"],
      cta: "Teste Grátis 14 dias",
      popular: true
    },
    {
      name: "Empresarial",
      price: "R$ 299",
      period: "/mês",
      description: "Para grandes organizações",
      features: ["Tudo do Profissional", "Solução white-label", "Acesso à API", "Suporte dedicado", "Integrações customizadas"],
      cta: "Falar com Vendas",
      popular: false
    }
  ]

  const integrations = [
    { name: "Stripe", logo: "💳" },
    { name: "WhatsApp", logo: "💬" },
    { name: "Gmail", logo: "📧" },
    { name: "Slack", logo: "💼" },
    { name: "Zoom", logo: "📹" },
    { name: "Dropbox", logo: "📁" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Feather className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">FeatherBiz</h1>
              </div>
              <span className="ml-3 text-sm text-gray-500 hidden md:block">Plataforma Empresarial com IA</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Recursos</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Preços</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Clientes</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="ghost"
                className="text-gray-600 hover:text-blue-600"
              >
                Entrar
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Experimente Grátis
              </Button>
              <UserGreeting />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Novo: Assistente de IA com comandos de voz
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transforme Seu Negócio com
              <span className="text-blue-600 block"> Inteligência Artificial</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              A única plataforma que você precisa para gerenciar clientes, criar documentos, 
              automatizar processos e fazer seu negócio crescer com o poder da IA.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg h-14"
              >
                <Play className="w-5 h-5 mr-2" />
                Experimente Grátis por 14 dias
              </Button>
              <Button 
                onClick={() => navigate('/admin')}
                variant="outline" 
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg h-14"
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demo ao Vivo
              </Button>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                Sem cartão de crédito
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                Configuração em 2 minutos
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                Cancele a qualquer momento
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Empresas Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Garantido</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9★</div>
              <div className="text-gray-600">Avaliação dos Usuários</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">Confiado por milhares de empresas</p>
          <div className="flex justify-center items-center gap-12 opacity-60">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-2xl">{integration.logo}</span>
                <span className="font-medium text-gray-700">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tudo que Você Precisa em Uma Plataforma
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde gestão de clientes até automação com IA, tenha todas as ferramentas 
              necessárias para fazer seu negócio prosperar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-200 cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="flex items-center mt-4 text-blue-600 group-hover:text-blue-700">
                    <span className="text-sm font-medium">Saiba mais</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Para Qualquer Tipo de Negócio
            </h2>
            <p className="text-xl text-gray-600">
              Seja você uma startup, empresa ou freelancer, temos a solução ideal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-gray-200">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <useCase.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">{useCase.title}</CardTitle>
                  <div className="text-sm text-blue-600 font-medium">{useCase.metrics}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-lg">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Amado por Milhares de Empresas
            </h2>
            <p className="text-xl text-gray-600">
              Veja o que nossos clientes estão dizendo sobre o FeatherBiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-xs text-blue-600">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Preços Simples e Transparentes
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Escolha o plano ideal para seu negócio. Sem taxas ocultas.
            </p>
            <div className="inline-flex bg-gray-100 p-1 rounded-lg">
              <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm">
                Mensal
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500">
                Anual (20% off)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 ring-2 ring-blue-200 scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <CardDescription className="text-lg mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full py-3 text-lg ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'}`}
                    onClick={() => navigate('/dashboard')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Precisa de algo personalizado?</p>
            <Button 
              variant="outline"
              onClick={() => navigate('/contact')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Falar com Vendas
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto Para Revolucionar Seu Negócio?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Junte-se a milhares de empresas que já usam o FeatherBiz para crescer. 
            Comece gratuitamente hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg h-14"
              onClick={() => navigate('/dashboard')}
            >
              <Play className="w-5 h-5 mr-2" />
              Comece Grátis Agora
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg h-14"
              onClick={() => navigate('/contact')}
            >
              Agendar Demo
            </Button>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            ✓ Teste grátis por 14 dias ✓ Sem cartão de crédito ✓ Suporte 24/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <Feather className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">FeatherBiz</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                A plataforma de gestão empresarial mais avançada, 
                potencializada por inteligência artificial para fazer seu negócio crescer.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  Facebook
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">Produto</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">Suporte</h4>
              <ul className="space-y-3">
                <li><Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto" onClick={() => navigate('/faq')}>FAQ</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto" onClick={() => navigate('/contact')}>Contato</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto" onClick={() => navigate('/feedback')}>Feedback</Button></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentação</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FeatherBiz. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="w-48">
                <LanguageSelector />
              </div>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
