
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

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
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    checkUser()
    fetchNotes()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setAuthLoading(false)
    }
  }

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setNotes([])
        return
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setNotes(data || [])
    } catch (error) {
      console.error('Error fetching notes:', error)
      toast({
        title: "Error",
        description: "Failed to fetch notes",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const addNote = async (noteData: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('notes')
        .insert([{
          ...noteData,
          user_id: user.id,
          created_by: user.id
        }])
        .select()
        .single()

      if (error) throw error

      setNotes(prev => [data, ...prev])
      toast({
        title: "Success",
        description: "Note created successfully"
      })
    } catch (error) {
      console.error('Error creating note:', error)
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive"
      })
    }
  }

  const updateNote = async (noteId: string, updates: Partial<Note>) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .update(updates)
        .eq('id', noteId)
        .select()
        .single()

      if (error) throw error

      setNotes(prev => prev.map(note => 
        note.id === noteId ? { ...note, ...data } : note
      ))
      
      toast({
        title: "Success",
        description: "Note updated successfully"
      })
    } catch (error) {
      console.error('Error updating note:', error)
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive"
      })
    }
  }

  const deleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId)

      if (error) throw error

      setNotes(prev => prev.filter(note => note.id !== noteId))
      toast({
        title: "Success",
        description: "Note deleted successfully"
      })
    } catch (error) {
      console.error('Error deleting note:', error)
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive"
      })
    }
  }

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
