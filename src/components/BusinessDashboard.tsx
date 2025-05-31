import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useBusinessData } from "@/hooks/useBusinessData"
import { 
  Users, 
  FileText, 
  Receipt, 
  Plus, 
  Search, 
  Filter,
  CreditCard,
  CheckCircle,
  Clock,
  Archive,
  Undo2,
  DollarSign
} from "lucide-react"

export function BusinessDashboard() {
  const {
    clients,
    estimates,
    invoices,
    receipts,
    allClients,
    selectedClientId,
    setSelectedClientId,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    createClient,
    createEstimate,
    convertEstimateToInvoice,
    updateInvoiceStatus,
    generateReceipt,
    undoEstimateConversion,
    loading
  } = useBusinessData()

  const [searchTerm, setSearchTerm] = useState("")
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false)
  const [isEstimateDialogOpen, setIsEstimateDialogOpen] = useState(false)
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null)

  // Form states
  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  const [estimateForm, setEstimateForm] = useState({
    title: "",
    description: "",
    amount: ""
  })

  const [receiptForm, setReceiptForm] = useState({
    paymentMethod: "",
    notes: ""
  })

  // Fictional stats for demo purposes
  const businessStats = {
    totalRevenue: 87450,
    monthlyGrowth: 12.5,
    totalClients: 28,
    newClientsThisMonth: 4,
    activeProjects: 15,
    completedProjects: 42,
    pendingInvoices: 8,
    pendingAmount: 15230,
    averageProjectValue: 3120,
    conversionRate: 68
  }

  const handleCreateClient = async () => {
    try {
      await createClient({
        ...clientForm,
        status: 'active'
      })
      setClientForm({ name: "", email: "", phone: "", address: "" })
      setIsClientDialogOpen(false)
    } catch (error) {
      console.error('Error creating client:', error)
    }
  }

  const handleCreateEstimate = async () => {
    if (!selectedClientId) return
    
    try {
      await createEstimate({
        client_id: selectedClientId,
        title: estimateForm.title,
        description: estimateForm.description,
        amount: parseFloat(estimateForm.amount),
        status: 'draft'
      })
      setEstimateForm({ title: "", description: "", amount: "" })
      setIsEstimateDialogOpen(false)
    } catch (error) {
      console.error('Error creating estimate:', error)
    }
  }

  const handleGenerateReceipt = async () => {
    if (!selectedInvoiceId) return
    
    try {
      await generateReceipt(selectedInvoiceId)
      setReceiptForm({ paymentMethod: "", notes: "" })
      setIsReceiptDialogOpen(false)
      setSelectedInvoiceId(null)
    } catch (error) {
      console.error('Error generating receipt:', error)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'paid':
        return 'default'
      case 'pending':
      case 'sent':
        return 'secondary'
      case 'draft':
        return 'outline'
      case 'inactive':
      case 'rejected':
      case 'overdue':
        return 'destructive'
      case 'archived':
      case 'converted':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  // Combine and filter all items for search
  const allItems = [
    ...estimates.map(item => ({ ...item, type: 'estimate' as const })),
    ...invoices.map(item => ({ ...item, type: 'invoice' as const })),
    ...receipts.map(item => ({ ...item, type: 'receipt' as const }))
  ].filter(item => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const hasTitle = 'title' in item && item.title?.toLowerCase().includes(searchLower)
      const hasReceiptNumber = 'receipt_number' in item && item.receipt_number?.toLowerCase().includes(searchLower)
      const hasInvoiceNumber = 'invoice_number' in item && item.invoice_number?.toLowerCase().includes(searchLower)
      
      return hasTitle || hasReceiptNumber || hasInvoiceNumber
    }
    return true
  })

  const handleInvoiceStatusChange = async (invoiceId: string, newStatus: 'pending' | 'paid' | 'archived' | 'overdue') => {
    await updateInvoiceStatus(invoiceId, newStatus)
    
    if (newStatus === 'paid') {
      setSelectedInvoiceId(invoiceId)
      setIsReceiptDialogOpen(true)
    }
  }

  const getItemTitle = (item: any) => {
    if ('title' in item && item.title) return item.title
    if ('receipt_number' in item && item.receipt_number) return item.receipt_number
    if ('invoice_number' in item && item.invoice_number) return item.invoice_number
    return 'Unknown'
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Business Dashboard</h2>
          <p className="text-muted-foreground">Manage clients, estimates, invoices, and receipts</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Client</DialogTitle>
                <DialogDescription>
                  Add a new client to your business dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Name</Label>
                  <Input
                    id="client-name"
                    value={clientForm.name}
                    onChange={(e) => setClientForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="client@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-phone">Phone</Label>
                  <Input
                    id="client-phone"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-address">Address</Label>
                  <Input
                    id="client-address"
                    value={clientForm.address}
                    onChange={(e) => setClientForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Address"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsClientDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateClient}>Create Client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {selectedClientId && (
            <Dialog open={isEstimateDialogOpen} onOpenChange={setIsEstimateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  New Estimate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Estimate</DialogTitle>
                  <DialogDescription>
                    Create an estimate for the selected client.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="estimate-title">Title</Label>
                    <Input
                      id="estimate-title"
                      value={estimateForm.title}
                      onChange={(e) => setEstimateForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Estimate title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimate-description">Description</Label>
                    <Input
                      id="estimate-description"
                      value={estimateForm.description}
                      onChange={(e) => setEstimateForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Estimate description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimate-amount">Amount</Label>
                    <Input
                      id="estimate-amount"
                      type="number"
                      value={estimateForm.amount}
                      onChange={(e) => setEstimateForm(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEstimateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEstimate}>Create Estimate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search estimates, invoices, receipts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedClientId || "all"} onValueChange={(value) => setSelectedClientId(value === "all" ? null : value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            {allClients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as any)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="estimates">Estimates</SelectItem>
            <SelectItem value="invoices">Invoices</SelectItem>
            <SelectItem value="receipts">Receipts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards with Fictional Data */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${businessStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">+{businessStats.monthlyGrowth}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessStats.totalClients}</div>
            <p className="text-xs text-green-600">+{businessStats.newClientsThisMonth} new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessStats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">{businessStats.completedProjects} completed total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessStats.pendingInvoices}</div>
            <p className="text-xs text-orange-600">${businessStats.pendingAmount.toLocaleString()} pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Project Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${businessStats.averageProjectValue.toLocaleString()}</div>
            <p className="text-xs text-blue-600">Based on completed projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessStats.conversionRate}%</div>
            <p className="text-xs text-green-600">Estimates to invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Clients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {clients.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No clients found</p>
            ) : (
              clients.map((client) => (
                <div
                  key={client.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedClientId === client.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedClientId(client.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{client.name}</h4>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(client.status)}>{client.status}</Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Items Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              {typeFilter === 'all' ? 'All Items' : 
               typeFilter === 'estimates' ? 'Estimates' :
               typeFilter === 'invoices' ? 'Invoices' : 'Receipts'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {allItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No items found</p>
            ) : (
              allItems.map((item) => (
                <div key={`${item.type}-${item.id}`} className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{getItemTitle(item)}</h4>
                        <Badge variant="outline">{item.type}</Badge>
                        {'status' in item && (
                          <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                        )}
                      </div>
                      {'description' in item && item.description && (
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      )}
                      <p className="text-sm font-medium mt-1">${item.amount}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {item.type === 'estimate' && item.status !== 'converted' && (
                        <Button 
                          size="sm" 
                          onClick={() => convertEstimateToInvoice(item.id)}
                        >
                          Convert to Invoice
                        </Button>
                      )}
                      
                      {item.type === 'estimate' && item.status === 'converted' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => undoEstimateConversion(item.id)}
                        >
                          <Undo2 className="h-4 w-4 mr-1" />
                          Undo
                        </Button>
                      )}
                      
                      {item.type === 'invoice' && (
                        <div className="flex gap-1">
                          <Select
                            value={item.status}
                            onValueChange={(value) => handleInvoiceStatusChange(item.id, value as any)}
                          >
                            <SelectTrigger className="w-[120px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  Pending
                                </div>
                              </SelectItem>
                              <SelectItem value="paid">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3" />
                                  Paid
                                </div>
                              </SelectItem>
                              <SelectItem value="overdue">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3 text-red-500" />
                                  Overdue
                                </div>
                              </SelectItem>
                              <SelectItem value="archived">
                                <div className="flex items-center gap-2">
                                  <Archive className="h-3 w-3" />
                                  Archived
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Receipt Generation Dialog */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Receipt</DialogTitle>
            <DialogDescription>
              Create a receipt for the paid invoice.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Input
                id="payment-method"
                value={receiptForm.paymentMethod}
                onChange={(e) => setReceiptForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                placeholder="e.g., Credit Card, Bank Transfer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receipt-notes">Notes</Label>
              <Input
                id="receipt-notes"
                value={receiptForm.notes}
                onChange={(e) => setReceiptForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReceiptDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateReceipt}>Generate Receipt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
