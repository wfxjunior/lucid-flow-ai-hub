
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin, Settings } from "lucide-react"

export function SmartSchedulePage() {
  const [schedules] = useState([
    {
      id: 1,
      clientName: "John Smith",
      jobType: "Cleaning",
      serviceDate: "2024-01-15",
      startTime: "09:00",
      endTime: "11:00",
      status: "Scheduled",
      workers: ["Mike", "Sarah"],
      address: "123 Main St, City"
    },
    {
      id: 2,
      clientName: "ABC Corp",
      jobType: "Maintenance",
      serviceDate: "2024-01-16",
      startTime: "14:00",
      endTime: "16:00",
      status: "In Progress",
      workers: ["Tom", "Lisa"],
      address: "456 Business Ave, City"
    }
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SmartSchedule</h1>
          <p className="text-muted-foreground">
            Intelligent scheduling with automated optimization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            New Schedule
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Jobs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              All available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Travel Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18m</div>
            <p className="text-xs text-green-600">
              -5m optimized
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-green-600">
              +3% this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule List */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>
            Optimized schedule for maximum efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{schedule.clientName}</h4>
                    <p className="text-sm text-muted-foreground">{schedule.jobType}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {schedule.address}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={schedule.status === 'Scheduled' ? 'default' : 'secondary'}
                  >
                    {schedule.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    Workers: {schedule.workers.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
