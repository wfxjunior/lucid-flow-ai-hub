import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, StickyNote, Filter, Upload, X } from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { RichTextEditor } from "./RichTextEditor"
import { FormattedText } from "./FormattedText"

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

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClient, setFilterClient] = useState('')
  const [filterProject, setFilterProject] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    related_client: '',
    related_project: '',
    tags: '',
    attachments: [] as string[]
  })

  // Mock data for dropdowns - in real app, fetch from database
  const availableClients = [
    'Tech Corp Ltd',
    'Acme Corporation', 
    'Global Industries',
    'Smart Solutions Inc',
    'Modern Enterprises'
  ]

  const availableProjects = [
    'Website Redesign',
    'Mobile App Development',
    'Database Migration',
    'Security Audit',
    'Cloud Integration'
  ]

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive"
      })
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      if (editingNote) {
        // Update existing note
        const { error } = await supabase
          .from('notes')
          .update({
            title: formData.title,
            content: formData.content,
            related_client: formData.related_client === 'no-client' ? null : formData.related_client,
            related_project: formData.related_project === 'no-project' ? null : formData.related_project,
            tags: formData.tags || null,
            attachments: formData.attachments,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingNote.id)

        if (error) throw error
        
        toast({
          title: "Success",
          description: "Note updated successfully"
        })
      } else {
        // Create new note
        const { error } = await supabase
          .from('notes')
          .insert({
            title: formData.title,
            content: formData.content,
            related_client: formData.related_client === 'no-client' ? null : formData.related_client,
            related_project: formData.related_project === 'no-project' ? null : formData.related_project,
            tags: formData.tags || null,
            attachments: formData.attachments,
            user_id: user.id,
            created_by: user.id
          })

        if (error) throw error
        
        toast({
          title: "Success",
          description: "Note created successfully"
        })
      }

      await fetchNotes()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving note:', error)
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (noteId: string) => {
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

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      related_client: '',
      related_project: '',
      tags: '',
      attachments: []
    })
    setEditingNote(null)
  }

  const openEditDialog = (note: Note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      content: note.content || '',
      related_client: note.related_client || 'no-client',
      related_project: note.related_project || 'no-project',
      tags: note.tags || '',
      attachments: note.attachments || []
    })
    setIsDialogOpen(true)
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

  const getTags = (tagsString?: string) => {
    if (!tagsString) return []
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading notes...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-600 mt-1">Manage your notes and ideas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter note title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  placeholder="Write your note content here... Use **bold**, *italic*, __underline__, • for bullets, 1. for numbers"
                  rows={8}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="related_client">Related Client</Label>
                  <Select
                    value={formData.related_client}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, related_client: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-client">No client</SelectItem>
                      {availableClients.map((client) => (
                        <SelectItem key={client} value={client}>{client}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="related_project">Related Project</Label>
                  <Select
                    value={formData.related_project}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, related_project: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-project">No project</SelectItem>
                      {availableProjects.map((project) => (
                        <SelectItem key={project} value={project}>{project}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingNote ? 'Update Note' : 'Create Note'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search notes by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterClient} onValueChange={setFilterClient}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-clients">All clients</SelectItem>
                  {availableClients.map((client) => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterProject} onValueChange={setFilterProject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-projects">All projects</SelectItem>
                  {availableProjects.map((project) => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <StickyNote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600 mb-4">
              {notes.length === 0 
                ? "Create your first note to get started" 
                : "Try adjusting your search or filters"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(note)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {note.content && (
                  <div className="text-gray-600 text-sm line-clamp-3">
                    <FormattedText content={note.content} />
                  </div>
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
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="text-xs text-gray-400 pt-2 border-t">
                  Created {format(new Date(note.created_at), 'MMM d, yyyy')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
