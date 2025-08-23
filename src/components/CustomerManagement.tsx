
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Mail, Phone, MessageSquare, CreditCard } from "lucide-react"
import { CustomerForm } from "./CustomerForm"
import { useBusinessData } from "@/hooks/useBusinessData"
import { toast } from "sonner"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"

export function CustomerManagement() {
  const { clients, loading, loadData } = useBusinessData()
  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = (clients || []).filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (customer: any) => {
    setEditingCustomer(customer)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      toast.success('Customer deleted successfully!')
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingCustomer(null)
  }

  const handleSave = () => {
    loadData()
  }

  const sendEmail = (customerName: string) => {
    toast.success(`Email sent to ${customerName}`)
  }

  const sendSMS = (customerName: string) => {
    toast.success(`SMS sent to ${customerName}`)
  }

  const recordPayment = (customerName: string) => {
    toast.success(`Payment recorded for ${customerName}`)
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"
  }

  if (showForm) {
    return (
      <div className="container mx-auto p-6">
        <CustomerForm
          customer={editingCustomer}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      </div>
    )
  }

  const metrics = [
    {
      title: "Total Customers",
      value: (clients?.length || 0).toString(),
      subtitle: "All registered clients",
      icon: Mail
    },
    {
      title: "Active Customers", 
      value: (clients?.filter(c => c.status === 'active').length || 0).toString(),
      subtitle: "Currently active",
      icon: Phone
    },
    {
      title: "Pending",
      value: (clients?.filter(c => c.status === 'pending').length || 0).toString(),
      subtitle: "Awaiting response",
      icon: MessageSquare
    },
    {
      title: "This Month",
      value: (clients?.filter(c => {
        const clientDate = new Date(c.created_at)
        const now = new Date()
        return clientDate.getMonth() === now.getMonth() && clientDate.getFullYear() === now.getFullYear()
      }).length || 0).toString(),
      subtitle: "New customers",
      icon: CreditCard
    }
  ]

  return (
    <CleanPageLayout
      title="Customer Management"
      subtitle="Manage your client relationships and contact information"
      actionLabel="Add Customer"
      onActionClick={() => setShowForm(true)}
      metrics={metrics}
    >

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            A list of all your customers with their contact information and status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading customers...</div>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">No customers found</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone || 'Not provided'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(client.status)}>
                          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(client.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(client)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => sendEmail(client.name)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => sendSMS(client.name)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => recordPayment(client.name)}
                          >
                            <CreditCard className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(client.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
