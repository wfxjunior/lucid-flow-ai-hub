
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Calendar, Clock, User, CheckCircle, Plus, Zap } from "lucide-react"

export function StripeSmartSchedulePage() {
  const [activeTab, setActiveTab] = useState("suggestions")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "suggestions", label: "AI Suggestions", count: 8 },
    { id: "confirmed", label: "Confirmed", count: 24 },
    { id: "conflicts", label: "Conflicts", count: 3 },
    { id: "availability", label: "Team Availability" }
  ]

  const filters = [
    { id: "time", label: "Time Range", active: activeFilters.includes("time") },
    { id: "team", label: "Team Member", active: activeFilters.includes("team") },
    { id: "priority", label: "Priority", active: activeFilters.includes("priority") },
    { id: "project", label: "Project", active: activeFilters.includes("project") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const suggestions = [
    {
      task: "Install kitchen cabinets",
      suggestedTime: "Tomorrow, 9:00 AM - 2:00 PM",
      assignee: "Mike Johnson",
      project: "Anderson Kitchen",
      confidence: "95%",
      priority: "High"
    },
    {
      task: "Electrical inspection",
      suggestedTime: "Mar 25, 1:00 PM - 3:00 PM", 
      assignee: "Tom Davis",
      project: "Smith Office",
      confidence: "88%",
      priority: "Medium"
    },
    {
      task: "Tile delivery coordination",
      suggestedTime: "Mar 26, 8:00 AM - 10:00 AM",
      assignee: "Sarah Wilson", 
      project: "Johnson Bathroom",
      confidence: "92%",
      priority: "High"
    }
  ]

  const metrics = [
    {
      title: "AI Suggestions",
      value: "8",
      change: "Available now"
    },
    {
      title: "Confirmed Appointments",
      value: "24", 
      change: "This week"
    },
    {
      title: "Schedule Conflicts",
      value: "3",
      change: "Needs resolution"
    },
    {
      title: "Efficiency Score",
      value: "94%",
      change: "+6% vs last week"
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

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Calendar className="w-4 h-4" />
        View Calendar
      </button>
      <button className="stripe-button-primary">
        <Zap className="w-4 h-4" />
        Auto-Schedule
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search appointments..."
          showAddButton={true}
          addButtonLabel="Manual Schedule"
        />
        
        <StripePageLayout
          title="Smart Schedule"
          description="AI-powered scheduling optimization for your team"
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
                  <Zap className="w-4 h-4 text-muted-foreground" />
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
                  <th>Task</th>
                  <th>Suggested Time</th>
                  <th>Assignee</th>
                  <th>Project</th>
                  <th>AI Confidence</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.map((suggestion, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{suggestion.task}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {suggestion.suggestedTime}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {suggestion.assignee}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{suggestion.project}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-green-500" />
                        <span className="font-medium text-green-600">{suggestion.confidence}</span>
                      </div>
                    </td>
                    <td>
                      <span className={getPriorityBadge(suggestion.priority)}>
                        {suggestion.priority}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="stripe-button-secondary text-xs px-2 py-1">
                          <CheckCircle className="w-3 h-3" />
                          Accept
                        </button>
                        <button className="stripe-button-secondary text-xs px-2 py-1">
                          Modify
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {suggestions.length} result{suggestions.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
