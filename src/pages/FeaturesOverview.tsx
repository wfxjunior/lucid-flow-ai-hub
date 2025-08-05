import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent } from "@/components/ui/card"

// Import main Lucide icons
import {
  LayoutDashboard, Bot, FileText, ClipboardCheck, CreditCard, Signature, Users, FolderKanban,
  GanttChartSquare, PenLine, CalendarClock, PiggyBank, Calculator, Coins, BookOpen,
  Quote, Car, ClipboardList, Boxes, UserCog, RefreshCcw, HeartHandshake, PenTool, FileText as DocFileText,
  ArrowRightLeft, HandCoins, AlarmClock, StickyNote, MessagesSquare, Mail, BarChart3,
  ServerCog, UserPlus, Calendar, Star, SlidersHorizontal, HelpCircle, Settings2
} from "lucide-react"

// Map each feature to a Lucide icon
const featureIconMap: Record<string, React.ElementType> = {
  "Dashboard": LayoutDashboard,
  "AI Voice": Bot,
  "Invoices": FileText,
  "Estimates": ClipboardCheck,
  "Payments": CreditCard,
  "E-Signatures": Signature,
  "Customer Management": Users,
  "Projects": FolderKanban,
  "Project Timeline": GanttChartSquare,
  "Pipeline": PenLine,          // Replaced Pipeline with PenLine
  "Smart Schedule": CalendarClock,
  "FeatherBudget": PiggyBank,
  "FeatherTax": Coins,
  "EasyCalc": Calculator,
  "Accounting": BookOpen,
  "Quotes": Quote,
  "Car Rental": Car,
  "Work Orders": ClipboardList,
  "MatTrack": Boxes,
  "Crew Control": UserCog,
  "EarnSync": RefreshCcw,       // Replaced Sync with RefreshCcw
  "AfterCare": HeartHandshake,
  "FeatherForms": PenTool,
  "Sales Orders": DocFileText,
  "Business Proposals": FileText,
  "Bids": ArrowRightLeft,
  "Contracts": HandCoins,
  "Meetings": AlarmClock,
  "Todo List": ClipboardList,
  "Notes": StickyNote,
  "Messages": MessagesSquare,
  "Email Settings": Mail,
  "Analytics": BarChart3,
  "Admin Panel": ServerCog,
  "Careers": UserPlus,
  "Appointments": Calendar,
  "Referrals": Star,
  "Features": SlidersHorizontal,
  "FAQ & Help": HelpCircle,
  "Feedback": HeartHandshake,
  "Pricing": PiggyBank,
  "Settings": Settings2,
}

