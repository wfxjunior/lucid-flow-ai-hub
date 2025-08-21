
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from '@/contexts/LanguageContext'

export function DashboardView() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboardHeader.title', 'Dashboard')}</h1>
        <p className="text-muted-foreground">{t('dashboardHeader.welcome', 'Overview of your business performance')}</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.monthlyRevenue', 'Monthly Revenue')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,234</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.activeCustomers', 'Active Customers')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.pendingInvoices', 'Pending Invoices')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-4 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.monthlyGoals', 'Monthly Goals')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivities', 'Recent Activities')}</CardTitle>
            <CardDescription>Latest updates from your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {t('dashboard.noActivities', 'No recent activities')}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.upcomingTasks', 'Upcoming Tasks')}</CardTitle>
            <CardDescription>Your next priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {t('dashboard.noTasks', 'No upcoming tasks')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
