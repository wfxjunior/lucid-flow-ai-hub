
import React, { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from 'lucide-react'
import { useAdminEmails } from '@/hooks/useAdminEmails'
import { AppIcon } from '@/components/ui/AppIcon'

const jobPositions = [
  { id: 'frontend', title: 'Frontend Developer', icon: 'Code', description: 'React, TypeScript, Tailwind CSS' },
  { id: 'backend', title: 'Backend Developer', icon: 'Server', description: 'Node.js, Supabase, APIs' },
  { id: 'fullstack', title: 'Full Stack Developer', icon: 'Layers', description: 'Frontend + Backend' },
  { id: 'designer', title: 'UI/UX Designer', icon: 'Palette', description: 'Figma, Design Systems' },
  { id: 'product', title: 'Product Manager', icon: 'Target', description: 'Product Strategy' },
  { id: 'marketing', title: 'Digital Marketing', icon: 'TrendingUp', description: 'Growth, SEO, Content' },
]

export function CareersPage() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const { sendCareerEmail, isSending } = useAdminEmails()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    experience: '',
    motivation: '',
    portfolio: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.position) {
      return
    }

    try {
      await sendCareerEmail("careers@featherbiz.io", {
        name: formData.name,
        email: formData.email,
        position: jobPositions.find(p => p.id === formData.position)?.title || formData.position,
        experience: formData.experience,
        motivation: formData.motivation,
        portfolio: formData.portfolio
      })

      setFormData({
        name: '',
        email: '',
        position: '',
        experience: '',
        motivation: '',
        portfolio: ''
      })
    } catch (error) {
      console.error('Error submitting application:', error)
    }
  }

  const handleApply = (jobId: string) => {
    setFormData(prev => ({ ...prev, position: jobId }))
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)
  }

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-8 space-y-12">
      {/* Header - Reduced spacing for Stripe-like density */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Careers at FeatherBiz
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Join us on our mission to revolutionize business automation with AI.
          We are building the future of business – and we want you on the team!
        </p>
      </div>

      {/* Company Values - Monochrome icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border bg-card hover:shadow-sm transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <AppIcon name="Rocket" size="lg" tone="default" aria-hidden={true} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Innovation</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We work with the latest technologies and continually seek to innovate
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card hover:shadow-sm transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <AppIcon name="Users" size="lg" tone="default" aria-hidden={true} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Collaboration</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We believe in the power of teamwork and mutual growth
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card hover:shadow-sm transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <AppIcon name="Zap" size="lg" tone="default" aria-hidden={true} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Impact</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Every line of code we write impacts thousands of businesses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Job Positions Grid - Standardized cards */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Open Positions</h2>
          <p className="text-muted-foreground">Join our growing team</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPositions.map((job) => (
            <Card key={job.id} className="border border-border bg-card hover:shadow-md hover:ring-1 hover:ring-primary/20 transition-all">
              <CardContent className="p-6">
                <div className="mb-4">
                  <AppIcon 
                    name={job.icon as keyof typeof import('lucide-react')} 
                    size="lg" 
                    tone="primary" 
                    aria-hidden={true}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{job.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{job.description}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleApply(job.id)}
                >
                  Apply
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Why Work With Us?</h2>
          <p className="text-muted-foreground">What makes FeatherBiz a great place to work</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <AppIcon name="Home" size="lg" tone="default" aria-hidden={true} />
            </div>
            <h4 className="font-semibold text-foreground">Remote First</h4>
            <p className="text-sm text-muted-foreground">Work from anywhere in the world</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <AppIcon name="Clock" size="lg" tone="default" aria-hidden={true} />
            </div>
            <h4 className="font-semibold text-foreground">Flexible Hours</h4>
            <p className="text-sm text-muted-foreground">Choose your own schedule</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <AppIcon name="GraduationCap" size="lg" tone="default" aria-hidden={true} />
            </div>
            <h4 className="font-semibold text-foreground">Learning Budget</h4>
            <p className="text-sm text-muted-foreground">$2000 annual learning allowance</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <AppIcon name="Heart" size="lg" tone="default" aria-hidden={true} />
            </div>
            <h4 className="font-semibold text-foreground">Health Coverage</h4>
            <p className="text-sm text-muted-foreground">Comprehensive health insurance</p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <Card className="max-w-2xl mx-auto border border-border bg-card">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-center text-foreground">Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="position" className="text-sm font-medium text-foreground">Position of Interest *</Label>
              <Select
                value={formData.position}
                onValueChange={(value) => setFormData(prev => ({ ...prev, position: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  {jobPositions.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience" className="text-sm font-medium text-foreground">Professional Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Tell us about your professional experience..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="motivation" className="text-sm font-medium text-foreground">Why do you want to work at FeatherBiz?</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                placeholder="What motivates you to join our team?"
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="portfolio" className="text-sm font-medium text-foreground">Portfolio/LinkedIn (optional)</Label>
              <Input
                id="portfolio"
                value={formData.portfolio}
                onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                placeholder="https://linkedin.com/in/yourprofile"
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSending}>
              <Send className="mr-2 h-4 w-4" />
              {isSending ? 'Sending...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Company Culture Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Our Culture</h2>
          <p className="text-muted-foreground">What it's like to work at FeatherBiz</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4">
                <AppIcon name="Trophy" size="lg" tone="default" aria-hidden={true} />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Excellence</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We strive for excellence in everything we do, from code quality to customer service.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4">
                <AppIcon name="Lightbulb" size="lg" tone="default" aria-hidden={true} />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Creativity</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We encourage creative thinking and innovative solutions to complex problems.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4">
                <AppIcon name="Shield" size="lg" tone="default" aria-hidden={true} />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Transparency</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe in open communication and transparency at all levels.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-center space-y-4 bg-muted/30 p-8 rounded-lg border border-border">
        <h3 className="text-xl font-semibold text-foreground">Questions?</h3>
        <p className="text-muted-foreground">
          Reach out to our HR team for more information
        </p>
        <a
          href="mailto:careers@featherbiz.io"
          className="text-primary hover:underline font-medium"
        >
          careers@featherbiz.io
        </a>
      </div>
    </div>
  )
}
