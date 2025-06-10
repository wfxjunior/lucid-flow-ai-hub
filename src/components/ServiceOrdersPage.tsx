
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Wrench, DollarSign, Calendar, User } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function ServiceOrdersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [serviceOrders, setServiceOrders] = useState([
    {
      id: 1,
      orderNumber: 'SRV-001',
      client: 'ABC Corporation',
      title: 'System Maintenance',
      serviceType: 'maintenance',
      amount: 800,
      status: 'in-progress',
      orderDate: '2024-01-10',
      scheduledDate: '2024-01-15'
    },
    {
      id: 2,
      orderNumber: 'SRV-002',
      client: 'XYZ Limited',
      title: 'Network Setup',
      serviceType: 'installation',
      amount: 1200,
      status: 'scheduled',
      orderDate: '2024-01-08',
      scheduledDate: '2024-01-20'
    }
  ])

  const [formData, setFormData] = useState({
    client: '',
    title: '',
    serviceType: '',
    description: '',
    amount: '',
    scheduledDate: ''
  })

  const clients = ['ABC Corporation', 'XYZ Limited', 'Tech Solutions', 'Future Corp']
  const serviceTypes = ['maintenance', 'installation', 'repair', 'consultation', 'support']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.client || !formData.title || !formData.serviceType || !formData.amount) {
      toast.error('Please fill in all required fields')
      return
    }

    const newOrder = {
      id: serviceOrders.length + 1,
      orderNumber: `SRV-${String(serviceOrders.length + 1).padStart(3, '0')}`,
      client: formData.client,
      title: formData.title,
      serviceType: formData.serviceType,
      amount: parseFloat(formData.amount),
      status: 'scheduled',
      orderDate: new Date().toISOString().split('T')[0],
      scheduledDate: formData.scheduledDate
    }
    
    setServiceOrders([newOrder, ...serviceOrders])
    setFormData({
      client: '',
      title: '',
      serviceType: '',
      description: '',
      amount: '',
      scheduledDate: ''
    })
    setIsDialogOpen(false)
    toast.success('Service order created successfully!')
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      scheduled: "bg-blue-100 text-blue-800",
      'in-progress': "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Orders</h1>
          <p className="text-muted-foreground">
            Manage service requests and track completion
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Service Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Service Order</DialogTitle>
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
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Service Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter service title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter service description..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Service Fee *</Label>
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

                <div>
                  <Label htmlFor="scheduledDate">Scheduled Date</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Create Service Order</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceOrders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serviceOrders.filter(o => o.status === 'in-progress').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serviceOrders.filter(o => o.status === 'scheduled').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${serviceOrders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>All Service Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Wrench className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{order.title}</h3>
                    <p className="text-sm text-gray-600">{order.client} • {order.orderNumber}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusBadge(order.status)}>
                        {order.status.replace('-', ' ').charAt(0).toUpperCase() + order.status.replace('-', ' ').slice(1)}
                      </Badge>
                      <span className="text-xs text-gray-500 capitalize">
                        {order.serviceType}
                      </span>
                      <span className="text-xs text-gray-500">
                        • Created: {order.orderDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${order.amount.toFixed(2)}</p>
                  {order.scheduledDate && (
                    <p className="text-sm text-gray-500">Scheduled: {order.scheduledDate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
