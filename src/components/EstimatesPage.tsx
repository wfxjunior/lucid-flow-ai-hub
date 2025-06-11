import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Download, FileText, DollarSign, TrendingUp, Send, Copy, PenTool } from "lucide-react"
import { EstimateForm } from "@/components/EstimateForm"
import { InlineEstimateEditor } from "@/components/InlineEstimateEditor"
import { DocumentSignatureDialog } from "@/components/e-signatures/DocumentSignatureDialog"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"

export function EstimatesPage() {
  const { estimates, clients, loading } = useBusinessData()
  const { generateEstimatePDF, isGenerating } = usePDFGeneration()
  const [showForm, setShowForm] = useState(false)
  const [showInlineEditor, setShowInlineEditor] = useState(false)
  const [editingEstimate, setEditingEstimate] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [signatureDialogOpen, setSignatureDialogOpen] = useState<string | null>(null)

  // Create a mapping of clients for easy lookup
  const clientsMap = (clients || []).reduce((acc, client) => {
    acc[client.id] = client
    return acc
  }, {} as Record<string, any>)

  const filteredEstimates = (estimates || []).filter((estimate) => {
    const client = clientsMap[estimate.client_id]
    const clientName = client?.name || 'Unknown Client'
    
    const matchesSearch = estimate.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (estimate.estimate_number || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || estimate.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleEdit = (estimate: any) => {
    setEditingEstimate(estimate)
    setShowForm(true)
  }

  const handleGeneratePDF = async (estimate: any) => {
    const client = clientsMap[estimate.client_id]
    const estimateWithClient = { ...estimate, client }
    await generateEstimatePDF(estimateWithClient)
  }

  const handleDuplicate = (estimate: any) => {
    const duplicated = {
      ...estimate,
      id: undefined,
      estimate_number: `EST-${Date.now().toString().slice(-6)}`,
      status: 'draft',
      title: `Copy of ${estimate.title}`
    }
    setEditingEstimate(duplicated)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setShowInlineEditor(false)
    setEditingEstimate(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'viewed': return 'bg-purple-100 text-purple-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (showInlineEditor) {
    return (
      <div className="container mx-auto p-4 sm:p-6">
        <InlineEstimateEditor />
        <div className="mt-6">
          <Button variant="outline" onClick={handleCloseForm}>
            Back to Estimates
          </Button>
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <EstimateForm
        estimate={editingEstimate}
        onClose={handleCloseForm}
        onSuccess={handleCloseForm}
      />
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Estimates</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Create professional estimates with editable line items and instant PDF generation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowInlineEditor(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Legacy Editor
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Estimate
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estimates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estimates?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              ${estimates?.reduce((sum, est) => sum + (est.amount || 0), 0).toFixed(2) || '0.00'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {estimates?.filter(est => est.status === 'accepted').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {estimates?.filter(est => est.status === 'sent' || est.status === 'viewed').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search estimates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="viewed">Viewed</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estimates Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Estimates</CardTitle>
          <CardDescription className="text-sm">
            Manage your estimates with the new editable interface and digital signatures
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading estimates...</div>
            </div>
          ) : filteredEstimates.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">No estimates found</div>
            </div>
          ) : (
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Estimate #</TableHead>
                    <TableHead className="min-w-[150px]">Title</TableHead>
                    <TableHead className="min-w-[120px] hidden sm:table-cell">Client</TableHead>
                    <TableHead className="min-w-[100px]">Amount</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[100px] hidden md:table-cell">Date</TableHead>
                    <TableHead className="min-w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEstimates.map((estimate) => {
                    const client = clientsMap[estimate.client_id]
                    const clientName = client?.name || 'Unknown Client'
                    
                    return (
                      <TableRow key={estimate.id}>
                        <TableCell className="font-medium text-xs sm:text-sm">
                          {estimate.estimate_number || 'EST-' + estimate.id?.slice(0, 8)}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <div>
                            <div className="font-medium">{estimate.title}</div>
                            <div className="text-muted-foreground sm:hidden text-xs">{clientName}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{clientName}</TableCell>
                        <TableCell className="text-xs sm:text-sm font-medium">
                          ${estimate.amount?.toFixed(2) || '0.00'}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(estimate.status)} text-xs`}>
                            {estimate.status?.charAt(0).toUpperCase() + estimate.status?.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                          {estimate.estimate_date ? new Date(estimate.estimate_date).toLocaleDateString() : 'Not set'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(estimate)}
                              className="h-8 w-8 p-0"
                              title="Edit"
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicate(estimate)}
                              className="h-8 w-8 p-0"
                              title="Duplicate"
                            >
                              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGeneratePDF(estimate)}
                              disabled={isGenerating}
                              className="h-8 w-8 p-0"
                              title="Download PDF"
                            >
                              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSignatureDialogOpen(estimate.id)}
                              className="h-8 w-8 p-0"
                              title="Send for Signature"
                            >
                              <PenTool className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <DocumentSignatureDialog
                              document={estimate}
                              documentType="estimate"
                              open={signatureDialogOpen === estimate.id}
                              onOpenChange={(open) => setSignatureDialogOpen(open ? estimate.id : null)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
