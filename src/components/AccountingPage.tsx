
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useLanguage } from "@/contexts/LanguageContext"
import { AccountingDocument } from "@/types/business"
import { Receipt } from "lucide-react"
import { DocumentUploadDialog } from "./accounting/DocumentUploadDialog"
import { DocumentStats } from "./accounting/DocumentStats"
import { DocumentFilters } from "./accounting/DocumentFilters"
import { DocumentGrid } from "./accounting/DocumentGrid"

export function AccountingPage() {
  const { t } = useLanguage()
  const [documents, setDocuments] = useState<AccountingDocument[]>([])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const { toast } = useToast()

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
        <DocumentUploadDialog 
          isOpen={isUploadDialogOpen}
          onOpenChange={setIsUploadDialogOpen}
          onDocumentUploaded={fetchDocuments}
        />
      </div>

      {/* Stats Cards */}
      <DocumentStats documents={filteredDocuments} />

      {/* Filters */}
      <DocumentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      {/* Documents Grid */}
      <DocumentGrid 
        documents={filteredDocuments}
        onDelete={deleteDocument}
        onUploadClick={() => setIsUploadDialogOpen(true)}
      />
    </div>
  )
}
