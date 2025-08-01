import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface DocumentEmailData {
  customerName: string
  customerEmail: string
  documentType: 'quote' | 'estimate' | 'invoice' | 'receipt'
  documentNumber: string
  documentDate: string
  items: Array<{
    name: string
    quantity: number
    price: number
    total: number
  }>
  totalAmount: number
  pdfUrl?: string
  notes?: string
  dueDate?: string
  paymentMethod?: string
  transactionId?: string
}

export function useDocumentEmail() {
  const [isSending, setIsSending] = useState(false)

  const sendDocumentEmail = async (documentData: DocumentEmailData) => {
    setIsSending(true)
    try {
      console.log(`Sending ${documentData.documentType} email for:`, documentData.documentNumber)
      
      const { data, error } = await supabase.functions.invoke('send-document-email', {
        body: documentData
      })

      if (error) {
        throw error
      }

      console.log('Document email sent successfully:', data)
      toast.success(`${documentData.documentType.charAt(0).toUpperCase() + documentData.documentType.slice(1)} email sent successfully!`)
      return data
    } catch (error) {
      console.error('Error sending document email:', error)
      toast.error(`Failed to send ${documentData.documentType} email`)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  const sendQuoteEmail = async (quote: any) => {
    const documentData: DocumentEmailData = {
      customerName: quote.clientInfo?.name || quote.client?.name || 'Customer',
      customerEmail: quote.clientInfo?.email || quote.client?.email || '',
      documentType: 'quote',
      documentNumber: quote.number || quote.quoteNumber || '',
      documentDate: new Date(quote.date || quote.quoteDate || Date.now()).toLocaleDateString(),
      items: quote.lineItems?.map((item: any) => ({
        name: item.name || item.description || 'Service',
        quantity: item.quantity || 1,
        price: item.unitPrice || item.rate || 0,
        total: item.total || item.amount || 0
      })) || [],
      totalAmount: quote.totals?.total || quote.total || 0,
      notes: quote.notes || quote.terms || '',
      pdfUrl: quote.pdfUrl
    }

    return await sendDocumentEmail(documentData)
  }

  const sendEstimateEmail = async (estimate: any) => {
    const documentData: DocumentEmailData = {
      customerName: estimate.clientInfo?.name || estimate.client?.name || 'Customer',
      customerEmail: estimate.clientInfo?.email || estimate.client?.email || '',
      documentType: 'estimate',
      documentNumber: estimate.estimate_number || estimate.number || '',
      documentDate: new Date(estimate.estimate_date || estimate.date || Date.now()).toLocaleDateString(),
      items: estimate.lineItems?.map((item: any) => ({
        name: item.name || item.description || estimate.title || 'Service',
        quantity: item.quantity || 1,
        price: item.unitPrice || item.rate || estimate.amount || 0,
        total: item.total || item.amount || estimate.amount || 0
      })) || [{
        name: estimate.title || 'Estimate',
        quantity: 1,
        price: estimate.amount || 0,
        total: estimate.amount || 0
      }],
      totalAmount: estimate.amount || 0,
      notes: estimate.description || estimate.notes || '',
      pdfUrl: estimate.pdfUrl
    }

    return await sendDocumentEmail(documentData)
  }

  const sendInvoiceEmail = async (invoice: any) => {
    const documentData: DocumentEmailData = {
      customerName: invoice.clientInfo?.name || invoice.client?.name || 'Customer',
      customerEmail: invoice.clientInfo?.email || invoice.client?.email || '',
      documentType: 'invoice',
      documentNumber: invoice.invoice_number || invoice.number || '',
      documentDate: new Date(invoice.created_at || invoice.date || Date.now()).toLocaleDateString(),
      dueDate: invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : undefined,
      items: invoice.lineItems?.map((item: any) => ({
        name: item.name || item.description || invoice.title || 'Service',
        quantity: item.quantity || 1,
        price: item.unitPrice || item.rate || invoice.amount || 0,
        total: item.total || item.amount || invoice.amount || 0
      })) || [{
        name: invoice.title || 'Invoice',
        quantity: 1,
        price: invoice.amount || 0,
        total: invoice.amount || 0
      }],
      totalAmount: invoice.amount || 0,
      notes: invoice.description || invoice.notes || '',
      pdfUrl: invoice.pdfUrl
    }

    return await sendDocumentEmail(documentData)
  }

  const sendReceiptEmail = async (receipt: any, transactionId?: string) => {
    const documentData: DocumentEmailData = {
      customerName: receipt.clientInfo?.name || receipt.client?.name || 'Customer',
      customerEmail: receipt.clientInfo?.email || receipt.client?.email || '',
      documentType: 'receipt',
      documentNumber: receipt.receipt_number || receipt.number || '',
      documentDate: new Date(receipt.created_at || receipt.date || Date.now()).toLocaleDateString(),
      paymentMethod: receipt.payment_method || 'Card',
      transactionId: transactionId || receipt.transactionId || receipt.id || '',
      items: receipt.lineItems?.map((item: any) => ({
        name: item.name || item.description || 'Payment',
        quantity: item.quantity || 1,
        price: item.unitPrice || item.rate || receipt.amount || 0,
        total: item.total || item.amount || receipt.amount || 0
      })) || [{
        name: 'Payment',
        quantity: 1,
        price: receipt.amount || 0,
        total: receipt.amount || 0
      }],
      totalAmount: receipt.amount || 0,
      notes: receipt.notes || '',
      pdfUrl: receipt.pdfUrl
    }

    return await sendDocumentEmail(documentData)
  }

  return {
    isSending,
    sendDocumentEmail,
    sendQuoteEmail,
    sendEstimateEmail,
    sendInvoiceEmail,
    sendReceiptEmail
  }
}