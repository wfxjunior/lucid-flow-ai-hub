
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Clock, CheckCircle, AlertCircle, Users, Target } from "lucide-react"
import { toast } from "sonner"

interface Milestone {
  id: string
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  assignedTo: string
  project: string
}

export function ProjectTimelinePage() {
  const [showMilestoneForm, setShowMilestoneForm] = useState(false)
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Project Kickoff',
      description: 'Initial project meeting and requirement gathering',
      dueDate: '2024-01-15',
      status: 'completed',
      assignedTo: 'John Smith',
      project: 'Website Redesign'
    },
    {
      id: '2',
      title: 'Design Phase',
      description: 'Create wireframes and mockups',
      dueDate: '2024-01-25',
      status: 'in-progress',
      assignedTo: 'Jane Doe',
      project: 'Website Redesign'
    },
    {
      id: '3',
      title: 'Development Start',
      description: 'Begin coding and implementation',
      dueDate: '2024-02-01',
      status: 'pending',
      assignedTo: 'Mike Johnson',
      project: 'Website Redesign'
    }
  ])

  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    project: ''
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const addMilestone = () => {
    if (!newMilestone.title || !newMilestone.dueDate) {
      toast.error('Please fill in all required fields')
      return
    }

    const milestone: Milestone = {
      id: Date.now().toString(),
      ...newMilestone,
      status: 'pending'
    }

    setMilestones(prev => [...prev, milestone])
    setNewMilestone({
      title: '',
      description: '',
      dueDate: '',
      assignedTo: '',
      project: ''
    })
    setShowMilestoneForm(false)
    toast.success('Milestone added successfully!')
  }

  const updateMilestoneStatus = (id: string, newStatus: Milestone['status']) => {
    setMilestones(prev => 
      prev.map(milestone => 
        milestone.id === id ? { ...milestone, status: newStatus } : milestone
      )
    )
    toast.success('Milestone status updated!')
  }

  const getCompletionPercentage = () => {
    const completed = milestones.filter(m => m.status === 'completed').length
    return milestones.length > 0 ? Math.round((completed / milestones.length) * 100) : 0
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Project Timeline
          </h1>
          <p className="text-muted-foreground mt-1">
            Track project milestones and progress
          </p>
        </div>
        <Dialog open={showMilestoneForm} onOpenChange={setShowMilestoneForm}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Milestone</DialogTitle>
              <DialogDescription>
                Create a new project milestone to track progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Milestone Title *</Label>
                <Input
                  id="title"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter milestone title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter milestone description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newMilestone.dueDate}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Input
                  id="assignedTo"
                  value={newMilestone.assignedTo}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, assignedTo: e.target.value }))}
                  placeholder="Team member name"
                />
              </div>
              <div>
                <Label htmlFor="project">Project</Label>
                <Input
                  id="project"
                  value={newMilestone.project}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, project: e.target.value }))}
                  placeholder="Project name"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addMilestone} className="flex-1">
                  Add Milestone
                </Button>
                <Button variant="outline" onClick={() => setShowMilestoneForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Milestones</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{milestones.length}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {milestones.filter(m => m.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">{getCompletionPercentage()}% complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {milestones.filter(m => m.status === 'in-progress').length}
            </div>
            <p className="text-xs text-muted-foreground">Active milestones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {milestones.filter(m => m.status === 'overdue').length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Milestones</CardTitle>
          <CardDescription>Track progress of your project milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.length === 0 ? (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No milestones yet. Add your first milestone to get started.</p>
              </div>
            ) : (
              milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex gap-4">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {getStatusIcon(milestone.status)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px h-16 bg-gray-200 mt-2"></div>
                    )}
                  </div>

                  {/* Milestone content */}
                  <div className="flex-1 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {milestone.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </span>
                          {milestone.assignedTo && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {milestone.assignedTo}
                            </span>
                          )}
                          {milestone.project && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {milestone.project}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status.replace('-', ' ')}
                        </Badge>
                        <div className="flex gap-1">
                          {milestone.status !== 'completed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateMilestoneStatus(milestone.id, 'completed')}
                            >
                              Complete
                            </Button>
                          )}
                          {milestone.status === 'pending' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateMilestoneStatus(milestone.id, 'in-progress')}
                            >
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
