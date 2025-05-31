
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Send, Eye, Clock, CheckCircle, XCircle, Plus, Upload, Search } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { DocumentForm } from "@/components/DocumentForm"
import { SignatureCanvas } from "@/components/SignatureCanvas"
import { toast } from "sonner"

export function ESignaturesPage() {
  const { clients, documents, signatures, createDocument, sendDocumentForSignature, loading } = useBusinessData()
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [selectedDocument, setSelectedDocument] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showDocumentForm, setShowDocumentForm] = useState(false)

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">E-Signatures</h1>
          <p className="text-muted-foreground">Manage documents and collect digital signatures</p>
        </div>
        <Dialog open={showDocumentForm} onOpenChange={setShowDocumentForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
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

      {/* Send Document Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Document for Signature
          </CardTitle>
          <CardDescription>
            Select a document and client to send for digital signature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="document-select">Select Document</Label>
              <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a document" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDocuments.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>{doc.title}</span>
                        <Badge variant="outline" className={getStatusColor(doc.status)}>
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
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{client.name}</span>
                        <span className="text-sm text-muted-foreground">{client.email}</span>
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
          <SelectTrigger className="w-[180px]">
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
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg truncate">{document.title}</CardTitle>
                  <Badge className={getStatusColor(document.status)}>
                    {getStatusIcon(document.status)}
                    <span className="ml-1">{document.status}</span>
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  Type: {document.document_type}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Created: {new Date(document.created_at).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Signatures Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Signature Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSignatures.map((signature) => (
            <Card key={signature.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg truncate">{signature.document?.title}</CardTitle>
                  <Badge className={getStatusColor(signature.status)}>
                    {getStatusIcon(signature.status)}
                    <span className="ml-1">{signature.status}</span>
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  Client: {signature.client?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sent:</span>
                    <span>{new Date(signature.created_at).toLocaleDateString()}</span>
                  </div>
                  {signature.signed_at && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Signed:</span>
                      <span>{new Date(signature.signed_at).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {signature.status === 'pending' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Send className="h-4 w-4 mr-1" />
                        Remind
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
