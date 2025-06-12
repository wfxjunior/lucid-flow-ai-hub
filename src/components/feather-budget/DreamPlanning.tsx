
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, Car, Home, GraduationCap, Plane, Plus } from "lucide-react"
import { formatCurrency } from "@/utils/currencyUtils"

interface Dream {
  id: string
  title: string
  description: string
  estimatedCost: number
  timeframe: string
  priority: 'high' | 'medium' | 'low'
  category: string
  icon: any
}

export function DreamPlanning() {
  const [dreams, setDreams] = useState<Dream[]>([
    {
      id: '1',
      title: 'Buy a New Car',
      description: 'Save for a reliable car for daily commuting',
      estimatedCost: 25000,
      timeframe: '2 years',
      priority: 'high',
      category: 'transportation',
      icon: Car
    },
    {
      id: '2',
      title: 'Dream Vacation to Europe',
      description: 'Two-week trip exploring Paris, Rome, and Barcelona',
      estimatedCost: 8000,
      timeframe: '1 year',
      priority: 'medium',
      category: 'travel',
      icon: Plane
    }
  ])

  const [isAddingDream, setIsAddingDream] = useState(false)
  const [newDream, setNewDream] = useState({
    title: '',
    description: '',
    estimatedCost: '',
    timeframe: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    category: 'other'
  })

  const categoryIcons: { [key: string]: any } = {
    transportation: Car,
    travel: Plane,
    home: Home,
    education: GraduationCap,
    other: Heart
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const calculateMonthlySavingsNeeded = (cost: number, timeframe: string) => {
    const months = timeframe.includes('year') 
      ? parseInt(timeframe) * 12 
      : timeframe.includes('month') 
        ? parseInt(timeframe) 
        : 12
    return cost / months
  }

  const handleAddDream = () => {
    if (!newDream.title || !newDream.estimatedCost) return

    const dream: Dream = {
      id: Date.now().toString(),
      ...newDream,
      estimatedCost: parseFloat(newDream.estimatedCost),
      icon: categoryIcons[newDream.category] || Heart
    }

    setDreams([...dreams, dream])
    setNewDream({
      title: '',
      description: '',
      estimatedCost: '',
      timeframe: '',
      priority: 'medium',
      category: 'other'
    })
    setIsAddingDream(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                Dream Planning
              </CardTitle>
              <CardDescription>Plan and save for your long-term goals and dreams</CardDescription>
            </div>
            <Button 
              onClick={() => setIsAddingDream(!isAddingDream)}
              variant={isAddingDream ? "outline" : "default"}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isAddingDream ? "Cancel" : "Add Dream"}
            </Button>
          </div>
        </CardHeader>
        
        {isAddingDream && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dream_title">Dream Title *</Label>
                <Input
                  id="dream_title"
                  value={newDream.title}
                  onChange={(e) => setNewDream({...newDream, title: e.target.value})}
                  placeholder="e.g., Buy a house, Start a business"
                />
              </div>
              <div>
                <Label htmlFor="estimated_cost">Estimated Cost *</Label>
                <Input
                  id="estimated_cost"
                  type="number"
                  step="0.01"
                  value={newDream.estimatedCost}
                  onChange={(e) => setNewDream({...newDream, estimatedCost: e.target.value})}
                  placeholder="25000.00"
                />
              </div>
              <div>
                <Label htmlFor="timeframe">Timeframe</Label>
                <Input
                  id="timeframe"
                  value={newDream.timeframe}
                  onChange={(e) => setNewDream({...newDream, timeframe: e.target.value})}
                  placeholder="e.g., 2 years, 18 months"
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select 
                  id="priority"
                  value={newDream.priority}
                  onChange={(e) => setNewDream({...newDream, priority: e.target.value as 'high' | 'medium' | 'low'})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDream.description}
                  onChange={(e) => setNewDream({...newDream, description: e.target.value})}
                  placeholder="Describe your dream and why it matters to you..."
                  rows={3}
                />
              </div>
            </div>
            <Button onClick={handleAddDream}>Add Dream</Button>
          </CardContent>
        )}
      </Card>

      {/* Dreams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dreams.map((dream) => {
          const Icon = dream.icon
          const monthlySavings = calculateMonthlySavingsNeeded(dream.estimatedCost, dream.timeframe)
          
          return (
            <Card key={dream.id} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{dream.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getPriorityColor(dream.priority)}>
                          {dream.priority} priority
                        </Badge>
                        <span className="text-sm text-muted-foreground">{dream.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{dream.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Cost:</span>
                    <span className="text-lg font-bold">{formatCurrency(dream.estimatedCost, 'USD')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Savings Needed:</span>
                    <span className="font-semibold text-primary">{formatCurrency(monthlySavings, 'USD')}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <Button variant="outline" className="w-full">
                    Create Savings Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {dreams.length === 0 && !isAddingDream && (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">No dreams yet</h3>
            <p className="text-muted-foreground mb-4">Start planning for your future goals and dreams</p>
            <Button onClick={() => setIsAddingDream(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Dream
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Dream Planning Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Be Specific</h4>
              <p className="text-sm text-muted-foreground">Set clear, measurable goals with realistic timeframes</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Break It Down</h4>
              <p className="text-sm text-muted-foreground">Divide large goals into smaller, achievable milestones</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Prioritize</h4>
              <p className="text-sm text-muted-foreground">Focus on high-priority dreams that matter most to you</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Stay Motivated</h4>
              <p className="text-sm text-muted-foreground">Visualize your dreams and celebrate small wins along the way</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
