
import React from 'react'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'
export type IconTone = 'default' | 'primary' | 'success' | 'warning' | 'danger'

interface AppIconProps {
  name: keyof typeof LucideIcons
  size?: IconSize
  tone?: IconTone
  className?: string
  withContainer?: boolean
  'aria-hidden'?: boolean
  'aria-label'?: string
  title?: string
}

const sizeMap: Record<IconSize, number> = {
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
}

const toneMap: Record<IconTone, string> = {
  default: 'text-muted-foreground',
  primary: 'text-primary',
  success: 'text-green-600',
  warning: 'text-amber-600',
  danger: 'text-red-600',
}

export function AppIcon({
  name,
  size = 'md',
  tone = 'default',
  className,
  withContainer = false,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
  title,
  ...props
}: AppIconProps) {
  const IconComponent = LucideIcons[name] as React.ComponentType<LucideIcons.LucideProps>
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`)
    return null
  }

  const iconElement = (
    <IconComponent
      size={sizeMap[size]}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(toneMap[tone], className)}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      title={title}
      {...props}
    />
  )

  if (withContainer) {
    return (
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center hover:ring-1 hover:ring-primary/30 transition-all">
        {iconElement}
      </div>
    )
  }

  return iconElement
}
