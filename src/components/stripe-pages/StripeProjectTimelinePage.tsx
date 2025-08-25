
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Calendar, Clock, User, CheckCircle, Plus } from "lucide-react"

export function StripeProjectTimelinePage() {
  const [activeTab, setActiveTab] = useState("timeline")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "timeline", label: "Timeline View" },
    { id: "calendar", label: "Calendar View" },
    { id: "gantt", label: "Gantt Chart" },
    { id: "milestones", label: "Milestones" }
  ]

  const filters = [
    { id: "project", label: "Project", active: activeFilters.includes("project") },
    { id: "assignee", label: "Assignee", active: activeFilters.includes("assignee") },
    { id: "status", label: "Status", active: activeFilters.includes("status") },
    { id: "date", label: "Date Range", active: activeFilters.includes("date") }
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
      project: "Anderson Kitchen",
      task: "Install cabinets",
      assignee: "Mike Johnson",
      startDate: "Mar 20, 2024",
      dueDate: "Mar 25, 2024",
      status: "In Progress",
      duration: "5 days"
    },
    {
      project: "Smith Office",
      task: "Electrical work",
      assignee: "Tom Davis",
      startDate: "Mar 22, 2024", 
      dueDate: "Mar 28, 2024",
      status: "Scheduled",
      duration: "6 days"
    },
    {
      project: "Johnson Bathroom",
      task: "Tile installation",
      assignee: "Sarah Wilson",
      startDate: "Mar 15, 2024",
      dueDate: "Mar 20, 2024", 
      status: "Completed",
      duration: "5 days"
    }
  ]

  const metrics = [
    {
      title: "Active Tasks",
      value: "24",
      change: "+6 this week"
    },
    {
      title: "Completed Tasks",
      value: "156",
      change: "+18 this week"
    },
    {
      title: "Upcoming Milestones",
      value: "8",
      change: "Due this month"
    },
    {
      title: "Projects On Track",
      value: "85%",
      change: "+5% vs last month"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Completed": "success",
      "In Progress": "warning",
      "Scheduled": "neutral",
      "Overdue": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Calendar className="w-4 h-4" />
        View Calendar
      </button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Add Task
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search tasks and milestones..."
          showAddButton={true}
          addButtonLabel="Add Task"
        />
        
        <StripePageLayout
          title="Project Timeline"
          description="Track project progress and manage task schedules"
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
                  <Clock className="w-4 h-4 text-muted-foreground" />
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
                  <th>Project</th>
                  <th>Task</th>
                  <th>Assignee</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td className="font-medium">{task.project}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        {task.status === "Completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span>{task.task}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {task.assignee}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {task.startDate}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {task.dueDate}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{task.duration}</td>
                    <td>
                      <span className={getStatusBadge(task.status)}>
                        {task.status}
                      </span>
                    </td>
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
