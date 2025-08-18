
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Calculator, FileText, Download, Mail, AlertCircle, TrendingUp, DollarSign } from 'lucide-react'
import { TaxTransactions } from '@/components/tax/TaxTransactions'
import { TaxReports } from '@/components/tax/TaxReports'
import { TaxDeadlines } from '@/components/tax/TaxDeadlines'
import { TaxSettings } from '@/components/tax/TaxSettings'
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"

export function FeatherTaxPage() {
  const [selectedCountry, setSelectedCountry] = useState("US")
  const [activeTab, setActiveTab] = useState("overview")

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" }
  ]

  const upcomingDeadlines = [
    { date: "2024-01-15", description: "Q4 Estimated Tax Payment", priority: "high" },
    { date: "2024-03-15", description: "Corporate Tax Return", priority: "medium" },
    { date: "2024-04-15", description: "Personal Tax Return", priority: "high" }
  ]

  return (
    <CleanPageLayout
      title="FeatherTax"
      subtitle="Comprehensive tax management and reporting system"
      actionLabel="Generate Report"
      onActionClick={() => {}}
    >

      {/* Country Selector */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.flag} {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Upcoming Deadlines Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertCircle className="h-5 w-5" />
            Upcoming Tax Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {upcomingDeadlines.slice(0, 2).map((deadline, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-800">{deadline.description}</p>
                  <p className="text-sm text-orange-600">{deadline.date}</p>
                </div>
                <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}>
                  {deadline.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <TaxDeadlines country={selectedCountry} />
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tax-related tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Tax Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export to TurboTax
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export to QuickBooks
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Setup Deadline Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <TaxTransactions country={selectedCountry} />
        </TabsContent>

        <TabsContent value="reports">
          <TaxReports country={selectedCountry} />
        </TabsContent>

        <TabsContent value="settings">
          <TaxSettings country={selectedCountry} onCountryChange={setSelectedCountry} />
        </TabsContent>
      </Tabs>
    </CleanPageLayout>
  )
}
