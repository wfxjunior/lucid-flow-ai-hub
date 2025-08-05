import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  Plus, Search, Edit, Trash2, Download, FileText, DollarSign, TrendingUp, Send, Copy, PenTool, Receipt, Mail, 
  MoreHorizontal, Printer, Filter, Eye, Archive, RefreshCw, Calculator, Clock
} from "lucide-react"
import { EstimateForm } from "@/components/EstimateForm"
import { InlineEstimateEditor } from "@/components/InlineEstimateEditor"
import { DocumentSignatureDialog } from "@/components/e-signatures/DocumentSignatureDialog"
import { ConvertToReceiptDialog } from "@/components/receipts/ConvertToReceiptDialog"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { useDocumentEmail } from "@/hooks/useDocumentEmail"
import { toast } from "sonner"

export function EstimatesPage() {
  const { estimates, clients, loading } = useBusinessData()
  const { generateEstimatePDF, isGenerating } = usePDFGeneration()
  const { sendEstimateEmail, isSending } = useDocumentEmail()
  const [showForm, setShowForm] = useState(false)
  const [showInlineEditor, setShowInlineEditor] = useState(false)
  const [editingEstimate, setEditingEstimate] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [signatureDialogOpen, setSignatureDialogOpen] = useState<string | null>(null)

  // Create a mapping of clients for easy lookup
  const clientsMap = (clients || []).reduce((acc, client) => {
    acc[client.id] = client
    return acc
  }, {} as Record<string, any>)

  const filteredEstimates = (estimates || []).filter((estimate) => {
    const client = clientsMap[estimate.client_id]
    const clientName = client?.name || 'Unknown Client'
    
    const matchesSearch = estimate.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (estimate.estimate_number || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || estimate.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleEdit = (estimate: any) => {
    setEditingEstimate(estimate)
    setShowForm(true)
  }

  const handleView = (estimate: any) => {
    // Navigate to estimate view
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

  const handleSendEmail = async (estimate: any) => {
    const client = clientsMap[estimate.client_id]
    if (!client?.email) {
      toast.error("Client email not found. Please update the client's email address.")
      return
    }
    
    const estimateWithClient = { ...estimate, client }
    await sendEstimateEmail(estimateWithClient)
  }

  const handleGeneratePDF = async (estimate: any) => {
    const client = clientsMap[estimate.client_id]
    const estimateWithClient = { ...estimate, client }
    await generateEstimatePDF(estimateWithClient)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setShowInlineEditor(false)
    setEditingEstimate(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'viewed': return 'bg-purple-100 text-purple-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-orange-100 text-orange-800'
      case 'archived': return 'bg-gray-100 text-gray-600'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDisplay = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const StatusFilterButton = ({ status, label }: { status: string; label: string }) => (
    <Button
      variant={statusFilter === status ? "default" : "outline"}
      size="sm"
      onClick={() => setStatusFilter(status)}
      className="h-8"
    >
      {label}
    </Button>
  )

  if (showInlineEditor) {
    return (
      <div className="container mx-auto p-4 sm:p-6">
        <InlineEstimateEditor />
        <div className="mt-6">
          <Button variant="outline" onClick={handleCloseForm}>
            Back to Estimates
          </Button>
        </div>
      </div>
    )
  }

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estimates</h1>
          <p className="text-muted-foreground">
            Track and manage all your estimates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowInlineEditor(true)}>
            <Calculator className="mr-2 h-4 w-4" />
            Create Estimate
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Estimate
          </Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print Table
          </Button>
        </div>
      </div>

      {/* Status Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          <StatusFilterButton status="all" label="All" />
          <StatusFilterButton status="draft" label="Draft" />
          <StatusFilterButton status="sent" label="Sent" />
          <StatusFilterButton status="viewed" label="Viewed" />
          <StatusFilterButton status="accepted" label="Accepted" />
          <StatusFilterButton status="declined" label="Declined" />
          <StatusFilterButton status="expired" label="Expired" />
          <StatusFilterButton status="archived" label="Archived" />
        </div>
      )}

      {/* Estimates Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading estimates...</div>
            </div>
          ) : filteredEstimates.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">No estimates found</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estimate Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEstimates.map((estimate) => {
                  const client = clientsMap[estimate.client_id]
                  const clientName = client?.name || 'Unknown Client'
                  
                  return (
                    <TableRow key={estimate.id}>
                      <TableCell className="font-medium">
                        {estimate.estimate_number || 'EST-' + estimate.id?.slice(0, 8)}
                      </TableCell>
                      <TableCell>{clientName}</TableCell>
                      <TableCell>
                        {estimate.estimate_date ? new Date(estimate.estimate_date).toLocaleDateString() : 'Not set'}
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">-</span>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${estimate.amount?.toFixed(2) || '0.00'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(estimate.status)}>
                          {getStatusDisplay(estimate.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleEdit(estimate)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleView(estimate)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(estimate)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendEmail(estimate)}>
                              <Send className="mr-2 h-4 w-4" />
                              Send
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setSignatureDialogOpen(estimate.id)}>
                              <PenTool className="mr-2 h-4 w-4" />
                              Send for Signature
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleGeneratePDF(estimate)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download/Print PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DocumentSignatureDialog
                          document={estimate}
                          documentType="estimate"
                          open={signatureDialogOpen === estimate.id}
                          onOpenChange={(open) => setSignatureDialogOpen(open ? estimate.id : null)}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Footer Stats */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          {filteredEstimates.length} estimate{filteredEstimates.length !== 1 ? 's' : ''} found
        </div>
        <div className="flex gap-4">
          <span>Total: ${filteredEstimates.reduce((sum, est) => sum + (est.amount || 0), 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}