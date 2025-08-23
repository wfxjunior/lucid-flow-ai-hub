
import React, { useState } from 'react'
import { DashboardHeader } from './DashboardHeader'
import { DashboardMetrics } from './DashboardMetrics'
import { DashboardStats } from './DashboardStats'

interface DashboardViewProps {
  onNavigate: (view: string) => void
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const stats = {
    monthlyRevenue: 45000,
    activeCustomers: 128,
    pendingInvoices: 12,
    monthlyGoals: 85
  }

  return (
    <div className="stripe-dashboard" data-scope="dashboard">
      <DashboardHeader 
        onNavigate={onNavigate}
        onRefresh={handleRefresh}
        loading={loading}
        error={error}
      />
      
      <div className="stripe-section-gap">
        <DashboardStats stats={stats} loading={loading} />
      </div>
      
      <div className="stripe-section-gap">
        <DashboardMetrics />
      </div>
    </div>
  )
}
