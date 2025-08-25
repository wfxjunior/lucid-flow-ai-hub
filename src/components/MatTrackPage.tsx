
import { useState } from "react"
import { StripeHeader } from "./stripe-layout/StripeHeader"
import { StripePageLayout } from "./stripe-layout/StripePageLayout"
import { StripeTabs } from "./stripe-layout/StripeTabs"
import { StripeFilters } from "./stripe-layout/StripeFilters"
import { Package, Truck, MapPin, Clock, Plus, Download } from "lucide-react"

export function MatTrackPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "tracking", label: "Tracking", count: 15 },
    { id: "reports", label: "Reports" },
    { id: "inventory", label: "Inventory", count: 247 }
  ]

  const filters = [
    { id: "status", label: "Status", active: activeFilters.includes("status") },
    { id: "location", label: "Location", active: activeFilters.includes("location") },
    { id: "material-type", label: "Material type", active: activeFilters.includes("material-type") },
    { id: "date", label: "Date range", active: activeFilters.includes("date") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const materials = [
    {
      id: "MAT-001",
      name: "Concrete Mix Type A",
      location: "Warehouse A - Bay 3",
      quantity: "45 tons",
      status: "Available",
      lastUpdated: "2 hours ago"
    },
    {
      id: "MAT-002", 
      name: "Steel Rebar Bundle",
      location: "Site 12 - Section B",
      quantity: "120 pieces",
      status: "In Transit",
      lastUpdated: "4 hours ago"
    },
    {
      id: "MAT-003",
      name: "Timber Planks 2x4",
      location: "Warehouse B - Section 5",
      quantity: "200 pieces",
      status: "Available",
      lastUpdated: "1 day ago"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Available": "success",
      "In Transit": "warning",
      "Low Stock": "error",
      "Out of Stock": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Download className="w-4 h-4" />
        Export
      </button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Add Material
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search materials..."
          showAddButton={true}
          addButtonLabel="Add Material"
        />
        
        <StripePageLayout
          title="MatTrack"
          description="Track and manage construction materials and inventory"
          actions={actions}
        >
          <StripeTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <StripeFilters 
            filters={filters}
            onFilterClick={handleFilterClick}
          />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stripe-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Materials</h3>
                <Package className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-semibold">247</div>
              <p className="text-sm text-muted-foreground mt-1">+12 this week</p>
            </div>

            <div className="stripe-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">In Transit</h3>
                <Truck className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-semibold">15</div>
              <p className="text-sm text-muted-foreground mt-1">Active shipments</p>
            </div>

            <div className="stripe-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Low Stock Items</h3>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-semibold">8</div>
              <p className="text-sm text-muted-foreground mt-1">Need reordering</p>
            </div>

            <div className="stripe-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Active Locations</h3>
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-semibold">12</div>
              <p className="text-sm text-muted-foreground mt-1">Storage sites</p>
            </div>
          </div>

          <div className="stripe-card p-0">
            <table className="stripe-table">
              <thead>
                <tr>
                  <th>Material ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id}>
                    <td className="font-mono text-sm">{material.id}</td>
                    <td className="font-medium">{material.name}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {material.location}
                      </div>
                    </td>
                    <td>{material.quantity}</td>
                    <td>
                      <span className={getStatusBadge(material.status)}>
                        {material.status}
                      </span>
                    </td>
                    <td className="text-muted-foreground">{material.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {materials.length} result{materials.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
