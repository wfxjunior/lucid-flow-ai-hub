
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ResponsiveAppointmentsPage() {
  const [showForm, setShowForm] = useState(false)

  const appointments = [
    {
      id: 1,
      title: "Client Meeting",
      client: "John Doe",
      date: "2024-01-15",
      time: "10:00 AM",
      location: "Office",
      status: "confirmed"
    }
  ]

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Appointments
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your client appointments and schedule
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
          New Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">Appointments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">Confirmations</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled client meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1 sm:space-y-0">
                  <h3 className="font-medium">{appointment.title}</h3>
                   <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                     <span>{appointment.client}</span>
                     <span>{appointment.date}</span>
                     <span>{appointment.time}</span>
                     <span>{appointment.location}</span>
                   </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">Appointment form will be implemented here.</p>
              <Button onClick={() => setShowForm(false)} variant="outline">
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
