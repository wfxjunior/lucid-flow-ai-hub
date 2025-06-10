
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, MapPin, Users, Clock, Bell } from 'lucide-react'
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"

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

interface NextProjectsCalendarProps {
  projects: NextProject[]
}

const statusColors = {
  'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
  'pending-confirmation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'confirmed': 'bg-green-100 text-green-800 border-green-200'
}

export function NextProjectsCalendar({ projects }: NextProjectsCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedProject, setSelectedProject] = useState<NextProject | null>(null)

  // Get projects for a specific date
  const getProjectsForDate = (date: Date) => {
    return projects.filter(project => 
      isSameDay(new Date(project.startDate), date)
    )
  }

  // Get all dates that have projects
  const getDatesWithProjects = () => {
    return projects.map(project => new Date(project.startDate))
  }

  const projectDates = getDatesWithProjects()
  const selectedDateProjects = getProjectsForDate(selectedDate)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Project Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="w-full pointer-events-auto"
              modifiers={{
                hasProjects: projectDates
              }}
              modifiersStyles={{
                hasProjects: { 
                  backgroundColor: '#dbeafe', 
                  color: '#1d4ed8',
                  fontWeight: 'bold'
                }
              }}
            />
            <div className="mt-4 text-sm text-gray-600">
              <p><span className="inline-block w-3 h-3 bg-blue-100 rounded mr-2"></span>Dates with scheduled projects</p>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {format(selectedDate, "MMMM d, yyyy")}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {selectedDateProjects.length} project{selectedDateProjects.length !== 1 ? 's' : ''} scheduled
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedDateProjects.length === 0 ? (
              <p className="text-gray-500 text-sm">No projects scheduled for this date.</p>
            ) : (
              selectedDateProjects.map((project) => (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{project.projectName}</h4>
                          <p className="text-xs text-gray-600 mt-1">{project.clientName}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{project.startTime}</span>
                          </div>
                        </div>
                        <Badge 
                          className={`text-xs ${statusColors[project.status]}`}
                          variant="outline"
                        >
                          {project.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{project.projectName}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700">Client</h4>
                          <p className="text-sm">{project.clientName}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-700">Status</h4>
                          <Badge className={statusColors[project.status]} variant="outline">
                            {project.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700">Date & Time</h4>
                          <p className="text-sm">{format(new Date(project.startDate), 'PPP')} at {project.startTime}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-700">Location</h4>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <p className="text-sm">{project.jobLocation}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-700">Assigned Workers</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <p className="text-sm">{project.assignedWorkers.join(', ')}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-700">Job Description</h4>
                        <p className="text-sm text-gray-600">{project.jobDescription}</p>
                      </div>

                      {project.notifyWorkers && (
                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                          <Bell className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-800">Workers will be notified</span>
                        </div>
                      )}

                      {project.internalNotes && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700">Internal Notes</h4>
                          <p className="text-sm text-gray-600 p-2 bg-gray-50 rounded-md">{project.internalNotes}</p>
                        </div>
                      )}

                      {project.fileAttachment && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700">Attached File</h4>
                          <p className="text-sm text-blue-600">{project.fileAttachment}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {projects.filter(p => p.status === 'scheduled').length}
              </div>
              <div className="text-sm text-blue-800">Scheduled</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {projects.filter(p => p.status === 'pending-confirmation').length}
              </div>
              <div className="text-sm text-yellow-800">Pending Confirmation</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {projects.filter(p => p.status === 'confirmed').length}
              </div>
              <div className="text-sm text-green-800">Confirmed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
