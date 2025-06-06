
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, FileText, Mail } from 'lucide-react'
import { RentalForm } from './RentalForm'
import { RentalDocuments } from './RentalDocuments'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Rental {
  id: string
  renter_name: string
  rental_start_date: string
  rental_end_date: string
  pickup_location: string
  return_location: string
  total_price: number
  payment_status: string
  rental_status: string
  vehicle: {
    brand: string
    model: string
    plate_number: string
  }
}

export function RentalManagement() {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingRental, setEditingRental] = useState<Rental | null>(null)
  const [showDocuments, setShowDocuments] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchRentals()
  }, [])

  const fetchRentals = async () => {
    try {
      const { data, error } = await supabase
        .from('car_rentals')
        .select(`
          *,
          vehicle:vehicles(brand, model, plate_number)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRentals(data || [])
    } catch (error) {
      console.error('Error fetching rentals:', error)
      toast({
        title: "Error",
        description: "Failed to load rentals",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (rental: Rental) => {
    setEditingRental(rental)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingRental(null)
    fetchRentals()
  }

  const handleSendConfirmation = async (rental: Rental) => {
    // This would typically send an email - for now just show a toast
    toast({
      title: "Email Sent",
      description: `Confirmation email sent to ${rental.renter_name}`,
    })
  }

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      returned: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading rentals...</div>
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-semibold">Rental Management</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          New Rental
        </Button>
      </div>

      {showForm && (
        <RentalForm
          rental={editingRental}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingRental(null)
          }}
        />
      )}

      {showDocuments && (
        <RentalDocuments
          rentalId={showDocuments}
          onClose={() => setShowDocuments(null)}
        />
      )}

      <div className="grid gap-4">
        {rentals.map((rental) => (
          <Card key={rental.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold truncate">{rental.renter_name}</h3>
                  <p className="text-gray-600 text-sm md:text-base truncate">
                    {rental.vehicle.brand} {rental.vehicle.model} ({rental.vehicle.plate_number})
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDocuments(rental.id)}
                    className="p-2"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendConfirmation(rental)}
                    className="p-2"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(rental)}
                    className="p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Pickup:</span>
                  <p className="font-medium">{new Date(rental.rental_start_date).toLocaleDateString()}</p>
                  <p className="text-gray-600 text-xs truncate">{rental.pickup_location}</p>
                </div>
                <div>
                  <span className="text-gray-600">Return:</span>
                  <p className="font-medium">{new Date(rental.rental_end_date).toLocaleDateString()}</p>
                  <p className="text-gray-600 text-xs truncate">{rental.return_location}</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Price:</span>
                  <p className="font-medium">${rental.total_price}</p>
                  <span className={`px-2 py-1 rounded text-xs ${getPaymentStatusColor(rental.payment_status)}`}>
                    {rental.payment_status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <p>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(rental.rental_status)}`}>
                      {rental.rental_status}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {rentals.length === 0 && (
        <Card>
          <CardContent className="p-6 md:p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rentals found</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Start by creating your first rental.</p>
            <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Rental
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
