
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  DollarSign, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Plus,
  MoreHorizontal,
  Clock,
  TrendingUp,
  Target,
  Filter
} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Lead {
  id: string
  name: string
  company: string
  value: number
  probability: number
  stage: string
  lastContact: string
  source: string
  phone: string
  email: string
  notes: string
  assignedTo: string
}

interface Stage {
  id: string
  name: string
  color: string
  count: number
}

export function PipelineBoard() {
  const { toast } = useToast()
  
  const stages: Stage[] = [
    { id: 'lead', name: 'Leads', color: 'bg-gray-100', count: 8 },
    { id: 'qualified', name: 'Qualificados', color: 'bg-blue-100', count: 5 },
    { id: 'proposal', name: 'Proposta Enviada', color: 'bg-yellow-100', count: 3 },
    { id: 'negotiation', name: 'Negociação', color: 'bg-orange-100', count: 2 },
    { id: 'closed-won', name: 'Fechado-Ganho', color: 'bg-green-100', count: 1 },
    { id: 'closed-lost', name: 'Fechado-Perdido', color: 'bg-red-100', count: 1 }
  ]

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'João Silva',
      company: 'Silva Construções',
      value: 15000,
      probability: 80,
      stage: 'negotiation',
      lastContact: '2024-01-10',
      source: 'Website',
      phone: '(11) 99999-9999',
      email: 'joao@silva.com',
      notes: 'Cliente interessado em reforma completa',
      assignedTo: 'Maria Santos'
    },
    {
      id: '2',
      name: 'Ana Costa',
      company: 'Costa Empreendimentos',
      value: 25000,
      probability: 60,
      stage: 'proposal',
      lastContact: '2024-01-09',
      source: 'Indicação',
      phone: '(11) 88888-8888',
      email: 'ana@costa.com',
      notes: 'Precisa de orçamento detalhado',
      assignedTo: 'Carlos Lima'
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      company: 'Oliveira Ltda',
      value: 8000,
      probability: 40,
      stage: 'qualified',
      lastContact: '2024-01-08',
      source: 'Google Ads',
      phone: '(11) 77777-7777',
      email: 'pedro@oliveira.com',
      notes: 'Primeiro contato realizado',
      assignedTo: 'Maria Santos'
    }
  ])

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isAddingLead, setIsAddingLead] = useState(false)

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId)
  }

  const getTotalValue = (stageId: string) => {
    return getLeadsByStage(stageId).reduce((sum, lead) => sum + lead.value, 0)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    e.dataTransfer.setData('application/json', JSON.stringify(lead))
  }

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault()
    const leadData = JSON.parse(e.dataTransfer.getData('application/json'))
    
    setLeads(prev => 
      prev.map(lead => 
        lead.id === leadData.id 
          ? { ...lead, stage: stageId }
          : lead
      )
    )
    
    toast({
      title: "Lead Movido",
      description: `${leadData.name} foi movido para ${stages.find(s => s.id === stageId)?.name}`,
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-600'
    if (probability >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pipeline de Vendas</h1>
          <p className="text-muted-foreground">
            Gerencie seus leads e oportunidades de vendas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Lead</DialogTitle>
                <DialogDescription>
                  Preencha as informações do novo lead no pipeline
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Nome do contato" />
                  </div>
                  <div>
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" placeholder="Nome da empresa" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(11) 99999-9999" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@exemplo.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="value">Valor Estimado</Label>
                    <Input id="value" type="number" placeholder="15000" />
                  </div>
                  <div>
                    <Label htmlFor="source">Origem</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Indicação</SelectItem>
                        <SelectItem value="google-ads">Google Ads</SelectItem>
                        <SelectItem value="social-media">Redes Sociais</SelectItem>
                        <SelectItem value="cold-call">Ligação Fria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea id="notes" placeholder="Informações adicionais sobre o lead" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingLead(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsAddingLead(false)}>
                    Adicionar Lead
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total de Leads</p>
                <p className="text-2xl font-bold">{leads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">{formatCurrency(leads.reduce((sum, lead) => sum + lead.value, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                <p className="text-2xl font-bold">25%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Ciclo Médio</p>
                <p className="text-2xl font-bold">21 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Board */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="w-80 flex-shrink-0"
              onDrop={(e) => handleDrop(e, stage.id)}
              onDragOver={handleDragOver}
            >
              <Card className={`${stage.color} border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{stage.name}</CardTitle>
                    <Badge variant="secondary">{getLeadsByStage(stage.id).length}</Badge>
                  </div>
                  <CardDescription>
                    {formatCurrency(getTotalValue(stage.id))}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                  {getLeadsByStage(stage.id).map((lead) => (
                    <Card
                      key={lead.id}
                      className="cursor-pointer hover:shadow-md transition-shadow bg-white"
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead)}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-sm">{lead.name}</p>
                              <p className="text-xs text-muted-foreground">{lead.company}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-green-600">{formatCurrency(lead.value)}</p>
                            <Badge variant="secondary" className={getProbabilityColor(lead.probability)}>
                              {lead.probability}%
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>{lead.assignedTo}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Último contato: {new Date(lead.lastContact).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {getLeadsByStage(stage.id).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Nenhum lead neste estágio</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedLead.name}</DialogTitle>
              <DialogDescription>{selectedLead.company}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Valor</p>
                        <p className="text-xl font-bold">{formatCurrency(selectedLead.value)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Probabilidade</p>
                        <p className="text-xl font-bold">{selectedLead.probability}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{selectedLead.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{selectedLead.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Responsável: {selectedLead.assignedTo}</span>
                </div>
              </div>
              
              <div>
                <Label>Observações</Label>
                <Textarea value={selectedLead.notes} readOnly className="mt-1" />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button>
                  Editar Lead
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
