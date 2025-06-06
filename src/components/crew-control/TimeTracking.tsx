
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
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            Time Tracking
          </CardTitle>
          <Button 
            size="lg" 
            onClick={() => setShowCheckInForm(!showCheckInForm)} 
            className="w-full sm:w-auto h-10 sm:h-12 lg:h-14 px-4 sm:px-6 lg:px-8 bg-green-600 hover:bg-green-700 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <LogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="hidden xs:inline">Check In Employee</span>
            <span className="xs:hidden">Check In</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {showCheckInForm && (
          <div className="p-3 sm:p-4 lg:p-6 border rounded-lg bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 text-blue-900">Employee Check-In</h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Label htmlFor="employee" className="text-xs sm:text-sm lg:text-base font-medium">Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="h-10 sm:h-12 lg:h-14 mt-1 sm:mt-2 text-sm sm:text-base">
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
                <Label htmlFor="location" className="text-xs sm:text-sm lg:text-base font-medium">Work Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter job site address"
                  className="h-10 sm:h-12 lg:h-14 mt-1 sm:mt-2 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="customer" className="text-xs sm:text-sm lg:text-base font-medium">Customer</Label>
                <Input
                  id="customer"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Customer name"
                  className="h-10 sm:h-12 lg:h-14 mt-1 sm:mt-2 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <Button 
                  onClick={handleCheckIn} 
                  size="lg" 
                  className="h-10 sm:h-12 lg:h-14 px-4 sm:px-6 lg:px-8 flex-1 bg-green-600 hover:bg-green-700 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Check In
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setShowCheckInForm(false)} 
                  className="h-10 sm:h-12 lg:h-14 px-4 sm:px-6 lg:px-8 sm:w-auto text-sm sm:text-base font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {displayEntries.map((entry) => (
          <div key={entry.id} className="p-3 sm:p-4 lg:p-6 border rounded-lg hover:bg-gray-50 transition-colors duration-200 space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm sm:text-base lg:text-lg flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="truncate">{entry.employeeName}</span>
                  <Badge 
                    variant={entry.status === 'active' ? 'default' : 'secondary'}
                    className={`${entry.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800'} text-xs sm:text-sm px-2 sm:px-3 py-1 self-start sm:self-auto`}
                  >
                    {entry.status === 'active' ? 'Working' : 'Completed'}
                  </Badge>
                </h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-base text-gray-600">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                    <span className="truncate">{entry.location}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{entry.customer}</span>
                  </div>
                </div>
              </div>
              {entry.status === 'active' && (
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => handleCheckOut(entry.id, entry.employeeName)}
                  className="w-full sm:w-auto h-10 sm:h-12 lg:h-14 px-4 sm:px-6 lg:px-8 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-sm sm:text-base font-medium transition-all duration-200"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  <span className="hidden xs:inline">Check Out</span>
                  <span className="xs:hidden">Out</span>
                </Button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm lg:text-base">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <span className="flex items-center gap-1 sm:gap-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                  <span className="font-medium">In:</span> {entry.checkIn}
                </span>
                {entry.checkOut && (
                  <span className="flex items-center gap-1 sm:gap-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                    <span className="font-medium">Out:</span> {entry.checkOut}
                  </span>
                )}
              </div>
              {entry.hoursWorked && (
                <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium self-start sm:self-auto">
                  {entry.hoursWorked}h worked
                </Badge>
              )}
            </div>

            {entry.status === 'active' && (
              <div className="pt-2 sm:pt-3 border-t border-amber-200 bg-amber-50 -mx-3 sm:-mx-4 lg:-mx-6 px-3 sm:px-4 lg:px-6 pb-0 rounded-b-lg">
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-amber-700 pb-3 sm:pb-4">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  Currently working - no checkout time recorded
                </div>
              </div>
            )}
          </div>
        ))}

        {displayEntries.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Clock className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">No time entries found</p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-1">Start tracking employee time</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
