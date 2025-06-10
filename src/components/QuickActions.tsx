
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
  Search,
  Lightbulb,
  Gift,
  Home,
  Briefcase,
  GitBranch,
  Car,
  Package,
  Warehouse,
  UserCheck,
  Video,
  StickyNote,
  FileSpreadsheet,
  TrendingUp,
  Clipboard,
  DollarSign,
  PenTool,
  Mail,
  MessageSquare,
  Send,
  CalendarCheck,
  Heart
} from "lucide-react"

interface QuickActionsProps {
  onActionClick: (actionId: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const quickActions = [
    // Main Features
    {
      id: "dashboard",
      title: "Dashboard",
      description: "View business overview",
      icon: Home,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
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
      id: "aftercare",
      title: "AfterCare",
      description: "Client feedback & relationships",
      icon: Heart,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      id: "invoice-creator",
      title: "Create Invoice",
      description: "Generate a new invoice",
      icon: FileText,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      id: "appointments",
      title: "Appointments",
      description: "Book an appointment",
      icon: Calendar,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      id: "smart-schedule",
      title: "Smart Schedule",
      description: "Intelligent scheduling",
      icon: CalendarCheck,
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600"
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
      id: "e-signatures",
      title: "Sign Document",
      description: "Electronic signatures",
      icon: Signature,
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600"
    },
    
    // Business Tools
    {
      id: "customer-management",
      title: "Add Customer",
      description: "Register new customer",
      icon: Users,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      id: "feather-forms",
      title: "FeatherForms",
      description: "Build custom forms",
      icon: Clipboard,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      id: "projects",
      title: "Projects",
      description: "Manage projects",
      icon: Briefcase,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    },
    {
      id: "pipeline",
      title: "Sales Pipeline",
      description: "Manage leads",
      icon: GitBranch,
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600"
    },
    {
      id: "car-rental",
      title: "Car Rental",
      description: "Vehicle management",
      icon: Car,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      id: "work-orders",
      title: "Work Orders",
      description: "Manage work orders",
      icon: Package,
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700"
    },
    {
      id: "mat-track",
      title: "MatTrack",
      description: "Material tracking",
      icon: Warehouse,
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700"
    },
    {
      id: "crew-control",
      title: "CrewControl",
      description: "Crew management",
      icon: UserCheck,
      color: "bg-teal-600",
      hoverColor: "hover:bg-teal-700"
    },
    {
      id: "earnsync",
      title: "EarnSync",
      description: "Earnings tracking",
      icon: Target,
      color: "bg-red-600",
      hoverColor: "hover:bg-red-700"
    },
    {
      id: "meetings",
      title: "Meetings",
      description: "Schedule meetings",
      icon: Video,
      color: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700"
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
      id: "notes",
      title: "Notes",
      description: "Take notes",
      icon: StickyNote,
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600"
    },
    {
      id: "quotes",
      title: "Quotes",
      description: "Generate quotes",
      icon: FileSpreadsheet,
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700"
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
      id: "sales-orders",
      title: "Sales Orders",
      description: "Manage sales orders",
      icon: TrendingUp,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      id: "service-orders",
      title: "Service Orders",
      description: "Manage service orders",
      icon: Package,
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700"
    },
    {
      id: "business-proposals",
      title: "Business Proposals",
      description: "Create proposals",
      icon: Clipboard,
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700"
    },
    {
      id: "bids",
      title: "Bids",
      description: "Manage bids",
      icon: DollarSign,
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700"
    },
    {
      id: "contracts",
      title: "Contracts",
      description: "Manage contracts",
      icon: PenTool,
      color: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700"
    },
    
    // Communication
    {
      id: "email-center",
      title: "Email Center",
      description: "Manage emails",
      icon: Mail,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      id: "messages",
      title: "Messages",
      description: "Chat messages",
      icon: MessageSquare,
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700"
    },
    {
      id: "communication-hub",
      title: "Communication Hub",
      description: "Unified communications",
      icon: Send,
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700"
    },
    
    // Analytics & System
    {
      id: "analytics",
      title: "View Reports",
      description: "Check business metrics",
      icon: BarChart3,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    },
    {
      id: "referrals",
      title: "Referral Program",
      description: "Invite friends & earn",
      icon: Gift,
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700"
    },
    {
      id: "features",
      title: "Feature Requests",
      description: "Suggest new features",
      icon: Lightbulb,
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600"
    }
  ]

  const filteredActions = quickActions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Search Bar - Cleaner design */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search quick actions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-border/50 focus:border-primary"
        />
      </div>

      {/* Quick Actions Grid - Clean responsive design */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredActions.map((action) => (
          <Card 
            key={action.id} 
            className="group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg border-0 bg-card/50 backdrop-blur-sm"
            onClick={() => onActionClick(action.id)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28 relative">
              {/* Icon container with cleaner design */}
              <div className={`p-3 rounded-xl text-white ${action.color} transition-all duration-200 group-hover:scale-110 group-hover:shadow-md mb-3 ${action.id === 'aftercare' ? 'animate-pulse' : ''}`}>
                <action.icon className="h-5 w-5" />
              </div>
              
              {/* Title with better typography */}
              <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
                {action.title}
              </h3>
              
              {/* Subtle hover indicator */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/20 transition-colors duration-200" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results state */}
      {filteredActions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground space-y-2">
            <Search className="h-8 w-8 mx-auto opacity-50" />
            <p>No actions found matching "{searchTerm}"</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        </div>
      )}
    </div>
  )
}
