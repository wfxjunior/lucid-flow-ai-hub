
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clipboard, 
  Plus, 
  Eye, 
  Edit, 
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
  Users
} from 'lucide-react'
import { toast } from "sonner"

export function FeatherFormsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [forms] = useState([
    {
      id: '1',
      title: 'Client Intake Form',
      description: 'Collect basic client information for new projects',
      visibility: 'public',
      responses: 24,
      created_at: '2024-01-15',
      is_active: true,
      destinations: ['internal', 'email']
    },
    {
      id: '2',
      title: 'Work Order Request',
      description: 'Internal form for requesting new work orders',
      visibility: 'team',
      responses: 12,
      created_at: '2024-01-10',
      is_active: true,
      destinations: ['smart_schedule', 'email']
    },
    {
      id: '3',
      title: 'Site Inspection Checklist',
      description: 'Field inspection form with photo uploads',
      visibility: 'private',
      responses: 8,
      created_at: '2024-01-08',
      is_active: true,
      destinations: ['internal', 'client_file']
    },
    {
      id: '4',
      title: 'Feedback Survey',
      description: 'Customer satisfaction and feedback collection',
      visibility: 'public',
      responses: 31,
      created_at: '2024-01-05',
      is_active: true,
      destinations: ['aftercare', 'email']
    }
  ])

  const [responses] = useState([
    {
      id: '1',
      form_title: 'Client Intake Form',
      respondent_name: 'John Smith',
      respondent_email: 'john@example.com',
      submitted_at: '2024-01-15 14:30',
      status: 'new'
    },
    {
      id: '2',
      form_title: 'Work Order Request',
      respondent_name: 'Sarah Johnson',
      respondent_email: 'sarah@company.com',
      submitted_at: '2024-01-15 12:15',
      status: 'processed'
    },
    {
      id: '3',
      form_title: 'Feedback Survey',
      respondent_name: 'Mike Wilson',
      respondent_email: 'mike@email.com',
      submitted_at: '2024-01-15 10:45',
      status: 'new'
    }
  ])

  const createNewForm = () => {
    toast.success('Opening form builder...')
  }

  const duplicateForm = (formId: string) => {
    toast.success('Form duplicated successfully!')
  }

  const deleteForm = (formId: string) => {
    toast.success('Form deleted successfully!')
  }

  const exportData = () => {
    toast.success('Exporting form data to Excel...')
  }

  const shareForm = (formId: string) => {
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
    
    return destinations.map((dest, index) => (
      <span key={index} className="inline-flex items-center mr-1">
        {iconMap[dest as keyof typeof iconMap]}
      </span>
    ))
  }

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
            <Button onClick={createNewForm} className="w-full sm:w-auto">
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
              {forms.filter(f => f.is_active).length} active
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Responses</div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">
              {forms.reduce((sum, f) => sum + f.responses, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {responses.filter(r => r.status === 'new').length} new
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Public Forms</div>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">
              {forms.filter(f => f.visibility === 'public').length}
            </div>
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
                                {form.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getVisibilityBadge(form.visibility)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {form.responses}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getDestinationIcons(form.destinations)}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{form.created_at}</TableCell>
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
                                onClick={() => duplicateForm(form.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteForm(form.id)}
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
                              {form.description}
                            </p>
                          </div>
                          {getVisibilityBadge(form.visibility)}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3" />
                              {form.responses}
                            </span>
                            <span className="text-muted-foreground">{form.created_at}</span>
                          </div>
                          <div className="flex items-center">
                            {getDestinationIcons(form.destinations)}
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
                            onClick={() => duplicateForm(form.id)}
                            className="flex-1 h-8 text-xs"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteForm(form.id)}
                            className="h-8 w-8 p-0 text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
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
                              <div className="font-medium text-sm">{response.respondent_name}</div>
                              <div className="text-xs text-muted-foreground">{response.respondent_email}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{response.form_title}</TableCell>
                          <TableCell className="text-sm">{response.submitted_at}</TableCell>
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
                            <h3 className="font-medium text-sm">{response.respondent_name}</h3>
                            <p className="text-xs text-muted-foreground">{response.respondent_email}</p>
                            <p className="text-xs font-medium">{response.form_title}</p>
                          </div>
                          <Badge variant={response.status === 'new' ? 'default' : 'secondary'} className="text-xs">
                            {response.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{response.submitted_at}</span>
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
                  <Button className="w-full" onClick={createNewForm}>
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
                  <Button className="w-full" onClick={createNewForm}>
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
                  <Button className="w-full" onClick={createNewForm}>
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
                  <Button className="w-full" onClick={createNewForm}>
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
                  <Button className="w-full" onClick={createNewForm}>
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
                  <Button variant="outline" className="w-full" onClick={createNewForm}>
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
