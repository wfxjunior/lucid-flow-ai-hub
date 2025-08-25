
import { ReactNode } from "react"

interface StripePageLayoutProps {
  title: string
  description?: string
  children: ReactNode
  actions?: ReactNode
}

export function StripePageLayout({ 
  title, 
  description, 
  children, 
  actions 
}: StripePageLayoutProps) {
  return (
    <div className="stripe-content">
      <div className="stripe-page-header">
        <div className="stripe-page-title">
          <div>
            <h1>{title}</h1>
            {description && (
              <p className="stripe-page-description">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      </div>
      
      {children}
    </div>
  )
}
