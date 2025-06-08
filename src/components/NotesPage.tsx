
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Plus } from 'lucide-react'
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
      <div className="flex items-center justify-center h-64 bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <Card className="bg-white border border-gray-100 max-w-md mx-auto shadow-lg">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
              <p className="text-gray-600 mb-4">
                Please log in to access your notes.
              </p>
              <Button 
                onClick={() => window.location.href = '/auth'}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading notes...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header - iPhone style */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
              <p className="text-sm text-gray-500 mt-1">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</p>
            </div>
            <Button 
              onClick={() => setEditingNote(null)}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-12 w-12 p-0 shadow-lg"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6">
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

      {/* Notes Grid */}
      <div className="px-6 pb-6">
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
