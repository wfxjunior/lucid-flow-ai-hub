import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Target,
  Search,
  MapPin,
  User,
  TrendingUp
} from "lucide-react"

const metrics = [
  {
    title: "Total Tours Requested",
    value: "127",
    subtitle: "This month",
    icon: Calendar
  },
  {
    title: "Tours Approved",
    value: "98",
    subtitle: "77% approval rate",
    icon: CheckCircle
  },
  {
    title: "Tours Completed",
    value: "85",
    subtitle: "87% completion rate",
    icon: Target
  },
  {
    title: "Conversion Rate",
    value: "23.5%",
    subtitle: "Tours to lease",
    icon: TrendingUp
  }
]

const tourRequests = [
  {
    id: 1,
    propertyName: "Sunset Apartments - Unit 3B",
    tenantName: "Sarah Johnson",
    date: "7/14/2024",
    time: "14:00",
    tourType: "In-person",
    status: "pending"
  },
  {
    id: 2,
    propertyName: "Downtown Loft - Studio 12",
    tenantName: "Michael Chen",
    date: "7/15/2024",
    time: "10:30",
    tourType: "Virtual",
    status: "approved"
  },
  {
    id: 3,
    propertyName: "Garden View Complex - 2A",
    tenantName: "Emma Rodriguez",
    date: "7/13/2024",
    time: "16:00",
    tourType: "Video",
    status: "declined"
  }
]

interface ToursPageProps {
  onNavigate: (view: string) => void
}

export function ToursPage({ onNavigate }: ToursPageProps) {
  const handleScheduleTour = () => {
    console.log("Schedule tour clicked")
  }

  return (
    <CleanPageLayout
      title="Tour Requests"
      subtitle="Manage and approve upcoming property visit requests"
      actionLabel="Schedule Tour"
      onActionClick={handleScheduleTour}
      metrics={metrics}
    >
      {/* Filters and Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-accent text-accent-foreground rounded-full px-3 md:px-4 py-2 text-xs md:text-sm"
          >
            All
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full px-3 md:px-4 py-2 text-xs md:text-sm">
            Pending
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full px-3 md:px-4 py-2 text-xs md:text-sm">
            Approved
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full px-3 md:px-4 py-2 text-xs md:text-sm">
            Declined
          </Button>
        </div>
        
        <div className="relative w-full max-w-xs lg:max-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by property or tenant..."
            className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Tour Requests Table */}
      <Card className="bg-card border border-border rounded-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm font-semibold text-muted-foreground">
                    Property Name
                  </th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm font-semibold text-muted-foreground">
                    Tenant Name
                  </th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm font-semibold text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm font-semibold text-muted-foreground">
                    Time
                  </th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm font-semibold text-muted-foreground">
                    Tour Type
                  </th>
                  <th className="text-left py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm font-semibold text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {tourRequests.map((request, index) => (
                  <tr 
                    key={request.id} 
                    className={`${index % 2 === 1 ? 'bg-muted/50' : ''} hover:bg-muted/30 transition-colors`}
                  >
                    <td className="py-3 md:py-4 px-3 md:px-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 md:h-4 w-3 md:w-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-medium text-foreground text-xs md:text-sm truncate">
                          {request.propertyName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-6">
                      <div className="flex items-center gap-2">
                        <User className="h-3 md:h-4 w-3 md:w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-foreground text-xs md:text-sm truncate">{request.tenantName}</span>
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-6 text-foreground text-xs md:text-sm">
                      {request.date}
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-6 text-foreground text-xs md:text-sm">
                      {request.time}
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-6 text-foreground text-xs md:text-sm">
                      {request.tourType}
                    </td>
                    <td className="py-4 px-6">
                      {request.status === 'pending' && (
                        <Badge variant="pending">Pending</Badge>
                      )}
                      {request.status === 'approved' && (
                        <Badge variant="approved">Approved</Badge>
                      )}
                      {request.status === 'declined' && (
                        <Badge variant="declined">Declined</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}