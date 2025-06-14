
export interface Vehicle {
  id: string
  brand: string
  model: string
  plate_number: string
}

export interface RentalFormData {
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

export interface RentalFormProps {
  rental?: any
  onSuccess: () => void
  onCancel: () => void
}
