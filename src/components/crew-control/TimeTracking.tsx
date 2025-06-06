
import React, { useState } from 'react'
import { Clock, MapPin, User, Calendar, LogIn, LogOut, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

interface TimeEntry {
  id: string
  employeeId: string
  employeeName: string
  checkIn: string
  checkOut?: string
  location: string
  customer: string
  hoursWorked?: number
  status: 'active' | 'completed'
}

interface TimeTrackingProps {
  limit?: number
}

export function TimeTracking({ limit }: TimeTrackingProps) {
  const [showCheckInForm, setShowCheckInForm] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [location, setLocation] = useState('')
  const [customer, setCustomer] = useState('')

  // Mock data for demonstration
  const timeEntries: TimeEntry[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'John Smith',
      checkIn: '08:00 AM',
      checkOut: undefined,
      location: '123 Oak St',
      customer: 'ABC Corp',
      status: 'active'
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Maria Rodriguez',
      checkIn: '07:30 AM',
      checkOut: '04:30 PM',
      location: '456 Pine Ave',
      customer: 'XYZ Inc',
      hoursWorked: 8.5,
      status: 'completed'
    },
    {
      id: '3',
      employeeId: '3',
      employeeName: 'David Johnson',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      location: '789 Elm St',
      customer: 'DEF LLC',
      hoursWorked: 8.0,
      status: 'completed'
    }
  ]

  const displayEntries = limit ? timeEntries.slice(0, limit) : timeEntries

  const handleCheckIn = () => {
    if (!selectedEmployee || !location || !customer) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields for check-in.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Check-in Successful",
      description: `Employee checked in at ${location}`,
    })

    setShowCheckInForm(false)
    setSelectedEmployee('')
    setLocation('')
    setCustomer('')
  }

  const handleCheckOut = (entryId: string, employeeName: string) => {
    toast({
      title: "Check-out Successful",
      description: `${employeeName} has been checked out`,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            Time Tracking
          </CardTitle>
          <Button 
            size="lg" 
            onClick={() => setShowCheckInForm(!showCheckInForm)} 
            className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 bg-green-600 hover:bg-green-700 text-base font-medium"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Check In
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showCheckInForm && (
          <div className="p-4 sm:p-6 border rounded-lg bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-base sm:text-lg mb-4 text-blue-900">Employee Check-In</h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="employee" className="text-sm sm:text-base font-medium">Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="h-12 sm:h-14 mt-2">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Smith</SelectItem>
                    <SelectItem value="2">Maria Rodriguez</SelectItem>
                    <SelectItem value="3">David Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location" className="text-sm sm:text-base font-medium">Work Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter job site address"
                  className="h-12 sm:h-14 mt-2 text-base"
                />
              </div>
              <div>
                <Label htmlFor="customer" className="text-sm sm:text-base font-medium">Customer</Label>
                <Input
                  id="customer"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Customer name"
                  className="h-12 sm:h-14 mt-2 text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  onClick={handleCheckIn} 
                  size="lg" 
                  className="h-12 sm:h-14 px-8 flex-1 bg-green-600 hover:bg-green-700 text-base font-medium"
                >
                  Check In
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setShowCheckInForm(false)} 
                  className="h-12 sm:h-14 px-8 sm:w-auto text-base font-medium"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {displayEntries.map((entry) => (
          <div key={entry.id} className="p-4 sm:p-6 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-base sm:text-lg flex items-center gap-3 mb-3">
                  {entry.employeeName}
                  <Badge 
                    variant={entry.status === 'active' ? 'default' : 'secondary'}
                    className={`${entry.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800'} text-sm px-3 py-1`}
                  >
                    {entry.status === 'active' ? 'Working' : 'Completed'}
                  </Badge>
                </h4>
                <div className="space-y-2 text-sm sm:text-base text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>{entry.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>{entry.customer}</span>
                  </div>
                </div>
              </div>
              {entry.status === 'active' && (
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => handleCheckOut(entry.id, entry.employeeName)}
                  className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-base font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Check Out
                </Button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row gap-4">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="font-medium">In:</span> {entry.checkIn}
                </span>
                {entry.checkOut && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="font-medium">Out:</span> {entry.checkOut}
                  </span>
                )}
              </div>
              {entry.hoursWorked && (
                <Badge variant="outline" className="text-sm px-3 py-1 font-medium">
                  {entry.hoursWorked}h worked
                </Badge>
              )}
            </div>

            {entry.status === 'active' && (
              <div className="mt-4 pt-4 border-t border-amber-200 bg-amber-50 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-0 rounded-b-lg">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-700 pb-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Currently working - no checkout time recorded
                </div>
              </div>
            )}
          </div>
        ))}

        {displayEntries.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-base sm:text-lg font-medium">No time entries found</p>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Start tracking employee time</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
