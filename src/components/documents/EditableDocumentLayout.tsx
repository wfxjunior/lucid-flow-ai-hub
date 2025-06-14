
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EditableDocumentHeader } from "./EditableDocumentHeader"
import { EditableLineItems } from "./EditableLineItems"
import { DocumentActions } from "./DocumentActions"
import { toast } from "sonner"
import { getDefaultCurrency } from "@/utils/currencyUtils"

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

// Document type display names
const documentDisplayNames: Record<string, string> = {
  invoice: "Invoice",
  estimate: "Estimate", 
  quote: "Quote",
  proposal: "Business Proposal",
  contract: "Contract",
  workorder: "Work Order",
  salesorder: "Sales Order",
  bid: "Bid"
}

// Document-specific terms
const documentTerms: Record<string, string> = {
  invoice: "Payment is due within 30 days from the date of this invoice.",
  estimate: "This estimate is valid for 30 days from the date issued.",
  quote: "This quote is valid for 30 days from the date issued.",
  proposal: "This proposal is valid for 30 days from the date issued.",
  contract: "This contract is subject to the terms and conditions outlined herein.",
  workorder: "Work to be completed as specified in this order.",
  salesorder: "Delivery terms and conditions apply as specified.",
  bid: "This bid is valid for 30 days from the submission date."
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
    currency: getDefaultCurrency().code,
    companyInfo: {
      name: '',
      logo: '',
      address: '',
      phone: '',
      email: ''
    },
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
    terms: documentTerms[documentType] || 'Terms and conditions apply.'
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        currency: initialData.currency || getDefaultCurrency().code,
        terms: initialData.terms || documentTerms[documentType] || 'Terms and conditions apply.'
      })
    }
  }, [initialData, documentType])

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
            {documentDisplayNames[documentType] || documentType.charAt(0).toUpperCase() + documentType.slice(1)} Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <EditableDocumentHeader
            documentType={documentType}
            documentNumber={formData.number || ''}
            documentDate={formData.date || ''}
            dueDate={formData.dueDate || ''}
            status={formData.status || 'draft'}
            paymentMethod={formData.paymentMethod || 'card'}
            companyInfo={formData.companyInfo || { name: '', logo: '', address: '', phone: '', email: '' }}
            clientInfo={formData.clientInfo || { id: '', name: '', email: '', address: '', phone: '' }}
            onCompanyInfoChange={(info) => setFormData(prev => ({ ...prev, companyInfo: info }))}
            onClientInfoChange={(info) => setFormData(prev => ({ ...prev, clientInfo: info }))}
            onDocumentNumberChange={(number) => setFormData(prev => ({ ...prev, number }))}
            onDocumentDateChange={(date) => setFormData(prev => ({ ...prev, date }))}
            onDueDateChange={(dueDate) => setFormData(prev => ({ ...prev, dueDate }))}
            onStatusChange={(status) => setFormData(prev => ({ ...prev, status }))}
            onPaymentMethodChange={(paymentMethod) => setFormData(prev => ({ ...prev, paymentMethod }))}
            availableClients={availableClients}
          />
          
          <EditableLineItems
            items={formData.lineItems}
            onItemsChange={(items) => setFormData(prev => ({ ...prev, lineItems: items }))}
            currency={formData.currency}
            onCurrencyChange={(currency) => setFormData(prev => ({ ...prev, currency }))}
          />
          
          <div className="border-t pt-6">
            <DocumentActions
              onSave={handleSave}
              onGeneratePDF={handleGeneratePDF}
              onDuplicate={handleDuplicate}
              isSaving={isSaving}
              isGeneratingPDF={isGeneratingPDF}
              document={formData}
              documentType={documentType as 'invoice' | 'estimate' | 'quote' | 'contract' | 'workorder' | 'bid' | 'proposal'}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
