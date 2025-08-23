
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
          className="min-w-[160px] h-12 px-6 font-medium text-[15px] bg-primary text-primary-foreground hover:bg-primary/90 border-0 shadow-none transition-all duration-200 rounded-lg"
        >
          <AppIcon name="Search" size="sm" className="mr-2 w-4 h-4" aria-hidden={true} />
          See open roles
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          asChild
          className="min-w-[160px] h-12 px-6 font-medium text-[15px] bg-transparent text-primary border border-border hover:bg-muted/50 shadow-none transition-all duration-200 rounded-lg"
        >
          <a href="mailto:careers@featherbiz.io">
            <AppIcon name="Mail" size="sm" className="mr-2 w-4 h-4" aria-hidden={true} />
            Email us
          </a>
        </Button>
      </div>
    </div>
  )
}
