import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Share, Star } from 'lucide-react'
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Note, useNotes } from './NotesContext'
import { FormattedText } from '../FormattedText'
import { useLanguage } from '@/contexts/LanguageContext'

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
}

export const NoteCard = ({ note, onEdit }: NoteCardProps) => {
  const { deleteNote } = useNotes()
  const { t } = useLanguage()

  const getTags = (tagsString?: string) => {
    if (!tagsString) return []
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
  }

  const getPreviewText = (content?: string) => {
    if (!content) return t('notes.noAdditionalContent')
    
    // If it's HTML content, strip tags for preview
    if (/<[^>]*>/.test(content)) {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = content
      const plainText = tempDiv.textContent || tempDiv.innerText || ''
      return plainText.length > 120 ? plainText.substring(0, 120) + "..." : plainText
    }
    
    // Remove markdown formatting for preview
    const plainText = content.replace(/[*_`>#\-]/g, '').trim()
    return plainText.length > 120 ? plainText.substring(0, 120) + "..." : plainText
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300 bg-white border-0 rounded-3xl cursor-pointer group h-64 flex flex-col overflow-hidden shadow-sm hover:scale-[1.02]">
      <CardHeader className="pb-3 flex-shrink-0 bg-gradient-to-br from-yellow-50 to-blue-50 border-b border-blue-100/50">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-900 leading-tight">
            {note.title}
          </CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                // Adicionar funcionalidade de favoritar
              }}
              className="h-8 w-8 p-0 hover:bg-yellow-200/80 rounded-xl"
            >
              <Star className="h-4 w-4 text-yellow-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(note)
              }}
              className="h-8 w-8 p-0 hover:bg-blue-200/80 rounded-xl"
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                // Adicionar funcionalidade de compartilhar
              }}
              className="h-8 w-8 p-0 hover:bg-green-200/80 rounded-xl"
            >
              <Share className="h-4 w-4 text-green-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                deleteNote(note.id)
              }}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100/80 rounded-xl"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent 
        className="space-y-3 flex-1 flex flex-col p-4"
        onClick={() => onEdit(note)}
      >
        <div className="flex-1">
          <div className="text-gray-700 text-sm leading-relaxed line-clamp-5">
            {note.content ? (
              <span className="text-sm">{getPreviewText(note.content)}</span>
            ) : (
              <span className="text-gray-400 italic">{t('notes.noAdditionalContent')}</span>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0 space-y-2">
          {note.tags && (
            <div className="flex flex-wrap gap-1">
              {getTags(note.tags).slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-0 rounded-full px-2 py-1">
                  #{tag}
                </Badge>
              ))}
              {getTags(note.tags).length > 3 && (
                <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-600 border-0 rounded-full px-2 py-1">
                  +{getTags(note.tags).length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium">{format(new Date(note.created_at), "d 'de' MMMM", { locale: ptBR })}</span>
            {(note.related_client || note.related_project) && (
              <div className="flex items-center gap-2">
                {note.related_client && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {note.related_client}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
