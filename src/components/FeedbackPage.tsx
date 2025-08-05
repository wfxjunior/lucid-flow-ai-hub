
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Star, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

export function FeedbackPage() {
  const [feedback, setFeedback] = useState({
    type: "",
    rating: "",
    subject: "",
    message: "",
    email: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!feedback.type || !feedback.subject || !feedback.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      // Send email via edge function
      const { error } = await supabase.functions.invoke('send-platform-email', {
        body: {
          type: 'feedback',
          name: feedback.email || 'Anonymous User',
          email: feedback.email || 'anonymous@featherbiz.com',
          subject: feedback.subject,
          message: feedback.message,
          feedbackType: feedback.type,
          rating: feedback.rating
        }
      })

      if (error) {
        console.error('Error sending feedback:', error)
        throw error
      }
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We'll review it shortly.",
      })
      
      setFeedback({ type: "", rating: "", subject: "", message: "", email: "" })
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <MessageSquare className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Send Feedback</h1>
        </div>
        <p className="text-muted-foreground">
          Help us improve by sharing your thoughts and suggestions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="type">Feedback Type *</Label>
              <Select value={feedback.type} onValueChange={(value) => setFeedback({ ...feedback, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="general">General Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rating">Rating</Label>
              <Select value={feedback.rating} onValueChange={(value) => setFeedback({ ...feedback, rating: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Rate your experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Excellent</SelectItem>
                  <SelectItem value="4">Good</SelectItem>
                  <SelectItem value="3">Average</SelectItem>
                  <SelectItem value="2">Poor</SelectItem>
                  <SelectItem value="1">Very Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={feedback.email}
              onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="Brief description of your feedback"
              value={feedback.subject}
              onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Please provide detailed feedback..."
              rows={6}
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
            />
          </div>

          <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">Feature Request</span>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-sm">Mobile app support would be great...</p>
              <span className="text-xs text-green-600">Status: Under Review</span>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">Bug Report</span>
                <span className="text-sm text-muted-foreground">1 week ago</span>
              </div>
              <p className="text-sm">Dashboard loading issue on Chrome...</p>
              <span className="text-xs text-blue-600">Status: Fixed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
