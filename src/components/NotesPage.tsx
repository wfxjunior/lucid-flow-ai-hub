
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Plus, Search, Filter, SortAsc } from 'lucide-react'
import { NotesProvider, useNotes, Note } from './notes/NotesContext'
import { NotesForm } from './notes/NotesForm'
import { NotesFilters } from './notes/NotesFilters'
import { NotesGrid } from './notes/NotesGrid'

const NotesPageContent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClient, setFilterClient] = useState('')
  const [filterProject, setFilterProject] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const { notes, loading, user, authLoading } = useNotes()

  console.log('NotesPage - Auth loading:', authLoading)
  console.log('NotesPage - User:', user?.id)
  console.log('NotesPage - Notes loading:', loading)
  console.log('NotesPage - Notes count:', notes.length)

  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.tags?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesClient = !filterClient || filterClient === 'all-clients' || note.related_client === filterClient
      const matchesProject = !filterProject || filterProject === 'all-projects' || note.related_project === filterProject
      return matchesSearch && matchesClient && matchesProject
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="bg-white border-0 shadow-xl rounded-3xl max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Autenticação Necessária</h3>
            <p className="text-gray-600 mb-6">
              Faça login para acessar suas notas.
            </p>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="bg-blue-500 text-white hover:bg-blue-600 rounded-2xl px-8 py-3 font-medium"
            >
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando notas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header iPhone Style */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notas</h1>
              <p className="text-sm text-gray-500 mt-1">
                {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="rounded-2xl h-12 w-12 p-0 border-2 border-gray-200 hover:border-gray-300"
              >
                <Filter className="h-5 w-5 text-gray-600" />
              </Button>
              <Button 
                onClick={() => setEditingNote(null)}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-12 w-12 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      {showFilters && (
        <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-100">
          <NotesFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterClient={filterClient}
            setFilterClient={setFilterClient}
            filterProject={filterProject}
            setFilterProject={setFilterProject}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
      )}

      {/* Notes Grid */}
      <div className="px-4 sm:px-6 py-6">
        <NotesGrid
          filteredNotes={filteredNotes}
          totalNotes={notes.length}
          onEditNote={setEditingNote}
        />
      </div>

      {/* Form Modal */}
      <NotesForm editingNote={editingNote} setEditingNote={setEditingNote} />
    </div>
  )
}

export function NotesPage() {
  return (
    <NotesProvider>
      <NotesPageContent />
    </NotesProvider>
  )
}
