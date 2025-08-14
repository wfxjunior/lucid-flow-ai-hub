
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfessionalDocumentHeader } from "./ProfessionalDocumentHeader"
import { ProfessionalLineItems } from "./ProfessionalLineItems"
import { DocumentActions } from "./DocumentActions"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Document Header */}
      <ProfessionalDocumentHeader
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

      {/* Line Items */}
     <ProfessionalLineItems
        items={formData.lineItems.map(item => ({
          ...item,
          discount: item.discount || 0
        }))}
        onItemsChange={(items) => setFormData(prev => ({ ...prev, lineItems: items }))}
        currency={formData.currency}
        onCurrencyChange={(currency) => setFormData(prev => ({ ...prev, currency }))}
      />

      {/* Notes and Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">
            Notes (Internal)
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Add any internal notes here..."
            rows={4}
            className="resize-none"
          />
        </Card>

        <Card className="p-4">
          <Label htmlFor="terms" className="text-sm font-medium text-gray-700 mb-2 block">
            Terms & Conditions
          </Label>
          <Textarea
            id="terms"
            value={formData.terms}
            onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
            placeholder="Enter terms and conditions..."
            rows={4}
            className="resize-none"
          />
        </Card>
      </div>

      {/* Actions */}
      <Card className="p-6">
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
      </Card>
    </div>
  )
}
