
import { supabase } from '@/integrations/supabase/client'

export class ReceiptService {
  static async sendAutomaticReceipt(orderData: {
    type: 'payment' | 'invoice' | 'purchase'
    customerEmail: string
    customerName: string
    orderNumber: string
    items: Array<{
      name: string
      quantity: number
      price: number
      total: number
    }>
    totalAmount: number
    paymentMethod: string
    transactionId: string
    pdfUrl?: string
  }) {
    try {
      console.log('Triggering automatic receipt email for:', orderData.orderNumber)
      
      const receiptData = {
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        orderNumber: orderData.orderNumber,
        purchaseDate: new Date().toLocaleDateString(),
        items: orderData.items,
        paymentMethod: orderData.paymentMethod,
        totalAmount: orderData.totalAmount,
        transactionId: orderData.transactionId,
        documentType: orderData.type.charAt(0).toUpperCase() + orderData.type.slice(1),
        pdfUrl: orderData.pdfUrl
      }

      const { data, error } = await supabase.functions.invoke('send-receipt-email', {
        body: receiptData
      })

      if (error) {
        throw error
      }

      console.log('Automatic receipt email sent successfully')
      return data
    } catch (error) {
      console.error('Failed to send automatic receipt:', error)
      // Don't throw the error to avoid breaking the main payment flow
      return null
    }
  }

  static async sendInvoicePaymentReceipt(invoice: any, transactionId: string) {
    if (!invoice.clientInfo?.email) {
      console.warn('Cannot send receipt: customer email not found')
      return null
    }

    return await this.sendAutomaticReceipt({
      type: 'invoice',
      customerEmail: invoice.clientInfo.email,
      customerName: invoice.clientInfo.name || 'Customer',
      orderNumber: invoice.number || invoice.invoiceNumber || '',
      items: invoice.lineItems?.map((item: any) => ({
        name: item.name || item.description || 'Service',
        quantity: item.quantity || 1,
        price: item.unitPrice || item.rate || 0,
        total: item.total || item.amount || 0
      })) || [],
      totalAmount: invoice.totals?.total || invoice.total || 0,
      paymentMethod: invoice.paymentMethod || 'Card',
      transactionId,
      pdfUrl: invoice.pdfUrl
    })
  }

  static async sendPaymentReceipt(payment: any) {
    if (!payment.customerEmail) {
      console.warn('Cannot send receipt: customer email not found')
      return null
    }

    return await this.sendAutomaticReceipt({
      type: 'payment',
      customerEmail: payment.customerEmail,
      customerName: payment.customerName || payment.clientName || 'Customer',
      orderNumber: payment.orderNumber || payment.id || '',
      items: [{
        name: payment.description || 'Payment',
        quantity: 1,
        price: payment.amount || 0,
        total: payment.amount || 0
      }],
      totalAmount: payment.amount || 0,
      paymentMethod: payment.paymentMethod || payment.method || 'Card',
      transactionId: payment.transactionId || payment.id || '',
      pdfUrl: payment.pdfUrl
    })
  }
}
