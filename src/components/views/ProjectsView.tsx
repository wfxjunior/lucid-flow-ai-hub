
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppIcon } from "@/components/ui/AppIcon"
import { Button } from "@/components/ui/button"

export function ProjectsView() {
  return (
    <div className="stripe-page">
      <div className="stripe-page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="stripe-h1">Projects</h1>
            <p className="stripe-subtitle">Track and manage your projects</p>
          </div>
          <Button className="stripe-btn-primary">
            <AppIcon name="Plus" size="sm" />
            New Project
          </Button>
        </div>
      </div>
      
      <div className="stripe-section-gap">
        <Card className="stripe-card">
          <CardHeader className="stripe-card-header">
            <CardTitle className="stripe-h3">Project Overview</CardTitle>
            <CardDescription className="stripe-meta">
              Monitor project progress and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent className="stripe-card-content">
            <div className="stripe-empty-state">
              <AppIcon name="Briefcase" size="xl" tone="default" />
              <p className="stripe-body mt-4">No projects yet</p>
              <p className="stripe-meta">Create your first project to begin tracking</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
