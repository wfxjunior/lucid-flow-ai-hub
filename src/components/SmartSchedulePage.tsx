
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddressAutocomplete } from "@/components/ui/address-autocomplete"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Plus, Settings, Zap, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Appointment {
  id: string
  title: string
  client: string
  date: string
  time: string
  location: string
  type: "meeting" | "call" | "site-visit" | "consultation"
  priority: "low" | "medium" | "high"
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
}

export function SmartSchedulePage() {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Client Meeting - Project Discussion",
      client: "João Silva",
      date: "2024-01-25",
      time: "14:00",
      location: "Rua das Flores, 123, São Paulo, SP",
      type: "meeting",
      priority: "high",
      status: "scheduled"
    },
    {
      id: "2",
      title: "Site Visit - Property Inspection",
      client: "Maria Santos",
      date: "2024-01-26",
      time: "09:30",
      location: "Av. Paulista, 1000, São Paulo, SP",
      type: "site-visit",
      priority: "medium",
      status: "confirmed"
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    date: "",
    time: "",
    location: "",
    type: "meeting" as const,
    priority: "medium" as const,
    description: ""
  })

  const handleAddressChange = (address: string) => {
    setFormData(prev => ({ ...prev, location: address }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: formData.title,
      client: formData.client,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      type: formData.type,
      priority: formData.priority,
      status: "scheduled"
    }

    setAppointments(prev => [...prev, newAppointment])
    setFormData({
      title: "",
      client: "",
      date: "",
      time: "",
      location: "",
      type: "meeting",
      priority: "medium",
      description: ""
    })
    setShowForm(false)

    toast({
      title: "Appointment Scheduled",
      description: "Your appointment has been successfully added to the schedule."
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meeting": return <Users className="h-4 w-4" />
      case "call": return <Clock className="h-4 w-4" />
      case "site-visit": return <MapPin className="h-4 w-4" />
      case "consultation": return <Target className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            Smart Schedule
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground">AI-powered intelligent scheduling system</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">8</p>
                <p className="text-xs sm:text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">3</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">2</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Site Visits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">95%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Schedule New Appointment</CardTitle>
            <CardDescription>Create a new appointment with intelligent scheduling</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Meeting title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    placeholder="Client name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <AddressAutocomplete
                  value={formData.location}
                  onChange={handleAddressChange}
                  placeholder="Enter address or location"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="site-visit">Site Visit</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional notes..."
                  rows={3}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full sm:w-auto">Schedule Appointment</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled appointments and meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(appointment.type)}
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{appointment.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{appointment.client}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      {appointment.date} at {appointment.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate max-w-[200px]">{appointment.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(appointment.priority)}>
                    {appointment.priority}
                  </Badge>
                  <Badge variant="outline">
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
