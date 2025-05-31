
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  FolderOpen, 
  DollarSign,
  Calendar,
  User,
  Clock,
  Target,
  FileText
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ProjectForm } from "./ProjectForm"

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

const projectTypes = [
  'Web Development',
  'Mobile App',
  'Design & Branding',
  'Marketing Campaign',
  'Consulting',
  'E-commerce',
  'Custom Software',
  'Other'
]

const statusColors = {
  'planning': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-green-100 text-green-800',
  'review': 'bg-yellow-100 text-yellow-800',
  'completed': 'bg-gray-100 text-gray-800',
  'on-hold': 'bg-red-100 text-red-800'
}

const priorityColors = {
  'low': 'bg-gray-100 text-gray-600',
  'medium': 'bg-yellow-100 text-yellow-700',
  'high': 'bg-red-100 text-red-700'
}

export function ProjectsPage() {
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      clientName: 'Acme Corporation',
      projectName: 'E-commerce Platform Redesign',
      projectType: 'Web Development',
      description: 'Complete redesign of the existing e-commerce platform with modern UI/UX, improved performance, and mobile optimization.',
      budget: 25000,
      expenses: 8500,
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      clientName: 'Tech Startup Inc',
      projectName: 'Mobile App Development',
      projectType: 'Mobile App',
      description: 'Native iOS and Android app for task management with real-time collaboration features.',
      budget: 40000,
      expenses: 12000,
      startDate: '2024-02-01',
      endDate: '2024-06-30',
      status: 'planning',
      priority: 'medium',
      createdAt: '2024-01-28'
    }
  ])

  const [showProjectForm, setShowProjectForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const handleCreateProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setProjects(prev => [newProject, ...prev])
    setShowProjectForm(false)
    toast({
      title: "Project Created",
      description: `${projectData.projectName} has been created successfully.`,
    })
  }

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p))
    setEditingProject(null)
    toast({
      title: "Project Updated",
      description: `${updatedProject.projectName} has been updated successfully.`,
    })
  }

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    setProjects(prev => prev.filter(p => p.id !== projectId))
    toast({
      title: "Project Deleted",
      description: `${project?.projectName} has been deleted.`,
      variant: "destructive"
    })
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getProgressPercentage = (project: Project) => {
    const total = project.startDate && project.endDate ? 
      new Date(project.endDate).getTime() - new Date(project.startDate).getTime() : 0
    const elapsed = new Date().getTime() - new Date(project.startDate).getTime()
    return total > 0 ? Math.min(Math.max((elapsed / total) * 100, 0), 100) : 0
  }

  if (showProjectForm || editingProject) {
    return (
      <ProjectForm
        project={editingProject}
        projectTypes={projectTypes}
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        onCancel={() => {
          setShowProjectForm(false)
          setEditingProject(null)
        }}
      />
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Client Projects
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage and track your client projects efficiently
          </p>
        </div>
        <Button 
          onClick={() => setShowProjectForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects or clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                    {project.projectName}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <User className="h-3 w-3" />
                    {project.clientName}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingProject(project)}
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className={statusColors[project.status]}>
                  {project.status.replace('-', ' ')}
                </Badge>
                <Badge className={priorityColors[project.priority]}>
                  {project.priority} priority
                </Badge>
                <Badge variant="outline">
                  {project.projectType}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>{Math.round(getProgressPercentage(project))}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(project)}%` }}
                  />
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-medium">${project.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="text-xs text-gray-500">Expenses</p>
                    <p className="text-sm font-medium">${project.expenses.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                <Calendar className="h-3 w-3" />
                <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Get started by creating your first project'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button onClick={() => setShowProjectForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
