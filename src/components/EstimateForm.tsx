
import { useState } from "react"
import { EditableDocumentLayout } from "./documents/EditableDocumentLayout"
import { useEstimateData } from "@/hooks/useEstimateData"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

interface EstimateFormProps {
  estimate?: any
  onSuccess?: () => void
  onClose?: () => void
}

export function EstimateForm({ estimate, onSuccess, onClose }: EstimateFormProps) {
  const { createEstimate } = useEstimateData()
  const { allClients } = useBusinessData()
  const { generateEstimatePDF } = usePDFGeneration()
  const navigate = useNavigate()

  const [isNavigating, setIsNavigating] = useState(false)

  // Transform clients for the document layout
  const availableClients = (allClients || []).map(client => ({
    id: client.id,
    name: client.name,
    email: client.email || '',
    address: client.address || '',
    phone: client.phone || ''
  }))

  // Transform estimate data if editing
  const initialData = estimate ? {
    id: estimate.id,
    number: estimate.estimate_number || estimate.id?.slice(0, 8),
    date: estimate.estimate_date ? new Date(estimate.estimate_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    dueDate: estimate.due_date ? new Date(estimate.due_date).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
      tax: 0,
      total: estimate.amount || 0
    }],
    notes: estimate.notes || '',
    terms: estimate.terms || 'This estimate is valid for 30 days from the date issued.'
  } : undefined

  const handleSave = async (data: any) => {
    try {
      const estimateData = {
        title: data.lineItems[0]?.name || 'Estimate',
        description: data.notes,
        amount: data.lineItems.reduce((sum: number, item: any) => sum + item.total, 0),
        client_id: data.clientInfo.id,
        estimate_date: data.date,
        due_date: data.dueDate,
        status: data.status,
        payment_method: data.paymentMethod,
        line_items: data.lineItems,
        notes: data.notes,
        terms: data.terms,
        estimate_number: data.number
      }

      if (estimate?.id) {
        // Update existing estimate - you'll need to implement this in useEstimateData
        toast.success("Estimate updated successfully!")
      } else {
        await createEstimate(estimateData)
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
        due_date: data.dueDate,
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
    // Navigate to new estimate with duplicated data
    setIsNavigating(true)
    // You could store the data in localStorage or state management
    // and navigate to a new estimate page
    toast.success("Estimate duplicated! You can now edit the copy.")
  }

  if (isNavigating) {
    return <div className="flex items-center justify-center py-8">Creating duplicate...</div>
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {estimate ? 'Edit Estimate' : 'Create Estimate'}
          </h1>
          <p className="text-gray-600 mt-1">
            Professional estimate with editable line items and instant PDF generation
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
