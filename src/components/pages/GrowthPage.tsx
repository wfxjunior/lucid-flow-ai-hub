import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { 
  TrendingUp, 
  Users, 
  Target,
  BarChart3,
  Zap,
  Star,
  ArrowRight,
  Plus,
  Calendar,
  DollarSign
} from "lucide-react"

interface GrowthPageProps {
  onNavigate: (view: string) => void
}

export function GrowthPage({ onNavigate }: GrowthPageProps) {
  const growthMetrics = [
    {
      title: "Monthly Growth Rate",
      value: "23.5%",
      change: "+5.2%",
      icon: TrendingUp,
      color: "green"
    },
    {
      title: "New Customers",
      value: "456",
      change: "+8.1%",
      icon: Users,
      color: "blue"
    },
    {
      title: "Conversion Rate",
      value: "4.2%",
      change: "-1.5%",
      icon: Target,
      color: "yellow"
    },
    {
      title: "Website Traffic",
      value: "12,345",
      change: "+3.7%",
      icon: BarChart3,
      color: "purple"
    }
  ]

  const growthGoals = [
    {
      id: 1,
      title: "Increase Customer Base",
      target: "500 customers",
      current: 342,
      progress: 68,
      deadline: "Q4 2024",
      status: "on-track"
    },
    {
      id: 2,
      title: "Improve Conversion Rate",
      target: "5%",
      current: 4.2,
      progress: 84,
      deadline: "Q3 2024",
      status: "at-risk"
    },
    {
      id: 3,
      title: "Boost Website Traffic",
      target: "15,000 visits",
      current: 12345,
      progress: 82,
      deadline: "Q4 2024",
      status: "on-track"
    }
  ]

  const growthInitiatives = [
    {
      id: 1,
      title: "Content Marketing Campaign",
      description: "Launch blog and social media content strategy",
      impact: "High",
      effort: "Medium",
      status: "in-progress",
      icon: Star
    },
    {
      id: 2,
      title: "Referral Program",
      description: "Incentivize existing customers to refer new ones",
      impact: "Medium",
      effort: "Low",
      status: "planned",
      icon: Users
    },
    {
      id: 3,
      title: "Marketing Automation",
      description: "Automate email and social media marketing tasks",
      impact: "High",
      effort: "High",
      status: "planned",
      icon: Zap
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">On Track</Badge>
      case 'at-risk':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">At Risk</Badge>
      case 'behind':
        return <Badge variant="destructive">Behind</Badge>
      case 'completed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Completed</Badge>
      case 'in-progress':
        return <Badge variant="outline">In Progress</Badge>
      case 'planned':
        return <Badge variant="secondary">Planned</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <CleanPageLayout
      title="Growth Strategy"
      subtitle="Track your business growth and strategic initiatives"
      actionLabel="New Initiative"
      onActionClick={() => {}}
    >
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {growthMetrics.map((metric) => (
          <Card key={metric.title} className="border-none shadow-sm">
            <CardBody metric={metric} />
          </Card>
        ))}
      </div>

      {/* Growth Goals */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Growth Goals</CardTitle>
              <CardDescription>Key objectives for business expansion</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthGoals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{goal.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target}
                  </p>
                </div>
                <div className="text-right">
                  <Progress value={goal.progress} className="h-2 mb-1" />
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm text-muted-foreground">
                      {goal.deadline}
                    </span>
                    {getStatusBadge(goal.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Initiatives */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Growth Initiatives</CardTitle>
              <CardDescription>Strategic projects to drive business growth</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Initiative
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthInitiatives.map((initiative) => (
              <div key={initiative.id} className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <initiative.icon className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">{initiative.title}</h4>
                      <p className="text-sm text-muted-foreground">{initiative.description}</p>
                    </div>
                  </div>
                  {getStatusBadge(initiative.status)}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Impact:</span>
                    <Badge variant={initiative.impact === 'High' ? 'secondary' : 'outline'}>
                      {initiative.impact}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Effort:</span>
                    <Badge variant="outline">{initiative.effort}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}

interface CardBodyProps {
  metric: {
    title: string;
    value: string;
    change: string;
    icon: any;
    color: string;
  };
}

function CardBody({ metric }: CardBodyProps) {
  return (
    <CardContent className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </span>
        <metric.icon className={`h-4 w-4 text-${metric.color}-500`} />
      </div>
      <div className="text-2xl font-semibold tracking-tight">{metric.value}</div>
      <div className="text-sm text-muted-foreground">
        <TrendingUp className="inline-block h-4 w-4 align-middle mr-1" />
        {metric.change}
      </div>
    </CardContent>
  );
}
