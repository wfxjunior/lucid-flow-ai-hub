import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  User,
  Tag
} from "lucide-react"

const metrics = [
  {
    title: "Total Milestones",
    value: "3",
    subtitle: "Across all projects",
    icon: Target
  },
  {
    title: "Completed",
    value: "1",
    subtitle: "33% complete",
    icon: CheckCircle
  },
  {
    title: "In Progress",
    value: "1",
    subtitle: "Active milestones",
    icon: Clock
  },
  {
    title: "Overdue",
    value: "0",
    subtitle: "Need attention",
    icon: AlertTriangle
  }
]

const milestones = [
  {
    id: 1,
    title: "Project Kickoff",
    description: "Initial project meeting and requirement gathering",
    due: "1/14/2024",
    assignee: "John Smith",
    project: "Website Redesign",
    status: "completed",
    icon: CheckCircle,
    iconColor: "text-success"
  },
  {
    id: 2,
    title: "Design Phase",
    description: "Create wireframes and mockups",
    due: "1/24/2024",
    assignee: "Jane Doe",
    project: "Website Redesign",
    status: "in-progress",
    icon: Clock,
    iconColor: "text-primary"
  },
  {
    id: 3,
    title: "Development Start",
    description: "Begin coding and implementation",
    due: "1/31/2024",
    assignee: "Mike Johnson",
    project: "Website Redesign",
    status: "pending",
    icon: AlertTriangle,
    iconColor: "text-warning"
  }
]

interface ProjectTimelinePageProps {
  onNavigate: (view: string) => void
}

export function ProjectTimelinePage({ onNavigate }: ProjectTimelinePageProps) {
  const handleAddMilestone = () => {
    console.log("Add milestone clicked")
  }

  return (
    <CleanPageLayout
      title="Project Timeline"
      subtitle="Track project milestones and progress"
      actionLabel="Add Milestone"
      onActionClick={handleAddMilestone}
      metrics={metrics}
    >
      {/* Project Milestones Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            Project Milestones
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Track progress of your project milestones
          </p>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone) => (
            <Card key={milestone.id} className="bg-card border border-border rounded-2xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className={`p-2 rounded-lg bg-muted flex-shrink-0`}>
                    <milestone.icon className={`h-4 md:h-5 w-4 md:w-5 ${milestone.iconColor}`} />
                  </div>
                  
                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                      <div className="space-y-1 min-w-0 flex-1">
                        <h3 className="font-medium text-foreground text-sm md:text-base break-words">
                          {milestone.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
                        {milestone.status === 'completed' && (
                          <Badge variant="success" className="text-xs">completed</Badge>
                        )}
                        {milestone.status === 'in-progress' && (
                          <Badge variant="default" className="text-xs">in progress</Badge>
                        )}
                        {milestone.status === 'pending' && (
                          <Badge variant="warning" className="text-xs">pending</Badge>
                        )}
                        
                        {milestone.status === 'in-progress' && (
                          <Button variant="outline" size="sm" className="text-xs">
                            Complete
                          </Button>
                        )}
                        
                        {milestone.status === 'pending' && (
                          <Button variant="outline" size="sm" className="text-xs">
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 md:h-4 w-3 md:w-4 flex-shrink-0" />
                        <span>Due: {milestone.due}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 md:h-4 w-3 md:w-4 flex-shrink-0" />
                        <span className="truncate">{milestone.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 md:h-4 w-3 md:w-4 flex-shrink-0" />
                        <span className="truncate">{milestone.project}</span>
                      </div>
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