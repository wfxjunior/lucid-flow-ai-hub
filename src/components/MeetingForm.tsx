
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Calendar, Clock, Users, Video } from "lucide-react"
import { useMeetingData } from "@/hooks/useMeetingData"
import { useBusinessData } from "@/hooks/useBusinessData"
import { toast } from "sonner"
import { format } from "date-fns"

interface MeetingFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function MeetingForm({ onClose, onSuccess }: MeetingFormProps) {
  const { createMeeting } = useMeetingData()
  const { clients } = useBusinessData()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    meeting_date: "",
    duration_minutes: 60,
    meeting_platform: "zoom",
    meeting_url: "",
    meeting_password: "",
    location: "",
    notes: ""
  })

  const [attendees, setAttendees] = useState<Array<{
    email: string
    name: string
    client_id?: string
  }>>([])

  const [newAttendee, setNewAttendee] = useState({
    email: "",
    name: "",
    client_id: ""
  })

  const addAttendee = () => {
    if (!newAttendee.email || !newAttendee.name) {
      toast.error("Please enter both name and email for the attendee")
      return
    }

    if (attendees.some(a => a.email === newAttendee.email)) {
      toast.error("Attendee with this email already added")
      return
    }

    setAttendees([...attendees, { ...newAttendee }])
    setNewAttendee({ email: "", name: "", client_id: "" })
  }

  const removeAttendee = (index: number) => {
    setAttendees(attendees.filter((_, i) => i !== index))
  }

  const addClientAsAttendee = (clientId: string) => {
    const client = clients?.find(c => c.id === clientId)
    if (!client) return

    if (attendees.some(a => a.email === client.email)) {
      toast.error("This client is already added as an attendee")
      return
    }

    setAttendees([...attendees, {
      email: client.email,
      name: client.name,
      client_id: client.id
    }])
  }

  const generateMeetingUrl = () => {
    const meetingId = `meeting-${Date.now()}`
    let url = ""
    
    switch (formData.meeting_platform) {
      case 'zoom':
        url = `https://zoom.us/j/${meetingId}`
        break
      case 'teams':
        url = `https://teams.microsoft.com/l/meetup-join/${meetingId}`
        break
      case 'meet':
        url = `https://meet.google.com/${meetingId}`
        break
      default:
        url = ""
    }
    
    setFormData({ ...formData, meeting_url: url })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.meeting_date) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsLoading(true)

    try {
      await createMeeting({
        ...formData,
        duration_minutes: Number(formData.duration_minutes),
        attendees
      })
      
      toast.success("Meeting scheduled successfully")
      onSuccess()
    } catch (error) {
      console.error('Error creating meeting:', error)
      toast.error("Failed to schedule meeting")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Schedule Meeting
              </CardTitle>
              <CardDescription>
                Create a new meeting and invite attendees
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Meeting Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter meeting title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Meeting agenda or description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meeting_date">Date & Time *</Label>
                  <Input
                    id="meeting_date"
                    type="datetime-local"
                    value={formData.meeting_date}
                    onChange={(e) => setFormData({ ...formData, meeting_date: e.target.value })}
                    min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select
                    value={formData.duration_minutes.toString()}
                    onValueChange={(value) => setFormData({ ...formData, duration_minutes: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Meeting Platform */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Meeting Platform</h3>
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={formData.meeting_platform}
                  onValueChange={(value) => setFormData({ ...formData, meeting_platform: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="teams">Microsoft Teams</SelectItem>
                    <SelectItem value="meet">Google Meet</SelectItem>
                    <SelectItem value="in-person">In Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.meeting_platform !== 'in-person' && (
                <div>
                  <Label htmlFor="meeting_url">Meeting URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="meeting_url"
                      value={formData.meeting_url}
                      onChange={(e) => setFormData({ ...formData, meeting_url: e.target.value })}
                      placeholder="Enter meeting URL or generate one"
                    />
                    <Button type="button" onClick={generateMeetingUrl} variant="outline">
                      Generate
                    </Button>
                  </div>
                </div>
              )}

              {formData.meeting_platform === 'in-person' && (
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter meeting location"
                  />
                </div>
              )}

              {formData.meeting_platform !== 'in-person' && (
                <div>
                  <Label htmlFor="password">Meeting Password</Label>
                  <Input
                    id="password"
                    value={formData.meeting_password}
                    onChange={(e) => setFormData({ ...formData, meeting_password: e.target.value })}
                    placeholder="Optional meeting password"
                  />
                </div>
              )}
            </div>

            {/* Attendees */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Attendees</h3>
              
              {/* Quick add from clients */}
              {clients && clients.length > 0 && (
                <div>
                  <Label>Add from clients</Label>
                  <Select onValueChange={addClientAsAttendee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} ({client.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Manual attendee entry */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  placeholder="Name"
                  value={newAttendee.name}
                  onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newAttendee.email}
                  onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                />
                <Button type="button" onClick={addAttendee} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>

              {/* Attendees list */}
              {attendees.length > 0 && (
                <div className="space-y-2">
                  <Label>Invited Attendees ({attendees.length})</Label>
                  <div className="space-y-2">
                    {attendees.map((attendee, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{attendee.name}</span>
                          <span className="text-gray-500 ml-2">({attendee.email})</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttendee(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes or preparation instructions"
                rows={3}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Scheduling..." : "Schedule Meeting"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
