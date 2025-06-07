
import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from "@/integrations/supabase/client"
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
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
        }
        
        console.log('Current session:', session)
        setUser(session?.user || null)
        setAuthLoading(false)
        
        if (session?.user) {
          await fetchNotes()
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setAuthLoading(false)
        setLoading(false)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session)
      setUser(session?.user || null)
      setAuthLoading(false)
      
      if (session?.user && event === 'SIGNED_IN') {
        // Defer notes fetching to avoid potential conflicts
        setTimeout(() => {
          fetchNotes()
        }, 100)
      } else {
        setNotes([])
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchNotes = async () => {
    try {
      console.log('Fetching notes...')
      setLoading(true)
      
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching notes:', error)
        throw error
      }
      
      console.log('Fetched notes:', data)
      setNotes(data || [])
    } catch (error) {
      console.error('Error fetching notes:', error)
      toast({
        title: "Error",
        description: "Failed to load notes",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
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
      
      await fetchNotes()
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
      deleteNote
    }}>
      {children}
    </NotesContext.Provider>
  )
}

export type { Note }
