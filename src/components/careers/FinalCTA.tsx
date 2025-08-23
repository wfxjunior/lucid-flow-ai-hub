
import React from 'react'
import { Button } from "@/components/ui/button"
import { Mail, Users } from 'lucide-react'

export function FinalCTA() {
  const handleApplyNow = () => {
    const subject = 'Job Application - FeatherBiz'
    const body = `Dear FeatherBiz Hiring Team,

I am interested in applying for a position at FeatherBiz. Please find my information below:

Name: [Your Name]
Email: [Your Email]
Phone: [Your Phone]
Position of Interest: [Position]
LinkedIn Profile: [Your LinkedIn]

I have attached my resume and look forward to hearing from you.

Best regards,
[Your Name]`
    
    window.open(`mailto:careers@featherbiz.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const handleTalentNetwork = () => {
    const subject = 'Talent Network - FeatherBiz'
    const body = `Hi FeatherBiz team,

I'm interested in joining your talent network to stay updated on future opportunities.

Name: [Your Name]
Email: [Your Email]
LinkedIn: [Your LinkedIn Profile]
Area of Interest: [Your Area of Interest]
Experience Level: [Junior/Mid/Senior]

Please add me to your talent network for future opportunities.

Best regards,
[Your Name]`
    
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
          <Mail className="mr-2 w-4 h-4" />
          Apply now
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleTalentNetwork}
          className="h-12 px-6 font-medium text-[15px] bg-transparent text-foreground border border-border hover:bg-muted/50 shadow-none transition-all duration-200 rounded-lg"
        >
          <Users className="mr-2 w-4 h-4" />
          Join talent network
        </Button>
      </div>
    </section>
  )
}
