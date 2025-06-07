
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
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

  const { notes, loading } = useNotes()

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground text-sm">Loading notes...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex flex-col space-y-3 p-3 sm:p-6 bg-card border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">Notes</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage your notes and ideas</p>
            <p className="text-xs text-muted-foreground mt-1">
              Total notes: {notes.length}
            </p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
            <NotesForm editingNote={editingNote} setEditingNote={setEditingNote} />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-3 sm:p-6">
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
      <div className="px-3 sm:px-6 pb-6">
        <NotesGrid
          filteredNotes={filteredNotes}
          totalNotes={notes.length}
          onEditNote={setEditingNote}
        />
      </div>
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
