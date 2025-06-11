
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, TrendingUp, ExternalLink } from 'lucide-react'

interface TaxReportsProps {
  country: string
}

export function TaxReports({ country }: TaxReportsProps) {
  const [reportPeriod, setReportPeriod] = useState("2024")
  const [reportType, setReportType] = useState("annual")

  const reports = [
    {
      name: "Annual Tax Summary",
      period: "2024",
      type: "PDF",
      size: "2.4 MB",
      generated: "2024-01-15",
      status: "Ready"
    },
    {
      name: "Q4 Quarterly Report",
      period: "Q4 2023",
      type: "CSV",
      size: "156 KB",
      generated: "2024-01-10",
      status: "Ready"
    },
    {
      name: "TurboTax Export",
      period: "2023",
      type: "TXF",
      size: "89 KB",
      generated: "2024-01-08",
      status: "Ready"
    }
  ]

  const exportFormats = [
    {
      name: "TurboTax (TXF)",
      description: "Compatible with TurboTax software",
      icon: FileText,
      popular: true
    },
    {
      name: "QuickBooks (QBX)",
      description: "Import directly into QuickBooks",
      icon: FileText,
      popular: true
    },
    {
      name: "Xero (CSV)",
      description: "Compatible with Xero accounting",
      icon: FileText,
      popular: false
    },
    {
      name: "Excel/CSV",
      description: "Standard spreadsheet format",
      icon: FileText,
      popular: false
    }
  ]

  return (
    <div className="space-y-6">
      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Tax Reports</CardTitle>
          <CardDescription>
            Create comprehensive tax reports for your business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="quarterly">Quarterly Report</SelectItem>
                <SelectItem value="annual">Annual Report</SelectItem>
                <SelectItem value="custom">Custom Period</SelectItem>
              </SelectContent>
            </Select>

            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="Q4-2023">Q4 2023</SelectItem>
                <SelectItem value="Q3-2023">Q3 2023</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Report Will Include:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Income summary by category</li>
              <li>• Deductible expenses breakdown</li>
              <li>• Tax liability calculations (based on {country} tax rules)</li>
              <li>• Supporting transaction details</li>
              <li>• Form-ready summaries</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export to Tax Software</CardTitle>
          <CardDescription>
            Export your data to popular tax preparation software
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {exportFormats.map((format, index) => (
              <div
                key={index}
                className="relative p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                {format.popular && (
                  <Badge className="absolute -top-2 -right-2">Popular</Badge>
                )}
                <div className="flex items-start gap-3">
                  <format.icon className="h-8 w-8 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium">{format.name}</h4>
                    <p className="text-sm text-gray-600">{format.description}</p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Previous Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Reports</CardTitle>
          <CardDescription>
            Access and download previously generated reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-gray-600">
                      {report.period} • {report.type} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{report.status}</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Year Summary</CardTitle>
          <CardDescription>
            Overview of your tax situation for {reportPeriod}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-800">$125,400</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-600">Deductions</p>
              <p className="text-2xl font-bold text-blue-800">$7,200</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-orange-600">Taxable Income</p>
              <p className="text-2xl font-bold text-orange-800">$118,200</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <ExternalLink className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-red-600">Est. Tax Owed</p>
              <p className="text-2xl font-bold text-red-800">$23,640</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
