
import { useState } from "react"
import { QuickActionsSearchBar } from "@/components/QuickActionsSearchBar"
import { ActionGrid } from "@/components/ActionGrid"
import { limitedQuickActions } from "@/components/quick-actions/limitedQuickActions"

interface LimitedQuickActionsProps {
  onActionClick: (actionId: string) => void
}

export function LimitedQuickActions({ onActionClick }: LimitedQuickActionsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredActions = limitedQuickActions.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleActionClick = (actionId: string) => {
    console.log('LimitedQuickActions: Action clicked:', actionId)
    onActionClick(actionId)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
      </div>
      
      <QuickActionsSearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <ActionGrid 
        actions={filteredActions}
        onActionClick={handleActionClick}
        searchTerm={searchTerm}
      />
    </div>
  )
}
