import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AppIcon } from '@/components/ui/AppIcon'
import { JobDetailsDrawer } from './JobDetailsDrawer'

const jobPositions = [
  { 
    id: 'frontend', 
    title: 'Frontend Developer', 
    icon: 'Code', 
    location: 'Remote', 
    type: 'Full-time',
    team: 'Engineering',
    seniority: 'Mid-Senior',
    description: 'React, TypeScript, Tailwind CSS',
    stack: 'React • TypeScript • Tailwind',
    responsibilities: [
      'Build responsive user interfaces with React and TypeScript',
      'Collaborate with design team to implement pixel-perfect UIs',
      'Optimize application performance and user experience',
      'Write clean, maintainable, and well-tested code',
      'Participate in code reviews and technical discussions'
    ],
    requirements: [
      '3+ years of experience with React and modern JavaScript',
      'Strong knowledge of TypeScript and CSS/Tailwind',
      'Experience with state management (Redux, Zustand, etc.)',
      'Understanding of web performance optimization',
      'Excellent communication and collaboration skills'
    ],
    niceToHave: [
      'Experience with Next.js or similar frameworks',
      'Knowledge of testing frameworks (Jest, Cypress)',
      'Familiarity with design systems'
    ],
    compensation: '$80k - $120k'
  },
  { 
    id: 'backend', 
    title: 'Backend Developer', 
    icon: 'Server', 
    location: 'Remote', 
    type: 'Full-time',
    team: 'Engineering',
    seniority: 'Mid-Senior',
    description: 'Node.js, Supabase, APIs',
    stack: 'Node.js • Supabase • PostgreSQL',
    responsibilities: [
      'Design and implement scalable backend services',
      'Build and maintain RESTful APIs and GraphQL endpoints',
      'Optimize database performance and data architecture',
      'Implement security best practices and authentication',
      'Monitor system performance and troubleshoot issues'
    ],
    requirements: [
      '3+ years of backend development experience',
      'Strong knowledge of Node.js and TypeScript',
      'Experience with PostgreSQL and database design',
      'Understanding of API design and microservices',
      'Experience with cloud platforms (AWS, GCP, or Azure)'
    ],
    niceToHave: [
      'Experience with Supabase or similar BaaS platforms',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Familiarity with event-driven architectures'
    ],
    compensation: '$85k - $130k'
  },
  { 
    id: 'fullstack', 
    title: 'Full Stack Developer', 
    icon: 'Layers', 
    location: 'Remote', 
    type: 'Full-time',
    team: 'Engineering',
    seniority: 'Senior',
    description: 'Frontend + Backend expertise',
    stack: 'React • Node.js • TypeScript',
    responsibilities: [
      'Work across the full stack to deliver end-to-end features',
      'Architect scalable solutions from UI to database',
      'Collaborate with product team on feature requirements',
      'Mentor junior developers and lead technical discussions',
      'Drive technical decisions and best practices'
    ],
    requirements: [
      '5+ years of full-stack development experience',
      'Expert knowledge of React, Node.js, and TypeScript',
      'Experience with both SQL and NoSQL databases',
      'Strong understanding of system design and architecture',
      'Leadership and mentoring experience'
    ],
    niceToHave: [
      'Experience with AI/ML integration',
      'Knowledge of DevOps and CI/CD pipelines',
      'Previous startup experience'
    ],
    compensation: '$100k - $150k'
  },
  { 
    id: 'designer', 
    title: 'UI/UX Designer', 
    icon: 'Palette', 
    location: 'Remote', 
    type: 'Full-time',
    team: 'Design',
    seniority: 'Mid-Senior',
    description: 'Figma, Design Systems, User Research',
    stack: 'Figma • Design Systems • User Research',
    responsibilities: [
      'Design intuitive user interfaces and experiences',
      'Conduct user research and usability testing',
      'Maintain and evolve our design system',
      'Collaborate closely with engineering team',
      'Create prototypes and user flows'
    ],
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in Figma and design tools',
      'Strong portfolio of web application designs',
      'Experience with user research methodologies',
      'Understanding of frontend development constraints'
    ],
    niceToHave: [
      'Experience designing for B2B SaaS products',
      'Knowledge of accessibility standards',
      'Basic HTML/CSS knowledge'
    ],
    compensation: '$70k - $110k'
  }
]

interface OpenPositionsProps {
  onApply: (jobId: string) => void
}

export function OpenPositions({ onApply }: OpenPositionsProps) {
  const [selectedJob, setSelectedJob] = useState<typeof jobPositions[0] | null>(null)
  const [teamFilter, setTeamFilter] = useState<string>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [seniorityFilter, setSeniorityFilter] = useState<string>('all')

  const filteredPositions = jobPositions.filter(job => {
    return (teamFilter === 'all' || job.team === teamFilter) &&
           (locationFilter === 'all' || job.location === locationFilter) &&
           (seniorityFilter === 'all' || job.seniority === seniorityFilter)
  })

  const handleApply = (job: typeof jobPositions[0]) => {
    const subject = `Application: ${job.title} – ${job.location}`
    const body = `Name:\n\nLinkedIn:\n\nPortfolio/GitHub:\n\nResume URL:\n\nCover note (optional):\n`
    window.open(`mailto:careers@featherbiz.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    onApply(job.id)
  }

  return (
    <section className="space-y-8" id="open-positions">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Open Positions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our growing team and help shape the future of business automation
        </p>
      </div>
      
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/30 rounded-lg border border-border">
        <div className="flex-1 min-w-[200px]">
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="h-10 font-medium text-[14px] border-border bg-background hover:bg-muted/50 transition-colors duration-200">
              <SelectValue placeholder="All Teams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="h-10 font-medium text-[14px] border-border bg-background hover:bg-muted/50 transition-colors duration-200">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Onsite">Onsite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <Select value={seniorityFilter} onValueChange={setSeniorityFilter}>
            <SelectTrigger className="h-10 font-medium text-[14px] border-border bg-background hover:bg-muted/50 transition-colors duration-200">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Junior">Junior</SelectItem>
              <SelectItem value="Mid-Senior">Mid-Senior</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPositions.map((job) => (
          <Card key={job.id} className="border border-border bg-card hover:shadow-md hover:ring-1 hover:ring-primary/20 transition-all duration-200">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div>
                  <AppIcon 
                    name={job.icon as keyof typeof import('lucide-react')} 
                    size="lg" 
                    tone="primary" 
                    aria-hidden={true}
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <AppIcon name="MapPin" size="xs" className="mr-1" aria-hidden={true} />
                      {job.location}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{job.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.stack}</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1 h-10 px-4 font-medium text-[14px] bg-primary text-primary-foreground hover:bg-primary/90 border-0 shadow-none transition-all duration-200 rounded-lg" 
                  onClick={() => handleApply(job)}
                >
                  <AppIcon name="Mail" size="sm" className="mr-2 w-4 h-4" aria-hidden={true} />
                  Apply
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 h-10 px-4 font-medium text-[14px] bg-transparent text-foreground border border-border hover:bg-muted/50 shadow-none transition-all duration-200 rounded-lg"
                  onClick={() => setSelectedJob(job)}
                >
                  View details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <JobDetailsDrawer 
        job={selectedJob} 
        isOpen={selectedJob !== null}
        onClose={() => setSelectedJob(null)}
        onApply={handleApply}
      />
    </section>
  )
}
