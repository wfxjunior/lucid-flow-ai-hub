
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, Search, Filter, Eye, Edit, Archive, Download, Receipt, Undo, FileText, DollarSign, Users } from 'lucide-react'
import { useBusinessData } from '@/hooks/useBusinessData'
import { toast } from 'sonner'
import type { Client, FilterStatus, FilterType } from '@/types/business'

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
    updateClient,
    createEstimate,
    convertEstimateToInvoice,
    updateInvoiceStatus,
    generateReceipt,
    undoEstimateConversion,
    loading
  } = useBusinessData()

  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateClient, setShowCreateClient] = useState(false)
  const [showCreateEstimate, setShowCreateEstimate] = useState(false)
  const [showReceiptDialog, setShowReceiptDialog] = useState(false)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null)
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '' })
  const [newEstimate, setNewEstimate] = useState({ title: '', description: '', amount: 0, client_id: '' })
  const [receiptData, setReceiptData] = useState({ payment_method: '', notes: '' })

  const handleCreateClient = async () => {
    try {
      await createClient(newClient)
      setNewClient({ name: '', email: '', phone: '', address: '' })
      setShowCreateClient(false)
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleCreateEstimate = async () => {
    try {
      const clientId = selectedClientId || newEstimate.client_id
      if (!clientId) {
        toast.error('Please select a client')
        return
      }
      
      await createEstimate({
        ...newEstimate,
        client_id: clientId
      })
      setNewEstimate({ title: '', description: '', amount: 0, client_id: '' })
      setShowCreateEstimate(false)
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleGenerateReceipt = async () => {
    if (!selectedInvoiceId) return
    
    try {
      await generateReceipt(selectedInvoiceId, receiptData.payment_method, receiptData.notes)
      await updateInvoiceStatus(selectedInvoiceId, 'paid')
      setReceiptData({ payment_method: '', notes: '' })
      setShowReceiptDialog(false)
      setSelectedInvoiceId(null)
    } catch (error) {
      // Error handled in hook
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      case 'approved': return 'bg-blue-100 text-blue-800'
      case 'converted': return 'bg-purple-100 text-purple-800'
      case 'sent': return 'bg-orange-100 text-orange-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'active': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const selectedClient = allClients.find(c => c.id === selectedClientId)

  const filteredData = [...estimates, ...invoices, ...receipts].filter(item => {
    if (searchTerm) {
      const searchFields = [
        'title' in item ? item.title : '',
        'invoice_number' in item ? item.invoice_number : '',
        'receipt_number' in item ? item.receipt_number : '',
        item.client?.name || ''
      ].join(' ').toLowerCase()
      
      if (!searchFields.includes(searchTerm.toLowerCase())) return false
    }
    return true
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Business Dashboard</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Manage clients, estimates, invoices, and receipts
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCreateClient} onOpenChange={setShowCreateClient}>
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
                  Add a new client to your business
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={newClient.address}
                    onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                    placeholder="Client address"
                  />
                </div>
                <Button onClick={handleCreateClient} className="w-full">
                  Create Client
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showCreateEstimate} onOpenChange={setShowCreateEstimate}>
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
                  Create an estimate for {selectedClient?.name || 'a client'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {!selectedClientId && (
                  <div>
                    <Label htmlFor="client">Client *</Label>
                    <Select value={newEstimate.client_id} onValueChange={(value) => setNewEstimate({ ...newEstimate, client_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {allClients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newEstimate.title}
                    onChange={(e) => setNewEstimate({ ...newEstimate, title: e.target.value })}
                    placeholder="Estimate title"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newEstimate.amount}
                    onChange={(e) => setNewEstimate({ ...newEstimate, amount: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEstimate.description}
                    onChange={(e) => setNewEstimate({ ...newEstimate, description: e.target.value })}
                    placeholder="Estimate description"
                  />
                </div>
                <Button onClick={handleCreateEstimate} className="w-full">
                  Create Estimate
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients, estimates, invoices..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={selectedClientId || 'all'} onValueChange={(value) => setSelectedClientId(value === 'all' ? null : value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Clients" />
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

        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as FilterStatus)}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as FilterType)}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="estimates">Estimates</SelectItem>
            <SelectItem value="invoices">Invoices</SelectItem>
            <SelectItem value="receipts">Receipts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.filter(i => i.status === 'pending').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Estimates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estimates.filter(e => !['rejected', 'converted'].includes(e.status)).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6">
        {filteredData.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      {'title' in item ? item.title : 
                       'invoice_number' in item ? `Invoice ${item.invoice_number}` : 
                       `Receipt ${item.receipt_number}`}
                    </h3>
                    <Badge className={getStatusColor(item.status || 'active')}>
                      {item.status || 'active'}
                    </Badge>
                    <Badge variant="outline">
                      {'invoice_number' in item ? 'Invoice' : 
                       'receipt_number' in item ? 'Receipt' : 'Estimate'}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                    <span>Client: {item.client?.name}</span>
                    <span>Amount: ${item.amount.toFixed(2)}</span>
                    <span>Date: {new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  {item.description && (
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {/* Estimate Actions */}
                  {'title' in item && !('invoice_number' in item) && (
                    <>
                      {item.status === 'approved' && (
                        <Button 
                          size="sm" 
                          onClick={() => convertEstimateToInvoice(item.id)}
                          className="w-full sm:w-auto"
                        >
                          Convert to Invoice
                        </Button>
                      )}
                      {item.status === 'converted' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => undoEstimateConversion(item.id)}
                          className="w-full sm:w-auto"
                        >
                          <Undo className="h-4 w-4 mr-1" />
                          Undo Conversion
                        </Button>
                      )}
                    </>
                  )}

                  {/* Invoice Actions */}
                  {'invoice_number' in item && (
                    <>
                      {item.status === 'pending' && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedInvoiceId(item.id)
                            setShowReceiptDialog(true)
                          }}
                          className="w-full sm:w-auto"
                        >
                          <Receipt className="h-4 w-4 mr-1" />
                          Mark as Paid
                        </Button>
                      )}
                      {item.status !== 'archived' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateInvoiceStatus(item.id, 'archived')}
                          className="w-full sm:w-auto"
                        >
                          <Archive className="h-4 w-4 mr-1" />
                          Archive
                        </Button>
                      )}
                    </>
                  )}

                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredData.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No items found. Create your first client or estimate to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Generate Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Receipt</DialogTitle>
            <DialogDescription>
              Mark the invoice as paid and generate a receipt
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="payment_method">Payment Method</Label>
              <Input
                id="payment_method"
                value={receiptData.payment_method}
                onChange={(e) => setReceiptData({ ...receiptData, payment_method: e.target.value })}
                placeholder="Cash, Card, Bank Transfer, etc."
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={receiptData.notes}
                onChange={(e) => setReceiptData({ ...receiptData, notes: e.target.value })}
                placeholder="Additional notes..."
              />
            </div>
            <Button onClick={handleGenerateReceipt} className="w-full">
              Generate Receipt & Mark as Paid
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
