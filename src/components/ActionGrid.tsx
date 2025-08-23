
import { QuickActionCard } from "@/components/QuickActionCard"
import { AppIcon } from "@/components/ui/AppIcon"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: keyof typeof import('lucide-react')
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
          <AppIcon name="Search" size="xl" tone="default" className="mx-auto opacity-50" aria-hidden={true} />
          <p>No actions found matching "{searchTerm}"</p>
          <p className="text-sm">Try adjusting your search terms</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
