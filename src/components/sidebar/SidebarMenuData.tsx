
import { 
  Home, FileText, Users, BarChart3, Calendar, Settings, Signature, PenTool, Briefcase, CheckSquare,
  Mic, CreditCard, MessageSquare, Mail, Send, Calculator, TrendingUp, Receipt, 
  FileSpreadsheet, Package, Clipboard, DollarSign, HelpCircle, Crown, Moon, Globe, Lightbulb, Video, Shield, Warehouse, UserCheck, Target, StickyNote, Zap, GitBranch, Car, CalendarCheck, Gift, Heart
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export interface MenuItem {
  title: string
  icon: any
  view: string
}

export function useSidebarMenuData() {
  const { t } = useLanguage()
  
  const mainFeatures: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      view: "dashboard"
    },
    {
      title: t("sidebar.aiVoice", "AI Voice"),
      icon: Mic,
      view: "ai-voice"
    },
    {
      title: t("sidebar.createInvoice", "Create Invoice"),
      icon: FileText,
      view: "invoice-creator"
    },
    {
      title: "Appointments",
      icon: Calendar,
      view: "appointments"
    },
    {
      title: "Smart Schedule",
      icon: CalendarCheck,
      view: "smart-schedule"
    },
    {
      title: "Payments",
      icon: CreditCard,
      view: "payments"
    },
    {
      title: t("sidebar.esignatures", "E-Signatures"),
      icon: Signature,
      view: "e-signatures"
    }
  ]

  const businessTools: MenuItem[] = [
    {
      title: "Customers",
      icon: Users,
      view: "customer-management"
    },
    {
      title: "FeatherForms",
      icon: Clipboard,
      view: "feather-forms"
    },
    {
      title: "Projects",
      icon: Briefcase,
      view: "projects"
    },
    {
      title: "Sales Pipeline",
      icon: GitBranch,
      view: "pipeline"
    },
    {
      title: "Car Rental",
      icon: Car,
      view: "car-rental"
    },
    {
      title: "Work Orders",
      icon: Package,
      view: "work-orders"
    },
    {
      title: "MatTrack",
      icon: Warehouse,
      view: "mat-track"
    },
    {
      title: "CrewControl",
      icon: UserCheck,
      view: "crew-control"
    },
    {
      title: "EarnSync",
      icon: Target,
      view: "earnsync"
    },
    {
      title: "AfterCare",
      icon: Heart,
      view: "aftercare"
    },
    {
      title: "Meetings",
      icon: Video,
      view: "meetings"
    },
    {
      title: "To-Do List",
      icon: CheckSquare,
      view: "todo-list"
    },
    {
      title: "Notes",
      icon: StickyNote,
      view: "notes"
    },
    {
      title: "Quotes",
      icon: FileSpreadsheet,
      view: "quotes"
    },
    {
      title: "Estimates",
      icon: Calculator,
      view: "estimates"
    },
    {
      title: "Accounting",
      icon: Receipt,
      view: "accounting"
    },
    {
      title: "Sales Orders",
      icon: TrendingUp,
      view: "sales-orders"
    },
    {
      title: "Service Orders",
      icon: Package,
      view: "service-orders"
    },
    {
      title: "Business Proposals",
      icon: Clipboard,
      view: "business-proposals"
    },
    {
      title: "Bids",
      icon: DollarSign,
      view: "bids"
    },
    {
      title: "Contracts",
      icon: PenTool,
      view: "contracts"
    }
  ]

  const communication: MenuItem[] = [
    {
      title: "Email Center",
      icon: Mail,
      view: "email-center"
    },
    {
      title: "Messages",
      icon: MessageSquare,
      view: "messages"
    },
    {
      title: "Communication Hub",
      icon: Send,
      view: "communication-hub"
    }
  ]

  const analytics: MenuItem[] = [
    {
      title: "Analytics",
      icon: BarChart3,
      view: "analytics"
    }
  ]

  const integrations: MenuItem[] = [
    {
      title: "Integrations",
      icon: Zap,
      view: "integrations"
    }
  ]

  const systemTools: MenuItem[] = [
    {
      title: "Admin Panel",
      icon: Shield,
      view: "admin-panel"
    },
    {
      title: "Referrals",
      icon: Gift,
      view: "referrals"
    },
    {
      title: "Features",
      icon: Lightbulb,
      view: "features"
    },
    {
      title: "FAQ & Help",
      icon: HelpCircle,
      view: "faq-help"
    },
    {
      title: "Feedback",
      icon: MessageSquare,
      view: "feedback"
    },
    {
      title: "Pricing Plans",
      icon: Crown,
      view: "pricing"
    },
    {
      title: "Settings",
      icon: Settings,
      view: "settings"
    }
  ]

  return {
    mainFeatures,
    businessTools,
    communication,
    analytics,
    integrations,
    systemTools
  }
}
