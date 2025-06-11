
import { useState } from "react"
import { QuickActionsSearchBar } from "@/components/QuickActionsSearchBar"
import { ActionGrid } from "@/components/ActionGrid"
import { getAllQuickActions } from "./quick-actions/quickActionsData"
import { filterActions } from "./quick-actions/quickActionsUtils"

interface QuickActionsProps {
  onActionClick: (actionId: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const quickActions = getAllQuickActions()
  const filteredActions = filterActions(quickActions, searchTerm)

  return (
    <div className="space-y-6">
      <QuickActionsSearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <ActionGrid 
        actions={filteredActions}
        onActionClick={onActionClick}
        searchTerm={searchTerm}
      />
    </div>
  )
}
