import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, CreditCard, DollarSign, TrendingUp, Link2, Mail, MessageSquare } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export function PaymentsPage() {
  const [payments] = useState([
    {
      id: '1',
      amount: 2500,
      client: 'ABC Corp',
      method: 'Bank Transfer',
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: '2',
      amount: 1200,
      client: 'XYZ Ltd', 
      method: 'Credit Card',
      status: 'pending',
      date: '2024-01-14'
    }
  ])

  const [showCreateLink, setShowCreateLink] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [clientName, setClientName] = useState('')
  const [description, setDescription] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const { toast } = useToast()

  const handleCreatePaymentLink = () => {
    if (!paymentAmount || !clientName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    // Generate a mock payment link
    const linkId = Math.random().toString(36).substr(2, 9)
    const paymentLink = `${window.location.origin}/pay/${linkId}`
    setGeneratedLink(paymentLink)
    
    toast({
      title: "Payment Link Created",
      description: "Your payment link has been generated successfully!"
    })
  }

  const handleShareViaEmail = () => {
    const subject = `Payment Request - ${description || 'Invoice'}`
    const body = `Hi ${clientName},\n\nPlease use the following link to complete your payment of $${paymentAmount}:\n\n${generatedLink}\n\nThank you!`
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
  }

  const handleShareViaWhatsApp = () => {
    const message = `Hi ${clientName}, please use this link to complete your payment of $${paymentAmount}: ${generatedLink}`
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappLink, '_blank')
  }

  const handleShareViaSMS = () => {
    const message = `Hi ${clientName}, please use this link to complete your payment of $${paymentAmount}: ${generatedLink}`
    const smsLink = `sms:?body=${encodeURIComponent(message)}`
    window.open(smsLink, '_blank')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
    toast({
      title: "Link Copied",
      description: "Payment link copied to clipboard!"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Manage customer payments and transactions</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCreateLink} onOpenChange={setShowCreateLink}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Link2 className="h-4 w-4 mr-2" />
                Create Payment Link
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Payment Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Client Name *</label>
                  <Input
                    placeholder="Enter client name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Amount *</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    placeholder="Payment description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                {!generatedLink ? (
                  <Button onClick={handleCreatePaymentLink} className="w-full">
                    Generate Payment Link
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Payment Link</label>
                      <div className="flex gap-2">
                        <Input value={generatedLink} readOnly />
                        <Button onClick={copyToClipboard} variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Share via:</p>
                      <div className="flex gap-2">
                        <Button onClick={handleShareViaSMS} variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          SMS
                        </Button>
                        <Button onClick={handleShareViaEmail} variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button onClick={handleShareViaWhatsApp} variant="outline" size="sm" className="bg-green-50 hover:bg-green-100">
                          💬 WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${payments.reduce((sum, p) => sum + p.amount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{payments.filter(p => p.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{payments.filter(p => p.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Client</th>
                  <th className="text-left p-2">Method</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="p-2 font-semibold">${payment.amount}</td>
                    <td className="p-2">{payment.client}</td>
                    <td className="p-2">{payment.method}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        payment.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-2">{payment.date}</td>
                    <td className="p-2">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
