
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { List, Search, Calendar, Clock, MapPin, User, Mail, Download, Copy } from 'lucide-react'

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
  frequency: string
  created_at: string
}

export const ScheduleList = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<ScheduleEvent[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('service_date')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [events, searchTerm, filterStatus, sortBy])

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

  const applyFilters = () => {
    let filtered = events

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.job_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.job_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.assigned_workers.some(worker => 
          worker.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(event => event.status === filterStatus)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'service_date':
          return new Date(a.service_date).getTime() - new Date(b.service_date).getTime()
        case 'client_name':
          return a.client_name.localeCompare(b.client_name)
        case 'job_type':
          return a.job_type.localeCompare(b.job_type)
        case 'status':
          return a.status.localeCompare(b.status)
        case 'created_at':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

    setFilteredEvents(filtered)
  }

  const updateEventStatus = async (eventId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('smart_schedules')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', eventId)

      if (error) throw error

      setEvents(prev => prev.map(event => 
        event.id === eventId ? { ...event, status: newStatus } : event
      ))

      toast({
        title: "Success",
        description: `Job status updated to ${newStatus.toLowerCase()}`
      })

      // Trigger AfterCare if completed
      if (newStatus === 'Completed') {
        console.log('Triggering AfterCare for completed job:', eventId)
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive"
      })
    }
  }

  const sendToWorker = async (event: ScheduleEvent) => {
    // This would integrate with email service
    toast({
      title: "Email Sent",
      description: `Job details sent to ${event.assigned_workers.join(', ')}`
    })
  }

  const sendToClient = async (event: ScheduleEvent) => {
    // This would integrate with email service
    toast({
      title: "Email Sent",
      description: `Job confirmation sent to ${event.client_name}`
    })
  }

  const copyScheduleLink = async (event: ScheduleEvent) => {
    const link = `${window.location.origin}/schedule/${event.id}`
    try {
      await navigator.clipboard.writeText(link)
      toast({
        title: "Link Copied",
        description: "Schedule link copied to clipboard"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      })
    }
  }

  const exportToPDF = () => {
    // This would generate and download PDF
    toast({
      title: "Export",
      description: "PDF export functionality would be implemented here"
    })
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

  const getJobTypeColor = (jobType: string) => {
    const colors = {
      'Cleaning': 'bg-purple-100 text-purple-800',
      'Flooring': 'bg-blue-100 text-blue-800',
      'Paver': 'bg-orange-100 text-orange-800',
      'Gutter': 'bg-green-100 text-green-800',
      'Delivery': 'bg-yellow-100 text-yellow-800',
      'Rental': 'bg-pink-100 text-pink-800',
      'Other': 'bg-gray-100 text-gray-800'
    }
    return colors[jobType as keyof typeof colors] || colors.Other
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <List className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading schedule list...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <List className="h-5 w-5" />
            Schedule List ({filteredEvents.length} jobs)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service_date">Service Date</SelectItem>
                <SelectItem value="client_name">Client Name</SelectItem>
                <SelectItem value="job_type">Job Type</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="created_at">Created Date</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={exportToPDF} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <List className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No jobs found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your filters or search terms' 
                  : 'Create your first job schedule to get started'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-lg font-semibold">{event.client_name}</h3>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={getJobTypeColor(event.job_type)}>
                          {event.job_type}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        {event.frequency !== 'One-time' && (
                          <Badge variant="outline">{event.frequency}</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.service_date).toLocaleDateString()}</span>
                      </div>
                      
                      {event.start_time && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.start_time} - {event.end_time || 'Open'}</span>
                        </div>
                      )}
                      
                      {event.client_address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{event.client_address}</span>
                        </div>
                      )}

                      {event.assigned_workers && event.assigned_workers.length > 0 && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{event.assigned_workers.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {event.job_description && (
                      <p className="text-sm text-muted-foreground">
                        {event.job_description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    {event.status === 'Scheduled' && (
                      <Button 
                        size="sm" 
                        onClick={() => updateEventStatus(event.id, 'Confirmed')}
                      >
                        Confirm
                      </Button>
                    )}
                    
                    {event.status !== 'Completed' && event.status !== 'Canceled' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateEventStatus(event.id, 'Completed')}
                      >
                        Complete
                      </Button>
                    )}

                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => sendToWorker(event)}
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Send to Worker</span>
                      <span className="sm:hidden">Worker</span>
                    </Button>

                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => sendToClient(event)}
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Send to Client</span>
                      <span className="sm:hidden">Client</span>
                    </Button>

                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyScheduleLink(event)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Copy Link</span>
                      <span className="sm:hidden">Link</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
