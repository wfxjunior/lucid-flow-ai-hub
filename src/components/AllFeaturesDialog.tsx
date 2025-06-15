
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Grid, List } from "lucide-react"

// Todas as features disponíveis na plataforma
const allFeatures = [
  // Main Features
  { name: "Dashboard", category: "Main", description: "Central hub for business overview" },
  { name: "AI Voice", category: "Main", description: "Voice assistant for automation" },
  { name: "Create Invoice", category: "Main", description: "Generate professional invoices" },
  { name: "Estimates", category: "Main", description: "Create project estimates" },
  { name: "Payments", category: "Main", description: "Track and manage payments" },
  { name: "E-Signatures", category: "Main", description: "Digital signature solution" },

  // Core Business
  { name: "Customer Management", category: "Core Business", description: "Manage client relationships" },
  { name: "Projects", category: "Core Business", description: "Project management tools" },
  { name: "Project Timeline", category: "Core Business", description: "Timeline view of projects" },
  { name: "Pipeline", category: "Core Business", description: "Sales pipeline management" },
  { name: "Smart Schedule", category: "Core Business", description: "Intelligent scheduling" },

  // Financial Tools
  { name: "FeatherBudget", category: "Financial", description: "Budget management tool" },
  { name: "FeatherTax", category: "Financial", description: "Tax calculation and filing" },
  { name: "EasyCalc", category: "Financial", description: "Financial calculator" },
  { name: "Accounting", category: "Financial", description: "Complete accounting suite" },
  { name: "Quotes", category: "Financial", description: "Generate price quotes" },

  // Operations
  { name: "Car Rental", category: "Operations", description: "Vehicle rental management" },
  { name: "Work Orders", category: "Operations", description: "Service work orders" },
  { name: "MatTrack", category: "Operations", description: "Material tracking system" },
  { name: "Crew Control", category: "Operations", description: "Team management" },
  { name: "EarnSync", category: "Operations", description: "Earnings synchronization" },
  { name: "AfterCare", category: "Operations", description: "Post-service care" },

  // Documents & Forms
  { name: "FeatherForms", category: "Documents", description: "Custom form builder" },
  { name: "Sales Orders", category: "Documents", description: "Sales order management" },
  { name: "Business Proposals", category: "Documents", description: "Professional proposals" },
  { name: "Bids", category: "Documents", description: "Bidding system" },
  { name: "Contracts", category: "Documents", description: "Contract management" },

  // Productivity
  { name: "Meetings", category: "Productivity", description: "Meeting scheduler" },
  { name: "Todo List", category: "Productivity", description: "Task management" },
  { name: "Notes", category: "Productivity", description: "Note-taking system" },

  // Communication
  { name: "Messages", category: "Communication", description: "Client messaging" },
  { name: "Email Settings", category: "Communication", description: "Email configuration" },

  // Analytics
  { name: "Analytics", category: "Analytics", description: "Business analytics dashboard" },
  { name: "Admin Panel", category: "Analytics", description: "Administrative controls" },

  // General
  { name: "Careers", category: "General", description: "Career opportunities" },
  { name: "Appointments", category: "General", description: "Appointment scheduling" },
  { name: "Referrals", category: "General", description: "Referral program" },
  { name: "Features", category: "General", description: "Feature request system" },
  { name: "FAQ & Help", category: "General", description: "Help center" },
  { name: "Feedback", category: "General", description: "Feedback collection" },
  { name: "Pricing", category: "General", description: "Pricing plans" },
  { name: "Settings", category: "General", description: "Platform settings" },
]

interface AllFeaturesDialogProps {
  trigger?: React.ReactNode
}

export function AllFeaturesDialog({ trigger }: AllFeaturesDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(allFeatures.map(f => f.category)))]

  const filteredFeatures = allFeatures.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || feature.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuresByCategory = categories.reduce((acc, category) => {
    if (category === "all") return acc
    acc[category] = filteredFeatures.filter(f => f.category === category)
    return acc
  }, {} as Record<string, typeof allFeatures>)

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Grid className="h-4 w-4" />
            View All Features
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Grid className="h-5 w-5" />
            All Platform Features
          </DialogTitle>
          <DialogDescription>
            Explore all the features available in FeatherBiz
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Features Display */}
          <ScrollArea className="h-[400px]">
            {selectedCategory === "all" ? (
              <div className="space-y-6">
                {Object.entries(featuresByCategory).map(([category, features]) => (
                  features.length > 0 && (
                    <div key={category}>
                      <h3 className="font-semibold text-lg mb-3 text-blue-600">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {features.map(feature => (
                          <div key={feature.name} className="p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{feature.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {feature.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredFeatures.map(feature => (
                  <div key={feature.name} className="p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{feature.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {feature.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Summary */}
          <div className="text-center text-sm text-muted-foreground border-t pt-4">
            <p>Total: {filteredFeatures.length} features found</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
