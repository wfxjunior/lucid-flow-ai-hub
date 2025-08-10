import React, { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Users, Code, Palette, Rocket, Send } from 'lucide-react'
import { useAdminEmails } from '@/hooks/useAdminEmails'

const jobPositions = [
  { id: 'frontend', title: 'Frontend Developer', icon: Code, description: 'React, TypeScript, Tailwind CSS' },
  { id: 'backend', title: 'Backend Developer', icon: Code, description: 'Node.js, Supabase, APIs' },
  { id: 'fullstack', title: 'Full Stack Developer', icon: Code, description: 'Frontend + Backend' },
  { id: 'designer', title: 'UI/UX Designer', icon: Palette, description: 'Figma, Design Systems' },
  { id: 'product', title: 'Product Manager', icon: Rocket, description: 'Product Strategy' },
  { id: 'marketing', title: 'Digital Marketing', icon: Users, description: 'Growth, SEO, Content' },
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
      // Send email to careers@featherbiz.io, not to the applicant
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

  // Scroll and set position
  const handleApply = (jobId: string) => {
    setFormData(prev => ({ ...prev, position: jobId }))
    // Scroll to form smoothly
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)
  }

  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-0">
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Careers at FeatherBiz</h2>
        <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Join us on our mission to revolutionize business automation with AI.
          We are building the future of business – and we want you on the team!
        </p>
      </div>

      {/* Company Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <Rocket className="h-10 sm:h-12 w-10 sm:w-12 text-[hsl(var(--brand-blue))] mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Innovation</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              We work with the latest technologies and continually seek to innovate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <Users className="h-10 sm:h-12 w-10 sm:w-12 text-[hsl(var(--brand-green))] mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Collaboration</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              We believe in the power of teamwork and mutual growth
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6 text-center">
            <Briefcase className="h-10 sm:h-12 w-10 sm:w-12 text-[hsl(var(--brand-purple))] mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Impact</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Every line of code we write impacts thousands of businesses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Job Positions */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Open Positions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {jobPositions.map((job) => {
            const IconComponent = job.icon
            return (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6 text-center">
                  <IconComponent className="h-8 sm:h-10 w-8 sm:w-10 text-[hsl(var(--brand-blue))] mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{job.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">{job.description}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleApply(job.id)}
                  >
                    Apply
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Application Form */}
      <Card className="max-w-full sm:max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-center">Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="position">Position of Interest *</Label>
              <Select
                value={formData.position}
                onValueChange={(value) => setFormData(prev => ({ ...prev, position: value }))}
              >
                <SelectTrigger>
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
              <Label htmlFor="experience">Professional Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Tell us about your professional experience..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="motivation">Why do you want to work at FeatherBiz?</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                placeholder="What motivates you to join our team?"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="portfolio">Portfolio/LinkedIn (optional)</Label>
              <Input
                id="portfolio"
                value={formData.portfolio}
                onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSending}>
              <Send className="mr-2 h-4 w-4" />
              {isSending ? 'Sending...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <div className="text-center space-y-3 sm:space-y-4 bg-muted p-4 sm:p-8 rounded-lg">
        <h3 className="text-xl sm:text-2xl font-semibold">Questions?</h3>
        <p className="text-muted-foreground text-sm sm:text-base">
          Reach out to our HR team for more information
        </p>
        <a
          href="mailto:careers@featherbiz.io"
          className="text-primary hover:underline font-semibold break-all"
        >
          careers@featherbiz.io
        </a>
      </div>
    </div>
  )
}
