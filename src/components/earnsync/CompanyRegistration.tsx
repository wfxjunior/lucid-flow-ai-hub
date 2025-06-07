
import React, { useState } from 'react'
import { Plus, Building2, Phone, Calendar, CreditCard, Edit, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export function CompanyRegistration() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [companies, setCompanies] = useState([
    {
      id: 1,
      companyName: 'ABC Corporation',
      contactInfo: 'john@abc.com | (555) 123-4567',
      workType: 'Consulting',
      paymentMethod: 'Bank Transfer',
      dateOfService: '2024-01-15'
    },
    {
      id: 2,
      companyName: 'XYZ Limited',
      contactInfo: 'contact@xyz.com',
      workType: 'Development',
      paymentMethod: 'Zelle',
      dateOfService: '2024-01-20'
    }
  ])

  const [formData, setFormData] = useState({
    companyName: '',
    contactInfo: '',
    workType: '',
    paymentMethod: '',
    dateOfService: ''
  })

  // Work types including the new industries
  const workTypes = [
    'Consulting',
    'Development',
    'Construction',
    'Renovation',
    'Maintenance',
    'Design',
    'Installation',
    'Repair',
    'Inspection',
    'Outdoor Services',
    'Electrical',
    'Carpentry',
    'Pool Services',
    'Screen Enclosure',
    'Catering',
    'Church',
    'Roofing'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCompany = {
      id: companies.length + 1,
      ...formData
    }
    setCompanies([...companies, newCompany])
    setFormData({
      companyName: '',
      contactInfo: '',
      workType: '',
      paymentMethod: '',
      dateOfService: ''
    })
    setIsDialogOpen(false)
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'Cash': return 'bg-green-100 text-green-800'
      case 'Check': return 'bg-blue-100 text-blue-800'
      case 'Bank Transfer': return 'bg-purple-100 text-purple-800'
      case 'Zelle': return 'bg-yellow-100 text-yellow-800'
      case 'Venmo': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Company Registration</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Company</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contactInfo">Contact Info</Label>
                <Input
                  id="contactInfo"
                  placeholder="Email, phone, etc."
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="workType">Work Type</Label>
                <Select value={formData.workType} onValueChange={(value) => setFormData({ ...formData, workType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    {workTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Zelle">Zelle</SelectItem>
                    <SelectItem value="Venmo">Venmo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dateOfService">Date of Service</Label>
                <Input
                  id="dateOfService"
                  type="date"
                  value={formData.dateOfService}
                  onChange={(e) => setFormData({ ...formData, dateOfService: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Register Company</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Companies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {company.companyName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {company.contactInfo && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{company.contactInfo}</p>
                </div>
              )}
              
              {company.workType && (
                <div>
                  <Badge variant="outline">{company.workType}</Badge>
                </div>
              )}

              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <Badge className={getPaymentMethodColor(company.paymentMethod)}>
                  {company.paymentMethod}
                </Badge>
              </div>

              {company.dateOfService && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{company.dateOfService}</p>
                </div>
              )}

              <div className="flex gap-2 pt-3">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
