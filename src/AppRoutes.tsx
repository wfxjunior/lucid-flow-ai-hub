
import { Routes, Route, Navigate } from "react-router-dom"
import Index from "@/pages/Index"
import Careers from "@/pages/Careers"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
