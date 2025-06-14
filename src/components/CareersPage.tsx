
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Users, Code, Palette, Rocket, Send } from 'lucide-react'
import { useAdminEmails } from '@/hooks/useAdminEmails'

const jobPositions = [
  { id: 'frontend', title: 'Desenvolvedor Frontend', icon: Code, description: 'React, TypeScript, Tailwind CSS' },
  { id: 'backend', title: 'Desenvolvedor Backend', icon: Code, description: 'Node.js, Supabase, APIs' },
  { id: 'fullstack', title: 'Desenvolvedor Full Stack', icon: Code, description: 'Frontend + Backend' },
  { id: 'designer', title: 'UI/UX Designer', icon: Palette, description: 'Figma, Design Systems' },
  { id: 'product', title: 'Product Manager', icon: Rocket, description: 'Estratégia de produto' },
  { id: 'marketing', title: 'Marketing Digital', icon: Users, description: 'Growth, SEO, Conteúdo' },
]

export function CareersPage() {
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
      await sendCareerEmail(formData.email, {
        name: formData.name,
        email: formData.email,
        position: jobPositions.find(p => p.id === formData.position)?.title || formData.position
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

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">💼 Careers at FeatherBiz</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Junte-se a nós na missão de revolucionar a automação empresarial com IA. 
          Estamos construindo o futuro dos negócios, e queremos você conosco!
        </p>
      </div>

      {/* Company Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Rocket className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Inovação</h3>
            <p className="text-muted-foreground">
              Trabalhamos com as tecnologias mais modernas e buscamos sempre inovar
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Colaboração</h3>
            <p className="text-muted-foreground">
              Acreditamos no poder do trabalho em equipe e no crescimento mútuo
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Briefcase className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Impacto</h3>
            <p className="text-muted-foreground">
              Cada linha de código que escrevemos impacta milhares de empresas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Job Positions */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">🚀 Posições Abertas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPositions.map((job) => {
            const IconComponent = job.icon
            return (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <IconComponent className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setFormData(prev => ({ ...prev, position: job.id }))}
                  >
                    Candidatar-se
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Application Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">📋 Formulário de Candidatura</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome completo"
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
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="position">Posição de Interesse *</Label>
              <Select value={formData.position} onValueChange={(value) => setFormData(prev => ({ ...prev, position: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma posição" />
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
              <Label htmlFor="experience">Experiência Profissional</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Conte sobre sua experiência profissional..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="motivation">Por que quer trabalhar no FeatherBiz?</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                placeholder="O que te motiva a fazer parte da nossa equipe?"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="portfolio">Portfólio/LinkedIn (opcional)</Label>
              <Input
                id="portfolio"
                value={formData.portfolio}
                onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                placeholder="https://linkedin.com/in/seuperfil"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSending}>
              <Send className="mr-2 h-4 w-4" />
              {isSending ? 'Enviando...' : 'Enviar Candidatura'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <div className="text-center space-y-4 bg-muted p-8 rounded-lg">
        <h3 className="text-2xl font-semibold">📧 Dúvidas?</h3>
        <p className="text-muted-foreground">
          Entre em contato com nossa equipe de RH para mais informações
        </p>
        <a 
          href="mailto:careers@featherbiz.io" 
          className="text-blue-600 hover:underline font-semibold"
        >
          careers@featherbiz.io
        </a>
      </div>
    </div>
  )
}
