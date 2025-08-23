import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Calendar, 
  FileText, 
  DollarSign, 
  Users, 
  Clock,
  Play,
  Pause,
  Settings,
  Plus,
  TrendingUp,
  AlertCircle
} from "lucide-react"

interface AutomationsPageProps {
  onNavigate: (view: string) => void
}

export function AutomationsPage({ onNavigate }: AutomationsPageProps) {
  const automations = [
    {
      id: 1,
      name: "Welcome Email Sequence",
      description: "Send a series of welcome emails to new customers",
      category: "Email Marketing",
      status: "active",
      triggers: 125,
      lastRun: "2 hours ago",
      icon: Mail,
      color: "blue"
    },
    {
      id: 2,
      name: "Invoice Reminders",
      description: "Automatically remind customers about overdue invoices",
      category: "Billing",
      status: "paused",
      triggers: 68,
      lastRun: "1 day ago",
      icon: FileText,
      color: "orange"
    },
    {
      id: 3,
      name: "Appointment Confirmation",
      description: "Confirm upcoming appointments with clients via SMS",
      category: "Customer Service",
      status: "active",
      triggers: 210,
      lastRun: "30 minutes ago",
      icon: MessageSquare,
      color: "green"
    },
    {
      id: 4,
      name: "Lead Follow-up",
      description: "Follow up with new leads after form submission",
      category: "Sales",
      status: "draft",
      triggers: 0,
      lastRun: "Never",
      icon: Users,
      color: "purple"
    }
  ]

  const automationTemplates = [
    {
      id: 1,
      name: "Lead Nurturing",
      description: "Automatically nurture leads with targeted content",
      category: "Sales",
      icon: Users,
      popular: true
    },
    {
      id: 2,
      name: "Customer Onboarding",
      description: "Guide new customers through product setup",
      category: "Customer Service",
      icon: Star,
      popular: true
    },
    {
      id: 3,
      name: "Abandoned Cart Recovery",
      description: "Send emails to customers who left items in their cart",
      category: "E-commerce",
      icon: DollarSign,
      popular: false
    },
    {
      id: 4,
      name: "Event Promotion",
      description: "Promote upcoming events and webinars",
      category: "Marketing",
      icon: Calendar,
      popular: false
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
      case 'paused':
        return <Badge variant="secondary">Paused</Badge>
      case 'draft':
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <CleanPageLayout
      title="Automations"
      subtitle="Streamline your business processes with intelligent automation"
      actionLabel="Create Automation"
      onActionClick={() => {}}
    >
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Active Automations
            </CardTitle>
            <CardDescription>Running automations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">8</div>
            <p className="text-sm text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Total Triggers
            </CardTitle>
            <CardDescription>Automation events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">1,256</div>
            <p className="text-sm text-muted-foreground mt-1">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Errors & Issues
            </CardTitle>
            <CardDescription>Potential problems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">2</div>
            <p className="text-sm text-muted-foreground mt-1">
              Check automation logs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Avg. Run Time
            </CardTitle>
            <CardDescription>Automation speed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">0.3s</div>
            <p className="text-sm text-muted-foreground mt-1">
              Optimize for faster runs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Automations */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Automations</CardTitle>
              <CardDescription>Manage your running automations</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automations.map((automation) => (
              <div key={automation.id} className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <automation.icon className={`h-6 w-6 text-${automation.color}-500`} />
                    <div>
                      <h4 className="font-medium">{automation.name}</h4>
                      <p className="text-sm text-muted-foreground">{automation.description}</p>
                    </div>
                  </div>
                  {getStatusBadge(automation.status)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{automation.triggers} triggers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Last run {automation.lastRun}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id={`automation-${automation.id}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Automation Templates
          </CardTitle>
          <CardDescription>
            Get started quickly with pre-built automation templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {automationTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <template.icon className="h-6 w-6 text-primary" />
                      {template.popular && (
                        <Badge variant="secondary">Popular</Badge>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.category}</Badge>
                      <Button size="sm" variant="outline">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
