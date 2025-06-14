
import { useState } from 'react'
import { EditableDocumentLayout } from "./EditableDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function QuoteCreator() {
  const { allClients } = useBusinessData()
  const { generateEstimatePDF } = usePDFGeneration()

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

      let clientId = data.clientInfo.id
      if (!clientId && data.clientInfo.name && data.clientInfo.email) {
        // Handle client creation
      }

      const totalAmount = data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0)

      const quoteData = {
        quote_number: data.number,
        client_id: clientId,
        amount: totalAmount,
        valid_until: data.dueDate,
        status: data.status,
        title: data.lineItems[0]?.name || 'Quote',
        description: data.notes,
        line_items: data.lineItems,
        payment_method: data.paymentMethod,
        terms: data.terms,
        user_id: user.id
      }

      console.log('Quote Data:', quoteData)
      toast.success("Quote created successfully!")
    } catch (error) {
      console.error("Error saving quote:", error)
      toast.error("Failed to save quote")
      throw error
    }
  }

  const handleGeneratePDF = async (data: any) => {
    try {
      const quoteData = {
        id: data.id || 'temp',
        quote_number: data.number,
        title: data.lineItems[0]?.name || 'Quote',
        description: data.notes,
        amount: data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0),
        quote_date: data.date,
        valid_until: data.dueDate,
        status: data.status,
        line_items: data.lineItems,
        client: data.clientInfo
      }
      
      await generateEstimatePDF(quoteData)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate PDF")
      throw error
    }
  }

  const handleDuplicate = (data: any) => {
    toast.success("Quote duplicated! You can now edit the copy.")
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Quote</h1>
          <p className="text-gray-600 mt-1">
            Professional quote with editable line items and instant PDF generation
          </p>
        </div>
      </div>

      <EditableDocumentLayout
        documentType="quote"
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
      />
    </div>
  )
}
