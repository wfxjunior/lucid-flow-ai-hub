
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from 'lucide-react'

interface NotesFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filterClient: string
  setFilterClient: (client: string) => void
  filterProject: string
  setFilterProject: (project: string) => void
  sortOrder: 'newest' | 'oldest'
  setSortOrder: (order: 'newest' | 'oldest') => void
}

export const NotesFilters = ({
  searchTerm,
  setSearchTerm,
  filterClient,
  setFilterClient,
  filterProject,
  setFilterProject,
  sortOrder,
  setSortOrder
}: NotesFiltersProps) => {
  const availableClients = [
    'Personal',
    'Tech Corp Ltd',
    'Acme Corporation', 
    'Global Industries',
    'Smart Solutions Inc',
    'Modern Enterprises'
  ]

  const availableProjects = [
    'Personal',
    'Website Redesign',
    'Mobile App Development',
    'Database Migration',
    'Security Audit',
    'Cloud Integration'
  ]

  return (
    <Card className="bg-card border border-border">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col space-y-3">
          {/* Search bar - full width on mobile */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background text-sm"
              />
            </div>
          </div>
          
          {/* Filters - stacked on mobile, row on larger screens */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Select value={filterClient} onValueChange={setFilterClient}>
              <SelectTrigger className="w-full sm:w-36 bg-background text-xs sm:text-sm">
                <SelectValue placeholder="All clients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-clients">All clients</SelectItem>
                {availableClients.map((client) => (
                  <SelectItem key={client} value={client}>{client}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterProject} onValueChange={setFilterProject}>
              <SelectTrigger className="w-full sm:w-36 bg-background text-xs sm:text-sm">
                <SelectValue placeholder="All projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-projects">All projects</SelectItem>
                {availableProjects.map((project) => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
              <SelectTrigger className="w-full sm:w-28 bg-background text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
