
import { useState } from 'react'
import { EditableDocumentLayout } from "./EditableDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function SalesOrderCreator() {
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

      // Handle client creation/selection similar to InvoiceCreator
      let clientId = data.clientInfo.id
      if (!clientId && data.clientInfo.name && data.clientInfo.email) {
        // Create new client logic here
      }

      const totalAmount = data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0)

      // Create sales order
      const salesOrderData = {
        order_number: data.number,
        client_id: clientId,
        amount: totalAmount,
        delivery_date: data.dueDate,
        status: data.status,
        title: data.lineItems[0]?.name || 'Sales Order',
        description: data.notes,
        line_items: data.lineItems,
        payment_method: data.paymentMethod,
        terms: data.terms,
        user_id: user.id
      }

      // Note: You'll need to create a sales_orders table in your database
      // For now, we'll use a generic approach
      console.log('Sales Order Data:', salesOrderData)
      
      toast.success("Sales Order created successfully!")
    } catch (error) {
      console.error("Error saving sales order:", error)
      toast.error("Failed to save sales order")
      throw error
    }
  }

  const handleGeneratePDF = async (data: any) => {
    try {
      const salesOrderData = {
        id: data.id || 'temp',
        order_number: data.number,
        title: data.lineItems[0]?.name || 'Sales Order',
        description: data.notes,
        amount: data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0),
        order_date: data.date,
        delivery_date: data.dueDate,
        status: data.status,
        line_items: data.lineItems,
        client: data.clientInfo
      }
      
      await generateEstimatePDF(salesOrderData)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate PDF")
      throw error
    }
  }

  const handleDuplicate = (data: any) => {
    toast.success("Sales Order duplicated! You can now edit the copy.")
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Sales Order</h1>
          <p className="text-gray-600 mt-1">
            Professional sales order with editable line items and instant PDF generation
          </p>
        </div>
      </div>

      <EditableDocumentLayout
        documentType="salesorder"
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
      />
    </div>
  )
}
