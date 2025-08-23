
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppIcon } from "@/components/ui/AppIcon"
import { Button } from "@/components/ui/button"

export function CustomersView() {
  return (
    <div className="stripe-page">
      <div className="stripe-page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="stripe-h1">Customers</h1>
            <p className="stripe-subtitle">Manage your client relationships</p>
          </div>
          <Button className="stripe-btn-primary">
            <AppIcon name="Plus" size="sm" />
            Add Customer
          </Button>
        </div>
      </div>
      
      <div className="stripe-section-gap">
        <Card className="stripe-card">
          <CardHeader className="stripe-card-header">
            <CardTitle className="stripe-h3">Customer Overview</CardTitle>
            <CardDescription className="stripe-meta">
              Track and manage your customer base
            </CardDescription>
          </CardHeader>
          <CardContent className="stripe-card-content">
            <div className="stripe-empty-state">
              <AppIcon name="Users" size="xl" tone="default" />
              <p className="stripe-body mt-4">No customers yet</p>
              <p className="stripe-meta">Add your first customer to get started</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
