
import React from 'react'
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { BusinessDashboard } from "@/components/BusinessDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function DashboardContent({ activeView, onNavigate }: DashboardContentProps) {
  console.log('DashboardContent: Active view is', activeView)

  const renderPlaceholderView = (title: string, description: string, features?: string[]) => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">Coming Soon</Badge>
        </div>
        <p className="text-lg text-slate-600">{description}</p>
      </div>

      {/* Content Card */}
      <Card className="bg-white border border-slate-200 rounded-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-slate-900">Feature Overview</CardTitle>
          <CardDescription className="text-slate-600">
            This powerful feature is currently under development and will be available soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {features && features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">What to expect:</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-4">
              Want to be notified when this feature launches? We'll keep you updated on our progress.
            </p>
            <Button onClick={() => onNavigate('dashboard')} className="bg-blue-600 hover:bg-blue-700">
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
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
        return renderPlaceholderView(
          'AI Voice Assistant', 
          'Transform your business communications with intelligent voice commands and AI-powered assistance.',
          [
            'Voice-to-text transcription for quick note-taking',
            'AI-powered customer call analysis',
            'Automated appointment scheduling via voice',
            'Smart reminders and task management',
            'Multi-language voice support'
          ]
        )
      case 'aftercare':
        return renderPlaceholderView(
          'AfterCare', 
          'Build lasting relationships with comprehensive client feedback and follow-up management.',
          [
            'Automated follow-up email sequences',
            'Customer satisfaction surveys',
            'Feedback tracking and analytics',
            'Client relationship scoring',
            'Retention management tools'
          ]
        )
      case 'smart-schedule':
        return renderPlaceholderView(
          'Smart Schedule', 
          'AI-powered intelligent scheduling that adapts to your business needs and client preferences.',
          [
            'AI-optimized appointment scheduling',
            'Conflict detection and resolution',
            'Customer preference learning',
            'Resource allocation optimization',
            'Integration with existing calendars'
          ]
        )
      
      // Core Business Tools
      case 'customer-management':
        return renderPlaceholderView(
          'Customer Management', 
          'Comprehensive customer relationship management system to track, nurture, and grow your client base.',
          [
            'Complete customer profiles and history',
            'Communication tracking and logs',
            'Sales pipeline management',
            'Customer segmentation and tagging',
            'Integration with invoicing and projects'
          ]
        )
      case 'projects':
        return renderPlaceholderView(
          'Project Management', 
          'Organize, track, and deliver projects on time with comprehensive project management tools.',
          [
            'Project planning and milestone tracking',
            'Team collaboration and task assignment',
            'Time tracking and productivity metrics',
            'Budget management and cost tracking',
            'Client communication and updates'
          ]
        )
      case 'project-timeline':
        return renderPlaceholderView(
          'Project Timeline', 
          'Visual project timeline management with interactive Gantt charts and milestone tracking.',
          [
            'Interactive Gantt chart visualization',
            'Dependency management between tasks',
            'Resource allocation and scheduling',
            'Progress tracking and reporting',
            'Team collaboration on timelines'
          ]
        )
      case 'pipeline':
        return renderPlaceholderView(
          'Sales Pipeline', 
          'Track and manage your sales opportunities from lead to close with powerful pipeline tools.',
          [
            'Visual pipeline with drag-and-drop stages',
            'Lead scoring and qualification',
            'Automated follow-up reminders',
            'Conversion rate analytics',
            'Integration with CRM and invoicing'
          ]
        )
      case 'work-orders':
        return renderPlaceholderView(
          'Work Orders', 
          'Create, manage, and track work orders from initial request to completion.',
          [
            'Digital work order creation and management',
            'Mobile access for field teams',
            'Photo documentation and notes',
            'Status tracking and updates',
            'Integration with scheduling and invoicing'
          ]
        )
      case 'invoices':
        return renderPlaceholderView(
          'Invoice Management', 
          'Professional invoice creation, tracking, and payment management system.',
          [
            'Professional invoice templates',
            'Automated recurring invoices',
            'Payment tracking and reminders',
            'Multi-currency support',
            'Integration with accounting systems'
          ]
        )
      case 'appointments':
        return renderPlaceholderView(
          'Appointment Scheduling', 
          'Streamlined appointment booking and management with calendar integration.',
          [
            'Online booking system for clients',
            'Calendar synchronization',
            'Automated reminders and confirmations',
            'Reschedule and cancellation management',
            'Staff scheduling and availability'
          ]
        )
      case 'payments':
        return renderPlaceholderView(
          'Payment Processing', 
          'Secure payment processing and tracking for all your business transactions.',
          [
            'Multiple payment method support',
            'Secure payment processing',
            'Payment tracking and reporting',
            'Automated payment reminders',
            'Integration with banking systems'
          ]
        )
      case 'e-signatures':
        return renderPlaceholderView(
          'Electronic Signatures', 
          'Streamline document signing with secure, legally-binding electronic signatures.',
          [
            'Legally binding electronic signatures',
            'Document template management',
            'Signature tracking and notifications',
            'Multi-party signing workflows',
            'Audit trail and compliance'
          ]
        )
      
      // Financial Tools
      case 'feather-budget':
        return renderPlaceholderView(
          'FeatherBudget AI', 
          'AI-powered budgeting and financial planning tool to optimize your business finances.',
          [
            'AI-driven budget recommendations',
            'Expense categorization and tracking',
            'Cash flow forecasting',
            'Financial goal setting and tracking',
            'Integration with accounting systems'
          ]
        )
      case 'feather-tax':
        return renderPlaceholderView(
          'FeatherTax', 
          'Comprehensive tax preparation and management system for small businesses.',
          [
            'Automated tax calculation and filing',
            'Expense categorization for deductions',
            'Tax deadline reminders',
            'Multi-state tax support',
            'Integration with accounting records'
          ]
        )
      case 'easy-calc':
        return renderPlaceholderView(
          'EasyCalc', 
          'Business calculator and estimation tools for quick project pricing and calculations.',
          [
            'Project cost estimation tools',
            'Material and labor calculators',
            'Profit margin analysis',
            'Custom calculation templates',
            'Integration with quotes and estimates'
          ]
        )
      case 'accounting':
        return renderPlaceholderView(
          'Accounting Management', 
          'Complete accounting system to manage your business finances and generate reports.',
          [
            'General ledger and chart of accounts',
            'Accounts payable and receivable',
            'Financial reporting and analytics',
            'Bank reconciliation tools',
            'Tax preparation integration'
          ]
        )
      case 'quotes':
        return renderPlaceholderView(
          'Quote Management', 
          'Professional quote generation and tracking system to win more business.',
          [
            'Professional quote templates',
            'Product and service catalogs',
            'Quote tracking and follow-up',
            'Conversion to invoices',
            'Competitive analysis tools'
          ]
        )
      case 'estimates':
        return renderPlaceholderView(
          'Project Estimation', 
          'Accurate project estimation tools to improve profitability and client satisfaction.',
          [
            'Detailed project cost breakdown',
            'Historical data for accuracy',
            'Multiple estimate versions',
            'Client approval workflows',
            'Integration with project management'
          ]
        )
      case 'receipts':
        return renderPlaceholderView(
          'Receipt Management', 
          'Digital receipt tracking and organization for expense management and taxes.',
          [
            'Digital receipt capture and storage',
            'OCR text extraction from receipts',
            'Expense categorization and tagging',
            'Tax deduction preparation',
            'Integration with accounting systems'
          ]
        )
      case 'earnsync':
        return renderPlaceholderView(
          'EarnSync', 
          'Earnings synchronization and tracking across multiple revenue streams.',
          [
            'Multi-source income tracking',
            'Real-time earnings synchronization',
            'Revenue stream analysis',
            'Performance benchmarking',
            'Integration with payment platforms'
          ]
        )
      
      // Operations Tools
      case 'car-rental':
        return renderPlaceholderView(
          'Vehicle Rental Management', 
          'Complete vehicle rental management system for businesses with fleet operations.',
          [
            'Vehicle inventory and availability',
            'Rental booking and scheduling',
            'Maintenance tracking and alerts',
            'Driver verification and records',
            'Insurance and compliance management'
          ]
        )
      case 'mat-track':
        return renderPlaceholderView(
          'Material Tracking', 
          'Comprehensive material and inventory tracking system for construction and service businesses.',
          [
            'Real-time inventory tracking',
            'Material usage and waste analysis',
            'Supplier management and ordering',
            'Job site material allocation',
            'Cost tracking and reporting'
          ]
        )
      case 'crew-control':
        return renderPlaceholderView(
          'Crew Management', 
          'Team and crew management system for field service and construction businesses.',
          [
            'Crew scheduling and dispatch',
            'Time tracking and payroll integration',
            'Skill-based crew assignment',
            'Performance tracking and analytics',
            'Mobile access for field teams'
          ]
        )
      case 'feather-forms':
        return renderPlaceholderView(
          'FeatherForms', 
          'Custom form builder and management system for data collection and workflows.',
          [
            'Drag-and-drop form builder',
            'Conditional logic and branching',
            'Data collection and analytics',
            'Integration with existing systems',
            'Mobile-responsive form design'
          ]
        )
      case 'sales-orders':
        return renderPlaceholderView(
          'Sales Order Management', 
          'Complete sales order processing and fulfillment tracking system.',
          [
            'Order creation and management',
            'Inventory allocation and tracking',
            'Fulfillment workflow automation',
            'Customer communication and updates',
            'Integration with accounting and shipping'
          ]
        )
      case 'business-proposals':
        return renderPlaceholderView(
          'Business Proposals', 
          'Professional proposal creation and management system to win more business.',
          [
            'Professional proposal templates',
            'Collaborative proposal editing',
            'Client interaction tracking',
            'Proposal analytics and insights',
            'Integration with CRM and contracts'
          ]
        )
      case 'bids':
        return renderPlaceholderView(
          'Bid Management', 
          'Comprehensive bid tracking and management system for competitive projects.',
          [
            'Bid opportunity tracking',
            'Proposal preparation and submission',
            'Competitive analysis tools',
            'Win/loss analysis and reporting',
            'Integration with project management'
          ]
        )
      case 'contracts':
        return renderPlaceholderView(
          'Contract Management', 
          'Complete contract lifecycle management from creation to renewal.',
          [
            'Contract template library',
            'Approval workflow automation',
            'Renewal and expiration tracking',
            'Contract analytics and reporting',
            'Integration with e-signature tools'
          ]
        )
      
      // Productivity Tools
      case 'meetings':
        return renderPlaceholderView(
          'Meeting Management', 
          'Comprehensive meeting scheduling, management, and follow-up system.',
          [
            'Meeting scheduling and invitations',
            'Agenda creation and sharing',
            'Meeting notes and action items',
            'Recording and transcription',
            'Follow-up task assignment'
          ]
        )
      case 'todo-list':
        return renderPlaceholderView(
          'Task Management', 
          'Advanced task management and productivity tracking system.',
          [
            'Task creation and organization',
            'Priority and deadline management',
            'Team collaboration and assignment',
            'Progress tracking and reporting',
            'Integration with calendar and projects'
          ]
        )
      case 'notes':
        return renderPlaceholderView(
          'Note Management', 
          'Comprehensive note-taking and organization system for business documentation.',
          [
            'Rich text note creation and editing',
            'Note organization and tagging',
            'Search and discovery tools',
            'Collaboration and sharing',
            'Integration with projects and clients'
          ]
        )
      
      // Legacy views
      case 'customers':
        return renderPlaceholderView(
          'Customer Management', 
          'Manage your customer relationships with comprehensive CRM tools.',
          [
            'Customer profile management',
            'Communication history tracking',
            'Sales opportunity management',
            'Customer analytics and insights'
          ]
        )
      case 'settings':
        return renderPlaceholderView(
          'Settings', 
          'Configure your application preferences and business settings.',
          [
            'User profile and preferences',
            'Business information and branding',
            'Integration and API settings',
            'Security and privacy controls'
          ]
        )
      
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
