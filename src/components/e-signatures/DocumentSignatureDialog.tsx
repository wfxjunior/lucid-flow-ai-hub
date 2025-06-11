import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PenTool, FileText } from "lucide-react"
import { useFeatherSignIntegration } from "@/hooks/useFeatherSignIntegration"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"

interface DocumentSignatureDialogProps {
  document: any
  documentType: 'invoice' | 'estimate' | 'quote' | 'contract' | 'workorder'
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentSignatureDialog({ 
  document, 
  documentType, 
  open, 
  onOpenChange 
}: DocumentSignatureDialogProps) {
  const { uploadAndSendForSignature, isLoading: featherSignLoading } = useFeatherSignIntegration()
  const { generatePDF, isGenerating } = usePDFGeneration()
  const [signatureForm, setSignatureForm] = useState({
    signerEmail: '',
    signerName: '',
    includeMySignature: false
  })

  const getDocumentTitle = () => {
    switch (documentType) {
      case 'invoice':
        return document.title || `Invoice #${document.invoice_number || document.number || document.id?.slice(0, 8)}`
      case 'estimate':
        return document.title || `Estimate #${document.estimate_number || document.number || document.id?.slice(0, 8)}`
      case 'quote':
        return document.title || `Quote #${document.quote_number || document.number || document.id?.slice(0, 8)}`
      case 'contract':
        return document.title || `Contract #${document.contract_number || document.number || document.id?.slice(0, 8)}`
      case 'workorder':
        return document.title || `Work Order #${document.work_order_number || document.number || document.id?.slice(0, 8)}`
      default:
        return document.title || document.name || 'Document'
    }
  }

  const generateDocumentPDF = async () => {
    // Create a temporary element for the document
    const element = window.document.createElement('div')
    element.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      font-family: Arial, sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #333;
    `
    
    const documentTitle = getDocumentTitle()
    const amount = document.amount || document.total_amount || 0
    const createdDate = document.created_at || document.invoice_date || document.estimate_date || new Date().toISOString()
    
    element.innerHTML = `
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #2563eb; margin: 0; font-size: 24pt;">${documentTitle}</h1>
        <p style="color: #666; margin: 10px 0;">Type: ${documentType.toUpperCase()}</p>
        <p style="color: #666; margin: 5px 0;">Created: ${new Date(createdDate).toLocaleDateString()}</p>
        <p style="color: #666; margin: 5px 0;">Amount: $${amount.toFixed(2)}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Document Details</h3>
        <div style="margin-top: 20px;">
          ${document.description ? `<p><strong>Description:</strong> ${document.description}</p>` : ''}
          ${document.notes ? `<p><strong>Notes:</strong> ${document.notes}</p>` : ''}
          ${document.line_items ? `
            <div style="margin-top: 20px;">
              <h4>Line Items:</h4>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="border: 1px solid #dee2e6; padding: 8px; text-align: left;">Description</th>
                    <th style="border: 1px solid #dee2e6; padding: 8px; text-align: right;">Quantity</th>
                    <th style="border: 1px solid #dee2e6; padding: 8px; text-align: right;">Rate</th>
                    <th style="border: 1px solid #dee2e6; padding: 8px; text-align: right;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${document.line_items.map((item: any) => `
                    <tr>
                      <td style="border: 1px solid #dee2e6; padding: 8px;">${item.name || item.description}</td>
                      <td style="border: 1px solid #dee2e6; padding: 8px; text-align: right;">${item.quantity || 1}</td>
                      <td style="border: 1px solid #dee2e6; padding: 8px; text-align: right;">$${(item.rate || item.unitPrice || 0).toFixed(2)}</td>
                      <td style="border: 1px solid #dee2e6; padding: 8px; text-align: right;">$${(item.total || item.amount || 0).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}
        </div>
      </div>
      
      <div style="margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <div style="height: 80px; border: 1px solid #e5e7eb; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa;">
          <span style="color: #666; font-style: italic;">Digital Signature Area</span>
        </div>
        <p style="margin: 0; font-size: 10pt; color: #666;">
          This document requires digital signature. Please sign electronically to validate this ${documentType}.
        </p>
      </div>
      
      <div style="margin-top: 30px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p style="color: #666; font-style: italic; font-size: 10pt;">
          Document generated from FeatherBiz Platform
        </p>
      </div>
    `
    
    window.document.body.appendChild(element)
    
    try {
      // Generate PDF and convert to base64
      await generatePDF(element, `${documentType}_${documentTitle}_${Date.now()}.pdf`)
      
      // For now, we'll use a dummy base64 PDF content for the signature service
      // In a real implementation, you'd capture the actual PDF content
      const dummyPDFContent = "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iaiAKPDwKPj4KZW5kb2JqCjIgMCBvYmoKPDwKPj4KZW5kb2JqCjMgMCBvYmoKPDwKPj4KZW5kb2JqCnRyYWlsZXIKPDwKPj4Kc3RhcnR4cmVmCjEwOQolJUVPRgo="
      
      return dummyPDFContent
    } finally {
      window.document.body.removeChild(element)
    }
  }

  const handleSendForSignature = async () => {
    if (!signatureForm.signerEmail) {
      toast.error("Please enter signer's email")
      return
    }

    try {
      // Generate PDF content
      const pdfContent = await generateDocumentPDF()
      
      const fileName = `${getDocumentTitle()}.pdf`
      
      // Send for signature using FeatherSign
      const result = await uploadAndSendForSignature(
        pdfContent,
        fileName,
        signatureForm.signerEmail,
        signatureForm.signerName
      )
      
      console.log("Document sent for signature:", result)
      onOpenChange(false)
      setSignatureForm({ signerEmail: '', signerName: '', includeMySignature: false })
      
      toast.success("Document sent for signature successfully!")
      
    } catch (error) {
      console.error("Error sending document for signature:", error)
      toast.error("Failed to send document for signature")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <PenTool className="h-4 w-4" />
          <span className="hidden sm:inline">Send for Signature</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Send Document for Signature
          </DialogTitle>
          <DialogDescription>
            Send "{getDocumentTitle()}" for digital signature
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signerEmail">Signer Email *</Label>
            <Input
              id="signerEmail"
              type="email"
              value={signatureForm.signerEmail}
              onChange={(e) => setSignatureForm(prev => ({ ...prev, signerEmail: e.target.value }))}
              placeholder="client@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signerName">Signer Name (Optional)</Label>
            <Input
              id="signerName"
              value={signatureForm.signerName}
              onChange={(e) => setSignatureForm(prev => ({ ...prev, signerName: e.target.value }))}
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button 
              onClick={handleSendForSignature} 
              disabled={featherSignLoading || isGenerating || !signatureForm.signerEmail}
              className="w-full sm:w-auto"
            >
              {featherSignLoading || isGenerating ? "Sending..." : "Send for Signature"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
