
import { 
  Users, Briefcase, PenTool, CheckSquare, Package, Clipboard, DollarSign, 
  Calculator, TrendingUp, Receipt, FileSpreadsheet, GitBranch, Car, 
  Warehouse, UserCheck, Target, StickyNote, Video, Heart, PiggyBank,
  Clock, BarChart3, Calendar
} from "lucide-react"
import { MenuItem } from "./types"

export const businessTools: MenuItem[] = [
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
