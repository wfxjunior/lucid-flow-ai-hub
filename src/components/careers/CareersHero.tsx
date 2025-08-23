
import React from 'react'
import { Button } from "@/components/ui/button"
import { AppIcon } from '@/components/ui/AppIcon'

interface CareersHeroProps {
  onScrollToPositions: () => void
}

export function CareersHero({ onScrollToPositions }: CareersHeroProps) {
  return (
    <div className="text-center space-y-6 py-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          Careers at FeatherBiz
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Join us in revolutionizing business automation with AI. We're building the future of business operations, and we want exceptional talent on our team.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
        <Button 
          size="lg" 
          onClick={onScrollToPositions}
          className="min-w-[160px]"
        >
          <AppIcon name="Search" size="sm" tone="primary" className="mr-2" aria-hidden={true} />
          See open roles
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          asChild
          className="min-w-[160px]"
        >
          <a href="mailto:careers@featherbiz.io">
            <AppIcon name="Mail" size="sm" tone="default" className="mr-2" aria-hidden={true} />
            Email us
          </a>
        </Button>
      </div>
    </div>
  )
}
