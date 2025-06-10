
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock, Users, MapPin, Settings, Plus, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const JOB_TYPES = [
  "Cleaning Services",
  "Maintenance & Repair",
  "Construction",
  "Landscaping & Gardening",
  "Plumbing",
  "Electrical Work",
  "HVAC Services",
  "Painting & Decorating",
  "Roofing",
  "Flooring Installation",
  "Pest Control",
  "Moving Services",
  "Handyman Services",
  "Pool Maintenance",
  "Window Cleaning",
  "Carpet Cleaning",
  "Security Services",
  "IT Support",
  "Consulting",
  "Photography",
  "Catering",
  "Event Planning",
  "Tutoring",
  "Pet Services",
  "Healthcare",
  "Legal Services",
  "Accounting",
  "Marketing",
  "Real Estate",
  "Automotive",
  "Other"
]

export function SmartSchedulePage() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      clientName: "John Smith",
      jobType: "Cleaning Services",
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
      jobType: "Maintenance & Repair",
      serviceDate: "2024-01-16",
      startTime: "14:00",
      endTime: "16:00",
      status: "In Progress",
      workers: ["Tom", "Lisa"],
      address: "456 Business Ave, City"
    }
  ])

  const [isAddingSchedule, setIsAddingSchedule] = useState(false)
  const [isAddingClient, setIsAddingClient] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    autoAssignWorkers: true,
    sendNotifications: true,
    allowOverlap: false,
    requireApproval: false
  })

  const { toast } = useToast()

  const handleAddSchedule = () => {
    toast({
      title: "Schedule Created",
      description: "New schedule has been added successfully."
    })
    setIsAddingSchedule(false)
  }

  const handleAddClient = () => {
    toast({
      title: "Client Created",
      description: "New client has been added successfully."
    })
    setIsAddingClient(false)
  }

  const handleSettingsUpdate = () => {
    toast({
      title: "Settings Updated",
      description: "Smart schedule settings have been saved."
    })
    setShowSettings(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Schedule</h1>
          <p className="text-muted-foreground">
            Intelligent scheduling with automated optimization
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Smart Schedule Settings</DialogTitle>
                <DialogDescription>
                  Configure your scheduling preferences
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoAssign">Auto-assign workers</Label>
                  <Switch
                    id="autoAssign"
                    checked={settings.autoAssignWorkers}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, autoAssignWorkers: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Send notifications</Label>
                  <Switch
                    id="notifications"
                    checked={settings.sendNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, sendNotifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowOverlap">Allow schedule overlap</Label>
                  <Switch
                    id="allowOverlap"
                    checked={settings.allowOverlap}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, allowOverlap: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireApproval">Require approval</Label>
                  <Switch
                    id="requireApproval"
                    checked={settings.requireApproval}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, requireApproval: checked }))
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowSettings(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSettingsUpdate}>
                    Save Settings
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                New Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Client</DialogTitle>
                <DialogDescription>
                  Add a new client to your database
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input id="clientName" placeholder="Enter client name" />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input id="clientEmail" type="email" placeholder="Enter email address" />
                </div>
                <div>
                  <Label htmlFor="clientPhone">Phone</Label>
                  <Input id="clientPhone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="clientAddress">Address</Label>
                  <Input id="clientAddress" placeholder="Enter address" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingClient(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddClient}>
                    Create Client
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingSchedule} onOpenChange={setIsAddingSchedule}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Schedule</DialogTitle>
                <DialogDescription>
                  Add a new scheduled appointment
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="schedule" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="client">Client</TabsTrigger>
                </TabsList>
                <TabsContent value="schedule" className="space-y-4">
                  <div>
                    <Label htmlFor="client">Client Name</Label>
                    <Input id="client" placeholder="Enter client name" />
                  </div>
                  <div>
                    <Label htmlFor="jobType">Job Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {JOB_TYPES.map((jobType) => (
                          <SelectItem key={jobType} value={jobType.toLowerCase().replace(/\s+/g, '-')}>
                            {jobType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter address" />
                  </div>
                  <div>
                    <Label htmlFor="workers">Assign Workers</Label>
                    <Input id="workers" placeholder="Enter worker names" />
                  </div>
                </TabsContent>
                <TabsContent value="client" className="space-y-4">
                  <div>
                    <Label htmlFor="newClientName">Client Name</Label>
                    <Input id="newClientName" placeholder="Enter client name" />
                  </div>
                  <div>
                    <Label htmlFor="newClientEmail">Email</Label>
                    <Input id="newClientEmail" type="email" placeholder="Enter email" />
                  </div>
                  <div>
                    <Label htmlFor="newClientPhone">Phone</Label>
                    <Input id="newClientPhone" placeholder="Enter phone number" />
                  </div>
                  <div>
                    <Label htmlFor="newClientAddress">Address</Label>
                    <Input id="newClientAddress" placeholder="Enter address" />
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingSchedule(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSchedule}>
                  Create Schedule
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
              <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
