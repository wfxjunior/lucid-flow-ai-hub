
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"

interface Note {
  id: string
  title: string
  content: string
  related_client?: string
  related_project?: string
  tags?: string
  attachments?: string[]
  created_by: string
  user_id: string
  created_at: string
  updated_at: string
}

interface NotesContextType {
  notes: Note[]
  loading: boolean
  user: any
  authLoading: boolean
  fetchNotes: () => Promise<void>
  deleteNote: (noteId: string) => Promise<void>
  addNote: (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateNote: (noteId: string, updates: Partial<Note>) => Promise<void>
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const useNotes = () => {
  const context = useContext(NotesContext)
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return context
}

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Meeting Notes - Project Alpha',
      content: 'Discussed project timeline and deliverables. Client wants completion by end of month.',
      related_client: 'John Doe',
      related_project: 'Website Redesign',
      tags: 'meeting, urgent, deadline',
      attachments: [],
      created_by: 'demo-user',
      user_id: 'demo-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Technical Requirements',
      content: 'Need to implement responsive design, SEO optimization, and performance improvements.',
      related_client: 'ABC Company',
      related_project: 'E-commerce Platform',
      tags: 'technical, requirements',
      attachments: [],
      created_by: 'demo-user',
      user_id: 'demo-user',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString()
    }
  ])
  const [loading, setLoading] = useState(false)
  const [user] = useState({ id: 'demo-user', email: 'demo@example.com' })
  const [authLoading] = useState(false)
  const { toast } = useToast()

  const fetchNotes = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setLoading(false)
  }

  const addNote = async (noteData: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setNotes(prev => [newNote, ...prev])
    toast({
      title: "Success",
      description: "Note created successfully"
    })
  }

  const updateNote = async (noteId: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId 
        ? { ...note, ...updates, updated_at: new Date().toISOString() }
        : note
    ))
    toast({
      title: "Success",
      description: "Note updated successfully"
    })
  }

  const deleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return

    setNotes(prev => prev.filter(note => note.id !== noteId))
    toast({
      title: "Success",
      description: "Note deleted successfully"
    })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <NotesContext.Provider value={{
      notes,
      loading,
      user,
      authLoading,
      fetchNotes,
      deleteNote,
      addNote,
      updateNote
    }}>
      {children}
    </NotesContext.Provider>
  )
}

export type { Note }
