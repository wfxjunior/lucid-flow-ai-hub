
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Users, Plus, Search, Mail, Phone, MapPin, Edit, Trash2, Eye } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  address: string
  status: 'active' | 'inactive'
  totalRevenue: number
  lastContact: string
}

export function CustomerManagement() {
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      company: 'Smith & Co',
      address: '123 Main St, City, State',
      status: 'active',
      totalRevenue: 15000,
      lastContact: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1 234 567 8901',
      company: 'TechCorp Inc',
      address: '456 Tech Ave, Silicon Valley',
      status: 'active',
      totalRevenue: 25000,
      lastContact: '2024-01-20'
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@construction.com',
      phone: '+1 234 567 8902',
      company: 'Davis Construction',
      address: '789 Builder St, Metro City',
      status: 'inactive',
      totalRevenue: 8000,
      lastContact: '2023-12-10'
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Management
          </CardTitle>
          <CardDescription>
            Manage your customer database with AI-powered insights and communication tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </div>

          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input id="customerName" placeholder="John Smith" />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input id="customerEmail" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input id="customerPhone" placeholder="+1 234 567 8900" />
                  </div>
                  <div>
                    <Label htmlFor="customerCompany">Company</Label>
                    <Input id="customerCompany" placeholder="Company Name" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="customerAddress">Address</Label>
                    <Input id="customerAddress" placeholder="123 Main St, City, State" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button>Save Customer</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          <AvatarInitials>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarInitials>
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{customer.name}</h3>
                        <p className="text-muted-foreground">{customer.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {customer.address}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          customer.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {customer.status}
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-green-600">
                        ${customer.totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last contact: {customer.lastContact}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
