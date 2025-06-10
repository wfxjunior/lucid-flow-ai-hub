
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  CheckSquare, 
  Signature,
  Calculator,
  Receipt,
  Mic,
  Target,
  Search
} from "lucide-react"

interface QuickActionsProps {
  onActionClick: (actionId: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const quickActions = [
    {
      id: "invoice-creator",
      title: "Create Invoice",
      description: "Generate a new invoice",
      icon: FileText,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      id: "customer-management",
      title: "Add Customer",
      description: "Register new customer",
      icon: Users,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      id: "appointments",
      title: "Schedule Meeting",
      description: "Book an appointment",
      icon: Calendar,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      id: "payments",
      title: "Process Payment",
      description: "Handle transactions",
      icon: CreditCard,
      color: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600"
    },
    {
      id: "analytics",
      title: "View Reports",
      description: "Check business metrics",
      icon: BarChart3,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    },
    {
      id: "todo-list",
      title: "Manage Tasks",
      description: "Organize your work",
      icon: CheckSquare,
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600"
    },
    {
      id: "e-signatures",
      title: "Sign Document",
      description: "Electronic signatures",
      icon: Signature,
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600"
    },
    {
      id: "estimates",
      title: "Create Estimate",
      description: "Generate price quotes",
      icon: Calculator,
      color: "bg-teal-500",
      hoverColor: "hover:bg-teal-600"
    },
    {
      id: "accounting",
      title: "Track Expenses",
      description: "Manage finances",
      icon: Receipt,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600"
    },
    {
      id: "ai-voice",
      title: "AI Assistant",
      description: "Voice commands",
      icon: Mic,
      color: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600"
    },
    {
      id: "pipeline",
      title: "Sales Pipeline",
      description: "Manage leads",
      icon: Target,
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600"
    }
  ]

  const filteredActions = quickActions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search quick actions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quick Actions Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredActions.map((action) => (
          <Card 
            key={action.id} 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 group"
            onClick={() => onActionClick(action.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg text-white ${action.color} ${action.hoverColor} transition-colors group-hover:shadow-lg`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {action.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredActions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No actions found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}
