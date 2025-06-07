
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Clock, CheckCircle } from 'lucide-react'

export function BusinessProposalsPage() {
  const [proposals] = useState([
    {
      id: '1',
      title: 'Website Redesign Project',
      client: 'ABC Corp',
      value: 15000,
      status: 'submitted',
      deadline: '2024-02-15',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Marketing Campaign Strategy',
      client: 'XYZ Ltd',
      value: 8500,
      status: 'approved',
      deadline: '2024-02-10',
      date: '2024-01-10'
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Proposals</h1>
          <p className="text-gray-600">Create and manage business proposals</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Proposal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Proposals</p>
                <p className="text-2xl font-bold">{proposals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-2xl font-bold">{proposals.filter(p => p.status === 'submitted').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold">{proposals.filter(p => p.status === 'approved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${proposals.reduce((sum, p) => sum + p.value, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Client</th>
                  <th className="text-left p-2">Value</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Deadline</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr key={proposal.id} className="border-b">
                    <td className="p-2 font-medium">{proposal.title}</td>
                    <td className="p-2">{proposal.client}</td>
                    <td className="p-2">${proposal.value}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        proposal.status === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {proposal.status}
                      </span>
                    </td>
                    <td className="p-2">{proposal.deadline}</td>
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
