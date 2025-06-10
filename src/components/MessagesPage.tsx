
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MessageSquare, Send, Inbox, Mail } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function MessagesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'ABC Corporation',
      to: 'team@company.com',
      subject: 'Project Update Required',
      content: 'Hi, we need an update on the current project status...',
      time: '2 hours ago',
      read: false,
      type: 'received'
    },
    {
      id: 2,
      from: 'team@company.com',
      to: 'XYZ Limited',
      subject: 'Invoice Payment Confirmation',
      content: 'Thank you for the invoice. Payment has been processed...',
      time: '1 day ago',
      read: true,
      type: 'sent'
    }
  ])

  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    content: '',
    messageType: 'email'
  })

  const clients = ['ABC Corporation', 'XYZ Limited', 'Tech Solutions', 'Future Corp']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.to || !formData.subject || !formData.content) {
      toast.error('Please fill in all required fields')
      return
    }

    const newMessage = {
      id: messages.length + 1,
      from: 'team@company.com',
      to: formData.to,
      subject: formData.subject,
      content: formData.content,
      time: 'Just now',
      read: true,
      type: 'sent'
    }
    
    setMessages([newMessage, ...messages])
    setFormData({
      to: '',
      subject: '',
      content: '',
      messageType: 'email'
    })
    setIsDialogOpen(false)
    
    if (formData.messageType === 'email') {
      toast.success('Email sent successfully!')
    } else {
      toast.success('SMS sent successfully!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Send emails and SMS messages to your clients
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send New Message</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="to">To (Client) *</Label>
                  <Select value={formData.to} onValueChange={(value) => setFormData({ ...formData, to: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client} value={client}>{client}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="messageType">Message Type</Label>
                  <Select value={formData.messageType} onValueChange={(value) => setFormData({ ...formData, messageType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={formData.messageType === 'sms' ? 'SMS message (optional)' : 'Enter email subject'}
                  required={formData.messageType === 'email'}
                />
              </div>

              <div>
                <Label htmlFor="content">Message Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={`Type your ${formData.messageType} message here...`}
                  rows={6}
                  required
                />
                {formData.messageType === 'sms' && (
                  <p className="text-xs text-gray-500 mt-1">
                    SMS character limit: {formData.content.length}/160
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Send {formData.messageType === 'email' ? 'Email' : 'SMS'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Inbox className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold">{messages.filter(m => !m.read).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Send className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sent</p>
                <p className="text-2xl font-bold">{messages.filter(m => m.type === 'sent').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${!message.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${message.type === 'sent' ? 'bg-green-100' : 'bg-blue-100'}`}>
                      {message.type === 'sent' ? 
                        <Send className="w-4 h-4 text-green-600" /> : 
                        <Mail className="w-4 h-4 text-blue-600" />
                      }
                    </div>
                    <h4 className="font-medium">
                      {message.type === 'sent' ? `To: ${message.to}` : `From: ${message.from}`}
                    </h4>
                    {!message.read && <Badge variant="default">New</Badge>}
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <h5 className="text-sm font-medium mb-1">{message.subject}</h5>
                <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
