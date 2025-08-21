import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border-0",
        secondary:
          "bg-muted text-muted-foreground border-0",
        destructive:
          "bg-destructive/10 text-destructive border-0",
        success:
          "bg-success/10 text-success border-0",
        warning:
          "bg-warning/10 text-warning border-0",
        outline: "text-foreground border border-border",
        pending: "bg-gray-100 text-gray-700 border-0",
        approved: "bg-primary/10 text-primary border-0",
        declined: "bg-red-50 text-red-700 border-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
