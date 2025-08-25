
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
    <div className="space-y-6 p-6" data-theme="stripe-dashboard">
      {/* Header */}
      <div className="stripe-page-header">
        <div className="stripe-page-title">
          <div>
            <h1>MatTrack</h1>
            <p className="stripe-page-description">Intelligent Material Management System</p>
          </div>
          <button 
            onClick={() => setShowMaterialForm(true)}
            className="stripe-button-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Material
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stripe-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Materials</p>
              <p className="text-2xl font-semibold">{statsData.totalMaterials}</p>
            </div>
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>

        <div className="stripe-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Low Stock Alerts</p>
              <p className="text-2xl font-semibold">{statsData.lowStockItems}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>

        <div className="stripe-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Allocated Today</p>
              <p className="text-2xl font-semibold">{statsData.allocatedToday}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>

        <div className="stripe-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Value</p>
              <p className="text-2xl font-semibold">${statsData.totalValue.toLocaleString()}</p>
            </div>
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            placeholder="Search materials by name, SKU, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="stripe-search"
          />
        </div>
        <button className="stripe-button-secondary">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Main Content Tabs */}
      <div className="stripe-tabs">
        <div className="stripe-tabs-list">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'materials', label: 'Materials' },
            { id: 'alerts', label: 'Alerts' },
            { id: 'allocation', label: 'Allocation' },
            { id: 'insights', label: 'Insights' }
          ].map((tab) => (
            <button
              key={tab.id}
              className="stripe-tab-trigger"
              data-state={activeTab === tab.id ? "active" : "inactive"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LowStockAlerts />
              <MaterialInsights />
            </div>
            <MaterialList searchQuery={searchQuery} limit={10} />
          </div>
        )}

        {activeTab === 'materials' && <MaterialList searchQuery={searchQuery} />}
        {activeTab === 'alerts' && <LowStockAlerts expanded />}
        {activeTab === 'allocation' && <WorkAllocation />}
        {activeTab === 'insights' && <MaterialInsights expanded />}
      </div>

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
