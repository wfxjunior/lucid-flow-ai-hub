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
import { FileManager } from "@/components/FileManager"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingPlans } from "@/components/PricingPlans"
import { FAQPage } from "@/components/FAQPage"
import { PDFGenerator } from "@/components/PDFGenerator"
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
  Mic,
  FolderOpen
} from "lucide-react"
import { useState } from "react"

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard')

  const handleQuickActionClick = (actionId: string) => {
    setActiveView(actionId)
  }

  const getViewTitle = () => {
    switch(activeView) {
      case 'dashboard': return 'Dashboard'
      case 'ai-voice': return 'AI Voice Assistant'
      case 'create-invoice': return 'Create Invoice'
      case 'customers': return 'Customer Management'
      case 'analytics': return 'Analytics'
      case 'document-tracker': return 'Document Tracker'
      case 'files': return 'File Manager'
      case 'pdf-generator': return 'PDF Generator'
      case 'pricing': return 'Pricing Plans'
      case 'faq': return 'FAQ & Help Center'
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
      case 'files': return "Organize and manage your documents in folders."
      case 'pdf-generator': return "Create custom PDFs with your logo and client information."
      case 'pricing': return "Choose the perfect plan for your business needs."
      case 'faq': return "Find answers to all your questions about our AI-powered platform."
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
      case 'files':
        return <FileManager />
      case 'pdf-generator':
        return <PDFGenerator />
      case 'pricing':
        return <PricingPlans />
      case 'faq':
        return <FAQPage />
      default:
        return (
          <>
            {/* Welcome Section */}
            <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl">Welcome to FeatherBiz</CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Your AI-powered business platform for modern entrepreneurs. Streamline your workflow with intelligent automation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button onClick={() => setActiveView('ai-voice')} className="flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Mic className="h-4 w-4" />
                    Try AI Voice Assistant
                  </Button>
                  <Button onClick={() => setActiveView('create-invoice')} variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto">
                    <FileText className="h-4 w-4" />
                    Create Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
            <Card className="mb-6 sm:mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Brain className="h-5 w-5" />
                  AI-Powered Features
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Intelligent automation that learns from your business patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Predictive Workflow</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">AI suggests next actions based on your patterns</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Smart Interface</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Adapts to your work style and preferences</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Document Tracking</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Know when clients open your documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <RecentActivity />
                <ProjectsOverview />
              </div>
              <div className="space-y-6">
                <QuickActions onActionClick={handleQuickActionClick} />
                
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">Invoices This Month</span>
                      <span className="font-semibold text-sm sm:text-base">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">Pending Payments</span>
                      <span className="font-semibold text-orange-600 text-sm sm:text-base">$8,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">Document Open Rate</span>
                      <span className="font-semibold text-green-600 text-sm sm:text-base">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">AI Suggestions Used</span>
                      <span className="font-semibold text-blue-600 text-sm sm:text-base">67%</span>
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
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{getViewTitle()}</h1>
                <p className="text-muted-foreground text-sm sm:text-base">{getViewDescription()}</p>
              </div>
            </div>
            
            {/* Quick Navigation */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                variant={activeView === 'ai-voice' ? 'default' : 'outline'}
                onClick={() => setActiveView('ai-voice')}
                size="sm"
                className="w-full sm:w-auto"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
              <Button 
                variant={activeView === 'analytics' ? 'default' : 'outline'}
                onClick={() => setActiveView('analytics')}
                size="sm"
                className="w-full sm:w-auto"
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
