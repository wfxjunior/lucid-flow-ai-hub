
import { Search, Bell, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StripeHeaderProps {
  searchPlaceholder?: string
  showAddButton?: boolean
  addButtonLabel?: string
  onAddClick?: () => void
}

export function StripeHeader({ 
  searchPlaceholder = "Search...", 
  showAddButton = false,
  addButtonLabel = "Add",
  onAddClick 
}: StripeHeaderProps) {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      {/* Left side - Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {showAddButton && (
          <Button 
            onClick={onAddClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {addButtonLabel}
          </Button>
        )}
        
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
