
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
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time Tracking
          </CardTitle>
          <Button size="sm" onClick={() => setShowCheckInForm(!showCheckInForm)}>
            <LogIn className="w-4 h-4 mr-2" />
            Check In
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showCheckInForm && (
          <div className="p-4 border rounded-lg bg-blue-50">
            <h4 className="font-medium mb-3">Employee Check-In</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="employee">Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
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
                <Label htmlFor="location">Work Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter job site address"
                />
              </div>
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Input
                  id="customer"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Customer name"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCheckIn} size="sm">
                  Check In
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowCheckInForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {displayEntries.map((entry) => (
          <div key={entry.id} className="p-4 border rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium flex items-center gap-2">
                  {entry.employeeName}
                  <Badge 
                    variant={entry.status === 'active' ? 'default' : 'secondary'}
                    className={entry.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {entry.status === 'active' ? 'Working' : 'Completed'}
                  </Badge>
                </h4>
                <div className="text-sm text-gray-600 space-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {entry.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {entry.customer}
                  </div>
                </div>
              </div>
              {entry.status === 'active' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCheckOut(entry.id, entry.employeeName)}
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  Check Out
                </Button>
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-4">
                <span>
                  <Clock className="w-3 h-3 inline mr-1" />
                  In: {entry.checkIn}
                </span>
                {entry.checkOut && (
                  <span>
                    <Clock className="w-3 h-3 inline mr-1" />
                    Out: {entry.checkOut}
                  </span>
                )}
              </div>
              {entry.hoursWorked && (
                <Badge variant="outline">
                  {entry.hoursWorked}h worked
                </Badge>
              )}
            </div>

            {entry.status === 'active' && (
              <div className="mt-2 pt-2 border-t">
                <div className="flex items-center gap-1 text-xs text-amber-600">
                  <AlertCircle className="w-3 h-3" />
                  Currently working - no checkout time recorded
                </div>
              </div>
            )}
          </div>
        ))}

        {displayEntries.length === 0 && (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No time entries found</p>
            <p className="text-sm text-gray-500">Start tracking employee time</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
