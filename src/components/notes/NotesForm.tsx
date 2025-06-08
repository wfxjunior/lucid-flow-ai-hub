
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Save, X } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Note, useNotes } from './NotesContext'

interface NotesFormProps {
  editingNote: Note | null
  setEditingNote: (note: Note | null) => void
}

export const NotesForm = ({ editingNote, setEditingNote }: NotesFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    related_client: '',
    related_project: '',
    tags: ''
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { fetchNotes } = useNotes()

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title || '',
        content: editingNote.content || '',
        related_client: editingNote.related_client || '',
        related_project: editingNote.related_project || '',
        tags: editingNote.tags || ''
      })
      setIsOpen(true)
    }
  }, [editingNote])

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      related_client: '',
      related_project: '',
      tags: ''
    })
    setEditingNote(null)
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      const noteData = {
        ...formData,
        user_id: user.id,
        created_by: user.id
      }

      let error
      if (editingNote) {
        const { error: updateError } = await supabase
          .from('notes')
          .update(noteData)
          .eq('id', editingNote.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase
          .from('notes')
          .insert([noteData])
        error = insertError
      }

      if (error) throw error

      toast({
        title: "Success",
        description: editingNote ? "Note updated successfully" : "Note created successfully"
      })

      await fetchNotes()
      resetForm()
    } catch (error) {
      console.error('Error saving note:', error)
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const availableClients = [
    'Personal',
    'Tech Corp Ltd',
    'Acme Corporation', 
    'Global Industries',
    'Smart Solutions Inc',
    'Modern Enterprises'
  ]

  const availableProjects = [
    'Personal',
    'Website Redesign',
    'Mobile App Development',
    'Database Migration',
    'Security Audit',
    'Cloud Integration'
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetForm()
    }}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter note title"
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter your note content here..."
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client">Related Client</Label>
              <Select value={formData.related_client} onValueChange={(value) => setFormData({ ...formData, related_client: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {availableClients.map((client) => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project">Related Project</Label>
              <Select value={formData.related_project} onValueChange={(value) => setFormData({ ...formData, related_project: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {availableProjects.map((project) => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={loading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : (editingNote ? 'Update Note' : 'Create Note')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
