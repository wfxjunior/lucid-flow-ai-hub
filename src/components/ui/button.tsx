
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 overflow-hidden rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 border border-slate-900 rounded-lg",
        destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border border-red-600 rounded-lg",
        outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 rounded-lg",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 border border-slate-200 rounded-lg",
        ghost: "hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 border-0 shadow-none bg-transparent rounded-lg",
        link: "text-slate-600 underline-offset-4 hover:underline hover:text-slate-900 border-0 shadow-none bg-transparent h-auto p-0 rounded-lg",
        elevated: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-lg rounded-lg",
        soft: "bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 active:bg-slate-300 rounded-lg",
        premium: "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white hover:from-slate-800 hover:via-slate-700 hover:to-slate-600 rounded-lg",
        success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 rounded-lg",
        warning: "bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800 rounded-lg",
      },
      size: {
        xs: "h-8 px-3 text-xs gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5 rounded-lg",
        sm: "h-9 px-3 text-sm gap-1.5 [&_svg]:h-4 [&_svg]:w-4 rounded-lg",
        md: "h-10 px-4 text-sm gap-2 [&_svg]:h-4 [&_svg]:w-4 rounded-lg",
        lg: "h-11 px-6 text-base gap-2 [&_svg]:h-5 [&_svg]:w-5 rounded-lg",
        xl: "h-14 px-6 text-lg gap-2.5 [&_svg]:h-5 [&_svg]:w-5 rounded-lg",
        icon: "h-9 w-9 rounded-lg",
        default: "h-10 px-4 text-sm gap-2 [&_svg]:h-4 [&_svg]:w-4 rounded-lg",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-lg",
        square: "rounded-lg",
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
        style={{ borderRadius: '8px' }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
