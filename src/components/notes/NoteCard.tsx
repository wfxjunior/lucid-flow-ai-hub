
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

  return (
    <Card className="hover:shadow-md transition-shadow bg-white border border-gray-100 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2 text-gray-900">{note.title}</CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(note)
              }}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                deleteNote(note.id)
              }}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent 
        className="space-y-3"
        onClick={() => onEdit(note)}
      >
        {note.content && (
          <div 
            className="text-gray-600 text-sm line-clamp-3"
            dangerouslySetInnerHTML={{ __html: renderFormattedText(note.content) }}
          />
        )}
        
        {(note.related_client || note.related_project) && (
          <div className="space-y-1">
            {note.related_client && (
              <div className="text-xs text-gray-500">
                Client: <span className="font-medium">{note.related_client}</span>
              </div>
            )}
            {note.related_project && (
              <div className="text-xs text-gray-500">
                Project: <span className="font-medium">{note.related_project}</span>
              </div>
            )}
          </div>
        )}

        {note.tags && (
          <div className="flex flex-wrap gap-1">
            {getTags(note.tags).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
          {format(new Date(note.created_at), 'MMM d, yyyy')}
        </div>
      </CardContent>
    </Card>
  )
}
