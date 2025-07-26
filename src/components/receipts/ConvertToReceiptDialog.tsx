import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, AlertTriangle } from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface ConvertToReceiptDialogProps {
  type: 'invoice' | 'estimate'
  item: any
  onReceiptCreated: () => void
}

export function ConvertToReceiptDialog({ type, item, onReceiptCreated }: ConvertToReceiptDialogProps) {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    payment_method: 'cash',
    notes: `Converted from ${type} ${type === 'invoice' ? item.invoice_number : item.estimate_number}`,
    status: 'paid' as 'paid' | 'pending'
  })

  const handleConvert = async () => {
    if (!confirm(`Do you want to convert this ${type} into a receipt?`)) {
      return
    }

    setLoading(true)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Generate receipt number
      const { data: receiptNumber } = await supabase.rpc('generate_receipt_number')

      const receiptData = {
        client_id: item.client_id,
        amount: item.amount,
        payment_method: formData.payment_method,
        notes: formData.notes,
        status: formData.status,
        receipt_number: receiptNumber || `REC-${Date.now()}`,
        user_id: user.id,
        invoice_id: type === 'invoice' ? item.id : null
      }

      const { error } = await supabase
        .from('receipts')
        .insert([receiptData])

      if (error) throw error

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} converted to receipt successfully!`)
      onReceiptCreated()
      setIsOpen(false)
    } catch (error) {
      console.error(`Error converting ${type} to receipt:`, error)
      toast.error(`Failed to convert ${type} to receipt`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Copy className="h-4 w-4 mr-1" />
          Convert
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Copy className="h-5 w-5" />
            Convert {type.charAt(0).toUpperCase() + type.slice(1)} to Receipt
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">
              {type === 'invoice' ? item.invoice_number : item.estimate_number}
            </h4>
            <p className="text-sm text-blue-700">{item.clients?.name}</p>
            <p className="text-lg font-bold text-blue-900">${item.amount.toFixed(2)}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Conversion Details:</p>
                <p>This will create a new receipt with the same client details and amount.</p>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="payment_method">Payment Method</Label>
            <Select 
              value={formData.payment_method} 
              onValueChange={(value) => setFormData({ ...formData, payment_method: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="debit_card">Debit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'paid' | 'pending') => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              {loading ? 'Converting...' : 'Convert to Receipt'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}