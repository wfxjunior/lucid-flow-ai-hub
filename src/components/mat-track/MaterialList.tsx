
import React, { useState } from 'react'
import { Eye, Edit3, MoreHorizontal, AlertTriangle, Package, MapPin, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MaterialForm } from './MaterialForm'

interface MaterialListProps {
  searchQuery?: string
  limit?: number
}

export function MaterialList({ searchQuery = '', limit }: MaterialListProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null)
  const [showEditForm, setShowEditForm] = useState(false)

  // Mock data - in real app this would come from your backend
  const materials = [
    {
      id: 1,
      name: "Steel Reinforcement Bars",
      sku: "MAT-001",
      category: "construction",
      currentStock: 150,
      minStock: 50,
      maxStock: 300,
      unit: "pcs",
      costPerUnit: 12.50,
      location: "Warehouse A - Section 1",
      supplier: "Steel Works Inc.",
      lastUsed: "2024-01-15",
      status: "normal",
      notes: "Grade 60 steel bars, 12mm diameter"
    },
    {
      id: 2,
      name: "Electrical Wire 14 AWG",
      sku: "MAT-002",
      category: "electrical",
      currentStock: 25,
      minStock: 30,
      maxStock: 100,
      unit: "roll",
      costPerUnit: 89.99,
      location: "Warehouse B - Shelf 3",
      supplier: "ElectroSupply Co.",
      lastUsed: "2024-01-14",
      status: "low",
      notes: "THHN insulated copper wire"
    },
    {
      id: 3,
      name: "PVC Pipe 4 inch",
      sku: "MAT-003",
      category: "plumbing",
      currentStock: 80,
      minStock: 20,
      maxStock: 150,
      unit: "pcs",
      costPerUnit: 18.75,
      location: "Warehouse A - Section 3",
      supplier: "Plumbing Plus",
      lastUsed: "2024-01-12",
      status: "normal",
      notes: "Schedule 40 PVC pipe, 10ft length"
    },
    {
      id: 4,
      name: "Safety Helmets",
      sku: "MAT-004",
      category: "safety",
      currentStock: 5,
      minStock: 15,
      maxStock: 50,
      unit: "pcs",
      costPerUnit: 24.99,
      location: "Office Storage",
      supplier: "Safety First Ltd.",
      lastUsed: "2024-01-13",
      status: "critical",
      notes: "ANSI Z89.1 compliant hard hats"
    },
    {
      id: 5,
      name: "Concrete Mix Bags",
      sku: "MAT-005",
      category: "construction",
      currentStock: 120,
      minStock: 40,
      maxStock: 200,
      unit: "bag",
      costPerUnit: 6.75,
      location: "Warehouse A - Section 2",
      supplier: "Concrete Solutions",
      lastUsed: "2024-01-16",
      status: "normal",
      notes: "80lb portland cement mix"
    }
  ]

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayMaterials = limit ? filteredMaterials.slice(0, limit) : filteredMaterials

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Critical</Badge>
      case 'low':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
      default:
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Normal</Badge>
    }
  }

  const handleEdit = (material: any) => {
    setSelectedMaterial(material)
    setShowEditForm(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Materials Inventory
            {limit && (
              <Badge variant="outline" className="ml-2">
                Showing {displayMaterials.length} of {materials.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{material.name}</div>
                        <div className="text-sm text-gray-500">{material.supplier}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{material.sku}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {material.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{material.currentStock}</span>
                        <span className="text-sm text-gray-500">{material.unit}</span>
                        {material.status !== 'normal' && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: {material.minStock} | Max: {material.maxStock}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(material.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {material.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${(material.currentStock * material.costPerUnit).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${material.costPerUnit}/{material.unit}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => console.log('View details:', material.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(material)}>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Material
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => console.log('Allocate to work:', material.id)}>
                            <TrendingDown className="w-4 h-4 mr-2" />
                            Allocate to Work
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {showEditForm && (
        <MaterialForm
          isOpen={showEditForm}
          onClose={() => {
            setShowEditForm(false)
            setSelectedMaterial(null)
          }}
          material={selectedMaterial}
        />
      )}
    </>
  )
}
