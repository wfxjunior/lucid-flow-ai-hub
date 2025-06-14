
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRentalForm } from './useRentalForm'
import { RentalFormProps } from './types'
import { 
  VehicleSelect, 
  PaymentStatusSelect, 
  PaymentMethodSelect, 
  RentalStatusSelect,
  FuelLevelInput,
  NotesTextarea 
} from './RentalFormFields'

export function RentalForm({ rental, onSuccess, onCancel }: RentalFormProps) {
  const {
    vehicles,
    isSubmitting,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    onSubmit
  } = useRentalForm(rental, onSuccess)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{rental ? 'Edit Rental' : 'New Rental'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VehicleSelect
              vehicles={vehicles}
              value={watch('vehicle_id')}
              onValueChange={(value) => setValue('vehicle_id', value)}
              error={errors.vehicle_id ? 'Vehicle is required' : undefined}
            />

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

            <FuelLevelInput
              id="fuel_level_pickup"
              label="Fuel Level Pickup (%)"
              register={register}
              error={errors.fuel_level_pickup}
            />

            <FuelLevelInput
              id="fuel_level_return"
              label="Fuel Level Return (%)"
              register={register}
              error={errors.fuel_level_return}
            />

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

            <PaymentStatusSelect
              value={watch('payment_status')}
              onValueChange={(value) => setValue('payment_status', value)}
            />

            <PaymentMethodSelect
              value={watch('payment_method')}
              onValueChange={(value) => setValue('payment_method', value)}
            />

            <RentalStatusSelect
              value={watch('rental_status')}
              onValueChange={(value) => setValue('rental_status', value)}
            />
          </div>

          <NotesTextarea register={register} />

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
