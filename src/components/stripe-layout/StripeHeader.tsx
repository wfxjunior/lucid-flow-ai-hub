
import { Search, Bell, Settings, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StripeHeaderProps {
  title?: string
  searchPlaceholder?: string
  showAddButton?: boolean
  onAddClick?: () => void
  addButtonLabel?: string
}

export function StripeHeader({ 
  title = "", 
  searchPlaceholder = "Search...",
  showAddButton = false,
  onAddClick,
  addButtonLabel = "Add"
}: StripeHeaderProps) {
  return (
    <header className="stripe-header">
      <div className="flex items-center gap-4 flex-1">
        {title && <h1 className="text-lg font-semibold text-foreground">{title}</h1>}
        
        <div className="search-container">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            className="stripe-search"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {showAddButton && (
          <button 
            onClick={onAddClick}
            className="stripe-button-primary"
          >
            <Plus className="w-4 h-4" />
            {addButtonLabel}
          </button>
        )}
        
        <Button variant="ghost" size="sm">
          <Bell className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
