import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, FileText, PenTool, Download } from "lucide-react"
import { SignNowEmbedDialog } from "@/components/e-signatures/SignNowEmbedDialog"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface DocumentInfo {
  id: string
  title: string
  type: string
  amount: number
  status: string
  created_at: string
  client_name: string
  company_name: string
  signnow_document_id?: string
  signed_at?: string
  signed_document_url?: string
}

export function ClientPortalPage() {
  const { documentId } = useParams()
  const [searchParams] = useSearchParams()
  const clientToken = searchParams.get('token')
  
  const [document, setDocument] = useState<DocumentInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [signDialogOpen, setSignDialogOpen] = useState(false)

  useEffect(() => {
    if (documentId && clientToken) {
      fetchDocumentInfo()
    }
  }, [documentId, clientToken])

  const fetchDocumentInfo = async () => {
    try {
      setLoading(true)
      setError(null)

      // Verify client token and fetch document
      const { data, error } = await supabase.functions.invoke('verify-client-portal-access', {
        body: { documentId, clientToken }
      })

      if (error) throw error

      if (data.success) {
        setDocument(data.document)
      } else {
        setError(data.error || 'Access denied')
      }
    } catch (error) {
      console.error('Error fetching document:', error)
      setError('Failed to load document information')
    } finally {
      setLoading(false)
    }
  }

  const handleSignDocument = () => {
    if (document?.status === 'pending' || document?.status === 'pending_signature') {
      setSignDialogOpen(true)
    }
  }

  const handleSignatureComplete = async (signNowDocumentId: string, signedDocumentUrl?: string) => {
    try {
      // Update local state
      setDocument(prev => prev ? {
        ...prev,
        status: 'signed',
        signed_at: new Date().toISOString(),
        signed_document_url: signedDocumentUrl || undefined
      } : null)

      // Refresh document info
      await fetchDocumentInfo()
      
      toast.success('Document signed successfully!')
      setSignDialogOpen(false)
    } catch (error) {
      console.error('Error handling signature completion:', error)
      toast.error('Failed to update document status')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
      case 'pending_signature':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending Signature</Badge>
      case 'signed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Signed</Badge>
      case 'sent':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Sent</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Access Error</h2>
            <p className="text-gray-600">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="w-full"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Document Not Found</h2>
            <p className="text-gray-600">The requested document could not be found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isPendingSignature = document.status === 'pending' || document.status === 'pending_signature'
  const isSigned = document.status === 'signed'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Document Portal</h1>
              <p className="text-gray-600">Secure document signing for {document.client_name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Document Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {document.title || `${document.type.charAt(0).toUpperCase() + document.type.slice(1)} #${document.id.slice(-6)}`}
                </CardTitle>
                {getStatusBadge(document.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Document Type</p>
                  <p className="text-gray-600">{document.type.charAt(0).toUpperCase() + document.type.slice(1)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Amount</p>
                  <p className="text-gray-600">${document.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Client</p>
                  <p className="text-gray-600">{document.client_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Company</p>
                  <p className="text-gray-600">{document.company_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Created</p>
                  <p className="text-gray-600">{new Date(document.created_at).toLocaleDateString()}</p>
                </div>
                {document.signed_at && (
                  <div>
                    <p className="text-sm font-medium text-gray-900">Signed</p>
                    <p className="text-gray-600">{new Date(document.signed_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Card */}
          <Card>
            <CardContent className="p-6">
              {isPendingSignature && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Ready for Signature</h3>
                    <p className="text-gray-600 mt-1">
                      This document requires your electronic signature to proceed.
                    </p>
                  </div>
                  <Button 
                    onClick={handleSignDocument}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <PenTool className="h-5 w-5 mr-2" />
                    Sign Document
                  </Button>
                </div>
              )}

              {isSigned && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Document Signed</h3>
                    <p className="text-gray-600 mt-1">
                      This document has been successfully signed and completed.
                    </p>
                  </div>
                  {document.signed_document_url && (
                    <Button 
                      onClick={() => window.open(document.signed_document_url, '_blank')}
                      variant="outline"
                      size="lg"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Signed Document
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Secure Document Signing</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    This document is protected with enterprise-grade security. Your signature is legally binding and fully encrypted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sign Dialog */}
      {document && (
        <SignNowEmbedDialog
          open={signDialogOpen}
          onOpenChange={setSignDialogOpen}
          document={document}
          documentType={document.type}
          onSignatureComplete={handleSignatureComplete}
        />
      )}
    </div>
  )
}