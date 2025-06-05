
import React, { useState } from 'react'
import { Plus, Truck, MapPin, Calendar, Package, User, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function WorkAllocation() {
  const [showAllocationForm, setShowAllocationForm] = useState(false)

  // Mock data for allocations
  const allocations = [
    {
      id: 1,
      workOrder: "WO-001",
      projectName: "Downtown Office Building",
      allocatedDate: "2024-01-16",
      materials: [
        { name: "Steel Reinforcement Bars", quantity: 50, unit: "pcs" },
        { name: "Concrete Mix Bags", quantity: 20, unit: "bag" }
      ],
      assignedTo: "John Smith",
      status: "in-progress",
      location: "Site A - Floor 3",
      estimatedCompletion: "2024-01-18"
    },
    {
      id: 2,
      workOrder: "WO-002",
      projectName: "Residential Complex Wiring",
      allocatedDate: "2024-01-15",
      materials: [
        { name: "Electrical Wire 14 AWG", quantity: 5, unit: "roll" },
        { name: "Safety Helmets", quantity: 3, unit: "pcs" }
      ],
      assignedTo: "Mike Johnson",
      status: "completed",
      location: "Site B - Building 2",
      estimatedCompletion: "2024-01-16"
    },
    {
      id: 3,
      workOrder: "WO-003",
      projectName: "Plumbing Installation",
      allocatedDate: "2024-01-14",
      materials: [
        { name: "PVC Pipe 4 inch", quantity: 15, unit: "pcs" }
      ],
      assignedTo: "Sarah Davis",
      status: "pending",
      location: "Site C - Basement",
      estimatedCompletion: "2024-01-17"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  const getTotalValue = (materials: any[]) => {
    // Mock calculation - in real app you'd have material costs
    return materials.reduce((total, material) => total + (material.quantity * 10), 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Work Allocation</h2>
          <p className="text-gray-600">Track material allocation to work orders and projects</p>
        </div>
        <Dialog open={showAllocationForm} onOpenChange={setShowAllocationForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Allocation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Allocate Materials to Work</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Work Order</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wo-001">WO-001 - Office Building</SelectItem>
                      <SelectItem value="wo-002">WO-002 - Residential Wiring</SelectItem>
                      <SelectItem value="wo-003">WO-003 - Plumbing Install</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Assigned To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select worker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                      <SelectItem value="sarah">Sarah Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Materials</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select materials to allocate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mat-001">Steel Reinforcement Bars</SelectItem>
                    <SelectItem value="mat-002">Electrical Wire 14 AWG</SelectItem>
                    <SelectItem value="mat-003">PVC Pipe 4 inch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Quantity</Label>
                  <Input type="number" placeholder="Enter quantity" />
                </div>
                <div>
                  <Label>Expected Completion</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Additional notes or instructions..." rows={3} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAllocationForm(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Allocate Materials
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Allocations</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Materials in Use</p>
                <p className="text-2xl font-bold">85</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">$12,450</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Allocations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Allocations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Work Order</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Materials</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell className="font-medium">{allocation.workOrder}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{allocation.projectName}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Due: {allocation.estimatedCompletion}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {allocation.materials.map((material, index) => (
                        <div key={index} className="text-sm">
                          {material.quantity} {material.unit} - {material.name}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-gray-400" />
                      {allocation.assignedTo}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {allocation.location}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(allocation.status)}</TableCell>
                  <TableCell className="font-medium">
                    ${getTotalValue(allocation.materials).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
