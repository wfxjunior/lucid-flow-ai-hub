
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">EarnSync</h1>
          <p className="text-gray-600 mt-1">Track earnings, expenses, and reach your financial goals</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowEarningsForm(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Job
          </Button>
          <Button 
            onClick={() => setShowExpenseForm(true)}
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log Expense
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Earned</p>
                <p className="text-2xl font-bold text-green-900">${summaryData.totalEarned}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Total Expenses</p>
                <p className="text-2xl font-bold text-red-900">${summaryData.totalExpenses}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Net Profit</p>
                <p className="text-2xl font-bold text-blue-900">${summaryData.netProfit}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Target Progress</p>
                <p className="text-2xl font-bold text-purple-900">{summaryData.monthlyProgress}%</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Weekly Goal Progress</h3>
                <Badge variant="secondary">${summaryData.weeklyTarget}</Badge>
              </div>
              <Progress value={summaryData.weeklyProgress} className="h-3" />
              <p className="text-sm text-gray-600">{summaryData.weeklyProgress}% of weekly target reached</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Monthly Goal Progress</h3>
                <Badge variant="secondary">${summaryData.monthlyTarget}</Badge>
              </div>
              <Progress value={summaryData.monthlyProgress} className="h-3" />
              <p className="text-sm text-gray-600">{summaryData.monthlyProgress}% of monthly target reached</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

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
