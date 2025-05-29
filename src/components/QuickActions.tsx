
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, FileText, Users, Mail, Brain } from "lucide-react"

const quickActions = [
  {
    title: "New Task",
    description: "Create a new task or note",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    title: "Send Message",
    description: "SMS or WhatsApp",
    icon: MessageSquare,
    color: "bg-green-500 hover:bg-green-600"
  },
  {
    title: "New Invoice",
    description: "Create and send invoice",
    icon: FileText,
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    title: "Add Client",
    description: "Register new client",
    icon: Users,
    color: "bg-orange-500 hover:bg-orange-600"
  },
  {
    title: "Email Campaign",
    description: "Start new campaign",
    icon: Mail,
    color: "bg-pink-500 hover:bg-pink-600"
  },
  {
    title: "AI Assistant",
    description: "Get AI help",
    icon: Brain,
    color: "bg-indigo-500 hover:bg-indigo-600"
  }
]

export function QuickActions() {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Fast access to common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={action.title}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-center justify-center space-y-2 transition-all duration-200 hover:shadow-md hover:scale-105 ${action.color} text-white border-0`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <action.icon className="h-6 w-6" />
              <div className="text-center">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs opacity-90">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
