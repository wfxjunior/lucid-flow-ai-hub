import React from 'react'
import { GenericView } from './GenericView'
import { 
  BarChart3, Shield, Briefcase, Gift, Lightbulb, HelpCircle, 
  MessageSquare, Crown, Signature, Calendar, GitBranch, 
  Clock, DollarSign, Calculator, Receipt, Building, 
  Car, Package, Users, Headphones, Clipboard, ShoppingCart,
  FileText, Target, StickyNote, MapPin, TrendingUp, Bot
} from 'lucide-react'
import { ProjectTimelinePage } from '@/components/pages/ProjectTimelinePage'
import { FinancePage } from '@/components/pages/FinancePage'
import { GrowthPage } from '@/components/pages/GrowthPage'
import { ToursPage } from '@/components/pages/ToursPage'

// Analytics View
export function AnalyticsView() {
  return (
    <GenericView
      title="Analytics"
      description="Business insights and reporting"
      icon={BarChart3}
    />
  )
}

// Admin Panel View
export function AdminPanelView() {
  return (
    <GenericView
      title="Admin Panel"
      description="System administration tools"
      icon={Shield}
    />
  )
}

// Careers View
export function CareersView() {
  return (
    <GenericView
      title="Careers"
      description="Job postings and career opportunities"
      icon={Briefcase}
    />
  )
}

// Referrals View
export function ReferralsView() {
  return (
    <GenericView
      title="Referrals"
      description="Manage referral programs"
      icon={Gift}
    />
  )
}

// Features View
export function FeaturesView() {
  return (
    <GenericView
      title="Features"
      description="Product features and capabilities"
      icon={Lightbulb}
    />
  )
}

// FAQ & Help View
export function FAQHelpView() {
  return (
    <GenericView
      title="FAQ & Help"
      description="Frequently asked questions and support"
      icon={HelpCircle}
    />
  )
}

// Feedback View
export function FeedbackView() {
  return (
    <GenericView
      title="Feedback"
      description="Customer feedback and reviews"
      icon={MessageSquare}
    />
  )
}

// Pricing View
export function PricingView() {
  return (
    <GenericView
      title="Pricing"
      description="Pricing plans and billing"
      icon={Crown}
    />
  )
}

// E-Signatures View
export function ESignaturesView() {
  return (
    <GenericView
      title="E-Signatures"
      description="Digital signature management"
      icon={Signature}
    />
  )
}

// Project Timeline View (using existing page component)
export function ProjectTimelineView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return <ProjectTimelinePage onNavigate={onNavigate || (() => {})} />
}

// Pipeline View
export function PipelineView() {
  return (
    <GenericView
      title="Pipeline"
      description="Sales pipeline management"
      icon={GitBranch}
    />
  )
}

// Smart Schedule View
export function SmartScheduleView() {
  return (
    <GenericView
      title="Smart Schedule"
      description="Intelligent scheduling system"
      icon={Clock}
    />
  )
}

// Feather Budget View
export function FeatherBudgetView() {
  return (
    <GenericView
      title="Feather Budget"
      description="Budget planning and tracking"
      icon={DollarSign}
    />
  )
}

// Feather Tax View
export function FeatherTaxView() {
  return (
    <GenericView
      title="Feather Tax"
      description="Tax preparation and filing"
      icon={Calculator}
    />
  )
}

// Easy Calc View
export function EasyCalcView() {
  return (
    <GenericView
      title="Easy Calc"
      description="Business calculations made simple"
      icon={Calculator}
    />
  )
}

// Receipts View
export function ReceiptsView() {
  return (
    <GenericView
      title="Receipts"
      description="Receipt management and tracking"
      icon={Receipt}
    />
  )
}

// Accounting View
export function AccountingView() {
  return (
    <GenericView
      title="Accounting"
      description="Financial accounting and bookkeeping"
      icon={DollarSign}
    />
  )
}

// Quotes View
export function QuotesView() {
  return (
    <GenericView
      title="Quotes"
      description="Price quotes and estimates"
      icon={FileText}
    />
  )
}

// Car Rental View
export function CarRentalView() {
  return (
    <GenericView
      title="Car Rental"
      description="Vehicle rental management"
      icon={Car}
    />
  )
}

// Mat Track View
export function MatTrackView() {
  return (
    <GenericView
      title="Mat Track"
      description="Material tracking system"
      icon={Package}
    />
  )
}

// Crew Control View
export function CrewControlView() {
  return (
    <GenericView
      title="Crew Control"
      description="Team management and coordination"
      icon={Users}
    />
  )
}

// Earn Sync View
export function EarnSyncView() {
  return (
    <GenericView
      title="Earn Sync"
      description="Earnings synchronization"
      icon={TrendingUp}
    />
  )
}

// After Care View
export function AfterCareView() {
  return (
    <GenericView
      title="After Care"
      description="Customer support and maintenance"
      icon={Headphones}
    />
  )
}

// Feather Forms View
export function FeatherFormsView() {
  return (
    <GenericView
      title="Feather Forms"
      description="Custom form builder"
      icon={Clipboard}
    />
  )
}

// Sales Orders View
export function SalesOrdersView() {
  return (
    <GenericView
      title="Sales Orders"
      description="Sales order management"
      icon={ShoppingCart}
    />
  )
}

// Business Proposals View
export function BusinessProposalsView() {
  return (
    <GenericView
      title="Business Proposals"
      description="Create and manage business proposals"
      icon={FileText}
    />
  )
}

// Bids View
export function BidsView() {
  return (
    <GenericView
      title="Bids"
      description="Bidding and procurement management"
      icon={Target}
    />
  )
}

// Todo List View
export function TodoListView() {
  return (
    <GenericView
      title="Todo List"
      description="Task management and tracking"
      icon={Target}
    />
  )
}

// Notes View
export function NotesView() {
  return (
    <GenericView
      title="Notes"
      description="Personal and business notes"
      icon={StickyNote}
    />
  )
}

// Tours View (using existing page component)
export function ToursView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return <ToursPage onNavigate={onNavigate || (() => {})} />
}

// Finance View (using existing page component)
export function FinanceView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return <FinancePage onNavigate={onNavigate || (() => {})} />
}

// Growth View (using existing page component)
export function GrowthView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return <GrowthPage onNavigate={onNavigate || (() => {})} />
}

// Automations View
export function AutomationsView() {
  return (
    <GenericView
      title="Automations"
      description="Workflow automation and AI tools"
      icon={Bot}
    />
  )
}
