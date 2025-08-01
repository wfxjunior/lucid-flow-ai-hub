import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Download, FileText, DollarSign, TrendingUp, Send, Copy, Mail } from "lucide-react"
import { InvoiceForm } from "@/components/InvoiceForm"
import { ConvertToReceiptDialog } from "@/components/receipts/ConvertToReceiptDialog"
import { ReceiptEmailButton } from "@/components/ReceiptEmailButton"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"

export function InvoicesPage() {
  const { invoices, clients, loading } = useBusinessData()
  const { generateEstimatePDF, isGenerating } = usePDFGeneration()
  const [showForm, setShowForm] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Create a mapping of clients for easy lookup
  const clientsMap = (clients || []).reduce((acc, client) => {
    acc[client.id] = client
    return acc
  }, {} as Record<string, any>)

  const filteredInvoices = (invoices || []).filter((invoice) => {
    const client = clientsMap[invoice.client_id]
    const clientName = client?.name || 'Unknown Client'
    
    const matchesSearch = invoice.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (invoice.invoice_number || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleEdit = (invoice: any) => {
    setEditingInvoice(invoice)
    setShowForm(true)
  }

  const handleGeneratePDF = async (invoice: any) => {
    const client = clientsMap[invoice.client_id]
    const invoiceWithClient = { ...invoice, client }
    await generateEstimatePDF(invoiceWithClient)
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

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingInvoice(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'paid': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Create and manage professional invoices with payment tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              ${invoices?.reduce((sum, inv) => sum + (inv.amount || 0), 0).toFixed(2) || '0.00'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {invoices?.filter(inv => inv.status === 'paid').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {invoices?.filter(inv => inv.status === 'pending' || inv.status === 'sent').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Invoices</CardTitle>
          <CardDescription className="text-sm">
            Manage your invoices and convert them to receipts when paid
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading invoices...</div>
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">No invoices found</div>
            </div>
          ) : (
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Invoice #</TableHead>
                    <TableHead className="min-w-[150px]">Title</TableHead>
                    <TableHead className="min-w-[120px] hidden sm:table-cell">Client</TableHead>
                    <TableHead className="min-w-[100px]">Amount</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[100px] hidden md:table-cell">Due Date</TableHead>
                    <TableHead className="min-w-[200px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => {
                    const client = clientsMap[invoice.client_id]
                    const clientName = client?.name || 'Unknown Client'
                    
                    return (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium text-xs sm:text-sm">
                          {invoice.invoice_number || 'INV-' + invoice.id?.slice(0, 8)}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <div>
                            <div className="font-medium">{invoice.title}</div>
                            <div className="text-muted-foreground sm:hidden text-xs">{clientName}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{clientName}</TableCell>
                        <TableCell className="text-xs sm:text-sm font-medium">
                          ${invoice.amount?.toFixed(2) || '0.00'}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(invoice.status)} text-xs`}>
                            {invoice.status?.charAt(0).toUpperCase() + invoice.status?.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                          {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'Not set'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(invoice)}
                              className="h-8 w-8 p-0"
                              title="Edit"
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicate(invoice)}
                              className="h-8 w-8 p-0"
                              title="Duplicate"
                            >
                              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGeneratePDF(invoice)}
                              disabled={isGenerating}
                              className="h-8 w-8 p-0"
                              title="Download PDF"
                            >
                              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <ConvertToReceiptDialog
                              type="invoice"
                              item={invoice}
                              onReceiptCreated={() => {
                                toast.success("Receipt created successfully!")
                              }}
                            />
                            <ReceiptEmailButton
                              invoice={invoice}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}