
import React from 'react'
import { AppIcon } from '@/components/ui/AppIcon'

const steps = [
  {
    icon: 'FileText',
    title: 'Application Review',
    description: 'We review your application and portfolio to understand your background and experience.'
  },
  {
    icon: 'Video',
    title: 'Initial Interview',
    description: 'A 30-minute call to discuss your experience, motivations, and learn about the role.'
  },
  {
    icon: 'Code',
    title: 'Technical Assessment',
    description: 'Role-specific technical interview or take-home project to showcase your skills.'
  },
  {
    icon: 'HandHeart',
    title: 'Final Interview',
    description: 'Meet the team, discuss culture fit, and finalize details before extending an offer.'
  }
]

export function HiringProcess() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Our Hiring Process</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A transparent, respectful process designed to help us get to know each other
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={step.title} className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                <AppIcon 
                  name={step.icon as keyof typeof import('lucide-react')} 
                  size="lg" 
                  tone="primary" 
                  aria-hidden={true} 
                />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
