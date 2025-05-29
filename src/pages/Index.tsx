import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { StatsCard } from "@/components/StatsCard"
import { RecentActivity } from "@/components/RecentActivity"
import { QuickActions } from "@/components/QuickActions"
import { ProjectsOverview } from "@/components/ProjectsOverview"
import { AIVoiceAssistant } from "@/components/AIVoiceAssistant"
import { InvoiceCreator } from "@/components/InvoiceCreator"
import { CustomerManagement } from "@/components/CustomerManagement"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { DocumentTracker } from "@/components/DocumentTracker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  Users, 
  CheckSquare, 
  DollarSign,
  MessageSquare,
  Mail,
  Brain,
  FileText,
  Calendar,
  Heart,
  Mic
} from "lucide-react"
import { useState } from "react"

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard')

  const getViewTitle = () => {
    switch(activeView) {
      case 'dashboard': return 'Dashboard'
      case 'ai-voice': return 'AI Voice Assistant'
      case 'create-invoice': return 'Create Invoice'
      case 'customers': return 'Customer Management'
      case 'analytics': return 'Analytics'
      case 'document-tracker': return 'Document Tracker'
      case 'appointments': return 'Appointments'
      case 'payments': return 'Payments'
      case 'e-signatures': return 'E-Signatures'
      case 'projects': return 'Projects'
      case 'quotes': return 'Quotes'
      case 'receipts': return 'Receipts & Accounting'
      case 'sales-orders': return 'Sales Orders'
      case 'service-orders': return 'Service Orders'
      case 'proposals': return 'Business Proposals'
      case 'bids': return 'Bids'
      case 'email': return 'Email Center'
      case 'messages': return 'Messages'
      case 'communication': return 'Communication Hub'
      case 'family-savings': return 'My Family Savings'
      case 'settings': return 'Settings'
      default: return 'Dashboard'
    }
  }

  const getViewDescription = () => {
    switch(activeView) {
      case 'dashboard': return "Welcome back! Here's what's happening in your business."
      case 'ai-voice': return "Your intelligent business assistant is ready to help."
      case 'create-invoice': return "Create professional invoices with AI assistance."
      case 'customers': return "Manage your customer relationships and communications."
      case 'analytics': return "Insights and analytics for your business performance."
      case 'document-tracker': return "Track document views and manage secret links."
      case 'appointments': return "Schedule and manage your appointments."
      case 'payments': return "Process payments and manage transactions."
      case 'e-signatures': return "Digital signature solutions for your documents."
      case 'projects': return "Track and manage your business projects."
      case 'quotes': return "Create and manage price quotes for clients."
      case 'receipts': return "Organize receipts and accounting documents."
      case 'sales-orders': return "Manage your sales orders and pipeline."
      case 'service-orders': return "Track service requests and orders."
      case 'proposals': return "Create compelling business proposals."
      case 'bids': return "Manage bids and tender responses."
      case 'email': return "Send and manage email campaigns."
      case 'messages': return "SMS and messaging center."
      case 'communication': return "Unified communication hub."
      case 'family-savings': return "Track your family savings goals."
      case 'settings': return "Configure your platform settings."
      default: return "Welcome back! Here's what's happening in your business."
    }
  }

  const renderContent = () => {
    switch(activeView) {
      case 'ai-voice':
        return <AIVoiceAssistant />
      case 'create-invoice':
        return <InvoiceCreator />
      case 'customers':
        return <CustomerManagement />
      case 'analytics':
        return <AnalyticsDashboard />
      case 'document-tracker':
        return <DocumentTracker />
      case 'appointments':
      case 'payments':
      case 'e-signatures':
      case 'projects':
      case 'quotes':
      case 'receipts':
      case 'sales-orders':
      case 'service-orders':
      case 'proposals':
      case 'bids':
      case 'email':
      case 'messages':
      case 'communication':
      case 'family-savings':
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{getViewTitle()}</CardTitle>
              <CardDescription>This feature is coming soon!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We're working hard to bring you this feature. Stay tuned for updates!
              </p>
            </CardContent>
          </Card>
        )
      default:
        return (
          <>
            {/* Welcome Section */}
            <Card className="mb-8 bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome to Hubsfy</CardTitle>
                <CardDescription className="text-lg">
                  Your AI-powered business platform for modern entrepreneurs. Streamline your workflow with intelligent automation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button onClick={() => setActiveView('ai-voice')} className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Try AI Voice Assistant
                  </Button>
                  <Button onClick={() => setActiveView('create-invoice')} variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Create Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Clients"
                value="48"
                change="+12% from last month"
                changeType="positive"
                icon={Users}
              />
              <StatsCard
                title="Active Projects"
                value="12"
                change="+3 new this week"
                changeType="positive"
                icon={BarChart3}
              />
              <StatsCard
                title="Revenue This Month"
                value="$24,500"
                change="+8% from last month"
                changeType="positive"
                icon={DollarSign}
              />
              <StatsCard
                title="Family Savings"
                value="$2,850"
                change="+5% auto-saved"
                changeType="positive"
                icon={Heart}
              />
            </div>

            {/* Communication Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatsCard
                title="Messages Sent"
                value="1,234"
                change="+15% this week"
                changeType="positive"
                icon={MessageSquare}
              />
              <StatsCard
                title="Email Campaigns"
                value="8"
                change="2 active campaigns"
                changeType="neutral"
                icon={Mail}
              />
              <StatsCard
                title="AI Tasks Completed"
                value="156"
                change="+45% automation"
                changeType="positive"
                icon={Brain}
              />
            </div>

            {/* AI Features Showcase */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Features
                </CardTitle>
                <CardDescription>
                  Intelligent automation that learns from your business patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Predictive Workflow</h4>
                    <p className="text-sm text-muted-foreground">AI suggests next actions based on your patterns</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Smart Interface</h4>
                    <p className="text-sm text-muted-foreground">Adapts to your work style and preferences</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Document Tracking</h4>
                    <p className="text-sm text-muted-foreground">Know when clients open your documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RecentActivity />
                <ProjectsOverview />
              </div>
              <div className="space-y-6">
                <QuickActions />
                
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Invoices This Month</span>
                      <span className="font-semibold">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending Payments</span>
                      <span className="font-semibold text-orange-600">$8,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Document Open Rate</span>
                      <span className="font-semibold text-green-600">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI Suggestions Used</span>
                      <span className="font-semibold text-blue-600">67%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-3xl font-bold">{getViewTitle()}</h1>
                <p className="text-muted-foreground">{getViewDescription()}</p>
              </div>
            </div>
            
            {/* Quick Navigation */}
            <div className="flex gap-2">
              <Button 
                variant={activeView === 'ai-voice' ? 'default' : 'outline'}
                onClick={() => setActiveView('ai-voice')}
                size="sm"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
              <Button 
                variant={activeView === 'analytics' ? 'default' : 'outline'}
                onClick={() => setActiveView('analytics')}
                size="sm"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>

          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
