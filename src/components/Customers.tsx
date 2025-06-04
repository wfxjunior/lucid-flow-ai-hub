
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Mail, Phone, MoreVertical } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Customers() {
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      status: "active",
      totalInvoices: 5,
      totalAmount: 2500
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      status: "pending",
      totalInvoices: 2,
      totalAmount: 800
    }
  ])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm sm:text-lg text-muted-foreground">
            Manage your client relationships
          </p>
        </div>
        <Button className="w-full sm:w-auto shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden xs:inline">Add Customer</span>
          <span className="xs:hidden">Add</span>
        </Button>
      </div>

      {/* Search */}
      <div className="w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search customers..." 
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Customer Grid - Mobile First Design */}
      <div className="space-y-3 sm:space-y-4">
        {customers.map((customer) => (
          <Card key={customer.id} className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              {/* Mobile Layout */}
              <div className="block sm:hidden space-y-3">
                {/* Customer Name and Status */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">{customer.name}</h3>
                    <Badge 
                      variant={customer.status === "active" ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {customer.status}
                    </Badge>
                  </div>
                  
                  {/* Mobile Actions Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{customer.phone}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between pt-2 border-t text-sm">
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">{customer.totalInvoices}</span> invoices
                  </span>
                  <span className="text-muted-foreground">
                    Total: <span className="font-medium text-foreground">${customer.totalAmount.toLocaleString()}</span>
                  </span>
                </div>
              </div>

              {/* Desktop/Tablet Layout */}
              <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-6">
                {/* Left Section - Customer Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold truncate">{customer.name}</h3>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Center Section - Stats */}
                <div className="hidden md:flex md:flex-col md:items-center md:gap-1 md:px-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{customer.totalInvoices}</span> invoices
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">${customer.totalAmount.toLocaleString()}</span> total
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for when no customers (hidden for now since we have data) */}
      {customers.length === 0 && (
        <Card className="p-8 sm:p-12 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No customers yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Get started by adding your first customer to begin managing your client relationships.
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Customer
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
