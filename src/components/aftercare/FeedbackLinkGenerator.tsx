
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Copy, Send, Link } from 'lucide-react'

export const FeedbackLinkGenerator = () => {
  const [clients, setClients] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    fetchClients()
    fetchProjects()
  }, [])

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name')
        .eq('status', 'active')

      if (error) throw error
      setClients(data || [])
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      const { data: workOrders, error: woError } = await supabase
        .from('work_orders')
        .select('id, title, status')
        .eq('status', 'completed')

      const { data: estimates, error: estError } = await supabase
        .from('estimates')
        .select('id, title, status')
        .eq('status', 'accepted')

      if (woError || estError) throw woError || estError

      const allProjects = [
        ...(workOrders || []).map(wo => ({ ...wo, type: 'Work Order' })),
        ...(estimates || []).map(est => ({ ...est, type: 'Estimate' }))
      ]

      setProjects(allProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const generateFeedbackLink = async () => {
    if (!selectedClient || !selectedProject) {
      toast({
        title: "Missing Information",
        description: "Please select both a client and project",
        variant: "destructive"
      })
      return
    }

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('Not authenticated')

      const client = clients.find(c => c.id === selectedClient)
      const project = projects.find(p => p.id === selectedProject)
      
      const params = new URLSearchParams({
        client: client?.name || '',
        project: `${project?.type}: ${project?.title}` || '',
        business: user.user.id
      })

      const link = `${window.location.origin}/feedback?${params.toString()}`
      setGeneratedLink(link)

      toast({
        title: "Link Generated",
        description: "Feedback link has been generated successfully!"
      })
    } catch (error) {
      console.error('Error generating link:', error)
      toast({
        title: "Error",
        description: "Failed to generate feedback link",
        variant: "destructive"
      })
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      toast({
        title: "Copied!",
        description: "Link copied to clipboard"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5" />
          Generate Client Feedback Link
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client">Select Client</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="project">Select Project</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.type}: {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generateFeedbackLink} className="w-full">
          <Link className="h-4 w-4 mr-2" />
          Generate Feedback Link
        </Button>

        {generatedLink && (
          <div className="space-y-2">
            <Label>Generated Link</Label>
            <div className="flex gap-2">
              <Input value={generatedLink} readOnly className="flex-1" />
              <Button onClick={copyToClipboard} size="icon" variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Share this link with your client to collect their feedback.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
