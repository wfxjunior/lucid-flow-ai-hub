
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { FileText, Copy, Edit, Plus, Calendar } from "lucide-react"

export function StripeESignatureTemplatesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "all", label: "All templates", count: 8 },
    { id: "contracts", label: "Contracts", count: 4 },
    { id: "proposals", label: "Proposals", count: 2 },
    { id: "forms", label: "Forms", count: 2 }
  ]

  const filters = [
    { id: "category", label: "Category", active: activeFilters.includes("category") },
    { id: "usage", label: "Usage frequency", active: activeFilters.includes("usage") },
    { id: "created", label: "Date created", active: activeFilters.includes("created") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const templates = [
    {
      name: "Standard Service Agreement",
      category: "Contracts",
      description: "General service contract template for residential projects",
      usage: 24,
      lastModified: "Mar 15, 2024",
      created: "Jan 10, 2024"
    },
    {
      name: "Project Proposal Template",
      category: "Proposals", 
      description: "Comprehensive proposal template with scope and pricing",
      usage: 18,
      lastModified: "Mar 12, 2024",
      created: "Feb 5, 2024"
    },
    {
      name: "Change Order Form",
      category: "Forms",
      description: "Template for project scope changes and modifications",
      usage: 12,
      lastModified: "Mar 10, 2024",
      created: "Jan 20, 2024"
    },
    {
      name: "Commercial Contract Template",
      category: "Contracts",
      description: "Template for larger commercial renovation projects", 
      usage: 8,
      lastModified: "Mar 8, 2024",
      created: "Feb 15, 2024"
    },
    {
      name: "Completion Certificate",
      category: "Forms",
      description: "Final project completion and inspection form",
      usage: 15,
      lastModified: "Mar 5, 2024",
      created: "Jan 5, 2024"
    }
  ]

  const getCategoryBadge = (category: string) => {
    const categoryClasses = {
      "Contracts": "stripe-badge success",
      "Proposals": "stripe-badge warning",
      "Forms": "stripe-badge neutral"
    }
    return categoryClasses[category as keyof typeof categoryClasses] || "stripe-badge neutral"
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Import template</button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Create template
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search templates..."
          showAddButton={true}
          addButtonLabel="Create template"
        />
        
        <StripePageLayout
          title="Document Templates"
          description="Create and manage reusable document templates"
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
                  <th>Template Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Usage Count</th>
                  <th>Last Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{template.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={getCategoryBadge(template.category)}>
                        {template.category}
                      </span>
                    </td>
                    <td className="text-muted-foreground text-sm">{template.description}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Copy className="w-3 h-3 text-muted-foreground" />
                        {template.usage} times
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {template.lastModified}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-muted rounded">
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded">
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {templates.length} result{templates.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
