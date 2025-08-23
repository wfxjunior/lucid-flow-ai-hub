
import { Routes, Route, Navigate } from "react-router-dom"
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { LimitedQuickActions } from "@/components/LimitedQuickActions"
import { InvoiceCreator } from "@/components/InvoiceCreator"
import { MeetingsPage } from "@/components/MeetingsPage"
import { MatTrackPage } from "@/components/MatTrackPage"
import { HelpCenter } from "@/components/HelpCenter"

export function AppRoutes() {
  const handleNavigate = (view: string) => {
    console.log('Navigation requested to:', view)
    // Handle navigation logic here
  }

  return (
    <Routes>
      <Route path="/" element={<ImprovedDashboard onNavigate={handleNavigate} />} />
      <Route path="/dashboard" element={<ImprovedDashboard onNavigate={handleNavigate} />} />
      <Route path="/quick-actions" element={<LimitedQuickActions onActionClick={handleNavigate} />} />
      <Route path="/invoices" element={<InvoiceCreator />} />
      <Route path="/meetings" element={<MeetingsPage />} />
      <Route path="/mattrack" element={<MatTrackPage />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
