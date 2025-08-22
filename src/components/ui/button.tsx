
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        elevated: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90",
        soft: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15",
        premium: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md hover:shadow-lg",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
        warning: "bg-orange-600 text-white hover:bg-orange-700 shadow-sm",
      },
      size: {
        xs: "h-8 px-3 text-xs gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5",
        sm: "h-9 px-4 text-sm gap-2 [&_svg]:h-4 [&_svg]:w-4",
        md: "h-10 px-6 text-sm gap-2 [&_svg]:h-4 [&_svg]:w-4",
        lg: "h-11 px-8 text-base gap-2.5 [&_svg]:h-5 [&_svg]:w-5",
        xl: "h-14 px-10 text-lg gap-3 [&_svg]:h-6 [&_svg]:w-6",
        icon: "h-10 w-10",
        default: "h-10 px-6 text-sm gap-2 [&_svg]:h-4 [&_svg]:w-4",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
