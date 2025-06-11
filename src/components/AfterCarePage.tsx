
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Heart, Star, Send, Eye, Download, Plus, Mail, MessageSquare } from 'lucide-react'
import { toast } from "sonner"

export function AfterCarePage() {
  const [feedbackForm, setFeedbackForm] = useState({
    clientName: '',
    projectService: '',
    overallRating: 5,
    agencySatisfaction: 5,
    communicationQuality: 5,
    suggestions: '',
    wouldRecommend: true,
    allowPublicDisplay: false
  })

  const [feedbacks] = useState([
    {
      id: '1',
      clientName: 'John Smith',
      projectService: 'Website Redesign',
      overallRating: 5,
      agencySatisfaction: 5,
      communicationQuality: 4,
      suggestions: 'Great work overall, very professional team.',
      wouldRecommend: true,
      allowPublicDisplay: true,
      feedbackDate: '2024-01-15',
      showAsTestimonial: true
    },
    {
      id: '2',
      clientName: 'Sarah Johnson',
      projectService: 'Mobile App Development',
      overallRating: 4,
      agencySatisfaction: 4,
      communicationQuality: 5,
      suggestions: 'Could improve response time, but excellent quality.',
      wouldRecommend: true,
      allowPublicDisplay: false,
      feedbackDate: '2024-01-10',
      showAsTestimonial: false
    }
  ])

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Feedback form sent to client successfully!')
    setFeedbackForm({
      clientName: '',
      projectService: '',
      overallRating: 5,
      agencySatisfaction: 5,
      communicationQuality: 5,
      suggestions: '',
      wouldRecommend: true,
      allowPublicDisplay: false
    })
  }

  const sendFollowUpEmail = (clientName: string) => {
    toast.success(`Follow-up email sent to ${clientName}`)
  }

  const generateReport = () => {
    toast.success('AfterCare report generated and downloaded!')
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" />
            AfterCare
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage client feedback and maintain long-term relationships
          </p>
        </div>
        <Button onClick={generateReport} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards - Fixed grid responsiveness */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbacks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(feedbacks.reduce((sum, f) => sum + f.overallRating, 0) / feedbacks.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Would Recommend</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((feedbacks.filter(f => f.wouldRecommend).length / feedbacks.length) * 100)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Testimonials</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feedbacks.filter(f => f.showAsTestimonial).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Send Feedback Form - Improved responsiveness */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Send Feedback Request</CardTitle>
          <CardDescription>
            Send a feedback form to a client after project completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={feedbackForm.clientName}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, clientName: e.target.value })}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectService">Project/Service</Label>
                <Input
                  id="projectService"
                  value={feedbackForm.projectService}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, projectService: e.target.value })}
                  placeholder="Enter project or service name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="suggestions">Additional Notes (Optional)</Label>
              <Textarea
                id="suggestions"
                value={feedbackForm.suggestions}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, suggestions: e.target.value })}
                placeholder="Any specific questions or notes for the client..."
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              <Send className="mr-2 h-4 w-4" />
              Send Feedback Request
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Feedback Results - Improved table responsiveness */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Client Feedback</CardTitle>
          <CardDescription>
            View and manage client feedback responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {feedbacks.map((feedback) => (
              <Card key={feedback.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{feedback.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{feedback.projectService}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => sendFollowUpEmail(feedback.clientName)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.success('Feedback details viewed')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rating:</span>
                      <div className="flex items-center gap-1">
                        {renderStars(feedback.overallRating)}
                        <span className="text-sm">{feedback.overallRating}/5</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Recommend:</span>
                      <Badge variant={feedback.wouldRecommend ? "default" : "secondary"}>
                        {feedback.wouldRecommend ? "Yes" : "No"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Public:</span>
                      <Badge variant={feedback.allowPublicDisplay ? "default" : "outline"}>
                        {feedback.allowPublicDisplay ? "Allowed" : "Private"}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Date: {feedback.feedbackDate}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Project/Service</TableHead>
                  <TableHead>Overall Rating</TableHead>
                  <TableHead>Communication</TableHead>
                  <TableHead>Recommend</TableHead>
                  <TableHead>Public</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell className="font-medium">{feedback.clientName}</TableCell>
                    <TableCell>{feedback.projectService}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(feedback.overallRating)}
                        <span className="ml-1 text-sm">{feedback.overallRating}/5</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(feedback.communicationQuality)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={feedback.wouldRecommend ? "default" : "secondary"}>
                        {feedback.wouldRecommend ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={feedback.allowPublicDisplay ? "default" : "outline"}>
                        {feedback.allowPublicDisplay ? "Allowed" : "Private"}
                      </Badge>
                    </TableCell>
                    <TableCell>{feedback.feedbackDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => sendFollowUpEmail(feedback.clientName)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.success('Feedback details viewed')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
