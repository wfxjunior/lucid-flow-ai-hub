
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  MessageSquare, 
  FileText, 
  Users, 
  Mail, 
  Brain, 
  Calendar, 
  Receipt, 
  CreditCard, 
  Signature, 
  Heart, 
  Mic, 
  Clipboard, 
  FolderOpen, 
  Lightbulb, 
  Calculator, 
  CheckSquare, 
  FileSpreadsheet, 
  Package, 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Video, 
  Warehouse, 
  UserCheck, 
  Target,
  StickyNote,
  FileBarChart,
  ClipboardList,
  Wrench,
  Car
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface QuickActionsProps {
  onActionClick?: (actionId: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const { t } = useLanguage()

  const quickActions = [
    // Core Business Features
    {
      id: "invoice-creator",
      title: "Create Invoice",
      description: "Generate and send professional invoices",
      icon: FileText,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-slate-400",
      category: "Financial"
    },
    {
      id: "estimates",
      title: "Estimates",
      description: "Create and manage estimates",
      icon: Calculator,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-slate-400",
      category: "Financial"
    },
    {
      id: "quotes",
      title: "Quotes",
      description: "Generate customer quotes",
      icon: FileSpreadsheet,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-slate-400",
      category: "Financial"
    },
    {
      id: "contracts",
      title: "Contracts",
      description: "Manage business contracts",
      icon: FileBarChart,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-gray-400",
      category: "Financial"
    },

    // Customer & Project Management
    {
      id: "customer-management",
      title: "Customers",
      description: "Manage customer relationships",
      icon: Users,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-blue-400",
      category: "Management"
    },
    {
      id: "projects",
      title: "Projects",
      description: "Manage business projects",
      icon: Briefcase,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-blue-400",
      category: "Management"
    },
    {
      id: "car-rental",
      title: "Car Rental",
      description: "Manage vehicle rentals",
      icon: Car,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-blue-400",
      category: "Management"
    },
    {
      id: "work-orders",
      title: "Work Orders",
      description: "Create and track work orders",
      icon: Wrench,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-blue-400",
      category: "Operations"
    },

    // Advanced Systems
    {
      id: "crew-control",
      title: "CrewControl",
      description: "Crew management system",
      icon: UserCheck,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-teal-400",
      category: "Operations"
    },
    {
      id: "mat-track",
      title: "MatTrack",
      description: "Material tracking system",
      icon: Warehouse,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-teal-400",
      category: "Operations"
    },
    {
      id: "earnsync",
      title: "EarnSync",
      description: "Earnings synchronization",
      icon: Target,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-teal-400",
      category: "Financial"
    },

    // Scheduling & Communication
    {
      id: "appointments",
      title: "Appointments",
      description: "Schedule client appointments",
      icon: Calendar,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-green-400",
      category: "Scheduling"
    },
    {
      id: "meetings",
      title: "Meetings",
      description: "Schedule and manage meetings",
      icon: Video,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-green-400",
      category: "Scheduling"
    },
    {
      id: "e-signatures",
      title: "E-Signatures",
      description: "Digital document signing",
      icon: Signature,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-green-400",
      category: "Documentation"
    },

    // Productivity Tools
    {
      id: "notes",
      title: "Notes",
      description: "Take and organize notes",
      icon: StickyNote,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-indigo-400",
      category: "Productivity"
    },
    {
      id: "todo-list",
      title: "To-Do List",
      description: "Manage tasks and projects",
      icon: CheckSquare,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-indigo-400",
      category: "Productivity"
    },

    // Communication & Marketing
    {
      id: "messages",
      title: "Send Message",
      description: "Client communication",
      icon: MessageSquare,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-purple-400",
      category: "Communication"
    },
    {
      id: "email-center",
      title: "Email Campaign",
      description: "Marketing campaigns",
      icon: Mail,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-purple-400",
      category: "Communication"
    },

    // Analytics & Tools
    {
      id: "analytics",
      title: "Analytics",
      description: "Business insights",
      icon: Brain,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-emerald-400",
      category: "Analytics"
    },
    {
      id: "ai-voice",
      title: "AI Voice",
      description: "Voice commands and assistance",
      icon: Mic,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-emerald-400",
      category: "AI Tools"
    },

    // Additional Features
    {
      id: "payments",
      title: "Process Payment",
      description: "Handle transactions",
      icon: CreditCard,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-slate-400",
      category: "Financial"
    },
    {
      id: "accounting",
      title: "Accounting",
      description: "Financial management",
      icon: Receipt,
      colorClass: "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg",
      iconColorClass: "text-gray-400",
      category: "Financial"
    }
  ]

  const handleActionClick = (actionId: string) => {
    console.log('QuickAction clicked:', actionId)
    if (onActionClick) {
      onActionClick(actionId)
    }
  }

  // Group actions by category
  const categories = {
    "Financial": quickActions.filter(action => action.category === "Financial"),
    "Management": quickActions.filter(action => action.category === "Management"),
    "Operations": quickActions.filter(action => action.category === "Operations"),
    "Scheduling": quickActions.filter(action => action.category === "Scheduling"),
    "Documentation": quickActions.filter(action => action.category === "Documentation"),
    "Productivity": quickActions.filter(action => action.category === "Productivity"),
    "Communication": quickActions.filter(action => action.category === "Communication"),
    "Analytics": quickActions.filter(action => action.category === "Analytics"),
    "AI Tools": quickActions.filter(action => action.category === "AI Tools")
  }

  return (
    <div className="w-full space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-sm text-gray-600">Access all your business tools and features</p>
      </div>
      
      {/* All Actions Grid */}
      <div className="space-y-8">
        {Object.entries(categories).map(([categoryName, categoryActions]) => (
          categoryActions.length > 0 && (
            <div key={categoryName} className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-800">{categoryName}</h3>
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {categoryActions.length} {categoryActions.length === 1 ? 'tool' : 'tools'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {categoryActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action.id)}
                    className={`
                      group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300
                      hover:scale-[1.05] hover:shadow-xl focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:ring-offset-2 ${action.colorClass}
                      transform
                    `}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110">
                        <action.icon className={`h-6 w-6 ${action.iconColorClass}`} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-700 group-hover:text-gray-800 text-sm leading-tight">
                          {action.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight line-clamp-2">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                  </button>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Complete Business Suite</h3>
            <p className="text-sm text-gray-600">All tools you need to run your business efficiently</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{quickActions.length}</div>
            <div className="text-xs text-gray-500">Available Tools</div>
          </div>
        </div>
      </div>
    </div>
  )
}
