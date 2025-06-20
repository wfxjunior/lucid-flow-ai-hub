
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { StickyNote, FileText } from 'lucide-react'
import { NoteCard } from './NoteCard'
import { Note } from './NotesContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface NotesGridProps {
  filteredNotes: Note[]
  totalNotes: number
  onEditNote: (note: Note) => void
}

export const NotesGrid = ({ filteredNotes, totalNotes, onEditNote }: NotesGridProps) => {
  const { t } = useLanguage()

  if (filteredNotes.length === 0) {
    return (
      <Card className="bg-white border-0 rounded-3xl shadow-sm overflow-hidden">
        <CardContent className="p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {totalNotes === 0 ? t('notes.noNotesYet') : t('notes.noNotesFound')}
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">
            {totalNotes === 0 
              ? t('notes.noNotesYetMessage')
              : t('notes.noNotesFoundMessage')}
          </p>
          {totalNotes === 0 && (
            <div className="text-sm text-gray-400 space-y-1">
              <p>{t('notes.createFirstTip')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
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
