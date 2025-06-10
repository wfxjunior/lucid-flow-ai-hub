
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, FileText, DollarSign, Calendar, User } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function BusinessProposalsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [proposals, setProposals] = useState([
    {
      id: 1,
      proposalNumber: 'PROP-001',
      client: 'ABC Corporation',
      title: 'Digital Transformation Project',
      value: 50000,
      status: 'submitted',
      submittedDate: '2024-01-10',
      expiryDate: '2024-02-10'
    },
    {
      id: 2,
      proposalNumber: 'PROP-002',
      client: 'XYZ Limited',
      title: 'Cloud Migration Strategy',
      value: 35000,
      status: 'accepted',
      submittedDate: '2024-01-08',
      expiryDate: '2024-02-08'
    }
  ])

  const [formData, setFormData] = useState({
    client: '',
    title: '',
    description: '',
    value: '',
    expiryDate: ''
  })

  const clients = ['ABC Corporation', 'XYZ Limited', 'Tech Solutions', 'Future Corp']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.client || !formData.title || !formData.value) {
      toast.error('Please fill in all required fields')
      return
    }

    const newProposal = {
      id: proposals.length + 1,
      proposalNumber: `PROP-${String(proposals.length + 1).padStart(3, '0')}`,
      client: formData.client,
      title: formData.title,
      value: parseFloat(formData.value),
      status: 'draft',
      submittedDate: new Date().toISOString().split('T')[0],
      expiryDate: formData.expiryDate
    }
    
    setProposals([newProposal, ...proposals])
    setFormData({
      client: '',
      title: '',
      description: '',
      value: '',
      expiryDate: ''
    })
    setIsDialogOpen(false)
    toast.success('Business proposal created successfully!')
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: "bg-gray-100 text-gray-800",
      submitted: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      negotiating: "bg-yellow-100 text-yellow-800"
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Proposals</h1>
          <p className="text-muted-foreground">
            Create and manage business proposals for potential clients
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Business Proposal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client *</Label>
                  <Select value={formData.client} onValueChange={(value) => setFormData({ ...formData, client: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client} value={client}>{client}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="value">Proposal Value *</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Proposal Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter proposal title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Proposal Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter detailed proposal description..."
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="expiryDate">Proposal Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Create Proposal</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{proposals.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {proposals.filter(p => p.status === 'submitted').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {proposals.filter(p => p.status === 'accepted').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${proposals.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proposals List */}
      <Card>
        <CardHeader>
          <CardTitle>All Business Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{proposal.title}</h3>
                    <p className="text-sm text-gray-600">{proposal.client} • {proposal.proposalNumber}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusBadge(proposal.status)}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Submitted: {proposal.submittedDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${proposal.value.toLocaleString()}</p>
                  {proposal.expiryDate && (
                    <p className="text-sm text-gray-500">Expires: {proposal.expiryDate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
