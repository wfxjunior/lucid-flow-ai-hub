
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Plus, Search, Copy, Edit, Trash2, Eye, Sparkles, Clock, CheckCircle, Archive, AlertCircle } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { ContractForm } from "@/components/ContractForm"
import { toast } from "sonner"

export function ContractsPage() {
  const { contracts, deleteContract, loading } = useBusinessData()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [showContractForm, setShowContractForm] = useState(false)
  const [editingContract, setEditingContract] = useState<any>(null)

  const filteredContracts = contracts?.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    const matchesType = typeFilter === "all" || contract.contract_type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  }) || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'archived': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'draft': return <Clock className="h-4 w-4" />
      case 'expired': return <AlertCircle className="h-4 w-4" />
      case 'archived': return <Archive className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const handleEdit = (contract: any) => {
    setEditingContract(contract)
    setShowContractForm(true)
  }

  const handleDelete = async (contractId: string) => {
    if (confirm("Are you sure you want to delete this contract?")) {
      try {
        await deleteContract(contractId)
        toast.success("Contract deleted successfully!")
      } catch (error) {
        console.error("Error deleting contract:", error)
        toast.error("Failed to delete contract")
      }
    }
  }

  const handleDuplicate = async (contract: any) => {
    const duplicatedContract = {
      ...contract,
      title: `${contract.title} (Copy)`,
      status: 'draft'
    }
    setEditingContract(duplicatedContract)
    setShowContractForm(true)
  }

  const handleCloseForm = () => {
    setShowContractForm(false)
    setEditingContract(null)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
          <p className="text-muted-foreground">Create, manage, and generate contracts with AI assistance</p>
        </div>
        <Dialog open={showContractForm} onOpenChange={setShowContractForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Contract
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingContract ? "Edit Contract" : "Create New Contract"}
              </DialogTitle>
              <DialogDescription>
                {editingContract ? "Update your contract details" : "Create a new contract or generate one with AI"}
              </DialogDescription>
            </DialogHeader>
            <ContractForm 
              contract={editingContract} 
              onClose={handleCloseForm} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Premium AI Feature Banner */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
            <Sparkles className="h-5 w-5" />
            AI-Powered Contract Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-purple-600 mb-4">
            Generate professional contracts instantly using AI. Choose from templates or describe your needs 
            and let AI create customized agreements, NDAs, service contracts, and more.
          </CardDescription>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="text-purple-700 border-purple-300">
              Service Agreements
            </Badge>
            <Badge variant="outline" className="text-purple-700 border-purple-300">
              NDAs
            </Badge>
            <Badge variant="outline" className="text-purple-700 border-purple-300">
              Employment Contracts
            </Badge>
            <Badge variant="outline" className="text-purple-700 border-purple-300">
              Custom Templates
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search contracts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="nda">NDA</SelectItem>
              <SelectItem value="employment">Employment</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{contract.title}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    Type: {contract.contract_type}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(contract.status)}>
                  {getStatusIcon(contract.status)}
                  <span className="ml-1">{contract.status}</span>
                </Badge>
              </div>
              {contract.is_template && (
                <Badge variant="outline" className="w-fit">
                  Template
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p className="line-clamp-3">{contract.content.substring(0, 150)}...</p>
              </div>
              
              {contract.tags && contract.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {contract.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {contract.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{contract.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Created: {new Date(contract.created_at).toLocaleDateString()}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(contract)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDuplicate(contract)}>
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
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No contracts found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all" 
              ? "Try adjusting your filters or search terms."
              : "Get started by creating your first contract."}
          </p>
          <Button onClick={() => setShowContractForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Contract
          </Button>
        </Card>
      )}
    </div>
  )
}
