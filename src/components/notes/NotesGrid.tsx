
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { StickyNote } from 'lucide-react'
import { NoteCard } from './NoteCard'
import { Note } from './NotesContext'

interface NotesGridProps {
  filteredNotes: Note[]
  totalNotes: number
  onEditNote: (note: Note) => void
}

export const NotesGrid = ({ filteredNotes, totalNotes, onEditNote }: NotesGridProps) => {
  if (filteredNotes.length === 0) {
    return (
      <Card className="bg-white border border-gray-100">
        <CardContent className="p-6 sm:p-8 text-center">
          <StickyNote className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {totalNotes === 0 
              ? "Create your first note to get started" 
              : "Try adjusting your search or filters"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {filteredNotes.map((note) => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onEdit={onEditNote}
        />
      ))}
    </div>
  )
}
