
import React, { useState } from 'react'
import { Target, Save, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export function GoalsSettings() {
  const { toast } = useToast()
  const [goals, setGoals] = useState({
    weeklyTarget: 500.00,
    monthlyTarget: 2000.00
  })

  const [formData, setFormData] = useState({
    weeklyTarget: goals.weeklyTarget.toString(),
    monthlyTarget: goals.monthlyTarget.toString()
  })

  // Mock current earnings data
  const currentEarnings = {
    thisWeek: 425.00,
    thisMonth: 1360.00
  }

  const weeklyProgress = Math.min((currentEarnings.thisWeek / goals.weeklyTarget) * 100, 100)
  const monthlyProgress = Math.min((currentEarnings.thisMonth / goals.monthlyTarget) * 100, 100)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedGoals = {
      weeklyTarget: parseFloat(formData.weeklyTarget),
      monthlyTarget: parseFloat(formData.monthlyTarget)
    }
    setGoals(updatedGoals)
    toast({
      title: "Goals Updated",
      description: "Your financial goals have been successfully updated.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Current Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Weekly Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current: ${currentEarnings.thisWeek}</span>
              <span className="text-sm text-gray-600">Target: ${goals.weeklyTarget}</span>
            </div>
            <Progress value={weeklyProgress} className="h-3" />
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{weeklyProgress.toFixed(1)}% Complete</span>
              <span className="text-sm text-gray-600">
                ${(goals.weeklyTarget - currentEarnings.thisWeek).toFixed(2)} remaining
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Monthly Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current: ${currentEarnings.thisMonth}</span>
              <span className="text-sm text-gray-600">Target: ${goals.monthlyTarget}</span>
            </div>
            <Progress value={monthlyProgress} className="h-3" />
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{monthlyProgress.toFixed(1)}% Complete</span>
              <span className="text-sm text-gray-600">
                ${(goals.monthlyTarget - currentEarnings.thisMonth).toFixed(2)} remaining
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Settings Form */}
      <Card>
        <CardHeader>
          <CardTitle>Update Financial Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="weeklyTarget">Weekly Target ($)</Label>
                <Input
                  id="weeklyTarget"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.weeklyTarget}
                  onChange={(e) => setFormData({ ...formData, weeklyTarget: e.target.value })}
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Set your weekly earning goal
                </p>
              </div>

              <div>
                <Label htmlFor="monthlyTarget">Monthly Target ($)</Label>
                <Input
                  id="monthlyTarget"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.monthlyTarget}
                  onChange={(e) => setFormData({ ...formData, monthlyTarget: e.target.value })}
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Set your monthly earning goal
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Goals
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setFormData({
                  weeklyTarget: goals.weeklyTarget.toString(),
                  monthlyTarget: goals.monthlyTarget.toString()
                })}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Goal Achievement Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Achievement Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Weekly Success Strategy</h4>
              <p className="text-sm text-blue-700">
                Break down your weekly goal into daily targets. Aim for ${(goals.weeklyTarget / 5).toFixed(2)} per workday.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Monthly Planning</h4>
              <p className="text-sm text-green-700">
                Plan for approximately {Math.ceil(goals.monthlyTarget / (goals.weeklyTarget || 1))} weeks of consistent earnings to reach your monthly goal.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
