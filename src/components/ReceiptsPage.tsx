import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Plus, FileText, DollarSign, Search, Filter, Mail, CheckCircle, 
  Clock, Download, Copy, AlertTriangle 
} from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { CreateReceiptDialog } from "./receipts/CreateReceiptDialog"
import { ConvertToReceiptDialog } from "./receipts/ConvertToReceiptDialog"
import { ReceiptEmailDialog } from "./receipts/ReceiptEmailDialog"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"

interface Receipt {
  id: string
  receipt_number: string
  amount: number
  payment_method: string
  notes: string
  created_at: string
  status?: 'paid' | 'pending'
  client_id: string
  invoice_id?: string
  clients?: {
    name: string
    email: string
    phone?: string
    address?: string
  }
}

interface Invoice {
  id: string
  invoice_number: string
  amount: number
  title: string
  description: string
  status: string
  clients?: {
    name: string
    email: string
    phone?: string
    address?: string
  }
}

interface Estimate {
  id: string
  estimate_number: string
  amount: number
  title: string
  description: string
  status: string
  clients?: {
    name: string
    email: string
    phone?: string
    address?: string
  }
}

export function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null)
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null)
  const { generateReceiptPDF } = usePDFGeneration()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch receipts
      const { data: receiptsData, error: receiptsError } = await supabase
        .from('receipts')
        .select(`
          *,
          clients:client_id (
            name,
            email,
            phone,
            address
          )
        `)
        .order('created_at', { ascending: false })

      if (receiptsError) throw receiptsError

      // Fetch invoices for conversion
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select(`
          *,
          clients:client_id (
            name,
            email,
            phone,
            address
          )
        `)
        .order('created_at', { ascending: false })

      if (invoicesError) throw invoicesError

      // Fetch estimates for conversion
      const { data: estimatesData, error: estimatesError } = await supabase
        .from('estimates')
        .select(`
          *,
          clients:client_id (
            name,
            email,
            phone,
            address
          )
        `)
        .order('created_at', { ascending: false })

      if (estimatesError) throw estimatesError

      setReceipts(receiptsData || [])
      setInvoices(invoicesData || [])
      setEstimates(estimatesData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (receiptId: string, newStatus: 'paid' | 'pending') => {
    try {
      const { error } = await supabase
        .from('receipts')
        .update({ status: newStatus })
        .eq('id', receiptId)

      if (error) throw error

      setReceipts(prev => prev.map(receipt => 
        receipt.id === receiptId ? { ...receipt, status: newStatus } : receipt
      ))

      toast.success(`Receipt marked as ${newStatus}`)
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const handleGeneratePDF = async (receipt: Receipt) => {
    try {
      const receiptData = {
        id: receipt.id,
        receipt_number: receipt.receipt_number,
        amount: receipt.amount,
        payment_method: receipt.payment_method,
        notes: receipt.notes,
        created_at: receipt.created_at,
        status: receipt.status || 'paid',
        client: receipt.clients
      }
      
      await generateReceiptPDF(receiptData)
      toast.success('Receipt PDF generated successfully')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF')
    }
  }

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.receipt_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.clients?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.notes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const totalAmount = filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0)
  const paidReceipts = filteredReceipts.filter(r => r.status === 'paid').length
  const pendingReceipts = filteredReceipts.filter(r => r.status === 'pending').length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Receipts</h1>
          <p className="text-muted-foreground">
            Manage receipts, convert invoices and estimates, and track payments
          </p>
        </div>
        <div className="flex gap-2">
          <CreateReceiptDialog 
            isOpen={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            onReceiptCreated={fetchData}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receipts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredReceipts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paidReceipts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingReceipts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Convert Invoices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Convert Invoices to Receipts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {invoices.length === 0 ? (
                <p className="text-sm text-muted-foreground">No invoices available for conversion</p>
              ) : (
                invoices.slice(0, 5).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium text-sm">{invoice.invoice_number}</p>
                      <p className="text-xs text-muted-foreground">{invoice.clients?.name}</p>
                      <p className="text-xs font-medium">${invoice.amount.toFixed(2)}</p>
                    </div>
                    <ConvertToReceiptDialog
                      type="invoice"
                      item={invoice}
                      onReceiptCreated={fetchData}
                    />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Convert Estimates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Convert Estimates to Receipts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {estimates.length === 0 ? (
                <p className="text-sm text-muted-foreground">No estimates available for conversion</p>
              ) : (
                estimates.slice(0, 5).map((estimate) => (
                  <div key={estimate.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium text-sm">{estimate.estimate_number}</p>
                      <p className="text-xs text-muted-foreground">{estimate.clients?.name}</p>
                      <p className="text-xs font-medium">${estimate.amount.toFixed(2)}</p>
                    </div>
                    <ConvertToReceiptDialog
                      type="estimate"
                      item={estimate}
                      onReceiptCreated={fetchData}
                    />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search receipts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Receipts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReceipts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No receipts found</p>
                <p className="text-sm text-muted-foreground">Create a new receipt or convert from invoices/estimates</p>
              </div>
            ) : (
              filteredReceipts.map((receipt) => (
                <div key={receipt.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{receipt.receipt_number}</h3>
                      <p className="text-sm text-muted-foreground">
                        {receipt.clients?.name} • {receipt.payment_method}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusBadge(receipt.status || 'pending')}>
                          {receipt.status || 'pending'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(receipt.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <p className="text-xl font-bold">${receipt.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGeneratePDF(receipt)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <ReceiptEmailDialog receipt={receipt} />
                      <Select
                        value={receipt.status || 'pending'}
                        onValueChange={(value: 'paid' | 'pending') => handleStatusChange(receipt.id, value)}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Paid
                            </div>
                          </SelectItem>
                          <SelectItem value="pending">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-yellow-600" />
                              Pending
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}