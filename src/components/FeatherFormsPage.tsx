
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Plus, BarChart3, Settings, Eye } from "lucide-react"
import { FormBuilder } from "./feather-forms/FormBuilder"

export function FeatherFormsPage() {
  const [activeTab, setActiveTab] = useState('builder')

  const mockForms = [
    {
      id: '1',
      title: 'Contact Form',
      description: 'General contact inquiries',
      fields: 5,
      submissions: 23,
      created: '2024-01-10'
    },
    {
      id: '2', 
      title: 'Service Request',
      description: 'Customer service requests',
      fields: 8,
      submissions: 12,
      created: '2024-01-08'
    }
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">FeatherForms</h1>
            <p className="text-muted-foreground">Create and manage custom forms for your business</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Total Forms</span>
              </div>
              <p className="text-2xl font-bold">{mockForms.length}</p>
              <p className="text-xs text-muted-foreground">Active forms</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Submissions</span>
              </div>
              <p className="text-2xl font-bold">{mockForms.reduce((acc, form) => acc + form.submissions, 0)}</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Views</span>
              </div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Conversion</span>
              </div>
              <p className="text-2xl font-bold">68%</p>
              <p className="text-xs text-muted-foreground">Average rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forms">My Forms</TabsTrigger>
            <TabsTrigger value="builder">Form Builder</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Forms</CardTitle>
                    <CardDescription>Manage your created forms</CardDescription>
                  </div>
                  <Button onClick={() => setActiveTab('builder')}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Form
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockForms.map((form) => (
                    <div key={form.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{form.title}</h3>
                          <p className="text-sm text-muted-foreground">{form.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{form.fields} fields</span>
                            <span>{form.submissions} submissions</span>
                            <span>Created {form.created}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Share</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="builder">
            <FormBuilder />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Form Analytics</CardTitle>
                <CardDescription>Track performance of your forms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Submission Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 flex items-center justify-center text-muted-foreground">
                          Chart will be displayed here
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Popular Forms</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {mockForms.map((form) => (
                            <div key={form.id} className="flex justify-between items-center">
                              <span className="text-sm">{form.title}</span>
                              <span className="text-sm font-medium">{form.submissions} submissions</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
