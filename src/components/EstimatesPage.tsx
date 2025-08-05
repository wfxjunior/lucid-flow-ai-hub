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
import { EstimateForm } from "@/components/EstimateForm"
import { ConvertToReceiptDialog } from "@/components/receipts/ConvertToReceiptDialog"
import { DocumentSignatureDialog } from "@/components/e-signatures/DocumentSignatureDialog"
import { SignNowEmbedDialog } from "@/components/e-signatures/SignNowEmbedDialog"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { useDocumentEmail } from "@/hooks/useDocumentEmail"
import { toast } from "sonner"

type StatusFilter = "all" | "draft" | "sent" | "viewed" | "accepted" | "declined" | "expired" | "archived"

export function EstimatesPage() {
  const { estimates, clients, loading } = useBusinessData()
  const { generateEstimatePDF, isGenerating } = usePDFGeneration()
  const { sendEstimateEmail, isSending } = useDocumentEmail()
  const [showForm, setShowForm] = useState(false)
  const [editingEstimate, setEditingEstimate] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [signatureDialogOpen, setSignatureDialogOpen] = useState<string | null>(null)

  // Create a mapping of clients for easy lookup
  const clientsMap = (clients || []).reduce((acc, client) => {
    acc[client.id] = client
    return acc
  }, {} as Record<string, any>)

  const filteredEstimates = (estimates || []).filter((estimate) => {
    if (statusFilter === "all") return true
    
    // Map our status filter to estimate status
    const statusMapping: Record<StatusFilter, string[]> = {
      all: [],
      draft: ["draft"],
      sent: ["sent"],
      viewed: ["viewed"],
      accepted: ["accepted"],
      declined: ["declined"],
      expired: ["expired"],
      archived: ["archived"]
    }
    
    return statusMapping[statusFilter]?.includes(estimate.status)
  })

  const calculateDaysFromEstimate = (estimateDate: string | null, status: string) => {
    if (!estimateDate) return 0
    const estimate = new Date(estimateDate)
    const today = new Date()
    const diffTime = today.getTime() - estimate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'viewed': return 'bg-blue-100 text-blue-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'sent': return 'Sent'
      case 'viewed': return 'Viewed'  
      case 'accepted': return 'Accepted'
      case 'declined': return 'Declined'
      case 'draft': return 'Draft'
      case 'expired': return 'Expired'
      default: return status?.charAt(0).toUpperCase() + status?.slice(1)
    }
  }

  const handleEdit = (estimate: any) => {
    setEditingEstimate(estimate)
    setShowForm(true)
  }

  const handleView = (estimate: any) => {
    // Implement view functionality
    toast.info("View estimate functionality")
  }

  const handleDuplicate = (estimate: any) => {
    const duplicated = {
      ...estimate,
      id: undefined,
      estimate_number: `EST-${Date.now().toString().slice(-6)}`,
      status: 'draft',
      title: `Copy of ${estimate.title}`
    }
    setEditingEstimate(duplicated)
    setShowForm(true)
  }

  const handleSend = async (estimate: any) => {
    const client = clientsMap[estimate.client_id]
    if (!client?.email) {
      toast.error("Client email not found. Please update the client's email address.")
      return
    }
    
    const estimateWithClient = { ...estimate, client }
    await sendEstimateEmail(estimateWithClient)
  }

  const handleConvertToInvoice = (estimate: any) => {
    toast.info("Convert to invoice functionality")
  }

  const handleSendForSignature = (estimate: any) => {
    setSignatureDialogOpen(estimate.id)
  }

  const handleSendReminder = (estimate: any) => {
    toast.info("Send reminder functionality")
  }

  const handleDownloadPDF = async (estimate: any) => {
    const client = clientsMap[estimate.client_id]
    const estimateWithClient = { ...estimate, client }
    await generateEstimatePDF(estimateWithClient)
  }

  const handleChangeStatus = (estimate: any, newStatus: string) => {
    toast.info(`Change status to ${newStatus}`)
  }

  const handleArchive = (estimate: any) => {
    toast.info("Archive estimate functionality")
  }

  const handleDelete = (estimate: any) => {
    toast.info("Delete estimate functionality")
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingEstimate(null)
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
      <EstimateForm
        estimate={editingEstimate}
        onClose={handleCloseForm}
        onSuccess={handleCloseForm}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">List of Estimates</h1>
        <Button 
          onClick={() => setShowForm(true)} 
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Estimate
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
            status="viewed" 
            label="Viewed" 
            isActive={statusFilter === "viewed"} 
            onClick={() => setStatusFilter("viewed")} 
          />
          <span className="hidden sm:inline">|</span>
          <StatusFilterButton 
            status="accepted" 
            label="Accepted" 
            isActive={statusFilter === "accepted"} 
            onClick={() => setStatusFilter("accepted")} 
          />
          <span className="hidden sm:inline">|</span>
          <StatusFilterButton 
            status="declined" 
            label="Declined" 
            isActive={statusFilter === "declined"} 
            onClick={() => setStatusFilter("declined")} 
          />
          <span className="hidden sm:inline">|</span>
          <StatusFilterButton 
            status="expired" 
            label="Expired" 
            isActive={statusFilter === "expired"} 
            onClick={() => setStatusFilter("expired")} 
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
              <TableHead className="text-white font-medium">Estimate</TableHead>
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
                  Loading estimates...
                </TableCell>
              </TableRow>
            ) : filteredEstimates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No estimates found
                </TableCell>
              </TableRow>
            ) : (
              filteredEstimates.map((estimate) => {
                const client = clientsMap[estimate.client_id]
                const clientName = client?.name || 'Unknown Client'
                const daysFromEstimate = calculateDaysFromEstimate(estimate.estimate_date, estimate.status)
                const balance = estimate.status === 'accepted' ? 0 : (estimate.amount || 0)
                
                return (
                  <TableRow key={estimate.id} className="border-b">
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-56 bg-white shadow-lg border z-50">
                            <DropdownMenuItem onClick={() => handleEdit(estimate)} className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleView(estimate)} className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(estimate)} className="flex items-center gap-2">
                              <Copy className="h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSend(estimate)} className="flex items-center gap-2">
                              <Send className="h-4 w-4" />
                              Send
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleConvertToInvoice(estimate)} className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Convert to Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendForSignature(estimate)} className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Send for Signature
                            </DropdownMenuItem>
                            {estimate.status === 'pending' && (
                              <DropdownMenuItem onClick={() => setSignatureDialogOpen(estimate.id)} className="flex items-center gap-2 text-green-700">
                                <FileText className="h-4 w-4" />
                                Sign Document
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleSendReminder(estimate)} className="flex items-center gap-2">
                              <Bell className="h-4 w-4" />
                              Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadPDF(estimate)} className="flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              Download/Print PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleChangeStatus(estimate, 'draft')} className="flex items-center gap-2">
                              <MoreHorizontal className="h-4 w-4" />
                              Change Status to:
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleArchive(estimate)} className="flex items-center gap-2">
                              <Archive className="h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(estimate)} className="flex items-center gap-2 text-red-600">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          {estimate.estimate_number || `EST-${estimate.id?.slice(0, 6)}`}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        {clientName}
                      </span>
                    </TableCell>
                    <TableCell className="py-2">
                      {estimate.estimate_date ? new Date(estimate.estimate_date).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit', 
                        year: 'numeric'
                      }) : '-'}
                    </TableCell>
                    <TableCell className="py-2">
                      <span className={daysFromEstimate > 0 ? 'text-gray-600' : ''}>
                        {daysFromEstimate > 0 ? daysFromEstimate : '-'}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 font-medium">
                      {(estimate.amount || 0).toLocaleString('en-US', {
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
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        estimate.status === 'accepted' ? 'text-green-700' :
                        estimate.status === 'sent' ? 'text-blue-700' :
                        estimate.status === 'viewed' ? 'text-blue-700' :
                        estimate.status === 'declined' ? 'text-red-700' :
                        'text-gray-700'
                      }`}>
                        {getStatusDisplay(estimate.status)}
                      </span>
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
            <span>{filteredEstimates.length} estimates</span>
            <span className="hidden sm:inline">|</span>
            <span>Total: {filteredEstimates.reduce((sum, est) => sum + (est.amount || 0), 0).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2
            })}</span>
            <span className="hidden sm:inline">|</span>
            <span>Balance: {filteredEstimates.reduce((sum, est) => {
              const balance = est.status === 'accepted' ? 0 : (est.amount || 0)
              return sum + balance
            }, 0).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2
            })}</span>
          </div>
        </div>
      </div>

      {/* Signature Dialog */}
      {signatureDialogOpen && (
        <>
          <DocumentSignatureDialog
            document={filteredEstimates.find(est => est.id === signatureDialogOpen)}
            documentType="estimate"
            open={!!signatureDialogOpen}
            onOpenChange={(open) => setSignatureDialogOpen(open ? signatureDialogOpen : null)}
          />
          <SignNowEmbedDialog
            open={!!signatureDialogOpen}
            onOpenChange={(open) => setSignatureDialogOpen(open ? signatureDialogOpen : null)}
            document={filteredEstimates.find(est => est.id === signatureDialogOpen)}
            documentType="estimate"
            onSignatureComplete={(documentId, signedDocumentUrl) => {
              toast.success('Estimate signed successfully!')
              setSignatureDialogOpen(null)
              // Refresh estimates data if needed
            }}
          />
        </>
      )}
    </div>
  )
}