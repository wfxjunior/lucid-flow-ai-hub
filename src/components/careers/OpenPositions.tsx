
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppIcon } from '@/components/ui/AppIcon'
import { JobDetailsDrawer } from './JobDetailsDrawer'

const positions = [
  {
    id: 'senior-frontend-developer',
    title: 'Senior Frontend Developer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build beautiful, responsive user interfaces for our business automation platform.',
    compensation: '$120k - $150k',
    icon: 'Code',
    responsibilities: [
      'Develop and maintain React-based web applications',
      'Collaborate with designers to implement pixel-perfect UIs',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable code with comprehensive tests'
    ],
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong understanding of modern CSS and responsive design',
      'Experience with state management libraries (Redux, Zustand)',
      'Familiarity with testing frameworks (Jest, React Testing Library)'
    ],
    niceToHave: [
      'Experience with Next.js or similar frameworks',
      'Knowledge of GraphQL and Apollo Client',
      'Familiarity with design systems and component libraries'
    ]
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design and build scalable APIs and microservices for our automation platform.',
    compensation: '$110k - $140k',
    icon: 'Server',
    responsibilities: [
      'Design and implement RESTful APIs and GraphQL endpoints',
      'Build and maintain microservices architecture',
      'Optimize database queries and system performance',
      'Ensure security and scalability of backend systems'
    ],
    requirements: [
      '4+ years of backend development experience',
      'Proficiency in Node.js, Python, or similar languages',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Understanding of cloud platforms (AWS, GCP, Azure)'
    ],
    niceToHave: [
      'Experience with containerization (Docker, Kubernetes)',
      'Knowledge of message queues and event-driven architecture',
      'Familiarity with monitoring and logging tools'
    ]
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create intuitive user experiences for complex business automation workflows.',
    compensation: '$100k - $130k',
    icon: 'Palette',
    responsibilities: [
      'Design user interfaces and experiences for web applications',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with engineering teams to ensure design implementation',
      'Conduct user research and usability testing'
    ],
    requirements: [
      '3+ years of product design experience',
      'Proficiency in Figma, Sketch, or similar design tools',
      'Strong understanding of UX principles and methodologies',
      'Portfolio demonstrating complex product design projects'
    ],
    niceToHave: [
      'Experience designing for B2B or enterprise software',
      'Knowledge of design systems and component libraries',
      'Basic understanding of HTML/CSS and frontend development'
    ]
  }
]

interface OpenPositionsProps {
  onApply: (jobId: string) => void
}

export function OpenPositions({ onApply }: OpenPositionsProps) {
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleViewDetails = (job: any) => {
    setSelectedJob(job)
    setIsDrawerOpen(true)
  }

  const handleApply = (job: any) => {
    const subject = `Application for ${job.title} Position`
    const body = `Hi FeatherBiz team,\n\nI'm interested in applying for the ${job.title} position.\n\nPlease find my resume attached. I'd love to discuss how my experience can contribute to your team.\n\nBest regards`
    window.open(`mailto:careers@featherbiz.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    onApply(job.id)
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Open Positions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our team and help build the future of business automation
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map((position) => (
          <Card key={position.id} className="border border-border bg-card hover:shadow-sm transition-all duration-200 hover:ring-1 hover:ring-primary/10">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <AppIcon 
                  name={position.icon as keyof typeof import('lucide-react')} 
                  size="lg" 
                  tone="primary" 
                  aria-hidden={true}
                />
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-lg font-semibold text-foreground leading-tight">
                    {position.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <AppIcon name="MapPin" size="xs" className="mr-1" aria-hidden={true} />
                      {position.location}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{position.type}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {position.description}
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewDetails(position)}
                  className="flex-1 h-9 px-3 font-medium text-sm bg-transparent text-foreground border border-border hover:bg-muted/50 shadow-none transition-all duration-200 rounded-lg"
                >
                  View details
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleApply(position)}
                  className="h-9 px-4 font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 border-0 shadow-none transition-all duration-200 rounded-lg"
                >
                  <AppIcon name="Mail" size="xs" className="mr-1.5 w-3 h-3" aria-hidden={true} />
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <JobDetailsDrawer 
        job={selectedJob}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onApply={handleApply}
      />
    </section>
  )
}
