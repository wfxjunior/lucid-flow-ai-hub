
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, MessageSquare, Send, Inbox, Mail, Settings } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useBusinessData } from "@/hooks/useBusinessData"
import { useUserEmail } from "@/hooks/useUserEmail"
import { RichTextEditor } from "./RichTextEditor"
import { Link } from "react-router-dom"

interface EmailLog {
  id: string
  recipient_email: string
  recipient_name?: string
  subject: string
  email_type: string
  sent_at: string
  status: string
  error_message?: string
}

export function MessagesPage() {
  const { clients } = useBusinessData()
  const { sendEmail, isSending } = useUserEmail()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([])

  const [formData, setFormData] = useState({
    to: '',
    toName: '',
    subject: '',
    content: '',
    messageType: 'email'
  })

  useEffect(() => {
    loadEmailLogs()
  }, [])

  const loadEmailLogs = async () => {
    try {
      const { supabase } = await import('@/integrations/supabase/client')
      const { data, error } = await supabase
        .from('user_email_logs')
        .select('*')
        .order('sent_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setEmailLogs(data || [])
    } catch (error: any) {
      console.error('Error loading email logs:', error)
    }
  }

  const handleClientSelect = (clientId: string) => {
    const client = clients?.find(c => c.id === clientId)
    if (client) {
      setFormData(prev => ({
        ...prev,
        to: client.email,
        toName: client.name
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.to || !formData.subject || !formData.content) {
      return
    }

    if (formData.messageType === 'email') {
      const success = await sendEmail({
        to: formData.to,
        subject: formData.subject,
        content: formData.content,
        emailType: 'client_message',
        recipientName: formData.toName
      })

      if (success) {
        setFormData({
          to: '',
          toName: '',
          subject: '',
          content: '',
          messageType: 'email'
        })
        setIsDialogOpen(false)
        loadEmailLogs()
      }
    } else {
      // SMS functionality would be implemented here
      alert('Funcionalidade de SMS será implementada em breve')
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
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Send New Message</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Select Client</Label>
                    <Select onValueChange={handleClientSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients?.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} ({client.email})
                          </SelectItem>
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
                        <SelectItem value="sms">SMS (Coming Soon)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="to">To (Email Address) *</Label>
                  <Input
                    id="to"
                    type="email"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    placeholder="client@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Enter email subject"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Message Content *</Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    placeholder="Type your message here..."
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1" disabled={isSending}>
                    <Send className="mr-2 h-4 w-4" />
                    {isSending ? 'Sending...' : 'Send Email'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Inbox className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold">{emailLogs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sent Successfully</p>
                <p className="text-2xl font-bold">{emailLogs.filter(m => m.status === 'sent').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Send className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold">{emailLogs.filter(m => m.status === 'failed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailLogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No messages sent yet
              </div>
            ) : (
              emailLogs.map((log) => (
                <div key={log.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <h4 className="font-medium">{log.subject}</h4>
                      <Badge variant={log.status === 'sent' ? 'default' : 'destructive'}>
                        {log.status === 'sent' ? 'Sent' : 'Failed'}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(log.sent_at).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    To: {log.recipient_name ? `${log.recipient_name} (${log.recipient_email})` : log.recipient_email}
                  </p>
                  {log.error_message && (
                    <Alert className="mt-2">
                      <AlertDescription className="text-sm text-red-600">
                        {log.error_message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
