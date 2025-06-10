
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Filter } from 'lucide-react'
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface RentalStats {
  totalRentals: number
  totalRevenue: number
  activeRentals: number
  completedRentals: number
  overduePayments: number
}

export function RentalReports() {
  const [stats, setStats] = useState<RentalStats>({
    totalRentals: 0,
    totalRevenue: 0,
    activeRentals: 0,
    completedRentals: 0,
    overduePayments: 0
  })
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    vehicleId: 'all',
    status: 'all',
    paymentStatus: 'all'
  })
  const [vehicles, setVehicles] = useState<any[]>([])
  const [filteredRentals, setFilteredRentals] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchStats()
    fetchVehicles()
    fetchFilteredRentals()
  }, [])

  useEffect(() => {
    fetchFilteredRentals()
  }, [filters])

  const fetchStats = async () => {
    try {
      const { data: rentals, error } = await supabase
        .from('car_rentals')
        .select('*')

      if (error) throw error

      const totalRentals = rentals?.length || 0
      const totalRevenue = rentals?.reduce((sum, rental) => sum + Number(rental.total_price), 0) || 0
      const activeRentals = rentals?.filter(r => r.rental_status === 'ongoing').length || 0
      const completedRentals = rentals?.filter(r => r.rental_status === 'returned').length || 0
      const overduePayments = rentals?.filter(r => r.payment_status === 'overdue').length || 0

      setStats({
        totalRentals,
        totalRevenue,
        activeRentals,
        completedRentals,
        overduePayments
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, brand, model, plate_number')

      if (error) throw error
      setVehicles(data || [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  const fetchFilteredRentals = async () => {
    try {
      let query = supabase
        .from('car_rentals')
        .select(`
          *,
          vehicle:vehicles(brand, model, plate_number)
        `)

      if (filters.startDate) {
        query = query.gte('rental_start_date', filters.startDate)
      }
      if (filters.endDate) {
        query = query.lte('rental_end_date', filters.endDate)
      }
      if (filters.vehicleId && filters.vehicleId !== 'all') {
        query = query.eq('vehicle_id', filters.vehicleId)
      }
      if (filters.status && filters.status !== 'all') {
        query = query.eq('rental_status', filters.status)
      }
      if (filters.paymentStatus && filters.paymentStatus !== 'all') {
        query = query.eq('payment_status', filters.paymentStatus)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setFilteredRentals(data || [])
    } catch (error) {
      console.error('Error fetching filtered rentals:', error)
    }
  }

  const handleExportPDF = () => {
    toast({
      title: "Export Started",
      description: "Your PDF report is being generated...",
    })
    // In a real implementation, this would generate and download a PDF
  }

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      vehicleId: 'all',
      status: 'all',
      paymentStatus: 'all'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Rental Reports</h2>
        <Button onClick={handleExportPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.totalRentals}</div>
            <p className="text-sm text-gray-600">Total Rentals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.activeRentals}</div>
            <p className="text-sm text-gray-600">Active Rentals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{stats.completedRentals}</div>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.overduePayments}</div>
            <p className="text-sm text-gray-600">Overdue Payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="vehicle">Vehicle</Label>
              <Select
                value={filters.vehicleId}
                onValueChange={(value) => setFilters({ ...filters, vehicleId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All vehicles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All vehicles</SelectItem>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} ({vehicle.plate_number})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                value={filters.paymentStatus}
                onValueChange={(value) => setFilters({ ...filters, paymentStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All payments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtered Results */}
      <Card>
        <CardHeader>
          <CardTitle>Filtered Results ({filteredRentals.length} rentals)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Renter</th>
                  <th className="text-left p-2">Vehicle</th>
                  <th className="text-left p-2">Dates</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Payment</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRentals.map((rental) => (
                  <tr key={rental.id} className="border-b">
                    <td className="p-2">{rental.renter_name}</td>
                    <td className="p-2">
                      {rental.vehicle?.brand} {rental.vehicle?.model}
                      <br />
                      <span className="text-sm text-gray-600">({rental.vehicle?.plate_number})</span>
                    </td>
                    <td className="p-2">
                      {new Date(rental.rental_start_date).toLocaleDateString()} - 
                      {new Date(rental.rental_end_date).toLocaleDateString()}
                    </td>
                    <td className="p-2">${rental.total_price}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        rental.payment_status === 'paid' 
                          ? 'bg-green-100 text-green-800'
                          : rental.payment_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {rental.payment_status}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        rental.rental_status === 'ongoing' 
                          ? 'bg-green-100 text-green-800'
                          : rental.rental_status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : rental.rental_status === 'returned'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {rental.rental_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
