
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Lightbulb,
  HelpCircle,
  Bug,
  Star
} from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { IntegrationsContactForm } from "./IntegrationsContactForm"
import { useNavigate } from 'react-router-dom'

export function ContactPage() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: '',
    priority: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactTypes = [
    {
      id: 'general',
      title: 'General Inquiry',
      description: 'Questions about FeatherBiz, pricing, or general support',
      icon: MessageSquare
    },
    {
      id: 'integrations',
      title: 'Integration Requests',
      description: 'Request new integrations or report integration issues',
      icon: Lightbulb
    },
    {
      id: 'support',
      title: 'Technical Support',
      description: 'Bug reports, technical issues, or feature problems',
      icon: HelpCircle
    },
    {
      id: 'feedback',
      title: 'Feedback & Suggestions',
      description: 'Share your ideas to help us improve FeatherBiz',
      icon: Star
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

    console.log('Contact form submitted:', { ...formData, type: activeTab })
    
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: '',
      priority: ''
    })

    setIsSubmitting(false)
  }

  const renderGeneralForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Send us a Message</CardTitle>
        <CardDescription>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => handleInputChange('category', value)} value={formData.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select inquiry category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billing">Billing & Payments</SelectItem>
                <SelectItem value="features">Features & Functionality</SelectItem>
                <SelectItem value="account">Account Management</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="sales">Sales Inquiry</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="How can we help you?"
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us more about your inquiry..."
              rows={6}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header with Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/f012d690-5b3d-4a3f-94fc-7d7114bb4fe5.png" 
              alt="FeatherBiz" 
              className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            />
          </div>
          <h1 className="text-4xl font-bold">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, suggestions, or need help? We're here to assist you with anything you need.
          </p>
        </div>

        {/* Contact Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {contactTypes.map((type) => (
            <Card 
              key={type.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeTab === type.id ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => setActiveTab(type.id)}
            >
              <CardContent className="p-6 text-center">
                <type.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {renderGeneralForm()}
              </div>
              
              {/* Contact Info Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">support@featherbiz.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-sm text-muted-foreground">
                          123 Business Ave<br />
                          Suite 100<br />
                          San Francisco, CA 94105
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Business Hours</div>
                        <div className="text-sm text-muted-foreground">
                          Mon-Fri: 9AM - 6PM PST<br />
                          Sat-Sun: 10AM - 4PM PST
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Response Times</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">General Inquiries</span>
                      <span className="text-sm font-medium">24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Technical Support</span>
                      <span className="text-sm font-medium">4-8 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Critical Issues</span>
                      <span className="text-sm font-medium">1-2 hours</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsContactForm />
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="w-5 h-5" />
                  Technical Support Request
                </CardTitle>
                <CardDescription>
                  Report bugs, technical issues, or get help with FeatherBiz features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Before submitting a support request:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Check our <a href="/faq" className="underline">FAQ section</a> for common solutions</li>
                      <li>• Try refreshing your browser or clearing cache</li>
                      <li>• Include specific error messages or screenshots</li>
                      <li>• Describe the steps to reproduce the issue</li>
                    </ul>
                  </div>
                </div>
                
                {/* Reuse the general form structure but with technical focus */}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <Label htmlFor="priority">Issue Priority</Label>
                    <Select onValueChange={(value) => handleInputChange('priority', value)} value={formData.priority}>
                      <SelectTrigger>
                        <SelectValue placeholder="How urgent is this issue?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General question or minor issue</SelectItem>
                        <SelectItem value="medium">Medium - Feature not working as expected</SelectItem>
                        <SelectItem value="high">High - Cannot complete important tasks</SelectItem>
                        <SelectItem value="critical">Critical - System completely unusable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Issue Summary *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Detailed Description *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide detailed steps to reproduce the issue, error messages, and any relevant information..."
                      rows={8}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Support Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Share Your Feedback
                </CardTitle>
                <CardDescription>
                  Help us improve FeatherBiz by sharing your thoughts, suggestions, and ideas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <Label htmlFor="category">Feedback Category</Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)} value={formData.category}>
                      <SelectTrigger>
                        <SelectValue placeholder="What type of feedback?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature-request">New Feature Request</SelectItem>
                        <SelectItem value="improvement">Existing Feature Improvement</SelectItem>
                        <SelectItem value="ui-ux">User Interface/Experience</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="general">General Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Feedback Summary *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief summary of your feedback"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Detailed Feedback *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please share your detailed feedback, suggestions, or ideas..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Sending Feedback...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Feedback
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
