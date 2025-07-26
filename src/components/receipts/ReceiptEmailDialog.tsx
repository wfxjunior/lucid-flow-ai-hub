import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface Receipt {
  id: string
  receipt_number: string
  amount: number
  payment_method: string
  notes: string
  created_at: string
  status?: 'paid' | 'pending'
  clients?: {
    name: string
    email: string
    phone?: string
    address?: string
  }
}

interface ReceiptEmailDialogProps {
  receipt: Receipt
}

export function ReceiptEmailDialog({ receipt }: ReceiptEmailDialogProps) {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    email: receipt.clients?.email || '',
    subject: `Receipt ${receipt.receipt_number}`,
    message: `Dear ${receipt.clients?.name || 'Customer'},

Please find attached your receipt for the payment of $${receipt.amount.toFixed(2)}.

Receipt Number: ${receipt.receipt_number}
Payment Method: ${receipt.payment_method}
Amount: $${receipt.amount.toFixed(2)}
Date: ${new Date(receipt.created_at).toLocaleDateString()}

Thank you for your business!

Best regards,
Your Company`
  })

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email) {
      toast.error('Please enter an email address')
      return
    }

    setLoading(true)
    
    try {
      // Generate receipt PDF data for email
      const receiptData = {
        id: receipt.id,
        receipt_number: receipt.receipt_number,
        amount: receipt.amount,
        payment_method: receipt.payment_method,
        notes: receipt.notes,
        created_at: receipt.created_at,
        status: receipt.status || 'paid',
        client: receipt.clients
      }

      // Send email through edge function
      const { error } = await supabase.functions.invoke('send-receipt-email', {
        body: {
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          receiptData: receiptData
        }
      })

      if (error) throw error

      toast.success('Receipt sent successfully!')
      setIsOpen(false)
    } catch (error) {
      console.error('Error sending receipt:', error)
      toast.error('Failed to send receipt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Mail className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Receipt to Client
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSendEmail} className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium">{receipt.receipt_number}</h4>
            <p className="text-sm text-muted-foreground">{receipt.clients?.name}</p>
            <p className="text-lg font-bold">${receipt.amount.toFixed(2)}</p>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="client@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={8}
              placeholder="Enter your message here..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Sending...' : 'Send Receipt'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}