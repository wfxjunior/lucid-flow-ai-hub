
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, Calendar, DollarSign } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
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
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const { toast } = useToast()

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target_amount: '',
    target_date: '',
    goal_type: 'savings'
  })

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('feather_budget_goals')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setGoals(data || [])
    } catch (error) {
      console.error('Error loading goals:', error)
      toast({
        title: "Error",
        description: "Failed to load savings goals",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
      const { data, error } = await supabase
        .from('feather_budget_goals')
        .insert([{
          ...newGoal,
          target_amount: parseFloat(newGoal.target_amount),
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()

      if (error) throw error

      if (data) {
        setGoals([data[0], ...goals])
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
      }
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
      const { error } = await supabase
        .from('feather_budget_goals')
        .update({ current_amount: newAmount })
        .eq('id', goalId)

      if (error) throw error

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

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>
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
