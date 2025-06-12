
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Loader2 } from 'lucide-react'
import { useReceiptEmail } from '@/hooks/useReceiptEmail'
import { toast } from 'sonner'

interface ReceiptEmailButtonProps {
  invoice?: any
  payment?: any
  transactionId?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export function ReceiptEmailButton({
  invoice,
  payment,
  transactionId,
  variant = 'outline',
  size = 'sm',
  className
}: ReceiptEmailButtonProps) {
  const { sendInvoiceReceipt, sendPaymentReceipt, isSending } = useReceiptEmail()

  const handleSendReceipt = async () => {
    try {
      if (invoice && transactionId) {
        await sendInvoiceReceipt(invoice, transactionId)
      } else if (payment) {
        await sendPaymentReceipt(payment)
      } else {
        toast.error('Missing required data to send receipt')
        return
      }
      
      toast.success('Receipt email sent successfully!')
    } catch (error) {
      console.error('Failed to send receipt:', error)
      toast.error('Failed to send receipt email')
    }
  }

  return (
    <Button
      onClick={handleSendReceipt}
      disabled={isSending || (!invoice && !payment)}
      variant={variant}
      size={size}
      className={className}
    >
      {isSending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Mail className="mr-2 h-4 w-4" />
      )}
      {isSending ? 'Sending...' : 'Send Receipt'}
    </Button>
  )
}
