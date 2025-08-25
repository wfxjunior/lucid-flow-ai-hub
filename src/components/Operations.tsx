
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export function Operations() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Operations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage workflows and operational processes</p>
        </div>
        <Button>New Workflow</Button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-medium text-gray-900">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-medium text-gray-900">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-medium text-gray-900">8</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Workflows */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Active Workflows</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Project Approval Process</p>
                <p className="text-xs text-gray-500">Kitchen Renovation - Pending client approval</p>
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Material Ordering</p>
                <p className="text-xs text-gray-500">Bathroom tiles and fixtures</p>
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
