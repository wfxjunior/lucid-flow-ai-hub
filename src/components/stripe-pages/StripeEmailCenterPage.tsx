
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { Mail, Send, Users, BarChart3, Plus } from "lucide-react"

export function StripeEmailCenterPage() {
  const [activeTab, setActiveTab] = useState("campaigns")

  const tabs = [
    { id: "campaigns", label: "Campaigns", count: 6 },
    { id: "templates", label: "Templates", count: 12 },
    { id: "analytics", label: "Analytics" },
    { id: "contacts", label: "Contacts", count: 247 }
  ]

  const campaigns = [
    {
      name: "Monthly Newsletter - March",
      status: "Sent",
      recipients: 184,
      opens: 156,
      clicks: 43,
      date: "Mar 15, 2024"
    },
    {
      name: "Project Updates Reminder",
      status: "Draft", 
      recipients: 67,
      opens: 0,
      clicks: 0,
      date: "Mar 20, 2024"
    },
    {
      name: "New Service Announcement",
      status: "Scheduled",
      recipients: 201,
      opens: 0,
      clicks: 0,
      date: "Mar 25, 2024"
    }
  ]

  const metrics = [
    {
      title: "Total Campaigns",
      value: "24",
      change: "+3 this month"
    },
    {
      title: "Active Subscribers",
      value: "247",
      change: "+12 this week"
    },
    {
      title: "Average Open Rate",
      value: "68.5%",
      change: "+2.3% vs last month"
    },
    {
      title: "Click Through Rate",
      value: "12.8%",
      change: "+0.8% vs last month"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Sent": "success",
      "Draft": "neutral",
      "Scheduled": "warning",
      "Failed": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Import contacts</button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Create campaign
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search campaigns..."
          showAddButton={true}
          addButtonLabel="Create campaign"
        />
        
        <StripePageLayout
          title="Email Center"
          description="Send professional emails and newsletters to your clients"
          actions={actions}
        >
          <StripeTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="stripe-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
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
                  <th>Campaign Name</th>
                  <th>Status</th>
                  <th>Recipients</th>
                  <th>Opens</th>
                  <th>Clicks</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{campaign.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(campaign.status)}>
                        {campaign.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        {campaign.recipients}
                      </div>
                    </td>
                    <td>{campaign.opens || '—'}</td>
                    <td>{campaign.clicks || '—'}</td>
                    <td className="text-muted-foreground">{campaign.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {campaigns.length} result{campaigns.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
