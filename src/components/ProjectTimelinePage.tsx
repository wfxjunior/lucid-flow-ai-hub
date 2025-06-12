
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Target, ChevronRight, Plus } from "lucide-react"

interface TimelineItem {
  id: string
  title: string
  description: string
  date: string
  status: 'completed' | 'in-progress' | 'upcoming'
  assignee: string
  project: string
}

export function ProjectTimelinePage() {
  const [timelineItems] = useState<TimelineItem[]>([
    {
      id: '1',
      title: 'Project Kickoff Meeting',
      description: 'Initial meeting with stakeholders to define project scope and requirements',
      date: '2024-01-15',
      status: 'completed',
      assignee: 'John Smith',
      project: 'E-commerce Platform'
    },
    {
      id: '2',
      title: 'Design Phase - Wireframes',
      description: 'Create wireframes and user flow diagrams',
      date: '2024-01-22',
      status: 'completed',
      assignee: 'Sarah Johnson',
      project: 'E-commerce Platform'
    },
    {
      id: '3',
      title: 'Frontend Development Start',
      description: 'Begin frontend development based on approved designs',
      date: '2024-02-01',
      status: 'in-progress',
      assignee: 'Mike Wilson',
      project: 'E-commerce Platform'
    },
    {
      id: '4',
      title: 'Backend API Development',
      description: 'Develop REST APIs and database integration',
      date: '2024-02-10',
      status: 'upcoming',
      assignee: 'Alex Chen',
      project: 'E-commerce Platform'
    },
    {
      id: '5',
      title: 'Testing Phase',
      description: 'Comprehensive testing including unit and integration tests',
      date: '2024-03-01',
      status: 'upcoming',
      assignee: 'Lisa Davis',
      project: 'E-commerce Platform'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'upcoming':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓'
      case 'in-progress':
        return '⟳'
      case 'upcoming':
        return '○'
      default:
        return '○'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            Project Timeline
          </h1>
          <p className="text-muted-foreground mt-1">
            Track project milestones and deliverables across all your projects
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Milestone
        </Button>
      </div>

      {/* Timeline Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground">Milestones</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-muted-foreground">Active tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Upcoming</span>
            </div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Team</span>
            </div>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-muted-foreground">Members</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Chronological view of project milestones and deliverables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timelineItems.map((item, index) => (
              <div key={item.id} className="flex gap-4">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                  </div>
                  {index < timelineItems.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                  )}
                </div>

                {/* Timeline content */}
                <div className="flex-1 pb-8">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <Badge variant="outline" className="text-xs">
                          {item.project}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="h-3 w-3" />
                          {item.assignee}
                        </div>
                        <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
