
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuickActionsSearch } from "@/components/QuickActionsSearch"
import { useState } from "react"
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
  Mic, 
  Clipboard, 
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
  Car,
  GitBranch,
  PenTool,
  Wrench
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface QuickActionsProps {
  onActionClick?: (actionId: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  const quickActions = [
    // Financial
    {
      id: "invoice-creator",
      title: "Create Invoice",
      description: "Generate and send professional invoices",
      icon: FileText,
      category: "Financial"
    },
    {
      id: "estimates",
      title: "Estimates",
      description: "Create and manage estimates",
      icon: Calculator,
      category: "Financial"
    },
    {
      id: "quotes",
      title: "Quotes",
      description: "Generate customer quotes",
      icon: FileSpreadsheet,
      category: "Financial"
    },
    {
      id: "payments",
      title: "Process Payment",
      description: "Handle transactions",
      icon: CreditCard,
      category: "Financial"
    },
    {
      id: "accounting",
      title: "Accounting",
      description: "Financial management",
      icon: Receipt,
      category: "Financial"
    },

    // Management
    {
      id: "customer-management",
      title: "Customers",
      description: "Manage customer relationships",
      icon: Users,
      category: "Management"
    },
    {
      id: "projects",
      title: "Projects",
      description: "Manage business projects",
      icon: Briefcase,
      category: "Management"
    },
    {
      id: "pipeline",
      title: "Sales Pipeline",
      description: "Manage sales pipeline",
      icon: GitBranch,
      category: "Management"
    },

    // Operations
    {
      id: "work-orders",
      title: "Work Orders",
      description: "Create and track work orders",
      icon: Package,
      category: "Operations"
    },
    {
      id: "mat-track",
      title: "MatTrack",
      description: "Material tracking system",
      icon: Warehouse,
      category: "Operations"
    },
    {
      id: "crew-control",
      title: "CrewControl",
      description: "Crew management system",
      icon: UserCheck,
      category: "Operations"
    },
    {
      id: "car-rental",
      title: "Car Rental",
      description: "Manage vehicle rentals",
      icon: Car,
      category: "Operations"
    },

    // Scheduling
    {
      id: "appointments",
      title: "Appointments",
      description: "Schedule client appointments",
      icon: Calendar,
      category: "Scheduling"
    },
    {
      id: "smart-schedule",
      title: "Smart Schedule",
      description: "Intelligent scheduling optimization",
      icon: Calendar,
      category: "Scheduling"
    },
    {
      id: "meetings",
      title: "Meetings",
      description: "Schedule and manage meetings",
      icon: Video,
      category: "Scheduling"
    },

    // Documentation
    {
      id: "contracts",
      title: "Contracts",
      description: "Manage business contracts",
      icon: PenTool,
      category: "Documentation"
    },
    {
      id: "e-signatures",
      title: "E-Signatures",
      description: "Digital document signing",
      icon: Signature,
      category: "Documentation"
    },

    // Business Tools
    {
      id: "sales-orders",
      title: "Sales Orders",
      description: "Manage sales orders",
      icon: TrendingUp,
      category: "Business Tools"
    },
    {
      id: "service-orders",
      title: "Service Orders",
      description: "Manage service orders",
      icon: Wrench,
      category: "Business Tools"
    },
    {
      id: "business-proposals",
      title: "Business Proposals",
      description: "Create business proposals",
      icon: Clipboard,
      category: "Business Tools"
    },
    {
      id: "bids",
      title: "Bids",
      description: "Manage project bids",
      icon: DollarSign,
      category: "Business Tools"
    },

    // Productivity
    {
      id: "notes",
      title: "Notes",
      description: "Take and organize notes",
      icon: StickyNote,
      category: "Productivity"
    },
    {
      id: "todo-list",
      title: "To-Do List",
      description: "Manage tasks and projects",
      icon: CheckSquare,
      category: "Productivity"
    },

    // Communication
    {
      id: "messages",
      title: "Send Message",
      description: "Client communication",
      icon: MessageSquare,
      category: "Communication"
    },
    {
      id: "email-center",
      title: "Email Campaign",
      description: "Marketing campaigns",
      icon: Mail,
      category: "Communication"
    },

    // AI Tools
    {
      id: "ai-voice",
      title: "AI Voice",
      description: "Voice commands and assistance",
      icon: Mic,
      category: "AI Tools"
    },

    // Analytics
    {
      id: "analytics",
      title: "Analytics",
      description: "Business insights",
      icon: Brain,
      category: "Analytics"
    },

    // Additional
    {
      id: "earnsync",
      title: "EarnSync",
      description: "Earnings synchronization",
      icon: Target,
      category: "Financial"
    }
  ]

  const handleActionClick = (actionId: string) => {
    console.log('QuickAction clicked:', actionId)
    if (onActionClick) {
      onActionClick(actionId)
    }
  }

  // Filter actions based on search term
  const filteredActions = quickActions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Group filtered actions by category
  const categories = {
    "Financial": filteredActions.filter(action => action.category === "Financial"),
    "Management": filteredActions.filter(action => action.category === "Management"),
    "Operations": filteredActions.filter(action => action.category === "Operations"),
    "Scheduling": filteredActions.filter(action => action.category === "Scheduling"),
    "Documentation": filteredActions.filter(action => action.category === "Documentation"),
    "Business Tools": filteredActions.filter(action => action.category === "Business Tools"),
    "Productivity": filteredActions.filter(action => action.category === "Productivity"),
    "Communication": filteredActions.filter(action => action.category === "Communication"),
    "AI Tools": filteredActions.filter(action => action.category === "AI Tools"),
    "Analytics": filteredActions.filter(action => action.category === "Analytics")
  }

  return (
    <div className="w-full space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-sm text-gray-600">Access all your business tools and features</p>
      </div>
      
      <QuickActionsSearch onSearch={setSearchTerm} />
      
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
                    className="group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.05] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 shadow-md hover:shadow-lg transform"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110">
                        <action.icon className="h-6 w-6 text-slate-400" />
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

      {filteredActions.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          <p>No actions found for "{searchTerm}"</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Complete Business Suite</h3>
            <p className="text-sm text-gray-600">All tools you need to run your business efficiently</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{filteredActions.length}</div>
            <div className="text-xs text-gray-500">Available Tools</div>
          </div>
        </div>
      </div>
    </div>
  )
}
