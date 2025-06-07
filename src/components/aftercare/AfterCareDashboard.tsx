
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { Star, TrendingUp, Users, MessageSquare, Heart } from 'lucide-react'

interface DashboardStats {
  totalFeedbacks: number
  averageRating: number
  recommendationRate: number
  testimonialCount: number
  recentFeedbacks: any[]
}

const StarDisplay = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${
          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
)

export const AfterCareDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalFeedbacks: 0,
    averageRating: 0,
    recommendationRate: 0,
    testimonialCount: 0,
    recentFeedbacks: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const { data: feedbacks, error } = await supabase
        .from('aftercare_feedback')
        .select('*')
        .order('feedback_date', { ascending: false })

      if (error) throw error

      const totalFeedbacks = feedbacks?.length || 0
      const averageRating = totalFeedbacks > 0 
        ? feedbacks.reduce((sum, f) => sum + f.overall_rating, 0) / totalFeedbacks 
        : 0
      const recommendationRate = totalFeedbacks > 0 
        ? (feedbacks.filter(f => f.would_recommend).length / totalFeedbacks) * 100 
        : 0
      const testimonialCount = feedbacks?.filter(f => f.show_as_testimonial).length || 0
      const recentFeedbacks = feedbacks?.slice(0, 5) || []

      setStats({
        totalFeedbacks,
        averageRating: Math.round(averageRating * 10) / 10,
        recommendationRate: Math.round(recommendationRate),
        testimonialCount,
        recentFeedbacks
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedbacks</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFeedbacks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <div className="flex mt-1">
              <StarDisplay rating={Math.round(stats.averageRating)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommendation Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recommendationRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Testimonials</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.testimonialCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedbacks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentFeedbacks.map((feedback) => (
              <div key={feedback.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{feedback.client_name}</h4>
                    <p className="text-sm text-muted-foreground">{feedback.project_service}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarDisplay rating={feedback.overall_rating} />
                    {feedback.would_recommend && (
                      <Badge variant="secondary" className="text-xs">Recommends</Badge>
                    )}
                  </div>
                </div>
                {feedback.suggestions && (
                  <p className="text-sm text-muted-foreground italic">
                    "{feedback.suggestions.substring(0, 120)}..."
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">{feedback.feedback_date}</p>
              </div>
            ))}
          </div>

          {stats.recentFeedbacks.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No feedback yet</h3>
              <p className="text-muted-foreground">Start collecting client feedback to see insights here.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Testimonials Preview */}
      {stats.testimonialCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Featured Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.recentFeedbacks
                .filter(f => f.show_as_testimonial && f.allow_public_display)
                .slice(0, 4)
                .map((testimonial) => (
                  <div key={testimonial.id} className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <StarDisplay rating={testimonial.overall_rating} />
                      <span className="text-sm font-medium">{testimonial.client_name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "{testimonial.suggestions?.substring(0, 100) || 'Great service!'}..."
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
