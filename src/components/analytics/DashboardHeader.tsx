
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Last 30 days
        </Button>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
    </div>
  )
}
