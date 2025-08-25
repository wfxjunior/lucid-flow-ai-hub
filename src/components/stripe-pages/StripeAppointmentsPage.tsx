
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Calendar, Clock, User, Video, MapPin, Plus } from "lucide-react"

export function StripeAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: 12 },
    { id: "today", label: "Today", count: 4 },
    { id: "completed", label: "Completed", count: 156 },
    { id: "cancelled", label: "Cancelled", count: 8 }
  ]

  const filters = [
    { id: "type", label: "Meeting type", active: activeFilters.includes("type") },
    { id: "client", label: "Client", active: activeFilters.includes("client") },
    { id: "date", label: "Date range", active: activeFilters.includes("date") },
    { id: "status", label: "Status", active: activeFilters.includes("status") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const appointments = [
    {
      title: "Project Consultation",
      client: "Anderson Family",
      date: "Today",
      time: "2:00 PM",
      duration: "1 hour",
      type: "In-person",
      location: "123 Main St, Anytown",
      status: "Confirmed"
    },
    {
      title: "Design Review",
      client: "Smith Industries",
      date: "Tomorrow",
      time: "10:00 AM", 
      duration: "30 mins",
      type: "Video call",
      location: "Zoom Meeting",
      status: "Confirmed"
    },
    {
      title: "Final Walkthrough",
      client: "Johnson Construction",
      date: "Mar 25",
      time: "3:30 PM",
      duration: "45 mins", 
      type: "In-person",
      location: "456 Oak Ave, Downtown",
      status: "Pending"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Confirmed": "success",
      "Pending": "warning",
      "Completed": "success",
      "Cancelled": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Calendar view</button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Schedule appointment
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search appointments..."
          showAddButton={true}
          addButtonLabel="Schedule appointment"
        />
        
        <StripePageLayout
          title="Appointments"
          description="Manage client meetings and consultations"
          actions={actions}
        >
          <StripeTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <StripeFilters 
            filters={filters}
            onFilterClick={handleFilterClick}
          />

          <div className="stripe-card p-0">
            <table className="stripe-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Date & Time</th>
                  <th>Duration</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="font-medium">{appointment.title}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {appointment.client}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{appointment.date}</div>
                          <div className="text-sm text-muted-foreground">{appointment.time}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        {appointment.duration}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {appointment.type === "Video call" ? (
                          <Video className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        )}
                        {appointment.type}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{appointment.location}</td>
                    <td>
                      <span className={getStatusBadge(appointment.status)}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {appointments.length} result{appointments.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
