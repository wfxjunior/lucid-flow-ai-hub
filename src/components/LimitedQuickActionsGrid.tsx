
import { useState } from "react"
import { QuickActionCard } from "@/components/QuickActionCard"
import { Button } from "@/components/ui/button"
import { Search, ChevronDown, ChevronUp, Grid3X3 } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  hoverColor: string
}

interface LimitedQuickActionsGridProps {
  actions: QuickAction[]
  onActionClick: (actionId: string) => void
  searchTerm: string
}

export function LimitedQuickActionsGrid({ actions, onActionClick, searchTerm }: LimitedQuickActionsGridProps) {
  const [showAll, setShowAll] = useState(false)
  
  // Calculate how many actions to show (3 rows of 4 = 12 actions max when collapsed)
  const actionsPerRow = 4
  const maxRows = 3
  const maxVisibleActions = actionsPerRow * maxRows
  
  const visibleActions = showAll ? actions : actions.slice(0, maxVisibleActions)
  const hasMoreActions = actions.length > maxVisibleActions

  if (actions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-muted-foreground space-y-4">
          <div className="p-4 rounded-full bg-muted/20 w-16 h-16 mx-auto flex items-center justify-center">
            <Search className="h-8 w-8 opacity-50" />
          </div>
          <div>
            <p className="text-lg font-medium">No actions found</p>
            <p className="text-sm">No actions match "{searchTerm}". Try adjusting your search terms.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Grid3X3 className="h-4 w-4" />
        <span>Quick Actions Grid</span>
      </div>

      {/* Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleActions.map((action) => (
          <QuickActionCard
            key={action.id}
            id={action.id}
            title={action.title}
            description={action.description}
            icon={action.icon}
            color={action.color}
            onClick={onActionClick}
          />
        ))}
      </div>
      
      {/* Show More/Less Button */}
      {hasMoreActions && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-2 border-2 hover:bg-primary/5 transition-all duration-200"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show All ({actions.length - maxVisibleActions} more)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
