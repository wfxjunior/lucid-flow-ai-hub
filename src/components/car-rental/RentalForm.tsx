
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AddressAutocomplete } from "@/components/ui/address-autocomplete"
import { useForm } from 'react-hook-form'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Vehicle {
  id: string
  brand: string
  model: string
  plate_number: string
}

interface RentalFormData {
  vehicle_id: string
  renter_name: string
  rental_start_date: string
  rental_end_date: string
  pickup_location: string
  return_location: string
  pickup_time?: string
  return_time?: string
  fuel_level_pickup?: number
  fuel_level_return?: number
  initial_mileage?: number
  final_mileage?: number
  total_price: number
  payment_status: string
  payment_method?: string
  rental_status: string
  notes?: string
}

interface RentalFormProps {
  rental?: any
  onSuccess: () => void
  onCancel: () => void
}

export function RentalForm({ rental, onSuccess, onCancel }: RentalFormProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RentalFormData>({
    defaultValues: rental ? {
      ...rental,
      rental_start_date: rental.rental_start_date?.split('T')[0],
      rental_end_date: rental.rental_end_date?.split('T')[0],
    } : {
      vehicle_id: '',
      renter_name: '',
      rental_start_date: '',
      rental_end_date: '',
      pickup_location: '',
      return_location: '',
      total_price: 0,
      payment_status: 'pending',
      rental_status: 'scheduled'
    }
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, brand, model, plate_number')
        .eq('status', 'active')

      if (error) {
        console.error('Error fetching vehicles:', error)
        toast({
          title: "Error",
          description: "Failed to load vehicles",
          variant: "destructive"
        })
        return
      }
      setVehicles(data || [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      toast({
        title: "Error",
        description: "Failed to load vehicles",
        variant: "destructive"
      })
    }
  }

  const onSubmit = async (data: RentalFormData) => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    try {
      // Get current user
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) {
        throw new Error('Not authenticated')
      }

      if (rental?.id) {
        // Update existing rental
        const { error } = await supabase
          .from('car_rentals')
          .update({
            ...data,
            rental_start_date: new Date(data.rental_start_date).toISOString(),
            rental_end_date: new Date(data.rental_end_date).toISOString(),
          })
          .eq('id', rental.id)

        if (error) throw error
        
        toast({
          title: "Success",
          description: "Rental updated successfully"
        })
      } else {
        // Create new rental
        const { error } = await supabase
          .from('car_rentals')
          .insert([{ 
            ...data, 
            user_id: user.user.id,
            rental_start_date: new Date(data.rental_start_date).toISOString(),
            rental_end_date: new Date(data.rental_end_date).toISOString(),
          }])

        if (error) throw error
        
        toast({
          title: "Success",
          description: "Rental created successfully"
        })
      }
      onSuccess()
    } catch (error) {
      console.error('Error saving rental:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save rental",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{rental ? 'Edit Rental' : 'New Rental'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vehicle_id">Vehicle *</Label>
              <Select
                value={watch('vehicle_id')}
                onValueChange={(value) => setValue('vehicle_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} ({vehicle.plate_number})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicle_id && <p className="text-red-500 text-sm mt-1">Vehicle is required</p>}
            </div>

            <div>
              <Label htmlFor="renter_name">Renter Name *</Label>
              <Input
                id="renter_name"
                {...register('renter_name', { required: 'Renter name is required' })}
                className={errors.renter_name ? 'border-red-500' : ''}
              />
              {errors.renter_name && <p className="text-red-500 text-sm mt-1">{errors.renter_name.message}</p>}
            </div>

            <div>
              <Label htmlFor="rental_start_date">Start Date *</Label>
              <Input
                id="rental_start_date"
                type="date"
                {...register('rental_start_date', { required: 'Start date is required' })}
                className={errors.rental_start_date ? 'border-red-500' : ''}
              />
              {errors.rental_start_date && <p className="text-red-500 text-sm mt-1">{errors.rental_start_date.message}</p>}
            </div>

            <div>
              <Label htmlFor="rental_end_date">End Date *</Label>
              <Input
                id="rental_end_date"
                type="date"
                {...register('rental_end_date', { required: 'End date is required' })}
                className={errors.rental_end_date ? 'border-red-500' : ''}
              />
              {errors.rental_end_date && <p className="text-red-500 text-sm mt-1">{errors.rental_end_date.message}</p>}
            </div>

            <div>
              <Label htmlFor="pickup_location">Pickup Location *</Label>
              <Input
                id="pickup_location"
                {...register('pickup_location', { required: 'Pickup location is required' })}
                placeholder="Enter pickup address..."
                className={errors.pickup_location ? 'border-red-500' : ''}
              />
              {errors.pickup_location && <p className="text-red-500 text-sm mt-1">{errors.pickup_location.message}</p>}
            </div>

            <div>
              <Label htmlFor="return_location">Return Location *</Label>
              <Input
                id="return_location"
                {...register('return_location', { required: 'Return location is required' })}
                placeholder="Enter return address..."
                className={errors.return_location ? 'border-red-500' : ''}
              />
              {errors.return_location && <p className="text-red-500 text-sm mt-1">{errors.return_location.message}</p>}
            </div>

            <div>
              <Label htmlFor="pickup_time">Pickup Time</Label>
              <Input
                id="pickup_time"
                type="time"
                {...register('pickup_time')}
              />
            </div>

            <div>
              <Label htmlFor="return_time">Return Time</Label>
              <Input
                id="return_time"
                type="time"
                {...register('return_time')}
              />
            </div>

            <div>
              <Label htmlFor="initial_mileage">Initial Mileage</Label>
              <Input
                id="initial_mileage"
                type="number"
                {...register('initial_mileage', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Label htmlFor="final_mileage">Final Mileage</Label>
              <Input
                id="final_mileage"
                type="number"
                {...register('final_mileage', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Label htmlFor="fuel_level_pickup">Fuel Level Pickup (%)</Label>
              <Input
                id="fuel_level_pickup"
                type="number"
                min="0"
                max="100"
                step="0.1"
                {...register('fuel_level_pickup', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Label htmlFor="fuel_level_return">Fuel Level Return (%)</Label>
              <Input
                id="fuel_level_return"
                type="number"
                min="0"
                max="100"
                step="0.1"
                {...register('fuel_level_return', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Label htmlFor="total_price">Total Price *</Label>
              <Input
                id="total_price"
                type="number"
                step="0.01"
                {...register('total_price', { 
                  required: 'Total price is required',
                  valueAsNumber: true 
                })}
                className={errors.total_price ? 'border-red-500' : ''}
              />
              {errors.total_price && <p className="text-red-500 text-sm mt-1">{errors.total_price.message}</p>}
            </div>

            <div>
              <Label htmlFor="payment_status">Payment Status</Label>
              <Select
                value={watch('payment_status')}
                onValueChange={(value) => setValue('payment_status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select
                value={watch('payment_method') || ''}
                onValueChange={(value) => setValue('payment_method', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rental_status">Rental Status</Label>
              <Select
                value={watch('rental_status')}
                onValueChange={(value) => setValue('rental_status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Internal Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Internal notes for this rental..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (rental ? 'Update Rental' : 'Create Rental')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
