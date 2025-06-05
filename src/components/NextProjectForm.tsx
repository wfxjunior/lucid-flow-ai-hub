import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CalendarIcon, Clock, Upload, X } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface NextProject {
  id: string
  projectName: string
  clientName: string
  jobLocation: string
  startDate: string
  startTime: string
  assignedWorkers: string[]
  jobDescription: string
  fileAttachment?: string
  status: 'scheduled' | 'pending-confirmation' | 'confirmed'
  notifyWorkers: boolean
  internalNotes?: string
  createdAt: string
}

interface NextProjectFormProps {
  project?: NextProject | null
  onSubmit: (project: Omit<NextProject, 'id' | 'createdAt'>) => void
  onCancel: () => void
}

// Mock team members - in a real app, this would come from a database
const availableWorkers = [
  'John Smith',
  'Mike Johnson', 
  'Sarah Davis',
  'Robert Wilson',
  'Emily Brown',
  'David Miller',
  'Lisa Garcia',
  'James Jones'
]

// Mock clients - in a real app, this would come from a database
const availableClients = [
  'Tech Corp Ltd',
  'Acme Corporation',
  'Global Industries',
  'Smart Solutions Inc',
  'Modern Enterprises',
  'Future Systems'
]

export function NextProjectForm({ project, onSubmit, onCancel }: NextProjectFormProps) {
  const [formData, setFormData] = useState({
    projectName: project?.projectName || '',
    clientName: project?.clientName || '',
    jobLocation: project?.jobLocation || '',
    startDate: project?.startDate || '',
    startTime: project?.startTime || '09:00',
    assignedWorkers: project?.assignedWorkers || [],
    jobDescription: project?.jobDescription || '',
    fileAttachment: project?.fileAttachment || '',
    status: project?.status || 'scheduled' as const,
    notifyWorkers: project?.notifyWorkers ?? true,
    internalNotes: project?.internalNotes || ''
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    project?.startDate ? new Date(project.startDate) : undefined
  )
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.projectName || !formData.clientName || !formData.startDate) {
      return
    }

    onSubmit({
      ...formData,
      startDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : formData.startDate
    })
  }

  const handleWorkerToggle = (worker: string) => {
    setFormData(prev => ({
      ...prev,
      assignedWorkers: prev.assignedWorkers.includes(worker)
        ? prev.assignedWorkers.filter(w => w !== worker)
        : [...prev.assignedWorkers, worker]
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setFormData(prev => ({ ...prev, fileAttachment: file.name }))
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setFormData(prev => ({ ...prev, fileAttachment: '' }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {project ? 'Edit Upcoming Job' : 'Schedule New Job'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Plan and schedule upcoming projects and service appointments
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                  placeholder="Enter project name"
                  required
                />
              </div>

              {/* Client Name */}
              <div className="space-y-2">
                <Label htmlFor="clientName">Client / Company Name *</Label>
                <Select
                  value={formData.clientName}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, clientName: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select or enter client name" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClients.map((client) => (
                      <SelectItem key={client} value={client}>{client}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Location */}
            <div className="space-y-2">
              <Label htmlFor="jobLocation">Job Location</Label>
              <Input
                id="jobLocation"
                value={formData.jobLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, jobLocation: e.target.value }))}
                placeholder="Enter job location or address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Start Time */}
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Assigned Workers */}
            <div className="space-y-2">
              <Label>Assigned Workers</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 border rounded-md">
                {availableWorkers.map((worker) => (
                  <div key={worker} className="flex items-center space-x-2">
                    <Checkbox
                      id={worker}
                      checked={formData.assignedWorkers.includes(worker)}
                      onCheckedChange={() => handleWorkerToggle(worker)}
                    />
                    <Label htmlFor={worker} className="text-sm font-normal cursor-pointer">
                      {worker}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.assignedWorkers.length > 0 && (
                <p className="text-sm text-gray-600">
                  Selected: {formData.assignedWorkers.join(', ')}
                </p>
              )}
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={formData.jobDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                placeholder="Describe the job details, requirements, and any special instructions"
                rows={4}
              />
            </div>

            {/* File Attachment */}
            <div className="space-y-2">
              <Label htmlFor="fileAttachment">File Attachment</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    id="fileAttachment"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('fileAttachment')?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Document or Photo
                  </Button>
                </div>
                {uploadedFile && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <span className="text-sm">{uploadedFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'scheduled' | 'pending-confirmation' | 'confirmed') => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="pending-confirmation">Pending Confirmation</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notification Checkbox */}
              <div className="space-y-2 flex items-center">
                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="notifyWorkers"
                    checked={formData.notifyWorkers}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, notifyWorkers: checked === true }))
                    }
                  />
                  <Label htmlFor="notifyWorkers" className="cursor-pointer">
                    Notify workers before start
                  </Label>
                </div>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <Label htmlFor="internalNotes">Internal Notes (Admin Only)</Label>
              <Textarea
                id="internalNotes"
                value={formData.internalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, internalNotes: e.target.value }))}
                placeholder="Add any internal notes for the admin team"
                rows={3}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {project ? 'Update Job' : 'Schedule Job'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
