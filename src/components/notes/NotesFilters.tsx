
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
    <Card className="bg-white border border-gray-100">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={filterClient} onValueChange={setFilterClient}>
              <SelectTrigger className="w-40 bg-white">
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
              <SelectTrigger className="w-40 bg-white">
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
              <SelectTrigger className="w-32 bg-white">
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
