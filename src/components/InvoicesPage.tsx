import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  ChevronDown, 
  Plus, 
  Filter, 
  Printer, 
  Edit, 
  Eye, 
  Copy, 
  Send, 
  FileText, 
  DollarSign, 
  Bell, 
  Download, 
  MoreHorizontal,
  Archive,
  Trash2
} from "lucide-react"
import { InvoiceForm } from "@/components/InvoiceForm"
import { DocumentActionsDropdown } from "@/components/documents/DocumentActionsDropdown"
import { DocumentEventsBadge } from "@/components/DocumentEventsBadge"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"

type StatusFilter = "all" | "draft" | "sent" | "late" | "paid" | "partial" | "archived"

export function InvoicesPage() {
  const { invoices, clients, loading } = useBusinessData()
  const { generateEstimatePDF, isGenerating } = usePDFGeneration()
  const [showForm, setShowForm] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null)

  // Create a mapping of clients for easy lookup
  const clientsMap = (clients || []).reduce((acc, client) => {
    acc[client.id] = client
    return acc
  }, {} as Record<string, any>)

  const filteredInvoices = (invoices || []).filter((invoice) => {
    if (statusFilter === "all") return true
    
    // Map our status filter to invoice status
    const statusMapping: Record<StatusFilter, string[]> = {
      all: [],
      draft: ["draft"],
      sent: ["sent"],
      late: ["overdue"],
      paid: ["paid"],
      partial: ["partial"],
      archived: ["archived"]
    }
    
    return statusMapping[statusFilter]?.includes(invoice.status)
  })

  const calculateDaysOverdue = (dueDate: string | null, status: string) => {
    if (!dueDate || status === 'paid') return 0
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = today.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'viewed': return 'bg-blue-100 text-blue-800'
      case 'paid': return 'bg-green-100 text-green-800'
      case 'partial': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'sent': return 'Sent'
      case 'viewed': return 'Viewed'  
      case 'paid': return 'Paid'
      case 'partial': return 'Partial'
      case 'draft': return 'Draft'
      case 'overdue': return 'Late'
      default: return status?.charAt(0).toUpperCase() + status?.slice(1)
    }
  }

  const handleEdit = (invoice: any) => {
    setEditingInvoice(invoice)
    setShowForm(true)
  }

  const handleView = (invoice: any) => {
    setSelectedInvoiceId(invoice.id)
  }

  const handleDuplicate = (invoice: any) => {
    const duplicated = {
      ...invoice,
      id: undefined,
      invoice_number: `INV-${Date.now().toString().slice(-6)}`,
      status: 'draft',
      title: `Copy of ${invoice.title}`
    }
    setEditingInvoice(duplicated)
    setShowForm(true)
  }

  const handleSend = (invoice: any) => {
    toast.info("Send invoice functionality")
  }

  const handleConvertToEstimate = (invoice: any) => {
    toast.info("Convert to estimate functionality")
  }

  const handleRecordPayment = (invoice: any) => {
    toast.info("Record payment functionality")
  }

  const handleSendReminder = (invoice: any) => {
    toast.info("Send reminder functionality")
  }

  const handleDownloadPDF = async (invoice: any) => {
    const client = clientsMap[invoice.client_id]
    const invoiceWithClient = { ...invoice, client }
    await generateEstimatePDF(invoiceWithClient)
  }

  const handleChangeStatus = (invoice: any, newStatus: string) => {
    toast.info(`Change status to ${newStatus}`)
  }

  const handleArchive = (invoice: any) => {
    toast.info("Archive invoice functionality")
  }

  const handleDelete = (invoice: any) => {
    toast.info("Delete invoice functionality")
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingInvoice(null)
  }

  const StatusFilterButton = ({ status, label, isActive, onClick }: { 
    status: StatusFilter, 
    label: string, 
    isActive: boolean, 
    onClick: () => void 
  }) => (
    <button
      onClick={onClick}
      className={`text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
    >
      {label}
    </button>
  )

  if (showForm) {
    return (
      <InvoiceForm
        invoice={editingInvoice}
        onClose={handleCloseForm}
        onSuccess={handleCloseForm}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">List of Invoices</h1>
        <Button 
          onClick={() => setShowForm(true)} 
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Control Bar - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 justify-center sm:justify-start"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? 'Hide Filter' : 'Show Filter'}
        </button>
        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 justify-center sm:justify-start">
          <Printer className="h-4 w-4" />
          Print Table
        </button>
      </div>

      {/* Status Filters - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
        <span className="font-medium text-center sm:text-left">Status:</span>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4">
          <StatusFilterButton 
            status="all" 
            label="All" 
            isActive={statusFilter === "all"} 
            onClick={() => setStatusFilter("all")} 
          />
          <span className="hidden sm:inline">|</span>
          <StatusFilterButton 
            status="draft" 
            label="Draft" 
            isActive={statusFilter === "draft"} 
            onClick={() => setStatusFilter("draft")} 
          />
          <span className="hidden sm:inline">|</span>
          <StatusFilterButton 
            status="sent" 
            label="Sent" 
            isActive={statusFilter === "sent"} 
            onClick={() => setStatusFilter("sent")} 
          />
          <span className="hidden sm:inline">|</span>
          <StatusFilterButton 
            status="late" 
            label="Late" 
            isActive={statusFilter === "late"} 
            onClick={() => setStatusFilter("late")} 
          />
          <span className="hidden sm:inline">|</span>
          <StatusFilterButton 
            status="paid" 
            label="Paid" 
            isActive={statusFilter === "paid"} 
            onClick={() => setStatusFilter("paid")} 
          />
          <span className="hidden sm:inline">|</span>
          <StatusFilterButton 
            status="partial" 
            label="Partial" 
            isActive={statusFilter === "partial"} 
            onClick={() => setStatusFilter("partial")} 
          />
          <span className="hidden sm:inline">|</span>
          <StatusFilterButton 
            status="archived" 
            label="Archived" 
            isActive={statusFilter === "archived"} 
            onClick={() => setStatusFilter("archived")} 
          />
        </div>
      </div>

      {/* Table - Mobile Scrollable */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-500 hover:bg-blue-500">
              <TableHead className="text-white font-medium">Invoice</TableHead>
              <TableHead className="text-white font-medium">Customer</TableHead>
              <TableHead className="text-white font-medium">Date ▲</TableHead>
              <TableHead className="text-white font-medium">Days</TableHead>
              <TableHead className="text-white font-medium">Total</TableHead>
              <TableHead className="text-white font-medium">Balance</TableHead>
              <TableHead className="text-white font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading invoices...
                </TableCell>
              </TableRow>
            ) : filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No invoices found
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => {
                const client = clientsMap[invoice.client_id]
                const clientName = client?.name || 'Unknown Client'
                const daysOverdue = calculateDaysOverdue(invoice.due_date, invoice.status)
                const balance = invoice.status === 'paid' ? 0 : (invoice.amount || 0)
                
                return (
                  <TableRow key={invoice.id} className="border-b">
                     <TableCell className="py-2">
                       <div className="flex items-center gap-2">
                         <DocumentActionsDropdown
                           documentType="invoice"
                           document={invoice}
                           actions={{
                             edit: () => handleEdit(invoice),
                             view: () => handleView(invoice),
                             duplicate: () => handleDuplicate(invoice),
                             send: () => handleSend(invoice),
                             convertTo: (type) => type === 'estimate' && handleConvertToEstimate(invoice),
                             recordPayment: () => handleRecordPayment(invoice),
                             sendReminder: () => handleSendReminder(invoice),
                             downloadPDF: () => handleDownloadPDF(invoice),
                             archive: () => handleArchive(invoice),
                             delete: () => handleDelete(invoice)
                           }}
                         />
                         <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                           {invoice.invoice_number || `INV-${invoice.id?.slice(0, 6)}`}
                         </span>
                       </div>
                     </TableCell>
                    <TableCell className="py-2">
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        {clientName}
                      </span>
                    </TableCell>
                    <TableCell className="py-2">
                      {invoice.created_at ? new Date(invoice.created_at).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit', 
                        year: 'numeric'
                      }) : '-'}
                    </TableCell>
                    <TableCell className="py-2">
                      <span className={daysOverdue > 0 ? 'text-red-600 font-medium' : ''}>
                        {daysOverdue > 0 ? daysOverdue : '-'}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 font-medium">
                      {(invoice.amount || 0).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2
                      })}
                    </TableCell>
                    <TableCell className="py-2 font-medium">
                      {balance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2
                      })}
                    </TableCell>
                     <TableCell className="py-2">
                       <div className="flex flex-col gap-1">
                         <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                           invoice.status === 'paid' ? 'text-green-700' :
                           invoice.status === 'sent' ? 'text-blue-700' :
                           invoice.status === 'viewed' ? 'text-blue-700' :
                           invoice.status === 'partial' ? 'text-yellow-700' :
                           'text-gray-700'
                         }`}>
                           {getStatusDisplay(invoice.status)}
                         </span>
                         <DocumentEventsBadge documentId={invoice.id} compact />
                       </div>
                     </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* Pagination - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <Button variant="outline" size="sm" className="text-xs px-2">First</Button>
          <Button variant="outline" size="sm" className="text-xs px-2">&lt;</Button>
          <Button variant="default" size="sm" className="text-xs px-2">1</Button>
          <Button variant="outline" size="sm" className="text-xs px-2">&gt;</Button>
          <Button variant="outline" size="sm" className="text-xs px-2">Last</Button>
          <Button variant="outline" size="sm" className="text-xs px-2">All Pages</Button>
        </div>
        <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-right">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span>{filteredInvoices.length} invoices</span>
            <span className="hidden sm:inline">|</span>
            <span>Total: {filteredInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2
            })}</span>
            <span className="hidden sm:inline">|</span>
            <span>Balance: {filteredInvoices.reduce((sum, inv) => {
              const balance = inv.status === 'paid' ? 0 : (inv.amount || 0)
              return sum + balance
            }, 0).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2
            })}</span>
          </div>
        </div>
      </div>

      {/* Terminology Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Terminology Legend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">The Days Column:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• If the number is <span className="text-red-600 font-medium">red</span>: The number of days this invoice is late / past due.</li>
              <li>• If the number is <span className="text-green-600 font-medium">green</span>: The number of days till this invoice is due.</li>
              <li>• If the number is <span className="text-foreground font-medium">black</span>: The number of days it took your customer to pay this invoice.</li>
              <li>• The bottom number: The average number of days before your invoices were paid (only includes paid invoices).</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">The Status Column:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• <span className="font-medium">Draft</span>: This is a regular invoice that has just been created.</li>
              <li>• <span className="font-medium">Sent</span>: This invoice has either been sent here on the platform, or you have marked it as sent yourself.</li>
              <li>• <span className="font-medium">Viewed</span>: This invoice has been viewed by one or more of the people you sent it to.</li>
              <li>• <span className="font-medium">Bounced</span>: This invoice could not be delivered. This is usually because the e-mail address was misspelled or because the recipient's inbox was full.</li>
              <li>• <span className="font-medium">Paid</span>: This invoice has either been paid online or you have entered full payment for it.</li>
              <li>• <span className="font-medium">Partial</span>: This invoice has either been paid partially online or you have entered a partial payment for it.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}