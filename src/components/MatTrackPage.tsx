
import React, { useState } from 'react'
import { Plus, Search, Filter, AlertTriangle, TrendingDown, Package, MapPin, Calendar, Eye, Edit3, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaterialForm } from './mat-track/MaterialForm'
import { MaterialList } from './mat-track/MaterialList'
import { MaterialInsights } from './mat-track/MaterialInsights'
import { LowStockAlerts } from './mat-track/LowStockAlerts'
import { WorkAllocation } from './mat-track/WorkAllocation'

export function MatTrackPage() {
  const [showMaterialForm, setShowMaterialForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for demonstration
  const statsData = {
    totalMaterials: 156,
    lowStockItems: 8,
    allocatedToday: 12,
    totalValue: 45600
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">MatTrack</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Intelligent Material Management System</p>
        </div>
        <Button 
          onClick={() => setShowMaterialForm(true)}
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto shrink-0"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Material
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-blue-600 text-xs sm:text-sm font-medium truncate">Total Materials</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-900">{statsData.totalMaterials}</p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-red-600 text-xs sm:text-sm font-medium truncate">Low Stock Alerts</p>
                <p className="text-xl sm:text-2xl font-bold text-red-900">{statsData.lowStockItems}</p>
              </div>
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-green-600 text-xs sm:text-sm font-medium truncate">Allocated Today</p>
                <p className="text-xl sm:text-2xl font-bold text-green-900">{statsData.allocatedToday}</p>
              </div>
              <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-purple-600 text-xs sm:text-sm font-medium truncate">Total Value</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-900">${statsData.totalValue.toLocaleString()}</p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search materials by name, SKU, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto shrink-0">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-5 min-w-[500px] sm:min-w-0">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="materials" className="text-xs sm:text-sm">Materials</TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs sm:text-sm">Alerts</TabsTrigger>
            <TabsTrigger value="allocation" className="text-xs sm:text-sm">Allocation</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs sm:text-sm">Insights</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <LowStockAlerts />
            <MaterialInsights />
          </div>
          <MaterialList searchQuery={searchQuery} limit={10} />
        </TabsContent>

        <TabsContent value="materials">
          <MaterialList searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="alerts">
          <LowStockAlerts expanded />
        </TabsContent>

        <TabsContent value="allocation">
          <WorkAllocation />
        </TabsContent>

        <TabsContent value="insights">
          <MaterialInsights expanded />
        </TabsContent>
      </Tabs>

      {/* Material Form Modal */}
      {showMaterialForm && (
        <MaterialForm 
          isOpen={showMaterialForm}
          onClose={() => setShowMaterialForm(false)}
        />
      )}
    </div>
  )
}
