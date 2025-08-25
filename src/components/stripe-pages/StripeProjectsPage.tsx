
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Briefcase, Calendar, Users, DollarSign, MoreHorizontal } from "lucide-react"

export function StripeProjectsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "active", label: "Active", count: 12 },
    { id: "completed", label: "Completed", count: 45 },
    { id: "on-hold", label: "On Hold", count: 3 },
    { id: "draft", label: "Draft", count: 8 }
  ]

  const filters = [
    { id: "status", label: "Status", active: activeFilters.includes("status") },
    { id: "client", label: "Client", active: activeFilters.includes("client") },
    { id: "date", label: "Date Range", active: activeFilters.includes("date") },
    { id: "value", label: "Project Value", active: activeFilters.includes("value") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  // Mock projects data
  const projects = [
    {
      name: "Website Redesign",
      client: "Acme Corp",
      status: "In Progress",
      startDate: "Mar 15, 2024",
      dueDate: "Apr 30, 2024",
      value: "$15,000",
      progress: 65,
      team: 4
    },
    {
      name: "Mobile App Development",
      client: "Tech Startup Inc",
      status: "Planning",
      startDate: "Apr 1, 2024",
      dueDate: "Jul 15, 2024",
      value: "$45,000",
      progress: 15,
      team: 6
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "In Progress": "success",
      "Planning": "warning",
      "Completed": "success",
      "On Hold": "neutral"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Export</button>
      <button className="stripe-button-primary">
        <Briefcase className="w-4 h-4" />
        New Project
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search projects..."
          showAddButton={true}
          addButtonLabel="New Project"
        />
        
        <StripePageLayout
          title="Projects"
          description="Manage and track all your business projects"
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
                  <th>Project Name</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Value</th>
                  <th>Progress</th>
                  <th>Team</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td className="font-medium">{project.name}</td>
                    <td className="text-muted-foreground">{project.client}</td>
                    <td>
                      <span className={getStatusBadge(project.status)}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.startDate}</td>
                    <td>{project.dueDate}</td>
                    <td className="font-medium">{project.value}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{project.team}</span>
                      </div>
                    </td>
                    <td>
                      <button className="p-1 hover:bg-muted rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {projects.length} result{projects.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
