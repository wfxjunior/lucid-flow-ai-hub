
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Plus, FileText, BarChart3 } from 'lucide-react'
import { VehicleRegistry } from './car-rental/VehicleRegistry'
import { RentalManagement } from './car-rental/RentalManagement'
import { RentalReports } from './car-rental/RentalReports'
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"

export function CarRentalPage() {
  const [activeTab, setActiveTab] = useState("vehicles")

  const metrics = [
    {
      title: "Total Vehicles",
      value: "15",
      subtitle: "Fleet size",
      icon: Car
    },
    {
      title: "Active Rentals",
      value: "8",
      subtitle: "Currently rented",
      icon: FileText
    },
    {
      title: "Available",
      value: "7",
      subtitle: "Ready to rent",
      icon: Car
    },
    {
      title: "Revenue Today",
      value: "$1,250",
      subtitle: "Daily earnings",
      icon: BarChart3
    }
  ]

  return (
    <CleanPageLayout
      title="Car Rental Management"
      subtitle="Manage your vehicle fleet and rental operations"
      actionLabel="Add Vehicle"
      onActionClick={() => {}}
      metrics={metrics}
    >

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
    </CleanPageLayout>
  )
}
