
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { AppIcon } from '@/components/ui/AppIcon'

const values = [
  {
    icon: 'Rocket',
    title: 'Innovation',
    description: 'We work with cutting-edge technologies and continuously push boundaries to create breakthrough solutions.'
  },
  {
    icon: 'Users',
    title: 'Collaboration',
    description: 'We believe in the power of diverse perspectives and collective intelligence to solve complex challenges.'
  },
  {
    icon: 'Target',
    title: 'Impact',
    description: 'Every feature we build and every line of code we write directly impacts thousands of businesses worldwide.'
  }
]

export function CultureValues() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The principles that guide how we work and build together
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((value) => (
          <Card key={value.title} className="border border-border bg-card hover:shadow-sm transition-all duration-200 hover:ring-1 hover:ring-primary/10">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <AppIcon 
                  name={value.icon as keyof typeof import('lucide-react')} 
                  size="lg" 
                  tone="default" 
                  aria-hidden={true} 
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
