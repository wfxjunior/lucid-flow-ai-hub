
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EditableDocumentHeader } from "./EditableDocumentHeader"
import { EditableLineItems } from "./EditableLineItems"
import { DocumentActions } from "./DocumentActions"
import { toast } from "sonner"
import { documentDisplayNames } from "./documentConfig"
import { useDocumentForm } from "./useDocumentForm"

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
  businessData?: any
}

export function EditableDocumentLayout({
  documentType,
  initialData,
  availableClients,
  onSave,
  onGeneratePDF,
  onDuplicate,
  businessData
}: EditableDocumentLayoutProps) {
  const { formData, setFormData, autoGenerateNumbers, generateDocumentNumber } = useDocumentForm(documentType, initialData)
  const [isSaving, setIsSaving] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

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

  const handleDuplicate = async () => {
    // Generate new number for duplicate
    if (autoGenerateNumbers) {
      const newNumber = await generateDocumentNumber()
      if (newNumber) {
        setFormData(prev => ({ ...prev, number: newNumber }))
      }
    } else {
      setFormData(prev => ({ ...prev, number: '' }))
    }
    onDuplicate(formData)
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <Card className="w-full">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl">
            {documentDisplayNames[documentType] || documentType.charAt(0).toUpperCase() + documentType.slice(1)} Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="w-full overflow-x-auto">
            <EditableDocumentHeader
              documentType={documentType}
              documentNumber={formData.number || ''}
              documentDate={formData.date || ''}
              dueDate={formData.dueDate || ''}
              status={formData.status || 'draft'}
              paymentMethod={formData.paymentMethod || 'card'}
              companyInfo={{
                name: formData.companyInfo.name,
                logo: formData.companyInfo.logo || '',
                address: formData.companyInfo.address,
                phone: formData.companyInfo.phone,
                email: formData.companyInfo.email
              }}
              clientInfo={{
                id: formData.clientInfo.id || '',
                name: formData.clientInfo.name,
                email: formData.clientInfo.email,
                address: formData.clientInfo.address,
                phone: formData.clientInfo.phone || ''
              }}
              onCompanyInfoChange={(info) => setFormData(prev => ({ 
                ...prev, 
                companyInfo: {
                  name: info.name,
                  logo: info.logo || '',
                  address: info.address,
                  phone: info.phone,
                  email: info.email
                }
              }))}
              onClientInfoChange={(info) => setFormData(prev => ({ 
                ...prev, 
                clientInfo: {
                  id: info.id || '',
                  name: info.name,
                  email: info.email,
                  address: info.address,
                  phone: info.phone || ''
                }
              }))}
              onDocumentNumberChange={(number) => setFormData(prev => ({ ...prev, number }))}
              onDocumentDateChange={(date) => setFormData(prev => ({ ...prev, date }))}
              onDueDateChange={(dueDate) => setFormData(prev => ({ ...prev, dueDate }))}
              onStatusChange={(status) => setFormData(prev => ({ ...prev, status }))}
              onPaymentMethodChange={(paymentMethod) => setFormData(prev => ({ ...prev, paymentMethod }))}
              availableClients={availableClients}
              autoGenerateNumbers={autoGenerateNumbers}
            />
          </div>
          
          <div className="w-full overflow-x-auto">
            <EditableLineItems
              items={formData.lineItems}
              onItemsChange={(items) => setFormData(prev => ({ ...prev, lineItems: items }))}
              currency={formData.currency}
              onCurrencyChange={(currency) => setFormData(prev => ({ ...prev, currency }))}
            />
          </div>
          
          <div className="border-t pt-4 sm:pt-6 w-full">
            <DocumentActions
              onSave={handleSave}
              onGeneratePDF={handleGeneratePDF}
              onDuplicate={handleDuplicate}
              isSaving={isSaving}
              isGeneratingPDF={isGeneratingPDF}
              document={formData}
              documentType={documentType as 'invoice' | 'estimate' | 'quote' | 'contract' | 'workorder' | 'bid' | 'proposal'}
              businessData={businessData}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
