
import React, { useState } from 'react'
import { Plus, DollarSign, TrendingUp, TrendingDown, Target, Calendar, FileText, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CompanyRegistration } from './earnsync/CompanyRegistration'
import { EarningsLog } from './earnsync/EarningsLog'
import { ExpensesLog } from './earnsync/ExpensesLog'
import { GoalsSettings } from './earnsync/GoalsSettings'
import { ReportsExport } from './earnsync/ReportsExport'
import { EarnSyncDashboard } from './earnsync/EarnSyncDashboard'

export function EarnSyncPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showCompanyForm, setShowCompanyForm] = useState(false)
  const [showEarningsForm, setShowEarningsForm] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  // Mock data for demonstration
  const summaryData = {
    totalEarned: 2450.00,
    totalExpenses: 380.50,
    netProfit: 2069.50,
    weeklyTarget: 500.00,
    monthlyTarget: 2000.00,
    weeklyProgress: 85,
    monthlyProgress: 68
  }

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">EarnSync</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Track earnings, expenses, and reach your financial goals</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={() => setShowEarningsForm(true)}
            className="bg-green-600 hover:bg-green-700 text-sm md:text-base"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Job
          </Button>
          <Button 
            onClick={() => setShowExpenseForm(true)}
            variant="outline"
            size="sm"
            className="text-sm md:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log Expense
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-xs md:text-sm font-medium">Total Earned</p>
                <p className="text-xl md:text-2xl font-bold text-green-900">${summaryData.totalEarned}</p>
              </div>
              <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-xs md:text-sm font-medium">Total Expenses</p>
                <p className="text-xl md:text-2xl font-bold text-red-900">${summaryData.totalExpenses}</p>
              </div>
              <TrendingDown className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-xs md:text-sm font-medium">Net Profit</p>
                <p className="text-xl md:text-2xl font-bold text-blue-900">${summaryData.netProfit}</p>
              </div>
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-xs md:text-sm font-medium">Target Progress</p>
                <p className="text-xl md:text-2xl font-bold text-purple-900">{summaryData.monthlyProgress}%</p>
              </div>
              <Target className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-medium text-sm md:text-base">Weekly Goal Progress</h3>
                <Badge variant="secondary" className="text-xs w-fit">${summaryData.weeklyTarget}</Badge>
              </div>
              <Progress value={summaryData.weeklyProgress} className="h-2 md:h-3" />
              <p className="text-xs md:text-sm text-gray-600">{summaryData.weeklyProgress}% of weekly target reached</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-medium text-sm md:text-base">Monthly Goal Progress</h3>
                <Badge variant="secondary" className="text-xs w-fit">${summaryData.monthlyTarget}</Badge>
              </div>
              <Progress value={summaryData.monthlyProgress} className="h-2 md:h-3" />
              <p className="text-xs md:text-sm text-gray-600">{summaryData.monthlyProgress}% of monthly target reached</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 min-w-max md:min-w-0">
            <TabsTrigger value="dashboard" className="text-xs md:text-sm px-2 md:px-4">Dashboard</TabsTrigger>
            <TabsTrigger value="companies" className="text-xs md:text-sm px-2 md:px-4">Companies</TabsTrigger>
            <TabsTrigger value="earnings" className="text-xs md:text-sm px-2 md:px-4">Earnings</TabsTrigger>
            <TabsTrigger value="expenses" className="text-xs md:text-sm px-2 md:px-4">Expenses</TabsTrigger>
            <TabsTrigger value="goals" className="text-xs md:text-sm px-2 md:px-4">Goals</TabsTrigger>
            <TabsTrigger value="reports" className="text-xs md:text-sm px-2 md:px-4">Reports</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <EarnSyncDashboard />
        </TabsContent>

        <TabsContent value="companies">
          <CompanyRegistration />
        </TabsContent>

        <TabsContent value="earnings">
          <EarningsLog />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpensesLog />
        </TabsContent>

        <TabsContent value="goals">
          <GoalsSettings />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsExport />
        </TabsContent>
      </Tabs>

      {/* Modals would be handled by the individual components */}
    </div>
  )
}
