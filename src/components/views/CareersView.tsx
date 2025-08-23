
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppIcon } from "@/components/ui/AppIcon"

export function CareersView() {
  return (
    <div className="stripe-page">
      <div className="stripe-page-header">
        <h1 className="stripe-h1">Careers</h1>
        <p className="stripe-subtitle">Join our growing team</p>
      </div>
      
      <div className="stripe-section-gap">
        <Card className="stripe-card">
          <CardHeader className="stripe-card-header">
            <div className="flex items-center gap-3">
              <AppIcon name="Users" size="lg" tone="primary" />
              <div>
                <CardTitle className="stripe-h3">We're Hiring</CardTitle>
                <CardDescription className="stripe-meta">
                  Explore opportunities to grow with FeatherBiz
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="stripe-card-content">
            <p className="stripe-body">
              We're looking for talented individuals to join our team and help build the future of business management software.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
