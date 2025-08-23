
import React from 'react'
import { AppIcon } from '@/components/ui/AppIcon'

const benefits = [
  { icon: 'Home', title: 'Remote First', description: 'Work from anywhere in the world' },
  { icon: 'Clock', title: 'Flexible Hours', description: 'Choose your own schedule and work-life balance' },
  { icon: 'Heart', title: 'Health Coverage', description: 'Comprehensive medical, dental, and vision' },
  { icon: 'Plane', title: 'Unlimited PTO', description: 'Take the time you need to recharge' },
  { icon: 'GraduationCap', title: 'Learning Budget', description: '$2,000 annual professional development' },
  { icon: 'Monitor', title: 'Home Office Kit', description: 'MacBook, monitor, and workspace setup' },
  { icon: 'Baby', title: 'Parental Leave', description: '16 weeks paid leave for new parents' },
  { icon: 'Globe', title: 'Visa Support', description: 'Relocation and visa sponsorship available' }
]

export function KeyBenefits() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Why Work With Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We offer competitive benefits and a supportive environment for your growth
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="text-center space-y-3 p-4">
            <div className="flex justify-center">
              <AppIcon 
                name={benefit.icon as keyof typeof import('lucide-react')} 
                size="lg" 
                tone="default" 
                aria-hidden={true} 
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground">{benefit.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
