
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EditableDocumentHeader } from "./EditableDocumentHeader"
import { EditableLineItems } from "./EditableLineItems"
import { DocumentActions } from "./DocumentActions"
import { toast } from "sonner"

interface EditableDocumentLayoutProps {
  documentType: string
  initialData?: any
  availableClients: Array<{
    id: string
    name: string
    email: string
    address: string
    phone: string
  }>
  onSave: (data: any) => Promise<void>
  onGeneratePDF: (data: any) => Promise<void>
  onDuplicate: (data: any) => void
}

export function EditableDocumentLayout({
  documentType,
  initialData,
  availableClients,
  onSave,
  onGeneratePDF,
  onDuplicate
}: EditableDocumentLayoutProps) {
  const [formData, setFormData] = useState<any>(initialData || {
    number: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    paymentMethod: 'card',
    clientInfo: {
      id: '',
      name: '',
      email: '',
      address: '',
      phone: ''
    },
    lineItems: [{
      id: '1',
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0
    }],
    notes: '',
    terms: 'This document is valid for 30 days from the date issued.'
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(formData)
    } catch (error) {
      console.error("Error during save:", error)
      toast.error("Failed to save document")
    } finally {
      setIsSaving(false)
    }
  }

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await onGeneratePDF(formData)
    } catch (error) {
      console.error("Error during PDF generation:", error)
      toast.error("Failed to generate PDF")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleDuplicate = () => {
    onDuplicate(formData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            {documentType.charAt(0).toUpperCase() + documentType.slice(1)} Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <EditableDocumentHeader
            documentType={documentType}
            data={formData}
            availableClients={availableClients}
            onChange={setFormData}
          />
          
          <EditableLineItems
            items={formData.lineItems}
            onItemsChange={(items) => setFormData(prev => ({ ...prev, lineItems: items }))}
          />
          
          <div className="border-t pt-6">
            <DocumentActions
              onSave={handleSave}
              onGeneratePDF={handleGeneratePDF}
              onDuplicate={handleDuplicate}
              isSaving={isSaving}
              isGeneratingPDF={isGeneratingPDF}
              document={formData}
              documentType={documentType as any}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
