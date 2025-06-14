
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useFastPDFGeneration } from "@/hooks/useFastPDFGeneration"
import { Vehicle, RentalFormData } from './types'

export function useRentalForm(rental?: any, onSuccess?: () => void) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { generateContractPDF } = useFastPDFGeneration()

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

  const generateRentalPDF = async (rentalData: any) => {
    try {
      const vehicle = vehicles.find(v => v.id === rentalData.vehicle_id)
      
      const startDate = new Date(rentalData.rental_start_date)
      const endDate = new Date(rentalData.rental_end_date)
      const timeDiff = endDate.getTime() - startDate.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
      
      const contractData = {
        title: `Car Rental Agreement - ${vehicle?.brand} ${vehicle?.model}`,
        client: {
          name: rentalData.renter_name,
          email: '',
          phone: '',
          address: rentalData.pickup_location
        },
        items: [
          {
            description: `Vehicle Rental - ${vehicle?.brand} ${vehicle?.model} (${vehicle?.plate_number})`,
            quantity: daysDiff,
            price: rentalData.total_price / daysDiff,
            total: rentalData.total_price
          }
        ],
        subtotal: rentalData.total_price,
        total: rentalData.total_price,
        terms: `Rental Period: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}\n\nPickup Location: ${rentalData.pickup_location}\nReturn Location: ${rentalData.return_location}\n\nPayment Status: ${rentalData.payment_status}\nPayment Method: ${rentalData.payment_method || 'Not specified'}\n\n${rentalData.notes ? `Notes: ${rentalData.notes}` : ''}`,
        date: new Date().toLocaleDateString()
      }

      await generateContractPDF(contractData)
    } catch (error) {
      console.error('Error generating rental PDF:', error)
      toast({
        title: "Warning",
        description: "Rental saved but PDF generation failed",
        variant: "destructive"
      })
    }
  }

  const onSubmit = async (data: RentalFormData) => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) {
        throw new Error('Not authenticated')
      }

      if (data.fuel_level_pickup && data.fuel_level_pickup > 99.9) {
        data.fuel_level_pickup = 99.9
      }
      if (data.fuel_level_return && data.fuel_level_return > 99.9) {
        data.fuel_level_return = 99.9
      }

      let savedRental
      if (rental?.id) {
        const { data: updatedRental, error } = await supabase
          .from('car_rentals')
          .update({
            ...data,
            rental_start_date: new Date(data.rental_start_date).toISOString(),
            rental_end_date: new Date(data.rental_end_date).toISOString(),
          })
          .eq('id', rental.id)
          .select('*')
          .single()

        if (error) throw error
        savedRental = updatedRental
        
        toast({
          title: "Success",
          description: "Rental updated successfully"
        })
      } else {
        const { data: newRental, error } = await supabase
          .from('car_rentals')
          .insert([{ 
            ...data, 
            user_id: user.user.id,
            rental_start_date: new Date(data.rental_start_date).toISOString(),
            rental_end_date: new Date(data.rental_end_date).toISOString(),
          }])
          .select('*')
          .single()

        if (error) throw error
        savedRental = newRental
        
        toast({
          title: "Success",
          description: "Rental created successfully"
        })
      }

      if (savedRental) {
        await generateRentalPDF(savedRental)
      }

      if (onSuccess) {
        onSuccess()
      }
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

  return {
    vehicles,
    isSubmitting,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    onSubmit
  }
}
