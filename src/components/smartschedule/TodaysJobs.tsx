
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Clock, MapPin, User, CheckCircle, Calendar } from 'lucide-react'

interface TodaysJob {
  id: string
  client_name: string
  client_address: string
  job_type: string
  start_time: string
  end_time: string
  assigned_workers: string[]
  job_description: string
  status: string
}

export const TodaysJobs = () => {
  const [jobs, setJobs] = useState<TodaysJob[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchTodaysJobs()
  }, [])

  const fetchTodaysJobs = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data, error } = await supabase
        .from('smart_schedules')
        .select('*')
        .eq('service_date', today)
        .order('start_time', { ascending: true })

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching today\'s jobs:', error)
      toast({
        title: "Error",
        description: "Failed to fetch today's jobs",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const updateJobStatus = async (jobId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('smart_schedules')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', jobId)

      if (error) throw error

      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      ))

      toast({
        title: "Success",
        description: `Job marked as ${newStatus.toLowerCase()}`
      })

      // If marked as completed, trigger AfterCare integration
      if (newStatus === 'Completed') {
        // This would integrate with AfterCare system
        console.log('Triggering AfterCare for job:', jobId)
      }
    } catch (error) {
      console.error('Error updating job status:', error)
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive"
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500'
      case 'Confirmed': return 'bg-blue-500'
      case 'Scheduled': return 'bg-yellow-500'
      case 'Canceled': return 'bg-red-500'
      default: return 'bg-gray-500'
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
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 animate-spin" />
            <span>Loading today's jobs...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Calendar className="h-5 w-5" />
          Today's Jobs ({jobs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No jobs scheduled for today</h3>
            <p className="text-sm text-muted-foreground">Enjoy your free day!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{job.client_name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getJobTypeColor(job.job_type)}>
                      {job.job_type}
                    </Badge>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(job.status)}`} />
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  {job.start_time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{job.start_time} - {job.end_time || 'Open'}</span>
                    </div>
                  )}
                  
                  {job.client_address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{job.client_address}</span>
                    </div>
                  )}

                  {job.assigned_workers && job.assigned_workers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{job.assigned_workers.join(', ')}</span>
                    </div>
                  )}
                </div>

                {job.job_description && (
                  <p className="text-sm text-muted-foreground italic">
                    {job.job_description.substring(0, 100)}...
                  </p>
                )}

                <div className="flex gap-2">
                  {job.status !== 'Completed' && (
                    <Button 
                      size="sm" 
                      onClick={() => updateJobStatus(job.id, 'Completed')}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="h-3 w-3" />
                      Mark Complete
                    </Button>
                  )}
                  {job.status === 'Scheduled' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateJobStatus(job.id, 'Confirmed')}
                    >
                      Confirm
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
