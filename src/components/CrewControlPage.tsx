
import React, { useState } from 'react'
import { Plus, Users, Clock, DollarSign, MapPin, Calendar, Eye, Edit3, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeForm } from './crew-control/EmployeeForm'
import { EmployeeList } from './crew-control/EmployeeList'
import { TimeTracking } from './crew-control/TimeTracking'
import { PayrollSummary } from './crew-control/PayrollSummary'
import { EmployeeDetails } from './crew-control/EmployeeDetails'
import { CrewAnalytics } from './crew-control/CrewAnalytics'

export function CrewControlPage() {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

  // Mock data for demonstration
  const statsData = {
    totalEmployees: 12,
    activeToday: 8,
    totalHoursToday: 64,
    todayPayroll: 1280
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CrewControl</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Complete Employee Management System</p>
        </div>
        <Button 
          onClick={() => setShowEmployeeForm(true)}
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14"
          size="lg"
        >
          <Plus className="w-6 h-6 mr-3" />
          Add Employee
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-xs sm:text-sm font-medium">Total Employees</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">{statsData.totalEmployees}</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-xs sm:text-sm font-medium">Active Today</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-900">{statsData.activeToday}</p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-xs sm:text-sm font-medium">Hours Today</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-900">{statsData.totalHoursToday}</p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-xs sm:text-sm font-medium">Today's Payroll</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-900">${statsData.todayPayroll}</p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search employees by name, position, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 h-14 text-base"
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 min-w-fit h-14 p-1">
            <TabsTrigger value="overview" className="text-sm sm:text-base h-12 px-4 sm:px-6">Overview</TabsTrigger>
            <TabsTrigger value="employees" className="text-sm sm:text-base h-12 px-4 sm:px-6">Employees</TabsTrigger>
            <TabsTrigger value="tracking" className="text-sm sm:text-base h-12 px-3 sm:px-6">Time Tracking</TabsTrigger>
            <TabsTrigger value="payroll" className="text-sm sm:text-base h-12 px-4 sm:px-6">Payroll</TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm sm:text-base h-12 px-4 sm:px-6">Analytics</TabsTrigger>
            <TabsTrigger value="details" className="text-sm sm:text-base h-12 px-4 sm:px-6">Details</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <EmployeeList searchQuery={searchQuery} limit={5} onSelectEmployee={setSelectedEmployee} />
            <TimeTracking limit={5} />
          </div>
          <PayrollSummary />
        </TabsContent>

        <TabsContent value="employees">
          <EmployeeList searchQuery={searchQuery} onSelectEmployee={setSelectedEmployee} />
        </TabsContent>

        <TabsContent value="tracking">
          <TimeTracking />
        </TabsContent>

        <TabsContent value="payroll">
          <PayrollSummary expanded />
        </TabsContent>

        <TabsContent value="analytics">
          <CrewAnalytics />
        </TabsContent>

        <TabsContent value="details">
          <EmployeeDetails employeeId={selectedEmployee} />
        </TabsContent>
      </Tabs>

      {/* Employee Form Modal */}
      {showEmployeeForm && (
        <EmployeeForm 
          isOpen={showEmployeeForm}
          onClose={() => setShowEmployeeForm(false)}
        />
      )}
    </div>
  )
}
