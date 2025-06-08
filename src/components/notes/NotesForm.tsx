
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Save, X } from 'lucide-react'
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
    } else if (editingNote === null) {
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
    setEditingNote(undefined as any)
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
        // Convert 'none' values back to empty strings for database
        related_client: formData.related_client === 'none' ? '' : formData.related_client,
        related_project: formData.related_project === 'none' ? '' : formData.related_project,
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="border-b border-gray-100 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {editingNote ? 'Edit Note' : 'New Note'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Title"
              required
              className="text-lg font-medium border-0 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Start writing..."
              rows={8}
              className="resize-none border-0 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-500 text-base leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client" className="text-sm font-medium text-gray-700 mb-2 block">Client</Label>
              <Select value={formData.related_client || 'none'} onValueChange={(value) => setFormData({ ...formData, related_client: value })}>
                <SelectTrigger className="bg-gray-50 border-0 rounded-xl">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-lg">
                  <SelectItem value="none">None</SelectItem>
                  {availableClients.map((client) => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project" className="text-sm font-medium text-gray-700 mb-2 block">Project</Label>
              <Select value={formData.related_project || 'none'} onValueChange={(value) => setFormData({ ...formData, related_project: value })}>
                <SelectTrigger className="bg-gray-50 border-0 rounded-xl">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-lg">
                  <SelectItem value="none">None</SelectItem>
                  {availableProjects.map((project) => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700 mb-2 block">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Add tags separated by commas"
              className="border-0 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={loading}
              className="px-6 py-2 rounded-xl border-gray-300"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : (editingNote ? 'Save Changes' : 'Create Note')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
