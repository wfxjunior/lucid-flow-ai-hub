
import { useState } from 'react'
import { EditableDocumentLayout } from "./EditableDocumentLayout"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { useCompanyData } from "@/hooks/useCompanyData"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function ProposalCreator() {
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

      let clientId = data.clientInfo.id
      if (!clientId && data.clientInfo.name && data.clientInfo.email) {
        // Handle client creation
      }

      const totalAmount = data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0)

      const proposalData = {
        proposal_number: data.number,
        client_id: clientId,
        amount: totalAmount,
        submission_date: data.dueDate,
        status: data.status,
        title: data.lineItems[0]?.name || 'Business Proposal',
        description: data.notes,
        line_items: data.lineItems,
        payment_method: data.paymentMethod,
        terms: data.terms,
        user_id: user.id
      }

      console.log('Proposal Data:', proposalData)
      toast.success("Proposal created successfully!")
    } catch (error) {
      console.error("Error saving proposal:", error)
      toast.error("Failed to save proposal")
      throw error
    }
  }

  const handleGeneratePDF = async (data: any) => {
    try {
      const proposalData = {
        id: data.id || 'temp',
        proposal_number: data.number,
        title: data.lineItems[0]?.name || 'Business Proposal',
        description: data.notes,
        amount: data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0),
        proposal_date: data.date,
        submission_date: data.dueDate,
        status: data.status,
        line_items: data.lineItems,
        client: data.clientInfo
      }
      
      await generateEstimatePDF(proposalData)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate PDF")
      throw error
    }
  }

  const handleDuplicate = (data: any) => {
    toast.success("Proposal duplicated! You can now edit the copy.")
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Business Proposal</h1>
          <p className="text-gray-600 mt-1">
            Professional business proposal with editable line items and instant PDF generation
          </p>
        </div>
      </div>

      <EditableDocumentLayout
        documentType="proposal"
        availableClients={availableClients}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
        businessData={businessData}
      />
    </div>
  )
}
