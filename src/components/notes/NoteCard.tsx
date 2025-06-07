
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
    <Card className="hover:shadow-md transition-shadow bg-card border border-border cursor-pointer group h-fit">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm sm:text-base line-clamp-2 text-foreground leading-tight flex-1 min-w-0">
            {note.title}
          </CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(note)
              }}
              className="h-6 w-6 sm:h-7 sm:w-7 p-0"
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                deleteNote(note.id)
              }}
              className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent 
        className="space-y-2 sm:space-y-3 pt-0 p-3 sm:p-4"
        onClick={() => onEdit(note)}
      >
        {note.content && (
          <div 
            className="text-muted-foreground text-xs sm:text-sm line-clamp-3 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderFormattedText(note.content) }}
          />
        )}
        
        {(note.related_client || note.related_project) && (
          <div className="space-y-1">
            {note.related_client && (
              <div className="text-xs text-muted-foreground truncate">
                Client: <span className="font-medium text-foreground">{note.related_client}</span>
              </div>
            )}
            {note.related_project && (
              <div className="text-xs text-muted-foreground truncate">
                Project: <span className="font-medium text-foreground">{note.related_project}</span>
              </div>
            )}
          </div>
        )}

        {note.tags && (
          <div className="flex flex-wrap gap-1">
            {getTags(note.tags).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="text-xs text-muted-foreground pt-2 border-t border-border">
          {format(new Date(note.created_at), 'MMM d, yyyy')}
        </div>
      </CardContent>
    </Card>
  )
}
