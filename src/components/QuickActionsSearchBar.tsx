
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface QuickActionsSearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function QuickActionsSearchBar({ searchTerm, onSearchChange }: QuickActionsSearchBarProps) {
  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder="Search quick actions..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 border-border/50 focus:border-primary"
      />
    </div>
  )
}
