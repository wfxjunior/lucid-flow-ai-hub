
import React, { useState } from 'react'
import { X, Save, Package, MapPin, AlertTriangle, DollarSign } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface MaterialFormProps {
  isOpen: boolean
  onClose: () => void
  material?: any
}

export function MaterialForm({ isOpen, onClose, material }: MaterialFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: material?.name || '',
    sku: material?.sku || '',
    category: material?.category || '',
    currentStock: material?.currentStock || '',
    minStock: material?.minStock || '',
    maxStock: material?.maxStock || '',
    unit: material?.unit || '',
    costPerUnit: material?.costPerUnit || '',
    supplier: material?.supplier || '',
    location: material?.location || '',
    description: material?.description || '',
    notes: material?.notes || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Auto-generate SKU if not provided
    if (!formData.sku) {
      const generatedSku = `MAT-${Date.now().toString().slice(-6)}`
      setFormData(prev => ({ ...prev, sku: generatedSku }))
    }

    console.log('Material data:', formData)
    
    toast({
      title: material ? "Material Updated" : "Material Added",
      description: `${formData.name} has been ${material ? 'updated' : 'added'} to your inventory.`,
    })
    
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isLowStock = formData.currentStock && formData.minStock && 
    parseInt(formData.currentStock) <= parseInt(formData.minStock)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            {material ? 'Edit Material' : 'Add New Material'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Material Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter material name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="sku">SKU (Auto-generated if empty)</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                    placeholder="MAT-123456"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="construction">Construction Materials</SelectItem>
                      <SelectItem value="electrical">Electrical Supplies</SelectItem>
                      <SelectItem value="plumbing">Plumbing Supplies</SelectItem>
                      <SelectItem value="tools">Tools & Equipment</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="safety">Safety Equipment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Material description..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stock & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Stock & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentStock">Current Stock *</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      value={formData.currentStock}
                      onChange={(e) => handleInputChange('currentStock', e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="m">Meters</SelectItem>
                        <SelectItem value="m2">Square Meters</SelectItem>
                        <SelectItem value="m3">Cubic Meters</SelectItem>
                        <SelectItem value="liter">Liters</SelectItem>
                        <SelectItem value="box">Boxes</SelectItem>
                        <SelectItem value="roll">Rolls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minStock">Minimum Stock Level</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={formData.minStock}
                      onChange={(e) => handleInputChange('minStock', e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxStock">Maximum Stock Level</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      value={formData.maxStock}
                      onChange={(e) => handleInputChange('maxStock', e.target.value)}
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="costPerUnit">Cost per Unit ($)</Label>
                  <Input
                    id="costPerUnit"
                    type="number"
                    step="0.01"
                    value={formData.costPerUnit}
                    onChange={(e) => handleInputChange('costPerUnit', e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                {isLowStock && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Low Stock Warning</span>
                    </div>
                    <p className="text-sm text-red-600 mt-1">
                      Current stock is at or below minimum level
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Location & Supplier */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location & Supplier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Storage Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Warehouse A - Shelf 1-A"
                  />
                </div>

                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => handleInputChange('supplier', e.target.value)}
                    placeholder="Supplier name"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notes & Observations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes & Observations</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special observations, handling instructions, or notes..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {material ? 'Update Material' : 'Add Material'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
