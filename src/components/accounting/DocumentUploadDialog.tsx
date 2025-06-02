
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Upload, Zap, Scan } from "lucide-react"

const documentTypes = [
  { value: 'receipt', label: 'Receipt' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'expense', label: 'Expense Report' },
  { value: 'contract', label: 'Contract' },
  { value: 'tax_document', label: 'Tax Document' },
  { value: 'bank_statement', label: 'Bank Statement' },
  { value: 'other', label: 'Other' }
]

const categories = [
  'Office Supplies',
  'Travel & Transportation',
  'Meals & Entertainment',
  'Software & Subscriptions',
  'Equipment & Hardware',
  'Marketing & Advertising',
  'Professional Services',
  'Utilities',
  'Rent & Facilities',
  'Insurance',
  'Taxes',
  'Other'
]

interface DocumentUploadDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onDocumentUploaded: () => void
}

export function DocumentUploadDialog({ isOpen, onOpenChange, onDocumentUploaded }: DocumentUploadDialogProps) {
  const [uploading, setUploading] = useState(false)
  const [aiProcessing, setAiProcessing] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    document_type: 'receipt',
    category: '',
    vendor: '',
    amount: '',
    date_of_transaction: '',
    tags: ''
  })

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Upload file to storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/accounting/${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('business-files')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('business-files')
        .getPublicUrl(fileName)

      // Process with AI if it's an image
      let extractedData = null
      if (file.type.startsWith('image/')) {
        setAiProcessing(true)
        try {
          const { data: aiData, error: aiError } = await supabase.functions.invoke('extract-receipt-data', {
            body: { fileUrl: publicUrl, fileName: file.name }
          })
          if (!aiError && aiData) {
            extractedData = aiData
            // Auto-fill form with extracted data
            setFormData(prev => ({
              ...prev,
              title: aiData.title || file.name,
              vendor: aiData.vendor || '',
              amount: aiData.amount?.toString() || '',
              date_of_transaction: aiData.date || '',
              category: aiData.category || ''
            }))
          }
        } catch (aiError) {
          console.error('AI processing failed:', aiError)
        } finally {
          setAiProcessing(false)
        }
      }

      // Save document metadata to database
      const { error: dbError } = await supabase
        .from('accounting_documents')
        .insert({
          user_id: user.id,
          title: formData.title || file.name,
          description: formData.description,
          document_type: formData.document_type,
          file_url: publicUrl,
          file_name: file.name,
          file_size: file.size,
          amount: formData.amount ? parseFloat(formData.amount) : null,
          vendor: formData.vendor,
          date_of_transaction: formData.date_of_transaction || null,
          category: formData.category,
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
          extracted_data: extractedData,
          status: 'processed'
        })

      if (dbError) throw dbError

      toast({
        title: "Success",
        description: "Document uploaded and processed successfully"
      })

      onOpenChange(false)
      setFormData({
        title: '',
        description: '',
        document_type: 'receipt',
        category: '',
        vendor: '',
        amount: '',
        date_of_transaction: '',
        tags: ''
      })
      onDocumentUploaded()
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Upload Accounting Document
          </DialogTitle>
          <DialogDescription>
            Upload receipts, invoices, or other financial documents. Our AI will automatically extract key information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Document title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document_type">Document Type</Label>
              <Select value={formData.document_type} onValueChange={(value) => setFormData(prev => ({ ...prev, document_type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor/Company</Label>
              <Input
                id="vendor"
                value={formData.vendor}
                onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))}
                placeholder="Vendor name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_of_transaction">Transaction Date</Label>
              <Input
                id="date_of_transaction"
                type="date"
                value={formData.date_of_transaction}
                onChange={(e) => setFormData(prev => ({ ...prev, date_of_transaction: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Additional notes or description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="business, travel, equipment"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-input">Select File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file-input"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.gif"
                onChange={uploadFile}
                disabled={uploading || aiProcessing}
                className="flex-1"
              />
              {aiProcessing && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Scan className="h-3 w-3 animate-spin" />
                  AI Processing...
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, JPG, PNG, GIF. Images will be processed with AI for automatic data extraction.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
