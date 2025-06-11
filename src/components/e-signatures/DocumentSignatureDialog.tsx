
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PenTool, FileText } from "lucide-react"
import { useFeatherSignIntegration } from "@/hooks/useFeatherSignIntegration"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"
import { SignatureForm } from "./SignatureForm"
import { getDocumentTitle } from "./utils/documentTitleUtils"
import { generateDocumentPDF } from "./utils/pdfGenerationUtils"

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

  const handleSendForSignature = async (formData: { signerEmail: string; signerName: string }) => {
    if (!formData.signerEmail) {
      toast.error("Please enter signer's email")
      return
    }

    try {
      // Generate PDF content
      const pdfContent = await generateDocumentPDF(document, documentType, generatePDF)
      
      const fileName = `${getDocumentTitle(document, documentType)}.pdf`
      
      // Send for signature using FeatherSign
      const result = await uploadAndSendForSignature(
        pdfContent,
        fileName,
        formData.signerEmail,
        formData.signerName
      )
      
      console.log("Document sent for signature:", result)
      onOpenChange(false)
      
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
            Send "{getDocumentTitle(document, documentType)}" for digital signature
          </DialogDescription>
        </DialogHeader>
        <SignatureForm
          onSubmit={handleSendForSignature}
          onCancel={() => onOpenChange(false)}
          isLoading={featherSignLoading || isGenerating}
        />
      </DialogContent>
    </Dialog>
  )
}
