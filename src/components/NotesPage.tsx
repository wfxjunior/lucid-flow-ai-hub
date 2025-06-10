
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter } from 'lucide-react'
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

  const { notes, loading } = useNotes()

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading notes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header iPhone Style */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notes</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="rounded-2xl h-12 w-12 p-0 border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              >
                <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
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
        <div className="px-4 sm:px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
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
