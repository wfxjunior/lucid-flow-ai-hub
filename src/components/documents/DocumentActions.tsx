
import { Button } from "@/components/ui/button"
import { Copy, Download, Save, PenTool } from "lucide-react"
import { DocumentSignatureDialog } from "@/components/e-signatures/DocumentSignatureDialog"
import { useState } from "react"

interface DocumentActionsProps {
  onSave: () => void
  onGeneratePDF: () => void
  onDuplicate: () => void
  isSaving?: boolean
  isGeneratingPDF?: boolean
  document?: any
  documentType: 'invoice' | 'estimate' | 'quote' | 'contract' | 'workorder' | 'bid' | 'proposal'
}

export function DocumentActions({
  onSave,
  onGeneratePDF,
  onDuplicate,
  isSaving = false,
  isGeneratingPDF = false,
  document,
  documentType
}: DocumentActionsProps) {
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-2">
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

      {document && (
        <DocumentSignatureDialog
          document={document}
          documentType={documentType}
          open={signatureDialogOpen}
          onOpenChange={setSignatureDialogOpen}
        />
      )}
    </div>
  )
}
