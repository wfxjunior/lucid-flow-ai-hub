import { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MobileTableProps {
  children: ReactNode
  className?: string
}

interface MobileTableItemProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

interface MobileTableHeaderProps {
  title: string
  subtitle?: string
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
    className?: string
  }
  actions?: ReactNode
}

interface MobileTableContentProps {
  children: ReactNode
}

interface MobileTableFieldProps {
  label: string
  value: ReactNode
  className?: string
}

export function MobileTable({ children, className }: MobileTableProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {children}
    </div>
  )
}

export function MobileTableItem({ children, className, onClick }: MobileTableItemProps) {
  return (
    <Card 
      className={cn(
        "p-4 hover:shadow-md transition-shadow",
        onClick && "cursor-pointer hover:bg-muted/50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  )
}

export function MobileTableHeader({ title, subtitle, badge, actions }: MobileTableHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-base truncate">{title}</h3>
          {badge && (
            <Badge 
              variant={badge.variant || "default"} 
              className={cn("text-xs", badge.className)}
            >
              {badge.text}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-1 ml-2">
          {actions}
        </div>
      )}
    </div>
  )
}

export function MobileTableContent({ children }: MobileTableContentProps) {
  return (
    <div className="space-y-2">
      {children}
    </div>
  )
}

export function MobileTableField({ label, value, className }: MobileTableFieldProps) {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="text-sm font-medium ml-2 text-right flex-1 truncate">
        {value}
      </span>
    </div>
  )
}

// Grid layout for 2-column fields on mobile
export function MobileTableFieldGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {children}
    </div>
  )
}

// Compact field for inline display
export function MobileTableFieldInline({ label, value, className }: MobileTableFieldProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className="text-xs font-medium">{value}</span>
    </div>
  )
}