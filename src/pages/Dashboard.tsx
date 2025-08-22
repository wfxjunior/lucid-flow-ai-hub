
import { MainContent } from "@/components/MainContent"
import { useState } from "react"

export default function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard")

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  return (
    <div className="min-h-screen bg-background" data-scope="dashboard">
      <MainContent activeView={activeView} onNavigate={handleNavigate} />
    </div>
  )
}
