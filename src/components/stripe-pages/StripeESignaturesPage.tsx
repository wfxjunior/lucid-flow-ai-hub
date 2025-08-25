
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { FileText, CheckCircle, Clock, Send, Plus } from "lucide-react"

export function StripeESignaturesPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "pending", label: "Pending signature", count: 6 },
    { id: "completed", label: "Completed", count: 24 },
    { id: "drafts", label: "Drafts", count: 3 },
    { id: "expired", label: "Expired", count: 2 }
  ]

  const filters = [
    { id: "document-type", label: "Document type", active: activeFilters.includes("document-type") },
    { id: "signer", label: "Signer", active: activeFilters.includes("signer") },
    { id: "date", label: "Date sent", active: activeFilters.includes("date") },
    { id: "status", label: "Status", active: activeFilters.includes("status") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const documents = [
    {
      title: "Service Agreement - Anderson Kitchen",
      type: "Contract",
      signer: "John Anderson",
      email: "john@anderson.com",
      sentDate: "Mar 18, 2024",
      status: "Pending signature",
      dueDate: "Mar 25, 2024"
    },
    {
      title: "Project Proposal - Smith Office",
      type: "Proposal",
      signer: "Sarah Smith",
      email: "sarah@smithind.com", 
      sentDate: "Mar 17, 2024",
      status: "Completed",
      dueDate: "Mar 24, 2024"
    },
    {
      title: "Change Order - Johnson Bathroom",
      type: "Change Order", 
      signer: "Mike Johnson",
      email: "mike@johnsonconst.com",
      sentDate: "Mar 16, 2024",
      status: "Pending signature",
      dueDate: "Mar 23, 2024"
    },
    {
      title: "Final Inspection - Davis Property",
      type: "Completion Certificate",
      signer: "Lisa Davis",
      email: "lisa@davisproperties.com",
      sentDate: "Mar 15, 2024",
      status: "Completed", 
      dueDate: "Mar 22, 2024"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Pending signature": "warning",
      "Completed": "success",
      "Draft": "neutral",
      "Expired": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "Pending signature": return <Clock className="w-4 h-4 text-amber-500" />
      default: return <FileText className="w-4 h-4 text-muted-foreground" />
    }
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Send className="w-4 h-4" />
        Send reminder
      </button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        New document
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search documents..."
          showAddButton={true}
          addButtonLabel="New document"
        />
        
        <StripePageLayout
          title="E-Signatures"
          description="Manage documents for electronic signature"
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
                  <th>Document Title</th>
                  <th>Type</th>
                  <th>Signer</th>
                  <th>Email</th>
                  <th>Date Sent</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(doc.status)}
                        <span className="font-medium">{doc.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="stripe-badge neutral">{doc.type}</span>
                    </td>
                    <td className="font-medium">{doc.signer}</td>
                    <td className="text-muted-foreground">{doc.email}</td>
                    <td>{doc.sentDate}</td>
                    <td>{doc.dueDate}</td>
                    <td>
                      <span className={getStatusBadge(doc.status)}>
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {documents.length} result{documents.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
