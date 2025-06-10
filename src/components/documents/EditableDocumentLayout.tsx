
import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { EditableDocumentHeader } from "./EditableDocumentHeader"
import { EditableLineItems, LineItem } from "./EditableLineItems"
import { DocumentActions } from "./DocumentActions"

interface CompanyInfo {
  name: string
  logo?: string
  address: string
  phone: string
  email: string
}

interface ClientInfo {
  id?: string
  name: string
  email: string
  address: string
  phone?: string
}

interface DocumentData {
  id?: string
  number: string
  date: string
  dueDate: string
  status: string
  paymentMethod: string
  companyInfo: CompanyInfo
  clientInfo: ClientInfo
  lineItems: LineItem[]
  notes: string
  terms: string
}

interface EditableDocumentLayoutProps {
  documentType: string
  initialData?: Partial<DocumentData>
  availableClients?: ClientInfo[]
  onSave: (data: DocumentData) => Promise<void>
  onGeneratePDF: (data: DocumentData) => Promise<void>
  onDuplicate: (data: DocumentData) => void
  className?: string
}

export function EditableDocumentLayout({
  documentType,
  initialData,
  availableClients = [],
  onSave,
  onGeneratePDF,
  onDuplicate,
  className = ""
}: EditableDocumentLayoutProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  
  const [documentData, setDocumentData] = useState<DocumentData>({
    number: `${documentType.toUpperCase()}-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    paymentMethod: 'card',
    companyInfo: {
      name: 'FeatherBiz',
      address: '123 Business St, Suite 100\nBusiness City, BC 12345',
      phone: '(555) 123-4567',
      email: 'info@featherbiz.com'
    },
    clientInfo: {
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
    terms: 'Payment due within 30 days. Thank you for your business!',
    ...initialData
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(documentData)
    } finally {
      setIsSaving(false)
    }
  }

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await onGeneratePDF(documentData)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleDuplicate = () => {
    const duplicatedData = {
      ...documentData,
      id: undefined,
      number: `${documentType.toUpperCase()}-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'draft'
    }
    onDuplicate(duplicatedData)
  }

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Document Header */}
      <EditableDocumentHeader
        documentType={documentType}
        documentNumber={documentData.number}
        documentDate={documentData.date}
        dueDate={documentData.dueDate}
        status={documentData.status}
        paymentMethod={documentData.paymentMethod}
        companyInfo={documentData.companyInfo}
        clientInfo={documentData.clientInfo}
        availableClients={availableClients}
        onCompanyInfoChange={(info) => setDocumentData(prev => ({ ...prev, companyInfo: info }))}
        onClientInfoChange={(info) => setDocumentData(prev => ({ ...prev, clientInfo: info }))}
        onDocumentNumberChange={(number) => setDocumentData(prev => ({ ...prev, number }))}
        onDocumentDateChange={(date) => setDocumentData(prev => ({ ...prev, date }))}
        onDueDateChange={(dueDate) => setDocumentData(prev => ({ ...prev, dueDate }))}
        onStatusChange={(status) => setDocumentData(prev => ({ ...prev, status }))}
        onPaymentMethodChange={(paymentMethod) => setDocumentData(prev => ({ ...prev, paymentMethod }))}
      />

      {/* Line Items */}
      <EditableLineItems
        items={documentData.lineItems}
        onItemsChange={(lineItems) => setDocumentData(prev => ({ ...prev, lineItems }))}
      />

      {/* Notes and Terms */}
      <div className="bg-white border rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <Textarea
            value={documentData.notes}
            onChange={(e) => setDocumentData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Additional notes..."
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
          <Textarea
            value={documentData.terms}
            onChange={(e) => setDocumentData(prev => ({ ...prev, terms: e.target.value }))}
            placeholder="Payment terms and conditions..."
            rows={3}
          />
        </div>
      </div>

      {/* Document Actions */}
      <DocumentActions
        documentType={documentType}
        documentData={documentData}
        onSave={handleSave}
        onGeneratePDF={handleGeneratePDF}
        onDuplicate={handleDuplicate}
        isSaving={isSaving}
        isGeneratingPDF={isGeneratingPDF}
      />
    </div>
  )
}
