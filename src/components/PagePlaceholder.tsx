
import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { CleanPageLayout } from '@/components/layouts/CleanPageLayout'

interface PagePlaceholderProps {
  title: string
  subtitle: string
  icon: LucideIcon
  actionLabel?: string
  onActionClick?: () => void
  metrics?: Array<{
    title: string
    value: string
    subtitle: string
    icon: LucideIcon
  }>
}

export function PagePlaceholder({
  title,
  subtitle,
  icon: Icon,
  actionLabel,
  onActionClick,
  metrics = []
}: PagePlaceholderProps) {
  return (
    <CleanPageLayout
      title={title}
      subtitle={subtitle}
      actionLabel={actionLabel}
      onActionClick={onActionClick}
      metrics={metrics}
    >
      <Card>
        <CardContent className="py-12 text-center">
          <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
