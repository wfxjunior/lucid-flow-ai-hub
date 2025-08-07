import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowLeft, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileHeaderProps {
  title: string
  subtitle?: string
  backButton?: {
    onClick: () => void
    label?: string
  }
  actions?: ReactNode
  className?: string
}

export function MobileHeader({ 
  title, 
  subtitle, 
  backButton, 
  actions, 
  className 
}: MobileHeaderProps) {
  return (
    <div className={cn(
      "sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="flex h-12 sm:h-14 items-center px-3 sm:px-4 gap-2">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          {backButton ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={backButton.onClick}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">{backButton.label || 'Go back'}</span>
            </Button>
          ) : (
            <SidebarTrigger className="h-8 w-8" />
          )}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-1">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

interface MobileHeaderActionsProps {
  children: ReactNode
}

export function MobileHeaderActions({ children }: MobileHeaderActionsProps) {
  return (
    <div className="flex items-center gap-1">
      {children}
    </div>
  )
}