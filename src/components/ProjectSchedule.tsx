
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User } from 'lucide-react'

export function ProjectSchedule() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Project Schedule</h1>
          <p className="text-sm text-gray-500 mt-1">Manage project timelines and milestones</p>
        </div>
        <Button>Add Project</Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <Button variant="outline" size="sm">This Week</Button>
        <Button variant="outline" size="sm">This Month</Button>
        <Button variant="outline" size="sm">All Projects</Button>
      </div>

      {/* Schedule Table */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Tasks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Kitchen Renovation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Install cabinets</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mike Johnson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jan 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">In Progress</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bathroom Remodel</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tile installation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sarah Wilson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jan 18, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
