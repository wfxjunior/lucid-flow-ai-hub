
import { useState } from "react"
import { QuickActionCard } from "@/components/QuickActionCard"
import { Button } from "@/components/ui/button"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
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
  
  // Calculate how many actions to show (4 rows of 4 = 16 actions max when collapsed)
  const actionsPerRow = 4
  const maxRows = 4
  const maxVisibleActions = actionsPerRow * maxRows
  
  const visibleActions = showAll ? actions : actions.slice(0, maxVisibleActions)
  const hasMoreActions = actions.length > maxVisibleActions

  if (actions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground space-y-2">
          <Search className="h-8 w-8 mx-auto opacity-50" />
          <p>No actions found matching "{searchTerm}"</p>
          <p className="text-sm">Try adjusting your search terms</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
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
      
      {hasMoreActions && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                See All ({actions.length - maxVisibleActions} more)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
