import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Calendar, 
  CreditCard, 
  Mail, 
  MessageSquare, 
  Map, 
  FileText, 
  Zap,
  Check,
  Settings,
  ExternalLink,
  Plus,
  Cloud,
  BarChart3,
  Send
} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Integration {
  id: string
  name: string
  description: string
  category: string
  icon: any
  connected: boolean
  popular: boolean
  apiKey?: string
  webhookUrl?: string
}

export function IntegrationsHub() {
  const { toast } = useToast()
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sincronize agendamentos e compromissos automaticamente',
      category: 'calendar',
      icon: Calendar,
      connected: false,
      popular: true
    },
    {
      id: 'outlook',
      name: 'Microsoft Outlook',
      description: 'Integração completa com Outlook e Teams',
      category: 'calendar',
      icon: Mail,
      connected: false,
      popular: true
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Processe pagamentos online de forma segura',
      category: 'payment',
      icon: CreditCard,
      connected: false,
      popular: true
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      description: 'Sincronização automática com sua contabilidade',
      category: 'accounting',
      icon: FileText,
      connected: false,
      popular: true
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Comunique-se com clientes via WhatsApp',
      category: 'communication',
      icon: MessageSquare,
      connected: false,
      popular: true
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      description: 'Otimização de rotas e localização de clientes',
      category: 'maps',
      icon: Map,
      connected: false,
      popular: true
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Conecte com mais de 5.000 aplicações',
      category: 'automation',
      icon: Zap,
      connected: false,
      popular: false
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Marketing por email e automação',
      category: 'marketing',
      icon: Mail,
      connected: false,
      popular: false
    }
  ])

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [requestForm, setRequestForm] = useState({
    integrationName: '',
    contactEmail: '',
    businessUse: '',
    description: ''
  })

  const categories = [
    { id: 'all', name: 'Todas', icon: Settings },
    { id: 'calendar', name: 'Calendário', icon: Calendar },
    { id: 'payment', name: 'Pagamentos', icon: CreditCard },
    { id: 'communication', name: 'Comunicação', icon: MessageSquare },
    { id: 'accounting', name: 'Contabilidade', icon: FileText },
    { id: 'maps', name: 'Mapas', icon: Map },
    { id: 'automation', name: 'Automação', icon: Zap }
  ]

  const [activeCategory, setActiveCategory] = useState('all')

  const filteredIntegrations = activeCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === activeCategory)

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration)
    setIsConfiguring(true)
  }

  const handleToggleConnection = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    )
    
    const integration = integrations.find(i => i.id === integrationId)
    toast({
      title: integration?.connected ? "Integração Desconectada" : "Integração Conectada",
      description: `${integration?.name} foi ${integration?.connected ? 'desconectada' : 'conectada'} com sucesso!`,
    })
  }

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send the request to your backend
    console.log('Integration request submitted:', requestForm)
    
    toast({
      title: "Solicitação Enviada!",
      description: "Sua solicitação de integração foi enviada. Entraremos em contato em breve.",
    })
    
    setShowRequestDialog(false)
    setRequestForm({
      integrationName: '',
      contactEmail: '',
      businessUse: '',
      description: ''
    })
  }

  const connectedCount = integrations.filter(i => i.connected).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Central de Integrações</h1>
          <p className="text-muted-foreground">
            Conecte suas ferramentas favoritas e automatize seu workflow
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">
            {connectedCount} conectadas
          </Badge>
          <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Solicitar Integração
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Solicitar Nova Integração</DialogTitle>
                <DialogDescription>
                  Nos informe qual integração você gostaria de ver no FeatherBiz
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="integration-name">Nome da Integração *</Label>
                  <Input
                    id="integration-name"
                    placeholder="Ex: Slack, Trello, Notion..."
                    value={requestForm.integrationName}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, integrationName: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact-email">Seu Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={requestForm.contactEmail}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="business-use">Como você usaria essa integração? *</Label>
                  <Textarea
                    id="business-use"
                    placeholder="Descreva brevemente como essa integração ajudaria seu negócio..."
                    value={requestForm.businessUse}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, businessUse: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Detalhes Adicionais</Label>
                  <Textarea
                    id="description"
                    placeholder="Funcionalidades específicas que você gostaria de ver..."
                    value={requestForm.description}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Solicitação
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowRequestDialog(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Integrações</p>
                <p className="text-2xl font-bold">{integrations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Conectadas</p>
                <p className="text-2xl font-bold">{connectedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Automações</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Sincronizações</p>
                <p className="text-2xl font-bold">847</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
              <category.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <integration.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        {integration.popular && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Switch 
                      checked={integration.connected}
                      onCheckedChange={() => handleToggleConnection(integration.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {integration.description}
                  </CardDescription>
                  <div className="flex gap-2">
                    {!integration.connected ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1" onClick={() => handleConnect(integration)}>
                            Conectar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Conectar {integration.name}</DialogTitle>
                            <DialogDescription>
                              Configure sua integração com {integration.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="api-key">Chave da API</Label>
                              <Input 
                                id="api-key" 
                                placeholder="Cole sua chave da API aqui"
                                type="password"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                className="flex-1"
                                onClick={() => handleToggleConnection(integration.id)}
                              >
                                Conectar
                              </Button>
                              <Button variant="outline" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Docs
                                </a>
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1">
                          <Settings className="w-4 h-4 mr-2" />
                          Configurar
                        </Button>
                        <Button variant="outline" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredIntegrations.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-muted-foreground">
              <Settings className="w-12 h-12 mx-auto mb-4" />
              <p>Nenhuma integração encontrada nesta categoria.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
