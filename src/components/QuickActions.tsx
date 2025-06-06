
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
      colorClass: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-500 text-white shadow-lg hover:shadow-xl",
      category: "Financial"
    },
    {
      id: "estimates",
      title: "Estimates",
      description: "Create and manage estimates",
      icon: Calculator,
      colorClass: "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-emerald-500 text-white shadow-lg hover:shadow-xl",
      category: "Financial"
    },
    {
      id: "quotes",
      title: "Quotes",
      description: "Generate customer quotes",
      icon: FileSpreadsheet,
      colorClass: "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-purple-500 text-white shadow-lg hover:shadow-xl",
      category: "Financial"
    },
    {
      id: "contracts",
      title: "Contracts",
      description: "Manage business contracts",
      icon: FileBarChart,
      colorClass: "bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 border-indigo-500 text-white shadow-lg hover:shadow-xl",
      category: "Financial"
    },

    // Customer & Project Management
    {
      id: "customer-management",
      title: "Customers",
      description: "Manage customer relationships",
      icon: Users,
      colorClass: "bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 border-cyan-500 text-white shadow-lg hover:shadow-xl",
      category: "Management"
    },
    {
      id: "projects",
      title: "Projects",
      description: "Manage business projects",
      icon: Briefcase,
      colorClass: "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-orange-500 text-white shadow-lg hover:shadow-xl",
      category: "Management"
    },
    {
      id: "work-orders",
      title: "Work Orders",
      description: "Create and track work orders",
      icon: Wrench,
      colorClass: "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-red-500 text-white shadow-lg hover:shadow-xl",
      category: "Operations"
    },

    // Advanced Systems
    {
      id: "crew-control",
      title: "CrewControl",
      description: "Crew management system",
      icon: UserCheck,
      colorClass: "bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-500 text-white shadow-lg hover:shadow-xl",
      category: "Operations"
    },
    {
      id: "mat-track",
      title: "MatTrack",
      description: "Material tracking system",
      icon: Warehouse,
      colorClass: "bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-amber-500 text-white shadow-lg hover:shadow-xl",
      category: "Operations"
    },
    {
      id: "earnsync",
      title: "EarnSync",
      description: "Earnings synchronization",
      icon: Target,
      colorClass: "bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 border-rose-500 text-white shadow-lg hover:shadow-xl",
      category: "Financial"
    },

    // Scheduling & Communication
    {
      id: "appointments",
      title: "Appointments",
      description: "Schedule client appointments",
      icon: Calendar,
      colorClass: "bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 border-violet-500 text-white shadow-lg hover:shadow-xl",
      category: "Scheduling"
    },
    {
      id: "meetings",
      title: "Meetings",
      description: "Schedule and manage meetings",
      icon: Video,
      colorClass: "bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-pink-500 text-white shadow-lg hover:shadow-xl",
      category: "Scheduling"
    },
    {
      id: "e-signatures",
      title: "E-Signatures",
      description: "Digital document signing",
      icon: Signature,
      colorClass: "bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 border-slate-600 text-white shadow-lg hover:shadow-xl",
      category: "Documentation"
    },

    // Productivity Tools
    {
      id: "notes",
      title: "Notes",
      description: "Take and organize notes",
      icon: StickyNote,
      colorClass: "bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 border-yellow-500 text-white shadow-lg hover:shadow-xl",
      category: "Productivity"
    },
    {
      id: "todo-list",
      title: "To-Do List",
      description: "Manage tasks and projects",
      icon: CheckSquare,
      colorClass: "bg-gradient-to-br from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 border-lime-500 text-white shadow-lg hover:shadow-xl",
      category: "Productivity"
    },

    // Communication & Marketing
    {
      id: "messages",
      title: "Send Message",
      description: "Client communication",
      icon: MessageSquare,
      colorClass: "bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 border-sky-500 text-white shadow-lg hover:shadow-xl",
      category: "Communication"
    },
    {
      id: "email-center",
      title: "Email Campaign",
      description: "Marketing campaigns",
      icon: Mail,
      colorClass: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700 border-fuchsia-500 text-white shadow-lg hover:shadow-xl",
      category: "Communication"
    },

    // Analytics & Tools
    {
      id: "analytics",
      title: "Analytics",
      description: "Business insights",
      icon: Brain,
      colorClass: "bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 border-gray-600 text-white shadow-lg hover:shadow-xl",
      category: "Analytics"
    },
    {
      id: "ai-voice",
      title: "AI Voice",
      description: "Voice commands and assistance",
      icon: Mic,
      colorClass: "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-green-500 text-white shadow-lg hover:shadow-xl",
      category: "AI Tools"
    },

    // Additional Features
    {
      id: "payments",
      title: "Process Payment",
      description: "Handle transactions",
      icon: CreditCard,
      colorClass: "bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 border-emerald-600 text-white shadow-lg hover:shadow-xl",
      category: "Financial"
    },
    {
      id: "accounting",
      title: "Accounting",
      description: "Financial management",
      icon: Receipt,
      colorClass: "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-blue-600 text-white shadow-lg hover:shadow-xl",
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
                      hover:scale-[1.05] hover:shadow-2xl focus:outline-none focus:ring-2 
                      focus:ring-white focus:ring-offset-2 ${action.colorClass}
                      border-2 transform
                    `}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-white group-hover:text-white text-sm leading-tight">
                          {action.title}
                        </h3>
                        <p className="text-xs text-white/80 leading-tight line-clamp-2">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
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
