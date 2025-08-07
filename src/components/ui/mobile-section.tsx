import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MobileSectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg"
  card?: boolean
}

export function MobileSection({ 
  title, 
  description, 
  children, 
  className, 
  padding = "md",
  card = false 
}: MobileSectionProps) {
  const paddingClasses = {
    none: "",
    sm: "p-2",
    md: "p-3 sm:p-4",
    lg: "p-4 sm:p-6"
  }

  const content = (
    <div className={cn(paddingClasses[padding], className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  )

  if (card) {
    return (
      <Card className={className}>
        {(title || description) && (
          <CardHeader className="pb-3">
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className={cn(paddingClasses[padding])}>
          {children}
        </CardContent>
      </Card>
    )
  }

  return content
}

interface MobileGridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  className?: string
}

export function MobileGrid({ children, cols = 2, gap = "md", className }: MobileGridProps) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  }

  const gapClasses = {
    sm: "gap-2",
    md: "gap-3 sm:gap-4",
    lg: "gap-4 sm:gap-6"
  }

  return (
    <div className={cn(
      "grid",
      gridClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

interface MobileStackProps {
  children: ReactNode
  gap?: "sm" | "md" | "lg"
  className?: string
}

export function MobileStack({ children, gap = "md", className }: MobileStackProps) {
  const gapClasses = {
    sm: "space-y-2",
    md: "space-y-3 sm:space-y-4",
    lg: "space-y-4 sm:space-y-6"
  }

  return (
    <div className={cn(gapClasses[gap], className)}>
      {children}
    </div>
  )
}