
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "btn-primary",
        destructive: "btn-primary bg-danger hover:bg-danger/90",
        outline: "btn-outline",
        secondary: "btn-outline",
        ghost: "hover:bg-accent hover:text-accent-foreground border-0 shadow-none bg-transparent",
        link: "text-primary underline-offset-4 hover:underline border-0 shadow-none bg-transparent h-auto p-0",
        elevated: "btn-primary shadow-[0_8px_24px_hsl(var(--primary)/0.4)]",
        soft: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15",
        premium: "btn-primary bg-gradient-to-r from-primary via-primary to-primary/80",
        success: "btn-primary bg-success hover:bg-success/90",
        warning: "btn-primary bg-warning hover:bg-warning/90",
      },
      size: {
        xs: "btn-sm h-8 px-3 text-xs gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5 rounded-lg",
        sm: "btn-sm rounded-lg",
        md: "btn-md rounded-lg",
        lg: "btn-lg rounded-lg",
        xl: "btn-lg h-14 px-6 text-lg gap-2.5 [&_svg]:h-5 [&_svg]:w-5 rounded-lg",
        icon: "h-9 w-9 rounded-lg",
        default: "btn-md rounded-lg",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-lg", // Override pill to use moderate rounded
        square: "rounded-lg", // Override square to use moderate rounded
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
