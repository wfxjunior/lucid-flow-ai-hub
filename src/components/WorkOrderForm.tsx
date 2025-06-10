
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, User, Wrench, X } from 'lucide-react'
import { useBusinessData } from "@/hooks/useBusinessData"
import { toast } from "sonner"
import type { WorkOrder } from "@/types/business"

interface WorkOrderFormProps {
  workOrder?: WorkOrder
  onClose: () => void
  onSave: () => void
}

export function WorkOrderForm({ workOrder, onClose, onSave }: WorkOrderFormProps) {
  const { clients, createWorkOrder, updateWorkOrder } = useBusinessData()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    client_id: '',
    assignee: '',
    priority: 'medium',
    status: 'pending',
    description: '',
    scheduled_date: '',
    estimated_hours: '',
    materials_cost: '',
    labor_cost: ''
  })

  useEffect(() => {
    if (workOrder) {
      setFormData({
        title: workOrder.title || '',
        client_id: workOrder.client_id || '',
        assignee: workOrder.assigned_to || '',
        priority: workOrder.priority || 'medium',
        status: workOrder.status || 'pending',
        description: workOrder.description || '',
        scheduled_date: workOrder.scheduled_date || '',
        estimated_hours: workOrder.estimated_hours?.toString() || '',
        materials_cost: workOrder.materials_cost?.toString() || '',
        labor_cost: workOrder.labor_cost?.toString() || ''
      })
    }
  }, [workOrder])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const workOrderData = {
        ...formData,
        estimated_hours: formData.estimated_hours ? parseFloat(formData.estimated_hours) : null,
        materials_cost: formData.materials_cost ? parseFloat(formData.materials_cost) : null,
        labor_cost: formData.labor_cost ? parseFloat(formData.labor_cost) : null,
        total_cost: (parseFloat(formData.materials_cost || '0') + parseFloat(formData.labor_cost || '0'))
      }

      if (workOrder) {
        await updateWorkOrder({ ...workOrderData, id: workOrder.id })
        toast.success('Work order updated successfully!')
      } else {
        await createWorkOrder(workOrderData)
        toast.success('Work order created successfully!')
      }

      onSave()
      onClose()
    } catch (error) {
      console.error('Error saving work order:', error)
      toast.error('Failed to save work order')
    } finally {
      setLoading(false)
    }
  }

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ]

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  const assigneeOptions = [
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' }
  ]

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          {workOrder ? 'Edit Work Order' : 'Create Work Order'}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Work Order Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter work order title"
                required
              />
            </div>
            
            <div>
              <Label>Client</Label>
              <Select value={formData.client_id} onValueChange={(value) => setFormData({ ...formData, client_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Assignee</Label>
              <Select value={formData.assignee} onValueChange={(value) => setFormData({ ...formData, assignee: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {assigneeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scheduled_date">Scheduled Date</Label>
              <Input
                id="scheduled_date"
                type="date"
                value={formData.scheduled_date}
                onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="estimated_hours">Estimated Hours</Label>
              <Input
                id="estimated_hours"
                type="number"
                step="0.5"
                value={formData.estimated_hours}
                onChange={(e) => setFormData({ ...formData, estimated_hours: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="materials_cost">Materials Cost</Label>
              <Input
                id="materials_cost"
                type="number"
                step="0.01"
                value={formData.materials_cost}
                onChange={(e) => setFormData({ ...formData, materials_cost: e.target.value })}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="labor_cost">Labor Cost</Label>
              <Input
                id="labor_cost"
                type="number"
                step="0.01"
                value={formData.labor_cost}
                onChange={(e) => setFormData({ ...formData, labor_cost: e.target.value })}
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the work to be done..."
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : (workOrder ? 'Update Work Order' : 'Create Work Order')}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
