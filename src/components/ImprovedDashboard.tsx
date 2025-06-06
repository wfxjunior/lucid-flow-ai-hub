
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign, 
  FileText,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  ArrowRight,
  Zap
} from 'lucide-react'
import { StatsCard } from './StatsCard'

interface DashboardWidget {
  id: string
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: any
  color: string
  onClick?: () => void
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  color: string
  onClick: () => void
}

interface RecentActivity {
  id: string
  type: string
  title: string
  description: string
  time: string
  status: 'completed' | 'pending' | 'in_progress'
  priority: 'high' | 'medium' | 'low'
}

export function ImprovedDashboard({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  const widgets: DashboardWidget[] = [
    {
      id: 'revenue',
      title: 'Receita Total',
      value: 'R$ 45.230',
      change: '+12.5% vs mês anterior',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-green-600',
      onClick: () => onNavigate('analytics')
    },
    {
      id: 'customers',
      title: 'Clientes Ativos',
      value: '234',
      change: '+8 novos esta semana',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-600',
      onClick: () => onNavigate('customer-management')
    },
    {
      id: 'projects',
      title: 'Projetos em Andamento',
      value: '18',
      change: '3 finalizando hoje',
      changeType: 'neutral',
      icon: FileText,
      color: 'text-purple-600',
      onClick: () => onNavigate('projects')
    },
    {
      id: 'appointments',
      title: 'Agendamentos Hoje',
      value: '7',
      change: '2 confirmados recentemente',
      changeType: 'positive',
      icon: Calendar,
      color: 'text-orange-600',
      onClick: () => onNavigate('appointments')
    }
  ]

  const quickActions: QuickAction[] = [
    {
      id: 'create-invoice',
      title: 'Criar Fatura',
      description: 'Gere uma nova fatura rapidamente',
      icon: FileText,
      color: 'bg-blue-500',
      onClick: () => onNavigate('invoice-creator')
    },
    {
      id: 'add-customer',
      title: 'Novo Cliente',
      description: 'Adicionar cliente ao sistema',
      icon: Users,
      color: 'bg-green-500',
      onClick: () => onNavigate('customer-management')
    },
    {
      id: 'schedule-appointment',
      title: 'Agendar Visita',
      description: 'Marcar compromisso com cliente',
      icon: Calendar,
      color: 'bg-purple-500',
      onClick: () => onNavigate('appointments')
    },
    {
      id: 'create-estimate',
      title: 'Novo Orçamento',
      description: 'Criar orçamento personalizado',
      icon: DollarSign,
      color: 'bg-orange-500',
      onClick: () => onNavigate('estimates')
    }
  ]

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'invoice',
      title: 'Fatura #INV-2024-001 paga',
      description: 'Cliente João Silva - R$ 2.500,00',
      time: '2 horas atrás',
      status: 'completed',
      priority: 'high'
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Visita agendada',
      description: 'Maria Santos - Amanhã às 14:00',
      time: '4 horas atrás',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'estimate',
      title: 'Orçamento enviado',
      description: 'Empresa ABC Corp - R$ 15.000,00',
      time: '1 dia atrás',
      status: 'in_progress',
      priority: 'high'
    },
    {
      id: '4',
      type: 'customer',
      title: 'Novo cliente cadastrado',
      description: 'Pedro Oliveira - Setor Residencial',
      time: '2 dias atrás',
      status: 'completed',
      priority: 'low'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'in_progress': return <AlertCircle className="w-4 h-4 text-blue-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está um resumo do seu negócio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo
          </Button>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {widgets.map((widget, index) => (
          <Card 
            key={widget.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={widget.onClick}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
              <widget.icon className={`h-4 w-4 ${widget.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{widget.value}</div>
              <p className={`text-xs ${widget.changeType === 'positive' ? 'text-green-600' : widget.changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground'}`}>
                {widget.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>
            Acesse rapidamente as funcionalidades mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-md transition-shadow"
                onClick={action.onClick}
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>Últimas atualizações do seu negócio</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('analytics')}>
              Ver Todas
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className={`flex items-start gap-3 p-3 rounded-lg border-l-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer ${getPriorityColor(activity.priority)}`}
              >
                {getStatusIcon(activity.status)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Mensal</CardTitle>
            <CardDescription>Acompanhe o crescimento do seu negócio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Meta Mensal</span>
                <span className="text-sm text-muted-foreground">R$ 50.000</span>
              </div>
              <Progress value={90} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>R$ 45.230 alcançados</span>
                <span>90% da meta</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">12</p>
                  <p className="text-xs text-muted-foreground">Novos Clientes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">34</p>
                  <p className="text-xs text-muted-foreground">Projetos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">89%</p>
                  <p className="text-xs text-muted-foreground">Satisfação</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Features */}
      <Card className="border-dashed border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Novidades em Breve
          </CardTitle>
          <CardDescription>
            Funcionalidades que estão sendo desenvolvidas para você
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
              <div className="p-2 bg-blue-500 rounded-lg text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Agendamento Online</p>
                <p className="text-xs text-muted-foreground">Links públicos para clientes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
              <div className="p-2 bg-green-500 rounded-lg text-white">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">WhatsApp Integration</p>
                <p className="text-xs text-muted-foreground">Comunicação direta</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
              <div className="p-2 bg-purple-500 rounded-lg text-white">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Otimização de Rotas</p>
                <p className="text-xs text-muted-foreground">Google Maps integrado</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
