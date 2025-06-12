
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, Calendar, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/utils/currencyUtils"

interface Goal {
  id: string
  title: string
  description?: string
  target_amount: number
  current_amount: number
  target_date?: string
  goal_type: string
  status: string
}

export function SavingsGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      description: 'Build a 6-month emergency fund',
      target_amount: 10000,
      current_amount: 6700,
      target_date: '2024-12-31',
      goal_type: 'savings',
      status: 'active'
    },
    {
      id: '2',
      title: 'New Car',
      description: 'Save for a reliable vehicle',
      target_amount: 25000,
      current_amount: 8500,
      target_date: '2025-06-30',
      goal_type: 'purchase',
      status: 'active'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const { toast } = useToast()

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target_amount: '',
    target_date: '',
    goal_type: 'savings'
  })

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.target_amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        target_amount: parseFloat(newGoal.target_amount),
        current_amount: 0,
        target_date: newGoal.target_date,
        goal_type: newGoal.goal_type,
        status: 'active'
      }

      setGoals([goal, ...goals])
      setNewGoal({
        title: '',
        description: '',
        target_amount: '',
        target_date: '',
        goal_type: 'savings'
      })
      setIsAddingGoal(false)
      toast({
        title: "Success",
        description: "Savings goal created successfully",
      })
    } catch (error) {
      console.error('Error adding goal:', error)
      toast({
        title: "Error",
        description: "Failed to create savings goal",
        variant: "destructive",
      })
    }
  }

  const updateGoalProgress = async (goalId: string, amount: number) => {
    try {
      const goal = goals.find(g => g.id === goalId)
      if (!goal) return

      const newAmount = goal.current_amount + amount
      setGoals(goals.map(g => 
        g.id === goalId 
          ? { ...g, current_amount: newAmount }
          : g
      ))

      toast({
        title: "Success",
        description: "Goal progress updated",
      })
    } catch (error) {
      console.error('Error updating goal:', error)
      toast({
        title: "Error",
        description: "Failed to update goal",
        variant: "destructive",
      })
    }
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getStatusBadge = (current: number, target: number, status: string) => {
    if (current >= target) return <Badge className="bg-green-500">Completed</Badge>
    if (status === 'paused') return <Badge variant="secondary">Paused</Badge>
    return <Badge variant="outline">In Progress</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Add Goal Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Define and track your financial goals and dreams</CardDescription>
            </div>
            <Button 
              onClick={() => setIsAddingGoal(!isAddingGoal)}
              variant={isAddingGoal ? "outline" : "default"}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isAddingGoal ? "Cancel" : "Add Goal"}
            </Button>
          </div>
        </CardHeader>
        
        {isAddingGoal && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Goal Title *</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  placeholder="e.g., Buy a car, Emergency fund"
                />
              </div>
              <div>
                <Label htmlFor="target_amount">Target Amount *</Label>
                <Input
                  id="target_amount"
                  type="number"
                  step="0.01"
                  value={newGoal.target_amount}
                  onChange={(e) => setNewGoal({...newGoal, target_amount: e.target.value})}
                  placeholder="5000.00"
                />
              </div>
              <div>
                <Label htmlFor="target_date">Target Date</Label>
                <Input
                  id="target_date"
                  type="date"
                  value={newGoal.target_date}
                  onChange={(e) => setNewGoal({...newGoal, target_date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder="Optional details about your goal"
                />
              </div>
            </div>
            <Button onClick={handleAddGoal}>Create Goal</Button>
          </CardContent>
        )}
      </Card>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-8 text-muted-foreground">
              No savings goals yet. Create your first goal to start tracking your progress!
            </CardContent>
          </Card>
        ) : (
          goals.map((goal) => (
            <Card key={goal.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  {getStatusBadge(goal.current_amount, goal.target_amount, goal.status)}
                </div>
                {goal.description && (
                  <CardDescription>{goal.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{formatCurrency(goal.current_amount, 'USD')}</span>
                    <span>{formatCurrency(goal.target_amount, 'USD')}</span>
                  </div>
                  <Progress value={getProgressPercentage(goal.current_amount, goal.target_amount)} />
                  <div className="text-center text-sm text-muted-foreground">
                    {Math.round(getProgressPercentage(goal.current_amount, goal.target_amount))}% complete
                  </div>
                </div>

                {goal.target_date && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Target: {new Date(goal.target_date).toLocaleDateString()}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => updateGoalProgress(goal.id, 100)}
                    className="flex-1"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Add $100
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateGoalProgress(goal.id, 50)}
                    className="flex-1"
                  >
                    Add $50
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
