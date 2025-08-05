import { useState } from 'react'
import { EditableDocumentLayout } from "./EditableDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { useCompanyData } from "@/hooks/useCompanyData"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function EstimateCreator() {
  const { allClients } = useBusinessData()
  const { generateEstimatePDF, businessData } = usePDFGeneration()
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

      // Create estimate
      const estimateData = {
        estimate_number: data.number,
        client_id: clientId,
        amount: totalAmount,
        estimate_date: data.date,
        status: data.status,
        title: data.lineItems[0]?.name || 'Professional Services Estimate',
        description: data.notes,
        line_items: data.lineItems,
        payment_method: data.paymentMethod,
        terms: data.terms,
        user_id: user.id
      }

      const { error } = await supabase
        .from('estimates')
        .insert([estimateData])

      if (error) throw error

      toast.success("Estimate created successfully!")
    } catch (error) {
      console.error("Error saving estimate:", error)
      toast.error("Failed to save estimate")
      throw error
    }
  }

  const handleGeneratePDF = async (data: any) => {
    try {
      const estimateData = {
        id: data.id || 'temp',
        estimate_number: data.number,
        title: data.lineItems[0]?.name || 'Professional Services Estimate',
        description: data.notes,
        amount: data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0),
        estimate_date: data.date,
        status: data.status,
        line_items: data.lineItems,
        client: data.clientInfo
      }
      
      await generateEstimatePDF(estimateData)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate PDF")
      throw error
    }
  }

  const handleDuplicate = (data: any) => {
    toast.success("Estimate duplicated! You can now edit the copy.")
    // The layout will handle creating a new document with duplicated data
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Estimate</h1>
          <p className="text-gray-600 mt-1">
            Professional estimate with editable line items and instant PDF generation
          </p>
        </div>
      </div>

      <EditableDocumentLayout
        documentType="estimate"
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
        businessData={businessData}
      />
    </div>
  )
}