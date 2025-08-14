
import { useState } from "react"
import { ProfessionalDocumentLayout } from "./documents/ProfessionalDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface EstimateFormProfessionalProps {
  estimate?: any
  onSuccess?: () => void
  onClose?: () => void
}

export function EstimateFormProfessional({ estimate, onSuccess, onClose }: EstimateFormProfessionalProps) {
  const { allClients } = useBusinessData()
  const { generateEstimatePDF } = usePDFGeneration()

  const availableClients = (allClients || []).map(client => ({
    id: client.id,
    name: client.name,
    email: client.email || '',
    address: client.address || '',
    phone: client.phone || ''
  }))

  const initialData = estimate ? {
    id: estimate.id,
    number: estimate.estimate_number || estimate.id?.slice(0, 8),
    date: estimate.estimate_date ? new Date(estimate.estimate_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    dueDate: estimate.valid_until ? new Date(estimate.valid_until).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: estimate.status || 'draft',
    paymentMethod: estimate.payment_method || 'card',
    clientInfo: {
      id: estimate.client_id,
      name: estimate.client?.name || '',
      email: estimate.client?.email || '',
      address: estimate.client?.address || '',
      phone: estimate.client?.phone || ''
    },
    lineItems: estimate.line_items || [{
      id: '1',
      name: '',
      description: estimate.description || '',
      quantity: 1,
      unitPrice: estimate.amount || 0,
      discount: 0,
      tax: 0,
      total: estimate.amount || 0
    }],
    notes: estimate.notes || '',
    terms: estimate.terms || 'This estimate is valid for 30 days from the date issued.'
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

      let estimateNumber = data.number
      if (!estimateNumber) {
        const { data: estimateNumberData } = await supabase.rpc('generate_estimate_number')
        estimateNumber = estimateNumberData
      }

      const estimateData = {
        estimate_number: estimateNumber,
        client_id: clientId,
        amount: totalAmount,
        valid_until: data.dueDate,
        status: data.status,
        title: data.lineItems[0]?.name || 'Estimate',
        description: data.notes,
        line_items: data.lineItems,
        payment_method: data.paymentMethod,
        terms: data.terms,
        user_id: user.id
      }

      if (estimate?.id) {
        await supabase
          .from('estimates')
          .update(estimateData)
          .eq('id', estimate.id)
        toast.success("Estimate updated successfully!")
      } else {
        await supabase
          .from('estimates')
          .insert(estimateData)
        toast.success("Estimate created successfully!")
      }

      onSuccess?.()
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
        title: data.lineItems[0]?.name || 'Estimate',
        description: data.notes,
        amount: data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0),
        estimate_date: data.date,
        valid_until: data.dueDate,
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
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {estimate ? 'Edit Estimate' : 'Create Estimate'}
          </h1>
          <p className="text-gray-600 mt-1">
            Professional estimate with enhanced design and features
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
        documentType="estimate"
        initialData={initialData}
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
      />
    </div>
  )
}
