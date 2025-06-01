
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useBusinessData } from "@/hooks/useBusinessData"
import { toast } from "sonner"
import type { WorkOrder } from "@/types/business"

interface WorkOrderFormProps {
  workOrder?: WorkOrder
  onClose: () => void
  onSave: () => void
}

interface FormData {
  client_id: string
  estimate_id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  assigned_to: string
  estimated_hours: string
  actual_hours: string
  materials_cost: string
  labor_cost: string
  notes: string
}

export function WorkOrderForm({ workOrder, onClose, onSave }: WorkOrderFormProps) {
  const { clients, estimates, createWorkOrder, updateWorkOrder } = useBusinessData()
  const [isLoading, setIsLoading] = useState(false)
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    workOrder?.scheduled_date ? new Date(workOrder.scheduled_date) : undefined
  )
  const [completionDate, setCompletionDate] = useState<Date | undefined>(
    workOrder?.completion_date ? new Date(workOrder.completion_date) : undefined
  )

  const [formData, setFormData] = useState<FormData>({
    client_id: workOrder?.client_id || "",
    estimate_id: workOrder?.estimate_id || "",
    title: workOrder?.title || "",
    description: workOrder?.description || "",
    priority: workOrder?.priority || "medium",
    status: workOrder?.status || "pending",
    assigned_to: workOrder?.assigned_to || "",
    estimated_hours: workOrder?.estimated_hours?.toString() || "",
    actual_hours: workOrder?.actual_hours?.toString() || "",
    materials_cost: workOrder?.materials_cost?.toString() || "",
    labor_cost: workOrder?.labor_cost?.toString() || "",
    notes: workOrder?.notes || ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.client_id || !formData.title) {
      toast.error("Please fill in required fields")
      return
    }

    setIsLoading(true)
    try {
      const totalCost = (parseFloat(formData.materials_cost) || 0) + (parseFloat(formData.labor_cost) || 0)
      
      const workOrderData = {
        ...formData,
        estimated_hours: formData.estimated_hours ? parseFloat(formData.estimated_hours) : null,
        actual_hours: formData.actual_hours ? parseFloat(formData.actual_hours) : null,
        materials_cost: formData.materials_cost ? parseFloat(formData.materials_cost) : 0,
        labor_cost: formData.labor_cost ? parseFloat(formData.labor_cost) : 0,
        total_cost: totalCost,
        scheduled_date: scheduledDate?.toISOString().split('T')[0] || null,
        completion_date: completionDate?.toISOString().split('T')[0] || null,
        estimate_id: formData.estimate_id || null
      }

      if (workOrder) {
        await updateWorkOrder({ id: workOrder.id, ...workOrderData })
        toast.success("Work order updated successfully!")
      } else {
        await createWorkOrder(workOrderData)
        toast.success("Work order created successfully!")
      }
      
      onSave()
      onClose()
    } catch (error) {
      console.error('Error saving work order:', error)
      toast.error("Failed to save work order")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{workOrder ? 'Edit Work Order' : 'Create New Work Order'}</CardTitle>
            <CardDescription>
              {workOrder ? 'Update work order details' : 'Fill in the details to create a new work order'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_id">Client *</Label>
              <Select value={formData.client_id} onValueChange={(value) => setFormData(prev => ({ ...prev, client_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimate_id">Related Estimate (Optional)</Label>
              <Select value={formData.estimate_id} onValueChange={(value) => setFormData(prev => ({ ...prev, estimate_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an estimate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No estimate</SelectItem>
                  {estimates?.filter(est => est.client_id === formData.client_id).map((estimate) => (
                    <SelectItem key={estimate.id} value={estimate.id}>
                      {estimate.estimate_number} - {estimate.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Work order title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the work to be done..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled') => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assigned_to">Assigned To</Label>
              <Input
                id="assigned_to"
                value={formData.assigned_to}
                onChange={(e) => setFormData(prev => ({ ...prev, assigned_to: e.target.value }))}
                placeholder="Technician name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Scheduled Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Completion Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !completionDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {completionDate ? format(completionDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={completionDate}
                    onSelect={setCompletionDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimated_hours">Estimated Hours</Label>
              <Input
                id="estimated_hours"
                type="number"
                step="0.25"
                value={formData.estimated_hours}
                onChange={(e) => setFormData(prev => ({ ...prev, estimated_hours: e.target.value }))}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actual_hours">Actual Hours</Label>
              <Input
                id="actual_hours"
                type="number"
                step="0.25"
                value={formData.actual_hours}
                onChange={(e) => setFormData(prev => ({ ...prev, actual_hours: e.target.value }))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="materials_cost">Materials Cost ($)</Label>
              <Input
                id="materials_cost"
                type="number"
                step="0.01"
                value={formData.materials_cost}
                onChange={(e) => setFormData(prev => ({ ...prev, materials_cost: e.target.value }))}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="labor_cost">Labor Cost ($)</Label>
              <Input
                id="labor_cost"
                type="number"
                step="0.01"
                value={formData.labor_cost}
                onChange={(e) => setFormData(prev => ({ ...prev, labor_cost: e.target.value }))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes..."
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : (workOrder ? 'Update' : 'Create')} Work Order
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
