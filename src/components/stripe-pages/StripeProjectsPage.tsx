
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Briefcase, Calendar, User, Plus, MoreHorizontal } from "lucide-react"

export function StripeProjectsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "active", label: "Active", count: 12 },
    { id: "completed", label: "Completed", count: 28 },
    { id: "overdue", label: "Overdue", count: 3 },
    { id: "draft", label: "Draft", count: 5 }
  ]

  const filters = [
    { id: "status", label: "Status", active: activeFilters.includes("status") },
    { id: "owner", label: "Project Owner", active: activeFilters.includes("owner") },
    { id: "deadline", label: "Deadline", active: activeFilters.includes("deadline") },
    { id: "budget", label: "Budget Range", active: activeFilters.includes("budget") }
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
      owner: "Mike Johnson",
      client: "Anderson Family",
      deadline: "Apr 15, 2024",
      status: "Active",
      progress: 65,
      budget: "$25,000"
    },
    {
      name: "Smith Office Remodel",
      owner: "Sarah Wilson", 
      client: "Smith Industries",
      deadline: "May 20, 2024",
      status: "Active",
      progress: 40,
      budget: "$45,000"
    },
    {
      name: "Johnson Bathroom Update",
      owner: "Tom Davis",
      client: "Johnson Construction",
      deadline: "Mar 30, 2024",
      status: "Overdue",
      progress: 85,
      budget: "$12,500"
    }
  ]

  const metrics = [
    {
      title: "Active Projects",
      value: "12",
      change: "+3 this month"
    },
    {
      title: "Completed Projects", 
      value: "28",
      change: "+5 this month"
    },
    {
      title: "Total Budget",
      value: "$485,000",
      change: "+12% vs last month"
    },
    {
      title: "Average Progress",
      value: "67%",
      change: "+8% vs last month"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Active": "success",
      "Completed": "success", 
      "Overdue": "error",
      "Draft": "neutral"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Export</button>
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
          description="Manage construction projects and track progress"
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
            {metrics.map((metric, index) => (
              <div key={index} className="stripe-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{metric.value}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{metric.change}</p>
              </div>
            ))}
          </div>

          <div className="stripe-card p-0">
            <table className="stripe-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Owner</th>
                  <th>Client</th>
                  <th>Deadline</th>
                  <th>Budget</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{project.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {project.owner}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{project.client}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {project.deadline}
                      </div>
                    </td>
                    <td className="font-medium">{project.budget}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(project.status)}>
                        {project.status}
                      </span>
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
