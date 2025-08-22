
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Target, Zap, BarChart3, Plus, ArrowUpRight } from 'lucide-react'

interface GrowthPageProps {
  onNavigate: (view: string) => void
}

export function GrowthPage({ onNavigate }: GrowthPageProps) {
  const [growthData] = useState({
    monthlyGrowth: 15.8,
    customerGrowth: 23.4,
    revenueGrowth: 18.7,
    conversionRate: 4.2,
    activeCustomers: 342,
    newCustomers: 45,
    churnRate: 2.1,
    lifetimeValue: 2850,
    initiatives: [
      { 
        id: 1, 
        name: 'Customer Referral Program', 
        status: 'Active', 
        progress: 75, 
        impact: 'High',
        description: 'Incentivize existing customers to refer new clients'
      },
      { 
        id: 2, 
        name: 'Social Media Marketing', 
        status: 'In Progress', 
        progress: 60, 
        impact: 'Medium',
        description: 'Expand presence on LinkedIn and Instagram'
      },
      { 
        id: 3, 
        name: 'Content Marketing Strategy', 
        status: 'Planning', 
        progress: 25, 
        impact: 'High',
        description: 'Create valuable content to attract potential customers'
      }
    ],
    channels: [
      { name: 'Direct Sales', customers: 150, growth: 12.3 },
      { name: 'Referrals', customers: 89, growth: 28.5 },
      { name: 'Social Media', customers: 67, growth: 35.2 },
      { name: 'Website', customers: 36, growth: 15.8 }
    ]
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Planning': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Growth</h1>
          <p className="text-muted-foreground mt-2">Track and accelerate your business growth</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate('analytics')} variant="outline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </Button>
          <Button onClick={() => onNavigate('customer-management')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{growthData.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall business growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Growth</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">+{growthData.customerGrowth}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              New customers this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">+{growthData.revenueGrowth}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Revenue increase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{growthData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lead to customer conversion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Metrics</CardTitle>
            <CardDescription>Key customer performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{growthData.activeCustomers}</div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">+{growthData.newCustomers}</div>
                <p className="text-sm text-muted-foreground">New This Month</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{growthData.churnRate}%</div>
                <p className="text-sm text-muted-foreground">Churn Rate</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">${growthData.lifetimeValue}</div>
                <p className="text-sm text-muted-foreground">Avg. LTV</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition Channels</CardTitle>
            <CardDescription>Performance by acquisition channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {growthData.channels.map((channel, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{channel.name}</p>
                    <p className="text-xs text-muted-foreground">{channel.customers} customers</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">+{channel.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Initiatives */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Initiatives</CardTitle>
          <CardDescription>Current growth strategies and their progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthData.initiatives.map((initiative) => (
              <div key={initiative.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{initiative.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{initiative.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getImpactColor(initiative.impact)}>{initiative.impact} Impact</Badge>
                    <Badge className={getStatusColor(initiative.status)}>{initiative.status}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{initiative.progress}%</span>
                  </div>
                  <Progress value={initiative.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
