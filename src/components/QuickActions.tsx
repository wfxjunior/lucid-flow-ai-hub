
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, FileText, Users, Mail, Brain, Calendar, Receipt, CreditCard, Signature, Heart, Mic, Clipboard, FolderOpen, Lightbulb, Calculator, CheckSquare, FileSpreadsheet, Package, Briefcase, TrendingUp, DollarSign, Video, Warehouse, UserCheck, Target } from "lucide-react"
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
      description: "Generate and send professional invoices",
      icon: FileText,
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      id: "estimates",
      title: "Estimates",
      description: "Create and manage estimates",
      icon: Calculator,
      colorClass: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      id: "work-orders",
      title: "Work Orders",
      description: "Create and track work orders",
      icon: Package,
      colorClass: "bg-gray-50 hover:bg-gray-100 border-gray-200"
    },
    {
      id: "quotes",
      title: "Quotes",
      description: "Generate customer quotes",
      icon: FileSpreadsheet,
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      id: "customer-management",
      title: "Customers",
      description: "Manage customer relationships",
      icon: Users,
      colorClass: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      id: "projects",
      title: "Projects",
      description: "Manage business projects",
      icon: Briefcase,
      colorClass: "bg-gray-50 hover:bg-gray-100 border-gray-200"
    },
    {
      id: "mat-track",
      title: "MatTrack",
      description: "Material tracking system",
      icon: Warehouse,
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      id: "crew-control",
      title: "CrewControl",
      description: "Crew management system",
      icon: UserCheck,
      colorClass: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      id: "earnsync",
      title: "EarnSync",
      description: "Earnings synchronization",
      icon: Target,
      colorClass: "bg-gray-50 hover:bg-gray-100 border-gray-200"
    },
    {
      id: "meetings",
      title: "Meetings",
      description: "Schedule and manage meetings",
      icon: Video,
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      id: "todo-list",
      title: "To-Do List",
      description: "Manage tasks and projects",
      icon: CheckSquare,
      colorClass: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      id: "accounting",
      title: "Accounting",
      description: "Financial management",
      icon: Receipt,
      colorClass: "bg-gray-50 hover:bg-gray-100 border-gray-200"
    },
    {
      id: "sales-orders",
      title: "Sales Orders",
      description: "Manage sales orders",
      icon: TrendingUp,
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      id: "service-orders",
      title: "Service Orders",
      description: "Service order management",
      icon: Package,
      colorClass: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      id: "business-proposals",
      title: "Business Proposals",
      description: "Create business proposals",
      icon: Clipboard,
      colorClass: "bg-gray-50 hover:bg-gray-100 border-gray-200"
    },
    {
      id: "bids",
      title: "Bids",
      description: "Manage project bids",
      icon: DollarSign,
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      id: "ai-voice",
      title: "AI Voice",
      description: "Voice commands and assistance",
      icon: Mic,
      colorClass: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      id: "features",
      title: "Feature Requests",
      description: "Suggest new features",
      icon: Lightbulb,
      colorClass: "bg-gray-50 hover:bg-gray-100 border-gray-200"
    },
    {
      id: "appointments",
      title: "Appointments",
      description: "Schedule meetings",
      icon: Calendar,
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      id: "payments",
      title: "Process Payment",
      description: "Handle transactions",
      icon: CreditCard,
      colorClass: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      id: "e-signatures",
      title: "E-Signature",
      description: "Digital signatures",
      icon: Signature,
      colorClass: "bg-gray-50 hover:bg-gray-100 border-gray-200"
    },
    {
      id: "messages",
      title: "Send Message",
      description: "Client communication",
      icon: MessageSquare,
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      id: "email-center",
      title: "Email Campaign",
      description: "Marketing campaigns",
      icon: Mail,
      colorClass: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "Business insights",
      icon: Brain,
      colorClass: "bg-gray-50 hover:bg-gray-100 border-gray-200"
    }
  ]

  const handleActionClick = (actionId: string) => {
    if (onActionClick) {
      onActionClick(actionId)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-sm text-gray-600">Access your most used features</p>
      </div>
      
      {/* Responsive grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className={`
              group relative overflow-hidden rounded-lg p-4 text-left transition-all 
              hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2 ${action.colorClass}
            `}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/60 transition-colors">
                <action.icon className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-gray-700 text-sm">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
