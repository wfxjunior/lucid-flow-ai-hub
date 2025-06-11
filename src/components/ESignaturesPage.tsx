
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Send, Eye, Clock, CheckCircle, XCircle, Plus, Upload, Search, Download, Zap, PenTool } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { useFeatherSignIntegration } from "@/hooks/useFeatherSignIntegration"
import { DocumentForm } from "@/components/DocumentForm"
import { toast } from "sonner"

export function ESignaturesPage() {
  const { clients, documents, signatures, createDocument, sendDocumentForSignature, loading } = useBusinessData()
  const { generatePDF, isGenerating } = usePDFGeneration()
  const { uploadAndSendForSignature, checkStatus, downloadSignedDocument, isLoading: featherSignLoading } = useFeatherSignIntegration()
  
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [selectedDocument, setSelectedDocument] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showDocumentForm, setShowDocumentForm] = useState(false)
  const [showFeatherSignDialog, setShowFeatherSignDialog] = useState(false)
  const [featherSignForm, setFeatherSignForm] = useState({
    signerEmail: '',
    signerName: '',
    fileName: ''
  })

  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    return matchesSearch && matchesStatus
  }) || []

  const filteredSignatures = signatures?.filter(sig => {
    const matchesSearch = sig.document?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sig.client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sig.status === statusFilter
    return matchesSearch && matchesStatus
  }) || []

  const handleSendDocument = async () => {
    if (!selectedDocument || !selectedClient) {
      toast.error("Please select both a document and a client")
      return
    }

    try {
      await sendDocumentForSignature(selectedDocument, selectedClient)
      setSelectedDocument("")
      setSelectedClient("")
      toast.success("Document sent for signature successfully!")
    } catch (error) {
      console.error("Error sending document:", error)
      toast.error("Failed to send document")
    }
  }

  const handleFeatherSignUpload = async () => {
    if (!featherSignForm.signerEmail || !featherSignForm.fileName) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      // For demo purposes, we'll create a simple PDF content
      // In a real scenario, you'd get this from a document or generate it
      const pdfContent = "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iaiAKPDwKPj4KZW5kb2JqCjIgMCBvYmoKPDwKPj4KZW5kb2JqCjMgMCBvYmoKPDwKPj4KZW5kb2JqCnRyYWlsZXIKPDwKPj4Kc3RhcnR4cmVmCjEwOQolJUVPRgo="
      
      const result = await uploadAndSendForSignature(
        pdfContent,
        featherSignForm.fileName,
        featherSignForm.signerEmail,
        featherSignForm.signerName
      )
      
      console.log("FeatherSign result:", result)
      setShowFeatherSignDialog(false)
      setFeatherSignForm({ signerEmail: '', signerName: '', fileName: '' })
      
    } catch (error) {
      console.error("FeatherSign error:", error)
    }
  }

  const handleCheckDocumentStatus = async (documentId: string) => {
    try {
      const status = await checkStatus(documentId)
      console.log("Document status:", status)
      toast.success(`Document status: ${status.mapped_status}`)
    } catch (error) {
      console.error("Status check error:", error)
      toast.error("Failed to check document status")
    }
  }

  const handleDownloadSigned = async (documentId: string) => {
    try {
      const result = await downloadSignedDocument(documentId)
      
      // Create download link
      const byteCharacters = atob(result.pdf_data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'application/pdf' })
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `signed-document-${documentId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      toast.success("Signed document downloaded!")
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Failed to download signed document")
    }
  }

  const handleGenerateDocumentPDF = async (document: any) => {
    // Create a temporary element for the document
    const element = document.createElement('div')
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
    
    element.innerHTML = `
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #2563eb; margin: 0;">${document.title}</h1>
        <p style="color: #666; margin: 10px 0;">Document Type: ${document.document_type}</p>
        <p style="color: #666; margin: 5px 0;">Created: ${new Date(document.created_at).toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <div style="white-space: pre-wrap; line-height: 1.8;">${document.content}</div>
      </div>
      
      <div style="margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p style="text-align: center; color: #666; font-style: italic;">
          Document generated from FeatherBiz E-Signatures
        </p>
      </div>
    `
    
    document.body.appendChild(element)
    
    try {
      await generatePDF(element, `document_${document.title}_${Date.now()}.pdf`)
    } finally {
      document.body.removeChild(element)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'declined': return <XCircle className="h-4 w-4" />
      case 'sent': return <Send className="h-4 w-4" />
      case 'draft': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <PenTool className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            FeatherSign E-Signatures
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Professional digital signature solution for your documents</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Dialog open={showFeatherSignDialog} onOpenChange={setShowFeatherSignDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <PenTool className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Send for Signature</span>
                <span className="sm:hidden">FeatherSign</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="mx-4 max-w-md sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Send Document for Signature</DialogTitle>
                <DialogDescription>
                  Upload a document and send it for digital signature
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fileName">Document Name</Label>
                  <Input
                    id="fileName"
                    value={featherSignForm.fileName}
                    onChange={(e) => setFeatherSignForm(prev => ({ ...prev, fileName: e.target.value }))}
                    placeholder="Contract Agreement.pdf"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signerEmail">Signer Email</Label>
                  <Input
                    id="signerEmail"
                    type="email"
                    value={featherSignForm.signerEmail}
                    onChange={(e) => setFeatherSignForm(prev => ({ ...prev, signerEmail: e.target.value }))}
                    placeholder="client@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signerName">Signer Name (Optional)</Label>
                  <Input
                    id="signerName"
                    value={featherSignForm.signerName}
                    onChange={(e) => setFeatherSignForm(prev => ({ ...prev, signerName: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowFeatherSignDialog(false)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button onClick={handleFeatherSignUpload} disabled={featherSignLoading} className="w-full sm:w-auto">
                    {featherSignLoading ? "Sending..." : "Send for Signature"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showDocumentForm} onOpenChange={setShowDocumentForm}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Create Document</span>
                <span className="sm:hidden">Create</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="mx-4 max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
                <DialogDescription>
                  Create a new document for e-signature
                </DialogDescription>
              </DialogHeader>
              <DocumentForm onClose={() => setShowDocumentForm(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* FeatherSign Platform Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-blue-700 text-lg sm:text-xl">
            <PenTool className="h-5 w-5" />
            FeatherSign Platform
          </CardTitle>
          <CardDescription className="text-blue-600 text-sm sm:text-base">
            Secure, legally binding digital signatures for all your business documents. 
            Send documents for signature instantly and track their progress in real-time.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Send Document Section */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Send className="h-5 w-5" />
            Send Document for Signature
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Select a document and client to send for digital signature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="document-select">Select Document</Label>
              <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a document" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDocuments.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      <div className="flex items-center gap-2 max-w-full">
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{doc.title}</span>
                        <Badge variant="outline" className={`${getStatusColor(doc.status)} flex-shrink-0`}>
                          {doc.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-select">Select Client</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      <div className="flex flex-col max-w-full">
                        <span className="font-medium truncate">{client.name}</span>
                        <span className="text-sm text-muted-foreground truncate">{client.email}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleSendDocument} 
            disabled={!selectedDocument || !selectedClient}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            Send for Signature
          </Button>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search documents and signatures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="signed">Signed</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents Grid */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Documents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg truncate">{document.title}</CardTitle>
                  <Badge className={`${getStatusColor(document.status)} flex-shrink-0`}>
                    {getStatusIcon(document.status)}
                    <span className="ml-1 hidden sm:inline">{document.status}</span>
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  Type: {document.document_type}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <span className="text-sm text-muted-foreground block">
                  Created: {new Date(document.created_at).toLocaleDateString()}
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleGenerateDocumentPDF(document)}
                    disabled={isGenerating}
                    className="flex-1 sm:flex-initial"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Signatures Grid */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Signature Requests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSignatures.map((signature) => (
            <Card key={signature.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg truncate">{signature.document?.title || 'Unknown Document'}</CardTitle>
                  <Badge className={`${getStatusColor(signature.status)} flex-shrink-0`}>
                    {getStatusIcon(signature.status)}
                    <span className="ml-1 hidden sm:inline">{signature.status}</span>
                  </Badge>
                </div>
                <CardDescription className="text-sm truncate">
                  Client: {signature.client?.name || 'Unknown Client'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sent:</span>
                    <span className="truncate ml-2">{new Date(signature.created_at).toLocaleDateString()}</span>
                  </div>
                  {signature.signed_at && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Signed:</span>
                      <span className="truncate ml-2">{new Date(signature.signed_at).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    {signature.status === 'pending' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Send className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Remind</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
