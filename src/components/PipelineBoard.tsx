
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
    { id: 'qualified', name: 'Qualified', color: 'bg-blue-100', count: 5 },
    { id: 'proposal', name: 'Proposal Sent', color: 'bg-yellow-100', count: 3 },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100', count: 2 },
    { id: 'closed-won', name: 'Closed Won', color: 'bg-green-100', count: 1 },
    { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-100', count: 1 }
  ]

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Silva',
      company: 'Silva Construction',
      value: 15000,
      probability: 80,
      stage: 'negotiation',
      lastContact: '2024-01-10',
      source: 'Website',
      phone: '(11) 99999-9999',
      email: 'john@silva.com',
      notes: 'Client interested in complete renovation',
      assignedTo: 'Maria Santos'
    },
    {
      id: '2',
      name: 'Ana Costa',
      company: 'Costa Enterprises',
      value: 25000,
      probability: 60,
      stage: 'proposal',
      lastContact: '2024-01-09',
      source: 'Referral',
      phone: '(11) 88888-8888',
      email: 'ana@costa.com',
      notes: 'Needs detailed quote',
      assignedTo: 'Carlos Lima'
    },
    {
      id: '3',
      name: 'Peter Oliveira',
      company: 'Oliveira Ltd',
      value: 8000,
      probability: 40,
      stage: 'qualified',
      lastContact: '2024-01-08',
      source: 'Google Ads',
      phone: '(11) 77777-7777',
      email: 'peter@oliveira.com',
      notes: 'First contact completed',
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
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
      title: "Lead Moved",
      description: `${leadData.name} was moved to ${stages.find(s => s.id === stageId)?.name}`,
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
    <div className="space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-0">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-center lg:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Sales Pipeline</h1>
          <p className="text-sm lg:text-base text-muted-foreground mt-1">
            Manage your leads and sales opportunities
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Fill in the information for the new lead in the pipeline
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Contact name" />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Company name" />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="(11) 99999-9999" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="value">Estimated Value</Label>
                    <Input id="value" type="number" placeholder="15000" />
                  </div>
                  <div>
                    <Label htmlFor="source">Source</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="google-ads">Google Ads</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="cold-call">Cold Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional information about the lead" />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button variant="outline" onClick={() => setIsAddingLead(false)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddingLead(false)} className="w-full sm:w-auto">
                    Add Lead
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs lg:text-sm text-muted-foreground">Total Leads</p>
                <p className="text-lg lg:text-2xl font-bold">{leads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs lg:text-sm text-muted-foreground">Total Value</p>
                <p className="text-lg lg:text-2xl font-bold">{formatCurrency(leads.reduce((sum, lead) => sum + lead.value, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-purple-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs lg:text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-lg lg:text-2xl font-bold">25%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs lg:text-sm text-muted-foreground">Avg Cycle</p>
                <p className="text-lg lg:text-2xl font-bold">21 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Board */}
      <div className="w-full">
        {/* Mobile view - Stack vertically */}
        <div className="block lg:hidden space-y-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              onDrop={(e) => handleDrop(e, stage.id)}
              onDragOver={handleDragOver}
            >
              <Card className={`${stage.color} border-2 border-dashed border-gray-300`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{stage.name}</CardTitle>
                    <Badge variant="secondary">{getLeadsByStage(stage.id).length}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {formatCurrency(getTotalValue(stage.id))}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getLeadsByStage(stage.id).map((lead) => (
                    <Card
                      key={lead.id}
                      className="cursor-pointer hover:shadow-md transition-shadow bg-white"
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead)}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{lead.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-green-600 text-sm">{formatCurrency(lead.value)}</p>
                            <Badge variant="secondary" className={`${getProbabilityColor(lead.probability)} text-xs`}>
                              {lead.probability}%
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{lead.assignedTo}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">Last: {new Date(lead.lastContact).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {getLeadsByStage(stage.id).length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <Target className="w-6 h-6 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No leads in this stage</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Desktop view - Horizontal scroll */}
        <div className="hidden lg:block overflow-x-auto">
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
                    <CardDescription className="text-sm">
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
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm truncate">{lead.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                              </div>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                                <MoreHorizontal className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-green-600 text-sm">{formatCurrency(lead.value)}</p>
                              <Badge variant="secondary" className={`${getProbabilityColor(lead.probability)} text-xs`}>
                                {lead.probability}%
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <User className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{lead.assignedTo}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">Last contact: {new Date(lead.lastContact).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {getLeadsByStage(stage.id).length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No leads in this stage</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedLead.name}</DialogTitle>
              <DialogDescription>{selectedLead.company}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Value</p>
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
                        <p className="text-sm text-muted-foreground">Probability</p>
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
                  <span className="text-sm break-all">{selectedLead.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Assigned to: {selectedLead.assignedTo}</span>
                </div>
              </div>
              
              <div>
                <Label>Notes</Label>
                <Textarea value={selectedLead.notes} readOnly className="mt-1" />
              </div>
              
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button className="w-full sm:w-auto">
                  Edit Lead
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
