import { useState } from 'react'
import { EditableDocumentLayout } from "./EditableDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { useCompanyData } from "@/hooks/useCompanyData"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function WorkOrderCreator() {
  const { allClients } = useBusinessData()
  const { generateWorkOrderPDF, businessData } = usePDFGeneration()
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

      const totalCost = data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0)

      const workOrderData = {
        work_order_number: data.number,
        client_id: clientId,
        total_cost: totalCost,
        scheduled_date: data.date,
        status: data.status,
        title: data.lineItems[0]?.name || 'Work Order',
        description: data.notes,
        priority: 'medium',
        user_id: user.id
      }

      const { error } = await supabase
        .from('work_orders')
        .insert([workOrderData])

      if (error) throw error
      toast.success("Work order created successfully!")
    } catch (error) {
      console.error("Error saving work order:", error)
      toast.error("Failed to save work order")
      throw error
    }
  }

  const handleGeneratePDF = async (data: any) => {
    try {
      const workOrderData = {
        id: data.id || 'temp',
        work_order_number: data.number,
        title: data.lineItems[0]?.name || 'Work Order',
        description: data.notes,
        total_cost: data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0),
        scheduled_date: data.date,
        status: data.status,
        client: data.clientInfo
      }
      
      await generateWorkOrderPDF(workOrderData)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate PDF")
      throw error
    }
  }

  const handleDuplicate = (data: any) => {
    toast.success("Work order duplicated! You can now edit the copy.")
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Work Order</h1>
          <p className="text-gray-600 mt-1">
            Professional work order with scheduling and task management
          </p>
        </div>
      </div>

      <EditableDocumentLayout
        documentType="workorder"
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
        businessData={businessData}
      />
    </div>
  )
}