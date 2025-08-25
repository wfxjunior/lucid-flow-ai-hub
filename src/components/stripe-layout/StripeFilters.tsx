
import { ReactNode } from "react"

interface Filter {
  id: string
  label: string
  icon?: ReactNode
  active?: boolean
}

interface StripeFiltersProps {
  filters: Filter[]
  onFilterClick: (filterId: string) => void
}

export function StripeFilters({ filters, onFilterClick }: StripeFiltersProps) {
  return (
    <div className="stripe-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`stripe-filter-chip ${filter.active ? 'active' : ''}`}
          onClick={() => onFilterClick(filter.id)}
        >
          {filter.icon}
          {filter.label}
        </button>
      ))}
    </div>
  )
}
