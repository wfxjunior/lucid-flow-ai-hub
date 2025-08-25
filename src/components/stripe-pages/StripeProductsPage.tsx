
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Package, DollarSign, TrendingUp, Plus } from "lucide-react"

export function StripeProductsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "all", label: "All products", count: 15 },
    { id: "services", label: "Services", count: 8 },
    { id: "materials", label: "Materials", count: 7 },
    { id: "archived", label: "Archived", count: 3 }
  ]

  const filters = [
    { id: "category", label: "Category", active: activeFilters.includes("category") },
    { id: "price-range", label: "Price range", active: activeFilters.includes("price-range") },
    { id: "availability", label: "Availability", active: activeFilters.includes("availability") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const products = [
    {
      name: "Kitchen Renovation Service",
      category: "Services",
      price: "$15,000",
      unit: "per project",
      status: "Active",
      sales: 12
    },
    {
      name: "Bathroom Remodeling",
      category: "Services",
      price: "$8,500",
      unit: "per project", 
      status: "Active",
      sales: 8
    },
    {
      name: "Premium Hardwood Flooring",
      category: "Materials",
      price: "$12.50",
      unit: "per sq ft",
      status: "Active",
      sales: 156
    },
    {
      name: "Custom Cabinet Installation",
      category: "Services",
      price: "$3,200",
      unit: "per linear ft",
      status: "Active", 
      sales: 6
    }
  ]

  const getStatusBadge = (status: string) => {
    return status === "Active" ? "stripe-badge success" : "stripe-badge neutral"
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Import products</button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Add product
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search products..."
          showAddButton={true}
          addButtonLabel="Add product"
        />
        
        <StripePageLayout
          title="Products"
          description="Manage your services and materials catalog"
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

          <div className="stripe-card p-0">
            <table className="stripe-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th>Sales</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground">{product.category}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium">{product.price}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground">{product.unit}</td>
                    <td>
                      <span className={getStatusBadge(product.status)}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-muted-foreground" />
                        {product.sales}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {products.length} result{products.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
