
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"

interface Project {
  id: string
  clientName: string
  projectName: string
  projectType: string
  description: string
  budget: number
  expenses: number
  startDate: string
  endDate: string
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}

interface ProjectFormProps {
  project?: Project | null
  projectTypes: string[]
  onSubmit: (project: Project | Omit<Project, 'id' | 'createdAt'>) => void
  onCancel: () => void
}

export function ProjectForm({ project, projectTypes, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    projectType: '',
    description: '',
    budget: 0,
    expenses: 0,
    startDate: '',
    endDate: '',
    status: 'planning' as const,
    priority: 'medium' as const
  })

  useEffect(() => {
    if (project) {
      setFormData({
        clientName: project.clientName,
        projectName: project.projectName,
        projectType: project.projectType,
        description: project.description,
        budget: project.budget,
        expenses: project.expenses,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
        priority: project.priority
      })
    }
  }, [project])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (project) {
      onSubmit({
        ...project,
        ...formData
      })
    } else {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onCancel}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {project ? 'Edit Project' : 'Create New Project'}
        </h1>
        <p className="text-gray-600 mt-1">
          {project ? 'Update project details and tracking information' : 'Set up a new client project with detailed information'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>
            Fill in the details to create a comprehensive project profile
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Enter client or company name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder="Enter project title"
                  required
                />
              </div>
            </div>

            {/* Project Type and Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  required
                >
                  <option value="">Select type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                >
                  <option value="planning">Planning</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the project scope, objectives, and key deliverables..."
                rows={4}
              />
            </div>

            {/* Financial Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="budget">Project Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expenses">Current Expenses ($)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={formData.expenses}
                  onChange={(e) => handleInputChange('expenses', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {project ? 'Update Project' : 'Create Project'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
