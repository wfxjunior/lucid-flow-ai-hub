
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  MessageSquare, 
  Mail, 
  Lightbulb,
  Clock,
  CheckCircle,
  Plus,
  Globe,
  Database,
  Zap,
  CreditCard,
  Users,
  BarChart3
} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export function IntegrationsContactForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    integrationName: '',
    category: '',
    description: '',
    businessUse: '',
    priority: '',
    currentSolution: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    'Accounting & Finance',
    'CRM & Sales',
    'Communication',
    'Project Management',
    'Marketing',
    'E-commerce',
    'HR & Payroll',
    'File Storage',
    'Analytics',
    'Automation',
    'Other'
  ]

  const priorities = [
    { value: 'low', label: 'Nice to have', description: 'Would be useful but not urgent' },
    { value: 'medium', label: 'Important', description: 'Would significantly improve workflow' },
    { value: 'high', label: 'Critical', description: 'Essential for business operations' }
  ]

  const popularRequests = [
    { name: 'Slack', category: 'Communication', requests: 47 },
    { name: 'Trello', category: 'Project Management', requests: 32 },
    { name: 'HubSpot', category: 'CRM & Sales', requests: 28 },
    { name: 'Shopify', category: 'E-commerce', requests: 24 },
    { name: 'Xero', category: 'Accounting', requests: 19 }
  ]

  const lovableCompatibleIntegrations = [
    {
      category: 'Web APIs & REST Services',
      description: 'Any service with a REST API or webhook support',
      examples: ['Stripe', 'PayPal', 'Twilio', 'SendGrid', 'Mailchimp'],
      icon: Globe,
      compatibility: 'Excellent'
    },
    {
      category: 'Database Services',
      description: 'Cloud databases and data storage services',
      examples: ['Supabase', 'Firebase', 'Airtable', 'Google Sheets API'],
      icon: Database,
      compatibility: 'Excellent'
    },
    {
      category: 'Authentication Providers',
      description: 'OAuth and SSO authentication services',
      examples: ['Google OAuth', 'GitHub', 'LinkedIn', 'Auth0'],
      icon: Users,
      compatibility: 'Excellent'
    },
    {
      category: 'Payment Processing',
      description: 'Online payment and billing platforms',
      examples: ['Stripe', 'PayPal', 'Paddle'],
      icon: CreditCard,
      compatibility: 'Excellent'
    },
    {
      category: 'Analytics & Tracking',
      description: 'Web analytics and user tracking services',
      examples: ['Google Analytics', 'Mixpanel', 'Hotjar', 'Posthog'],
      icon: BarChart3,
      compatibility: 'Good'
    },
    {
      category: 'Automation & Webhooks',
      description: 'Services that support webhook notifications',
      examples: ['Zapier', 'Make.com', 'IFTTT', 'Custom webhooks'],
      icon: Zap,
      compatibility: 'Good'
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Integration request submitted:', formData)
    
    toast({
      title: "Request Submitted Successfully!",
      description: "We'll review your integration request and get back to you within 2-3 business days.",
    })

    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      integrationName: '',
      category: '',
      description: '',
      businessUse: '',
      priority: '',
      currentSolution: ''
    })

    setIsSubmitting(false)
  }

  const handlePopularRequest = (integration: typeof popularRequests[0]) => {
    setFormData(prev => ({
      ...prev,
      integrationName: integration.name,
      category: integration.category
    }))
  }

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case 'Excellent': return 'text-green-600 bg-green-50 border-green-200'
      case 'Good': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Lightbulb className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Request New Integration</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Can't find the integration you need? Let us know what tools you'd like to connect with FeatherBiz and we'll prioritize building them.
        </p>
      </div>

      {/* Lovable Compatible Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Lovable-Compatible Integration Types
          </CardTitle>
          <CardDescription>
            These types of integrations work excellently with Lovable's React/TypeScript architecture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lovableCompatibleIntegrations.map((integration, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <integration.icon className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold">{integration.category}</h4>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getCompatibilityColor(integration.compatibility)}`}
                  >
                    {integration.compatibility}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{integration.description}</p>
                <div className="flex flex-wrap gap-1">
                  {integration.examples.map((example, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What works best with Lovable:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>REST APIs:</strong> Services with HTTP/JSON APIs integrate seamlessly</li>
              <li>• <strong>Webhooks:</strong> Real-time notifications and event-driven integrations</li>
              <li>• <strong>JavaScript SDKs:</strong> Client-side libraries work perfectly in React</li>
              <li>• <strong>Cloud Services:</strong> SaaS platforms with modern API architectures</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-900 mb-2">Limited compatibility:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• <strong>Desktop-only software:</strong> Applications without web APIs</li>
              <li>• <strong>Legacy systems:</strong> Old systems with SOAP or proprietary protocols</li>
              <li>• <strong>Direct database access:</strong> Services requiring direct DB connections</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Integration Request Form
              </CardTitle>
              <CardDescription>
                Tell us about the integration you need and how it would help your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Your Company Inc."
                  />
                </div>

                {/* Integration Details */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Integration Details</h3>
                  
                  <div>
                    <Label htmlFor="integration-name">Integration Name *</Label>
                    <Input
                      id="integration-name"
                      value={formData.integrationName}
                      onChange={(e) => handleInputChange('integrationName', e.target.value)}
                      placeholder="e.g., Slack, QuickBooks, Salesforce"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)} value={formData.category}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select integration category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Integration Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Briefly describe what this integration does and its main features..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="business-use">How would you use this integration? *</Label>
                    <Textarea
                      id="business-use"
                      value={formData.businessUse}
                      onChange={(e) => handleInputChange('businessUse', e.target.value)}
                      placeholder="Describe your specific use case and how this integration would help your business workflow..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select onValueChange={(value) => handleInputChange('priority', value)} value={formData.priority}>
                      <SelectTrigger>
                        <SelectValue placeholder="How important is this integration?" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <div>
                              <div className="font-medium">{priority.label}</div>
                              <div className="text-sm text-muted-foreground">{priority.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="current-solution">Current Solution (Optional)</Label>
                    <Textarea
                      id="current-solution"
                      value={formData.currentSolution}
                      onChange={(e) => handleInputChange('currentSolution', e.target.value)}
                      placeholder="What tools or workarounds are you currently using for this need?"
                      rows={2}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Integration Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Requests</CardTitle>
              <CardDescription>
                Most requested integrations from our community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularRequests.map((request, index) => (
                <div 
                  key={request.name}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handlePopularRequest(request)}
                >
                  <div>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-muted-foreground">{request.category}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      {request.requests} requests
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Process Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Our Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Review Request</div>
                    <div className="text-sm text-muted-foreground">We evaluate feasibility and demand within 2-3 days</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Development</div>
                    <div className="text-sm text-muted-foreground">High-priority integrations are added to our roadmap</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Release</div>
                    <div className="text-sm text-muted-foreground">You'll be notified when the integration is available</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about integrations or need technical assistance?
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:integrations@featherbiz.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
