
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckSquare, Clock, FileText, Bell } from 'lucide-react'

export function Productivity() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">Productivity</h1>
        <p className="text-sm text-gray-500 mt-1">Manage tasks, notes, and reminders</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <Button variant="ghost" className="border-b-2 border-gray-900 pb-2">Tasks</Button>
          <Button variant="ghost" className="pb-2">Notes</Button>
          <Button variant="ghost" className="pb-2">Reminders</Button>
        </nav>
      </div>

      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <CheckSquare className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Completed Today</p>
              <p className="text-2xl font-medium text-gray-900">8</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Due Today</p>
              <p className="text-2xl font-medium text-gray-900">5</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Reminders</p>
              <p className="text-2xl font-medium text-gray-900">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Tasks */}
      <Card>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Active Tasks</h2>
          <Button size="sm">Add Task</Button>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Review Johnson estimate</p>
                <p className="text-xs text-gray-500">Due: Today, 3:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Call supplier for materials</p>
                <p className="text-xs text-gray-500">Due: Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" checked />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 line-through">Update project timeline</p>
                <p className="text-xs text-gray-400">Completed 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
