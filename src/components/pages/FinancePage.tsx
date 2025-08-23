import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calculator,
  Receipt,
  FileText,
  CreditCard,
  PiggyBank,
  BarChart3,
  ArrowRight,
  Plus
} from "lucide-react"

interface FinancePageProps {
  onNavigate: (view: string) => void
}

export function FinancePage({ onNavigate }: FinancePageProps) {
  const financialMetrics = [
    {
      title: "Total Revenue",
      value: "$124,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Net Profit",
      value: "$35,200",
      change: "-3.2%",
      trend: "down",
      icon: TrendingUp
    },
    {
      title: "Expenses",
      value: "$89,300",
      change: "+8.7%",
      trend: "up",
      icon: TrendingDown
    },
    {
      title: "Cash Flow",
      value: "$42,800",
      change: "+6.1%",
      trend: "up",
      icon: Calculator
    }
  ]

  const quickActions = [
    {
      title: "Create Invoice",
      description: "Generate and send professional invoices",
      icon: FileText,
      action: () => onNavigate("invoices"),
      color: "blue"
    },
    {
      title: "Record Payment",
      description: "Log incoming payments from clients",
      icon: CreditCard,
      action: () => {},
      color: "green"
    },
    {
      title: "Add Expense",
      description: "Track business expenses and costs",
      icon: Receipt,
      action: () => {},
      color: "red"
    },
    {
      title: "Set Budget",
      description: "Create and manage financial budgets",
      icon: PiggyBank,
      action: () => {},
      color: "yellow"
    }
  ]

  const recentTransactions = [
    {
      id: 1,
      type: "income",
      description: "Payment from ABC Corp",
      amount: "+$2,500",
      date: "Today",
      status: "completed"
    },
    {
      id: 2,
      type: "expense",
      description: "Office Supplies",
      amount: "-$150",
      date: "Yesterday",
      status: "completed"
    },
    {
      id: 3,
      type: "income",
      description: "Consulting Fee",
      amount: "+$1,200",
      date: "2 days ago",
      status: "pending"
    },
    {
      id: 4,
      type: "expense",
      description: "Marketing Campaign",
      amount: "-$500",
      date: "3 days ago",
      status: "completed"
    },
    {
      id: 5,
      type: "income",
      description: "Sale of Product X",
      amount: "+$800",
      date: "4 days ago",
      status: "failed"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
      case 'pending':
        return <Badge variant="outline">Pending</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <CleanPageLayout
      title="Finance Overview"
      subtitle="Monitor your financial performance and manage transactions"
      actionLabel="Add Transaction"
      onActionClick={() => {}}
    >
      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {financialMetrics.map((metric) => (
          <Card key={metric.title} className="border-2 border-muted-foreground">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{metric.title}</CardTitle>
                <metric.icon className={`h-5 w-5 text-${metric.color || 'blue'}-500`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                {metric.change}
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to frequently used tasks</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="flex flex-col items-start p-4 rounded-lg hover:bg-accent"
                onClick={action.action}
              >
                <action.icon className={`h-5 w-5 text-${action.color || 'blue'}-500 mb-2`} />
                <div className="text-sm font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(transaction.status)}
                  <span className={`font-medium ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
