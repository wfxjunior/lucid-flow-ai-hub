import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  Plus, FileText, DollarSign, Search, Filter, Mail, CheckCircle, 
  Clock, Download, Copy, MoreHorizontal, Printer, Eye, Archive, Trash2, Receipt
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
  const [showFilters, setShowFilters] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Receipts</h1>
          <p className="text-muted-foreground">
            Track and manage all your receipts
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
          <StatusFilterButton status="paid" label="Paid" />
          <StatusFilterButton status="pending" label="Pending" />
          <StatusFilterButton status="archived" label="Archived" />
        </div>
      )}

      {/* Receipts Table */}
      <Card>
        <CardContent className="p-0">
          {filteredReceipts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">No receipts found</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">
                      {receipt.receipt_number}
                    </TableCell>
                    <TableCell>{receipt.clients?.name || 'Unknown'}</TableCell>
                    <TableCell>
                      {new Date(receipt.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{receipt.payment_method}</TableCell>
                    <TableCell className="font-medium">
                      ${receipt.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(receipt.status || 'pending')}>
                        {getStatusDisplay(receipt.status || 'pending')}
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGeneratePDF(receipt)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download/Print PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleStatusChange(receipt.id, receipt.status === 'paid' ? 'pending' : 'paid')}>
                            {receipt.status === 'paid' ? (
                              <>
                                <Clock className="mr-2 h-4 w-4" />
                                Mark as Pending
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Paid
                              </>
                            )}
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Footer Stats */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          {filteredReceipts.length} receipt{filteredReceipts.length !== 1 ? 's' : ''} found
        </div>
        <div className="flex gap-4">
          <span>Total: ${filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}