
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { FolderOpen, Calendar, User, DollarSign, Plus, Clock } from "lucide-react"

export function StripeProjectsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "active", label: "Active", count: 12 },
    { id: "pending", label: "Pending", count: 5 },
    { id: "completed", label: "Completed", count: 48 },
    { id: "on-hold", label: "On Hold", count: 3 }
  ]

  const filters = [
    { id: "status", label: "Status", active: activeFilters.includes("status") },
    { id: "client", label: "Client", active: activeFilters.includes("client") },
    { id: "value", label: "Project value", active: activeFilters.includes("value") },
    { id: "date", label: "Start date", active: activeFilters.includes("date") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const projects = [
    {
      name: "Anderson Kitchen Renovation",
      client: "Anderson Family",
      value: "$15,250.00",
      status: "Active",
      startDate: "Mar 1, 2024",
      endDate: "May 15, 2024",
      progress: 65,
      manager: "John Smith"
    },
    {
      name: "Smith Office Remodel",
      client: "Smith Industries",
      value: "$45,800.00",
      status: "Active", 
      startDate: "Feb 15, 2024",
      endDate: "June 30, 2024",
      progress: 40,
      manager: "Sarah Johnson"
    },
    {
      name: "Johnson Bathroom Update",
      client: "Johnson Construction",
      value: "$8,750.00",
      status: "Pending",
      startDate: "Mar 20, 2024",
      endDate: "Apr 30, 2024",
      progress: 0,
      manager: "Mike Wilson"
    },
    {
      name: "Davis Property Maintenance",
      client: "Davis Enterprises",
      value: "$2,400.00",
      status: "Active",
      startDate: "Jan 1, 2024",
      endDate: "Dec 31, 2024",
      progress: 85,
      manager: "Lisa Brown"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Active": "success",
      "Pending": "warning",
      "Completed": "neutral",
      "On Hold": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Export</button>
      <button className="stripe-button-secondary">Templates</button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
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
          description="Manage and track project progress"
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
                  <th>Value</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Progress</th>
                  <th>Manager</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <FolderOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{project.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {project.client}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium">{project.value}</span>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(project.status)}>
                        {project.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {project.startDate}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {project.endDate}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground">{project.manager}</td>
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
