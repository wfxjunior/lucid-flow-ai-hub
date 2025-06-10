
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
        className={`h-3 w-3 sm:h-4 sm:w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-500 animate-pulse" />
            AfterCare
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
            Manage client feedback and maintain long-term relationships
          </p>
        </div>
        <Button onClick={generateReport} className="w-full sm:w-auto text-xs sm:text-sm">
          <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Feedback</CardTitle>
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">{feedbacks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">
              {(feedbacks.reduce((sum, f) => sum + f.overallRating, 0) / feedbacks.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Would Recommend</CardTitle>
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">
              {Math.round((feedbacks.filter(f => f.wouldRecommend).length / feedbacks.length) * 100)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Public Testimonials</CardTitle>
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">
              {feedbacks.filter(f => f.showAsTestimonial).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Send Feedback Form */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Send Feedback Request</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Send a feedback form to a client after project completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFeedback} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="clientName" className="text-xs sm:text-sm">Client Name</Label>
                <Input
                  id="clientName"
                  value={feedbackForm.clientName}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, clientName: e.target.value })}
                  placeholder="Enter client name"
                  required
                  className="text-xs sm:text-sm"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="projectService" className="text-xs sm:text-sm">Project/Service</Label>
                <Input
                  id="projectService"
                  value={feedbackForm.projectService}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, projectService: e.target.value })}
                  placeholder="Enter project or service name"
                  required
                  className="text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="suggestions" className="text-xs sm:text-sm">Additional Notes (Optional)</Label>
              <Textarea
                id="suggestions"
                value={feedbackForm.suggestions}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, suggestions: e.target.value })}
                placeholder="Any specific questions or notes for the client..."
                rows={3}
                className="text-xs sm:text-sm"
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto text-xs sm:text-sm">
              <Send className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Send Feedback Request
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Feedback Results */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Client Feedback</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            View and manage client feedback responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm min-w-[100px]">Client</TableHead>
                  <TableHead className="text-xs sm:text-sm min-w-[120px]">Project/Service</TableHead>
                  <TableHead className="text-xs sm:text-sm min-w-[100px]">Overall Rating</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden sm:table-cell min-w-[100px]">Communication</TableHead>
                  <TableHead className="text-xs sm:text-sm min-w-[80px]">Recommend</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell min-w-[80px]">Public</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden lg:table-cell min-w-[80px]">Date</TableHead>
                  <TableHead className="text-xs sm:text-sm min-w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell className="font-medium text-xs sm:text-sm">{feedback.clientName}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{feedback.projectService}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(feedback.overallRating)}
                        <span className="ml-1 text-xs">{feedback.overallRating}/5</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        {renderStars(feedback.communicationQuality)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={feedback.wouldRecommend ? "default" : "secondary"} className="text-xs">
                        {feedback.wouldRecommend ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={feedback.allowPublicDisplay ? "default" : "outline"} className="text-xs">
                        {feedback.allowPublicDisplay ? "Allowed" : "Private"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs sm:text-sm">{feedback.feedbackDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => sendFollowUpEmail(feedback.clientName)}
                          className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                        >
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.success('Feedback details viewed')}
                          className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
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
