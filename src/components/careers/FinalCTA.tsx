
import React from 'react'
import { Button } from "@/components/ui/button"
import { AppIcon } from '@/components/ui/AppIcon'

export function FinalCTA() {
  const handleApplyNow = () => {
    window.open('mailto:careers@featherbiz.io')
  }

  const handleTalentNetwork = () => {
    const subject = 'Talent Network - FeatherBiz'
    const body = `Hi FeatherBiz team,\n\nI'm interested in joining your talent network to stay updated on future opportunities.\n\nName:\nEmail:\nLinkedIn:\nArea of Interest:\n\nBest regards`
    window.open(`mailto:careers@featherbiz.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  return (
    <section className="bg-muted/30 rounded-lg border border-border p-8 text-center space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-foreground">Don't See a Perfect Role?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We're always looking for exceptional talent. If you're passionate about business automation and AI, 
          we'd love to hear from you even if there isn't a current opening that matches your background.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          size="lg" 
          onClick={handleApplyNow}
          className="h-12 px-6 font-medium text-[15px] bg-primary text-primary-foreground hover:bg-primary/90 border-0 shadow-none transition-all duration-200 rounded-lg"
        >
          <AppIcon name="Mail" size="sm" className="mr-2 w-4 h-4" aria-hidden={true} />
          Apply now
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleTalentNetwork}
          className="h-12 px-6 font-medium text-[15px] bg-transparent text-foreground border border-border hover:bg-muted/50 shadow-none transition-all duration-200 rounded-lg"
        >
          <AppIcon name="Users" size="sm" className="mr-2 w-4 h-4" aria-hidden={true} />
          Join talent network
        </Button>
      </div>
    </section>
  )
}
