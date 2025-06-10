
import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, Package, Calendar, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface MaterialInsightsProps {
  expanded?: boolean
}

export function MaterialInsights({ expanded = false }: MaterialInsightsProps) {
  // Mock analytics data
  const insights = {
    topUsedMaterials: [
      { name: "Concrete Mix Bags", usage: 85, trend: "up" },
      { name: "Steel Reinforcement Bars", usage: 72, trend: "stable" },
      { name: "PVC Pipe 4 inch", usage: 63, trend: "down" }
    ],
    costAnalysis: {
      totalValue: 45600,
      monthlySpend: 12800,
      savings: 2400,
      wasteReduction: 15
    },
    predictions: [
      { material: "Safety Helmets", action: "Reorder in 2 days", urgency: "high" },
      { material: "Electrical Wire", action: "Bulk order recommended", urgency: "medium" },
      { material: "Wood Screws", action: "Monitor usage", urgency: "low" }
    ]
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Material Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">${insights.costAnalysis.savings}</div>
            <div className="text-sm text-green-600">Monthly Savings</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{insights.costAnalysis.wasteReduction}%</div>
            <div className="text-sm text-blue-600">Waste Reduction</div>
          </div>
        </div>

        {/* Top Used Materials */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Most Used This Month
          </h4>
          <div className="space-y-3">
            {insights.topUsedMaterials.map((material, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{material.name}</span>
                    <div className="flex items-center gap-1">
                      {material.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                      {material.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
                      <span className="text-sm text-gray-500">{material.usage}%</span>
                    </div>
                  </div>
                  <Progress value={material.usage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Predictions */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            AI Predictions
          </h4>
          <div className="space-y-2">
            {insights.predictions.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="text-sm font-medium">{prediction.material}</div>
                  <div className="text-xs text-gray-600">{prediction.action}</div>
                </div>
                <Badge 
                  variant={prediction.urgency === 'high' ? 'destructive' : 
                          prediction.urgency === 'medium' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {prediction.urgency}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {expanded && (
          <>
            {/* Detailed Cost Analysis */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Cost Analysis
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">Total Inventory Value</span>
                  <span className="font-medium">${insights.costAnalysis.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">Monthly Material Spend</span>
                  <span className="font-medium">${insights.costAnalysis.monthlySpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-green-700">Cost Optimization</span>
                  <span className="font-medium text-green-700">-${insights.costAnalysis.savings.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Usage Patterns */}
            <div>
              <h4 className="font-medium mb-3">Usage Patterns</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Peak usage: Monday mornings (40% increase)</p>
                <p>• Seasonal trend: Construction materials +25% in spring</p>
                <p>• Most efficient supplier: Steel Works Inc. (15% cost reduction)</p>
                <p>• Optimal reorder frequency: Every 2 weeks for fast-moving items</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
