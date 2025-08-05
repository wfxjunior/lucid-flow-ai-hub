import { useState } from 'react'
import { EditableDocumentLayout } from "./EditableDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { useCompanyData } from "@/hooks/useCompanyData"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function ReceiptCreator() {
  const { allClients } = useBusinessData()
  const { generateReceiptPDF, businessData } = usePDFGeneration()
  const { companyProfile } = useCompanyData()

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

      // Create receipt record in accounting_documents table
      const receiptData = {
        title: data.lineItems[0]?.name || 'Payment Receipt',
        description: data.notes,
        document_type: 'receipt',
        amount: totalAmount,
        date_of_transaction: data.date,
        category: 'Income',
        vendor: data.clientInfo.name,
        status: 'approved',
        file_name: `receipt_${data.number || Date.now()}.pdf`,
        file_url: '', // This would be set when PDF is uploaded
        file_size: 0,
        user_id: user.id
      }

      const { error } = await supabase
        .from('accounting_documents')
        .insert([receiptData])

      if (error) throw error

      toast.success("Receipt created successfully!")
    } catch (error) {
      console.error("Error saving receipt:", error)
      toast.error("Failed to save receipt")
      throw error
    }
  }

  const handleGeneratePDF = async (data: any) => {
    try {
      const receiptData = {
        id: data.id || 'temp',
        receipt_number: data.number,
        title: data.lineItems[0]?.name || 'Payment Receipt',
        description: data.notes,
        amount: data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0),
        created_at: data.date,
        payment_method: data.paymentMethod,
        status: 'paid',
        line_items: data.lineItems,
        client: data.clientInfo
      }
      
      await generateReceiptPDF(receiptData)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate PDF")
      throw error
    }
  }

  const handleDuplicate = (data: any) => {
    toast.success("Receipt duplicated! You can now edit the copy.")
    // The layout will handle creating a new document with duplicated data
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Receipt</h1>
          <p className="text-gray-600 mt-1">
            Professional payment receipt with detailed transaction records
          </p>
        </div>
      </div>

      <EditableDocumentLayout
        documentType="receipt"
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
        businessData={businessData}
      />
    </div>
  )
}