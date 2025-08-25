
import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Clock, AlertTriangle } from 'lucide-react'

export function SmartSchedule() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">Smart Schedule</h1>
        <p className="text-sm text-gray-500 mt-1">AI-powered scheduling recommendations</p>
      </div>

      {/* AI Recommendations */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-medium text-gray-900">AI Recommendations</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Optimize morning schedule</p>
              <p className="text-xs text-gray-600 mt-1">Move client calls to afternoon for better focus time</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Resource conflict detected</p>
              <p className="text-xs text-gray-600 mt-1">Two projects scheduled for same equipment on Jan 20</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Suggested Tasks */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Suggested Tasks</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Follow up with Johnson project</p>
                <p className="text-xs text-gray-500">Last contact: 3 days ago</p>
              </div>
              <Badge variant="secondary">High Priority</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Review Wilson estimate</p>
                <p className="text-xs text-gray-500">Pending approval</p>
              </div>
              <Badge variant="outline">Medium</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
