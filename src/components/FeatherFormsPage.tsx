
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
    const variants = {
      public: 'default',
      team: 'secondary',
      private: 'outline'
    }
    return <Badge variant={variants[visibility as keyof typeof variants]}>{visibility}</Badge>
  }

  const getDestinationIcons = (destinations: string[]) => {
    const iconMap = {
      internal: <Clipboard className="h-4 w-4" />,
      email: <Mail className="h-4 w-4" />,
      whatsapp: <MessageSquare className="h-4 w-4" />,
      smart_schedule: <Calendar className="h-4 w-4" />,
      aftercare: <Heart className="h-4 w-4" />,
      client_file: <FileText className="h-4 w-4" />
    }
    
    return destinations.map((dest, index) => (
      <span key={index} className="inline-flex items-center mr-1">
        {iconMap[dest as keyof typeof iconMap]}
      </span>
    ))
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Clipboard className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            FeatherForms
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Build custom forms and manage responses with smart destinations
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
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

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Forms</CardTitle>
            <Clipboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{forms.length}</div>
            <p className="text-xs text-muted-foreground">
              {forms.filter(f => f.is_active).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Responses</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {forms.reduce((sum, f) => sum + f.responses, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {responses.filter(r => r.status === 'new').length} new
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Public Forms</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {forms.filter(f => f.visibility === 'public').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Destinations</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              Integration types
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Forms</TabsTrigger>
          <TabsTrigger value="responses" className="text-xs sm:text-sm">Responses</TabsTrigger>
          <TabsTrigger value="templates" className="text-xs sm:text-sm">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">My Forms</CardTitle>
              <CardDescription className="text-sm">
                Manage your custom forms and their settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Form Name</TableHead>
                      <TableHead className="text-xs sm:text-sm">Visibility</TableHead>
                      <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Responses</TableHead>
                      <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Destinations</TableHead>
                      <TableHead className="text-xs sm:text-sm hidden md:table-cell">Created</TableHead>
                      <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forms.map((form) => (
                      <TableRow key={form.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="text-xs sm:text-sm font-medium">{form.title}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-32 sm:max-w-48">
                              {form.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getVisibilityBadge(form.visibility)}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline" className="text-xs">
                            {form.responses}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center">
                            {getDestinationIcons(form.destinations)}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                          {form.created_at}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => shareForm(form.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => duplicateForm(form.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteForm(form.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Form Responses</CardTitle>
              <CardDescription className="text-sm">
                View and manage all form submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Respondent</TableHead>
                      <TableHead className="text-xs sm:text-sm">Form</TableHead>
                      <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Submitted</TableHead>
                      <TableHead className="text-xs sm:text-sm">Status</TableHead>
                      <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {responses.map((response) => (
                      <TableRow key={response.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="text-xs sm:text-sm font-medium">{response.respondent_name}</div>
                            <div className="text-xs text-muted-foreground">{response.respondent_email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">{response.form_title}</TableCell>
                        <TableCell className="hidden sm:table-cell text-xs sm:text-sm">{response.submitted_at}</TableCell>
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
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
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
              <CardHeader>
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
              <CardHeader>
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
              <CardHeader>
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
              <CardHeader>
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
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5 text-gray-500" />
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
  )
}
