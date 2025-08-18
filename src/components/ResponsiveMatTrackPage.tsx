
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Package, Plus, TrendingDown, Users, BarChart3, AlertTriangle, ArrowLeft, Boxes } from "lucide-react"
import { MaterialList } from "./mat-track/MaterialList"
import { LowStockAlerts } from "./mat-track/LowStockAlerts"
import { WorkAllocation } from "./mat-track/WorkAllocation"
import { MaterialInsights } from "./mat-track/MaterialInsights"
import { MaterialForm } from "./mat-track/MaterialForm"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"

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
      subtitle: "Inventory items",
      icon: Boxes
    },
    {
      title: "Low Stock Items",
      value: "12",
      subtitle: "Need restocking",
      icon: TrendingDown
    },
    {
      title: "Active Projects",
      value: "8",
      subtitle: "Current assignments",
      icon: Users
    },
    {
      title: "Total Value",
      value: "$24,890",
      subtitle: "Inventory worth",
      icon: BarChart3
    }
  ]

  return (
    <CleanPageLayout
      title="MatTrack"
      subtitle="Material tracking and inventory management"
      actionLabel="Add Material"
      onActionClick={() => setShowMaterialForm(true)}
      metrics={stats}
    >

      {/* Back Button */}
      {onNavigate && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Button>
      )}

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
              <Boxes className="h-4 w-4 mr-1 sm:mr-2" />
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
    </CleanPageLayout>
  )
}
