
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Insight {
  id: string
  insight_type: string
  title: string
  message: string
  severity: string
  is_read: boolean
  created_at: string
}

export function BudgetInsights() {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      insight_type: 'spending_alert',
      title: 'Food Spending Alert',
      message: "You've spent 30% more on food this week compared to last week. Consider meal planning to reduce costs.",
      severity: 'warning',
      is_read: false,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      insight_type: 'savings_tip',
      title: 'Savings Opportunity',
      message: 'Your entertainment expenses could be reduced by $150/month. This would help you reach your car savings goal 2 months earlier!',
      severity: 'info',
      is_read: false,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      insight_type: 'goal_progress',
      title: 'Goal Achievement',
      message: "Great job! You're 67% towards your emergency fund goal. Keep up the momentum!",
      severity: 'success',
      is_read: true,
      created_at: new Date().toISOString()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const markAsRead = async (insightId: string) => {
    try {
      setInsights(insights.map(insight => 
        insight.id === insightId 
          ? { ...insight, is_read: true }
          : insight
      ))
    } catch (error) {
      console.error('Error marking insight as read:', error)
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <TrendingDown className="h-5 w-5 text-red-500" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-blue-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'warning':
        return <Badge variant="destructive">Alert</Badge>
      case 'error':
        return <Badge variant="destructive">Critical</Badge>
      case 'success':
        return <Badge className="bg-green-500">Good News</Badge>
      default:
        return <Badge variant="outline">Tip</Badge>
    }
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-purple-500" />
            <div>
              <CardTitle>AI Financial Insights</CardTitle>
              <CardDescription>Smart analysis of your spending patterns and personalized recommendations</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-4 text-purple-300" />
              <p>AI is analyzing your spending patterns...</p>
              <p className="text-sm">Check back after adding some expenses to see personalized insights!</p>
            </CardContent>
          </Card>
        ) : (
          insights.map((insight) => (
            <Card key={insight.id} className={`${!insight.is_read ? 'border-l-4 border-l-purple-500' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(insight.severity)}
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getSeverityBadge(insight.severity)}
                        <span className="text-sm text-muted-foreground">
                          {new Date(insight.created_at).toLocaleDateString()}
                        </span>
                        {!insight.is_read && (
                          <Badge variant="secondary">New</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {!insight.is_read && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => markAsRead(insight.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{insight.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* AI Features Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI-Powered Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Smart Alerts</h4>
              <p className="text-sm text-muted-foreground">Get notified when spending patterns change or budgets are exceeded</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Savings Recommendations</h4>
              <p className="text-sm text-muted-foreground">Receive personalized tips to optimize your spending and reach goals faster</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Trend Analysis</h4>
              <p className="text-sm text-muted-foreground">Understand your spending patterns with weekly and monthly comparisons</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Goal Optimization</h4>
              <p className="text-sm text-muted-foreground">Get insights on how to adjust spending to reach your financial goals</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
