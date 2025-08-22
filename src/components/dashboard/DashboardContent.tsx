
import React from 'react'
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { BusinessDashboard } from "@/components/BusinessDashboard"

interface DashboardContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function DashboardContent({ activeView, onNavigate }: DashboardContentProps) {
  console.log('DashboardContent: Active view is', activeView)

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
      case 'dashboard':
        return <ImprovedDashboard onNavigate={onNavigate} />
      case 'analytics':
        return <AnalyticsDashboard />
      case 'business':
        return <BusinessDashboard onNavigate={onNavigate} />
      case 'invoices':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">Invoices</h1>
            <p className="text-slate-600">Invoice management coming soon...</p>
          </div>
        )
      case 'appointments':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">Appointments</h1>
            <p className="text-slate-600">Appointment scheduling coming soon...</p>
          </div>
        )
      case 'payments':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">Payments</h1>
            <p className="text-slate-600">Payment tracking coming soon...</p>
          </div>
        )
      case 'customers':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">Customers</h1>
            <p className="text-slate-600">Customer management coming soon...</p>
          </div>
        )
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">Settings</h1>
            <p className="text-slate-600">Settings panel coming soon...</p>
          </div>
        )
      default:
        return <ImprovedDashboard onNavigate={onNavigate} />
    }
  }

  return (
    <div className="w-full h-full bg-white">
      {renderContent()}
    </div>
  )
}
