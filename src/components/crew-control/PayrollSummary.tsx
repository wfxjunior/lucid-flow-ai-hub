
import React from 'react'
import { DollarSign, TrendingUp, Calendar, FileText, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PayrollEntry {
  employeeId: string
  employeeName: string
  position: string
  hoursWorked: number
  hourlyRate: number
  regularPay: number
  overtimePay: number
  extraCosts: number
  totalPay: number
  paidAmount: number
  status: 'pending' | 'paid' | 'partial'
}

interface PayrollSummaryProps {
  expanded?: boolean
}

export function PayrollSummary({ expanded = false }: PayrollSummaryProps) {
  // Mock data for demonstration
  const payrollData: PayrollEntry[] = [
    {
      employeeId: '1',
      employeeName: 'John Smith',
      position: 'Electrician',
      hoursWorked: 42,
      hourlyRate: 28.50,
      regularPay: 1140.00,
      overtimePay: 85.50,
      extraCosts: 50.00,
      totalPay: 1275.50,
      paidAmount: 1275.50,
      status: 'paid'
    },
    {
      employeeId: '2',
      employeeName: 'Maria Rodriguez',
      position: 'Plumber',
      hoursWorked: 40,
      hourlyRate: 25.00,
      regularPay: 1000.00,
      overtimePay: 0,
      extraCosts: 25.00,
      totalPay: 1025.00,
      paidAmount: 500.00,
      status: 'partial'
    },
    {
      employeeId: '3',
      employeeName: 'David Johnson',
      position: 'HVAC Technician',
      hoursWorked: 38,
      hourlyRate: 30.00,
      regularPay: 1140.00,
      overtimePay: 0,
      extraCosts: 0,
      totalPay: 1140.00,
      paidAmount: 0,
      status: 'pending'
    }
  ]

  const totalPayroll = payrollData.reduce((sum, entry) => sum + entry.totalPay, 0)
  const totalPaid = payrollData.reduce((sum, entry) => sum + entry.paidAmount, 0)
  const totalPending = totalPayroll - totalPaid

  const getStatusColor = (status: PayrollEntry['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'partial': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentProgress = (paid: number, total: number) => {
    return Math.round((paid / total) * 100)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Payroll Summary
            <Badge variant="secondary">This Week</Badge>
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Generate Reports
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Payroll</p>
                <p className="text-2xl font-bold text-blue-900">${totalPayroll.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Paid Out</p>
                <p className="text-2xl font-bold text-green-900">${totalPaid.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Pending</p>
                <p className="text-2xl font-bold text-red-900">${totalPending.toFixed(2)}</p>
              </div>
              <Calendar className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Detailed Payroll */}
        <div className="space-y-4">
          <h4 className="font-medium">Employee Breakdown</h4>
          {payrollData.map((entry) => (
            <div key={entry.employeeId} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-medium">{entry.employeeName}</h5>
                  <p className="text-sm text-gray-600">{entry.position}</p>
                  <Badge className={getStatusColor(entry.status)} variant="secondary">
                    {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="font-medium">${entry.totalPay.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{entry.hoursWorked}h @ ${entry.hourlyRate}/hr</p>
                </div>
              </div>

              {expanded && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-600">Regular Pay</p>
                    <p className="font-medium">${entry.regularPay.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Overtime</p>
                    <p className="font-medium">${entry.overtimePay.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Extra Costs</p>
                    <p className="font-medium">${entry.extraCosts.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Paid</p>
                    <p className="font-medium">${entry.paidAmount.toFixed(2)}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Payment Progress</span>
                  <span>{getPaymentProgress(entry.paidAmount, entry.totalPay)}%</span>
                </div>
                <Progress 
                  value={getPaymentProgress(entry.paidAmount, entry.totalPay)}
                  className="h-2"
                />
              </div>

              {entry.status !== 'paid' && (
                <div className="mt-3 pt-3 border-t">
                  <Button size="sm" className="w-full">
                    Mark as Paid
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
