import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Download, Send, Trash2, Edit, FileText, Calendar, DollarSign, User, Building } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { format } from "date-fns"
import { useCompanyData } from "@/hooks/useCompanyData"

interface Invoice {
  id: string
  invoice_number: string
  client_name: string
  invoice_date: string
  due_date: string
  total_amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  notes?: string
  created_at: string
  updated_at: string
}

// Mock data for dropdowns - in real app, fetch from database
const availableClients = [
  'Tech Corp Ltd',
  'Acme Corporation', 
  'Global Industries',
  'Smart Solutions Inc',
  'Modern Enterprises'
]

const invoiceStatusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' }
]

export function InvoiceCreator() {
  const { toast } = useToast()
  const { companyProfile } = useCompanyData()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    invoice_number: '',
    client_name: '',
    invoice_date: format(new Date(), 'yyyy-MM-dd'),
    due_date: format(new Date(), 'yyyy-MM-dd'),
    total_amount: 0,
    status: 'draft',
    notes: ''
  })

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      console.log('Fetching invoices...')
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching invoices:', error)
        throw error
      }
      
      console.log('Fetched invoices:', data)
      setInvoices(data || [])
    } catch (error) {
      console.error('Error fetching invoices:', error)
      toast({
        title: "Error",
        description: "Failed to load invoices",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.invoice_number.trim() || !formData.client_name.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    setSubmitting(true)
    console.log('Submitting invoice with data:', formData)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('Not authenticated')
      }

      // Prepare the invoice data
      const invoiceData = {
        invoice_number: formData.invoice_number.trim(),
        client_name: formData.client_name.trim(),
        invoice_date: formData.invoice_date,
        due_date: formData.due_date,
        total_amount: formData.total_amount,
        status: formData.status,
        notes: formData.notes?.trim() || null,
        user_id: user.id
      }

      if (editingInvoice) {
        // Update existing invoice
        console.log('Updating invoice with ID:', editingInvoice.id)
        const { data, error } = await supabase
          .from('invoices')
          .update({
            ...invoiceData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingInvoice.id)
          .select()

        if (error) {
          console.error('Update error:', error)
          throw error
        }
        
        console.log('Invoice updated successfully:', data)
        toast({
          title: "Success",
          description: "Invoice updated successfully"
        })
      } else {
        // Create new invoice
        console.log('Creating new invoice')
        const { data, error } = await supabase
          .from('invoices')
          .insert([invoiceData])
          .select()

        if (error) {
          console.error('Insert error:', error)
          throw error
        }
        
        console.log('Invoice created successfully:', data)
        toast({
          title: "Success",
          description: "Invoice created successfully"
        })
      }

      await fetchInvoices()
      resetForm()
      setShowCreateForm(false)
    } catch (error) {
      console.error('Error saving invoice:', error)
      toast({
        title: "Error",
        description: `Failed to save invoice: ${error.message}`,
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (invoiceId: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return

    try {
      console.log('Deleting invoice:', invoiceId)
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', invoiceId)

      if (error) {
        console.error('Delete error:', error)
        throw error
      }
      
      console.log('Invoice deleted successfully')
      await fetchInvoices()
      toast({
        title: "Success",
        description: "Invoice deleted successfully"
      })
    } catch (error) {
      console.error('Error deleting invoice:', error)
      toast({
        title: "Error",
        description: "Failed to delete invoice",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setFormData({
      invoice_number: '',
      client_name: '',
      invoice_date: format(new Date(), 'yyyy-MM-dd'),
      due_date: format(new Date(), 'yyyy-MM-dd'),
      total_amount: 0,
      status: 'draft',
      notes: ''
    })
    setEditingInvoice(null)
  }

  const openEditDialog = (invoice: Invoice) => {
    console.log('Opening edit dialog for invoice:', invoice)
    setEditingInvoice(invoice)
    setFormData({
      invoice_number: invoice.invoice_number,
      client_name: invoice.client_name,
      invoice_date: invoice.invoice_date,
      due_date: invoice.due_date,
      total_amount: invoice.total_amount,
      status: invoice.status,
      notes: invoice.notes || ''
    })
    setShowCreateForm(true)
  }

  const filteredInvoices = invoices
    .filter(invoice => {
      const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !filterStatus || filterStatus === 'all' || invoice.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading invoices...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">Manage your invoices and track payments</p>
        </div>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              resetForm()
              setShowCreateForm(true)
            }} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice_number">Invoice Number *</Label>
                  <Input
                    id="invoice_number"
                    value={formData.invoice_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, invoice_number: e.target.value }))}
                    placeholder="Enter invoice number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_name">Client Name *</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                    placeholder="Enter client name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice_date">Invoice Date</Label>
                  <Input
                    id="invoice_date"
                    type="date"
                    value={formData.invoice_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, invoice_date: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="total_amount">Total Amount</Label>
                <Input
                  id="total_amount"
                  type="number"
                  value={formData.total_amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, total_amount: parseFloat(e.target.value) || 0 }))}
                  placeholder="Enter total amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {invoiceStatusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Enter any additional notes"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : (editingInvoice ? 'Update Invoice' : 'Create Invoice')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search invoices by number or client name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {invoiceStatusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      {filteredInvoices.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-600 mb-4">
              {invoices.length === 0 
                ? "Create your first invoice to get started" 
                : "Try adjusting your search or filters"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{invoice.invoice_number} - {invoice.client_name}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(invoice)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(invoice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-gray-600 text-sm">
                  Client: <span className="font-medium">{invoice.client_name}</span>
                </div>
                <div className="text-gray-600 text-sm">
                  Date: <span className="font-medium">{format(new Date(invoice.invoice_date), 'MMM d, yyyy')}</span>
                </div>
                <div className="text-gray-600 text-sm">
                  Due: <span className="font-medium">{format(new Date(invoice.due_date), 'MMM d, yyyy')}</span>
                </div>
                <div className="text-gray-600 text-sm">
                  Amount: <span className="font-medium">${invoice.total_amount.toFixed(2)}</span>
                </div>
                <Badge variant="secondary">{invoice.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
