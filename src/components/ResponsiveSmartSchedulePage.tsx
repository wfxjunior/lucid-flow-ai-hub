
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, User, MapPin, AlertCircle } from "lucide-react"

export function ResponsiveSmartSchedulePage() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')

  const scheduleItems = [
    {
      id: 1,
      title: "Team Meeting",
      type: "meeting",
      start: "09:00",
      end: "10:00",
      date: "2024-01-15",
      participants: ["John", "Jane"],
      location: "Conference Room A"
    },
    {
      id: 2,
      title: "Client Call",
      type: "call",
      start: "14:00",
      end: "15:00",
      date: "2024-01-15",
      participants: ["Client ABC"],
      location: "Zoom"
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800'
      case 'call': return 'bg-green-100 text-green-800'
      case 'task': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            Smart Schedule
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered scheduling and time management
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button 
              variant={view === 'day' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setView('day')}
            >
              Day
            </Button>
            <Button 
              variant={view === 'week' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
            <Button 
              variant={view === 'month' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">Hours available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conflicts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">To resolve</p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Overview</CardTitle>
          <CardDescription>Your planned events and meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="space-y-2 sm:space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.start} - {item.end}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {item.participants.join(", ")}
                    </span>
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
    </div>
  )
}
