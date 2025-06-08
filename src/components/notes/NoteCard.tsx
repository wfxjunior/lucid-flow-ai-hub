
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from 'lucide-react'
import { format } from "date-fns"
import { Note, useNotes } from './NotesContext'

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
}

export const NoteCard = ({ note, onEdit }: NoteCardProps) => {
  const { deleteNote } = useNotes()

  const renderFormattedText = (content: string) => {
    if (!content) return content
    
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
  }

  const getTags = (tagsString?: string) => {
    if (!tagsString) return []
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
  }

  const getPreviewText = (content?: string) => {
    if (!content) return "No additional text"
    return content.length > 100 ? content.substring(0, 100) + "..." : content
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 bg-yellow-50 border-0 rounded-xl cursor-pointer group h-48 flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold line-clamp-2 text-gray-900 leading-tight">
            {note.title}
          </CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(note)
              }}
              className="h-7 w-7 p-0 hover:bg-yellow-200"
            >
              <Edit className="h-3 w-3 text-orange-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                deleteNote(note.id)
              }}
              className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent 
        className="space-y-2 flex-1 flex flex-col"
        onClick={() => onEdit(note)}
      >
        <div className="flex-1">
          <div className="text-gray-700 text-sm leading-relaxed line-clamp-4">
            {getPreviewText(note.content)}
          </div>
        </div>
        
        <div className="flex-shrink-0 space-y-2">
          {note.tags && (
            <div className="flex flex-wrap gap-1">
              {getTags(note.tags).slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-0">
                  {tag}
                </Badge>
              ))}
              {getTags(note.tags).length > 3 && (
                <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-600 border-0">
                  +{getTags(note.tags).length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{format(new Date(note.created_at), 'MMM d')}</span>
            {(note.related_client || note.related_project) && (
              <div className="flex items-center gap-2">
                {note.related_client && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
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
