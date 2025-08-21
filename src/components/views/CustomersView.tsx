
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users } from 'lucide-react'

export function CustomersView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Management
          </CardTitle>
          <CardDescription>View and manage your customer database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No customers yet</h3>
            <p className="text-muted-foreground">Add your first customer to get started</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
