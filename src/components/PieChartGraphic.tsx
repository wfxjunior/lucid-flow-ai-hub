
import React from 'react'
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'

export function PieChartGraphic() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left side - Pie Chart representation */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            {/* Pie Chart representation using CSS */}
            <div className="relative w-full h-full rounded-full overflow-hidden">
              {/* Blue segment (40%) */}
              <div 
                className="absolute w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(
                    #3b82f6 0deg 144deg,
                    #10b981 144deg 252deg,
                    #6b7280 252deg 360deg
                  )`
                }}
              ></div>
              
              {/* Center circle to create donut effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-gray-800">87%</p>
                  <p className="text-xs text-gray-600">Growth</p>
                </div>
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
              <span className="text-sm text-gray-600">Revenue (40%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Customers (30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Projects (30%)</span>
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
                <p className="text-lg font-semibold text-gray-800">1,234</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-lg font-semibold text-gray-800">$12,345</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:col-span-2 lg:col-span-1">
              <div className="p-2 bg-gray-500 rounded-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Growth</p>
                <p className="text-lg font-semibold text-gray-800">+23%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
