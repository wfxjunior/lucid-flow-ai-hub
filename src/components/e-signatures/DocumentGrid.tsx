
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Download, Clock, CheckCircle, XCircle, Send } from "lucide-react"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"

interface Document {
  id: string
  title: string
  document_type: string
  status: string
  created_at: string
  content: string
}

interface DocumentGridProps {
  documents: Document[]
}

export function DocumentGrid({ documents }: DocumentGridProps) {
  const { generatePDF, isGenerating } = usePDFGeneration()

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

  const handleGenerateDocumentPDF = async (document: Document) => {
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

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Documents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((document) => (
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
  )
}
