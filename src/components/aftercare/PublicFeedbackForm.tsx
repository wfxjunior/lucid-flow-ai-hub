
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Star } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface PublicFeedbackForm {
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

interface PublicFeedbackFormProps {
  clientName: string
  projectService: string
  businessId: string
}

export const PublicFeedbackForm = ({ clientName, projectService, businessId }: PublicFeedbackFormProps) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<PublicFeedbackForm>({
    defaultValues: {
      overall_rating: 0,
      agency_satisfaction: 0,
      communication_quality: 0,
      suggestions: '',
      would_recommend: false,
      allow_public_display: false
    }
  })
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const watchedRatings = {
    overall_rating: watch('overall_rating'),
    agency_satisfaction: watch('agency_satisfaction'),
    communication_quality: watch('communication_quality'),
    would_recommend: watch('would_recommend'),
    allow_public_display: watch('allow_public_display')
  }

  const onSubmit = async (data: PublicFeedbackForm) => {
    setLoading(true)
    try {
      const { error } = await (supabase as any)
        .from('aftercare_feedback')
        .insert([{
          ...data,
          client_name: clientName,
          project_service: projectService,
          user_id: businessId,
          feedback_date: new Date().toISOString().split('T')[0]
        }])

      if (error) throw error

      setSubmitted(true)
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully!"
      })

      reset()
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-600 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
            <p className="text-muted-foreground">
              Your feedback has been submitted successfully. We appreciate you taking the time to share your experience.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Share Your Experience</CardTitle>
            <div className="text-center text-muted-foreground">
              <p><strong>Client:</strong> {clientName}</p>
              <p><strong>Project:</strong> {projectService}</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StarRating
                  rating={watchedRatings.overall_rating}
                  onRatingChange={(rating) => setValue('overall_rating', rating)}
                  label="Overall Rating"
                />

                <StarRating
                  rating={watchedRatings.agency_satisfaction}
                  onRatingChange={(rating) => setValue('agency_satisfaction', rating)}
                  label="Satisfaction with Service"
                />

                <StarRating
                  rating={watchedRatings.communication_quality}
                  onRatingChange={(rating) => setValue('communication_quality', rating)}
                  label="Communication Quality"
                />
              </div>

              <div>
                <Label htmlFor="suggestions">Share Your Thoughts</Label>
                <Textarea
                  {...register('suggestions')}
                  placeholder="Tell us about your experience and how we can improve..."
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
                  <Label htmlFor="allow_public_display">Allow us to share your feedback publicly?</Label>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
