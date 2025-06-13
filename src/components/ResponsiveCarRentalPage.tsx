
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Car, Plus, Calendar, Users, FileText, BarChart3 } from "lucide-react"
import { VehicleRegistry } from "./car-rental/VehicleRegistry"
import { RentalManagement } from "./car-rental/RentalManagement"
import { RentalDocuments } from "./car-rental/RentalDocuments"
import { RentalReports } from "./car-rental/RentalReports"

export function ResponsiveCarRentalPage() {
  const [activeTab, setActiveTab] = useState('vehicles')

  const stats = [
    {
      title: "Total Vehicles",
      value: "12",
      icon: Car,
      color: "text-blue-500"
    },
    {
      title: "Active Rentals",
      value: "8",
      icon: Calendar,
      color: "text-green-500"
    },
    {
      title: "Total Customers",
      value: "45",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Revenue",
      value: "$15,420",
      icon: BarChart3,
      color: "text-orange-500"
    }
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Car className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Car Rental</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Manage your vehicle rental business</p>
            </div>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Vehicle</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                      {stat.title}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-4 min-w-[400px]">
              <TabsTrigger value="vehicles" className="text-xs sm:text-sm">
                <Car className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Vehicles</span>
                <span className="sm:hidden">Cars</span>
              </TabsTrigger>
              <TabsTrigger value="rentals" className="text-xs sm:text-sm">
                <Calendar className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Rentals</span>
                <span className="sm:hidden">Active</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-xs sm:text-sm">
                <FileText className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Documents</span>
                <span className="sm:hidden">Docs</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-xs sm:text-sm">
                <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Reports</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="vehicles">
            <VehicleRegistry />
          </TabsContent>

          <TabsContent value="rentals">
            <RentalManagement />
          </TabsContent>

          <TabsContent value="documents">
            <RentalDocuments />
          </TabsContent>

          <TabsContent value="reports">
            <RentalReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
