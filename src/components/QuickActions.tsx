
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, FileText, Users, Mail, Brain, Calendar, Receipt, CreditCard, Signature, Heart, Mic, Clipboard, FolderOpen, Lightbulb } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface QuickActionsProps {
  onActionClick?: (actionId: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const { t } = useLanguage()

  const quickActions = [
    {
      id: "invoices",
      title: "Create Invoice",
      description: "Generate and send professional invoices to clients",
      icon: FileText,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      id: "ai-voice",
      title: "AI Voice Assistant",
      description: "Get help with voice commands and AI assistance",
      icon: Mic,
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      id: "features",
      title: "Feature Requests",
      description: "Suggest new features and vote on community ideas",
      icon: Lightbulb,
      color: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      id: "files",
      title: "Files",
      description: "Organize and manage your documents in folders",
      icon: FolderOpen,
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      id: "appointments",
      title: "Appointments",
      description: "Schedule and manage client appointments with automated reminders",
      icon: Calendar,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      id: "receipts",
      title: "Receipts",
      description: "Track and manage all business receipts and expenses",
      icon: Receipt,
      color: "bg-amber-500 hover:bg-amber-600"
    },
    {
      id: "customers",
      title: "Add Client",
      description: "Add new customers and manage client relationships",
      icon: Users,
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      id: "payments",
      title: "Process Payment",
      description: "Handle payments and manage payment methods",
      icon: CreditCard,
      color: "bg-cyan-500 hover:bg-cyan-600"
    },
    {
      id: "e-signatures",
      title: "E-Signature",
      description: "Send documents for electronic signatures",
      icon: Signature,
      color: "bg-pink-500 hover:bg-pink-600"
    },
    {
      id: "messages",
      title: "Send Message",
      description: "Send and manage client messages",
      icon: MessageSquare,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      id: "email-center",
      title: "Email Campaign",
      description: "Create and send email campaigns to your clients",
      icon: Mail,
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "View detailed business analytics and reports",
      icon: Brain,
      color: "bg-violet-500 hover:bg-violet-600"
    }
  ]

  const handleActionClick = (actionId: string) => {
    if (onActionClick) {
      onActionClick(actionId)
    }
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
        <CardDescription className="text-sm sm:text-base">Access your most used features quickly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={action.id}
              variant="outline"
              onClick={() => handleActionClick(action.id)}
              className={`h-auto p-3 flex flex-col items-center justify-center space-y-2 transition-all duration-200 hover:shadow-md hover:scale-105 ${action.color} text-white border-0`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <action.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <div className="text-center">
                <p className="font-medium text-xs sm:text-sm">{action.title}</p>
                <p className="text-xs opacity-90 hidden sm:block">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
