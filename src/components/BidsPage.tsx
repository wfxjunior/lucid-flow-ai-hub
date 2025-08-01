
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Target, DollarSign, Calendar, User, FileText, Download } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"

export function BidsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { generateBidPDF, isGenerating } = usePDFGeneration()
  const [bids, setBids] = useState([
    {
      id: 1,
      bidNumber: 'BID-001',
      projectName: 'City Infrastructure Upgrade',
      client: 'City Council',
      bidAmount: 250000,
      status: 'submitted',
      submittedDate: '2024-01-10',
      closingDate: '2024-02-15'
    },
    {
      id: 2,
      bidNumber: 'BID-002',
      projectName: 'Corporate Office Renovation',
      client: 'ABC Corporation',
      bidAmount: 180000,
      status: 'won',
      submittedDate: '2024-01-05',
      closingDate: '2024-01-20'
    }
  ])

  const [formData, setFormData] = useState({
    projectName: '',
    client: '',
    description: '',
    bidAmount: '',
    closingDate: ''
  })

  const clients = ['City Council', 'ABC Corporation', 'XYZ Limited', 'Tech Solutions', 'Future Corp']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.projectName || !formData.client || !formData.bidAmount) {
      toast.error('Please fill in all required fields')
      return
    }

    const newBid = {
      id: bids.length + 1,
      bidNumber: `BID-${String(bids.length + 1).padStart(3, '0')}`,
      projectName: formData.projectName,
      client: formData.client,
      bidAmount: parseFloat(formData.bidAmount),
      status: 'draft',
      submittedDate: new Date().toISOString().split('T')[0],
      closingDate: formData.closingDate
    }
    
    setBids([newBid, ...bids])
    setFormData({
      projectName: '',
      client: '',
      description: '',
      bidAmount: '',
      closingDate: ''
    })
    setIsDialogOpen(false)
    toast.success('Bid created successfully!')
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: "bg-gray-100 text-gray-800",
      submitted: "bg-blue-100 text-blue-800",
      won: "bg-green-100 text-green-800",
      lost: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bids</h1>
          <p className="text-muted-foreground">
            Manage project bids and track opportunities
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Bid
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Bid</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client/Organization *</Label>
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
                  <Label htmlFor="bidAmount">Bid Amount *</Label>
                  <Input
                    id="bidAmount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.bidAmount}
                    onChange={(e) => setFormData({ ...formData, bidAmount: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter project description and bid details..."
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="closingDate">Bid Closing Date</Label>
                <Input
                  id="closingDate"
                  type="date"
                  value={formData.closingDate}
                  onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Create Bid</Button>
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
            <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bids.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bids.filter(b => b.status === 'submitted').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Won</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bids.filter(b => b.status === 'won').length}
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
              ${bids.reduce((sum, b) => sum + b.bidAmount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bids List */}
      <Card>
        <CardHeader>
          <CardTitle>All Bids</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bids.map((bid) => (
              <div key={bid.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Target className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{bid.projectName}</h3>
                    <p className="text-sm text-gray-600">{bid.client} • {bid.bidNumber}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusBadge(bid.status)}>
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Submitted: {bid.submittedDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <p className="text-xl font-bold">${bid.bidAmount.toLocaleString()}</p>
                    {bid.closingDate && (
                      <p className="text-sm text-gray-500">Closes: {bid.closingDate}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateBidPDF(bid)}
                    disabled={isGenerating}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
