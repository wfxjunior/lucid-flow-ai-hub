
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-2 sm:gap-4">
        <SidebarTrigger className="flex-shrink-0" />
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">Analytics Dashboard</h1>
      </div>
      <div className="flex items-center gap-2 sm:space-x-2 flex-shrink-0">
        <Button variant="outline" size="sm" className="text-xs sm:text-sm">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Last 30 days</span>
          <span className="sm:hidden">30d</span>
        </Button>
        <Button variant="outline" size="sm" className="text-xs sm:text-sm">
          Export
        </Button>
      </div>
    </div>
  )
}
