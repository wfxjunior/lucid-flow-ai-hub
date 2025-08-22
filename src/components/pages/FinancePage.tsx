
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, CreditCard, Receipt, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface FinancePageProps {
  onNavigate: (view: string) => void
}

export function FinancePage({ onNavigate }: FinancePageProps) {
  const [financialData] = useState({
    totalRevenue: 45780,
    monthlyGrowth: 12.5,
    totalExpenses: 23450,
    netProfit: 22330,
    pendingInvoices: 8920,
    paidInvoices: 36860,
    recentTransactions: [
      { id: 1, type: 'income', description: 'Payment from TechCorp', amount: 5000, date: '2024-02-15', status: 'completed' },
      { id: 2, type: 'expense', description: 'Office rent', amount: 2500, date: '2024-02-14', status: 'completed' },
      { id: 3, type: 'income', description: 'Consulting services', amount: 3200, date: '2024-02-13', status: 'completed' },
      { id: 4, type: 'expense', description: 'Equipment purchase', amount: 1800, date: '2024-02-12', status: 'pending' }
    ]
  })

  const getTransactionIcon = (type: string) => {
    return type === 'income' ? (
      <ArrowUpRight className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-600" />
    )
  }

  const getTransactionColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Overview</h1>
          <p className="text-muted-foreground mt-2">Track your business finances and performance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate('invoices')} variant="outline" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            View Invoices
          </Button>
          <Button onClick={() => onNavigate('invoice-creator')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{financialData.monthlyGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Operational costs this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${financialData.netProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              After all expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${financialData.pendingInvoices.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Overview of invoice payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Paid Invoices</span>
                <span className="font-medium">${financialData.paidInvoices.toLocaleString()}</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pending Invoices</span>
                <span className="font-medium">${financialData.pendingInvoices.toLocaleString()}</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('en-US')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
