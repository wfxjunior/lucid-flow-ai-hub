
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  CalendarCheck, Clock, Users, MapPin, Zap, Brain, 
  Plus, Filter, Search, Bell, Settings
} from 'lucide-react'
import { format, addDays, startOfWeek, endOfWeek } from "date-fns"
import { NextProjectsCalendar } from "@/components/NextProjectsCalendar"

interface SmartScheduleItem {
  id: string
  title: string
  type: 'appointment' | 'project' | 'meeting' | 'task'
  startTime: string
  endTime: string
  date: string
  location?: string
  attendees?: string[]
  priority: 'low' | 'medium' | 'high'
  status: 'scheduled' | 'confirmed' | 'pending' | 'completed'
  aiSuggested?: boolean
}

const mockScheduleData: SmartScheduleItem[] = [
  {
    id: '1',
    title: 'Client Consultation - Johnson Corp',
    type: 'appointment',
    startTime: '09:00',
    endTime: '10:00',
    date: format(new Date(), 'yyyy-MM-dd'),
    location: '123 Business St',
    attendees: ['John Johnson', 'Sarah Wilson'],
    priority: 'high',
    status: 'confirmed',
    aiSuggested: false
  },
  {
    id: '2',
    title: 'Website Development Project',
    type: 'project',
    startTime: '14:00',
    endTime: '17:00',
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    location: 'Remote',
    priority: 'medium',
    status: 'scheduled',
    aiSuggested: true
  },
  {
    id: '3',
    title: 'Team Standup Meeting',
    type: 'meeting',
    startTime: '11:00',
    endTime: '11:30',
    date: format(new Date(), 'yyyy-MM-dd'),
    attendees: ['Team Members'],
    priority: 'medium',
    status: 'scheduled',
    aiSuggested: false
  }
]

const mockProjects = [
  {
    id: '1',
    projectName: 'Office Renovation',
    clientName: 'ABC Corp',
    jobLocation: '456 Corporate Ave',
    startDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    startTime: '08:00',
    assignedWorkers: ['Mike Johnson', 'Sarah Davis'],
    jobDescription: 'Complete office renovation including flooring and painting',
    status: 'confirmed' as const,
    notifyWorkers: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    projectName: 'Kitchen Remodel',
    clientName: 'Johnson Family',
    jobLocation: '789 Residential St',
    startDate: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    startTime: '09:00',
    assignedWorkers: ['Tom Wilson', 'Lisa Brown'],
    jobDescription: 'Full kitchen remodel with new cabinets and countertops',
    status: 'pending-confirmation' as const,
    notifyWorkers: false,
    createdAt: new Date().toISOString()
  }
]

export function SmartSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [scheduleItems, setScheduleItems] = useState<SmartScheduleItem[]>(mockScheduleData)
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'projects'>('calendar')
  const [filterType, setFilterType] = useState<string>('all')
  const [showNewItemDialog, setShowNewItemDialog] = useState(false)

  const filteredItems = scheduleItems.filter(item => {
    if (filterType === 'all') return true
    return item.type === filterType
  })

  const getItemsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return scheduleItems.filter(item => item.date === dateStr)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <CalendarCheck className="h-4 w-4" />
      case 'project': return <Users className="h-4 w-4" />
      case 'meeting': return <Clock className="h-4 w-4" />
      case 'task': return <Zap className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Brain className="h-8 w-8 text-blue-600" />
            SmartSchedule
          </h1>
          <p className="text-gray-600 mt-1">AI-powered intelligent scheduling and project management</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </Button>
          <Dialog open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Schedule Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Schedule Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter title..." />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location..." />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter description..." />
                </div>
                <Button className="w-full">Create Schedule Item</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex items-center gap-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            Calendar View
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
          <Button
            variant={viewMode === 'projects' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('projects')}
          >
            Projects Calendar
          </Button>
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="appointment">Appointments</SelectItem>
            <SelectItem value="project">Projects</SelectItem>
            <SelectItem value="meeting">Meetings</SelectItem>
            <SelectItem value="task">Tasks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* AI Insights */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Brain className="h-5 w-5" />
            AI Schedule Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-blue-800">AI Suggestions Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-blue-800">Schedule Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2h</div>
              <div className="text-sm text-blue-800">Time Saved This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content based on view mode */}
      {viewMode === 'projects' ? (
        <NextProjectsCalendar projects={mockProjects} />
      ) : viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Schedule Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Selected Date Items */}
          <Card>
            <CardHeader>
              <CardTitle>{format(selectedDate, "MMMM d, yyyy")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {getItemsForDate(selectedDate).map((item) => (
                <div key={item.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        {item.aiSuggested && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            AI
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.startTime} - {item.endTime}
                      </p>
                      {item.location && (
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{item.location}</span>
                        </div>
                      )}
                    </div>
                    <Badge className={getPriorityColor(item.priority)} variant="outline">
                      {item.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        /* List View */
        <Card>
          <CardHeader>
            <CardTitle>Schedule Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">
                          {format(new Date(item.date), 'MMM d')} • {item.startTime} - {item.endTime}
                        </p>
                      </div>
                    </div>
                    {item.aiSuggested && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Brain className="h-3 w-3 mr-1" />
                        AI Suggested
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(item.priority)} variant="outline">
                      {item.priority}
                    </Badge>
                    <Badge variant="outline">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
