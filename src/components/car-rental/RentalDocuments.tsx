
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Upload, Trash2, Download } from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Document {
  id: string
  document_type: string
  file_name: string
  file_url: string
  file_size: number
  uploaded_by: string
  created_at: string
}

interface RentalDocumentsProps {
  rentalId: string
  onClose: () => void
}

export function RentalDocuments({ rentalId, onClose }: RentalDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [uploading, setUploading] = useState(false)
  const [documentType, setDocumentType] = useState<string>('drivers_license')
  const { toast } = useToast()

  useEffect(() => {
    fetchDocuments()
  }, [rentalId])

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('rental_documents')
        .select('*')
        .eq('rental_id', rentalId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDocuments(data || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive"
      })
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // For now, we'll just save the file info without actual upload
      // In a real implementation, you'd upload to Supabase Storage or another service
      const documentData = {
        rental_id: rentalId,
        document_type: documentType,
        file_name: file.name,
        file_url: `https://example.com/documents/${file.name}`, // Placeholder URL
        file_size: file.size,
        uploaded_by: 'admin'
      }

      const { error } = await supabase
        .from('rental_documents')
        .insert([documentData])

      if (error) throw error

      toast({
        title: "Success",
        description: "Document uploaded successfully"
      })
      
      fetchDocuments()
    } catch (error) {
      console.error('Error uploading document:', error)
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      const { error } = await supabase
        .from('rental_documents')
        .delete()
        .eq('id', documentId)

      if (error) throw error

      setDocuments(documents.filter(doc => doc.id !== documentId))
      toast({
        title: "Success",
        description: "Document deleted successfully"
      })
    } catch (error) {
      console.error('Error deleting document:', error)
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      })
    }
  }

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      drivers_license: "Driver's License",
      insurance: "Insurance Copy",
      rental_agreement: "Rental Agreement",
      other: "Other Document"
    }
    return labels[type as keyof typeof labels] || type
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Rental Documents</CardTitle>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Upload Document</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="document_type">Document Type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                  <SelectItem value="insurance">Insurance Copy</SelectItem>
                  <SelectItem value="rental_agreement">Rental Agreement</SelectItem>
                  <SelectItem value="other">Other Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="file_upload">Choose File</Label>
              <Input
                id="file_upload"
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          <h3 className="font-medium">Uploaded Documents</h3>
          {documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{doc.file_name}</p>
                      <p className="text-sm text-gray-600">
                        {getDocumentTypeLabel(doc.document_type)} • {formatFileSize(doc.file_size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(doc.file_url, '_blank')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
