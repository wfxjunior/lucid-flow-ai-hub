
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, UserPlus } from 'lucide-react'
import { NotesProvider, useNotes, Note } from './notes/NotesContext'
import { NotesForm } from './notes/NotesForm'
import { NotesFilters } from './notes/NotesFilters'
import { NotesGrid } from './notes/NotesGrid'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

const NotesPageContent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClient, setFilterClient] = useState('')
  const [filterProject, setFilterProject] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [isSigningUp, setIsSigningUp] = useState(false)

  const { notes, loading, user, authLoading } = useNotes()
  const { toast } = useToast()

  console.log('NotesPage - Auth loading:', authLoading)
  console.log('NotesPage - User:', user?.id)
  console.log('NotesPage - Notes loading:', loading)
  console.log('NotesPage - Notes count:', notes.length)

  const handleSignUpAsGuest = async () => {
    setIsSigningUp(true)
    try {
      // Generate a valid email format for guest user
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substring(2, 15)
      const guestEmail = `guest${timestamp}${randomId}@example.com`
      const guestPassword = `guest_${Math.random().toString(36).slice(-8)}${timestamp}`
      
      console.log('Attempting to create guest account with email:', guestEmail)
      
      const { data, error } = await supabase.auth.signUp({
        email: guestEmail,
        password: guestPassword,
        options: {
          data: {
            display_name: 'Guest User'
          }
        }
      })

      if (error) {
        console.error('Signup error:', error)
        throw error
      }

      console.log('Guest signup successful:', data)
      
      toast({
        title: "Welcome!",
        description: "You've been signed in as a guest user. You can now create notes!"
      })
    } catch (error) {
      console.error('Error signing up guest:', error)
      toast({
        title: "Error",
        description: "Failed to create guest account. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSigningUp(false)
    }
  }

  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.tags?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesClient = !filterClient || filterClient === 'all-clients' || note.related_client === filterClient
      const matchesProject = !filterProject || filterProject === 'all-projects' || note.related_project === filterProject
      return matchesSearch && matchesClient && matchesProject
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading authentication...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-6 bg-white min-h-screen">
        <div className="flex items-center justify-center h-64">
          <Card className="bg-white border border-gray-100 max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Get Started with Notes</h3>
              <p className="text-gray-600 mb-4">
                Create an account to start managing your notes and ideas.
              </p>
              <Button 
                onClick={handleSignUpAsGuest}
                disabled={isSigningUp}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {isSigningUp ? "Creating Account..." : "Continue as Guest"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6 bg-white min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading notes...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-600 mt-1">Manage your notes and ideas</p>
          {user && (
            <p className="text-xs text-gray-400 mt-1">
              Logged in as: {user.email} | Total notes: {notes.length}
            </p>
          )}
        </div>
        <NotesForm editingNote={editingNote} setEditingNote={setEditingNote} />
      </div>

      {/* Search and Filters */}
      <div className="px-6">
        <NotesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterClient={filterClient}
          setFilterClient={setFilterClient}
          filterProject={filterProject}
          setFilterProject={setFilterProject}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {/* Notes Grid */}
      <div className="px-6">
        <NotesGrid
          filteredNotes={filteredNotes}
          totalNotes={notes.length}
          onEditNote={setEditingNote}
        />
      </div>
    </div>
  )
}

export function NotesPage() {
  return (
    <NotesProvider>
      <NotesPageContent />
    </NotesProvider>
  )
}
