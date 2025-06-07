
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Calendar, ChevronLeft, ChevronRight, Filter, Clock, MapPin } from 'lucide-react'

interface ScheduleEvent {
  id: string
  client_name: string
  client_address: string
  job_type: string
  service_date: string
  start_time: string
  end_time: string
  assigned_workers: string[]
  job_description: string
  status: string
}

export const ScheduleCalendar = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [filters, setFilters] = useState({
    jobType: 'all',
    status: 'all',
    worker: 'all'
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
  }, [currentDate, viewMode])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('smart_schedules')
        .select('*')
        .order('service_date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      toast({
        title: "Error",
        description: "Failed to fetch schedule events",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const getJobTypeColor = (jobType: string) => {
    const colors = {
      'Cleaning': 'bg-purple-500',
      'Flooring': 'bg-blue-500',
      'Paver': 'bg-orange-500',
      'Gutter': 'bg-green-500',
      'Delivery': 'bg-yellow-500',
      'Rental': 'bg-pink-500',
      'Other': 'bg-gray-500'
    }
    return colors[jobType as keyof typeof colors] || colors.Other
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Confirmed': return 'bg-blue-100 text-blue-800'
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800'
      case 'Canceled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    }
    
    setCurrentDate(newDate)
  }

  const getDateRange = () => {
    const start = new Date(currentDate)
    const end = new Date(currentDate)

    if (viewMode === 'month') {
      start.setDate(1)
      end.setMonth(end.getMonth() + 1, 0)
    } else if (viewMode === 'week') {
      const dayOfWeek = start.getDay()
      start.setDate(start.getDate() - dayOfWeek)
      end.setDate(start.getDate() + 6)
    }

    return { start, end }
  }

  const filterEvents = (events: ScheduleEvent[]) => {
    return events.filter(event => {
      if (filters.jobType !== 'all' && event.job_type !== filters.jobType) return false
      if (filters.status !== 'all' && event.status !== filters.status) return false
      if (filters.worker !== 'all' && !event.assigned_workers.includes(filters.worker)) return false
      
      const eventDate = new Date(event.service_date)
      const { start, end } = getDateRange()
      
      return eventDate >= start && eventDate <= end
    })
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return filterEvents(events).filter(event => event.service_date === dateStr)
  }

  const formatDateHeader = () => {
    if (viewMode === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    } else if (viewMode === 'week') {
      const { start, end } = getDateRange()
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    } else {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    }
  }

  const renderCalendarGrid = () => {
    if (viewMode === 'day') {
      const dayEvents = getEventsForDate(currentDate)
      return (
        <div className="space-y-4">
          {dayEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No jobs scheduled for this day
            </div>
          ) : (
            dayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      )
    }

    const { start, end } = getDateRange()
    const days = []
    const current = new Date(start)

    while (current <= end) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    if (viewMode === 'week') {
      return (
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-sm">
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day)
            return (
              <div key={index} className="border rounded p-2 min-h-[120px]">
                <div className="font-medium text-sm mb-2">
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded text-white ${getJobTypeColor(event.job_type)}`}
                    >
                      {event.client_name}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    // Month view
    const weeks = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }

    return (
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-sm">
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day, dayIndex) => {
              const dayEvents = getEventsForDate(day)
              const isCurrentMonth = day.getMonth() === currentDate.getMonth()
              return (
                <div
                  key={dayIndex}
                  className={`border rounded p-2 min-h-[80px] ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded text-white ${getJobTypeColor(event.job_type)}`}
                      >
                        {event.client_name}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayEvents.length - 2}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Calendar className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading calendar...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Calendar Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">{formatDateHeader()}</h3>
              <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Job Type</label>
              <Select value={filters.jobType} onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Cleaning">Cleaning</SelectItem>
                  <SelectItem value="Flooring">Flooring</SelectItem>
                  <SelectItem value="Paver">Paver</SelectItem>
                  <SelectItem value="Gutter">Gutter</SelectItem>
                  <SelectItem value="Delivery">Delivery</SelectItem>
                  <SelectItem value="Rental">Rental</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Worker</label>
              <Select value={filters.worker} onValueChange={(value) => setFilters(prev => ({ ...prev, worker: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workers</SelectItem>
                  {/* This would be populated with actual workers */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-4">
          {renderCalendarGrid()}
        </CardContent>
      </Card>
    </div>
  )
}

const EventCard: React.FC<{ event: ScheduleEvent }> = ({ event }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">{event.client_name}</h4>
          <div className="flex items-center gap-2">
            <Badge className={`${event.job_type === 'Cleaning' ? 'bg-purple-100 text-purple-800' : 
                              event.job_type === 'Flooring' ? 'bg-blue-100 text-blue-800' :
                              event.job_type === 'Paver' ? 'bg-orange-100 text-orange-800' :
                              event.job_type === 'Gutter' ? 'bg-green-100 text-green-800' :
                              event.job_type === 'Delivery' ? 'bg-yellow-100 text-yellow-800' :
                              event.job_type === 'Rental' ? 'bg-pink-100 text-pink-800' :
                              'bg-gray-100 text-gray-800'}`}>
              {event.job_type}
            </Badge>
            <Badge variant="secondary" className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-1 text-sm text-muted-foreground">
          {event.start_time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{event.start_time} - {event.end_time || 'Open'}</span>
            </div>
          )}
          
          {event.client_address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.client_address}</span>
            </div>
          )}
        </div>

        {event.job_description && (
          <p className="text-sm text-muted-foreground mt-2">
            {event.job_description}
          </p>
        )}

        {event.assigned_workers && event.assigned_workers.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {event.assigned_workers.map((worker) => (
              <Badge key={worker} variant="outline" className="text-xs">
                {worker}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800'
    case 'Confirmed': return 'bg-blue-100 text-blue-800'
    case 'Scheduled': return 'bg-yellow-100 text-yellow-800'
    case 'Canceled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
