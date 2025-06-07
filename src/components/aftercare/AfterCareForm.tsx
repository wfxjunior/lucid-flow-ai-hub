
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Star } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface FeedbackForm {
  client_name: string
  project_service: string
  overall_rating: number
  agency_satisfaction: number
  communication_quality: number
  suggestions: string
  would_recommend: boolean
  allow_public_display: boolean
}

const StarRating = ({ rating, onRatingChange, label }: { rating: number, onRatingChange: (rating: number) => void, label: string }) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export const AfterCareForm = () => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FeedbackForm>({
    defaultValues: {
      client_name: '',
      project_service: '',
      overall_rating: 0,
      agency_satisfaction: 0,
      communication_quality: 0,
      suggestions: '',
      would_recommend: false,
      allow_public_display: false
    }
  })
  const { toast } = useToast()
  const [clients, setClients] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const watchedRatings = {
    overall_rating: watch('overall_rating'),
    agency_satisfaction: watch('agency_satisfaction'),
    communication_quality: watch('communication_quality'),
    would_recommend: watch('would_recommend'),
    allow_public_display: watch('allow_public_display')
  }

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
      // Fetch from work_orders and estimates that are completed
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

  const onSubmit = async (data: FeedbackForm) => {
    setLoading(true)
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('Not authenticated')

      const { error } = await (supabase as any)
        .from('aftercare_feedback')
        .insert([{
          ...data,
          user_id: user.user.id,
          feedback_date: new Date().toISOString().split('T')[0]
        }])

      if (error) throw error

      toast({
        title: "Success",
        description: "Feedback submitted successfully!"
      })

      reset()
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Feedback Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client_name">Client Name *</Label>
              <Select onValueChange={(value) => setValue('client_name', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.name}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project_service">Project / Service Executed *</Label>
              <Select onValueChange={(value) => setValue('project_service', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project/service" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={`${project.type}: ${project.title}`}>
                      {project.type}: {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StarRating
              rating={watchedRatings.overall_rating}
              onRatingChange={(rating) => setValue('overall_rating', rating)}
              label="Overall Rating"
            />

            <StarRating
              rating={watchedRatings.agency_satisfaction}
              onRatingChange={(rating) => setValue('agency_satisfaction', rating)}
              label="Satisfaction with Agency"
            />

            <StarRating
              rating={watchedRatings.communication_quality}
              onRatingChange={(rating) => setValue('communication_quality', rating)}
              label="Communication Quality"
            />
          </div>

          <div>
            <Label htmlFor="suggestions">Suggestions for Improvement</Label>
            <Textarea
              {...register('suggestions')}
              placeholder="Share your thoughts on how we can improve our service..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="would_recommend"
                checked={watchedRatings.would_recommend}
                onCheckedChange={(checked) => setValue('would_recommend', checked)}
              />
              <Label htmlFor="would_recommend">Would you recommend us to others?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="allow_public_display"
                checked={watchedRatings.allow_public_display}
                onCheckedChange={(checked) => setValue('allow_public_display', checked)}
              />
              <Label htmlFor="allow_public_display">Allow public display of your feedback?</Label>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
