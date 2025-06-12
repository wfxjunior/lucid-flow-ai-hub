
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface ReceiptEmailData {
  customerName: string
  customerEmail: string
  orderNumber: string
  purchaseDate: string
  items: Array<{
    name: string
    quantity: number
    price: number
    total: number
  }>
  paymentMethod: string
  totalAmount: number
  transactionId: string
  documentType: string
  pdfUrl?: string
}

export function useReceiptEmail() {
  const [isSending, setIsSending] = useState(false)

  const sendReceiptEmail = async (receiptData: ReceiptEmailData) => {
    setIsSending(true)
    try {
      console.log('Sending receipt email for order:', receiptData.orderNumber)
      
      const { data, error } = await supabase.functions.invoke('send-receipt-email', {
        body: receiptData
      })

      if (error) {
        throw error
      }

      console.log('Receipt email sent successfully:', data)
      toast.success('Receipt email sent successfully!')
      return data
    } catch (error) {
      console.error('Error sending receipt email:', error)
      toast.error('Failed to send receipt email')
      throw error
    } finally {
      setIsSending(false)
    }
  }

  const sendInvoiceReceipt = async (invoice: any, transactionId: string) => {
    const receiptData: ReceiptEmailData = {
      customerName: invoice.clientInfo?.name || 'Customer',
      customerEmail: invoice.clientInfo?.email || '',
      orderNumber: invoice.number || invoice.invoiceNumber || '',
      purchaseDate: new Date(invoice.date || invoice.invoiceDate).toLocaleDateString(),
      items: invoice.lineItems?.map((item: any) => ({
        name: item.name || item.description || 'Service',
        quantity: item.quantity || 1,
        price: item.unitPrice || item.rate || 0,
        total: item.total || item.amount || 0
      })) || [],
      paymentMethod: invoice.paymentMethod || 'Card',
      totalAmount: invoice.totals?.total || invoice.total || 0,
      transactionId,
      documentType: 'Invoice',
      pdfUrl: invoice.pdfUrl
    }

    return await sendReceiptEmail(receiptData)
  }

  const sendPaymentReceipt = async (payment: any) => {
    const receiptData: ReceiptEmailData = {
      customerName: payment.customerName || 'Customer',
      customerEmail: payment.customerEmail || '',
      orderNumber: payment.orderNumber || payment.id || '',
      purchaseDate: new Date(payment.date || Date.now()).toLocaleDateString(),
      items: [{
        name: payment.description || 'Payment',
        quantity: 1,
        price: payment.amount || 0,
        total: payment.amount || 0
      }],
      paymentMethod: payment.paymentMethod || 'Card',
      totalAmount: payment.amount || 0,
      transactionId: payment.transactionId || payment.id || '',
      documentType: 'Payment',
      pdfUrl: payment.pdfUrl
    }

    return await sendReceiptEmail(receiptData)
  }

  return {
    isSending,
    sendReceiptEmail,
    sendInvoiceReceipt,
    sendPaymentReceipt
  }
}
