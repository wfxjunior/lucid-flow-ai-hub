
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Bell, AlertCircle, CheckCircle } from 'lucide-react'

interface TaxDeadlinesProps {
  country: string
}

export function TaxDeadlines({ country }: TaxDeadlinesProps) {
  const getDeadlinesByCountry = (countryCode: string) => {
    const deadlines = {
      US: [
        {
          date: "2024-01-15",
          title: "Q4 Estimated Tax Payment",
          description: "Fourth quarter estimated tax payment due",
          priority: "high",
          daysUntil: 5,
          completed: false
        },
        {
          date: "2024-03-15",
          title: "Corporate Tax Return (Form 1120)",
          description: "Corporate income tax return due",
          priority: "medium",
          daysUntil: 64,
          completed: false
        },
        {
          date: "2024-04-15",
          title: "Individual Tax Return",
          description: "Form 1040 due for individual taxpayers",
          priority: "high",
          daysUntil: 95,
          completed: false
        },
        {
          date: "2024-04-15",
          title: "Q1 Estimated Tax Payment",
          description: "First quarter estimated tax payment due",
          priority: "high",
          daysUntil: 95,
          completed: false
        }
      ],
      CA: [
        {
          date: "2024-01-15",
          title: "Q4 Installment Payment",
          description: "Fourth quarter installment due",
          priority: "high",
          daysUntil: 5,
          completed: false
        },
        {
          date: "2024-04-30",
          title: "Individual Tax Return",
          description: "T1 General return due",
          priority: "high",
          daysUntil: 110,
          completed: false
        }
      ],
      UK: [
        {
          date: "2024-01-31",
          title: "Self Assessment Return",
          description: "Online self assessment return due",
          priority: "high",
          daysUntil: 21,
          completed: false
        },
        {
          date: "2024-01-31",
          title: "Payment on Account",
          description: "First payment on account due",
          priority: "high",
          daysUntil: 21,
          completed: false
        }
      ]
    }
    
    return deadlines[countryCode as keyof typeof deadlines] || deadlines.US
  }

  const deadlines = getDeadlinesByCountry(country)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "default"
      case "low": return "secondary"
      default: return "outline"
    }
  }

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil <= 7) return "text-red-600"
    if (daysUntil <= 30) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Tax Deadlines ({country})
        </CardTitle>
        <CardDescription>
          Important tax dates and deadlines for your region
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg ${
                deadline.daysUntil <= 7 ? 'border-red-200 bg-red-50' : 
                deadline.daysUntil <= 30 ? 'border-orange-200 bg-orange-50' : 
                'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {deadline.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : deadline.daysUntil <= 7 ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Calendar className="h-4 w-4 text-gray-600" />
                    )}
                    <h4 className="font-medium">{deadline.title}</h4>
                    <Badge variant={getPriorityColor(deadline.priority)}>
                      {deadline.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {deadline.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium">Due: {deadline.date}</span>
                    <span className={getUrgencyColor(deadline.daysUntil)}>
                      {deadline.daysUntil} days remaining
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Bell className="h-3 w-3 mr-1" />
                    Remind
                  </Button>
                  {!deadline.completed && (
                    <Button size="sm">
                      Mark Done
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Email Reminders</h4>
          <p className="text-sm text-blue-800 mb-3">
            Get automatic email notifications for upcoming deadlines
          </p>
          <Button size="sm" variant="outline">
            <Bell className="h-3 w-3 mr-1" />
            Setup Email Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
