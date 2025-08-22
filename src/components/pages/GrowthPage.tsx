
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Target, Award, BarChart3, Zap, Crown, Star } from 'lucide-react'

interface GrowthPageProps {
  onNavigate: (view: string) => void
}

export function GrowthPage({ onNavigate }: GrowthPageProps) {
  const [metrics] = useState({
    novosClientes: 15,
    metaClientes: 20,
    taxaCrescimento: 23.5,
    receitaMensal: 125000,
    metaReceita: 150000,
    satisfacaoCliente: 4.8,
    projetos: 8,
    metaProjetos: 12
  })

  const [estrategias] = useState([
    {
      titulo: "Marketing Digital",
      descricao: "Campanhas no Google Ads e redes sociais",
      progresso: 75,
      roi: "245%",
      status: "Ativo"
    },
    {
      titulo: "Programa de Indicações",
      descricao: "Recompensas para clientes que indicam novos projetos",
      progresso: 60,
      roi: "180%",
      status: "Ativo"
    },
    {
      titulo: "Parcerias Estratégicas",
      descricao: "Alianças com fornecedores e profissionais",
      progresso: 40,
      roi: "120%",
      status: "Em Desenvolvimento"
    }
  ])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Centro de Crescimento</h1>
          <p className="text-muted-foreground mt-2">Acelere o crescimento do seu negócio com estratégias inteligentes</p>
        </div>
        <Button className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Nova Estratégia
        </Button>
      </div>

      {/* Métricas de Crescimento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics.novosClientes}</div>
            <Progress value={(metrics.novosClientes / metrics.metaClientes) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Meta: {metrics.metaClientes} este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.taxaCrescimento}%</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +5.2% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              R$ {(metrics.receitaMensal / 1000).toFixed(0)}k
            </div>
            <Progress value={(metrics.receitaMensal / metrics.metaReceita) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Meta: R$ {(metrics.metaReceita / 1000)}k
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{metrics.satisfacaoCliente}</div>
            <div className="flex items-center mt-1">
              {[1,2,3,4,5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-3 w-3 ${star <= metrics.satisfacaoCliente ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estratégias de Crescimento */}
      <Card>
        <CardHeader>
          <CardTitle>Estratégias de Crescimento Ativas</CardTitle>
          <CardDescription>Acompanhe o desempenho das suas iniciativas de crescimento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {estrategias.map((estrategia, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{estrategia.titulo}</h4>
                    <p className="text-sm text-muted-foreground">{estrategia.descricao}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+{estrategia.roi}</div>
                    <div className="text-xs text-muted-foreground">ROI</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Progresso</span>
                    <span className="text-sm font-medium">{estrategia.progresso}%</span>
                  </div>
                  <Progress value={estrategia.progresso} />
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      estrategia.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {estrategia.status}
                    </span>
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-24 flex-col space-y-2"
          onClick={() => onNavigate('referrals')}
        >
          <Award className="h-6 w-6" />
          <span>Programa de Indicações</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-24 flex-col space-y-2"
          onClick={() => onNavigate('analytics')}
        >
          <BarChart3 className="h-6 w-6" />
          <span>Analytics Avançado</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-24 flex-col space-y-2"
          onClick={() => onNavigate('customers')}
        >
          <Users className="h-6 w-6" />
          <span>CRM Avançado</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-24 flex-col space-y-2"
          onClick={() => onNavigate('pricing')}
        >
          <Crown className="h-6 w-6" />
          <span>Upgrade Plano</span>
        </Button>
      </div>

      {/* Dicas de Crescimento */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Dicas para Acelerar o Crescimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">📈 Foco na Retenção</h4>
              <p className="text-sm text-muted-foreground">
                Clientes satisfeitos geram 5x mais receita que novos clientes
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">🎯 Automatize Processos</h4>
              <p className="text-sm text-muted-foreground">
                Use automações para ganhar 40% mais tempo para vendas
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">💡 Diversifique Serviços</h4>
              <p className="text-sm text-muted-foreground">
                Ofereça serviços complementares para aumentar o ticket médio
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">🤝 Parcerias Estratégicas</h4>
              <p className="text-sm text-muted-foreground">
                Alianças podem triplicar sua base de clientes potenciais
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
