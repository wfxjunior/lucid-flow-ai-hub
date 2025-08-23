
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Calendar, Filter } from "lucide-react"
import { RevenueSection } from "./sections/RevenueSection"
import { CustomersSection } from "./sections/CustomersSection"
import { FinanceSection } from "./sections/FinanceSection"
import { PipelineSection } from "./sections/PipelineSection"
import { UsageSection } from "./sections/UsageSection"

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [productFilter, setProductFilter] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your business performance and growth metrics
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-[120px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Analytics Sections */}
        <div className="space-y-8">
          <RevenueSection dateRange={dateRange} />
          <CustomersSection dateRange={dateRange} />
          <FinanceSection dateRange={dateRange} />
          <PipelineSection dateRange={dateRange} />
          <UsageSection dateRange={dateRange} />
        </div>
      </div>
    </div>
  )
}
