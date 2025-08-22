
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, Brain } from "lucide-react"
import { ExpenseTracker } from './ExpenseTracker'
import { SavingsGoals } from './SavingsGoals'
import { BudgetInsights } from './BudgetInsights'
import { MonthlyTargets } from './MonthlyTargets'
import { DreamPlanning } from './DreamPlanning'

export function FeatherBudgetPage() {
  const [activeTab, setActiveTab] = useState('expenses')

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Personal Budget Manager</h1>
            <p className="text-muted-foreground">Smart personal finance tracking with AI insights</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">This Month</span>
              </div>
              <p className="text-2xl font-bold">$1,234.56</p>
              <p className="text-xs text-muted-foreground">Total Expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Budget Left</span>
              </div>
              <p className="text-2xl font-bold">$765.44</p>
              <p className="text-xs text-muted-foreground">38% remaining</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Savings</span>
              </div>
              <p className="text-2xl font-bold">$2,345.00</p>
              <p className="text-xs text-muted-foreground">67% of goal</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">AI Insights</span>
              </div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">New alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="targets">Targets</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="dreams">Dreams</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses">
            <ExpenseTracker />
          </TabsContent>

          <TabsContent value="goals">
            <SavingsGoals />
          </TabsContent>

          <TabsContent value="targets">
            <MonthlyTargets />
          </TabsContent>

          <TabsContent value="insights">
            <BudgetInsights />
          </TabsContent>

          <TabsContent value="dreams">
            <DreamPlanning />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
