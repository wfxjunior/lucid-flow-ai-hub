
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ActivityItem {
  id: string
  type: "task" | "email" | "client" | "invoice"
  title: string
  description: string
  time: string
  status?: string
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "task",
    title: "Project proposal completed",
    description: "Marketing campaign proposal for TechCorp",
    time: "2 hours ago",
    status: "completed"
  },
  {
    id: "2",
    type: "email",
    title: "Email campaign sent",
    description: "Welcome series to 250 subscribers",
    time: "4 hours ago",
    status: "sent"
  },
  {
    id: "3",
    type: "client",
    title: "New client added",
    description: "StartupXYZ joined as premium client",
    time: "6 hours ago",
    status: "active"
  },
  {
    id: "4",
    type: "invoice",
    title: "Invoice paid",
    description: "Invoice #1234 - $2,500.00",
    time: "1 day ago",
    status: "paid"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-800"
    case "sent": return "bg-blue-100 text-blue-800"
    case "active": return "bg-purple-100 text-purple-800"
    case "paid": return "bg-green-100 text-green-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "task": return "✓"
    case "email": return "📧"
    case "client": return "👤"
    case "invoice": return "💰"
    default: return "📝"
  }
}

export function RecentActivity() {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest updates and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getTypeIcon(activity.type)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  {activity.status && (
                    <Badge variant="secondary" className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
