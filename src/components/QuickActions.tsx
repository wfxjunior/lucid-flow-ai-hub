
import { useState } from "react"
import { QuickActionsSearchBar } from "@/components/QuickActionsSearchBar"
import { ActionGrid } from "@/components/ActionGrid"
import { quickActionsData } from "@/components/quick-actions/quickActionsData"

interface QuickActionsProps {
  onActionClick: (actionId: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  console.log('QuickActions rendering with data:', quickActionsData)
  console.log('Available actions:', quickActionsData.map(action => action.id))

  const filteredActions = quickActionsData.filter(action =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  console.log('Filtered actions:', filteredActions.length, 'for search term:', searchTerm)

  const handleActionClick = (actionId: string) => {
    console.log('QuickActions: Action clicked:', actionId)
    onActionClick(actionId)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">
          {filteredActions.length} actions available
        </p>
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
