
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Plus, FileText, BarChart3 } from 'lucide-react'
import { VehicleRegistry } from './car-rental/VehicleRegistry'
import { RentalManagement } from './car-rental/RentalManagement'
import { RentalReports } from './car-rental/RentalReports'

export function CarRentalPage() {
  const [activeTab, setActiveTab] = useState("vehicles")

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Car className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            Car Rental Management
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Manage your vehicle fleet and rental operations</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="vehicles" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 text-xs sm:text-sm">
            <Car className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Vehicle Registry</span>
            <span className="sm:hidden">Vehicles</span>
          </TabsTrigger>
          <TabsTrigger value="rentals" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 text-xs sm:text-sm">
            <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Rental Management</span>
            <span className="sm:hidden">Rentals</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 text-xs sm:text-sm">
            <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Reports</span>
            <span className="sm:hidden">Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="mt-4 md:mt-6">
          <VehicleRegistry />
        </TabsContent>

        <TabsContent value="rentals" className="mt-4 md:mt-6">
          <RentalManagement />
        </TabsContent>

        <TabsContent value="reports" className="mt-4 md:mt-6">
          <RentalReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}
