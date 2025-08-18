import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { 
  Zap, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  DollarSign,
  Mail,
  Smartphone,
  CreditCard
} from "lucide-react"

const metrics = [
  {
    title: "Active Automations",
    value: "2",
    subtitle: "Currently running",
    icon: Zap
  },
  {
    title: "Messages Sent Today",
    value: "47",
    subtitle: "Across all channels",
    icon: MessageSquare
  },
  {
    title: "Avg Response Time",
    value: "2.3min",
    subtitle: "Average response time",
    icon: Clock
  },
  {
    title: "Success Rate",
    value: "89%",
    subtitle: "Automation success",
    icon: CheckCircle
  }
]

const automations = [
  {
    id: 1,
    title: "Late Payment Playbook",
    description: "Automated reminder sequence for overdue rent with payment plan options",
    trigger: "invoice.due_at + 1d AND status!=paid",
    steps: [
      { step: "D+1", action: "Send friendly reminder (SMS+Email)" },
      { step: "D+3", action: "Offer one-click payment plan" },
      { step: "D+5", action: "Apply late fee if policy allows" },
      { step: "D+7", action: "Notify owner; flag as 'at-risk'" },
      { step: "D+10", action: "Generate Pay or Quit draft via Copilot" }
    ],
    metrics: [
      { label: "On-time %", value: "94%" },
      { label: "Promise-to-Pay conversions", value: "67%" },
      { label: "Avg days past due", value: "4.2" }
    ],
    channels: ["SMS", "Email", "Stripe"],
    isActive: true,
    status: "Active"
  },
  {
    id: 2,
    title: "New Lead → Tour Booking",
    description: "Convert incoming leads into scheduled tours automatically",
    trigger: "lead.source=website AND lead.interest=tour",
    steps: [
      { step: "D+0", action: "Welcome message + availability" },
      { step: "D+1", action: "Follow-up with calendar link" },
      { step: "D+3", action: "Property highlights + virtual tour" },
      { step: "D+7", action: "Special offer if no response" }
    ],
    metrics: [
      { label: "Tour booking rate", value: "78%" },
      { label: "Response time", value: "1.2min" },
      { label: "Conversion to lease", value: "23%" }
    ],
    channels: ["SMS", "Email"],
    isActive: true,
    status: "Active"
  }
]

interface AutomationsPageProps {
  onNavigate: (view: string) => void
}

export function AutomationsPage({ onNavigate }: AutomationsPageProps) {
  const handleCreateAutomation = () => {
    console.log("Create automation clicked")
  }

  const handleToggleAutomation = (id: number, active: boolean) => {
    console.log(`Toggle automation ${id} to ${active}`)
  }

  return (
    <CleanPageLayout
      title="Automations & Playbooks"
      subtitle="Intelligent workflows that run on autopilot"
      actionLabel="Autopilot"
      onActionClick={handleCreateAutomation}
      metrics={metrics}
    >
      {/* Active Playbooks Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Active Playbooks
          </h2>
        </div>

        <div className="space-y-6">
          {automations.map((automation) => (
            <Card key={automation.id} className="bg-card border border-border rounded-2xl">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-muted rounded-xl">
                        <DollarSign className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-foreground">
                            {automation.title}
                          </h3>
                          <Badge 
                            variant={automation.status === 'Active' ? 'success' : 'secondary'}
                            className="text-xs"
                          >
                            ▶ {automation.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground max-w-2xl">
                          {automation.description}
                        </p>
                        
                        <div className="text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1 rounded-lg inline-block">
                          Trigger: {automation.trigger}
                        </div>
                      </div>
                    </div>
                    
                    <Switch 
                      checked={automation.isActive}
                      onCheckedChange={(checked) => handleToggleAutomation(automation.id, checked)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Automation Steps */}
                    <div className="lg:col-span-1">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Automation Steps
                      </h4>
                      <div className="space-y-2">
                        {automation.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3 text-sm">
                            <Badge variant="outline" className="text-xs font-mono shrink-0 bg-muted">
                              {step.step}
                            </Badge>
                            <span className="text-foreground">{step.action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="lg:col-span-1">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Key Metrics
                      </h4>
                      <div className="space-y-3">
                        {automation.metrics.map((metric, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-foreground">{metric.label}</span>
                            <span className="text-sm font-semibold text-primary ml-auto">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Communication Channels */}
                    <div className="lg:col-span-1">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Communication Channels
                      </h4>
                      <div className="space-y-2">
                        {automation.channels.map((channel, index) => {
                          const getChannelIcon = (channel: string) => {
                            switch (channel.toLowerCase()) {
                              case 'sms': return <Smartphone className="h-4 w-4" />
                              case 'email': return <Mail className="h-4 w-4" />
                              case 'stripe': return <CreditCard className="h-4 w-4" />
                              default: return <MessageSquare className="h-4 w-4" />
                            }
                          }
                          
                          return (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              {getChannelIcon(channel)}
                              <span className="text-foreground">{channel}</span>
                            </div>
                          )
                        })}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => console.log('View analytics')}
                      >
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CleanPageLayout>
  )
}