// Enhanced details for all features
const allFeatures = [
  { name: "Dashboard", category: "Main", description: "Get a bird’s-eye view of your whole business—track activities, see key stats, and access core apps all in one place." },
  { name: "AI Voice", category: "Main", description: "Ask, command, or automate tasks with your own AI voice assistant, saving time on repetitive actions." },
  { name: "Invoices", category: "Main", description: "Generate and customize professional invoices instantly with templates, branding, and automated calculations." },
  { name: "Estimates", category: "Main", description: "Quickly create detailed project estimates and quotes to impress clients and win jobs faster." },
  { name: "Payments", category: "Main", description: "Track payments, get paid faster with integrated online payment solutions, and enjoy automated reminders." },
  { name: "E-Signatures", category: "Main", description: "Sign documents securely online—no more printing or scanning, with legally binding digital signatures." },
  { name: "Customer Management", category: "Core Business", description: "Store, view, and organize all customer info in one powerful CRM to build strong client relationships." },
  { name: "Projects", category: "Core Business", description: "Plan, track, and manage every project stage—assign tasks, set deadlines, and monitor progress." },
  { name: "Project Timeline", category: "Core Business", description: "Visualize project milestones and deadlines to keep your team and clients on the same page." },
  { name: "Pipeline", category: "Core Business", description: "Manage your sales or service pipeline step-by-step to close deals faster and never miss an opportunity." },
  { name: "Smart Schedule", category: "Core Business", description: "Let AI optimize your team’s daily, weekly, and monthly schedule for higher productivity with automatic reminders." },
  { name: "FeatherBudget", category: "Financial", description: "Easily set, manage, and analyze business budgets with intuitive dashboards and alerts if you go over." },
  { name: "FeatherTax", category: "Financial", description: "Make tax time stress-free—track tax obligations, store receipts, and auto-calculate what you owe." },
  { name: "EasyCalc", category: "Financial", description: "Solve any business math—calculators for margins, markups, splits, and finances, built right in." },
  { name: "Accounting", category: "Financial", description: "Track your income, expenses, and get real-time financial reports with built-in accounting tools." },
  { name: "Quotes", category: "Financial", description: "Send professional price quotes and convert approved quotes to invoices in one click." },
  { name: "Car Rental", category: "Operations", description: "Full fleet management—handle bookings, returns, maintenance, and billing for car rental businesses." },
  { name: "Work Orders", category: "Operations", description: "Create work orders, assign jobs, update status, and ensure every job gets done on time." },
  { name: "MatTrack", category: "Operations", description: "Monitor and control your inventory and materials, with alerts for low stock and fast tracking." },
  { name: "Crew Control", category: "Operations", description: "Manage employee scheduling, hours, and performance; make payroll and communication easier." },
  { name: "EarnSync", category: "Operations", description: "Sync earnings and transaction data from different sources to view business health in real time." },
  { name: "AfterCare", category: "Operations", description: "Track and manage after-sales services, follow-ups, and offer the best care to your clients post-sale." },
  { name: "FeatherForms", category: "Documents", description: "Design and send custom forms for contracts, surveys, or feedback and collect responses online." },
  { name: "Sales Orders", category: "Documents", description: "Easily process sales orders and stay organized with all order documentation in one place." },
  { name: "Business Proposals", category: "Documents", description: "Create beautiful, persuasive proposals to win new business—track sent, viewed, and accepted." },
  { name: "Bids", category: "Documents", description: "Submit business bids efficiently with templates, automated tracking, and easy follow-up." },
  { name: "Contracts", category: "Documents", description: "Draft, store, and manage all contracts with e-sign and automatic reminders for renewals or expiries." },
  { name: "Meetings", category: "Productivity", description: "Schedule, organize, and track meetings, with automatic calendar adds and notifications." },
  { name: "Todo List", category: "Productivity", description: "Stay on top of daily priorities with a personal or shared team to-do list, fully integrated." },
  { name: "Notes", category: "Productivity", description: "Quickly jot down ideas, save meeting notes, or add project details in organized folders." },
  { name: "Messages", category: "Communication", description: "Securely chat with clients or colleagues without leaving the platform." },
  { name: "Email Settings", category: "Communication", description: "Set up, manage, and automate outgoing emails to match your business style." },
  { name: "Analytics", category: "Analytics", description: "View business insights—track growth, spot trends, and make data-driven decisions easily." },
  { name: "Admin Panel", category: "Analytics", description: "Control roles, permissions, users, and data access in a simple, secure admin panel." },
  { name: "Careers", category: "General", description: "Share and manage open job positions and receive candidate applications." },
  { name: "Appointments", category: "General", description: "Let clients or partners book, reschedule, or cancel appointments themselves—no phone tag!" },
  { name: "Referrals", category: "General", description: "Reward your loyal clients—manage referral programs and track performance." },
  { name: "Features", category: "General", description: "Submit new feature requests or vote on ideas to shape the platform’s future." },
  { name: "FAQ & Help", category: "General", description: "Browse common questions or contact support for instant help." },
  { name: "Feedback", category: "General", description: "Share your experience and suggestions—help us keep improving for you!" },
  { name: "Pricing", category: "General", description: "Explore affordable, transparent plans; find the best fit for your business." },
  { name: "Settings", category: "General", description: "Customize your account, preferences, notifications, and workspace details." },
  {
    name: "Service Orders",
    category: "Documents",
    description: "Easily manage and track all service orders for your business—assign jobs, update progress, store service-related documents, and keep a history of every service performed. Never lose track of tasks or paperwork related to each service job."
  },
  {
    name: "Email Center",
    category: "Communication",
    description: "Centralized platform for managing business emails—send, receive, organize, and automate client messages with robust filters and seamless integration into your daily workflow."
  },
  {
    name: "Communication Hub",
    category: "Communication",
    description: "Unify all your business communications—including emails, chat, and notifications—into a single intuitive dashboard for easier tracking, quicker responses, and complete conversation history."
  }
];

import React from "react";
import { FeatureHelpDialog } from "@/components/FeatureHelpDialog";
export default function FeaturesOverview() {
  const { t } = useLanguage();
  const [helpOpen, setHelpOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
          Features Overview
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Explore all available features in one place.
        </p>
        <p className="text-base text-muted-foreground">
          Centralize, automate, and grow your business with our complete platform toolkit.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {allFeatures.map((f) => {
          const Icon = featureIconMap[f.name] || Star;
          return (
            <Card key={f.name} className="bg-card/90 border hover:shadow-lg transition-shadow p-0">
              <CardContent className="px-7 pt-8 pb-6 flex flex-col items-center">
                <div className="rounded-xl bg-primary/10 p-4 mb-5 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2 text-center">
                  {f.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 text-center min-h-[56px]">
                  {f.description}
                </p>
                <span className="mt-1 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{f.category}</span>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="max-w-2xl mx-auto flex flex-col items-center mt-10 gap-4">
        <Link to="/" className="inline-block px-6 py-2 rounded-lg border bg-muted/80 hover:bg-primary/10 text-foreground font-medium transition mt-2">
          Back to Home
        </Link>

        {/* New Features Help Button */}
        <button
          className="mt-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow"
          onClick={() => setHelpOpen(true)}
        >
          Features Help
        </button>
        <FeatureHelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
      </div>
    </div>
  );
}
