
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppIcon } from "@/components/ui/AppIcon"

export function FinanceView() {
  return (
    <div className="stripe-page">
      <div className="stripe-page-header">
        <h1 className="stripe-h1">Finance</h1>
        <p className="stripe-subtitle">Financial overview and management</p>
      </div>
      
      <div className="stripe-grid">
        <Card className="stripe-card">
          <CardHeader className="stripe-card-header">
            <div className="flex items-center gap-3">
              <AppIcon name="DollarSign" size="md" tone="primary" />
              <CardTitle className="stripe-h3">Revenue</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="stripe-card-content">
            <div className="stripe-metric">$0.00</div>
            <p className="stripe-meta">This month</p>
          </CardContent>
        </Card>

        <Card className="stripe-card">
          <CardHeader className="stripe-card-header">
            <div className="flex items-center gap-3">
              <AppIcon name="Receipt" size="md" tone="primary" />
              <CardTitle className="stripe-h3">Invoices</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="stripe-card-content">
            <div className="stripe-metric">0</div>
            <p className="stripe-meta">Outstanding</p>
          </CardContent>
        </Card>

        <Card className="stripe-card">
          <CardHeader className="stripe-card-header">
            <div className="flex items-center gap-3">
              <AppIcon name="TrendingUp" size="md" tone="primary" />
              <CardTitle className="stripe-h3">Growth</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="stripe-card-content">
            <div className="stripe-metric">0%</div>
            <p className="stripe-meta">vs last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
