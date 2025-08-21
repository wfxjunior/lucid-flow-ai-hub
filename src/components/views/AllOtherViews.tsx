import React from 'react'
import { GenericView } from './GenericView'
import { 
  BarChart3, Shield, Briefcase, Gift, Lightbulb, HelpCircle, 
  MessageSquare, Crown, Signature, Calendar, GitBranch, 
  Clock, DollarSign, Calculator, Receipt, Building, 
  Car, Package, Users, Headphones, FileText, ShoppingCart,
  Target, StickyNote, MapPin, TrendingUp, Bot, FormInput
} from 'lucide-react'

interface AllOtherViewsProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function AllOtherViews({ activeView, onNavigate }: AllOtherViewsProps) {
  const renderView = () => {
    switch (activeView) {
      case "analytics":
        return <AnalyticsView />
      case "admin-panel":
        return <AdminPanelView />
      case "careers":
        return <CareersView />
      case "referrals":
        return <ReferralsView />
      case "features":
        return <FeaturesView />
      case "faq-help":
        return <FAQHelpView />
      case "feedback":
        return <FeedbackView />
      case "pricing":
        return <PricingView />
      case "e-signatures":
        return <ESignaturesView />
      case "project-timeline":
        return <ProjectTimelineView />
      case "pipeline":
        return <PipelineView />
      case "smart-schedule":
        return <SmartScheduleView />
      case "featherbudget":
        return <FeatherBudgetView />
      case "feathertax":
        return <FeatherTaxView />
      case "easycalc":
        return <EasyCalcView />
      case "receipts":
        return <ReceiptsView />
      case "accounting":
        return <AccountingView />
      case "quotes":
        return <QuotesView />
      case "car-rental":
        return <CarRentalView />
      case "mattrack":
        return <MatTrackView />
      case "crew-control":
        return <CrewControlView />
      case "earnsync":
        return <EarnSyncView />
      case "aftercare":
        return <AfterCareView />
      case "featherforms":
        return <FeatherFormsView />
      case "sales-orders":
        return <SalesOrdersView />
      case "business-proposals":
        return <BusinessProposalsView />
      case "bids":
        return <BidsView />
      case "todo-list":
        return <TodoListView />
      case "notes":
        return <NotesView />
      case "tours":
        return <ToursView />
      case "finance":
        return <FinanceView />
      case "growth":
        return <GrowthView />
      case "automations":
        return <AutomationsView />
      default:
        return <div className="p-8 text-center">Vista não encontrada: {activeView}</div>
    }
  }

  return renderView()
}

export function AnalyticsView() {
  return (
    <GenericView
      title="Analytics"
      description="Business analytics and insights"
      icon={BarChart3}
    />
  )
}

export function AdminPanelView() {
  return (
    <GenericView
      title="Admin Panel"
      description="System administration"
      icon={Shield}
    />
  )
}

export function CareersView() {
  return (
    <GenericView
      title="Careers"
      description="Join our team"
      icon={Briefcase}
    />
  )
}

export function ReferralsView() {
  return (
    <GenericView
      title="Referrals"
      description="Refer friends and earn rewards"
      icon={Gift}
    />
  )
}

export function FeaturesView() {
  return (
    <GenericView
      title="Features"
      description="Explore all features"
      icon={Lightbulb}
    />
  )
}

export function FAQHelpView() {
  return (
    <GenericView
      title="FAQ & Help"
      description="Get help and support"
      icon={HelpCircle}
    />
  )
}

export function FeedbackView() {
  return (
    <GenericView
      title="Feedback"
      description="Share your feedback"
      icon={MessageSquare}
    />
  )
}

export function PricingView() {
  return (
    <GenericView
      title="Pricing"
      description="Choose your plan"
      icon={Crown}
    />
  )
}

export function ESignaturesView() {
  return (
    <GenericView
      title="E-Signatures"
      description="Digital signature management"
      icon={Signature}
    />
  )
}

export function ProjectTimelineView() {
  return (
    <GenericView
      title="Project Timeline"
      description="Track project progress and milestones"
      icon={Calendar}
    />
  )
}

export function PipelineView() {
  return (
    <GenericView
      title="Pipeline"
      description="Sales pipeline management"
      icon={GitBranch}
    />
  )
}

export function SmartScheduleView() {
  return (
    <GenericView
      title="Smart Schedule"
      description="AI-powered scheduling"
      icon={Clock}
    />
  )
}

export function FeatherBudgetView() {
  return (
    <GenericView
      title="FeatherBudget"
      description="Budget management tool"
      icon={DollarSign}
    />
  )
}

export function FeatherTaxView() {
  return (
    <GenericView
      title="FeatherTax"
      description="Tax management system"
      icon={Calculator}
    />
  )
}

export function EasyCalcView() {
  return (
    <GenericView
      title="EasyCalc"
      description="Easy calculation tool"
      icon={Calculator}
    />
  )
}

export function ReceiptsView() {
  return (
    <GenericView
      title="Receipts"
      description="Receipt management"
      icon={Receipt}
    />
  )
}

export function AccountingView() {
  return (
    <GenericView
      title="Accounting"
      description="Full accounting suite"
      icon={Receipt}
    />
  )
}

export function QuotesView() {
  return (
    <GenericView
      title="Quotes"
      description="Create and manage quotes"
      icon={FileText}
    />
  )
}

export function CarRentalView() {
  return (
    <GenericView
      title="Car Rental"
      description="Vehicle rental management"
      icon={Car}
    />
  )
}

export function MatTrackView() {
  return (
    <GenericView
      title="MatTrack"
      description="Material tracking system"
      icon={Package}
    />
  )
}

export function CrewControlView() {
  return (
    <GenericView
      title="Crew Control"
      description="Team management system"
      icon={Users}
    />
  )
}

export function EarnSyncView() {
  return (
    <GenericView
      title="EarnSync"
      description="Earnings synchronization"
      icon={DollarSign}
    />
  )
}

export function AfterCareView() {
  return (
    <GenericView
      title="AfterCare"
      description="Customer aftercare service"
      icon={Headphones}
    />
  )
}

export function FeatherFormsView() {
  return (
    <GenericView
      title="FeatherForms"
      description="Dynamic form builder"
      icon={FormInput}
    />
  )
}

export function SalesOrdersView() {
  return (
    <GenericView
      title="Sales Orders"
      description="Manage sales orders"
      icon={ShoppingCart}
    />
  )
}

export function BusinessProposalsView() {
  return (
    <GenericView
      title="Business Proposals"
      description="Create business proposals"
      icon={Building}
    />
  )
}

export function BidsView() {
  return (
    <GenericView
      title="Bids"
      description="Manage project bids"
      icon={Target}
    />
  )
}

export function TodoListView() {
  return (
    <GenericView
      title="Todo List"
      description="Task management"
      icon={FileText}
    />
  )
}

export function NotesView() {
  return (
    <GenericView
      title="Notes"
      description="Take and organize notes"
      icon={StickyNote}
    />
  )
}

export function ToursView() {
  return (
    <GenericView
      title="Tours"
      description="Schedule and manage tours"
      icon={MapPin}
    />
  )
}

export function FinanceView() {
  return (
    <GenericView
      title="Finance"
      description="Financial management"
      icon={DollarSign}
    />
  )
}

export function GrowthView() {
  return (
    <GenericView
      title="Growth"
      description="Business growth analytics"
      icon={TrendingUp}
    />
  )
}

export function AutomationsView() {
  return (
    <GenericView
      title="Automations"
      description="Business process automation"
      icon={Bot}
    />
  )
}
