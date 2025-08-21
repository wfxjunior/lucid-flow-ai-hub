
import React from 'react'
import { 
  BarChart3, Shield, Users, Star, Grid, HelpCircle, MessageCircleQuestion,
  CircleDollarSign, Signature, ListTodo, TrendingUp, Calendar, PiggyBank,
  FileCheck, Receipt, Banknote, Truck, Boxes, UserCheck, DollarSign,
  Heart, ClipboardList, Store, Building2, Zap, StickyNote, Target,
  TrendingUp as Growth, Bot
} from 'lucide-react'
import { GenericView } from './GenericView'

// Analytics View
export function AnalyticsView() {
  return (
    <GenericView
      title="Analytics"
      description="Business performance analytics"
      icon={BarChart3}
    />
  )
}

// Admin Panel View
export function AdminPanelView() {
  return (
    <GenericView
      title="Admin Panel"
      description="Administrative controls and settings"
      icon={Shield}
    />
  )
}

// Careers View
export function CareersView() {
  return (
    <GenericView
      title="Careers"
      description="Join our team"
      icon={Users}
    />
  )
}

// Referrals View
export function ReferralsView() {
  return (
    <GenericView
      title="Referrals"
      description="Refer friends and earn rewards"
      icon={Star}
    />
  )
}

// Features View
export function FeaturesView() {
  return (
    <GenericView
      title="Features"
      description="Explore all available features"
      icon={Grid}
    />
  )
}

// FAQ & Help View
export function FAQHelpView() {
  return (
    <GenericView
      title="FAQ & Help"
      description="Get help and find answers"
      icon={HelpCircle}
    />
  )
}

// Feedback View
export function FeedbackView() {
  return (
    <GenericView
      title="Feedback"
      description="Share your feedback with us"
      icon={MessageCircleQuestion}
    />
  )
}

// Pricing View
export function PricingView() {
  return (
    <GenericView
      title="Pricing"
      description="View pricing plans"
      icon={CircleDollarSign}
    />
  )
}

// E-Signatures View
export function ESignaturesView() {
  return (
    <GenericView
      title="E-Signatures"
      description="Electronic document signing"
      icon={Signature}
    />
  )
}

// Project Timeline View
export function ProjectTimelineView() {
  return (
    <GenericView
      title="Project Timeline"
      description="Track project progress over time"
      icon={ListTodo}
    />
  )
}

// Pipeline View
export function PipelineView() {
  return (
    <GenericView
      title="Pipeline"
      description="Sales and project pipeline"
      icon={TrendingUp}
    />
  )
}

// Smart Schedule View
export function SmartScheduleView() {
  return (
    <GenericView
      title="Smart Schedule"
      description="AI-powered scheduling"
      icon={Calendar}
    />
  )
}

// FeatherBudget View
export function FeatherBudgetView() {
  return (
    <GenericView
      title="FeatherBudget"
      description="Budget planning and management"
      icon={PiggyBank}
    />
  )
}

// FeatherTax View
export function FeatherTaxView() {
  return (
    <GenericView
      title="FeatherTax"
      description="Tax preparation and filing"
      icon={FileCheck}
    />
  )
}

// EasyCalc View
export function EasyCalcView() {
  return (
    <GenericView
      title="EasyCalc"
      description="Business calculations made easy"
      icon={Receipt}
    />
  )
}

// Receipts View
export function ReceiptsView() {
  return (
    <GenericView
      title="Receipts"
      description="Manage business receipts"
      icon={Receipt}
    />
  )
}

// Accounting View
export function AccountingView() {
  return (
    <GenericView
      title="Accounting"
      description="Complete accounting solution"
      icon={Banknote}
    />
  )
}

// Quotes View
export function QuotesView() {
  return (
    <GenericView
      title="Quotes"
      description="Create and manage quotes"
      icon={FileCheck}
    />
  )
}

// Car Rental View
export function CarRentalView() {
  return (
    <GenericView
      title="Car Rental"
      description="Vehicle rental management"
      icon={Truck}
    />
  )
}

// MatTrack View
export function MatTrackView() {
  return (
    <GenericView
      title="MatTrack"
      description="Material tracking system"
      icon={Boxes}
    />
  )
}

// Crew Control View
export function CrewControlView() {
  return (
    <GenericView
      title="Crew Control"
      description="Workforce management"
      icon={UserCheck}
    />
  )
}

// EarnSync View
export function EarnSyncView() {
  return (
    <GenericView
      title="EarnSync"
      description="Earnings synchronization"
      icon={DollarSign}
    />
  )
}

// AfterCare View
export function AfterCareView() {
  return (
    <GenericView
      title="AfterCare"
      description="Customer aftercare services"
      icon={Heart}
    />
  )
}

// FeatherForms View
export function FeatherFormsView() {
  return (
    <GenericView
      title="FeatherForms"
      description="Custom form builder"
      icon={ClipboardList}
    />
  )
}

// Sales Orders View
export function SalesOrdersView() {
  return (
    <GenericView
      title="Sales Orders"
      description="Manage sales orders"
      icon={Store}
    />
  )
}

// Business Proposals View
export function BusinessProposalsView() {
  return (
    <GenericView
      title="Business Proposals"
      description="Create professional proposals"
      icon={Building2}
    />
  )
}

// Bids View
export function BidsView() {
  return (
    <GenericView
      title="Bids"
      description="Manage project bids"
      icon={Zap}
    />
  )
}

// Todo List View
export function TodoListView() {
  return (
    <GenericView
      title="Todo List"
      description="Manage your tasks"
      icon={ListTodo}
    />
  )
}

// Notes View
export function NotesView() {
  return (
    <GenericView
      title="Notes"
      description="Take and organize notes"
      icon={StickyNote}
    />
  )
}

// Tours View
export function ToursView() {
  return (
    <GenericView
      title="Tours"
      description="Product tours and onboarding"
      icon={Target}
    />
  )
}

// Finance View
export function FinanceView() {
  return (
    <GenericView
      title="Finance"
      description="Financial management"
      icon={Banknote}
    />
  )
}

// Growth View
export function GrowthView() {
  return (
    <GenericView
      title="Growth"
      description="Business growth tools"
      icon={Growth}
    />
  )
}

// Automations View
export function AutomationsView() {
  return (
    <GenericView
      title="Automations"
      description="Automate your workflows"
      icon={Bot}
    />
  )
}
