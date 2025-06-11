
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Filter, Search, Edit, Trash2 } from 'lucide-react'

interface TaxTransactionsProps {
  country: string
}

export function TaxTransactions({ country }: TaxTransactionsProps) {
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const transactions = [
    {
      id: 1,
      date: "2024-01-15",
      description: "Office Supplies - Staples",
      amount: 245.50,
      category: "Office Expenses",
      type: "Deductible",
      status: "Classified"
    },
    {
      id: 2,
      date: "2024-01-12",
      description: "Client Payment - ABC Corp",
      amount: 5000.00,
      category: "Revenue",
      type: "Taxable",
      status: "Classified"
    },
    {
      id: 3,
      date: "2024-01-10",
      description: "Software Subscription - Adobe",
      amount: 79.99,
      category: "Software",
      type: "Deductible",
      status: "Classified"
    },
    {
      id: 4,
      date: "2024-01-08",
      description: "Business Lunch - Restaurant",
      amount: 125.00,
      category: "Meals",
      type: "Partially Deductible",
      status: "Review Needed"
    },
    {
      id: 5,
      date: "2024-01-05",
      description: "Gas Station Purchase",
      amount: 65.00,
      category: "Uncategorized",
      type: "Unknown",
      status: "Needs Classification"
    }
  ]

  const categories = [
    "Office Expenses",
    "Software",
    "Meals",
    "Travel",
    "Revenue",
    "Equipment",
    "Professional Services"
  ]

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filterCategory === "all" || transaction.category === filterCategory
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Classified": return "default"
      case "Review Needed": return "secondary"
      case "Needs Classification": return "destructive"
      default: return "outline"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Taxable": return "destructive"
      case "Deductible": return "default"
      case "Partially Deductible": return "secondary"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Classification</CardTitle>
          <CardDescription>
            Manage and classify your business transactions for tax purposes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Tax Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>
                      <Badge variant={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-3">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Total Deductible</p>
              <p className="text-2xl font-bold text-green-800">$450.49</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">Total Taxable</p>
              <p className="text-2xl font-bold text-red-800">$5,000.00</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-600">Needs Review</p>
              <p className="text-2xl font-bold text-yellow-800">2</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
