
import { 
  Users, Briefcase, PenTool, CheckSquare, Package, Clipboard, DollarSign, 
  Calculator, TrendingUp, Receipt, FileSpreadsheet, GitBranch, Car, 
  Warehouse, UserCheck, Target, StickyNote, Video, Heart, PiggyBank,
  Clock, BarChart3, Calendar
} from "lucide-react"
import { MenuItem } from "./types"

// Core Business Management
export const coreBusinessTools: MenuItem[] = [
  {
    title: "Customers",
    icon: Users,
    view: "customer-management"
  },
  {
    title: "Projects",
    icon: Briefcase,
    view: "projects"
  },
  {
    title: "Project Timeline",
    icon: Calendar,
    view: "project-timeline"
  },
  {
    title: "Sales Pipeline",
    icon: GitBranch,
    view: "pipeline"
  },
  {
    title: "Smart Schedule",
    icon: Clock,
    view: "smart-schedule"
  }
]

// Financial Tools
export const financialTools: MenuItem[] = [
  {
    title: "FeatherBudget AI",
    icon: PiggyBank,
    view: "feather-budget"
  },
  {
    title: "FeatherTax",
    icon: Calculator,
    view: "feather-tax"
  },
  {
    title: "EasyCalc",
    icon: Calculator,
    view: "easy-calc"
  },
  {
    title: "Accounting",
    icon: Receipt,
    view: "accounting"
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
  }
]

// Operations & Specialized Tools
export const operationsTools: MenuItem[] = [
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
  }
]

// Documents & Forms
export const documentsTools: MenuItem[] = [
  {
    title: "FeatherForms",
    icon: Clipboard,
    view: "feather-forms"
  },
  {
    title: "Sales Orders",
    icon: TrendingUp,
    view: "sales-orders"
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

// Productivity Tools
export const productivityTools: MenuItem[] = [
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
  }
]

// Legacy export for compatibility
export const businessTools: MenuItem[] = [
  ...coreBusinessTools,
  ...financialTools,
  ...operationsTools,
  ...documentsTools,
  ...productivityTools
]
