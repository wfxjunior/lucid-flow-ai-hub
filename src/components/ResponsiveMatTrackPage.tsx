
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Package, Plus, TrendingDown, Users, BarChart3, AlertTriangle, ArrowLeft } from "lucide-react"
import { MaterialList } from "./mat-track/MaterialList"
import { LowStockAlerts } from "./mat-track/LowStockAlerts"
import { WorkAllocation } from "./mat-track/WorkAllocation"
import { MaterialInsights } from "./mat-track/MaterialInsights"
import { MaterialForm } from "./mat-track/MaterialForm"

interface ResponsiveMatTrackPageProps {
  onNavigate?: (view: string) => void
}

export function ResponsiveMatTrackPage({ onNavigate }: ResponsiveMatTrackPageProps) {
  const [activeTab, setActiveTab] = useState('materials')
  const [showMaterialForm, setShowMaterialForm] = useState(false)

  const stats = [
    {
      title: "Total Materials",
      value: "156",
      icon: Package,
      color: "text-blue-500"
    },
    {
      title: "Low Stock Items",
      value: "12",
      icon: TrendingDown,
      color: "text-red-500"
    },
    {
      title: "Active Projects",
      value: "8",
      icon: Users,
      color: "text-green-500"
    },
    {
      title: "Total Value",
      value: "$24,890",
      icon: BarChart3,
      color: "text-purple-500"
    }
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {onNavigate && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            )}
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">MatTrack</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Material tracking and inventory management</p>
            </div>
          </div>
          <Button 
            className="w-full sm:w-auto"
            onClick={() => setShowMaterialForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Material</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                      {stat.title}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Low Stock Alert */}
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/10 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  12 materials are running low on stock
                </p>
                <p className="text-xs text-red-600 dark:text-red-300">
                  Consider restocking soon to avoid project delays
                </p>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:block">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-4 min-w-[400px]">
              <TabsTrigger value="materials" className="text-xs sm:text-sm">
                <Package className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Materials</span>
                <span className="sm:hidden">Items</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="text-xs sm:text-sm">
                <AlertTriangle className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Low Stock</span>
                <span className="sm:hidden">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="allocation" className="text-xs sm:text-sm">
                <Users className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Allocation</span>
                <span className="sm:hidden">Assign</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs sm:text-sm">
                <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Insights</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="materials">
            <MaterialList />
          </TabsContent>

          <TabsContent value="alerts">
            <LowStockAlerts />
          </TabsContent>

          <TabsContent value="allocation">
            <WorkAllocation />
          </TabsContent>

          <TabsContent value="insights">
            <MaterialInsights />
          </TabsContent>
        </Tabs>

        {/* Material Form Modal */}
        <MaterialForm 
          isOpen={showMaterialForm}
          onClose={() => setShowMaterialForm(false)}
        />
      </div>
    </div>
  )
}
