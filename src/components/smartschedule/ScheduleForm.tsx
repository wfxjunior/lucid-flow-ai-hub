
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Plus, X, Send, Copy } from 'lucide-react'

interface Client {
  id: string
  name: string
  address: string
  email: string
}

export const ScheduleForm = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [workers, setWorkers] = useState<string[]>([])
  const [newWorker, setNewWorker] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    client_name: '',
    client_address: '',
    job_type: 'Other',
    service_date: '',
    start_time: '',
    end_time: '',
    job_description: '',
    frequency: 'One-time',
    status: 'Scheduled'
  })

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, address, email')
        .eq('status', 'active')
        .order('name')

      if (error) throw error
      setClients(data || [])
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const handleClientSelect = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setSelectedClient(client)
      setFormData(prev => ({
        ...prev,
        client_name: client.name,
        client_address: client.address || ''
      }))
    }
  }

  const addWorker = () => {
    if (newWorker.trim() && !workers.includes(newWorker.trim())) {
      setWorkers([...workers, newWorker.trim()])
      setNewWorker('')
    }
  }

  const removeWorker = (worker: string) => {
    setWorkers(workers.filter(w => w !== worker))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.client_name || !formData.service_date) {
      toast({
        title: "Missing Information",
        description: "Please fill in client name and service date",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('Not authenticated')

      const scheduleData = {
        ...formData,
        client_id: selectedClient?.id || null,
        assigned_workers: workers,
        user_id: user.user.id
      }

      const { error } = await supabase
        .from('smart_schedules')
        .insert([scheduleData])

      if (error) throw error

      toast({
        title: "Success",
        description: "Job scheduled successfully!"
      })

      // Reset form
      setFormData({
        client_name: '',
        client_address: '',
        job_type: 'Other',
        service_date: '',
        start_time: '',
        end_time: '',
        job_description: '',
        frequency: 'One-time',
        status: 'Scheduled'
      })
      setSelectedClient(null)
      setWorkers([])
    } catch (error) {
      console.error('Error creating schedule:', error)
      toast({
        title: "Error",
        description: "Failed to create schedule",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const jobTypes = ['Cleaning', 'Flooring', 'Paver', 'Gutter', 'Delivery', 'Rental', 'Other']
  const frequencies = ['One-time', 'Weekly', 'Monthly']
  const statuses = ['Scheduled', 'Confirmed', 'Completed', 'Canceled']

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Plus className="h-5 w-5" />
          Create New Job Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Select Client</Label>
              <Select onValueChange={handleClientSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose existing client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                placeholder="Or enter new client name"
              />
            </div>
          </div>

          {/* Address and Job Type */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_address">Client Address</Label>
              <Input
                id="client_address"
                value={formData.client_address}
                onChange={(e) => setFormData(prev => ({ ...prev, client_address: e.target.value }))}
                placeholder="Service location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_type">Job Type</Label>
              <Select value={formData.job_type} onValueChange={(value) => setFormData(prev => ({ ...prev, job_type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service_date">Service Date</Label>
              <Input
                id="service_date"
                type="date"
                value={formData.service_date}
                onChange={(e) => setFormData(prev => ({ ...prev, service_date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_time">End Time</Label>
              <Input
                id="end_time"
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
              />
            </div>
          </div>

          {/* Workers Assignment */}
          <div className="space-y-2">
            <Label>Assigned Workers</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newWorker}
                onChange={(e) => setNewWorker(e.target.value)}
                placeholder="Add worker name"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addWorker())}
              />
              <Button type="button" onClick={addWorker} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {workers.map((worker) => (
                <Badge key={worker} variant="secondary" className="flex items-center gap-1">
                  {worker}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeWorker(worker)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="job_description">Job Description</Label>
            <Textarea
              id="job_description"
              value={formData.job_description}
              onChange={(e) => setFormData(prev => ({ ...prev, job_description: e.target.value }))}
              placeholder="Describe the work to be done..."
              rows={3}
            />
          </div>

          {/* Frequency and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Calendar className="h-4 w-4 mr-2 animate-spin" />
                Creating Schedule...
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 mr-2" />
                Create Schedule
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
