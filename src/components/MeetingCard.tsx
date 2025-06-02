
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Video, MapPin, ExternalLink, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { useMeetingData } from "@/hooks/useMeetingData"
import { toast } from "sonner"

interface MeetingCardProps {
  meeting: {
    id: string
    title: string
    description?: string
    meeting_date: string
    duration_minutes: number
    meeting_platform: string
    meeting_url?: string
    location?: string
    status: string
    attendees?: Array<{
      id: string
      name: string
      email: string
      status: string
    }>
  }
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const { deleteMeeting } = useMeetingData()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'zoom': return '📹'
      case 'teams': return '🎥'
      case 'meet': return '📺'
      case 'in-person': return '🏢'
      default: return '💻'
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this meeting?')) {
      try {
        await deleteMeeting(meeting.id)
        toast.success('Meeting deleted successfully')
      } catch (error) {
        toast.error('Failed to delete meeting')
      }
    }
  }

  const joinMeeting = () => {
    if (meeting.meeting_url) {
      window.open(meeting.meeting_url, '_blank')
    }
  }

  const meetingDate = new Date(meeting.meeting_date)
  const now = new Date()
  const isToday = meetingDate.toDateString() === now.toDateString()
  const isPast = meetingDate < now

  return (
    <Card className={`${isToday ? 'border-blue-200 bg-blue-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{meeting.title}</h3>
                {meeting.description && (
                  <p className="text-gray-600 text-sm">{meeting.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(meeting.status)}>
                  {meeting.status}
                </Badge>
                {isToday && (
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    Today
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(meetingDate, 'MMM dd, yyyy')}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {format(meetingDate, 'HH:mm')} ({meeting.duration_minutes}min)
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg">{getPlatformIcon(meeting.meeting_platform)}</span>
                {meeting.meeting_platform}
              </div>
              {meeting.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {meeting.location}
                </div>
              )}
              {meeting.attendees && meeting.attendees.length > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {meeting.attendees.length} attendee{meeting.attendees.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {meeting.meeting_url && !isPast && (
              <Button 
                onClick={joinMeeting}
                className="flex items-center gap-2"
                size="sm"
              >
                <ExternalLink className="w-4 h-4" />
                Join
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
