
import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface GenericViewProps {
  title: string
  description: string
  icon: LucideIcon
  children?: React.ReactNode
}

export function GenericView({ title, description, icon: Icon, children }: GenericViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{title} Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              This feature is currently under development. We're working hard to bring you {description.toLowerCase()}.
            </p>
          </div>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}
