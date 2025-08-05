
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Clock, MapPin, User, Phone, Mail } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { AppointmentForm } from "@/components/AppointmentForm"
import { format } from "date-fns"

export function AppointmentsPage() {
  const { appointments, loading } = useBusinessData()
  const [showCreateForm, setShowCreateForm] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'default'
      case 'confirmed':
        return 'default'
      case 'completed':
        return 'default'
      case 'cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: format(date, 'MMM dd, yyyy'),
      time: format(date, 'HH:mm')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Appointments</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Manage your client appointments
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      {showCreateForm && (
        <AppointmentForm 
          onSuccess={() => setShowCreateForm(false)}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      <div className="grid gap-4">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No appointments yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by scheduling your first appointment with a client.
              </p>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment) => {
            const { date, time } = formatAppointmentDate(appointment.appointment_date)
            
            return (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="text-lg font-semibold">{appointment.title}</h3>
                        <Badge variant={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.client?.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{date}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{time} ({appointment.duration_minutes} min)</span>
                        </div>
                        
                        {appointment.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                        )}
                        
                        {appointment.client?.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="break-all">{appointment.client.email}</span>
                          </div>
                        )}
                        
                        {appointment.client?.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.client.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      {appointment.description && (
                        <p className="text-sm text-muted-foreground">
                          {appointment.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
