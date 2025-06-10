
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface QuickActionsSearchProps {
  onSearch: (searchTerm: string) => void
}

export function QuickActionsSearch({ onSearch }: QuickActionsSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="text"
        placeholder="Search quick actions..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
