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
  Plus, ShoppingCart, DollarSign, Calendar, User, MoreHorizontal, 
  Printer, Filter, Edit, Copy, Download, Archive, Trash2, Eye, Send
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function SalesOrdersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'SO-001',
      client: 'ABC Corporation',
      title: 'Website Development Package',
      amount: 5000,
      status: 'confirmed',
      orderDate: '2024-01-10',
      deliveryDate: '2024-02-10'
    },
    {
      id: 2,
      orderNumber: 'SO-002',
      client: 'XYZ Limited',
      title: 'Mobile App Development',
      amount: 7500,
      status: 'processing',
      orderDate: '2024-01-08',
      deliveryDate: '2024-03-08'
    }
  ])

  const [formData, setFormData] = useState({
    client: '',
    title: '',
    description: '',
    amount: '',
    deliveryDate: ''
  })

  const clients = ['ABC Corporation', 'XYZ Limited', 'Tech Solutions', 'Future Corp']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.client || !formData.title || !formData.amount) {
      toast.error('Please fill in all required fields')
      return
    }

    const newOrder = {
      id: orders.length + 1,
      orderNumber: `SO-${String(orders.length + 1).padStart(3, '0')}`,
      client: formData.client,
      title: formData.title,
      amount: parseFloat(formData.amount),
      status: 'confirmed',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: formData.deliveryDate
    }
    
    setOrders([newOrder, ...orders])
    setFormData({
      client: '',
      title: '',
      description: '',
      amount: '',
      deliveryDate: ''
    })
    setIsDialogOpen(false)
    toast.success('Sales order created successfully!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'shipped': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'archived': return 'bg-gray-100 text-gray-600'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDisplay = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const filteredOrders = orders.filter(order => 
    statusFilter === "all" || order.status === statusFilter
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
          <h1 className="text-3xl font-bold tracking-tight">Sales Orders</h1>
          <p className="text-muted-foreground">
            Track and manage all your sales orders
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Sales Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Sales Order</DialogTitle>
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
                  <Label htmlFor="title">Order Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter order title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter order description..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Create Sales Order</Button>
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
          <StatusFilterButton status="confirmed" label="Confirmed" />
          <StatusFilterButton status="processing" label="Processing" />
          <StatusFilterButton status="shipped" label="Shipped" />
          <StatusFilterButton status="delivered" label="Delivered" />
          <StatusFilterButton status="cancelled" label="Cancelled" />
          <StatusFilterButton status="archived" label="Archived" />
        </div>
      )}

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">No sales orders found</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>{order.client}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.deliveryDate || '-'}</TableCell>
                    <TableCell className="font-medium">
                      ${order.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusDisplay(order.status)}
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
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Send
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
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
          {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
        </div>
        <div className="flex gap-4">
          <span>Total: ${filteredOrders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}