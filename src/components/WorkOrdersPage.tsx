
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Edit, Trash2, Calendar, Clock, DollarSign, User, Download } from "lucide-react"
import { WorkOrderForm } from "./WorkOrderForm"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { toast } from "sonner"
import { format } from "date-fns"
import type { WorkOrder } from "@/types/business"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"

export function WorkOrdersPage() {
  const { workOrders, loading, deleteWorkOrder, loadData } = useBusinessData()
  const { generateWorkOrderPDF, isGenerating } = usePDFGeneration()
  const [showForm, setShowForm] = useState(false)
  const [editingWorkOrder, setEditingWorkOrder] = useState<WorkOrder | undefined>()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredWorkOrders = (workOrders || []).filter((workOrder) => {
    // Safe access to client data with fallbacks
    const clientName = workOrder.client?.name || 'Unknown Client'
    const workOrderNumber = workOrder.work_order_number || ''
    
    const matchesSearch = workOrder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workOrderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || workOrder.status === statusFilter
    const matchesPriority = priorityFilter === "all" || workOrder.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleEdit = (workOrder: any) => {
    // Create a properly typed WorkOrder object
    const typedWorkOrder: WorkOrder = {
      id: workOrder.id,
      user_id: workOrder.user_id,
      client_id: workOrder.client_id,
      estimate_id: workOrder.estimate_id,
      project_id: workOrder.project_id,
      work_order_number: workOrder.work_order_number,
      title: workOrder.title,
      description: workOrder.description,
      priority: workOrder.priority,
      status: workOrder.status,
      scheduled_date: workOrder.scheduled_date,
      completion_date: workOrder.completion_date,
      assigned_to: workOrder.assigned_to,
      estimated_hours: workOrder.estimated_hours,
      actual_hours: workOrder.actual_hours,
      materials_cost: workOrder.materials_cost,
      labor_cost: workOrder.labor_cost,
      total_cost: workOrder.total_cost,
      notes: workOrder.notes,
      created_at: workOrder.created_at,
      updated_at: workOrder.updated_at,
      client: workOrder.client,
      estimate: workOrder.estimate
    }
    setEditingWorkOrder(typedWorkOrder)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this work order?')) {
      try {
        await deleteWorkOrder(id)
        toast.success('Work order deleted successfully!')
      } catch (error) {
        toast.error('Failed to delete work order')
      }
    }
  }

  const handleGeneratePDF = async (workOrder: any) => {
    await generateWorkOrderPDF(workOrder)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingWorkOrder(undefined)
  }

  const handleSave = () => {
    loadData()
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      scheduled: "bg-blue-100 text-blue-800",
      in_progress: "bg-orange-100 text-orange-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"
  }

  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800"
    }
    return styles[priority as keyof typeof styles] || "bg-gray-100 text-gray-800"
  }

  if (showForm) {
    return (
      <div className="container mx-auto p-6">
        <WorkOrderForm
          workOrder={editingWorkOrder}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      </div>
    )
  }

  const metrics = [
    {
      title: "Total Work Orders",
      value: (workOrders?.length || 0).toString(),
      subtitle: "All work orders",
      icon: Calendar
    },
    {
      title: "In Progress",
      value: (workOrders?.filter(wo => wo.status === 'in_progress').length || 0).toString(),
      subtitle: "Active work",
      icon: Clock
    },
    {
      title: "Completed",
      value: (workOrders?.filter(wo => wo.status === 'completed').length || 0).toString(),
      subtitle: "Finished work",
      icon: User
    },
    {
      title: "Total Value",
      value: `$${workOrders?.reduce((sum, wo) => sum + (wo.total_cost || 0), 0).toFixed(2) || '0.00'}`,
      subtitle: "Total revenue",
      icon: DollarSign
    }
  ]

  return (
    <CleanPageLayout
      title="Work Orders"
      subtitle="Manage and track your work orders from creation to completion"
      actionLabel="New Work Order"
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
                  placeholder="Search work orders..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Work Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Work Orders</CardTitle>
          <CardDescription>
            A list of all your work orders with their current status and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading work orders...</div>
            </div>
          ) : filteredWorkOrders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">No work orders found</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Work Order #</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkOrders.map((workOrder) => {
                    // Safe client name extraction
                    const clientName = workOrder.client?.name || 'Unknown Client'
                    
                    return (
                      <TableRow key={workOrder.id}>
                        <TableCell className="font-medium">
                          {workOrder.work_order_number || 'WO-' + workOrder.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>{workOrder.title}</TableCell>
                        <TableCell>{clientName}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityBadge(workOrder.priority)}>
                            {workOrder.priority.charAt(0).toUpperCase() + workOrder.priority.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(workOrder.status)}>
                            {workOrder.status.replace('_', ' ').charAt(0).toUpperCase() + workOrder.status.replace('_', ' ').slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {workOrder.scheduled_date ? format(new Date(workOrder.scheduled_date), 'MMM dd, yyyy') : 'Not scheduled'}
                        </TableCell>
                        <TableCell>{workOrder.assigned_to || 'Unassigned'}</TableCell>
                        <TableCell>${workOrder.total_cost?.toFixed(2) || '0.00'}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(workOrder)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGeneratePDF(workOrder)}
                              disabled={isGenerating}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(workOrder.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
    </CleanPageLayout>
  )
}
