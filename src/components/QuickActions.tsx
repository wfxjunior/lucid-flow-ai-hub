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
      id: "ai-voice",
      title: t("quickActions.aiVoice"),
      description: t("quickActions.aiVoiceDesc"),
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
      id: "pdf-generator",
      title: "PDF Generator",
      description: "Create custom PDFs with your logo and client information",
      icon: FileText,
      color: "bg-emerald-500 hover:bg-emerald-600"
    },
    {
      id: "receipts",
      title: "Receipts",
      description: "Track and manage all business receipts and expenses",
      icon: Receipt,
      color: "bg-amber-500 hover:bg-amber-600"
    },
    {
      id: "appointments",
      title: "Appointments",
      description: "Schedule and manage client appointments with automated reminders",
      icon: Calendar,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      id: "work-orders",
      title: "Work Orders",
      description: "Create, track, and manage work orders with real-time status updates",
      icon: Clipboard,
      color: "bg-amber-500 hover:bg-amber-600"
    },
    {
      id: "create-invoice",
      title: t("quickActions.createInvoice"),
      description: t("quickActions.createInvoiceDesc"),
      icon: FileText,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      id: "messages",
      title: t("quickActions.sendMessage"),
      description: t("quickActions.sendMessageDesc"),
      icon: MessageSquare,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      id: "customers",
      title: t("quickActions.addClient"),
      description: t("quickActions.addClientDesc"),
      icon: Users,
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      id: "payments",
      title: t("quickActions.processPayment"),
      description: t("quickActions.processPaymentDesc"),
      icon: CreditCard,
      color: "bg-cyan-500 hover:bg-cyan-600"
    },
    {
      id: "e-signatures",
      title: t("quickActions.eSignature"),
      description: t("quickActions.eSignatureDesc"),
      icon: Signature,
      color: "bg-pink-500 hover:bg-pink-600"
    },
    {
      id: "email",
      title: t("quickActions.emailCampaign"),
      description: t("quickActions.emailCampaignDesc"),
      icon: Mail,
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      id: "family-savings",
      title: t("quickActions.familySavings"),
      description: t("quickActions.familySavingsDesc"),
      icon: Heart,
      color: "bg-rose-500 hover:bg-rose-600"
    },
    {
      id: "ai-assistant",
      title: t("quickActions.aiAssistant"),
      description: t("quickActions.aiAssistantDesc"),
      icon: Brain,
      color: "bg-violet-500 hover:bg-violet-600"
    },
    {
      id: "projects",
      title: t("quickActions.newProject"),
      description: t("quickActions.newProjectDesc"),
      icon: Plus,
      color: "bg-slate-500 hover:bg-slate-600"
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
        <CardTitle className="text-lg sm:text-xl">{t("quickActions.title")}</CardTitle>
        <CardDescription className="text-sm sm:text-base">{t("quickActions.description")}</CardDescription>
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
