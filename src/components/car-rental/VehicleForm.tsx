
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from 'react-hook-form'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Vehicle {
  id?: string
  brand: string
  model: string
  plate_number: string
  vehicle_type: string
  year: number
  color: string
  photo_url?: string
  status: string
}

interface VehicleFormProps {
  vehicle?: Vehicle | null
  onSuccess: () => void
  onCancel: () => void
}

export function VehicleForm({ vehicle, onSuccess, onCancel }: VehicleFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Vehicle>({
    defaultValues: vehicle || {
      brand: '',
      model: '',
      plate_number: '',
      vehicle_type: 'car',
      year: new Date().getFullYear(),
      color: '',
      status: 'active'
    }
  })
  const { toast } = useToast()

  const onSubmit = async (data: Vehicle) => {
    try {
      if (vehicle?.id) {
        // Update existing vehicle
        const { error } = await supabase
          .from('vehicles')
          .update(data)
          .eq('id', vehicle.id)

        if (error) throw error
        toast({
          title: "Success",
          description: "Vehicle updated successfully"
        })
      } else {
        // Create new vehicle
        const { data: user } = await supabase.auth.getUser()
        if (!user.user) throw new Error('Not authenticated')

        const { error } = await supabase
          .from('vehicles')
          .insert([{ ...data, user_id: user.user.id }])

        if (error) throw error
        toast({
          title: "Success",
          description: "Vehicle added successfully"
        })
      }
      onSuccess()
    } catch (error) {
      console.error('Error saving vehicle:', error)
      toast({
        title: "Error",
        description: "Failed to save vehicle",
        variant: "destructive"
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                {...register('brand', { required: 'Brand is required' })}
                className={errors.brand ? 'border-red-500' : ''}
              />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
            </div>

            <div>
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                {...register('model', { required: 'Model is required' })}
                className={errors.model ? 'border-red-500' : ''}
              />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
            </div>

            <div>
              <Label htmlFor="plate_number">Plate Number *</Label>
              <Input
                id="plate_number"
                {...register('plate_number', { required: 'Plate number is required' })}
                className={errors.plate_number ? 'border-red-500' : ''}
              />
              {errors.plate_number && <p className="text-red-500 text-sm mt-1">{errors.plate_number.message}</p>}
            </div>

            <div>
              <Label htmlFor="vehicle_type">Vehicle Type *</Label>
              <Select
                value={watch('vehicle_type')}
                onValueChange={(value) => setValue('vehicle_type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                {...register('year', { 
                  required: 'Year is required',
                  valueAsNumber: true 
                })}
                className={errors.year ? 'border-red-500' : ''}
              />
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>}
            </div>

            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                {...register('color')}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch('status')}
                onValueChange={(value) => setValue('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">In Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="photo_url">Photo URL</Label>
              <Input
                id="photo_url"
                type="url"
                {...register('photo_url')}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">
              {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
