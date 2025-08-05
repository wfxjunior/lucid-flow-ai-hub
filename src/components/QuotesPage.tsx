import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  Plus, FileText, DollarSign, Calendar, User, Eye, Send, MoreHorizontal, 
  Printer, Filter, Edit, Copy, Download, Archive, Trash2, Calculator
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"

export function QuotesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const { generateEstimatePDF, isGenerating } = usePDFGeneration()
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      quoteNumber: 'QUO-001',
      client: 'ABC Corporation',
      title: 'Website Development',
      amount: 5000,
      status: 'pending',
      createdDate: '2024-01-10',
      validUntil: '2024-02-10'
    },
    {
      id: 2,
      quoteNumber: 'QUO-002',
      client: 'XYZ Limited',
      title: 'Mobile App Design',
      amount: 3500,
      status: 'accepted',
      createdDate: '2024-01-08',
      validUntil: '2024-02-08'
    }
  ])

  const [formData, setFormData] = useState({
    client: '',
    title: '',
    description: '',
    amount: '',
    validUntil: ''
  })

  const clients = ['ABC Corporation', 'XYZ Limited', 'Tech Solutions', 'Future Corp']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.client || !formData.title || !formData.amount) {
      toast.error('Please fill in all required fields')
      return
    }

    const newQuote = {
      id: quotes.length + 1,
      quoteNumber: `QUO-${String(quotes.length + 1).padStart(3, '0')}`,
      client: formData.client,
      title: formData.title,
      amount: parseFloat(formData.amount),
      status: 'pending',
      createdDate: new Date().toISOString().split('T')[0],
      validUntil: formData.validUntil
    }
    
    setQuotes([newQuote, ...quotes])
    setFormData({
      client: '',
      title: '',
      description: '',
      amount: '',
      validUntil: ''
    })
    setIsDialogOpen(false)
    toast.success('Quote created successfully!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-orange-100 text-orange-800'
      case 'archived': return 'bg-gray-100 text-gray-600'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDisplay = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const handleViewPDF = async (quote: any) => {
    try {
      const quoteData = {
        id: quote.id,
        quote_number: quote.quoteNumber,
        title: quote.title,
        description: '',
        amount: quote.amount,
        quote_date: quote.createdDate,
        valid_until: quote.validUntil,
        status: quote.status,
        line_items: [
          {
            name: quote.title,
            description: '',
            quantity: 1,
            rate: quote.amount,
            total: quote.amount
          }
        ],
        client: {
          name: quote.client,
          email: '',
          address: '',
          phone: ''
        }
      }
      
      await generateEstimatePDF(quoteData)
    } catch (error) {
      console.error("Error generating quote PDF:", error)
      toast.error("Failed to generate quote PDF")
    }
  }

  const handleResendQuote = (quote: any) => {
    toast.success(`Quote ${quote.quoteNumber} has been resent to ${quote.client}`)
  }

  const filteredQuotes = quotes.filter(quote => 
    statusFilter === "all" || quote.status === statusFilter
  )

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground">
            Track and manage all your quotes
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Quote</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client *</Label>
                    <Select value={formData.client} onValueChange={(value) => setFormData({ ...formData, client: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client} value={client}>{client}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Amount *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Quote Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter quote title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter quote description..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Create Quote</Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
          <StatusFilterButton status="pending" label="Pending" />
          <StatusFilterButton status="accepted" label="Accepted" />
          <StatusFilterButton status="rejected" label="Rejected" />
          <StatusFilterButton status="expired" label="Expired" />
          <StatusFilterButton status="archived" label="Archived" />
        </div>
      )}

      {/* Quotes Table */}
      <Card>
        <CardContent className="p-0">
          {filteredQuotes.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">No quotes found</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">
                      {quote.quoteNumber}
                    </TableCell>
                    <TableCell>{quote.client}</TableCell>
                    <TableCell>{quote.createdDate}</TableCell>
                    <TableCell>{quote.validUntil || '-'}</TableCell>
                    <TableCell className="font-medium">
                      ${quote.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(quote.status)}>
                        {getStatusDisplay(quote.status)}
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
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResendQuote(quote)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleViewPDF(quote)}
                            disabled={isGenerating}
                          >
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
          {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? 's' : ''} found
        </div>
        <div className="flex gap-4">
          <span>Total: ${filteredQuotes.reduce((sum, quote) => sum + quote.amount, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}