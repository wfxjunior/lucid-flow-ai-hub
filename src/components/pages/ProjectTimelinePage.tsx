
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Users, MapPin, CheckCircle2, AlertCircle, Plus } from 'lucide-react'

interface ProjectTimelinePageProps {
  onNavigate: (view: string) => void
}

export function ProjectTimelinePage({ onNavigate }: ProjectTimelinePageProps) {
  const [projects] = useState([
    {
      id: 1,
      name: "Silva House - Complete Renovation",
      client: "John Silva",
      status: "In Progress",
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-03-30",
      location: "New York, NY",
      team: ["Carlos", "Maria", "José"],
      tasks: [
        { name: "Demolition", status: "completed", date: "2024-01-20" },
        { name: "Foundation", status: "completed", date: "2024-02-10" },
        { name: "Structure", status: "in-progress", date: "2024-02-25" },
        { name: "Finishing", status: "pending", date: "2024-03-15" }
      ]
    },
    {
      id: 2,
      name: "Tech Office - Fit Out",
      client: "TechCorp",
      status: "Starting",
      progress: 20,
      startDate: "2024-02-01",
      endDate: "2024-04-15",
      location: "Los Angeles, CA",
      team: ["Ana", "Pedro", "Lucas"],
      tasks: [
        { name: "Planning", status: "completed", date: "2024-02-05" },
        { name: "Material Purchase", status: "in-progress", date: "2024-02-12" },
        { name: "Installation", status: "pending", date: "2024-02-20" },
        { name: "Completion", status: "pending", date: "2024-04-10" }
      ]
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500"
      case "in-progress": return "bg-blue-500"
      case "pending": return "bg-gray-300"
      default: return "bg-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600" />
      case "pending": return <AlertCircle className="h-4 w-4 text-gray-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Timeline</h1>
          <p className="text-muted-foreground mt-2">Track the progress of all your projects</p>
        </div>
        <Button onClick={() => onNavigate('projects')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {project.client}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </span>
                  </CardDescription>
                </div>
                <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Schedule</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Start: {new Date(project.startDate).toLocaleDateString('en-US')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Expected: {new Date(project.endDate).toLocaleDateString('en-US')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Team</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.team.map((member, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Project Stages</h4>
                <div className="space-y-3">
                  {project.tasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <span className="font-medium">{task.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(task.date).toLocaleDateString('en-US')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
