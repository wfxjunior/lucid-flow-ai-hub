
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface DocumentFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
}

export function DocumentFilters({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange 
}: DocumentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search documents and signatures..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="sent">Sent</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="signed">Signed</SelectItem>
          <SelectItem value="declined">Declined</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
