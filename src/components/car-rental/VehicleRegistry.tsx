
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Car } from 'lucide-react'
import { VehicleForm } from './VehicleForm'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Vehicle {
  id: string
  brand: string
  model: string
  plate_number: string
  vehicle_type: string
  year: number
  color: string
  photo_url?: string
  status: string
}

export function VehicleRegistry() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setVehicles(data || [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      toast({
        title: "Error",
        description: "Failed to load vehicles",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id)

      if (error) throw error

      setVehicles(vehicles.filter(v => v.id !== id))
      toast({
        title: "Success",
        description: "Vehicle deleted successfully"
      })
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      toast({
        title: "Error",
        description: "Failed to delete vehicle",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingVehicle(null)
    fetchVehicles()
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading vehicles...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Vehicle Registry</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {showForm && (
        <VehicleForm
          vehicle={editingVehicle}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingVehicle(null)
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{vehicle.brand} {vehicle.model}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(vehicle)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(vehicle.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Plate:</span>
                  <span className="font-medium">{vehicle.plate_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="capitalize">{vehicle.vehicle_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Year:</span>
                  <span>{vehicle.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Color:</span>
                  <span className="capitalize">{vehicle.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    vehicle.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vehicles.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles registered</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first vehicle to the registry.</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
