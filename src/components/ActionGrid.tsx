
import { QuickActionCard } from "@/components/QuickActionCard"
import { Search } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  hoverColor: string
}

interface ActionGridProps {
  actions: QuickAction[]
  onActionClick: (actionId: string) => void
  searchTerm: string
}

export function ActionGrid({ actions, onActionClick, searchTerm }: ActionGridProps) {
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
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {actions.map((action) => (
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
  )
}
