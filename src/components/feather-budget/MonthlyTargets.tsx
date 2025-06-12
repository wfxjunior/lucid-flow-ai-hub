
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, TrendingUp, DollarSign } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/utils/currencyUtils"

interface MonthlyTarget {
  id: string
  month: number
  year: number
  expense_limit: number
  savings_target: number
}

export function MonthlyTargets() {
  const [targets, setTargets] = useState<MonthlyTarget[]>([])
  const [currentExpenses, setCurrentExpenses] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSettingTarget, setIsSettingTarget] = useState(false)
  const { toast } = useToast()

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const [newTarget, setNewTarget] = useState({
    expense_limit: '',
    savings_target: ''
  })

  useEffect(() => {
    loadTargets()
    loadCurrentExpenses()
  }, [])

  const loadTargets = async () => {
    try {
      const { data, error } = await supabase
        .from('feather_budget_targets')
        .select('*')
        .order('year', { ascending: false })
        .order('month', { ascending: false })

      if (error) throw error
      setTargets(data || [])
    } catch (error) {
      console.error('Error loading targets:', error)
      toast({
        title: "Error",
        description: "Failed to load monthly targets",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadCurrentExpenses = async () => {
    try {
      const startOfMonth = new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0]
      const endOfMonth = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0]

      const { data, error } = await supabase
        .from('feather_budget_expenses')
        .select('amount')
        .gte('expense_date', startOfMonth)
        .lte('expense_date', endOfMonth)

      if (error) throw error

      const total = data?.reduce((sum, expense) => sum + expense.amount, 0) || 0
      setCurrentExpenses(total)
    } catch (error) {
      console.error('Error loading current expenses:', error)
    }
  }

  const handleSetTarget = async () => {
    if (!newTarget.expense_limit) {
      toast({
        title: "Error",
        description: "Please set an expense limit",
        variant: "destructive",
      })
      return
    }

    try {
      const { data, error } = await supabase
        .from('feather_budget_targets')
        .upsert([{
          month: currentMonth,
          year: currentYear,
          expense_limit: parseFloat(newTarget.expense_limit),
          savings_target: parseFloat(newTarget.savings_target) || 0,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()

      if (error) throw error

      loadTargets()
      setNewTarget({ expense_limit: '', savings_target: '' })
      setIsSettingTarget(false)
      toast({
        title: "Success",
        description: "Monthly target set successfully",
      })
    } catch (error) {
      console.error('Error setting target:', error)
      toast({
        title: "Error",
        description: "Failed to set monthly target",
        variant: "destructive",
      })
    }
  }

  const getCurrentTarget = () => {
    return targets.find(t => t.month === currentMonth && t.year === currentYear)
  }

  const getMonthName = (month: number) => {
    return new Date(2024, month - 1, 1).toLocaleDateString('en-US', { month: 'long' })
  }

  const calculateProgress = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100)
  }

  const currentTarget = getCurrentTarget()

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Current Month Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {getMonthName(currentMonth)} {currentYear} Targets
              </CardTitle>
              <CardDescription>Track your monthly spending limits and savings goals</CardDescription>
            </div>
            {!currentTarget && (
              <Button 
                onClick={() => setIsSettingTarget(true)}
                variant="default"
              >
                <Plus className="h-4 w-4 mr-2" />
                Set Target
              </Button>
            )}
          </div>
        </CardHeader>
        
        {currentTarget ? (
          <CardContent className="space-y-6">
            {/* Expense Limit Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Expense Limit</h4>
                <span className={`text-sm ${currentExpenses > currentTarget.expense_limit ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {formatCurrency(currentExpenses, 'USD')} / {formatCurrency(currentTarget.expense_limit, 'USD')}
                </span>
              </div>
              <Progress 
                value={calculateProgress(currentExpenses, currentTarget.expense_limit)} 
                className={currentExpenses > currentTarget.expense_limit ? 'bg-red-100' : ''}
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {Math.round(calculateProgress(currentExpenses, currentTarget.expense_limit))}% used
                </span>
                <span className={`font-medium ${currentExpenses > currentTarget.expense_limit ? 'text-red-500' : 'text-green-500'}`}>
                  {currentExpenses > currentTarget.expense_limit 
                    ? `Over by ${formatCurrency(currentExpenses - currentTarget.expense_limit, 'USD')}`
                    : `${formatCurrency(currentTarget.expense_limit - currentExpenses, 'USD')} remaining`
                  }
                </span>
              </div>
            </div>

            {/* Savings Target */}
            {currentTarget.savings_target > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Savings Target</h4>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(currentTarget.savings_target, 'USD')} goal
                  </span>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Track your progress towards saving {formatCurrency(currentTarget.savings_target, 'USD')} this month
                  </p>
                </div>
              </div>
            )}

            <Button 
              variant="outline"
              onClick={() => setIsSettingTarget(true)}
              className="w-full"
            >
              Update Target
            </Button>
          </CardContent>
        ) : isSettingTarget ? (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expense_limit">Monthly Expense Limit *</Label>
                <Input
                  id="expense_limit"
                  type="number"
                  step="0.01"
                  value={newTarget.expense_limit}
                  onChange={(e) => setNewTarget({...newTarget, expense_limit: e.target.value})}
                  placeholder="2000.00"
                />
              </div>
              <div>
                <Label htmlFor="savings_target">Savings Target (Optional)</Label>
                <Input
                  id="savings_target"
                  type="number"
                  step="0.01"
                  value={newTarget.savings_target}
                  onChange={(e) => setNewTarget({...newTarget, savings_target: e.target.value})}
                  placeholder="500.00"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSetTarget}>Set Target</Button>
              <Button variant="outline" onClick={() => setIsSettingTarget(false)}>Cancel</Button>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No target set for this month</p>
              <p className="text-sm">Set a monthly budget to track your spending</p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Previous Targets */}
      {targets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Previous Targets</CardTitle>
            <CardDescription>Your past monthly performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {targets
                .filter(t => !(t.month === currentMonth && t.year === currentYear))
                .slice(0, 6)
                .map((target) => (
                <div key={`${target.year}-${target.month}`} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{getMonthName(target.month)} {target.year}</h4>
                    <p className="text-sm text-muted-foreground">
                      Budget: {formatCurrency(target.expense_limit, 'USD')}
                      {target.savings_target > 0 && ` • Savings Goal: ${formatCurrency(target.savings_target, 'USD')}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <TrendingUp className="h-4 w-4 inline mr-1 text-green-500" />
                    <span className="text-sm text-muted-foreground">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
