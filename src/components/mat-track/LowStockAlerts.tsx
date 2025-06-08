
import React from 'react'
import { AlertTriangle, Package, TrendingUp, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface LowStockAlertsProps {
  expanded?: boolean
}

export function LowStockAlerts({ expanded = false }: LowStockAlertsProps) {
  // Mock data for low stock items
  const lowStockItems = [
    {
      id: 2,
      name: "Electrical Wire 14 AWG",
      sku: "MAT-002",
      currentStock: 25,
      minStock: 30,
      maxStock: 100,
      unit: "roll",
      urgencyLevel: "medium",
      daysUntilOut: 7,
      averageUsage: 3.5
    },
    {
      id: 4,
      name: "Safety Helmets",
      sku: "MAT-004",
      currentStock: 5,
      minStock: 15,
      maxStock: 50,
      unit: "pcs",
      urgencyLevel: "high",
      daysUntilOut: 2,
      averageUsage: 2.5
    },
    {
      id: 6,
      name: "Wood Screws 2.5in",
      sku: "MAT-006",
      currentStock: 200,
      minStock: 250,
      maxStock: 1000,
      unit: "pcs",
      urgencyLevel: "low",
      daysUntilOut: 14,
      averageUsage: 15
    }
  ]

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  const getStockPercentage = (current: number, min: number, max: number) => {
    return Math.max(0, (current / max) * 100)
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            <span className="text-base sm:text-lg">Low Stock Alerts</span>
          </div>
          <Badge variant="destructive" className="ml-0 sm:ml-2 text-xs self-start sm:self-center">
            {lowStockItems.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {lowStockItems.map((item) => (
          <div key={item.id} className={`p-3 sm:p-4 rounded-lg border ${getUrgencyColor(item.urgencyLevel)}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-3">
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm sm:text-base truncate">{item.name}</h4>
                <p className="text-xs sm:text-sm opacity-75">{item.sku}</p>
              </div>
              <Badge 
                variant={item.urgencyLevel === 'high' ? 'destructive' : 'secondary'}
                className="capitalize text-xs self-start sm:self-center shrink-0"
              >
                {item.urgencyLevel}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Current: {item.currentStock} {item.unit}</span>
                <span>Min: {item.minStock} {item.unit}</span>
              </div>
              
              <Progress 
                value={getStockPercentage(item.currentStock, item.minStock, item.maxStock)}
                className="h-2"
              />
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-xs sm:text-sm">
                <span className="opacity-75">
                  ~{item.daysUntilOut} days until out
                </span>
                <Button size="sm" variant="outline" className="h-7 sm:h-8 w-full sm:w-auto">
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Reorder
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {expanded && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">Smart Restocking Suggestions</h4>
            <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
              <li>• Safety Helmets: Order 25 units to reach optimal level</li>
              <li>• Electrical Wire: Recommend bulk order for better pricing</li>
              <li>• Wood Screws: Consider seasonal demand increase</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
