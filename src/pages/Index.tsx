
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BusinessDashboard } from "@/components/BusinessDashboard"
import { TodoListPage } from "@/components/TodoListPage"
import { NotesPage } from "@/components/NotesPage"
import { DocumentTracker } from "@/components/DocumentTracker"
import { CarRentalPage } from "@/components/CarRentalPage"
import { UserGreeting } from "@/components/UserGreeting"
import { 
  BarChart3, 
  CheckSquare, 
  StickyNote, 
  FileText, 
  Car,
  Home
} from "lucide-react"

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">FeatherBiz</h1>
            </div>
            <div className="flex items-center gap-4">
              <UserGreeting />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="todos" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              To-Do List
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <StickyNote className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="car-rental" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Car Rental
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <BusinessDashboard />
          </TabsContent>

          <TabsContent value="todos">
            <TodoListPage />
          </TabsContent>

          <TabsContent value="notes">
            <NotesPage />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentTracker />
          </TabsContent>

          <TabsContent value="car-rental">
            <CarRentalPage />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Index
