
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Plus, Search, Edit, Trash2, Copy, Eye, Download } from "lucide-react"
import { ContractForm } from "@/components/ContractForm"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"

export function ContractsPage() {
  const { contracts, loading, createContract, updateContract, deleteContract } = useBusinessData()
  const { generateContractPDF, isGenerating } = usePDFGeneration()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingContract, setEditingContract] = useState<any>(null)

  const filteredContracts = (contracts || []).filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    const matchesType = typeFilter === "all" || contract.contract_type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleEdit = (contract: any) => {
    setEditingContract(contract)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      try {
        await deleteContract(id)
        toast.success('Contract deleted successfully!')
      } catch (error) {
        toast.error('Failed to delete contract')
      }
    }
  }

  const handleGeneratePDF = async (contract: any) => {
    await generateContractPDF(contract)
  }

  const handleDuplicate = async (contract: any) => {
    try {
      await createContract({
        title: `${contract.title} (Copy)`,
        content: contract.content,
        contract_type: contract.contract_type,
        status: 'draft',
        tags: contract.tags,
        is_template: false
      })
      toast.success('Contract duplicated successfully!')
    } catch (error) {
      toast.error('Failed to duplicate contract')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'terminated': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-blue-100 text-blue-800'
      case 'employment': return 'bg-purple-100 text-purple-800'
      case 'nda': return 'bg-orange-100 text-orange-800'
      case 'vendor': return 'bg-teal-100 text-teal-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (showForm) {
    return (
      <div className="container mx-auto p-6">
        <ContractForm
          contract={editingContract}
          onClose={() => {
            setShowForm(false)
            setEditingContract(null)
          }}
        />
      </div>
    )
  }

  const metrics = [
    {
      title: "Total Contracts",
      value: contracts?.length || 0,
      subtitle: "All contracts",
      icon: FileText
    },
    {
      title: "Active",
      value: contracts?.filter(c => c.status === 'active').length || 0,
      subtitle: "Currently active",
      icon: FileText
    },
    {
      title: "Pending",
      value: contracts?.filter(c => c.status === 'pending').length || 0,
      subtitle: "Awaiting approval",
      icon: FileText
    },
    {
      title: "Templates",
      value: contracts?.filter(c => c.is_template).length || 0,
      subtitle: "Available templates",
      icon: FileText
    }
  ]

  return (
    <CleanPageLayout
      title="Contracts"
      subtitle="Create, manage, and track your business contracts and agreements"
      actionLabel="Create Contract"
      onActionClick={() => setShowForm(true)}
      metrics={metrics}
    >

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
                <SelectItem value="nda">NDA</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contracts</CardTitle>
          <CardDescription>
            Manage your contracts and legal agreements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading contracts...</div>
            </div>
          ) : filteredContracts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">No contracts found</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.title}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(contract.contract_type)}>
                          {contract.contract_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contract.status)}>
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {contract.is_template ? (
                          <Badge variant="outline">Template</Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(contract.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {contract.tags?.slice(0, 2).map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {contract.tags?.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{contract.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{contract.title}</DialogTitle>
                                <DialogDescription>
                                  Contract details and content
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong>Type:</strong> {contract.contract_type}
                                  </div>
                                  <div>
                                    <strong>Status:</strong> {contract.status}
                                  </div>
                                </div>
                                <div>
                                  <strong>Content:</strong>
                                  <div className="mt-2 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                                    {contract.content}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(contract)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGeneratePDF(contract)}
                            disabled={isGenerating}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicate(contract)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(contract.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
