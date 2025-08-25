
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DollarSign, TrendingUp, PieChart, Calculator } from 'lucide-react'

export function FinancialTools() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">Financial Tools</h1>
        <p className="text-sm text-gray-500 mt-1">Manage finances and track profitability</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <Button variant="ghost" className="border-b-2 border-gray-900 pb-2">Overview</Button>
          <Button variant="ghost" className="pb-2">Cash Flow</Button>
          <Button variant="ghost" className="pb-2">Expenses</Button>
          <Button variant="ghost" className="pb-2">Invoices</Button>
        </nav>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-medium text-gray-900">$156,420</p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Profit Margin</p>
              <p className="text-2xl font-medium text-gray-900">28.5%</p>
              <p className="text-xs text-blue-600">+2.1% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <PieChart className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Outstanding</p>
              <p className="text-2xl font-medium text-gray-900">$23,150</p>
              <p className="text-xs text-gray-500">5 pending invoices</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calculator className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Quick Calculator</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">Calculate margins, markups, and project costs</p>
          <Button>Open Calculator</Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Johnson Payment</p>
                <p className="text-xs text-gray-500">Jan 10, 2025</p>
              </div>
              <span className="text-sm font-medium text-green-600">+$5,200</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Material Purchase</p>
                <p className="text-xs text-gray-500">Jan 8, 2025</p>
              </div>
              <span className="text-sm font-medium text-red-600">-$1,850</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
