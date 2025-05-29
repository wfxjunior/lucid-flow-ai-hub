
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, FileText, Users, Mail, Brain, Calendar, Receipt, CreditCard, Signature, Heart, Mic } from "lucide-react"

const quickActions = [
  {
    title: "AI Voice Command",
    description: "Speak to create tasks",
    icon: Mic,
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    title: "Create Invoice",
    description: "AI-powered invoicing",
    icon: FileText,
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    title: "Send Message",
    description: "SMS or WhatsApp",
    icon: MessageSquare,
    color: "bg-green-500 hover:bg-green-600"
  },
  {
    title: "Add Client",
    description: "Register new client",
    icon: Users,
    color: "bg-orange-500 hover:bg-orange-600"
  },
  {
    title: "Schedule Meeting",
    description: "Book appointments",
    icon: Calendar,
    color: "bg-indigo-500 hover:bg-indigo-600"
  },
  {
    title: "Create Quote",
    description: "Generate estimates",
    icon: Receipt,
    color: "bg-teal-500 hover:bg-teal-600"
  },
  {
    title: "Process Payment",
    description: "Handle transactions",
    icon: CreditCard,
    color: "bg-cyan-500 hover:bg-cyan-600"
  },
  {
    title: "E-Signature",
    description: "Sign documents",
    icon: Signature,
    color: "bg-pink-500 hover:bg-pink-600"
  },
  {
    title: "Email Campaign",
    description: "Start new campaign",
    icon: Mail,
    color: "bg-red-500 hover:bg-red-600"
  },
  {
    title: "Family Savings",
    description: "View savings plan",
    icon: Heart,
    color: "bg-rose-500 hover:bg-rose-600"
  },
  {
    title: "AI Assistant",
    description: "Get AI help",
    icon: Brain,
    color: "bg-violet-500 hover:bg-violet-600"
  },
  {
    title: "New Project",
    description: "Create new project",
    icon: Plus,
    color: "bg-slate-500 hover:bg-slate-600"
  }
]

export function QuickActions() {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Fast access to all business tools and AI features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={action.title}
              variant="outline"
              className={`h-auto p-3 flex flex-col items-center justify-center space-y-2 transition-all duration-200 hover:shadow-md hover:scale-105 ${action.color} text-white border-0`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <action.icon className="h-5 w-5" />
              <div className="text-center">
                <p className="font-medium text-xs">{action.title}</p>
                <p className="text-xs opacity-90">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
