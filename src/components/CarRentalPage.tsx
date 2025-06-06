
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Car className="h-8 w-8 text-blue-600" />
            Car Rental Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your vehicle fleet and rental operations</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vehicles" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Vehicle Registry
          </TabsTrigger>
          <TabsTrigger value="rentals" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Rental Management
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="mt-6">
          <VehicleRegistry />
        </TabsContent>

        <TabsContent value="rentals" className="mt-6">
          <RentalManagement />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <RentalReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}
