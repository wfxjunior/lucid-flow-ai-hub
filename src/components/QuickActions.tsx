
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
      description: "Generate and send professional invoices",
      icon: FileText,
      color: "bg-slate-900 hover:bg-slate-800"
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
      id: "files",
      title: "Files",
      description: "Manage documents",
      icon: FolderOpen,
      color: "bg-emerald-600 hover:bg-emerald-700"
    },
    {
      id: "appointments",
      title: "Appointments",
      description: "Schedule meetings",
      icon: Calendar,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "customers",
      title: "Add Client",
      description: "Manage relationships",
      icon: Users,
      color: "bg-purple-600 hover:bg-purple-700"
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
    },
    {
      id: "receipts",
      title: "Receipts",
      description: "Track expenses",
      icon: Receipt,
      color: "bg-orange-600 hover:bg-orange-700"
    }
  ]

  const handleActionClick = (actionId: string) => {
    if (onActionClick) {
      onActionClick(actionId)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-600">Access your most used features</p>
      </div>
      
      {/* Asymmetric grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {quickActions.map((action, index) => {
          // Create asymmetric sizing
          const isLarge = index === 0 || index === 4 || index === 8
          const colSpan = isLarge ? "md:col-span-2" : "md:col-span-1"
          
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              className={`${colSpan} group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color} transition-colors`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-tight">
                    {action.description}
                  </p>
                </div>
              </div>
              
              {/* Subtle hover indicator */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
