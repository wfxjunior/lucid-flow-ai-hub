
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserGreeting } from "@/components/UserGreeting"
import { QuickActions } from "@/components/QuickActions"
import { RecentActivity } from "@/components/RecentActivity"
import { Analytics } from "@/components/Analytics"
import { PricingPlans } from "@/components/PricingPlans"
import { StatsCard } from "@/components/StatsCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign, FileText, Users, Calendar, TrendingUp, ArrowRight, Feather, Crown, Star } from "lucide-react"
import { useSubscription } from "@/hooks/useSubscription"
import { HelpCenter } from "@/components/HelpCenter"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageSelector } from "@/components/LanguageSelector"

type ViewType = 'dashboard' | 'customers' | 'invoices' | 'estimates' | 'analytics' | 'settings' | 'pricing'

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard')
  const navigate = useNavigate()
  const { subscription, loading, isSubscribed, planName } = useSubscription()

  const handleNavigation = (view: ViewType) => {
    if (view === 'pricing') {
      setCurrentView('pricing')
    } else {
      navigate('/app')
    }
  }

  const handleActionClick = (actionId: string) => {
    // Map action IDs to appropriate navigation
    switch (actionId) {
      case 'create-invoice':
      case 'manage-customers':
      case 'create-estimate':
      case 'view-analytics':
        navigate('/app')
        break
      case 'upgrade':
        setCurrentView('pricing')
        break
      default:
        navigate('/app')
    }
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'analytics':
        return <Analytics />
      case 'pricing':
        return <PricingPlans />
      default:
        return (
          <div className="space-y-6 sm:space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Feather className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">FeatherBiz</h1>
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Organize. Send. Grow. All-in-one business management platform designed to streamline your workflow.
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap px-4">
                <Badge variant="secondary" className="px-2 py-1 sm:px-3">
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="px-2 py-1 sm:px-3">
                  Cloud-Based
                </Badge>
                <Badge variant="secondary" className="px-2 py-1 sm:px-3">
                  Real-time Sync
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Subscription Status */}
            {!loading && (
              <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50 mx-4 sm:mx-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    {isSubscribed ? (
                      <>
                        <Crown className="h-5 w-5 text-yellow-500" />
                        Welcome to {planName}
                      </>
                    ) : (
                      <>
                        <Star className="h-5 w-5 text-blue-500" />
                        You're on the Free Plan
                      </>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {isSubscribed 
                      ? "Enjoy all premium features and priority support."
                      : "Upgrade to unlock advanced features and grow your business faster."
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <Badge variant={isSubscribed ? "default" : "secondary"}>
                        {isSubscribed ? "Premium Active" : "Free Plan"}
                      </Badge>
                      {subscription?.current_period_end && (
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          Renews: {new Date(subscription.current_period_end).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {!isSubscribed && (
                      <Button onClick={() => setCurrentView('pricing')} className="w-full sm:w-auto">
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
              <StatsCard
                title="Total Revenue"
                value="$24,500"
                change="+12% from last month"
                trend="up"
                icon={DollarSign}
                delay={0}
              />
              <StatsCard
                title="Active Clients"
                value="142"
                change="+5 new this week"
                trend="up"
                icon={Users}
                delay={100}
              />
              <StatsCard
                title="Pending Invoices"
                value="8"
                change="2 due this week"
                trend="neutral"
                icon={FileText}
                delay={200}
              />
              <StatsCard
                title="Appointments"
                value="23"
                change="Next: Tomorrow 2pm"
                trend="up"
                icon={Calendar}
                delay={300}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              {/* Quick Actions - Takes 2 columns */}
              <div className="lg:col-span-2">
                <QuickActions onActionClick={handleActionClick} />
              </div>

              {/* Recent Activity - Takes 1 column */}
              <div className="lg:col-span-1">
                <RecentActivity />
              </div>
            </div>

            {/* Get Started Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mx-4 sm:mx-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Ready to Grow Your Business?
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Access powerful tools to manage customers, create invoices, track finances, and automate your workflow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate('/app')} className="flex-1">
                    Open Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView('pricing')}
                    className="flex-1"
                  >
                    View Pricing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('dashboard')}>
              <Feather className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-blue-600">FeatherBiz</h2>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`text-sm font-medium transition-colors ${
                  currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className={`text-sm font-medium transition-colors ${
                  currentView === 'analytics' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setCurrentView('pricing')}
                className={`text-sm font-medium transition-colors ${
                  currentView === 'pricing' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Pricing
              </button>
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <LanguageSelector />
                <ThemeToggle />
                <HelpCenter variant="outline" size="sm" />
              </div>
              <UserGreeting />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderCurrentView()}
      </main>
    </div>
  )
}

export default Index
