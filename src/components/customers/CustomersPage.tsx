
import React, { useState } from 'react'
import { useClientsQuery } from '@/hooks/business/useClientsQuery'
import { useBusinessMutations } from '@/hooks/business/useBusinessMutations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Users, Phone, Mail, MapPin } from 'lucide-react'
import { CleanPageLayout } from '@/components/layouts/CleanPageLayout'
import { useToast } from '@/hooks/use-toast'

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: clients = [], isLoading, error } = useClientsQuery()
  const { createClient } = useBusinessMutations()
  const { toast } = useToast()

  const filteredClients = clients.filter(client =>
    client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateClient = async () => {
    try {
      await createClient({
        name: 'New Customer',
        email: 'customer@example.com',
        phone: '',
        address: '',
        status: 'active'
      })
      toast({
        title: 'Success',
        description: 'Customer created successfully',
      })
    } catch (error) {
      toast({
        title: 'Error', 
        description: 'Failed to create customer',
        variant: 'destructive'
      })
    }
  }

  const metrics = [
    {
      title: 'Total Customers',
      value: clients.length.toString(),
      subtitle: 'All time',
      icon: Users
    },
    {
      title: 'Active Customers',
      value: clients.filter(c => c.status === 'active').length.toString(),
      subtitle: 'Currently active',
      icon: Users
    }
  ]

  if (isLoading) {
    return (
      <CleanPageLayout
        title="Customers"
        subtitle="Manage your client relationships"
        actionLabel="Add Customer"
        onActionClick={handleCreateClient}
        metrics={metrics}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading customers...</div>
        </div>
      </CleanPageLayout>
    )
  }

  if (error) {
    return (
      <CleanPageLayout
        title="Customers"
        subtitle="Manage your client relationships"
        actionLabel="Add Customer"
        onActionClick={handleCreateClient}
        metrics={metrics}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-destructive">Error loading customers</div>
        </div>
      </CleanPageLayout>
    )
  }

  return (
    <CleanPageLayout
      title="Customers"
      subtitle="Manage your client relationships"
      actionLabel="Add Customer"
      onActionClick={handleCreateClient}
      metrics={metrics}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredClients.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No customers found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first customer'}
              </p>
              <Button onClick={handleCreateClient}>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredClients.map((client) => (
              <Card key={client.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{client.name}</h3>
                        <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                          {client.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {client.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {client.email}
                          </div>
                        )}
                        {client.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {client.phone}
                          </div>
                        )}
                        {client.address && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {client.address}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </CleanPageLayout>
  )
}
