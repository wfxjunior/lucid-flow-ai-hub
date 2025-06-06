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
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg lg:text-xl">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            Employee List
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm self-start sm:ml-auto">
            {displayEmployees.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {displayEmployees.map((employee) => (
          <div key={employee.id} className="p-3 sm:p-4 lg:p-6 border rounded-lg hover:bg-gray-50 transition-colors duration-200 space-y-3 sm:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0">
                  <AvatarFallback className="text-xs sm:text-sm lg:text-base font-medium">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 truncate">{employee.name}</h4>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 truncate">{employee.position}</p>
                  <Badge className={`${getStatusColor(employee.status)} text-xs font-medium px-2 py-1`} variant="secondary">
                    {getStatusText(employee.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-1 sm:gap-2 self-start lg:self-auto">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => onSelectEmployee(employee.id)} 
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 p-0 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                >
                  <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 p-0 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-base">
              <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-600 text-xs sm:text-sm">Rate:</span>
                <span className="font-semibold truncate">${employee.hourlyRate}/hr</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600 text-xs sm:text-sm">Today:</span>
                <span className="font-semibold">{employee.hoursToday}h</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                <span className="text-gray-600 text-xs sm:text-sm">Earned:</span>
                <span className="font-semibold">${employee.earningsToday}</span>
              </div>
              {employee.currentLocation && (
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 col-span-2 lg:col-span-1">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                  <span className="text-gray-600 truncate text-xs sm:text-sm">{employee.currentLocation}</span>
                </div>
              )}
            </div>

            {employee.currentCustomer && (
              <div className="pt-2 sm:pt-3 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500">
                  Currently working for: <span className="font-medium text-gray-700">{employee.currentCustomer}</span>
                </p>
              </div>
            )}
          </div>
        ))}

        {displayEmployees.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <User className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">No employees found</p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
