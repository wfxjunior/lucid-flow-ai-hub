
import { useState } from 'react'
import { EditableDocumentLayout } from "./documents/EditableDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function InvoiceCreator() {
  const { allClients } = useBusinessData()
  const { generateEstimatePDF } = usePDFGeneration()
  const [showList, setShowList] = useState(false)

  // Transform clients for the document layout
  const availableClients = (allClients || []).map(client => ({
    id: client.id,
    name: client.name,
    email: client.email || '',
    address: client.address || '',
    phone: client.phone || ''
  }))

  const handleSave = async (data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Find or create client
      let clientId = data.clientInfo.id
      if (!clientId && data.clientInfo.name && data.clientInfo.email) {
        const { data: existingClient } = await supabase
          .from('clients')
          .select('id')
          .eq('name', data.clientInfo.name.trim())
          .eq('user_id', user.id)
          .single()

        if (existingClient) {
          clientId = existingClient.id
        } else {
          const { data: newClient, error: clientError } = await supabase
            .from('clients')
            .insert([{
              name: data.clientInfo.name.trim(),
              email: data.clientInfo.email.trim(),
              phone: data.clientInfo.phone || null,
              address: data.clientInfo.address || null,
              user_id: user.id
            }])
            .select()
            .single()

          if (clientError) throw clientError
          clientId = newClient.id
        }
      }

      // Calculate total amount from line items
      const totalAmount = data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0)

      // Create invoice
      const invoiceData = {
        invoice_number: data.number,
        client_id: clientId,
        amount: totalAmount,
        due_date: data.dueDate,
        status: data.status,
        title: data.lineItems[0]?.name || 'Professional Services Invoice',
        description: data.notes,
        line_items: data.lineItems,
        payment_method: data.paymentMethod,
        terms: data.terms,
        user_id: user.id
      }

      const { error } = await supabase
        .from('invoices')
        .insert([invoiceData])

      if (error) throw error

      toast.success("Invoice created successfully!")
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
        title: data.lineItems[0]?.name || 'Professional Services Invoice',
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
    // The layout will handle creating a new document with duplicated data
  }

  if (showList) {
    // You could implement an invoice list view here
    return (
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <button 
            onClick={() => setShowList(false)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create New Invoice
          </button>
        </div>
        <div className="text-center py-8 text-gray-500">
          Invoice list view - To be implemented
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Invoice</h1>
          <p className="text-gray-600 mt-1">
            Professional invoice with editable line items and instant PDF generation
          </p>
        </div>
        <button 
          onClick={() => setShowList(true)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View All Invoices
        </button>
      </div>

      <EditableDocumentLayout
        documentType="invoice"
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
      />
    </div>
  )
}
