
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
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">CrewControl</h1>
            <p className="text-sm sm:text-base text-gray-600">Complete Employee Management System</p>
          </div>
          <Button 
            onClick={() => setShowEmployeeForm(true)}
            size="lg"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 h-12 sm:h-14 px-6 sm:px-8 text-base font-medium"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            Add Employee
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-blue-600 text-xs sm:text-sm font-medium">Total Employees</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900">{statsData.totalEmployees}</p>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-green-600 text-xs sm:text-sm font-medium">Active Today</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-900">{statsData.activeToday}</p>
                </div>
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-purple-600 text-xs sm:text-sm font-medium">Hours Today</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-900">{statsData.totalHoursToday}</p>
                </div>
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-yellow-600 text-xs sm:text-sm font-medium">Today's Payroll</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-900">${statsData.todayPayroll}</p>
                </div>
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="w-full">
          <Input
            placeholder="Search employees by name, position, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 sm:h-14 text-base px-4 sm:px-6"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-12 sm:h-14 p-1 bg-white border">
              <TabsTrigger 
                value="overview" 
                className="h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm lg:text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="employees" 
                className="h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm lg:text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Employees
              </TabsTrigger>
              <TabsTrigger 
                value="tracking" 
                className="h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm lg:text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <span className="hidden sm:inline">Time Tracking</span>
                <span className="sm:hidden">Tracking</span>
              </TabsTrigger>
              <TabsTrigger 
                value="payroll" 
                className="h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm lg:text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Payroll
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm lg:text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="h-10 sm:h-12 px-2 sm:px-4 text-xs sm:text-sm lg:text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Details
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
    </div>
  )
}
