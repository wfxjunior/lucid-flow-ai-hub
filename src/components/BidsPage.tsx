
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, DollarSign, TrendingUp, Target } from 'lucide-react'

export function BidsPage() {
  const [bids] = useState([
    {
      id: '1',
      project: 'Office Building Construction',
      client: 'ABC Corp',
      amount: 250000,
      status: 'submitted',
      deadline: '2024-02-20',
      probability: 75
    },
    {
      id: '2',
      project: 'IT Infrastructure Upgrade',
      client: 'XYZ Ltd',
      amount: 85000,
      status: 'won',
      deadline: '2024-01-30',
      probability: 100
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bids</h1>
          <p className="text-gray-600">Manage project bids and proposals</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Bid
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bids</p>
                <p className="text-2xl font-bold">{bids.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${bids.reduce((sum, b) => sum + b.amount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-2xl font-bold">{bids.filter(b => b.status === 'submitted').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Won</p>
                <p className="text-2xl font-bold">{bids.filter(b => b.status === 'won').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bids</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Project</th>
                  <th className="text-left p-2">Client</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Probability</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Deadline</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid.id} className="border-b">
                    <td className="p-2 font-medium">{bid.project}</td>
                    <td className="p-2">{bid.client}</td>
                    <td className="p-2">${bid.amount}</td>
                    <td className="p-2">{bid.probability}%</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        bid.status === 'won' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bid.status}
                      </span>
                    </td>
                    <td className="p-2">{bid.deadline}</td>
                    <td className="p-2">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
