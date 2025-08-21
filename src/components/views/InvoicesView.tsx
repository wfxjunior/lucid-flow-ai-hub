
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText } from 'lucide-react'

export function InvoicesView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Create and manage invoices</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Management
          </CardTitle>
          <CardDescription>Track your billing and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No invoices yet</h3>
            <p className="text-muted-foreground">Create your first invoice to start billing</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
