
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PenTool } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { FeatherSignDialog } from "@/components/e-signatures/FeatherSignDialog"
import { DocumentCreationDialog } from "@/components/e-signatures/DocumentCreationDialog"
import { DocumentFilters } from "@/components/e-signatures/DocumentFilters"
import { DocumentGrid } from "@/components/e-signatures/DocumentGrid"
import { SignatureGrid } from "@/components/e-signatures/SignatureGrid"
import { DocumentSender } from "@/components/e-signatures/DocumentSender"

export function ESignaturesPage() {
  const { clients, documents, signatures, loading } = useBusinessData()
  
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showDocumentForm, setShowDocumentForm] = useState(false)
  const [showFeatherSignDialog, setShowFeatherSignDialog] = useState(false)

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

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2 whitespace-nowrap">
            <PenTool className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 flex-shrink-0" />
            <span className="break-keep">FeatherSign E-Signatures</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Professional digital signature solution for your documents</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <FeatherSignDialog 
            open={showFeatherSignDialog} 
            onOpenChange={setShowFeatherSignDialog} 
          />
          <DocumentCreationDialog 
            open={showDocumentForm} 
            onOpenChange={setShowDocumentForm} 
          />
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
      <DocumentSender documents={filteredDocuments} clients={clients || []} />

      {/* Filters */}
      <DocumentFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Documents Grid */}
      <DocumentGrid documents={filteredDocuments} />

      {/* Signatures Grid */}
      <SignatureGrid signatures={filteredSignatures} />
    </div>
  )
}
