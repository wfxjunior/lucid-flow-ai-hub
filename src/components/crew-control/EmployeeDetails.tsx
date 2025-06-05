
import React from 'react'
import { User, Phone, Mail, MapPin, Calendar, DollarSign, Clock, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface EmployeeDetailsProps {
  employeeId: string | null
}

export function EmployeeDetails({ employeeId }: EmployeeDetailsProps) {
  if (!employeeId) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Select an employee to view details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Mock employee data
  const employee = {
    id: employeeId,
    name: 'John Smith',
    position: 'Electrician',
    hourlyRate: 28.50,
    phone: '(555) 123-4567',
    email: 'john@company.com',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Smith',
    emergencyPhone: '(555) 987-6543',
    startDate: '2023-01-15',
    status: 'active',
    totalHours: 320,
    totalEarnings: 9120.00,
    currentLocation: '123 Oak St',
    currentCustomer: 'ABC Corp'
  }

  const recentActivity = [
    { date: '2024-01-15', action: 'Check-in', location: '123 Oak St', customer: 'ABC Corp', hours: 8 },
    { date: '2024-01-14', action: 'Check-out', location: '456 Pine Ave', customer: 'XYZ Inc', hours: 7.5 },
    { date: '2024-01-13', action: 'Check-out', location: '789 Elm St', customer: 'DEF LLC', hours: 8 }
  ]

  return (
    <div className="space-y-6">
      {/* Employee Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Employee Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{employee.name}</h3>
                <p className="text-gray-600">{employee.position}</p>
                <Badge className="bg-green-100 text-green-800 mt-2">
                  {employee.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{employee.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Started: {new Date(employee.startDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Pay Information</h4>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">${employee.hourlyRate}/hour</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Total Hours: {employee.totalHours}</p>
                  <p>Total Earnings: ${employee.totalEarnings.toFixed(2)}</p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium mb-2">Emergency Contact</h4>
                <p className="text-sm">{employee.emergencyContact}</p>
                <p className="text-sm text-gray-600">{employee.emergencyPhone}</p>
              </div>
            </div>
          </div>

          {employee.currentLocation && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                Current Assignment
              </h4>
              <p className="text-sm">Location: {employee.currentLocation}</p>
              <p className="text-sm">Customer: {employee.currentCustomer}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <Button size="sm" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Full History
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.location}</p>
                  <p className="text-xs text-gray-500">{activity.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{activity.hours}h</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
