
import React from 'react'
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'

export function PieChartGraphic() {
  // Empty data - will show placeholder chart
  const monthlyData = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 0 },
    { month: 'Mar', value: 0 },
    { month: 'Apr', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 0 },
  ]

  const maxValue = Math.max(...monthlyData.map(d => d.value))

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left side - Line Chart representation */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-64 h-48 sm:w-72 sm:h-56">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Monthly Revenue Trend</h3>
            
            {/* Line Chart representation using CSS and SVG */}
            <div className="relative w-full h-32 border-l-2 border-b-2 border-gray-400">
              {/* Grid lines */}
              <div className="absolute inset-0">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-full border-t border-gray-200"
                    style={{ top: `${(i + 1) * 25}%` }}
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute h-full border-r border-gray-200"
                    style={{ left: `${(i + 1) * 20}%` }}
                  />
                ))}
              </div>

              {/* Line chart points and line */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  points={monthlyData.map((data, index) => {
                    const x = (index / (monthlyData.length - 1)) * 100
                    const y = 100 - (data.value / maxValue) * 100
                    return `${x},${y}`
                  }).join(' ')}
                />
                {monthlyData.map((data, index) => {
                  const x = (index / (monthlyData.length - 1)) * 100
                  const y = 100 - (data.value / maxValue) * 100
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="2"
                      fill="#10b981"
                      stroke="#3b82f6"
                      strokeWidth="1"
                    />
                  )
                })}
              </svg>

              {/* Month labels */}
              <div className="absolute -bottom-6 w-full flex justify-between text-xs text-gray-600">
                {monthlyData.map(data => (
                  <span key={data.month}>{data.month}</span>
                ))}
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-blue-500 rounded-full p-2">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </div>
        </div>
        
        {/* Right side - Stats and Legend */}
        <div className="flex-1 space-y-4 w-full lg:pl-8">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue Trend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Growth Points</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Baseline</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-lg font-semibold text-gray-800">-</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-lg font-semibold text-gray-800">$0</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:col-span-2 lg:col-span-1">
              <div className="p-2 bg-gray-500 rounded-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Growth</p>
                <p className="text-lg font-semibold text-gray-800">-</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
