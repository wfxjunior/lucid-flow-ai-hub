
import React from 'react'
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
    <div className="bg-white rounded-2xl p-4 shadow-sm border-0">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Select value={filterClient || 'all-clients'} onValueChange={setFilterClient}>
            <SelectTrigger className="w-36 bg-gray-50 border-0 rounded-xl">
              <SelectValue placeholder="All clients" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-0 shadow-lg">
              <SelectItem value="all-clients">All clients</SelectItem>
              {availableClients.map((client) => (
                <SelectItem key={client} value={client}>{client}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterProject || 'all-projects'} onValueChange={setFilterProject}>
            <SelectTrigger className="w-36 bg-gray-50 border-0 rounded-xl">
              <SelectValue placeholder="All projects" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-0 shadow-lg">
              <SelectItem value="all-projects">All projects</SelectItem>
              {availableProjects.map((project) => (
                <SelectItem key={project} value={project}>{project}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
            <SelectTrigger className="w-28 bg-gray-50 border-0 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-0 shadow-lg">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
