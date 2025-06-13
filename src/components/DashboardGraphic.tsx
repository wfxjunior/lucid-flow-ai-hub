
import React from 'react'
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'

export function DashboardGraphic() {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between h-full">
        {/* Left side - Main graphic */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Main chart representation */}
            <div className="flex items-end space-x-2">
              <div className="w-8 h-16 bg-blue-500 rounded-t-sm"></div>
              <div className="w-8 h-24 bg-green-500 rounded-t-sm"></div>
              <div className="w-8 h-20 bg-gray-400 rounded-t-sm"></div>
              <div className="w-8 h-28 bg-blue-600 rounded-t-sm"></div>
              <div className="w-8 h-18 bg-green-600 rounded-t-sm"></div>
              <div className="w-8 h-22 bg-gray-500 rounded-t-sm"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-2">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-4 bg-blue-500 rounded-full p-2">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        {/* Right side - Stats */}
        <div className="flex-1 space-y-4 pl-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-lg font-semibold text-gray-800">1,234</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-lg font-semibold text-gray-800">$12,345</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-500 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth</p>
              <p className="text-lg font-semibold text-gray-800">+23%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
