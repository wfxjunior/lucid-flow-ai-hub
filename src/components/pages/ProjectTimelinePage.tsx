import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Plus,
  Filter,
  MoreHorizontal
} from "lucide-react"

interface ProjectTimelinePageProps {
  onNavigate: (view: string) => void
}

export function ProjectTimelinePage({ onNavigate }: ProjectTimelinePageProps) {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "TechCorp Inc.",
      progress: 75,
      status: "in-progress",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      team: ["John", "Sarah", "Mike"],
      priority: "high"
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "Innovate Solutions",
      progress: 40,
      status: "on-hold",
      startDate: "2023-11-01",
      endDate: "2024-02-28",
      team: ["Emily", "David"],
      priority: "medium"
    },
    {
      id: 3,
      name: "Marketing Campaign",
      client: "Global Brands Ltd.",
      progress: 90,
      status: "completed",
      startDate: "2023-09-01",
      endDate: "2023-12-31",
      team: ["Alice", "Bob", "Charlie"],
      priority: "low"
    },
    {
      id: 4,
      name: "New Product Launch",
      client: "Acme Corp",
      progress: 20,
      status: "planned",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      team: ["John", "Emily"],
      priority: "high"
    }
  ]

  const upcomingMilestones = [
    {
      id: 1,
      title: "Design Review",
      project: "Website Redesign",
      date: "2024-02-28",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Beta Release",
      project: "Mobile App Development",
      date: "2024-03-15",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Final Report",
      project: "Marketing Campaign",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: 4,
      title: "Market Research",
      project: "New Product Launch",
      date: "2024-02-15",
      status: "upcoming"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
      case 'in-progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>
      case 'on-hold':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">On Hold</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case 'low':
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <CleanPageLayout
      title="Project Timeline"
      subtitle="Track project progress and manage deadlines"
      actionLabel="New Project"
      onActionClick={() => onNavigate("projects")}
    >
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Projects currently in progress</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold">3</div>
              <p className="text-muted-foreground text-sm">Out of 4 total</p>
            </div>
            <Clock className="h-6 w-6 text-blue-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Projects</CardTitle>
            <CardDescription>Projects successfully finished</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold">1</div>
              <p className="text-muted-foreground text-sm">Last month</p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On-Hold Projects</CardTitle>
            <CardDescription>Projects temporarily paused</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold">1</div>
              <p className="text-muted-foreground text-sm">Awaiting resources</p>
            </div>
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Utilization</CardTitle>
            <CardDescription>Overall team workload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} />
            <p className="text-muted-foreground text-sm">Average across all projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Project List */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Projects</CardTitle>
              <CardDescription>Track the progress of ongoing projects</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                More
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="w-2/3">
                    <Progress value={project.progress} />
                  </div>
                  <span className="ml-3">{project.progress}%</span>
                </div>
                <div className="flex items-center justify-between mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{project.startDate} - {project.endDate}</span>
                  </div>
                  {getPriorityBadge(project.priority)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Milestones */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Milestones</CardTitle>
              <CardDescription>Important deadlines and project milestones</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingMilestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{milestone.title}</p>
                    <p className="text-sm text-muted-foreground">{milestone.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{milestone.date}</span>
                  <Badge variant="outline">{milestone.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
