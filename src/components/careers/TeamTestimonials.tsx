
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { AppIcon } from '@/components/ui/AppIcon'

const testimonials = [
  {
    quote: "Working at FeatherBiz has been incredible. The team is supportive, the technology is cutting-edge, and the impact we're making on businesses is real.",
    author: "Sarah Chen",
    role: "Senior Frontend Developer",
    avatar: "SC"
  },
  {
    quote: "The remote-first culture and flexible approach to work has allowed me to do my best work while maintaining great work-life balance.",
    author: "Marcus Johnson",
    role: "Backend Engineer",
    avatar: "MJ"
  },
  {
    quote: "I love how we're not just building software, but actually solving real problems that businesses face every day. It's meaningful work.",
    author: "Elena Rodriguez",
    role: "Product Designer",
    avatar: "ER"
  }
]

export function TeamTestimonials() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">What Our Team Says</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from the people who make FeatherBiz an amazing place to work
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.author} className="border border-border bg-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-center">
                <AppIcon name="Quote" size="md" tone="primary" aria-hidden={true} />
              </div>
              <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                  <span className="text-sm font-semibold text-primary">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
