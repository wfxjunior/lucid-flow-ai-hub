
import React from 'react'
import { User, MapPin, Clock, DollarSign, Phone, Mail, Edit3, Trash2, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Employee {
  id: string
  name: string
  position: string
  hourlyRate: number
  phone: string
  email: string
  status: 'active' | 'on_break' | 'off_duty'
  currentLocation?: string
  currentCustomer?: string
  hoursToday: number
  earningsToday: number
}

interface EmployeeListProps {
  searchQuery?: string
  limit?: number
  onSelectEmployee: (employeeId: string) => void
}

export function EmployeeList({ searchQuery = '', limit, onSelectEmployee }: EmployeeListProps) {
  // Mock data for demonstration
  const employees: Employee[] = [
    {
      id: '1',
      name: 'John Smith',
      position: 'Electrician',
      hourlyRate: 28.50,
      phone: '(555) 123-4567',
      email: 'john@company.com',
      status: 'active',
      currentLocation: '123 Oak St',
      currentCustomer: 'ABC Corp',
      hoursToday: 6.5,
      earningsToday: 185.25
    },
    {
      id: '2',
      name: 'Maria Rodriguez',
      position: 'Plumber',
      hourlyRate: 25.00,
      phone: '(555) 234-5678',
      email: 'maria@company.com',
      status: 'on_break',
      currentLocation: '456 Pine Ave',
      currentCustomer: 'XYZ Inc',
      hoursToday: 4.0,
      earningsToday: 100.00
    },
    {
      id: '3',
      name: 'David Johnson',
      position: 'HVAC Technician',
      hourlyRate: 30.00,
      phone: '(555) 345-6789',
      email: 'david@company.com',
      status: 'off_duty',
      hoursToday: 8.0,
      earningsToday: 240.00
    }
  ]

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.currentCustomer?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayEmployees = limit ? filteredEmployees.slice(0, limit) : filteredEmployees

  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'on_break': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'off_duty': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: Employee['status']) => {
    switch (status) {
      case 'active': return 'Working'
      case 'on_break': return 'On Break'
      case 'off_duty': return 'Off Duty'
      default: return 'Unknown'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <User className="w-5 h-5 sm:w-6 sm:h-6" />
          Employee List
          <Badge variant="secondary" className="ml-auto text-sm">
            {displayEmployees.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayEmployees.map((employee) => (
          <div key={employee.id} className="p-4 sm:p-6 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarFallback className="text-sm sm:text-base font-medium">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 truncate">{employee.name}</h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">{employee.position}</p>
                  <Badge className={`${getStatusColor(employee.status)} text-xs sm:text-sm font-medium px-2 py-1`} variant="secondary">
                    {getStatusText(employee.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2 sm:gap-3 self-start">
                <Button 
                  size="lg" 
                  variant="ghost" 
                  onClick={() => onSelectEmployee(employee.id)} 
                  className="h-10 w-10 sm:h-12 sm:w-12 p-0 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="h-10 w-10 sm:h-12 sm:w-12 p-0 hover:bg-green-50 hover:text-green-600"
                >
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="h-10 w-10 sm:h-12 sm:w-12 p-0 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Rate:</span>
                  <span className="font-semibold">${employee.hourlyRate}/hr</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-600">Today:</span>
                  <span className="font-semibold">{employee.hoursToday}h</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-gray-600">Earned:</span>
                  <span className="font-semibold">${employee.earningsToday}</span>
                </div>
                {employee.currentLocation && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-gray-600 truncate">{employee.currentLocation}</span>
                  </div>
                )}
              </div>
            </div>

            {employee.currentCustomer && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500">
                  Currently working for: <span className="font-medium text-gray-700">{employee.currentCustomer}</span>
                </p>
              </div>
            )}
          </div>
        ))}

        {displayEmployees.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-base sm:text-lg font-medium">No employees found</p>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
