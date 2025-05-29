
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Project {
  id: string
  name: string
  client: string
  progress: number
  status: "active" | "completed" | "on-hold"
  deadline: string
  priority: "high" | "medium" | "low"
}

const projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    client: "TechCorp",
    progress: 75,
    status: "active",
    deadline: "Dec 15, 2024",
    priority: "high"
  },
  {
    id: "2",
    name: "Mobile App Development",
    client: "StartupXYZ",
    progress: 45,
    status: "active",
    deadline: "Jan 30, 2025",
    priority: "medium"
  },
  {
    id: "3",
    name: "Brand Identity",
    client: "LocalBiz",
    progress: 90,
    status: "active",
    deadline: "Dec 10, 2024",
    priority: "high"
  },
  {
    id: "4",
    name: "Marketing Campaign",
    client: "E-commerce Co",
    progress: 100,
    status: "completed",
    deadline: "Nov 30, 2024",
    priority: "low"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-green-100 text-green-800"
    case "completed": return "bg-blue-100 text-blue-800"
    case "on-hold": return "bg-yellow-100 text-yellow-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-800"
    case "medium": return "bg-yellow-100 text-yellow-800"
    case "low": return "bg-green-100 text-green-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export function ProjectsOverview() {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
        <CardDescription>Overview of current project pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{project.name}</h4>
                <div className="flex gap-2">
                  <Badge variant="secondary" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge variant="secondary" className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{project.client}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">Due: {project.deadline}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
