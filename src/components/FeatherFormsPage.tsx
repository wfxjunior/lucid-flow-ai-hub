
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clipboard, 
  Plus, 
  Eye, 
  Copy, 
  Trash2, 
  Download, 
  Share2,
  Settings,
  BarChart3,
  Mail,
  MessageSquare,
  Calendar,
  Heart,
  FileText,
  Users,
  Loader2
} from 'lucide-react'
import { toast } from "sonner"
import { useFeatherFormsData } from '@/hooks/useFeatherFormsData'
import { useQueryClient } from '@tanstack/react-query'

export function FeatherFormsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const queryClient = useQueryClient()
  
  const { 
    forms, 
    responses, 
    isLoading, 
    error, 
    createForm, 
    deleteForm, 
    duplicateForm 
  } = useFeatherFormsData()

  const handleCreateNewForm = async () => {
    try {
      await createForm({ title: 'New Form', visibility: 'private' })
      queryClient.invalidateQueries({ queryKey: ['feather-forms'] })
      toast.success('New form created successfully!')
    } catch (error) {
      toast.error('Failed to create form')
      console.error('Error creating form:', error)
    }
  }

  const handleDuplicateForm = async (formId: string) => {
    try {
      await duplicateForm(formId)
      queryClient.invalidateQueries({ queryKey: ['feather-forms'] })
      toast.success('Form duplicated successfully!')
    } catch (error) {
      toast.error('Failed to duplicate form')
      console.error('Error duplicating form:', error)
    }
  }

  const handleDeleteForm = async (formId: string) => {
    try {
      await deleteForm(formId)
      queryClient.invalidateQueries({ queryKey: ['feather-forms'] })
      toast.success('Form deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete form')
      console.error('Error deleting form:', error)
    }
  }

  const exportData = () => {
    toast.success('Exporting form data to Excel...')
  }

  const shareForm = (formId: string) => {
    const shareUrl = `${window.location.origin}/forms/${formId}`
    navigator.clipboard.writeText(shareUrl)
    toast.success('Form link copied to clipboard!')
  }

  const viewResponse = (responseId: string) => {
    toast.success('Opening response details...')
  }

  const getVisibilityBadge = (visibility: string) => {
    if (visibility === 'public') {
      return <Badge variant="default" className="text-xs">{visibility}</Badge>
    } else if (visibility === 'team') {
      return <Badge variant="secondary" className="text-xs">{visibility}</Badge>
    } else {
      return <Badge variant="outline" className="text-xs">{visibility}</Badge>
    }
  }

  const getDestinationIcons = (destinations: string[]) => {
    const iconMap = {
      internal: <Clipboard className="h-3 w-3 sm:h-4 sm:w-4" />,
      email: <Mail className="h-3 w-3 sm:h-4 sm:w-4" />,
      whatsapp: <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />,
      smart_schedule: <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />,
      aftercare: <Heart className="h-3 w-3 sm:h-4 sm:w-4" />,
      client_file: <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
    }
    
    return destinations?.map((dest, index) => (
      <span key={index} className="inline-flex items-center mr-1">
        {iconMap[dest as keyof typeof iconMap]}
      </span>
    )) || []
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading forms...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-destructive">Error loading forms</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  const totalResponses = forms.reduce((sum, form) => sum + (form.response_count || 0), 0)
  const activeForms = forms.filter(form => form.is_active).length
  const publicForms = forms.filter(form => form.visibility === 'public').length
  const newResponses = responses.filter(response => response.status === 'new').length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header Section - Responsive */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl flex items-center gap-2">
              <Clipboard className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
              FeatherForms
            </h1>
            <p className="text-sm text-muted-foreground lg:text-base">
              Build custom forms and manage responses with smart destinations
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={exportData} variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={handleCreateNewForm} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create Form
            </Button>
          </div>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Total Forms</div>
              <Clipboard className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{forms.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeForms} active
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Responses</div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{totalResponses}</div>
            <p className="text-xs text-muted-foreground">
              {newResponses} new
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Public Forms</div>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{publicForms}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Destinations</div>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Integration types</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="text-sm">Forms</TabsTrigger>
            <TabsTrigger value="responses" className="text-sm">Responses</TabsTrigger>
            <TabsTrigger value="templates" className="text-sm">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Forms</CardTitle>
                <CardDescription>
                  Manage your custom forms and their settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {forms.length === 0 ? (
                  <div className="text-center py-8">
                    <Clipboard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No forms yet</h3>
                    <p className="text-muted-foreground mb-4">Create your first form to get started</p>
                    <Button onClick={handleCreateNewForm}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Form
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden lg:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Form Name</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Responses</TableHead>
                            <TableHead>Destinations</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {forms.map((form) => (
                            <TableRow key={form.id}>
                              <TableCell className="font-medium">
                                <div>
                                  <div className="font-medium">{form.title}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {form.description || 'No description'}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{getVisibilityBadge(form.visibility)}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {form.response_count || 0}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  {getDestinationIcons(form.destinations || [])}
                                </div>
                              </TableCell>
                              <TableCell className="text-sm">
                                {new Date(form.created_at).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => shareForm(form.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDuplicateForm(form.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteForm(form.id)}
                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                      {forms.map((form) => (
                        <Card key={form.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1 flex-1">
                                <h3 className="font-medium text-sm">{form.title}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {form.description || 'No description'}
                                </p>
                              </div>
                              {getVisibilityBadge(form.visibility)}
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <BarChart3 className="h-3 w-3" />
                                  {form.response_count || 0}
                                </span>
                                <span className="text-muted-foreground">
                                  {new Date(form.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center">
                                {getDestinationIcons(form.destinations || [])}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 pt-2 border-t">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => shareForm(form.id)}
                                className="flex-1 h-8 text-xs"
                              >
                                <Share2 className="h-3 w-3 mr-1" />
                                Share
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDuplicateForm(form.id)}
                                className="flex-1 h-8 text-xs"
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteForm(form.id)}
                                className="h-8 w-8 p-0 text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Responses</CardTitle>
                <CardDescription>
                  View and manage all form submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {responses.length === 0 ? (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No responses yet</h3>
                    <p className="text-muted-foreground">Responses will appear here once users submit your forms</p>
                  </div>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Respondent</TableHead>
                            <TableHead>Form</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {responses.map((response) => (
                            <TableRow key={response.id}>
                              <TableCell className="font-medium">
                                <div>
                                  <div className="font-medium text-sm">
                                    {response.respondent_name || 'Anonymous'}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {response.respondent_email || 'No email provided'}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm">{response.form_title}</TableCell>
                              <TableCell className="text-sm">
                                {new Date(response.submitted_at).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Badge variant={response.status === 'new' ? 'default' : 'secondary'} className="text-xs">
                                  {response.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => viewResponse(response.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                      {responses.map((response) => (
                        <Card key={response.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1 flex-1">
                                <h3 className="font-medium text-sm">
                                  {response.respondent_name || 'Anonymous'}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  {response.respondent_email || 'No email provided'}
                                </p>
                                <p className="text-xs font-medium">{response.form_title}</p>
                              </div>
                              <Badge variant={response.status === 'new' ? 'default' : 'secondary'} className="text-xs">
                                {response.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                {new Date(response.submitted_at).toLocaleString()}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewResponse(response.id)}
                                className="h-8 px-3 text-xs"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4 mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Client Intake
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Collect basic client information and project details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={handleCreateNewForm}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clipboard className="h-5 w-5 text-green-500" />
                    Work Order
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Request new work orders with priority and details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={handleCreateNewForm}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-orange-500" />
                    Site Visit
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Site inspection checklist with photo uploads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={handleCreateNewForm}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    Inspection
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Quality inspection form with ratings and notes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={handleCreateNewForm}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Feedback
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Customer satisfaction and feedback collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={handleCreateNewForm}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-dashed border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Plus className="h-5 w-5 text-muted-foreground" />
                    Custom Form
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Start from scratch with a blank form
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={handleCreateNewForm}>
                    Create Custom
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
