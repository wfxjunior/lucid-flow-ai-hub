
import React, { useRef } from 'react'
import { CareersHero } from './careers/CareersHero'
import { CultureValues } from './careers/CultureValues'
import { KeyBenefits } from './careers/KeyBenefits'
import { OpenPositions } from './careers/OpenPositions'
import { HiringProcess } from './careers/HiringProcess'
import { TeamTestimonials } from './careers/TeamTestimonials'
import { CareersFAQ } from './careers/CareersFAQ'
import { FinalCTA } from './careers/FinalCTA'
import { useAdminEmails } from '@/hooks/useAdminEmails'

export function CareersPage() {
  const positionsRef = useRef<HTMLDivElement>(null)
  const { sendCareerEmail } = useAdminEmails()

  const handleScrollToPositions = () => {
    positionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleApply = async (jobId: string) => {
    console.log(`Application initiated for job: ${jobId}`)
    // The actual email sending is handled by the mailto links in the components
    // This is just for tracking/analytics if needed
  }

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-8 space-y-20">
      <CareersHero onScrollToPositions={handleScrollToPositions} />
      
      <CultureValues />
      
      <KeyBenefits />
      
      <div ref={positionsRef}>
        <OpenPositions />
      </div>
      
      <HiringProcess />
      
      <TeamTestimonials />
      
      <CareersFAQ />
      
      <FinalCTA />
    </div>
  )
}
