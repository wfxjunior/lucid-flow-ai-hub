
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Save, X } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Note, useNotes } from './NotesContext'
import { RichTextEditor } from '../RichTextEditor'
import { useLanguage } from '@/contexts/LanguageContext'

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
  const { t } = useLanguage()

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
        related_client: formData.related_client === 'none-client' ? '' : formData.related_client,
        related_project: formData.related_project === 'none-project' ? '' : formData.related_project,
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
        title: t('notes.success'),
        description: editingNote ? t('notes.noteUpdated') : t('notes.noteCreated')
      })

      await fetchNotes()
      resetForm()
    } catch (error) {
      console.error('Error saving note:', error)
      toast({
        title: t('notes.error'),
        description: t('notes.saveError'),
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
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white rounded-3xl border-0 shadow-2xl p-0">
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-6 py-4 z-10">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              {editingNote ? t('notes.editNote') : t('notes.newNote')}
            </DialogTitle>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t('notes.titlePlaceholder')}
              required
              className="text-xl font-semibold border-0 bg-gray-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">{t('notes.content')}</Label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder={t('notes.contentPlaceholder')}
              rows={12}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="client" className="text-sm font-medium text-gray-700 mb-3 block">{t('notes.client')}</Label>
              <Select value={formData.related_client || 'none-client'} onValueChange={(value) => setFormData({ ...formData, related_client: value })}>
                <SelectTrigger className="bg-gray-50 border-0 rounded-2xl h-12 px-4">
                  <SelectValue placeholder={t('notes.selectClient')} />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-0 shadow-xl bg-white">
                  <SelectItem value="none-client" className="rounded-xl">{t('notes.none')}</SelectItem>
                  {availableClients.map((client) => (
                    <SelectItem key={client} value={client} className="rounded-xl">{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project" className="text-sm font-medium text-gray-700 mb-3 block">{t('notes.project')}</Label>
              <Select value={formData.related_project || 'none-project'} onValueChange={(value) => setFormData({ ...formData, related_project: value })}>
                <SelectTrigger className="bg-gray-50 border-0 rounded-2xl h-12 px-4">
                  <SelectValue placeholder={t('notes.selectProject')} />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-0 shadow-xl bg-white">
                  <SelectItem value="none-project" className="rounded-xl">{t('notes.none')}</SelectItem>
                  {availableProjects.map((project) => (
                    <SelectItem key={project} value={project} className="rounded-xl">{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700 mb-3 block">{t('notes.tags')}</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder={t('notes.tagsPlaceholder')}
              className="border-0 bg-gray-50 rounded-2xl px-4 py-3 h-12 focus:bg-white focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-3xl">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={loading}
              className="px-8 py-3 rounded-2xl border-2 border-gray-200 hover:border-gray-300 font-medium"
            >
              <X className="h-4 w-4 mr-2" />
              {t('notes.cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-medium shadow-lg"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? t('notes.saving') : (editingNote ? t('notes.saveChanges') : t('notes.createNote'))}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
