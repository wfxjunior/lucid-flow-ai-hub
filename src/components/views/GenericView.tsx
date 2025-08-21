
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from 'lucide-react'

interface GenericViewProps {
  title: string
  description: string
  icon: LucideIcon
  content?: React.ReactNode
}

export function GenericView({ title, description, icon: Icon, content }: GenericViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {content || (
            <div className="text-center py-8">
              <Icon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Coming Soon</h3>
              <p className="text-muted-foreground">This feature is under development</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
