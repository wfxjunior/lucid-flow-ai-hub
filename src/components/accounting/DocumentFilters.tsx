
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

const documentTypes = [
  { value: 'receipt', label: 'Receipt' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'expense', label: 'Expense Report' },
  { value: 'contract', label: 'Contract' },
  { value: 'tax_document', label: 'Tax Document' },
  { value: 'bank_statement', label: 'Bank Statement' },
  { value: 'other', label: 'Other' }
]

const categories = [
  'Office Supplies',
  'Travel & Transportation',
  'Meals & Entertainment',
  'Software & Subscriptions',
  'Equipment & Hardware',
  'Marketing & Advertising',
  'Professional Services',
  'Utilities',
  'Rent & Facilities',
  'Insurance',
  'Taxes',
  'Other'
]

interface DocumentFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  selectedType: string
  onTypeChange: (value: string) => void
}

export function DocumentFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange
}: DocumentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search documents, vendors, or categories..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {documentTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
