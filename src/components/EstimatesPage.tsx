
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Eye, Check, X, FileSignature, Calendar } from "lucide-react"
import { useEstimateData } from "@/hooks/useEstimateData"
import { EstimateForm } from "@/components/EstimateForm"
import { toast } from "sonner"
import { format } from "date-fns"

export function EstimatesPage() {
  const { estimates, loading, updateEstimateStatus, markEstimateViewed } = useEstimateData()
  const [searchDate, setSearchDate] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Add error handling for estimates
  const safeEstimates = estimates || []

  const filteredEstimates = safeEstimates.filter(estimate => {
    const matchesDate = !searchDate || estimate.estimate_date === searchDate
    const matchesStatus = statusFilter === "all" || estimate.status === statusFilter
    return matchesDate && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "Draft", variant: "secondary" as const },
      sent: { label: "Sent", variant: "default" as const },
      approved: { label: "Approved", variant: "default" as const },
      rejected: { label: "Rejected", variant: "destructive" as const },
      converted: { label: "Converted", variant: "default" as const },
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "secondary" as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getSignatureStatusBadge = (status: string | null) => {
    if (!status) return <Badge variant="secondary">Pending</Badge>
    
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const },
      signed: { label: "Signed", variant: "default" as const },
      declined: { label: "Declined", variant: "destructive" as const },
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "secondary" as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleMarkViewed = async (estimateId: string) => {
    try {
      await markEstimateViewed(estimateId)
      toast.success("Estimate marked as viewed")
    } catch (error) {
      console.error("Error marking estimate as viewed:", error)
      toast.error("Failed to mark estimate as viewed")
    }
  }

  const handleStatusUpdate = async (estimateId: string, status: string, timestampField?: string) => {
    try {
      await updateEstimateStatus({ 
        id: estimateId, 
        status, 
        timestamp_field: timestampField 
      })
      toast.success(`Estimate ${status} successfully`)
    } catch (error) {
      console.error("Error updating estimate status:", error)
      toast.error(`Failed to update estimate status`)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set"
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "Never"
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm")
    } catch (error) {
      console.error("Error formatting datetime:", error)
      return "Invalid date"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Estimates</h1>
          <p className="text-muted-foreground">Manage and track your estimates</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Estimate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Estimate</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new estimate
              </DialogDescription>
            </DialogHeader>
            <EstimateForm onSuccess={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find estimates by date or status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search by Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter by Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Clear Filters</label>
              <Button 
                variant="outline" 
                onClick={() => { setSearchDate(""); setStatusFilter("all") }}
                className="w-full"
              >
                Clear All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estimates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Estimates ({filteredEstimates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading estimates...</div>
          ) : filteredEstimates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No estimates found. Create your first estimate to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Signature</TableHead>
                    <TableHead>Viewed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEstimates.map((estimate) => (
                    <TableRow key={estimate.id}>
                      <TableCell className="font-mono">
                        {estimate.estimate_number || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {estimate.client?.name || 'Unknown Client'}
                      </TableCell>
                      <TableCell>{estimate.title}</TableCell>
                      <TableCell>${estimate.amount?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell>{formatDate(estimate.estimate_date)}</TableCell>
                      <TableCell>{getStatusBadge(estimate.status)}</TableCell>
                      <TableCell>{getSignatureStatusBadge(estimate.signature_status)}</TableCell>
                      <TableCell>{formatDateTime(estimate.viewed_at)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {!estimate.viewed_at && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkViewed(estimate.id)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          )}
                          {estimate.status === 'sent' && !estimate.accepted_at && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(estimate.id, 'approved', 'accepted_at')}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          {estimate.status === 'sent' && !estimate.declined_at && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(estimate.id, 'rejected', 'declined_at')}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                          {estimate.signature_status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(estimate.id, estimate.status, 'signed_at')}
                            >
                              <FileSignature className="h-3 w-3" />
                            </Button>
                          )}
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
    </div>
  )
}
