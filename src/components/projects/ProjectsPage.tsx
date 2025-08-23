
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Briefcase, Calendar, DollarSign } from 'lucide-react'
import { CleanPageLayout } from '@/components/layouts/CleanPageLayout'

export function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with actual data hooks
  const projects = [
    {
      id: '1',
      name: 'Website Redesign',
      client: 'Acme Corp',
      status: 'in-progress',
      budget: 15000,
      deadline: '2024-03-15',
      progress: 65
    },
    {
      id: '2', 
      name: 'Mobile App Development',
      client: 'Tech Startup',
      status: 'planning',
      budget: 25000,
      deadline: '2024-04-30',
      progress: 15
    }
  ]

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const metrics = [
    {
      title: 'Total Projects',
      value: projects.length.toString(),
      subtitle: 'All time',
      icon: Briefcase
    },
    {
      title: 'Active Projects',
      value: projects.filter(p => p.status === 'in-progress').length.toString(),
      subtitle: 'Currently active',
      icon: Briefcase
    },
    {
      title: 'Total Value',
      value: `$${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}`,
      subtitle: 'Project portfolio',
      icon: DollarSign
    }
  ]

  return (
    <CleanPageLayout
      title="Projects"
      subtitle="Manage your project portfolio"
      actionLabel="New Project"
      onActionClick={() => {}}
      metrics={metrics}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first project'}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <Badge variant={project.status === 'in-progress' ? 'default' : 'secondary'}>
                          {project.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{project.client}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${project.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </CleanPageLayout>
  )
}
