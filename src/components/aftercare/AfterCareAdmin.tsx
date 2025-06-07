
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Star, Filter, Download, Eye, Edit, MessageSquare } from 'lucide-react'

interface Feedback {
  id: string
  client_name: string
  project_service: string
  overall_rating: number
  agency_satisfaction: number
  communication_quality: number
  suggestions: string
  would_recommend: boolean
  allow_public_display: boolean
  feedback_date: string
  admin_notes: string
  show_as_testimonial: boolean
}

const StarDisplay = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-3 w-3 md:h-4 md:w-4 ${
          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
)

export const AfterCareAdmin = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([])
  const [filters, setFilters] = useState({
    rating: 'all',
    communication: 'all',
    agency: 'all'
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNotes, setEditNotes] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [feedbacks, filters])

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('aftercare_feedback')
        .select('*')
        .order('feedback_date', { ascending: false })

      if (error) throw error
      setFeedbacks(data || [])
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
      toast({
        title: "Error",
        description: "Failed to fetch feedbacks",
        variant: "destructive"
      })
    }
  }

  const applyFilters = () => {
    let filtered = feedbacks

    if (filters.rating !== 'all') {
      filtered = filtered.filter(f => f.overall_rating >= parseInt(filters.rating))
    }
    if (filters.communication !== 'all') {
      filtered = filtered.filter(f => f.communication_quality >= parseInt(filters.communication))
    }
    if (filters.agency !== 'all') {
      filtered = filtered.filter(f => f.agency_satisfaction >= parseInt(filters.agency))
    }

    setFilteredFeedbacks(filtered)
  }

  const updateAdminNotes = async (id: string, notes: string) => {
    try {
      const { error } = await (supabase as any)
        .from('aftercare_feedback')
        .update({ admin_notes: notes })
        .eq('id', id)

      if (error) throw error

      setFeedbacks(prev => prev.map(f => 
        f.id === id ? { ...f, admin_notes: notes } : f
      ))
      setEditingId(null)
      setEditNotes('')

      toast({
        title: "Success",
        description: "Admin notes updated"
      })
    } catch (error) {
      console.error('Error updating notes:', error)
      toast({
        title: "Error",
        description: "Failed to update notes",
        variant: "destructive"
      })
    }
  }

  const toggleTestimonial = async (id: string, showAsTestimonial: boolean) => {
    try {
      const { error } = await (supabase as any)
        .from('aftercare_feedback')
        .update({ show_as_testimonial: showAsTestimonial })
        .eq('id', id)

      if (error) throw error

      setFeedbacks(prev => prev.map(f => 
        f.id === id ? { ...f, show_as_testimonial: showAsTestimonial } : f
      ))

      toast({
        title: "Success",
        description: showAsTestimonial ? "Added to testimonials" : "Removed from testimonials"
      })
    } catch (error) {
      console.error('Error updating testimonial status:', error)
      toast({
        title: "Error",
        description: "Failed to update testimonial status",
        variant: "destructive"
      })
    }
  }

  const exportToPDF = () => {
    // This would integrate with a PDF generation service
    toast({
      title: "Export",
      description: "PDF export functionality would be implemented here"
    })
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Filter className="h-4 w-4 md:h-5 md:w-5" />
            Filters & Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs md:text-sm font-medium">Min Overall Rating</label>
              <Select value={filters.rating} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ratings</SelectItem>
                  <SelectItem value="1">1+ stars</SelectItem>
                  <SelectItem value="2">2+ stars</SelectItem>
                  <SelectItem value="3">3+ stars</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="5">5 stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium">Min Communication</label>
              <Select value={filters.communication} onValueChange={(value) => setFilters(prev => ({ ...prev, communication: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ratings</SelectItem>
                  <SelectItem value="1">1+ stars</SelectItem>
                  <SelectItem value="2">2+ stars</SelectItem>
                  <SelectItem value="3">3+ stars</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="5">5 stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs md:text-sm font-medium">Min Agency Rating</label>
              <Select value={filters.agency} onValueChange={(value) => setFilters(prev => ({ ...prev, agency: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ratings</SelectItem>
                  <SelectItem value="1">1+ stars</SelectItem>
                  <SelectItem value="2">2+ stars</SelectItem>
                  <SelectItem value="3">3+ stars</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="5">5 stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={exportToPDF} className="w-full text-xs md:text-sm">
                <Download className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => (
          <Card key={feedback.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1">
                  <CardTitle className="text-base md:text-lg">{feedback.client_name}</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground">{feedback.project_service}</p>
                  <p className="text-xs text-muted-foreground">Date: {feedback.feedback_date}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {feedback.would_recommend && (
                    <Badge variant="secondary" className="text-xs">Recommends</Badge>
                  )}
                  {feedback.show_as_testimonial && (
                    <Badge className="text-xs">Testimonial</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Ratings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs md:text-sm font-medium">Overall Rating</p>
                  <StarDisplay rating={feedback.overall_rating} />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium">Agency Satisfaction</p>
                  <StarDisplay rating={feedback.agency_satisfaction} />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium">Communication</p>
                  <StarDisplay rating={feedback.communication_quality} />
                </div>
              </div>

              {/* Suggestions */}
              {feedback.suggestions && (
                <div>
                  <p className="text-xs md:text-sm font-medium">Suggestions</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{feedback.suggestions}</p>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs md:text-sm font-medium">Admin Notes</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingId(feedback.id)
                      setEditNotes(feedback.admin_notes || '')
                    }}
                    className="h-6 w-6 p-0 md:h-8 md:w-8"
                  >
                    <Edit className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
                {editingId === feedback.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Add internal notes..."
                      className="text-xs md:text-sm"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => updateAdminNotes(feedback.id, editNotes)} className="text-xs">
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="text-xs">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {feedback.admin_notes || 'No notes added'}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={feedback.show_as_testimonial}
                    onCheckedChange={(checked) => toggleTestimonial(feedback.id, checked)}
                  />
                  <label className="text-xs md:text-sm">Show as public testimonial</label>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFeedbacks.length === 0 && (
        <Card>
          <CardContent className="p-4 md:p-6 text-center">
            <MessageSquare className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-base md:text-lg font-medium">No feedback found</h3>
            <p className="text-xs md:text-sm text-muted-foreground">No feedback matches your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
