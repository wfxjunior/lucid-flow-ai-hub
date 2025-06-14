
import { useState } from "react"
import { EditableDocumentLayout } from "./documents/EditableDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface InvoiceFormProps {
  invoice?: any
  onSuccess?: () => void
  onClose?: () => void
}

export function InvoiceForm({ invoice, onSuccess, onClose }: InvoiceFormProps) {
  const { allClients } = useBusinessData()
  const { generateEstimatePDF } = usePDFGeneration()

  const availableClients = (allClients || []).map(client => ({
    id: client.id,
    name: client.name,
    email: client.email || '',
    address: client.address || '',
    phone: client.phone || ''
  }))

  // Transform invoice data if editing
  const initialData = invoice ? {
    id: invoice.id,
    number: invoice.invoice_number || invoice.id?.slice(0, 8),
    date: invoice.invoice_date ? new Date(invoice.invoice_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    dueDate: invoice.due_date ? new Date(invoice.due_date).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: invoice.status || 'draft',
    paymentMethod: invoice.payment_method || 'card',
    clientInfo: {
      id: invoice.client_id,
      name: invoice.client?.name || '',
      email: invoice.client?.email || '',
      address: invoice.client?.address || '',
      phone: invoice.client?.phone || ''
    },
    lineItems: invoice.line_items || [{
      id: '1',
      name: '',
      description: invoice.description || '',
      quantity: 1,
      unitPrice: invoice.amount || 0,
      tax: 0,
      total: invoice.amount || 0
    }],
    notes: invoice.notes || '',
    terms: invoice.terms || 'Payment is due within 30 days from the date of this invoice.'
  } : undefined

  const handleSave = async (data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      let clientId = data.clientInfo.id
      if (!clientId && data.clientInfo.name && data.clientInfo.email) {
        // Create new client if needed
        const { data: newClient } = await supabase
          .from('clients')
          .insert({
            name: data.clientInfo.name,
            email: data.clientInfo.email,
            address: data.clientInfo.address,
            phone: data.clientInfo.phone,
            user_id: user.id
          })
          .select()
          .single()
        
        if (newClient) clientId = newClient.id
      }

      const totalAmount = data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0)

      // Generate invoice number if auto-generation is enabled and no number provided
      let invoiceNumber = data.number
      if (!invoiceNumber) {
        const { data: invoiceNumberData } = await supabase.rpc('generate_invoice_number')
        invoiceNumber = invoiceNumberData
      }

      const invoiceData = {
        invoice_number: invoiceNumber,
        client_id: clientId,
        amount: totalAmount,
        due_date: data.dueDate,
        status: data.status,
        title: data.lineItems[0]?.name || 'Invoice',
        description: data.notes,
        line_items: data.lineItems,
        payment_method: data.paymentMethod,
        terms: data.terms,
        user_id: user.id
      }

      if (invoice?.id) {
        await supabase
          .from('invoices')
          .update(invoiceData)
          .eq('id', invoice.id)
        toast.success("Invoice updated successfully!")
      } else {
        await supabase
          .from('invoices')
          .insert(invoiceData)
        toast.success("Invoice created successfully!")
      }

      onSuccess?.()
    } catch (error) {
      console.error("Error saving invoice:", error)
      toast.error("Failed to save invoice")
      throw error
    }
  }

  const handleGeneratePDF = async (data: any) => {
    try {
      const invoiceData = {
        id: data.id || 'temp',
        invoice_number: data.number,
        title: data.lineItems[0]?.name || 'Invoice',
        description: data.notes,
        amount: data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0),
        invoice_date: data.date,
        due_date: data.dueDate,
        status: data.status,
        line_items: data.lineItems,
        client: data.clientInfo
      }
      
      await generateEstimatePDF(invoiceData)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate PDF")
      throw error
    }
  }

  const handleDuplicate = (data: any) => {
    toast.success("Invoice duplicated! You can now edit the copy.")
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {invoice ? 'Edit Invoice' : 'Create Invoice'}
          </h1>
          <p className="text-gray-600 mt-1">
            Professional invoice with editable line items and instant PDF generation
          </p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg font-medium"
          >
            × Back to List
          </button>
        )}
      </div>

      <EditableDocumentLayout
        documentType="invoice"
        initialData={initialData}
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
      />
    </div>
  )
}
