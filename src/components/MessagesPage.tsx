
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, MessageSquare, Send, Inbox } from 'lucide-react'

export function MessagesPage() {
  const [messages] = useState([
    {
      id: '1',
      from: 'ABC Corp',
      subject: 'Project Update Required',
      preview: 'Hi, we need an update on the current project status...',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      from: 'XYZ Ltd',
      subject: 'Invoice Payment Confirmation',
      preview: 'Thank you for the invoice. Payment has been processed...',
      time: '1 day ago',
      read: true
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate with clients and team members</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

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
                <p className="text-sm font-medium text-gray-600">Read</p>
                <p className="text-2xl font-bold">{messages.filter(m => m.read).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${!message.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{message.from}</h4>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <h5 className="text-sm font-medium mb-1">{message.subject}</h5>
                  <p className="text-sm text-gray-600">{message.preview}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send New Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">To:</label>
                <Input placeholder="Enter recipient email" />
              </div>
              <div>
                <label className="text-sm font-medium">Subject:</label>
                <Input placeholder="Enter subject" />
              </div>
              <div>
                <label className="text-sm font-medium">Message:</label>
                <Textarea placeholder="Type your message here..." rows={6} />
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
