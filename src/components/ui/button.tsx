
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "fb-button inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground border-0 shadow-none bg-transparent",
        link: "text-primary underline-offset-4 hover:underline border-0 shadow-none bg-transparent h-auto p-0",
        elevated: "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90",
        soft: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15",
        premium: "bg-primary text-primary-foreground hover:bg-primary/90",
        success: "bg-emerald-600 text-white hover:bg-emerald-700",
        warning: "bg-amber-600 text-white hover:bg-amber-700",
      },
      size: {
        xs: "h-8 px-3 fb-text-xs gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5",
        sm: "h-9 px-3 fb-text-sm gap-1.5 [&_svg]:h-4 [&_svg]:w-4",
        md: "h-10 px-4 fb-text-base gap-2 [&_svg]:h-4 [&_svg]:w-4",
        lg: "h-11 px-8 fb-text-lg gap-2 [&_svg]:h-5 [&_svg]:w-5",
        xl: "h-14 px-6 fb-text-lg gap-2.5 [&_svg]:h-5 [&_svg]:w-5",
        icon: "h-10 w-10",
        default: "h-10 px-4 fb-text-base gap-2 [&_svg]:h-4 [&_svg]:w-4",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        data-component="button"
        data-variant={variant}
        data-size={size}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
