
import { Button } from "@/components/ui/button"
import { Copy, Download, Save, PenTool, Eye } from "lucide-react"
import { DocumentSignatureDialog } from "@/components/e-signatures/DocumentSignatureDialog"
import { SignNowEmbedDialog } from "@/components/e-signatures/SignNowEmbedDialog"
import { DocumentPreviewDialog } from "./DocumentPreviewDialog"
import { useState } from "react"

interface DocumentActionsProps {
  onSave: () => Promise<void>
  onGeneratePDF: () => Promise<void>
  onDuplicate: () => void
  isSaving?: boolean
  isGeneratingPDF?: boolean
  document?: any
  documentType: 'invoice' | 'estimate' | 'quote' | 'contract' | 'workorder' | 'bid' | 'proposal'
  businessData?: any
}

export function DocumentActions({
  onSave,
  onGeneratePDF,
  onDuplicate,
  isSaving = false,
  isGeneratingPDF = false,
  document,
  documentType,
  businessData
}: DocumentActionsProps) {
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false)
  const [signNowEmbedDialogOpen, setSignNowEmbedDialogOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)

  // Check if document is pending signature
  const isPendingSignature = document?.status === 'pending' || document?.status === 'pending_signature'
  const isSignedDocument = document?.status === 'signed'

  // Map extended document types to supported signature types
  const getSignatureDocumentType = (type: string): 'invoice' | 'estimate' | 'quote' | 'contract' | 'workorder' => {
    switch (type) {
      case 'bid':
      case 'proposal':
        return 'contract' // Map bids and proposals to contract type for signatures
      default:
        return type as 'invoice' | 'estimate' | 'quote' | 'contract' | 'workorder'
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button 
        variant="outline"
        onClick={() => setPreviewDialogOpen(true)}
        className="w-full sm:w-auto"
      >
        <Eye className="mr-2 h-4 w-4" />
        Preview
      </Button>

      <Button 
        onClick={onSave}
        disabled={isSaving}
        className="w-full sm:w-auto"
      >
        <Save className="mr-2 h-4 w-4" />
        {isSaving ? 'Saving...' : 'Save'}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onGeneratePDF}
        disabled={isGeneratingPDF}
        className="w-full sm:w-auto"
      >
        <Download className="mr-2 h-4 w-4" />
        {isGeneratingPDF ? 'Generating...' : 'Generate PDF'}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onDuplicate}
        className="w-full sm:w-auto"
      >
        <Copy className="mr-2 h-4 w-4" />
        Duplicate
      </Button>

      {/* Sign Receipt/Contract Button - Show when document status is pending */}
      {isPendingSignature && (
        <Button 
          onClick={() => setSignNowEmbedDialogOpen(true)}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
        >
          <PenTool className="mr-2 h-4 w-4" />
          Sign {documentType === 'invoice' ? 'Receipt' : 'Contract'}
        </Button>
      )}

      {/* Show signature status for signed documents */}
      {isSignedDocument && (
        <Button 
          variant="outline"
          disabled
          className="w-full sm:w-auto border-green-200 text-green-700"
        >
          <Eye className="mr-2 h-4 w-4" />
          Document Signed
        </Button>
      )}

      {document && (
        <>
          <DocumentPreviewDialog
            open={previewDialogOpen}
            onOpenChange={setPreviewDialogOpen}
            document={document}
            documentType={documentType}
            onSave={onSave}
            onGeneratePDF={onGeneratePDF}
            businessData={businessData}
          />
          
          <DocumentSignatureDialog
            document={document}
            documentType={getSignatureDocumentType(documentType)}
            open={signatureDialogOpen}
            onOpenChange={setSignatureDialogOpen}
          />
          
          <SignNowEmbedDialog
            open={signNowEmbedDialogOpen}
            onOpenChange={setSignNowEmbedDialogOpen}
            document={document}
            documentType={getSignatureDocumentType(documentType)}
            onSignatureComplete={(documentId, signedDocumentUrl) => {
              console.log('Signature completed:', { documentId, signedDocumentUrl })
              // Optionally refresh the document or trigger parent refresh
            }}
          />
        </>
      )}
    </div>
  )
}
