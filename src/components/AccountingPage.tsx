
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useLanguage } from "@/contexts/LanguageContext"
import { AccountingDocument } from "@/types/business"
import { 
  Upload, 
  Receipt, 
  FileText, 
  Image, 
  Trash2, 
  Eye,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Building,
  Tag,
  Download,
  Zap,
  BarChart3,
  TrendingUp,
  Camera,
  Scan
} from "lucide-react"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const documentTypes = [
  { value: 'receipt', label: 'Receipt', icon: Receipt },
  { value: 'invoice', label: 'Invoice', icon: FileText },
  { value: 'expense', label: 'Expense Report', icon: DollarSign },
  { value: 'contract', label: 'Contract', icon: Building },
  { value: 'tax_document', label: 'Tax Document', icon: FileText },
  { value: 'bank_statement', label: 'Bank Statement', icon: BarChart3 },
  { value: 'other', label: 'Other', icon: FileText }
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

export function AccountingPage() {
  const { t } = useLanguage()
  const [documents, setDocuments] = useState<AccountingDocument[]>([])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [aiProcessing, setAiProcessing] = useState(false)
  const { toast } = useToast()

  // Form states
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

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('accounting_documents')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDocuments(data as AccountingDocument[] || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
      toast({
        title: "Error",
        description: "Failed to load accounting documents",
        variant: "destructive"
      })
    }
  }

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

      setIsUploadDialogOpen(false)
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
      fetchDocuments()
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

  const deleteDocument = async (id: string, fileName: string) => {
    try {
      const { error } = await supabase
        .from('accounting_documents')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Also delete from storage
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.storage
          .from('business-files')
          .remove([`${user.id}/accounting/${fileName}`])
      }

      fetchDocuments()
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

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesType = selectedType === 'all' || doc.document_type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const totalAmount = filteredDocuments.reduce((sum, doc) => sum + (doc.amount || 0), 0)

  const getFileIcon = (fileName: string, documentType: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (ext && ['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return Image
    if (ext === 'pdf') return FileText
    const typeConfig = documentTypes.find(t => t.value === documentType)
    return typeConfig?.icon || FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Receipt className="h-6 w-6" />
            Accounting Documents
          </h2>
          <p className="text-muted-foreground">
            Manage receipts, invoices, and financial documents with AI-powered data extraction
          </p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
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
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
              <p className="text-2xl font-bold">{documents.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">
                {documents.filter(d => {
                  const docDate = new Date(d.created_at)
                  const now = new Date()
                  return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear()
                }).length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documents, vendors, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {documentTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Documents Found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || selectedCategory !== 'all' || selectedType !== 'all'
                ? "No documents match your current filters."
                : "Start by uploading your first accounting document."}
            </p>
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload First Document
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => {
            const FileIcon = getFileIcon(doc.file_name, doc.document_type)
            const typeConfig = documentTypes.find(t => t.value === doc.document_type)
            
            return (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-5 w-5 text-blue-600" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium truncate">{doc.title}</h4>
                        <p className="text-xs text-muted-foreground">{formatFileSize(doc.file_size)}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(doc.file_url, '_blank')}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(doc.file_url, '_blank')}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteDocument(doc.id, doc.file_name)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {typeConfig?.label || doc.document_type}
                      </Badge>
                      {doc.amount && (
                        <span className="text-lg font-bold text-green-600">
                          ${doc.amount.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {doc.vendor && (
                      <div className="flex items-center gap-1 text-sm">
                        <Building className="h-3 w-3" />
                        <span className="truncate">{doc.vendor}</span>
                      </div>
                    )}

                    {doc.category && (
                      <div className="flex items-center gap-1 text-sm">
                        <Tag className="h-3 w-3" />
                        <span className="truncate">{doc.category}</span>
                      </div>
                    )}

                    {doc.date_of_transaction && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(doc.date_of_transaction), 'MMM dd, yyyy')}
                      </div>
                    )}

                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {doc.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doc.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Uploaded {format(new Date(doc.created_at), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
