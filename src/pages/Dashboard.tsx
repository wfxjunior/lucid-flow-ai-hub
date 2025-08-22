
import { MainContent } from "@/components/MainContent"
import { useState, useEffect } from "react"
import { useAuthState } from "@/hooks/useAuthState"

export default function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard")
  const { user, loading } = useAuthState()

  useEffect(() => {
    console.log('Dashboard: Rendering with user:', user?.email)
    console.log('Dashboard: Active view:', activeView)
  }, [user, activeView])

  const handleNavigate = (view: string) => {
    console.log('Dashboard: Navigating to view:', view)
    setActiveView(view)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Please sign in</h1>
          <p className="text-muted-foreground">You need to be authenticated to access the dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" data-scope="dashboard">
      <MainContent activeView={activeView} onNavigate={handleNavigate} />
    </div>
  )
}
