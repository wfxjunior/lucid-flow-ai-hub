
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { CheckCircle, Circle, Clock, AlertTriangle, Plus, Filter } from "lucide-react"

export function StripeTasksPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "active", label: "Active", count: 8 },
    { id: "completed", label: "Completed", count: 24 },
    { id: "overdue", label: "Overdue", count: 3 },
    { id: "scheduled", label: "Scheduled", count: 12 }
  ]

  const filters = [
    { id: "priority", label: "Priority", active: activeFilters.includes("priority") },
    { id: "assignee", label: "Assignee", active: activeFilters.includes("assignee") },
    { id: "project", label: "Project", active: activeFilters.includes("project") },
    { id: "due-date", label: "Due date", active: activeFilters.includes("due-date") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const tasks = [
    {
      title: "Complete project proposal",
      project: "Anderson Family Renovation",
      priority: "High",
      due: "Today",
      assignee: "You",
      status: "In progress"
    },
    {
      title: "Review client feedback",
      project: "Smith Industries Office",
      priority: "Medium",
      due: "Tomorrow",
      assignee: "Design Team",
      status: "Pending"
    },
    {
      title: "Submit final invoices",
      project: "Johnson Construction",
      priority: "High", 
      due: "Mar 25",
      assignee: "Finance",
      status: "Overdue"
    }
  ]

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      "High": "error",
      "Medium": "warning", 
      "Low": "neutral"
    }
    return `stripe-badge ${priorityClasses[priority as keyof typeof priorityClasses] || 'neutral'}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "In progress": return <Clock className="w-4 h-4 text-blue-500" />
      case "Overdue": return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Circle className="w-4 h-4 text-muted-foreground" />
    }
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Filter className="w-4 h-4" />
        Bulk actions
      </button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Add task
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search tasks..."
          showAddButton={true}
          addButtonLabel="Add task"
        />
        
        <StripePageLayout
          title="Tasks"
          description="Manage your project tasks and deadlines"
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
                  <th>Task</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Assignee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(task.status)}
                        <span className="font-medium">{task.title}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground">{task.project}</td>
                    <td>
                      <span className={getPriorityBadge(task.priority)}>
                        {task.priority}
                      </span>
                    </td>
                    <td>{task.due}</td>
                    <td>{task.assignee}</td>
                    <td className="text-muted-foreground">{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {tasks.length} result{tasks.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
