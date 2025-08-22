
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Zap, Clock, Mail, MessageSquare, Calendar, FileText, Users, Bot, Play, Pause, Settings } from 'lucide-react'

interface AutomationsPageProps {
  onNavigate: (view: string) => void
}

export function AutomationsPage({ onNavigate }: AutomationsPageProps) {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      nome: "Boas-vindas Novos Clientes",
      descricao: "Envia email automático quando um novo cliente é cadastrado",
      tipo: "Email",
      ativo: true,
      execucoes: 45,
      economia: "8h/semana",
      icone: Mail
    },
    {
      id: 2,
      nome: "Lembrete de Pagamento",
      descricao: "Notifica clientes sobre faturas vencendo em 3 dias",
      tipo: "Notificação",
      ativo: true,
      execucoes: 23,
      economia: "4h/semana",
      icone: Clock
    },
    {
      id: 3,
      nome: "Follow-up Propostas",
      descricao: "Acompanha propostas enviadas após 7 dias sem resposta",
      tipo: "WhatsApp",
      ativo: false,
      execucoes: 0,
      economia: "6h/semana",
      icone: MessageSquare
    },
    {
      id: 4,
      nome: "Agendamento Automático",
      descricao: "Agenda visitas técnicas baseado na disponibilidade",
      tipo: "Calendário",
      ativo: true,
      execucoes: 12,
      economia: "5h/semana",
      icone: Calendar
    },
    {
      id: 5,
      nome: "Relatórios Mensais",
      descricao: "Gera e envia relatórios financeiros automaticamente",
      tipo: "Relatório",
      ativo: true,
      execucoes: 3,
      economia: "12h/mês",
      icone: FileText
    },
    {
      id: 6,
      nome: "Segmentação de Clientes",
      descricao: "Classifica clientes automaticamente por perfil e valor",
      tipo: "CRM",
      ativo: false,
      execucoes: 0,
      economia: "3h/semana",
      icone: Users
    }
  ])

  const toggleAutomation = (id: number) => {
    setAutomations(automations.map(auto => 
      auto.id === id ? { ...auto, ativo: !auto.ativo } : auto
    ))
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Email": return "bg-blue-100 text-blue-800"
      case "WhatsApp": return "bg-green-100 text-green-800"
      case "Notificação": return "bg-yellow-100 text-yellow-800"
      case "Calendário": return "bg-purple-100 text-purple-800"
      case "Relatório": return "bg-red-100 text-red-800"
      case "CRM": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const totalEconomia = automations
    .filter(auto => auto.ativo)
    .reduce((acc, auto) => {
      const horas = parseFloat(auto.economia.split('h')[0])
      return acc + horas
    }, 0)

  const totalExecucoes = automations
    .filter(auto => auto.ativo)
    .reduce((acc, auto) => acc + auto.execucoes, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Central de Automações</h1>
          <p className="text-muted-foreground mt-2">Automatize tarefas repetitivas e ganhe tempo para focar no que importa</p>
        </div>
        <Button className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          Nova Automação
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automações Ativas</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {automations.filter(auto => auto.ativo).length}
            </div>
            <p className="text-xs text-muted-foreground">
              de {automations.length} configuradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Economizado</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalEconomia}h</div>
            <p className="text-xs text-muted-foreground">por semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Execuções</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalExecucoes}</div>
            <p className="text-xs text-muted-foreground">este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Economia Mensal</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              R$ {(totalEconomia * 4 * 50).toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">estimativa</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Automações */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Automações</CardTitle>
          <CardDescription>Gerencie todas as automações do seu negócio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automations.map((automation) => {
              const IconComponent = automation.icone
              return (
                <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${automation.ativo ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <IconComponent className={`h-5 w-5 ${automation.ativo ? 'text-green-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{automation.nome}</h4>
                      <p className="text-sm text-muted-foreground">{automation.descricao}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className={getTipoColor(automation.tipo)}>
                          {automation.tipo}
                        </Badge>
                        {automation.ativo && (
                          <>
                            <span className="text-xs text-muted-foreground">
                              {automation.execucoes} execuções
                            </span>
                            <span className="text-xs text-green-600 font-medium">
                              Economiza {automation.economia}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {automation.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                      <Switch
                        checked={automation.ativo}
                        onCheckedChange={() => toggleAutomation(automation.id)}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Templates de Automação */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            Templates Populares
          </CardTitle>
          <CardDescription>Comece rapidamente com automações pré-configuradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">🎯 Nutrição de Leads</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Série de emails para converter prospects em clientes
              </p>
              <Button variant="outline" size="sm">Usar Template</Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">📊 Relatórios Semanais</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Dashboard automatizado para equipe e clientes
              </p>
              <Button variant="outline" size="sm">Usar Template</Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">🔄 Feedback Pós-Projeto</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Coleta automática de avaliações e depoimentos
              </p>
              <Button variant="outline" size="sm">Usar Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
