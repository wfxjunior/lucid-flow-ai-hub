
import React from 'react'
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { BusinessDashboard } from "@/components/BusinessDashboard"

interface DashboardContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function DashboardContent({ activeView, onNavigate }: DashboardContentProps) {
  console.log('DashboardContent: Active view is', activeView)

  const renderPlaceholderView = (title: string, description: string) => (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-slate-900 mb-4">{title}</h1>
      <p className="text-slate-600">{description}</p>
    </div>
  )

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
      case 'dashboard':
        return <ImprovedDashboard onNavigate={onNavigate} />
      case 'analytics':
        return <AnalyticsDashboard />
      case 'business':
        return <BusinessDashboard onNavigate={onNavigate} />
      
      // Main Features
      case 'ai-voice':
        return renderPlaceholderView('AI Voice Assistant', 'Voice commands and AI assistance coming soon...')
      case 'aftercare':
        return renderPlaceholderView('AfterCare', 'Client feedback and relationship management coming soon...')
      case 'smart-schedule':
        return renderPlaceholderView('Smart Schedule', 'AI-powered intelligent scheduling coming soon...')
      
      // Core Business Tools
      case 'customer-management':
        return renderPlaceholderView('Customer Management', 'Comprehensive customer relationship management coming soon...')
      case 'projects':
        return renderPlaceholderView('Projects', 'Project management and tracking coming soon...')
      case 'project-timeline':
        return renderPlaceholderView('Project Timeline', 'Visual project timeline and milestones coming soon...')
      case 'pipeline':
        return renderPlaceholderView('Sales Pipeline', 'Sales pipeline management and tracking coming soon...')
      case 'work-orders':
        return renderPlaceholderView('Work Orders', 'Work order creation and management coming soon...')
      case 'invoices':
        return renderPlaceholderView('Invoices', 'Invoice creation and management coming soon...')
      case 'appointments':
        return renderPlaceholderView('Appointments', 'Appointment scheduling and management coming soon...')
      case 'payments':
        return renderPlaceholderView('Payments', 'Payment processing and tracking coming soon...')
      case 'e-signatures':
        return renderPlaceholderView('E-Signatures', 'Electronic signature management coming soon...')
      
      // Financial Tools
      case 'feather-budget':
        return renderPlaceholderView('FeatherBudget AI', 'AI-powered budgeting and financial planning coming soon...')
      case 'feather-tax':
        return renderPlaceholderView('FeatherTax', 'Tax preparation and management coming soon...')
      case 'easy-calc':
        return renderPlaceholderView('EasyCalc', 'Business calculator and estimations coming soon...')
      case 'accounting':
        return renderPlaceholderView('Accounting', 'Complete accounting management coming soon...')
      case 'quotes':
        return renderPlaceholderView('Quotes', 'Quote generation and management coming soon...')
      case 'estimates':
        return renderPlaceholderView('Estimates', 'Project estimation and pricing coming soon...')
      case 'receipts':
        return renderPlaceholderView('Receipts', 'Receipt tracking and management coming soon...')
      case 'earnsync':
        return renderPlaceholderView('EarnSync', 'Earnings synchronization and tracking coming soon...')
      
      // Operations Tools
      case 'car-rental':
        return renderPlaceholderView('Car Rental', 'Vehicle rental management coming soon...')
      case 'mat-track':
        return renderPlaceholderView('MatTrack', 'Material tracking and inventory coming soon...')
      case 'crew-control':
        return renderPlaceholderView('CrewControl', 'Team and crew management coming soon...')
      case 'feather-forms':
        return renderPlaceholderView('FeatherForms', 'Custom form builder and management coming soon...')
      case 'sales-orders':
        return renderPlaceholderView('Sales Orders', 'Sales order processing and tracking coming soon...')
      case 'business-proposals':
        return renderPlaceholderView('Business Proposals', 'Professional proposal creation coming soon...')
      case 'bids':
        return renderPlaceholderView('Bids', 'Bid management and tracking coming soon...')
      case 'contracts':
        return renderPlaceholderView('Contracts', 'Contract creation and management coming soon...')
      
      // Productivity Tools
      case 'meetings':
        return renderPlaceholderView('Meetings', 'Meeting scheduling and management coming soon...')
      case 'todo-list':
        return renderPlaceholderView('To-Do List', 'Task management and productivity tracking coming soon...')
      case 'notes':
        return renderPlaceholderView('Notes', 'Note-taking and organization coming soon...')
      
      // Legacy views
      case 'customers':
        return renderPlaceholderView('Customers', 'Customer management coming soon...')
      case 'settings':
        return renderPlaceholderView('Settings', 'Application settings and preferences coming soon...')
      
      default:
        return <ImprovedDashboard onNavigate={onNavigate} />
    }
  }

  return (
    <div className="w-full h-full bg-white">
      {renderContent()}
    </div>
  )
}
