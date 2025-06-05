
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
      color: "bg-slate-900 hover:bg-slate-800"
    },
    {
      id: "estimates",
      title: "Estimates",
      description: "Create and manage estimates",
      icon: Calculator,
      color: "bg-cyan-600 hover:bg-cyan-700"
    },
    {
      id: "work-orders",
      title: "Work Orders",
      description: "Create and track work orders",
      icon: Package,
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      id: "quotes",
      title: "Quotes",
      description: "Generate customer quotes",
      icon: FileSpreadsheet,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "customer-management",
      title: "Customers",
      description: "Manage customer relationships",
      icon: Users,
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      id: "projects",
      title: "Projects",
      description: "Manage business projects",
      icon: Briefcase,
      color: "bg-indigo-600 hover:bg-indigo-700"
    },
    {
      id: "mat-track",
      title: "MatTrack",
      description: "Material tracking system",
      icon: Warehouse,
      color: "bg-orange-600 hover:bg-orange-700"
    },
    {
      id: "crew-control",
      title: "CrewControl",
      description: "Crew management system",
      icon: UserCheck,
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      id: "earnsync",
      title: "EarnSync",
      description: "Earnings synchronization",
      icon: Target,
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      id: "meetings",
      title: "Meetings",
      description: "Schedule and manage meetings",
      icon: Video,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "todo-list",
      title: "To-Do List",
      description: "Manage tasks and projects",
      icon: CheckSquare,
      color: "bg-gray-600 hover:bg-gray-700"
    },
    {
      id: "accounting",
      title: "Accounting",
      description: "Financial management",
      icon: Receipt,
      color: "bg-emerald-600 hover:bg-emerald-700"
    },
    {
      id: "sales-orders",
      title: "Sales Orders",
      description: "Manage sales orders",
      icon: TrendingUp,
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      id: "service-orders",
      title: "Service Orders",
      description: "Service order management",
      icon: Package,
      color: "bg-teal-600 hover:bg-teal-700"
    },
    {
      id: "business-proposals",
      title: "Business Proposals",
      description: "Create business proposals",
      icon: Clipboard,
      color: "bg-violet-600 hover:bg-violet-700"
    },
    {
      id: "bids",
      title: "Bids",
      description: "Manage project bids",
      icon: DollarSign,
      color: "bg-amber-600 hover:bg-amber-700"
    },
    {
      id: "ai-voice",
      title: "AI Voice",
      description: "Voice commands and assistance",
      icon: Mic,
      color: "bg-indigo-600 hover:bg-indigo-700"
    },
    {
      id: "features",
      title: "Feature Requests",
      description: "Suggest new features",
      icon: Lightbulb,
      color: "bg-amber-500 hover:bg-amber-600"
    },
    {
      id: "appointments",
      title: "Appointments",
      description: "Schedule meetings",
      icon: Calendar,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "payments",
      title: "Process Payment",
      description: "Handle transactions",
      icon: CreditCard,
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      id: "e-signatures",
      title: "E-Signature",
      description: "Digital signatures",
      icon: Signature,
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      id: "messages",
      title: "Send Message",
      description: "Client communication",
      icon: MessageSquare,
      color: "bg-teal-600 hover:bg-teal-700"
    },
    {
      id: "email-center",
      title: "Email Campaign",
      description: "Marketing campaigns",
      icon: Mail,
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "Business insights",
      icon: Brain,
      color: "bg-violet-600 hover:bg-violet-700"
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
      
      {/* Symmetric grid layout with more columns for more items */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${action.color} transition-colors`}>
                <action.icon className="h-6 w-6 text-white" />
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
