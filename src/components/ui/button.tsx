import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)] border-0",
        destructive: "bg-danger text-white hover:bg-danger/90 shadow-[0_2px_8px_hsl(var(--fb-danger)/0.3)] hover:shadow-[0_4px_16px_hsl(var(--fb-danger)/0.4)] border-0",
        outline: "border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] border-0",
        ghost: "hover:bg-accent hover:text-accent-foreground border-0 shadow-none",
        link: "text-primary underline-offset-4 hover:underline border-0 shadow-none",
        elevated: "bg-primary text-primary-foreground shadow-[0_4px_16px_hsl(var(--primary)/0.3)] hover:shadow-[0_8px_24px_hsl(var(--primary)/0.4)] hover:bg-primary/90 border-0",
        soft: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]",
        premium: "bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.4)] hover:shadow-[0_8px_32px_hsl(var(--primary)/0.5)] hover:scale-[1.02] border-0",
        success: "bg-success text-white hover:bg-success/90 shadow-[0_2px_8px_hsl(var(--fb-success)/0.3)] hover:shadow-[0_4px_16px_hsl(var(--fb-success)/0.4)] border-0",
        warning: "bg-warning text-white hover:bg-warning/90 shadow-[0_2px_8px_hsl(var(--fb-warning)/0.3)] hover:shadow-[0_4px_16px_hsl(var(--fb-warning)/0.4)] border-0",
      },
      size: {
        xs: "h-8 px-3 text-xs gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5 rounded-lg",
        sm: "h-9 px-3.5 text-sm gap-2 [&_svg]:h-4 [&_svg]:w-4 rounded-lg",
        md: "h-[var(--cta-h)] px-[var(--cta-px)] text-[var(--cta-fs)] font-medium gap-[var(--cta-gap)] [&_svg]:h-4 [&_svg]:w-4 rounded-[var(--cta-radius)]",
        lg: "h-12 px-5 text-base gap-2.5 [&_svg]:h-5 [&_svg]:w-5 rounded-xl",
        xl: "h-14 px-6 text-lg gap-2.5 [&_svg]:h-5 [&_svg]:w-5 rounded-xl",
        icon: "h-9 w-9 rounded-lg",
        default: "h-[var(--cta-h)] px-[var(--cta-px)] text-[var(--cta-fs)] font-medium gap-[var(--cta-gap)] [&_svg]:h-4 [&_svg]:w-4 rounded-[var(--cta-radius)]",
      },
      shape: {
        rounded: "",
        pill: "!rounded-full",
        square: "!rounded-lg",
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
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
