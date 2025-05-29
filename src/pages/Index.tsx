
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { StatsCard } from "@/components/StatsCard"
import { RecentActivity } from "@/components/RecentActivity"
import { QuickActions } from "@/components/QuickActions"
import { ProjectsOverview } from "@/components/ProjectsOverview"
import { 
  BarChart3, 
  Users, 
  CheckSquare, 
  DollarSign,
  MessageSquare,
  Mail
} from "lucide-react"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
              </div>
            </div>
          </div>

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
              title="Completed Tasks"
              value="156"
              change="+23% completion rate"
              changeType="positive"
              icon={CheckSquare}
            />
            <StatsCard
              title="Revenue"
              value="$24,500"
              change="+8% from last month"
              changeType="positive"
              icon={DollarSign}
            />
          </div>

          {/* Communication Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RecentActivity />
              <ProjectsOverview />
            </div>
            <div className="space-y-6">
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
