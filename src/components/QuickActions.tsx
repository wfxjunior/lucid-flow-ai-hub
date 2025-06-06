
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
  Wrench
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
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      category: "Financial"
    },
    {
      id: "estimates",
      title: "Estimates",
      description: "Create and manage estimates",
      icon: Calculator,
      colorClass: "bg-green-50 hover:bg-green-100 border-green-200",
      category: "Financial"
    },
    {
      id: "quotes",
      title: "Quotes",
      description: "Generate customer quotes",
      icon: FileSpreadsheet,
      colorClass: "bg-purple-50 hover:bg-purple-100 border-purple-200",
      category: "Financial"
    },
    {
      id: "contracts",
      title: "Contracts",
      description: "Manage business contracts",
      icon: FileBarChart,
      colorClass: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200",
      category: "Financial"
    },

    // Customer & Project Management
    {
      id: "customer-management",
      title: "Customers",
      description: "Manage customer relationships",
      icon: Users,
      colorClass: "bg-cyan-50 hover:bg-cyan-100 border-cyan-200",
      category: "Management"
    },
    {
      id: "projects",
      title: "Projects",
      description: "Manage business projects",
      icon: Briefcase,
      colorClass: "bg-orange-50 hover:bg-orange-100 border-orange-200",
      category: "Management"
    },
    {
      id: "work-orders",
      title: "Work Orders",
      description: "Create and track work orders",
      icon: Wrench,
      colorClass: "bg-red-50 hover:bg-red-100 border-red-200",
      category: "Operations"
    },

    // Advanced Systems
    {
      id: "crew-control",
      title: "CrewControl",
      description: "Crew management system",
      icon: UserCheck,
      colorClass: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
      category: "Operations"
    },
    {
      id: "mat-track",
      title: "MatTrack",
      description: "Material tracking system",
      icon: Warehouse,
      colorClass: "bg-amber-50 hover:bg-amber-100 border-amber-200",
      category: "Operations"
    },
    {
      id: "earnsync",
      title: "EarnSync",
      description: "Earnings synchronization",
      icon: Target,
      colorClass: "bg-teal-50 hover:bg-teal-100 border-teal-200",
      category: "Financial"
    },

    // Scheduling & Communication
    {
      id: "appointments",
      title: "Appointments",
      description: "Schedule client appointments",
      icon: Calendar,
      colorClass: "bg-violet-50 hover:bg-violet-100 border-violet-200",
      category: "Scheduling"
    },
    {
      id: "meetings",
      title: "Meetings",
      description: "Schedule and manage meetings",
      icon: Video,
      colorClass: "bg-pink-50 hover:bg-pink-100 border-pink-200",
      category: "Scheduling"
    },
    {
      id: "e-signatures",
      title: "E-Signatures",
      description: "Digital document signing",
      icon: Signature,
      colorClass: "bg-slate-50 hover:bg-slate-100 border-slate-200",
      category: "Documentation"
    },

    // Productivity Tools
    {
      id: "notes",
      title: "Notes",
      description: "Take and organize notes",
      icon: StickyNote,
      colorClass: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
      category: "Productivity"
    },
    {
      id: "todo-list",
      title: "To-Do List",
      description: "Manage tasks and projects",
      icon: CheckSquare,
      colorClass: "bg-lime-50 hover:bg-lime-100 border-lime-200",
      category: "Productivity"
    },

    // Communication & Marketing
    {
      id: "messages",
      title: "Send Message",
      description: "Client communication",
      icon: MessageSquare,
      colorClass: "bg-sky-50 hover:bg-sky-100 border-sky-200",
      category: "Communication"
    },
    {
      id: "email-center",
      title: "Email Campaign",
      description: "Marketing campaigns",
      icon: Mail,
      colorClass: "bg-rose-50 hover:bg-rose-100 border-rose-200",
      category: "Communication"
    },

    // Analytics & Tools
    {
      id: "analytics",
      title: "Analytics",
      description: "Business insights",
      icon: Brain,
      colorClass: "bg-gray-50 hover:bg-gray-100 border-gray-200",
      category: "Analytics"
    },
    {
      id: "ai-voice",
      title: "AI Voice",
      description: "Voice commands and assistance",
      icon: Mic,
      colorClass: "bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-200",
      category: "AI Tools"
    },

    // Additional Features
    {
      id: "payments",
      title: "Process Payment",
      description: "Handle transactions",
      icon: CreditCard,
      colorClass: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
      category: "Financial"
    },
    {
      id: "accounting",
      title: "Accounting",
      description: "Financial management",
      icon: Receipt,
      colorClass: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      category: "Financial"
    }
  ]

  const handleActionClick = (actionId: string) => {
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
                      group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-200
                      hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:ring-offset-2 ${action.colorClass}
                      border-2 hover:border-opacity-60
                    `}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 transition-all duration-200 group-hover:bg-white group-hover:scale-110">
                        <action.icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 text-sm leading-tight">
                          {action.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-xl"></div>
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
