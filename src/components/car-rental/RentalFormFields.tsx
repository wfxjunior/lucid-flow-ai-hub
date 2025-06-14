
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Vehicle } from './types'

interface VehicleSelectProps {
  vehicles: Vehicle[]
  value: string
  onValueChange: (value: string) => void
  error?: string
}

export function VehicleSelect({ vehicles, value, onValueChange, error }: VehicleSelectProps) {
  return (
    <div>
      <Label htmlFor="vehicle_id">Vehicle *</Label>
      <Select value={value} onValueChange={onValueChange}>
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
      {error && <p className="text-red-500 text-sm mt-1">Vehicle is required</p>}
    </div>
  )
}

interface PaymentStatusSelectProps {
  value: string
  onValueChange: (value: string) => void
}

export function PaymentStatusSelect({ value, onValueChange }: PaymentStatusSelectProps) {
  return (
    <div>
      <Label htmlFor="payment_status">Payment Status</Label>
      <Select value={value} onValueChange={onValueChange}>
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
  )
}

interface PaymentMethodSelectProps {
  value: string
  onValueChange: (value: string) => void
}

export function PaymentMethodSelect({ value, onValueChange }: PaymentMethodSelectProps) {
  return (
    <div>
      <Label htmlFor="payment_method">Payment Method</Label>
      <Select value={value || ''} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cash">Cash</SelectItem>
          <SelectItem value="credit-card">Credit Card</SelectItem>
          <SelectItem value="debit-card">Debit Card</SelectItem>
          <SelectItem value="transfer">Transfer</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

interface RentalStatusSelectProps {
  value: string
  onValueChange: (value: string) => void
}

export function RentalStatusSelect({ value, onValueChange }: RentalStatusSelectProps) {
  return (
    <div>
      <Label htmlFor="rental_status">Rental Status</Label>
      <Select value={value} onValueChange={onValueChange}>
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
  )
}

interface FuelLevelInputProps {
  id: string
  label: string
  register: any
  error?: any
}

export function FuelLevelInput({ id, label, register, error }: FuelLevelInputProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min="0"
        max="99.9"
        step="0.1"
        {...register(id, { 
          valueAsNumber: true,
          min: { value: 0, message: 'Fuel level must be at least 0%' },
          max: { value: 99.9, message: 'Fuel level cannot exceed 99.9%' }
        })}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}

interface NotesTextareaProps {
  register: any
}

export function NotesTextarea({ register }: NotesTextareaProps) {
  return (
    <div>
      <Label htmlFor="notes">Internal Notes</Label>
      <Textarea
        id="notes"
        {...register('notes')}
        placeholder="Internal notes for this rental..."
      />
    </div>
  )
}
