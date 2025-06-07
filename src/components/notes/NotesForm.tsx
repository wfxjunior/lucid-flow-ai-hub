import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Mic, MicOff, Bold, Italic } from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useNotes, Note } from './NotesContext'

interface NotesFormProps {
  editingNote: Note | null
  setEditingNote: (note: Note | null) => void
}

export const NotesForm = ({ editingNote, setEditingNote }: NotesFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { user, fetchNotes } = useNotes()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    related_client: '',
    related_project: '',
    tags: '',
    attachments: [] as string[]
  })

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
      related_client: note.related_client || '',
      related_project: note.related_project || '',
      tags: note.tags || '',
      attachments: note.attachments || []
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save notes",
        variant: "destructive"
      })
      return
    }
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive"
      })
      return
    }

    setSubmitting(true)
    console.log('Submitting note with data:', formData)

    try {
      const noteData = {
        title: formData.title.trim(),
        content: formData.content || '',
        related_client: formData.related_client && formData.related_client !== 'no-client' ? formData.related_client : null,
        related_project: formData.related_project && formData.related_project !== 'no-project' ? formData.related_project : null,
        tags: formData.tags.trim() || null,
        attachments: formData.attachments,
        user_id: user.id,
        created_by: user.id
      }

      if (editingNote) {
        const { data, error } = await supabase
          .from('notes')
          .update({
            ...noteData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingNote.id)
          .select()

        if (error) throw error
        
        toast({
          title: "Success",
          description: "Note updated successfully"
        })
      } else {
        const { data, error } = await supabase
          .from('notes')
          .insert([noteData])
          .select()

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
        description: `Failed to save note: ${error.message}`,
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const formatText = (format: 'bold' | 'italic') => {
    if (!textareaRef.current) return

    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd
    const selectedText = textareaRef.current.value.substring(start, end)
    
    if (selectedText) {
      let formattedText = ''
      if (format === 'bold') {
        formattedText = `**${selectedText}**`
      } else if (format === 'italic') {
        formattedText = `*${selectedText}*`
      }
      
      const newContent = 
        textareaRef.current.value.substring(0, start) + 
        formattedText + 
        textareaRef.current.value.substring(end)
      
      setFormData(prev => ({ ...prev, content: newContent }))
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const audioChunks: Blob[] = []

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        const reader = new FileReader()
        
        reader.onloadend = async () => {
          const base64Audio = reader.result?.toString().split(',')[1]
          if (base64Audio) {
            await transcribeAudio(base64Audio)
          }
        }
        
        reader.readAsDataURL(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
      toast({
        title: "Error",
        description: "Could not start recording. Please check microphone permissions.",
        variant: "destructive"
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setIsRecording(false)
      setMediaRecorder(null)
    }
  }

  const transcribeAudio = async (audioBase64: string) => {
    try {
      toast({
        title: "Processing",
        description: "Transcribing audio..."
      })

      const response = await supabase.functions.invoke('transcribe-audio', {
        body: { audio: audioBase64 }
      })

      if (response.error) throw response.error

      const transcription = response.data?.text || ''
      setFormData(prev => ({
        ...prev,
        content: prev.content + (prev.content ? '\n\n' : '') + transcription
      }))

      toast({
        title: "Success",
        description: "Audio transcribed successfully"
      })
    } catch (error) {
      console.error('Error transcribing audio:', error)
      toast({
        title: "Error",
        description: "Failed to transcribe audio",
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          onClick={resetForm} 
          className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 border-0 rounded-xl px-6 py-3 font-medium"
        >
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {editingNote ? 'Edit Note' : 'New Note'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Title"
              className="text-lg font-semibold border-0 border-b border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 bg-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => formatText('bold')}
                className="h-8 w-8 p-0"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => formatText('italic')}
                className="h-8 w-8 p-0"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
                className={`h-8 w-8 p-0 ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <textarea
              ref={textareaRef}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Start writing your note..."
              className="w-full min-h-[300px] p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
              rows={12}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Client</Label>
              <Select
                value={formData.related_client}
                onValueChange={(value) => setFormData(prev => ({ ...prev, related_client: value }))}
              >
                <SelectTrigger className="bg-white">
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
              <Label className="text-sm font-medium text-gray-700">Project</Label>
              <Select
                value={formData.related_project}
                onValueChange={(value) => setFormData(prev => ({ ...prev, related_project: value }))}
              >
                <SelectTrigger className="bg-white">
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
            <Label className="text-sm font-medium text-gray-700">Tags</Label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Enter tags separated by commas"
              className="bg-white"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={submitting}
              className="bg-blue-500 text-white hover:bg-blue-600 px-6"
            >
              {submitting ? 'Saving...' : (editingNote ? 'Update Note' : 'Save Note')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
