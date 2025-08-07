import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, PenTool, Users, Clock, CheckCircle, BarChart3 } from "lucide-react"
import { DocumentGrid } from "./DocumentGrid"
import { SignatureGrid } from "./SignatureGrid"
import { DocumentCreationDialog } from "./DocumentCreationDialog"
import { SignatureTemplateDialog } from "./SignatureTemplateDialog"
import { DocumentFilters } from "./DocumentFilters"

export function ESignaturesPage() {
  const [activeTab, setActiveTab] = useState("documents")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)

  // Mock data for demonstration
  const mockDocuments = [
    {
      id: "1",
      title: "Service Agreement - ABC Corp",
      document_type: "contract",
      status: "signed",
      created_at: "2024-01-15T10:00:00Z",
      content: "This is a service agreement between..."
    },
    {
      id: "2", 
      title: "Project Estimate - Website Development",
      document_type: "estimate",
      status: "pending",
      created_at: "2024-01-14T14:30:00Z",
      content: "Project estimate for website development..."
    },
    {
      id: "3",
      title: "NDA - Confidential Project",
      document_type: "agreement",
      status: "sent",
      created_at: "2024-01-13T09:15:00Z",
      content: "Non-disclosure agreement for..."
    }
  ]

  const mockSignatures = [
    {
      id: "1",
      document_id: "1",
      client_id: "1",
      signature_data: null,
      signature_url: null,
      status: "completed",
      signed_at: "2024-01-15T15:30:00Z",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T15:30:00Z",
      client: { id: "1", name: "John Doe", email: "john@example.com" },
      document: { id: "1", title: "Service Agreement - ABC Corp", document_type: "contract" }
    },
    {
      id: "2",
      document_id: "2", 
      client_id: "2",
      signature_data: null,
      signature_url: null,
      status: "pending",
      signed_at: null,
      created_at: "2024-01-14T14:30:00Z",
      updated_at: "2024-01-14T14:30:00Z",
      client: { id: "2", name: "Jane Smith", email: "jane@example.com" },
      document: { id: "2", title: "Project Estimate - Website Development", document_type: "estimate" }
    }
  ]

  const stats = {
    totalDocuments: mockDocuments.length,
    pendingSignatures: mockSignatures.filter(s => s.status === 'pending').length,
    completedSignatures: mockSignatures.filter(s => s.status === 'completed').length,
    thisMonthSigned: mockSignatures.filter(s => 
      s.signed_at && new Date(s.signed_at).getMonth() === new Date().getMonth()
    ).length
  }

  const filteredDocuments = mockDocuments.filter(doc => {
    if (selectedStatus !== "all" && doc.status !== selectedStatus) return false
    if (selectedType !== "all" && doc.document_type !== selectedType) return false
    return true
  })

  const filteredSignatures = mockSignatures.filter(sig => {
    if (selectedStatus !== "all" && sig.status !== selectedStatus) return false
    return true
  })

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">E-Signatures</h1>
            <p className="text-muted-foreground mt-1">
              Create, send, and manage digital signature documents
            </p>
          </div>
          <div className="flex gap-2">
            <SignatureTemplateDialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen} />
            <DocumentCreationDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDocuments}</div>
              <p className="text-xs text-muted-foreground">
                Documents created
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Signatures</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingSignatures}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting signature
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedSignatures}</div>
              <p className="text-xs text-muted-foreground">
                Fully signed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisMonthSigned}</div>
              <p className="text-xs text-muted-foreground">
                Signed this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <DocumentFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={selectedStatus}
          onStatusFilterChange={setSelectedStatus}
        />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="signatures" className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              <span className="hidden sm:inline">Signatures</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="space-y-4">
            <DocumentGrid documents={filteredDocuments} />
          </TabsContent>
          
          <TabsContent value="signatures" className="space-y-4">
            <SignatureGrid signatures={filteredSignatures} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}