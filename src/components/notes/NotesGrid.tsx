
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
      <Card className="bg-white border-0 rounded-2xl shadow-sm">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <StickyNote className="h-8 w-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {totalNotes === 0 ? 'No Notes Yet' : 'No notes found'}
          </h3>
          <p className="text-gray-500 mb-4">
            {totalNotes === 0 
              ? "Start by creating your first note" 
              : "Try adjusting your search or filters"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
