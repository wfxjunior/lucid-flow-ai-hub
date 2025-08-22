
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Zap, Mail, Calendar, Receipt, MessageSquare, Clock, Settings, Plus } from 'lucide-react'

interface AutomationsPageProps {
  onNavigate: (view: string) => void
}

export function AutomationsPage({ onNavigate }: AutomationsPageProps) {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Invoice Reminders',
      description: 'Automatically send payment reminders for overdue invoices',
      type: 'email',
      status: 'active',
      enabled: true,
      triggers: 'Overdue invoices',
      actions: 'Send reminder email',
      frequency: 'Daily at 9:00 AM',
      lastRun: '2024-02-15T09:00:00Z',
      executions: 42
    },
    {
      id: 2,
      name: 'Welcome Email Sequence',
      description: 'Send welcome emails to new customers',
      type: 'email',
      status: 'active',
      enabled: true,
      triggers: 'New customer signup',
      actions: 'Send welcome email series',
      frequency: 'Immediate + follow-ups',
      lastRun: '2024-02-14T14:30:00Z',
      executions: 28
    },
    {
      id: 3,
      name: 'Appointment Confirmations',
      description: 'Send automatic appointment confirmation and reminders',
      type: 'calendar',
      status: 'active',
      enabled: true,
      triggers: 'New appointment booked',
      actions: 'Send confirmation + reminder',
      frequency: '24 hours before',
      lastRun: '2024-02-14T08:00:00Z',
      executions: 15
    },
    {
      id: 4,
      name: 'Quote Follow-up',
      description: 'Follow up on quotes that haven\'t been responded to',
      type: 'sales',
      status: 'paused',
      enabled: false,
      triggers: 'Quote sent + 3 days',
      actions: 'Send follow-up message',
      frequency: 'One-time',
      lastRun: '2024-02-10T16:00:00Z',
      executions: 8
    },
    {
      id: 5,
      name: 'Monthly Reports',
      description: 'Generate and send monthly business reports',
      type: 'reporting',
      status: 'active',
      enabled: true,
      triggers: 'First day of month',
      actions: 'Generate & email report',
      frequency: 'Monthly',
      lastRun: '2024-02-01T07:00:00Z',
      executions: 3
    }
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'calendar': return <Calendar className="h-4 w-4" />
      case 'sales': return <MessageSquare className="h-4 w-4" />
      case 'reporting': return <Receipt className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleAutomation = (id: number) => {
    setAutomations(automations.map(automation => 
      automation.id === id 
        ? { 
            ...automation, 
            enabled: !automation.enabled,
            status: !automation.enabled ? 'active' : 'paused'
          }
        : automation
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Automations</h1>
          <p className="text-muted-foreground mt-2">Automate repetitive tasks and streamline your workflow</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Automation
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automations.filter(a => a.enabled).length}</div>
            <p className="text-xs text-muted-foreground">
              of {automations.length} total automations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automations.reduce((sum, a) => sum + a.executions, 0)}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">
              Estimated weekly savings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <Card key={automation.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {getTypeIcon(automation.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{automation.name}</CardTitle>
                    <CardDescription className="mt-1">{automation.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(automation.status)}>
                    {automation.status.charAt(0).toUpperCase() + automation.status.slice(1)}
                  </Badge>
                  <Switch
                    checked={automation.enabled}
                    onCheckedChange={() => toggleAutomation(automation.id)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Trigger</p>
                  <p className="text-foreground">{automation.triggers}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Action</p>
                  <p className="text-foreground">{automation.actions}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Frequency</p>
                  <p className="text-foreground">{automation.frequency}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Last Run</p>
                  <p className="text-foreground">{formatDate(automation.lastRun)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  Executed {automation.executions} times this month
                </span>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
