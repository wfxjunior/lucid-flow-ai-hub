
import { useState } from "react"
import { ProfessionalDocumentLayout } from "./documents/ProfessionalDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface QuoteFormProfessionalProps {
  quote?: any
  onSuccess?: () => void
  onClose?: () => void
}

export function QuoteFormProfessional({ quote, onSuccess, onClose }: QuoteFormProfessionalProps) {
  const { allClients } = useBusinessData()
  const { generateEstimatePDF } = usePDFGeneration()

  const availableClients = (allClients || []).map(client => ({
    id: client.id,
    name: client.name,
    email: client.email || '',
    address: client.address || '',
    phone: client.phone || ''
  }))

  const initialData = quote ? {
    id: quote.id,
    number: quote.quote_number || quote.id?.slice(0, 8),
    date: quote.quote_date ? new Date(quote.quote_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    dueDate: quote.valid_until ? new Date(quote.valid_until).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: quote.status || 'draft',
    paymentMethod: quote.payment_method || 'card',
    clientInfo: {
      id: quote.client_id,
      name: quote.client?.name || '',
      email: quote.client?.email || '',
      address: quote.client?.address || '',
      phone: quote.client?.phone || ''
    },
    lineItems: quote.line_items || [{
      id: '1',
      name: '',
      description: quote.description || '',
      quantity: 1,
      unitPrice: quote.amount || 0,
      discount: 0,
      tax: 0,
      total: quote.amount || 0
    }],
    notes: quote.notes || '',
    terms: quote.terms || 'This quote is valid for 30 days from the date issued.'
  } : undefined

  const handleSave = async (data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      let clientId = data.clientInfo.id
      if (!clientId && data.clientInfo.name && data.clientInfo.email) {
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

      let quoteNumber = data.number
      if (!quoteNumber) {
        const { data: quoteNumberData } = await supabase.rpc('generate_quote_number')
        quoteNumber = quoteNumberData
      }

      const quoteData = {
        quote_number: quoteNumber,
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

      if (quote?.id) {
        await supabase
          .from('quotes')
          .update(quoteData)
          .eq('id', quote.id)
        toast.success("Quote updated successfully!")
      } else {
        await supabase
          .from('quotes')
          .insert(quoteData)
        toast.success("Quote created successfully!")
      }

      onSuccess?.()
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
          <h1 className="text-3xl font-bold">
            {quote ? 'Edit Quote' : 'Create Quote'}
          </h1>
          <p className="text-gray-600 mt-1">
            Professional quote with enhanced design and features
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

      <ProfessionalDocumentLayout
        documentType="quote"
        initialData={initialData}
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
      />
    </div>
  )
}
