import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users,
  Star,
  Phone,
  Mail,
  Plus,
  Filter,
  Search
} from "lucide-react"

interface ToursPageProps {
  onNavigate: (view: string) => void
}

export function ToursPage({ onNavigate }: ToursPageProps) {
  const tours = [
    {
      id: 1,
      clientName: "Johnson Family",
      property: "123 Oak Street, Springfield",
      date: "2024-02-28",
      time: "2:00 PM",
      status: "scheduled",
      agent: "Sarah Wilson",
      phone: "(555) 123-4567",
      email: "johnson@email.com",
      notes: "Looking for 3BR family home"
    },
    {
      id: 2,
      clientName: "Smith Group",
      property: "456 Elm Avenue, Anytown",
      date: "2024-03-05",
      time: "10:00 AM",
      status: "completed",
      agent: "Tom Davis",
      phone: "(555) 987-6543",
      email: "smith@email.com",
      notes: "Interested in waterfront properties"
    },
    {
      id: 3,
      clientName: "Garcia Corp",
      property: "789 Pine Lane, Hillside",
      date: "2024-03-12",
      time: "4:30 PM",
      status: "cancelled",
      agent: "Emily White",
      phone: "(555) 246-8013",
      email: "garcia@email.com",
      notes: "Meeting cancelled due to weather"
    },
    {
      id: 4,
      clientName: "Lee Holdings",
      property: "101 Main Street, Downtown",
      date: "2024-03-19",
      time: "11:15 AM",
      status: "no-show",
      agent: "Kevin Brown",
      phone: "(555) 789-0123",
      email: "lee@email.com",
      notes: "Client did not show up"
    }
  ]

  const tourStats = [
    {
      title: "Scheduled Tours",
      value: "24",
      icon: Calendar,
      color: "blue"
    },
    {
      title: "Completed Tours",
      value: "18",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Cancelled Tours",
      value: "3",
      icon: AlertCircle,
      color: "red"
    },
    {
      title: "No Shows",
      value: "3",
      icon: Users,
      color: "yellow"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline">Scheduled</Badge>
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      case 'no-show':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">No Show</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <CleanPageLayout
      title="Property Tours"
      subtitle="Manage property showings and client visits"
      actionLabel="Schedule Tour"
      onActionClick={() => {}}
    >
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {tourStats.map((stat) => (
          <Card key={stat.title} className="border-2 border-muted-foreground">
            <CardContent className="flex flex-col gap-3 p-6">
              <div className="flex items-center justify-between">
                <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
                <Badge variant="secondary">{stat.title}</Badge>
              </div>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Tours */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scheduled Tours</CardTitle>
              <CardDescription>Upcoming property showings</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tours.map((tour) => (
              <div key={tour.id} className="p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{tour.clientName}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {tour.property}
                    </p>
                  </div>
                  {getStatusBadge(tour.status)}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{tour.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{tour.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{tour.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{tour.agent}</span>
                  </div>
                </div>
                {tour.notes && (
                  <p className="text-sm text-muted-foreground mt-2 p-2 bg-gray-50 rounded">
                    {tour.notes}
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Client
                  </Button>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
