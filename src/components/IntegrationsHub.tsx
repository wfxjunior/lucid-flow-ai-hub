
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
      description: 'Sync appointments and schedules automatically',
      category: 'calendar',
      icon: Calendar,
      connected: false,
      popular: true
    },
    {
      id: 'outlook',
      name: 'Microsoft Outlook',
      description: 'Complete integration with Outlook and Teams',
      category: 'calendar',
      icon: Mail,
      connected: false,
      popular: true
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Process online payments securely',
      category: 'payment',
      icon: CreditCard,
      connected: false,
      popular: true
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      description: 'Automatic synchronization with your accounting',
      category: 'accounting',
      icon: FileText,
      connected: false,
      popular: true
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Communicate with clients via WhatsApp',
      category: 'communication',
      icon: MessageSquare,
      connected: false,
      popular: true
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      description: 'Route optimization and client location tracking',
      category: 'maps',
      icon: Map,
      connected: false,
      popular: true
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with over 5,000 applications',
      category: 'automation',
      icon: Zap,
      connected: false,
      popular: false
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing and automation',
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
    { id: 'all', name: 'All', icon: Settings },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'payment', name: 'Payments', icon: CreditCard },
    { id: 'communication', name: 'Communication', icon: MessageSquare },
    { id: 'accounting', name: 'Accounting', icon: FileText },
    { id: 'maps', name: 'Maps', icon: Map },
    { id: 'automation', name: 'Automation', icon: Zap }
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
      title: integration?.connected ? "Integration Disconnected" : "Integration Connected",
      description: `${integration?.name} has been ${integration?.connected ? 'disconnected' : 'connected'} successfully!`,
    })
  }

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send the request to your backend
    console.log('Integration request submitted:', requestForm)
    
    toast({
      title: "Request Sent!",
      description: "Your integration request has been sent. We'll be in touch soon.",
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
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Integrations Hub</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Connect your favorite tools and automate your workflow
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Badge variant="secondary" className="text-sm w-fit">
            {connectedCount} connected
          </Badge>
          <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Request Integration
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-4 sm:mx-auto">
              <DialogHeader>
                <DialogTitle>Request New Integration</DialogTitle>
                <DialogDescription>
                  Let us know which integration you'd like to see in your platform
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="integration-name">Integration Name *</Label>
                  <Input
                    id="integration-name"
                    placeholder="e.g. Slack, Trello, Notion..."
                    value={requestForm.integrationName}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, integrationName: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact-email">Your Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={requestForm.contactEmail}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="business-use">How would you use this integration? *</Label>
                  <Textarea
                    id="business-use"
                    placeholder="Briefly describe how this integration would help your business..."
                    value={requestForm.businessUse}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, businessUse: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Specific features you'd like to see..."
                    value={requestForm.description}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button type="submit" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Send Request
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowRequestDialog(false)}
                    className="flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Integrations</p>
                <p className="text-lg sm:text-2xl font-bold">{integrations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Connected</p>
                <p className="text-lg sm:text-2xl font-bold">{connectedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Automations</p>
                <p className="text-lg sm:text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Syncs</p>
                <p className="text-lg sm:text-2xl font-bold">847</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7 gap-1">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3">
              <category.icon className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-4 sm:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                        <integration.icon className="w-5 sm:w-6 h-5 sm:h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg truncate">{integration.name}</CardTitle>
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
                      className="flex-shrink-0"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-sm">
                    {integration.description}
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {!integration.connected ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" onClick={() => handleConnect(integration)}>
                            Connect
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="mx-4 sm:mx-auto">
                          <DialogHeader>
                            <DialogTitle>Connect {integration.name}</DialogTitle>
                            <DialogDescription>
                              Configure your integration with {integration.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="api-key">API Key</Label>
                              <Input 
                                id="api-key" 
                                placeholder="Paste your API key here"
                                type="password"
                              />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button 
                                className="flex-1"
                                onClick={() => handleToggleConnection(integration.id)}
                              >
                                Connect
                              </Button>
                              <Button variant="outline" asChild className="flex-1 sm:flex-none">
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
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <Button variant="outline" className="flex-1">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="icon" className="w-full sm:w-10">
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
        <Card className="text-center py-8 sm:py-12">
          <CardContent>
            <div className="text-muted-foreground">
              <Settings className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-4" />
              <p className="text-sm sm:text-base">No integrations found in this category.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
