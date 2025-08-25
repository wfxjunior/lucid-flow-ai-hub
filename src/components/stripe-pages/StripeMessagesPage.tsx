
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { MessageSquare, Mail, Send, Plus, Archive } from "lucide-react"

export function StripeMessagesPage() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "inbox", label: "Inbox", count: 5 },
    { id: "sent", label: "Sent", count: 12 },
    { id: "drafts", label: "Drafts", count: 2 },
    { id: "archived", label: "Archived", count: 48 }
  ]

  const filters = [
    { id: "type", label: "Message type", active: activeFilters.includes("type") },
    { id: "client", label: "Client", active: activeFilters.includes("client") },
    { id: "status", label: "Status", active: activeFilters.includes("status") },
    { id: "date", label: "Date range", active: activeFilters.includes("date") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const messages = [
    {
      subject: "Project Update Request",
      client: "Anderson Family",
      email: "anderson@email.com",
      type: "Email",
      date: "2 hours ago",
      status: "Unread",
      preview: "Could you please provide an update on the renovation timeline?"
    },
    {
      subject: "Invoice Payment Confirmation", 
      client: "Smith Industries",
      email: "billing@smithind.com",
      type: "Email",
      date: "Yesterday",
      status: "Read",
      preview: "Thank you for the invoice. Payment has been processed."
    },
    {
      subject: "Design Approval Needed",
      client: "Johnson Construction",
      email: "info@johnsonconst.com", 
      type: "SMS",
      date: "2 days ago",
      status: "Unread",
      preview: "Please review and approve the updated design plans."
    }
  ]

  const getStatusBadge = (status: string) => {
    return status === "Unread" ? "stripe-badge warning" : "stripe-badge neutral"
  }

  const getTypeIcon = (type: string) => {
    return type === "Email" ? <Mail className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Archive className="w-4 h-4" />
        Archive
      </button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Compose
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search messages..."
          showAddButton={true}
          addButtonLabel="Compose"
        />
        
        <StripePageLayout
          title="Messages"
          description="Manage email and SMS communications with clients"
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
                  <th>Subject</th>
                  <th>Client</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, index) => (
                  <tr key={index}>
                    <td className="font-medium">{message.subject}</td>
                    <td>
                      <div>
                        <div className="font-medium">{message.client}</div>
                        <div className="text-sm text-muted-foreground">{message.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(message.type)}
                        {message.type}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{message.date}</td>
                    <td>
                      <span className={getStatusBadge(message.status)}>
                        {message.status}
                      </span>
                    </td>
                    <td className="text-muted-foreground text-sm">{message.preview}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {messages.length} result{messages.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
