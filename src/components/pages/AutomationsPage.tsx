import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Zap, Bot, Clock, TrendingUp, Settings, Play, Pause, Star, MoreHorizontal } from 'lucide-react'

interface Automation {
  id: number
  name: string
  description: string
  status: 'active' | 'paused'
  triggers: string[]
  actions: string[]
  lastRun: string
  performance: number
}

const initialAutomations: Automation[] = [
  {
    id: 1,
    name: "Welcome New Clients",
    description: "Automatically send a welcome email to new clients.",
    status: "active",
    triggers: ["New Client Added"],
    actions: ["Send Welcome Email"],
    lastRun: "2 hours ago",
    performance: 85
  },
  {
    id: 2,
    name: "Invoice Overdue Reminder",
    description: "Remind clients about overdue invoices.",
    status: "active",
    triggers: ["Invoice Overdue"],
    actions: ["Send Reminder Email"],
    lastRun: "1 day ago",
    performance: 92
  },
  {
    id: 3,
    name: "Project Update Notification",
    description: "Notify team members about project updates.",
    status: "paused",
    triggers: ["Project Updated"],
    actions: ["Send Slack Message"],
    lastRun: "1 week ago",
    performance: 78
  }
]

export function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredAutomations = automations.filter(automation =>
    automation.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleAutomationStatus = (id: number) => {
    setAutomations(automations.map(automation =>
      automation.id === id ? { ...automation, status: automation.status === 'active' ? 'paused' : 'active' } : automation
    ))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automations</h1>
          <p className="text-muted-foreground">Streamline your workflows with automated tasks</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search automations..."
              className="border rounded-md py-2 px-4 w-64 focus:outline-none focus:ring focus:border-primary"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Button>
            <Zap className="mr-2 h-4 w-4" />
            Create Automation
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All</TabsTrigger>
          <TabsTrigger value="active" onClick={() => setActiveTab("active")}>Active</TabsTrigger>
          <TabsTrigger value="paused" onClick={() => setActiveTab("paused")}>Paused</TabsTrigger>
        </TabsList>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAutomations.filter(automation => activeTab === "all" || automation.status === activeTab).map(automation => (
            <Card key={automation.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {automation.name}
                  <Badge variant={automation.status === 'active' ? 'outline' : 'secondary'}>
                    {automation.status === 'active' ? 'Active' : 'Paused'}
                  </Badge>
                </CardTitle>
                <CardDescription>{automation.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Last Run: {automation.lastRun}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Performance: {automation.performance}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <Switch id={`automation-${automation.id}`} checked={automation.status === 'active'} onCheckedChange={() => toggleAutomationStatus(automation.id)} />
                  <Button variant="ghost" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
