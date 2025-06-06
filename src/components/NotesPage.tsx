
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, StickyNote, Filter, Upload, X, Mic, MicOff, Bold, Italic } from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

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
  const [submitting, setSubmitting] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
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

  // Rich text editor state
  const [selectedText, setSelectedText] = useState('')
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null)

  // Mock data for dropdowns
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
      console.log('Fetching notes...')
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

    setSubmitting(true)
    console.log('Submitting note with data:', formData)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('Not authenticated')
      }

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
      related_client: note.related_client || '',
      related_project: note.related_project || '',
      tags: note.tags || '',
      attachments: note.attachments || []
    })
    setIsDialogOpen(true)
  }

  // Rich text formatting functions
  const formatText = (format: 'bold' | 'italic') => {
    if (!textareaRef) return

    const start = textareaRef.selectionStart
    const end = textareaRef.selectionEnd
    const selectedText = textareaRef.value.substring(start, end)
    
    if (selectedText) {
      let formattedText = ''
      if (format === 'bold') {
        formattedText = `**${selectedText}**`
      } else if (format === 'italic') {
        formattedText = `*${selectedText}*`
      }
      
      const newContent = 
        textareaRef.value.substring(0, start) + 
        formattedText + 
        textareaRef.value.substring(end)
      
      setFormData(prev => ({ ...prev, content: newContent }))
    }
  }

  // Audio recording functions
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

  const renderFormattedText = (content: string) => {
    if (!content) return content
    
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
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
    <div className="space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-600 mt-1">Manage your notes and ideas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm} 
              className="flex items-center gap-2 bg-yellow-400 text-black hover:bg-yellow-500 border-0 rounded-xl px-6 py-3 font-medium"
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
                  className="text-lg font-semibold border-0 border-b border-gray-200 rounded-none px-0 py-3 focus:border-yellow-400 bg-transparent"
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
                  ref={setTextareaRef}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Start writing your note..."
                  className="w-full min-h-[300px] p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white text-gray-900"
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
                      <SelectItem value="">No client</SelectItem>
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
                      <SelectItem value="">No project</SelectItem>
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
                  className="bg-yellow-400 text-black hover:bg-yellow-500 px-6"
                >
                  {submitting ? 'Saving...' : (editingNote ? 'Update Note' : 'Save Note')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="px-6">
        <Card className="bg-white border border-gray-100">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterClient} onValueChange={setFilterClient}>
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue placeholder="All clients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All clients</SelectItem>
                    {availableClients.map((client) => (
                      <SelectItem key={client} value={client}>{client}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterProject} onValueChange={setFilterProject}>
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue placeholder="All projects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All projects</SelectItem>
                    {availableProjects.map((project) => (
                      <SelectItem key={project} value={project}>{project}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
                  <SelectTrigger className="w-32 bg-white">
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
      </div>

      {/* Notes Grid */}
      <div className="px-6">
        {filteredNotes.length === 0 ? (
          <Card className="bg-white border border-gray-100">
            <CardContent className="p-8 text-center">
              <StickyNote className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
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
              <Card key={note.id} className="hover:shadow-md transition-shadow bg-white border border-gray-100 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2 text-gray-900">{note.title}</CardTitle>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          openEditDialog(note)
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(note.id)
                        }}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent 
                  className="space-y-3"
                  onClick={() => openEditDialog(note)}
                >
                  {note.content && (
                    <div 
                      className="text-gray-600 text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: renderFormattedText(note.content) }}
                    />
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
                        <Badge key={index} variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                    {format(new Date(note.created_at), 'MMM d, yyyy')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
