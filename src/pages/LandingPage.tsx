
import { Button } from "@/components/ui/button"
import { UserGreeting } from "@/components/UserGreeting"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Check, ArrowRight, Users, Shield, Zap, TrendingUp, MessageSquare, Award, Feather } from "lucide-react"

const LandingPage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Gerencie seus clientes de forma eficiente com nosso sistema CRM abrangente"
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Segurança de nível empresarial com garantia de 99,9% de tempo de atividade"
    },
    {
      icon: Zap,
      title: "Potencializado por IA",
      description: "Aproveite a inteligência artificial para automatizar e otimizar seu fluxo de trabalho"
    },
    {
      icon: TrendingUp,
      title: "Dashboard de Analytics",
      description: "Obtenha insights com ferramentas poderosas de análise e relatórios"
    },
    {
      icon: MessageSquare,
      title: "Assistente de Voz",
      description: "Controle seu negócio com comandos de voz e assistência de IA"
    },
    {
      icon: Award,
      title: "Ferramentas Profissionais",
      description: "Crie faturas, contratos e documentos com facilidade"
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "CEO, TechStart",
      content: "FeatherBiz transformou nossas operações comerciais. Os recursos de IA nos pouparam incontáveis horas todas as semanas.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Freelancer",
      content: "Finalmente, uma plataforma que entende as necessidades de pequenas empresas. O sistema de faturas é incrível!",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Proprietária de Negócio",
      content: "O recurso de assistente de voz é revolucionário. Posso gerenciar tudo sem usar as mãos enquanto trabalho.",
      rating: 5
    }
  ]

  const pricingPlans = [
    {
      name: "Iniciante",
      price: "Grátis",
      description: "Perfeito para começar",
      features: ["Até 10 clientes", "Faturamento básico", "Suporte por email", "Acesso ao app móvel"]
    },
    {
      name: "Profissional",
      price: "R$ 89/mês",
      description: "Para negócios em crescimento",
      features: ["Clientes ilimitados", "Assistente de voz IA", "Analytics avançado", "Suporte prioritário", "Marca personalizada"],
      popular: true
    },
    {
      name: "Empresarial",
      price: "R$ 299/mês",
      description: "Para grandes organizações",
      features: ["Tudo do Profissional", "Solução white-label", "Acesso à API", "Suporte dedicado", "Integrações customizadas"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Feather className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-blue-600">FeatherBiz</h1>
              </div>
              <span className="ml-2 text-sm text-gray-500">Plataforma Empresarial com IA</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Acessar Dashboard
              </Button>
              <Button 
                onClick={() => navigate('/admin')}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Painel Admin
              </Button>
              <UserGreeting />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transforme Seu Negócio com
            <span className="text-blue-600"> Inteligência Artificial</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A plataforma de gestão empresarial mais avançada do mercado. 
            Gerencie clientes, crie faturas, automatize processos e faça seu negócio crescer com IA.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button 
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
            >
              Experimente Grátis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              Ver Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Empresas Ativas</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
              <div className="text-gray-600">Uptime Garantido</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Integrações</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recursos Poderosos para Seu Negócio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tudo que você precisa para gerenciar e fazer crescer seu negócio em uma só plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-xl text-gray-600">
              Milhares de empresas confiam no FeatherBiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Planos Para Todos os Tamanhos
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 ring-2 ring-blue-200' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                    onClick={() => navigate('/dashboard')}
                  >
                    {plan.price === 'Grátis' ? 'Começar Grátis' : 'Escolher Plano'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto Para Transformar Seu Negócio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de empresas que já usam o FeatherBiz para crescer
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={() => navigate('/dashboard')}
            >
              Começar Gratuitamente
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              onClick={() => navigate('/contact')}
            >
              Falar com Vendas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Feather className="h-8 w-8 text-blue-400 mr-2" />
                <h3 className="text-2xl font-bold text-blue-400">FeatherBiz</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                A plataforma de gestão empresarial mais avançada, 
                potencializada por inteligência artificial para fazer seu negócio crescer.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  Facebook
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Produto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Recursos</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Preços</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li><Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0" onClick={() => navigate('/faq')}>FAQ</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0" onClick={() => navigate('/contact')}>Contato</Button></li>
                <li><Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0" onClick={() => navigate('/feedback')}>Feedback</Button></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Documentação</a></li>
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
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
