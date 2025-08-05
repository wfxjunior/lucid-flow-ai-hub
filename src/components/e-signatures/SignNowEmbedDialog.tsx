import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useSignNowIntegration } from "@/hooks/useSignNowIntegration"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface SignNowEmbedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: any
  documentType: string
  onSignatureComplete?: (documentId: string, signedDocumentUrl?: string) => void
}

type SignatureStatus = 'loading' | 'ready' | 'signing' | 'completed' | 'error'

export function SignNowEmbedDialog({
  open,
  onOpenChange,
  document,
  documentType,
  onSignatureComplete
}: SignNowEmbedDialogProps) {
  const [signatureStatus, setSignatureStatus] = useState<SignatureStatus>('loading')
  const [signNowDocumentId, setSignNowDocumentId] = useState<string | null>(null)
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const { uploadAndSendForSignature, checkStatus, downloadSignedDocument, isLoading } = useSignNowIntegration()

  useEffect(() => {
    if (open && document) {
      initializeSignature()
    }
  }, [open, document])

  const initializeSignature = async () => {
    try {
      setSignatureStatus('loading')
      setError(null)

      // Check if document is already pending signature
      if (document.signnow_document_id) {
        const status = await checkStatus(document.signnow_document_id)
        if (status.status === 'completed') {
          setSignatureStatus('completed')
          return
        }
        setSignNowDocumentId(document.signnow_document_id)
        setSignatureUrl(getEmbedUrl(document.signnow_document_id))
        setSignatureStatus('ready')
        return
      }

      // Generate PDF content for upload
      const pdfContent = await generateDocumentPDF()
      if (!pdfContent) {
        throw new Error('Failed to generate PDF content')
      }

      // Get current user info
      const { data: userData } = await supabase.auth.getUser()
      const userEmail = userData.user?.email
      
      if (!userEmail) {
        throw new Error('User email not found')
      }

      // Upload to SignNow and send for signature
      const fileName = `${documentType}_${document.id || Date.now()}.pdf`
      const result = await uploadAndSendForSignature(
        pdfContent,
        fileName,
        userEmail,
        `${userData.user?.user_metadata?.first_name || 'User'} ${userData.user?.user_metadata?.last_name || ''}`
      )

      // Update document with SignNow document ID
      await updateDocumentWithSignNowId(result.documentId)
      
      setSignNowDocumentId(result.documentId)
      setSignatureUrl(getEmbedUrl(result.documentId))
      setSignatureStatus('ready')

    } catch (error) {
      console.error('Error initializing signature:', error)
      setError(error instanceof Error ? error.message : 'Failed to initialize signature')
      setSignatureStatus('error')
      toast.error('Failed to initialize signature process')
    }
  }

  const generateDocumentPDF = async (): Promise<string> => {
    // Generate base64 PDF content from document data
    // This is a simplified implementation - you might want to use your existing PDF generation logic
    const documentData = {
      title: document.title || `${documentType} #${document.id}`,
      content: document.content || document.description || '',
      amount: document.amount || 0,
      date: document.created_at,
      client: document.client || {},
      lineItems: document.line_items || []
    }

    // Create a simple PDF-like content (in real implementation, use your PDF service)
    const pdfContent = btoa(JSON.stringify(documentData))
    return pdfContent
  }

  const getEmbedUrl = (documentId: string): string => {
    // Create SignNow embed URL with necessary parameters
    return `https://signnow.com/sign/${documentId}?embedded=true&auto_close=true&decline_enabled=true`
  }

  const updateDocumentWithSignNowId = async (signNowDocumentId: string) => {
    try {
      const tableName = getTableName(documentType)
      await supabase
        .from(tableName)
        .update({ 
          signnow_document_id: signNowDocumentId,
          status: 'pending_signature',
          updated_at: new Date().toISOString()
        })
        .eq('id', document.id)
    } catch (error) {
      console.error('Error updating document with SignNow ID:', error)
    }
  }

  const getTableName = (type: string): string => {
    const tableMap: Record<string, string> = {
      'estimate': 'estimates',
      'quote': 'quotes',
      'invoice': 'invoices',
      'contract': 'contracts',
      'workorder': 'work_orders',
      'bid': 'bids',
      'proposal': 'business_proposals'
    }
    return tableMap[type] || 'documents'
  }

  const handleSignatureComplete = async () => {
    try {
      setSignatureStatus('signing')
      
      if (!signNowDocumentId) {
        throw new Error('Document ID not found')
      }

      // Check final status
      const status = await checkStatus(signNowDocumentId)
      
      if (status.status === 'completed') {
        // Download signed document
        const signedDoc = await downloadSignedDocument(signNowDocumentId)
        
        // Update document status
        const tableName = getTableName(documentType)
        await supabase
          .from(tableName)
          .update({ 
            status: 'signed',
            signed_at: new Date().toISOString(),
            signed_document_url: signedDoc?.download_url || null
          })
          .eq('id', document.id)

        // Save signature record
        await supabase
          .from('signatures')
          .insert({
            document_id: document.id,
            document_type: documentType,
            signnow_document_id: signNowDocumentId,
            status: 'signed',
            signed_at: new Date().toISOString()
          })

        setSignatureStatus('completed')
        toast.success('Document signed successfully!')
        
        // Call completion callback
        onSignatureComplete?.(signNowDocumentId, signedDoc?.download_url)
        
        // Close dialog after a brief delay
        setTimeout(() => {
          onOpenChange(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error completing signature:', error)
      setError('Failed to complete signature process')
      setSignatureStatus('error')
      toast.error('Failed to complete signature')
    }
  }

  const renderContent = () => {
    switch (signatureStatus) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Preparing document for signature...</p>
          </div>
        )

      case 'ready':
      case 'signing':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Please review and sign the document below
              </p>
              <Button 
                onClick={handleSignatureComplete}
                disabled={signatureStatus === 'signing'}
                size="sm"
              >
                {signatureStatus === 'signing' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Complete Signature'
                )}
              </Button>
            </div>
            
            {signatureUrl && (
              <div className="border rounded-lg overflow-hidden">
                <iframe
                  src={signatureUrl}
                  width="100%"
                  height="600px"
                  frameBorder="0"
                  title="SignNow Document"
                  className="w-full"
                  onLoad={() => {
                    // Listen for signature completion messages
                    window.addEventListener('message', (event) => {
                      if (event.data.type === 'signnow_signature_complete') {
                        handleSignatureComplete()
                      }
                    })
                  }}
                />
              </div>
            )}
          </div>
        )

      case 'completed':
        return (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Document Signed Successfully!</h3>
              <p className="text-sm text-gray-600">
                The document has been signed and saved to your account.
              </p>
            </div>
          </div>
        )

      case 'error':
        return (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <XCircle className="h-12 w-12 text-red-600" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Signature Error</h3>
              <p className="text-sm text-gray-600">{error}</p>
              <Button onClick={initializeSignature} variant="outline" size="sm">
                Try Again
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full h-[80vh] max-h-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            Sign {documentType.charAt(0).toUpperCase() + documentType.slice(1)}
            {document?.title && ` - ${document.title}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}