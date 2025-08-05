import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Save, Eye } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"

interface DocumentPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: any
  documentType: string
  onSave?: () => Promise<void>
  onGeneratePDF?: () => Promise<void>
  businessData?: any
}

export function DocumentPreviewDialog({
  open,
  onOpenChange,
  document,
  documentType,
  onSave,
  onGeneratePDF,
  businessData
}: DocumentPreviewDialogProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleSave = async () => {
    if (!onSave) return
    setIsSaving(true)
    try {
      await onSave()
      toast.success("Document saved successfully!")
    } catch (error) {
      console.error("Error saving document:", error)
      toast.error("Failed to save document")
    } finally {
      setIsSaving(false)
    }
  }

  const handleGeneratePDF = async () => {
    if (!onGeneratePDF) return
    setIsGeneratingPDF(true)
    try {
      await onGeneratePDF()
      toast.success("PDF generated successfully!")
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate PDF")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (date: string) => {
    if (!date) return new Date().toLocaleDateString()
    return new Date(date).toLocaleDateString()
  }

  const getDocumentTitle = () => {
    switch (documentType) {
      case 'invoice': return 'INVOICE'
      case 'estimate': return 'ESTIMATE'
      case 'quote': return 'QUOTE'
      case 'contract': return 'CONTRACT'
      case 'workorder': return 'WORK ORDER'
      case 'bid': return 'BID'
      case 'proposal': return 'PROPOSAL'
      case 'receipt': return 'RECEIPT'
      default: return documentType.toUpperCase()
    }
  }

  const getDocumentNumber = () => {
    switch (documentType) {
      case 'invoice': return document.invoice_number || document.number
      case 'estimate': return document.estimate_number || document.number
      case 'quote': return document.quote_number || document.number
      case 'contract': return document.contract_number || document.number
      case 'workorder': return document.work_order_number || document.number
      case 'bid': return document.bid_number || document.number
      case 'proposal': return document.proposal_number || document.number
      case 'receipt': return document.receipt_number || document.number
      default: return document.number || 'N/A'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Document Preview - {getDocumentTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Content */}
          <div 
            ref={previewRef}
            className="bg-white p-8 border rounded-lg shadow-sm"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '12pt',
              lineHeight: '1.6',
              color: '#333'
            }}
          >
            {/* Header */}
            <div style={{ borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ margin: '0', fontSize: '24pt', color: '#2563eb' }}>
                    {businessData?.companyName || document.companyInfo?.name || 'Your Company'}
                  </h1>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    {businessData?.companyAddress || document.companyInfo?.address || ''}
                  </p>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    {businessData?.companyPhone || document.companyInfo?.phone || ''} | {businessData?.companyEmail || document.companyInfo?.email || ''}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ margin: '0', fontSize: '20pt' }}>{getDocumentTitle()}</h2>
                  <p style={{ margin: '5px 0', color: '#666' }}>#{getDocumentNumber()}</p>
                  <p style={{ margin: '5px 0', color: '#666' }}>Date: {formatDate(document.date)}</p>
                  {document.dueDate && (
                    <p style={{ margin: '5px 0', color: '#666' }}>Due: {formatDate(document.dueDate)}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Client Information */}
            {document.clientInfo && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#2563eb', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                  Bill To:
                </h3>
                <div style={{ margin: '15px 0' }}>
                  <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{document.clientInfo.name}</p>
                  {document.clientInfo.email && (
                    <p style={{ margin: '5px 0' }}>{document.clientInfo.email}</p>
                  )}
                  {document.clientInfo.phone && (
                    <p style={{ margin: '5px 0' }}>{document.clientInfo.phone}</p>
                  )}
                  {document.clientInfo.address && (
                    <p style={{ margin: '5px 0' }}>{document.clientInfo.address}</p>
                  )}
                </div>
              </div>
            )}

            {/* Document Details */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#2563eb', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                {document.title || `${getDocumentTitle()} Details`}
              </h3>
              <div style={{ margin: '15px 0' }}>
                <p style={{ margin: '10px 0' }}><strong>Status:</strong> {document.status || 'Draft'}</p>
                {document.description && (
                  <p style={{ margin: '15px 0', background: '#f9fafb', padding: '15px', borderRadius: '5px' }}>
                    {document.description}
                  </p>
                )}
              </div>
            </div>

            {/* Line Items */}
            {document.lineItems && document.lineItems.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ color: '#333', marginBottom: '15px' }}>Items</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6' }}>
                      <th style={{ border: '1px solid #d1d5db', padding: '10px', textAlign: 'left' }}>Description</th>
                      <th style={{ border: '1px solid #d1d5db', padding: '10px', textAlign: 'center' }}>Qty</th>
                      <th style={{ border: '1px solid #d1d5db', padding: '10px', textAlign: 'right' }}>Rate</th>
                      <th style={{ border: '1px solid #d1d5db', padding: '10px', textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {document.lineItems.map((item: any, index: number) => (
                      <tr key={index}>
                        <td style={{ border: '1px solid #d1d5db', padding: '10px' }}>
                          <strong>{item.name}</strong>
                          {item.description && (
                            <div style={{ fontSize: '10pt', color: '#666', marginTop: '2px' }}>
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td style={{ border: '1px solid #d1d5db', padding: '10px', textAlign: 'center' }}>
                          {item.quantity}
                        </td>
                        <td style={{ border: '1px solid #d1d5db', padding: '10px', textAlign: 'right' }}>
                          {formatCurrency(item.price)}
                        </td>
                        <td style={{ border: '1px solid #d1d5db', padding: '10px', textAlign: 'right' }}>
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: '#f3f4f6', fontWeight: 'bold' }}>
                      <td colSpan={3} style={{ border: '1px solid #d1d5db', padding: '10px', textAlign: 'right' }}>
                        Total:
                      </td>
                      <td style={{ border: '1px solid #d1d5db', padding: '10px', textAlign: 'right' }}>
                        {formatCurrency(document.lineItems.reduce((sum: number, item: any) => sum + item.total, 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Notes */}
            {document.notes && (
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ color: '#333', marginBottom: '15px' }}>Notes</h4>
                <p style={{ background: '#fef3c7', padding: '15px', borderRadius: '5px' }}>
                  {document.notes}
                </p>
              </div>
            )}

            {/* Terms */}
            {document.terms && (
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ color: '#333', marginBottom: '15px' }}>Terms & Conditions</h4>
                <p style={{ background: '#f0f9ff', padding: '15px', borderRadius: '5px', fontSize: '10pt' }}>
                  {document.terms}
                </p>
              </div>
            )}

            {/* Signature Area for contracts/estimates */}
            {(documentType === 'contract' || documentType === 'estimate' || documentType === 'quote') && (
              <div style={{ marginTop: '50px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p><strong>Client Signature:</strong></p>
                    <div style={{ borderBottom: '1px solid #333', width: '200px', margin: '20px 0' }}></div>
                    <p>Date: _________________</p>
                  </div>
                  <div>
                    <p><strong>Company Representative:</strong></p>
                    <div style={{ borderBottom: '1px solid #333', width: '200px', margin: '20px 0' }}></div>
                    <p>Date: _________________</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
            {onSave && (
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Document'}
              </Button>
            )}
            
            {onGeneratePDF && (
              <Button 
                variant="outline" 
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF}
                className="w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingPDF ? 'Generating...' : 'Generate & Download PDF'}
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Close Preview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}