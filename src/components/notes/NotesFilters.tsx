
import React from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from 'lucide-react'

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
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Pesquisar notas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500 text-base placeholder:text-gray-400"
        />
      </div>
      
      {/* Filter Options */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={filterClient || 'all-clients'} onValueChange={setFilterClient}>
          <SelectTrigger className="flex-1 h-12 bg-gray-50 border-0 rounded-2xl text-base">
            <SelectValue placeholder="Todos os clientes" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-0 shadow-xl bg-white">
            <SelectItem value="all-clients" className="rounded-xl">Todos os clientes</SelectItem>
            {availableClients.map((client) => (
              <SelectItem key={client} value={client} className="rounded-xl">{client}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filterProject || 'all-projects'} onValueChange={setFilterProject}>
          <SelectTrigger className="flex-1 h-12 bg-gray-50 border-0 rounded-2xl text-base">
            <SelectValue placeholder="Todos os projetos" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-0 shadow-xl bg-white">
            <SelectItem value="all-projects" className="rounded-xl">Todos os projetos</SelectItem>
            {availableProjects.map((project) => (
              <SelectItem key={project} value={project} className="rounded-xl">{project}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
          <SelectTrigger className="w-full sm:w-40 h-12 bg-gray-50 border-0 rounded-2xl text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-0 shadow-xl bg-white">
            <SelectItem value="newest" className="rounded-xl">Mais recentes</SelectItem>
            <SelectItem value="oldest" className="rounded-xl">Mais antigas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
